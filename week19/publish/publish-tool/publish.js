const http = require("http");
const querystring = require("querystring");
const { fstat } = require("fs");
const fs = require("fs");
const archiver = require("archiver")

let filename = "./cat.jpg";

let packname = "./package";

// fs.stat(filename, (_, stat) => {
const options = {
  host: "localhost",
  port: 8081,
  path: "/?filename=package.zip",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
}


const req = http.request(options);

req.on("error", (e) => {
  console.error(`problem with request: ${e.message}`);
});

var archive = archiver("zip", {
  zlib: { level: 9 }, // Sets the compression level.
});

archive.directory(packname, false);

archive.finalize();

archive.pipe(req);

archive.on('end', ()=>{
  req.end();
})

// const readStream = fs.createReadStream(packname);
// readStream.pipe(req);
// readStream.on("end", () => {
//   req.end();
// });
// req.end();
// });

// Make a request


