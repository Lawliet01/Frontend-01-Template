var parser = require("./parser")

module.exports = function(source){
    let tree = parser.parseHTML(source)

    let template = null;
    let script = null;

    for (let node of tree.children) {
        if (node.tagName == "template")
            template = node;
        if (node.tagName == "script"){
            script = node.children[0].content;
        }
    }

    let visit = (node)=>{
        if (node.type === "text") {
            return JSON.stringify(node.content);
        }
        let attrs = {};
        for (let attribute of node.attributes) {
            attrs[attribute.name] = attribute.value;
        }
        let children = node.children.map(node=>visit(node))
        return `create("${node.tagName}",${JSON.stringify(attrs)},${children})`
    }


    let r = `
import {create, Component} from "./createElement.js"
export class NewCarousel extends Component{
    render(){
        return ${visit(template)}
    }
} 
console.log('good')

    `;

    console.log(r);
    

    return r
    
}