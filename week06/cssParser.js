const {parse} = require('css')
const rules = []

/**
* 获得优先级
*/
function sp(selectors){
    const res = [0, 0, 0, 0]
    for (let selector of selectors) {
        if (selector.charAt(0) === "#") {
            res[1] ++
        } else if (selector.charAt(0) === ".") {
            res[2] ++
        } else {
            res[3]++
        }
    }

    return res
}

/**
* 比较优先级
*/
function higherPriority(newOne, oldOne) {
    for (let i = 0; i < 4; i++){
        if (newOne[i] > oldOne[i]) {
            return true
        } else if (newOne[i] < oldOne[i]) {
            return false
        }
    }
    return true
}

/**
* 测试是否匹配
*/
function matched(selector, element){
    if (selector && selector.charAt(0) === "#") {
        for (let attr of element.attribute) {
            if (attr.name === "id" && attr.value === selector.slice(1))
                return true
        }
    } else if (selector && selector.charAt(0) === ".") {
        for (let attr of element.attribute) {
            if (attr.name === "class" && attr.value === selector.slice(1))
                return true
        }
    } else if (selector === element.tagName) {
        return true
    } 
    return false
}

/**
* 通过css parser得到ast
*/
exports.addCssRule = function(rule){
    const ast = parse(rule)
    rules.push(...ast.stylesheet.rules)
    // console.log(JSON.stringify(rules, null, 4));
}

/**
* 计算element的CSS属性
*/
exports.computedCSS = function(element, stack){
    stack = stack.slice().reverse()

    for (let {selectors, declarations} of rules) {
        selectors = selectors[0].split(" ").reverse()

        if (! matched(selectors[0], element))
            continue
        let i = 1, j = 1
        // 计算是否匹配
        while (i < stack.length) {
            if (matched(selectors[j], stack[i++]))
                j++
        }

        if (j >= selectors.length) {
            for (let rule of declarations) {
                // 计算优先级
                const newSp = sp(selectors)
                if (element.computedStyle.sp && !higherPriority(newSp, element.computedStyle.sp))
                    continue
                element.computedStyle.sp = newSp;
                element.computedStyle[rule.property] = rule.value
            }
        }
    }
}












