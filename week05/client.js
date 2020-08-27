const net = require("net");
const {htmlParser} = require("./htmlParser.js");

/**
 * Request用来构建请求
 */
class Request {
  constructor(options) {
    this.method = options.method || "GET";
    this.path = options.path || "/";
    this.headers = options.headers || {};
    this.body = options.body || "";
    this.port = options.port || 8088;
  }

  get toString() {
    // 用于构建HTTP请求报文
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers)
  .map((key) => `${key}: ${this.headers[key]}`)
  .join("\r\n")}\r
\r\n
${this.body}
`;
  }

  send(connection) {
    // 发送请求
    return new Promise((resolve, reject) => {
      const parser = new BodyParser();

      if (connection) {
        connection.write(this.toString);
      } else {
        // 建立TCP连接，并发送HTTP请求
        connection = net.createConnection({ port: this.port }, () => {
          console.log("established TCP connection");
          connection.write(this.toString);
        });
      }

      connection.on('data', (data)=>{
          parser.parse(data.toString())
          resolve(parser.response);
          connection.end()
      })

      connection.on('end',()=>{
          console.log('disconnected');
      })
    });
  }
}

/**
 * 解析HTTP响应报文
 */
class BodyParser {
    constructor(){
        this.WAITING_STATUS_LINE = 1 << 0;
        this.WAITING_STATUS_LINE_END = 1 << 1;
        this.WAITING_HEADER_NAME = 1 << 2;
        this.WAITING_HEADER_NAME_END = 1 << 3;
        this.WAITING_HEADER_VALUE = 1 << 4;
        this.WAITING_HEADER_VALUE_END = 1 << 5;
        this.WAITING_BODY = 1 << 7
        this.READING_CHUNK = 1 << 8;
        this.state = this.WAITING_STATUS_LINE;

        this.headers = {}
        this.statusLine = ""
        this.chunkParser = new TransferChunkParser()
        this.headerName = ""
        this.headerValue = ""

    }

    get response(){
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([a-zA-Z]+)/)
        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.chunkParser.body.join("")
        }
    }

    parse(body){
        for (let c of body) {
            this.comsume(c)
        }
    }

    comsume(c){
        if (this.state & this.WAITING_STATUS_LINE) {
            if (c === "\r") {
                this.state = this.WAITING_STATUS_LINE_END
            } else {
                this.statusLine += c
            }
        } else if (this.state & this.WAITING_STATUS_LINE_END) {
            if (c === "\n") {
                this.state = this.WAITING_HEADER_NAME
            }
        } else if (this.state & this.WAITING_HEADER_NAME) {
            if (c === ":") {
                this.state = this.WAITING_HEADER_NAME_END
            } else if (c === "\r"){
                this.state = this.WAITING_BODY
            }else {
                this.headerName += c
            }
        } else if (this.state & this.WAITING_HEADER_NAME_END) {
            if (c === " ") {
                this.state = this.WAITING_HEADER_VALUE
            }
        } else if (this.state & this.WAITING_HEADER_VALUE) {
            if (c === "\r") {
                this.state = this.WAITING_HEADER_VALUE_END
            } else {
                this.headerValue += c
            }
        } else if (this.state & this.WAITING_HEADER_VALUE_END) {
            if (c === "\n") {
                this.headers[this.headerName] = this.headerValue
                this.headerName = ""
                this.headerValue = ""
                this.state = this.WAITING_HEADER_NAME
            }
        } else if (this.state & this.WAITING_BODY) {
            if (c === "\n" && this.headers["Transfer-Encoding"] === "chunked") {
                this.state = this.READING_CHUNK;
            }
        } else if (this.state & this.READING_CHUNK) {
            this.chunkParser.consume(c)
        }
    }
}

/**
 * 获得响应体
 */
class TransferChunkParser {
    constructor(){
        this.WAITING_LENGTH = 1 << 0
        this.WAITING_LENGTH_END = 1 << 1
        this.WAITING_BODY = 1 << 2
        this.WAITING_BODY_END = 1 << 3

        this.state = this.WAITING_LENGTH

        this.body = []
        this.length = 0
    }
    consume(c) {
        if (this.state & this.WAITING_LENGTH) {
            if (c === "\r") {
                this.state = this.WAITING_LENGTH_END
            } else {
                this.length *= 16
                this.length += parseInt(c ,16)
            }
        } else if (this.state & this.WAITING_LENGTH_END) {
            if (c === "\n") {
                this.state = this.WAITING_BODY
            } 
        } else if (this.state & this.WAITING_BODY) {
            if (this.length !== 0) {
                this.body.push(c)
                this.length --
            } else {
                this.state = this.WAITING_BODY_END
            }
        } else if (this.state & this.WAITING_BODY_END) {
            if (c === "\n") {
                this.state = this.WAITING_LENGTH;
            }
        }

    }
}

void (async function () {
  const request = new Request({});
  const response = await request.send();
//   console.log(response);

  const dom = htmlParser(response.body)
  console.log(JSON.stringify(dom, null, 4))

})();
