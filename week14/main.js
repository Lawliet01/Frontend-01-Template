function create(cls, attrs, ...children){
  
  let component;
  if (typeof cls === "string") {
    component = new Component(cls)
  } else {
    component = new Carousel('div')
  }

  for (let key in arguments[1]){
    component.appendAttribute(key, arguments[1][key])
  }

  for (let child of children) {
    component.appendChild(child)
  }
  
  return component
}


class Component {
  constructor(type) {
    this.type = type;
    this.root = null;
    this.attributes = new Map();
    this.children = []
  }
  appendAttribute(key, value) {
    this.attributes.set(key, value);
  }
  appendChild(child){
    this.children.push(child)
  }
  render(){
    this.root = document.createElement(this.type)

    for (let pair of this.attributes.entries()) {
      this.root.setAttribute(pair[0], pair[1] )
    }

    for (let child of this.children) {
      if (typeof child === "string") {
        this.root.appendChild(document.createTextNode(child))
      } else {
        child.mountOn(this.root)
      }
    }
  }
  mountOn(dom){
    this.render()
    dom.appendChild(this.root)
  }
}

class Carousel extends Component {
  constructor(type) {
    super(type);
    this.data = [];
    this.appendAttribute("id", "carousel");
    this.currentIndex = 0;
    this.lockScroll = false
  }
  setSlices(slices) {
    this.data = slices;
  }
  render() {
    this.root = document.createElement(this.type);
    this.addEvent();

    for (let pair of this.attributes.entries()) {
      this.root.setAttribute(pair[0], pair[1]);
    }
    for (let data of this.data) {
      const img = <img />;
      img.appendAttribute("src", data);
      img.mountOn(this.root);
    }
  }

  mountOn(dom) {
    this.render();
    dom.appendChild(this.root);
    this.startScroll()
  }

  startScroll() {

    if (!this.lockScroll) {
      const sliceNum = this.data.length;
      let curr = this.currentIndex;
      let next = (curr + 1) % sliceNum;
      let prev = (curr - 1 + sliceNum) % sliceNum;

      this.root.children[prev].style.transition = "none";
      this.root.children[curr].style.transition = "none";
      this.root.children[next].style.transition = "none";

      this.root.children[prev].style.transform = this.translate(-prev * 500);
      this.root.children[curr].style.transform = this.translate(500 - curr * 500);
      this.root.children[next].style.transform = this.translate(2 * 500 - next * 500);

      setTimeout(() => {
        this.root.children[prev].style.transition = "transform 0.3s";
        this.root.children[curr].style.transition = "transform 0.3s";
        this.root.children[next].style.transition = "transform 0.3s";
        this.root.children[prev].style.transform = this.translate(-500 - prev * 500);
        this.root.children[curr].style.transform = this.translate(-curr * 500);
        this.root.children[next].style.transform = this.translate(500 - next * 500);
        this.currentIndex = next;
      }, 0);
    }



    setTimeout(()=>{
      this.startScroll();
    }, 2000)
  }

  translate(data){
    return `translateX(${data}px)`;
  }

  addEvent() {
    this.root.addEventListener("mousedown", () => {
      this.lockScroll = true
      event.preventDefault();

      const startX = event.clientX
      const sliceNum = this.data.length;
      let curr = this.currentIndex;
      let next = (curr + 1) % sliceNum;
      let prev = (curr - 1 + sliceNum) % sliceNum;

      this.root.children[prev].style.transition = "none";
      this.root.children[curr].style.transition = "none";
      this.root.children[next].style.transition = "none";

      this.root.children[prev].style.transform = this.translate(-500 -prev * 500);
      this.root.children[curr].style.transform = this.translate(- curr * 500);
      this.root.children[next].style.transform = this.translate(500 - next * 500);

      let mousemove = (event) => {
        let diff = event.clientX - startX;

        this.root.children[prev].style.transform = this.translate(-500 -prev * 500+ diff);
        this.root.children[curr].style.transform = this.translate(- curr * 500 + diff);
        this.root.children[next].style.transform = this.translate(500 - next * 500 + diff);
      };

      let mouseup = (event) => {
        const diff = event.clientX - startX;

        if (diff < -250) {
          this.currentIndex = next;
        } else if (diff > 250) {
          this.currentIndex = prev;
        }

        curr = this.currentIndex;
        next = (curr + 1) % sliceNum;
        prev = (curr - 1 + sliceNum) % sliceNum;

        // this.root.children[prev].style.transition = "transform 0.3s";
        this.root.children[curr].style.transition = "transform 0.3s";
        // this.root.children[next].style.transition = "transform 0.3s";

        this.root.children[prev].style.transform = this.translate(-500 - prev * 500);
        this.root.children[curr].style.transform = this.translate(-curr * 500);
        this.root.children[next].style.transform = this.translate(500 - next * 500);

        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);

        setTimeout(()=>{
          this.lockScroll = false;
        }, 1000)
      };

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);
    });
  }
}

// debugger
var a = (
  <Carousel>
  </Carousel>
);

a.setSlices([
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]);
// debugger
a.mountOn(document.body)