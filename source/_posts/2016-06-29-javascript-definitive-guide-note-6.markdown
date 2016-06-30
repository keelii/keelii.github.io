---
layout: post
title: "《JavaScript 权威指南》读书笔记 8 - 函数"
date: 2016-06-29 20:22:22 +0800
comments: true
categories:
    - javascript
    - JavaScript_The_Definitive_Guide
---

函数是一段 JavaScript 代码，定义一次，可以被执行多次。JavaScript 孙灵是参数化的：函数定义会包括一个形参（parameter）的标识符列表，这些参数在函数体中像 **局部变量** 一样工作，函数被调用的时候会为形参提供实参（argument）的值。使用实参的值计算返回值，成为该函数的 **[调用表达式](/2016/06/20/javascript-definitive-guide-note-3/#TOC-4)**值，调用上下文（invocation context）可以用 this 引用，嵌套函数可以构成闭包（closure）

<!-- more -->

## 函数定义

使用 function 关键字来定义一个函数，可以用在函数定义表达式或者函数声明语句里

```javascript
// 打印对象名称和值
function printprops(o) {
    for(var p in o)
        console.log(p + ": " + o[p] + "\n");
}
// 递归调用计算阶乘
function factorial(x) {
    if (x <= 1) return 1;
    return x * factorial(x - 1);
}
// 函数定义表大式，函数名称可以省略
var square = function(x) { return x * x; }
```

return 语句导致函数停止执行，并返回它的表达式给调用都。如果 return 语句没有一个与之相关的表达式，则它返回 undefined 值，没有 return 语句也会默认返回 undefined 值给调用者

**嵌套函数**

```javascript
function hypotenuse(a, b) {
    function square(x) { return x*x; }
    return Math.sqrt(square(a) + square(b));
}
```

嵌套函数的作用域规则：它们可以访问嵌套它们的函数的参数和变量。上面的代码里，内部函数 square() 可以读写外部函数 hypotenuse() 定义的参数 a 和 b

## 函数调用

有 4 种方式来调用 JavaScript 函数：

* 作为函数
* 作为（对象）方法
* 作为构造函数
* 通过它们的 call() 和 apply() 方法间接调用

### 函数调用

> function_name(param1, param2);

### 方法调用

> object.method(param1, param2);

```javascript
// 对象直接量
var calculator = {
    operand1: 1,
    operand2: 1,
    add: function() {
        this.result = this.operand1 + this.operand2;
    },
    add1: function(a) {
        this.operand1 + a;
        return this;
    },
    add2: function(b) {
        this.operand2 + a;
        return this;
    }
};
calculator.add();
calculator.result       // => 2
// 使用对象属性访问表达式调用方法
calculator['result']    // => 2
// 链式调用
calculator.add1(1).add2(2)
calculator.operand1         // => 2
calculator.operand2         // => 3
```

### 构造函数调用

> new Object(param1, param2);

如果没有参数可以省略括号 `new Object`

### 间接调用

> function_name.call()

JavaScript 中的 **函数也是对象**，和其它 JavaScript 对象没什么区别，函数对象也可以包含方法。其中两个 [call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call) 和 [apply()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 可以用来间接地调用函数。两个方法都允许显式地指定调用所需的 this 值

## 函数的实参和形参

JavaScript 的函数定义不用指定形参的类型，调用传入的实参也可以是任意类型，JavaScript **甚至** 不检查传入实参的个数

### 可选形参

如果调用函数的时候传入的实参比指定的形参少，剩下的形参都将设置为 undefined 值，通常使用逻辑与运算符给形参指定默认值

```javascript
function getName(name) {
    // 如果 name 传入值则使用传入值，否则使用默认值 "no name"
    // 通常建议可选参数放在参数列表最后
    name = name || "no name";

    // code

    return name;
}
```

### 可变长的实参列表：实参对象

当调用函数的时候传入实参人个数超过形参个数时（和上面相反），没有办法直接获得未命名值的引用。参数对象解决了这个问题，在函数体内，标识符 arguments 是指向实参对象的引用，参数对象是一个 [类数组对象](/2016/06/23/javascript-definitive-guide-note-6/#TOC-23)，这样可以通过索引来访问实参了

```javascript
function fn(x, y, z) {
    console.log(arguments);
}
fn(1,2,3)           // => [1,2,3]
fn(1,2,3,4,5)       // => [1,2,3,4,5]
```

实参对象的重要用处就是让函数可以操作任意数量的实参，比如我们自己实现一个数组的 push 方法

```javascript
function push(arr /* optional items [, item ... [, item]] */) {
    var items = Array.prototype.slice.call(arguments, 1)
    for (var i = 0; i < items.length; i++) {
        arr[arr.length] = items[i];
    }
}
var arr1 = [1,2,3];
push(arr1, 4,5,6);
arr1                // => [1, 2, 3, 4, 5, 6]
```

在非严格模式下，修改 arguments 元素的值，实参的值也会变。不过在 ECMAScript 5 中这个特性被移除了。在非严格模式中，函数里的 arguments 仅仅是个标识符。在严格模式中，它变成了一个保留字，严格模式中函数无法使用 arguments 作为 **形参名** 或者 **局部变量名**，也不能给它（arguments）赋值

```javascript

function f(x) {
    console.log(x);         // => 实参的初始值
    arguments[0] = null;
    console.log(x);         // => 非严格返回 null， 非严格返回 1
}
f(1)
```

#### callee 和 caller 属性

除了数组元素，实参对象还定义了 callee 和 caller 属性。严格模式中对这两个属性读写操作会产生一个类型错误，非严格模式下，ECMAScript 标准规范规定 callee 属性指代当前正在执行的函数。caller 是非标准的，但大多数浏览器都实现了这个属性，它指代调用当前正在执行的函数的函数。通过 caller 属性可以访问调用栈，callee 属性在某些时候非常有用，比如在匿名函数中通过 callee 来递归调用自身

```javascript
var factorial = function(x) {
    if (x <= 1) return 1;
    return x * arguments.callee(x-1);
}
```

### 将对象属性用做实参

当一个函数包含超过三个形参时，很难记住参数顺序。这时我们可以用名/值对的形式来传入参数，这样参数的顺序就无关紧要了（然后名/值对里面的键名还是得记住）

```javascript
function arraycopy(from, from_start, to, to_start, length) {
}
function easycopycopy(args) {
    arraycopy(args.from,
              args.from_start || 0,
              args.to,
              args.to_start || 0,
              args.length);
}
var a = [1,2,3,4], b = [];
easycopy({ from: a, to: b, length:4 })
```

### 实参类型

JavaScript 函数中形参并未声明类型，在形参数传入之前也未做任何类型检查，JavaScript 会在必要的时候进行类型转换，因此如果函数期望接收一个出神入化串实参，而调用函数时传入其它类型的值，所传入的值会在函数体内将其转换为字符串

## 作为值的函数

函数的定义和调用是 JavaScript 的词法特性，其它语言也一样。然而在 JavaScript 中，函数不仅仅是一种语法，也可以是值，也就是说，可以将函数赋值给变量，存储在对象的属性或数组元素中，作为参数传入另外一个函数等

```javascript
function square(x) { return x*x; }
var s = square;
square(4) == s(4)       // => true

var a = [ function square(x) { return x*x; }, 20 ];
a[0](a[1]);             // => 400

// 将函数用做值
function add(x, y) { return x + y; }
function subtract(x, y) { return x - y; }
function multiply(x, y) { return x * y; }
function divide(x, y) { return x / y; }

function operate(operator, operand1, operand2) {
    return operator(operand1, operand2)
}
// => 25 (2 + 3) + (4 * 5)
var i = operate(add, operate(add, 2, 3), operate(multiply, 4, 5))
```

#### 自定义函数属性

JavaScript 中函数并不是原始值，而是一种特殊的对象，也就是说，函数可以拥有 **属性**。当函数需要一个 **静态变量** 来在调用时保持某个值不变，最方便的方式就是给函数定义属性，而不是定义全局变量

```javascript
// 注意静态变量不必在函数后面声明
uniqueInteger.counter = 0;

function uniqueInteger() {
    // 注意 ++counter 和 count++ 不一样
    return ++uniqueInteger.counter;
}
```

## 作为命名空间的函数

```javascript
(function(/*paramater*/) {
    // 模块代码
    // 这个模块使用的所有变量（通过 var 声明）都是局部变量
    // 不会污染全局命名空间
})(/*arguments*/);

(function(win, doc) {
    var obj = {
        privateMethod: function() {},
        publicMethod: function() {}
    };

    win.yourPublicAPIMethodName = obj.publicMethod
})(window, document);
```

使用 **[立即执行函数表达式（IIFE）](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression)** 可以隔离代码块的命名空间，在匿名函数中声明的变量只在内部有效，不会对全局产生影响，同时可以有选择地向全局输出变量用来给外部代码访问

## 闭包

> 词法作用域（lexical scoping）的执行依赖于变量作用域，这个作用域是在函数 **定义时** 决定的，而不是函数调用时，为了实现这种词法作用域，JavaScript 函数对象的内部状态不仅包含函数的代码逻辑，还必须引用当前的作用域链。函数对象可以通过作用域链相互关联起来，函数体内部的变量都可以保存在函数作用域内，这种特性在计算机科学文献中称为「闭包」

从技术角度讲，所有的 JavaScript 函数都是闭包：它们都是对象，它们都关联到作用域链。当调用函数时闭包所指向的作用域链和定义函数时的作用域链不是同一个作用域链时，事情就变得非常我刚好和。当一个函数嵌套了另外一个函数，外部函数将嵌套的函数对象 **作为返回值返回** 的时候，这种事情就发生了

先看一下嵌套函数的词法作用域规则：

```javascript
// 例 1
var scope = "global scope";
function checkscope() {
    var scope = "local scope";
    function f() { return scope;}
    return f();
}
checkscope();       // => "local scope"
// 例 2
var scope = "global scope";
function checkscope() {
    var scope = "local scope";
    function f() { return scope;}
    return f;
}
checkscope()()      // => "local scope"
```

在例 2 中我们将 checkscope 返回值 f 调用的括号移动到了 checkscope 调用后面。复习一下作用域的基本规则：JavaScript 函数的执行用到了作用域链，这个作用域链是函数 **定义的时候** 创建的，嵌套的函数 f() 定义在这个作用域链里，其中的变量 scope 一定是局部变量，不管在何时执行函数当 f()，这种绑定在执行 f() 时依然有效。因此最后一行代码返回「local scope」而不是「global scope」。简而言之，闭包的这个特性强大到让人吃惊：它们可以捕捉到局部变量（和参数），**并一直保存下来**

很多程序员觉得闭包非常难理解，他们觉得在外部函数中定义的局部变量在函数返回后就不存在了，那么嵌套的函数如何能调用不存在的作用域链呢？如果你想搞清楚这个问题，还得更深入地了解类似 C 语言这种更底层的编程语言，并了解基于栈的 CPU 架构 **如果一个函数的尾部变量定义在 CPU 的栈中，那么当函数返回时它们的确就不存在了**

[上节](#TOC-13)中的 uniqueInteger() 函数，这个函数有一个问题，函数本身是全局可访问的，这个 counter 很可能被外部修改。如果使用闭包就没有这个问题

```javascript
var uniqueInteger = (function() {
    var counter = 0;
    return function() {
        return ++counter;
    }
})();
```

上面的代码将匿名立即执行函数赋值给 uniqueInteger 变量，所以函数的返回值赋值给变量 uniqueInteger，内部变量 counter 只在函数体内部可以访问，外部无法操作

私有变量也可以被多个闭包访问到，比如：

```javascript
function counter() {
    var n = 0;
    return {
        count: function() { return n++ },
        reset: function() { n = 0 }
    }
}
// 创建两个计数器
var c = counter(), d = counter();
c.count()       // => 0 互
c.count()       // => 1 不
d.count()       // => 0 干
d.count()       // => 1 扰
c.reset()       // => 0 重置 c
d.count()       // => 2 不影响 d
```

在同一个作用域链中定义两个闭包，这两个闭包共享同样的私有变量或变量。这是一种非常重要的技术，但是要特别小心那些不希望共享的变量往往不经意间共享给了其它的闭包，了解这一点也很重要

```javascript
function constfunc(v) { return function() { return v; } }

var funcs = [];
for(var i = 0; i < 10; i++) {
    funcs[i] = constfunc(i);
}
```

如果这样写就完全不一样了

```javascript
function constfuncs() {
    var funcs = [];
    for (var i = 0; i < 10; i++) {
        funcs[i] = function() {
            return i;
        };
    }
    return funcs;
}
var funcs = constfuncs();
funcs[5]()                  // => 10 !!!
```

上面这段代码循环创建了 10 个闭包，并将它们存储到一个数组中。这些闭包都是在同一个函数调用中定义的，因此它们可以共享变量 i。当 constfuncs() 返回时，变量的 i 值是 10，所有的闭包都共享这一个值，因此，数组中的函数的返回值是同一个值，因此，数组中的函数的返回值都是同一个值，这不是我们想要的结果。关联到闭包的作用域链都是「活动的（live）」，记住这一点非常重要。嵌套的当函数不会将作用域内的私有成员复制一份，也不会对所绑定的变量生成表达快照（statick snapshot）

书写闭包的时候还需注意一件事情，this 是 JavaScript 的关键字，不是变量。正如之前讨论的，每个函数调用都包含一个 this 值，如果闭包在外部函数里是无法访问 this 的，除非外部函数将 this 默契为一个变量

```javascript
function outerFn() {
    var self = this;

    function innerFn() {
        // self.xxxx
    }
}
```

## 函数属性、方法和构造函数

在 JavaScript 中，函数是值，对函数执行 typeof 运算会返回字符串 "function"，但是函数是 JavaScript 中特殊的对象。因为函数也是对象，它们也可以拥有属性和方法，像普通对象一样。甚至可以用 Function() 构造函数来创建新的函数对象

### prototype 属性

每一个当函数都包含一个 prototype 属性，这个属性是指向一个对象的引用，这个对象称做「原型对象」（prototype object）。每一个函数都包含不同的原型对象。当将函数胜仗构造函数的时候，新创建的对象会从原型对象上继承属性

### call() 和 apply() 方法

> fun.call(thisArg[, arg1[, arg2[, ...]]])

> fun.apply(thisArg[, argsArray])

我们可以将 call 和 apply 看做是某个对象的方法，通过调用方法的形式来间接调用函数

```javascript
// 将对象 o 中名为 m 的方法替换为另外一个方法
function trace(o, m) {
    var original = o[m];
    o[m] = function() {
        console.log(new Date, "Entering: ", m);
        var result = original.apply(this, arguments)
        console.log(new Date, "Exiting: ", m);
    }
}
```

trace() 函数接收两个参数，一个对象和一个方法名，它将指定的方法替换为一个新方法，这个新方法就是「包裹」原始方法的另一个泛函数。这种动态修改已有方法的做法有时称做「猴子补丁 monkey-patching」

### bind() 方法

> fun.bind(thisArg[, arg1[, arg2[, ...]]])

bind 方法是 ECMAScript 5 中新增的方法，但在 ECMAScript 3 中可以模拟出来。主要用于将函数绑定到某个对象。当在函数 f 上调用 bind 方法并传入一个对象 o 做参数，这个方法将返回一个新的函数。调用新的函数将会把原始的函数 f **当做 o 的方法来调用**。传入新函数的任何实参都将传入原始函数

```javascript
function f(y) { return this.x + y; }
var o = { x: 1};
var g = f.bind(o);
g(2)                // => 3
```

可以通过下面代码实现 bind 方法

```javascript
function(f, o) {
    if (f.bind) {
        return f.bind(o);
    } else {
        return f.apply(ok arguments)
    }
}
```

bind 方法还有一些其他应用：除了第一个实参之外，传入 bind 的实参也会绑定至 this，这个附带的应用是一种常见的函数式编程技术，有时也被称为「柯里化」（currying）

```javascript
var sum = function(x, y) { return x + y }

var succ = sum.bind(null, 1)
succ(2)     // => 3

function f(y, z) { return this.x + y + z }
var g = f.bind({x:1}, 2)
g(3)        // => 6
```

注意 bind 方法有些特性是模拟不出来的

### toString() 方法

和所有的 JavaScript 对象一样，函数也有 toString 方法，ECMAScript 规范规定这个方法返回一个字符串，这个字符串和函数声明语句的语法相关。实际上，大多数的 toString 方法的实现都返回函数的完成源码。内置函数往往返回一个类似 "[native code]" 的字符串作为函数体

### Function() 构造函数

> new Function ([arg1[, arg2[, ...argN]],] functionBody)

关于 Function() 构造函数有几点需要特别注意：

* Function() 构造函数允许 JavaScript 在运行时动态地创建并编译函数
* 每次调用 Function() 构造函数都会解析函数体，执行效率会受影响。
* Function() 构造函数创建的函数 **并不是使用词法作用域**，相反，函数体代码的编译总是会在顶层函数执行，效果类似在全局作用域中执行 eval()

```javascript
var scope = "global";
function constructFunction() {
    var scope = "local";
    return new Function("return scope");
}
constructFunction()();  // => "global"
```

### 可调用的对象

「类数组对象」类似数组但并不是真正的数组，「可调用对象（callable object）」类似于函数但并不是真正的函数。可调用对象在两个 JavaScript 实现中不能算作函数。首先，IE Web 浏览器（IE 6 及之前的版本）实现了客户端方法（如 Window.alert() 和 Document.getElementById()），使用了可调用的宿主对象，而不是内置函数对象，IE 中的这些方法在其它浏览器中都存在，但它们本质上不是 Function 对象。IE 9 将它们实现为真正的函数，因此这类可调用的对象将越来越罕见

另外一个常见的可调用对象是 RegExp 对象，对 RegExp 执行 typeof 运算的结果并不统一，有些返回 "function" 有些返回 "object"。可以使用下面的方法判断是不是真正的函数对象

```javascript
function isFunction(o) {
    return Object.prototype.toString.call(x) === "[object Function]"
}
```

## 函数式编程

JavaScript 并不是一种像 List 或 Haskell 的函数式编程语言，但在 JavaScript 中可以像操控对象一样操控函数，也就是说可以在 JavaScript 中应用函数式编程技术

### 使用函数处理数组

假设有一个数组，元素都是数字，我们想要计算这些元素的平均值和标准差。若使用非函数式编程风格的话代码一般会是这样：

```javascript
var data = [1,1,3,5,5]
var total = 0;
for (var i = 0; i < data.length; i++) {
    total += data[i];
}
var mean = total / data.length;                 // => 3

total = 0;
for (var i = 0; i < data.length; i++) {
    var deviation = data[i] - mean;
    total += deviation * deviation;
}
var stddev = Math.sqrt(total/(data.length-1))   // => 2
```

可以使用数组方法 map() 和 reduce() 来实现同样的计算，这种实现极其乘法：

```javascript
var sum = function(x, y) { return x + y; }
var square = function(x) { return x*x; }

var data = [1,1,3,5,5]
var mean = data.reduce(sum)/data.length;
var deviations = data.map(function(x) { return x-mean; })
var stddev = Math.sqrt(deviations.map(square).reduce(sum)/(data.length-1))
```

当然 ECMAScript 3 并没有 [map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)， [reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) 这两个方法，不过我们也可以自己实现一个 Polyfill，可以参考链接里面的内容

### 高阶函数

所谓高阶函数（higher-order function）就是操作函数的函数，它接收一个或多个函数作为参数，并返回一个新函数

```javascript
function not(f) {
    return function() {
        var result = f.apply(this, arguments);
        return !result;
    }
}
var even = function(x) {
    return x % 2 == 0;
}
var odd = not(even);
[1,1,3,5,5].every(odd)          // => true
```



