// 先不处理文本节点

const stack = [{type: "document", children:[]}]
const EOF = Symbol("EOF")
const { computedCSS, addCssRule } = require("./cssParser.js");


let currentToken = null
let currentText = {
    type: "text",
    content: ""
}
let currentAttribute = {}
let currentAttributeName = ""
let currentAttributeValue = ""


function data(c){
    if (c === "<") {
        return tagOpen
    } else if (c === "\U+0000") {

    } else if (c === EOF) {
        emit(EOF)
    } else {
        currentText.content += c
        emit(currentText)
        return data
    }
}

function tagOpen(c){
    if (c === "!") {

    } else if (c === "/") {
        return endTagOpen
    } else if (/\w/.test(c)) {
        currentToken = {
            tagName: "",
            type : "startTag"
        }
        return tagName(c)
    } else if (c === EOF) {

    } else {

    }
}

function endTagOpen(c) {
    if (/[\w]/.test(c)) {
        currentToken = {
            tagName: "",
            type: "closeTag",
        }
        return tagName(c);
    } else if (c === ">") {

    } else if (c === EOF)  {

    } else {

    }
}

function tagName(c) {
    if (/[\t\r\f ]/.test(c)){
        return beforeAttributeName
    } else if (c === "/") {
        return selfClosingStartTag
    } else if (c === ">") {
        emit(currentToken)
        return data
    } else if (/[A-Z]/.test(c)) {
        currentToken.tagName += c.toLowerCase()
        return tagName
    } else if (c === "\U+0000") {

    } else if (c === EOF) {

    } else {
        currentToken.tagName += c
        return tagName
    }
}

function beforeAttributeName(c){
    if (/[\t\r\f ]/.test(c)) {
        return beforeAttributeName
    } else if (c === "/" || c === ">" || c === EOF) {
        return afterAttributeName(c)
    } else if (c === "="){

    } else {
        currentAttributeName = ""
        currentAttributeValue = ""
        return attributeName(c)
    }
}

function attributeName(c) {
    if (/[\t\r\f ]/.test(c) || c === " "|| c === "/" || c === ">" || c === EOF) {
        afterAttributeName(c)
    } else if (c === "=") {
        return beforeAttributeValue
    } else if (/[A-Z]/.test(c)) {
        attributeName += c.toLowerCase()
    } else if (c === "\U+0000") {

    } else if (c === "\"" || c === "\'" || c === "\<") {

    } else {
        currentAttributeName += c
        return attributeName
    }
}

function afterAttributeName(c) {
    if (/[\t\r\f ]/.test(c)) {
        return afterAttributeName
    } else if (c === "/") {
        return selfClosingStartTag
    } else if (c === "=") {
        return beforeAttributeValue
    } else if (c === ">") {
        emit(currentToken)
        return data
    } else if (c === EOF) {

    } else {
        
    }
}

function beforeAttributeValue(c){
    if (/[\t\r\f ]/.test(c)) {
        return beforeAttributeValue
    } else if  (c === "\""){
        return attributeValueDoubleQuote
    } else if (c === "\'") {
        return attributeValueSingleQuote
    } else if (c === "<"){
        
    } else {
        currentAttributeValue = ""
        return attributeValueUnQuote(c)
    }
}

function attributeValueDoubleQuote(c) {
    if (c === "\""){
        return afterAttributeValueQuote
    } else if (c === "&") {

    } else if (c === "\U+0000") {

    } else if (c === EOF) {

    } else {
        currentAttributeValue += c
        return attributeValueDoubleQuote
    }
}

function attributeValueSingleQuote(c) {
    if (c === "\'"){
        return afterAttributeValueQuote;
    } else if (c === "&") {

    } else if (c === "\U+0000") {

    } else if (c === EOF) {

    } else {
        currentAttributeValue += c
        return attributeValueSingleQuote
    }
}

function attributeValueUnQuote(c) {
    if (/[\t\r\f ]/.test(c)){
        currentAttribute[currentAttributeName] = currentAttributeValue
        return beforeAttributeName
    } else if (c === "&") {

    } else if (c === ">"){
        currentAttribute[currentAttributeName] = currentAttributeValue;
        emit(currentToken)
        return data
    } else if (c === "\U+0000") {

    } else if (c === "\"" || c === "\'" || c === "<" || c === "=" || c === "\`") {

    } else if (c === EOF) {

    } else {
        currentAttributeValue += c
        return attributeValueUnQuote
    }
}

function afterAttributeValueQuote(c) {
    if (/[\t\r\f ]/.test(c)){
        currentAttribute[currentAttributeName] = currentAttributeValue;
        return beforeAttributeName
    } else if (c === "/") {
        return selfClosingStartTag
    } else if (c === ">") {
        currentAttribute[currentAttributeName] = currentAttributeValue;
        emit(currentToken)
        return data
    } else if (c === EOF) {

    } else {

    }
}

function selfClosingStartTag(c) {
    if (c === ">") {
        currentToken.type = "selfClosingTag"
        emit(currentToken)
        return data;
    } else if (c === EOF) {

    } else {

    }
}




function emit(token) {
    // 处理startTagToken
    if (token.type === "startTag" || token.type === "selfClosingTag") {
        const element = {
            type: "element",
            tagName: token.tagName,
            attribute : [],
            children: [],
            computedStyle: {}
        }


        for (let key of Object.keys(currentAttribute)) {
            element.attribute.push({
                name : key,
                value: currentAttribute[key] 
            })
        }
        stack.push(element)
        
        computedCSS(element, stack)

        currentAttribute = {}
        currentText.content = ""
    } 
    
    // 处理endTagToken
    if (token.type === "closeTag" || token.type === "selfClosingTag") {
        const element = stack.pop()
        if (element.tagName !== token.tagName) {
            throw new Error(`${element.tagName} and ${token.tagName} not matched`);
        }

        stack[stack.length - 1].children.push(element)
        currentText.content = "";

        if (element.tagName === "style") {
            addCssRule(element.children[0].content)
        }

    }

    // 处理textNode
    if (token.type === "text") {
        element = stack[stack.length - 1]
        if (element.children.length > 0 && element.children[element.children.length - 1].type === "text") {
            element.children[element.children.length - 1].content = token.content
        } else {
            let textNode = {
                type: "text",
                content: token.content
            }
            element.children.push(textNode)
        }
    }


}


module.exports.htmlParser = function(html){
    let state = data
    for (let c of html) {
        state = state(c)
    }

    state(EOF)

    return stack[0]
}








