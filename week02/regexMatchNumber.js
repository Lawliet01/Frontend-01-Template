const regex = /^([+]|[-])?(([1-9]\d*([.]\d*)?)|(0b[0-1]+)|(0x([0-9]|[A-F])+)|(0o?[0-8]+)|([-]?InFinity)|(NaN))$/i;


console.log(regex.test("12")); 
console.log(regex.test("123214.654654"));
console.log(regex.test("-12"));
console.log(regex.test("-0o1245"));
console.log(regex.test("0xFFFF"));
console.log(regex.test("0b110"));
console.log(regex.test("-InFinity"));
console.log(regex.test("NaN"));


