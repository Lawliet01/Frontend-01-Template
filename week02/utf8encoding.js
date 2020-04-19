function utf8Encoding(bufferArray){
    
}


/**
* 接收[1,0,1] 或"111"的形式
* 返回10进制的大小
*/
function binaryToDecimal(binary){ 
    if (typeof binary === "object") {
        binary = binary.join("")
    }
    return parseInt(binary,2)
}
