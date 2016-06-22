---
layout: post
title: "《JavaScript 权威指南》读书笔记 4 - 表达式和运算符"
date: 2016-06-20 19:10:28 +0800
comments: true
categories:
    - javascript
    - JavaScript_The_Definitive_Guide
---

## 表达式和运算符

表达式（expression）是 JavaScript 中的一个短语，JavaScript 解释器会将其计算（evaluate）出一个结果。程序中的常量、变量名、数组访问等都是表达式

简单表达式组合成复杂表达式最常用的方法就是使用运算符（operator）

<!--more-->

### 原始表达式

是最简单的表达式是「原始表达式」（primary expression）。是表达式的 __最小单位__ ———— 不再包含其他表达式。常量、直接量、关键字、变量都是原始表达式

```
1.23
"hello"
/pattern/

true
false
null
this

i
sum
undefined
```

### 对象和数组的始化表达式

对象和数组的始化表达式实际上是一个新创建的对象和数组，这些表达式有时也称做「对象直接量」和「数组直接量」

```javascript
[]
[1+2, 3+4]

var sparseArray = [1,,,,,5]           // 数组分割逗号之前的元素可以省略，空位默认填充 undefined
var matrix = [[1,2,3], [4,5,6], [7,8,9]]

var p = { x: 2.3, y: -1.2}
var q = {}
q.x = 2.3; q.y = -1.3
```

JavaScript 对数组始化表达式进行求值的时候，数组初始化表达式中的元素表达式也都会各自计算一次。也就是说，数组初始化表达式每次计算的值有可能是不同的

### 函数定义表达式

```javascript
var square = function(x) { return x*x }
```

### 属性访问表达式

```javascript
// expression.identifier
// expression[expression]

var o = { x:1, y:{z:3} };
var a = [0, 4, [5, 6]];
o.x             // => 1 表达式 o 的 x 属性
o.y.z           // => 3 表达式 o.y 的属性 z
o["x"]          // => 1 对象 o 的 x 属性
a[1]            // => 4 表达式 a 中索引为 1 的元素
a[2]["1"]       // => 6 表达式 a[2] 中索引为 1 的元素
a[0].x          // => 1 表达式 a[0] 的 x 属性
```

不管使用哪种形式的属性访问表达式，在「.」和「[」之前的表达式 __总是会首先计算__。如果计算结果是 null 或者 undefined，表达式会抛出一个类型错误异常，因为这两个值都不能包含任意属性。如果运算结果不是对象（或者数组），JavaScript 会将其转换为对象。如果对象表达式后跟随一对方括号，则会计算方括号内的表达式的值并将它转换为字符串，__不论哪种情况__，如果命名的属性不存在，那么整个属性访问表达式的值就是 undefined

### 调用表达式

JavaScript 中的调用表达式（invocation expression）是一种调用（或者执行）函数或者方法的语法表示。它以一个函数表达式开始，后面跟随一对圆括号，括号内是一个以逗号隔开的参数列表

```javascript
f(0)
Math.max(x, y, z)
a.sort()
```

### 对象创建表达式

```javascript
new Object()
new Point(2, 3)

// 如果不需要传入参数给构造函数，圆括号可以省略
new Object
new Date
```

### 运算符表达式

JavaScript 中的运算符用于自述表达式、比较表达式、逻辑表达式、赋值表达式等。大多数运算符都是由标点符号表示的，比如：「+」和「= 」，另外的一些运算符则是由关键字表示的，比如：delete 和 instanceof。

_表4-1_

| 运算符      | 操作                             | A     | N     | 类型             |
| ------      | ----------------                 | :---: | :---: | ----------       |
| ++          | Pre- or post-increment           | R     | 1     | lval→num         |
| --          | Pre- or post-decrement           | R     | 1     | lval→num         |
| -           | Negate number                    | R     | 1     | num→num          |
| +           | Convert to number                | R     | 1     | num→num          |
| ~           | Invert bits                      | R     | 1     | int→int          |
| !           | Invert boolean value             | R     | 1     | bool→bo          |
| delete      | R emove a property               | R     | 1     | lval→bool        |
| typeof      | Determine type of operand        | R     | 1     | any→str          |
| void        | Return undefined value           | R     | 1     | any→undef        |
| *, /, %     | Multiply, divide, remainder      | L     | 2     | num,num→num      |
| +, -        | Add, subtract                    | L     | 2     | num,num→num      |
| +           | Concatenate strings              | L     | 2     | str,str→str      |
| <<          | Shift left                       | L     | 2     | int,int→int      |
| >>          | Shift right with sign extension  | L     | 2     | int,int→int      |
| >>>         | Shift right with zero extension  | L     | 2     | int,int→int      |
| <, <=,>, >= | Compare in numeric order         | L     | 2     | num,num→bool     |
| <, <=,>, >= | Compare in alphabetic order      | L     | 2     | str,str→bool     |
| instanceof  | Test object class                | L     | 2     | obj,func→bool    |
| in          | Test whether property exists     | L     | 2     | str,obj→bool     |
| ==          | Test for equality                | L     | 2     | any,any→bool     |
| !=          | Test for inequality              | L     | 2     | any,any→bool     |
| ===         | Test for strict equality         | L     | 2     | any,any→bool     |
| !==         | Test for strict inequality       | L     | 2     | any,any→bool     |
| &           | Compute bitwise AND              | L     | 2     | int,int→int      |
| ^           | Compute bitwise XOR              | L     | 2     | int,int→int      |
| ||          | Compute bitwise OR               | L     | 2     | int,int→int      |
| &&          | Compute logical AND              | L     | 2     | any,any→any      |
|             | Compute logical OR               | L     | 2     | any,any→any      |
| ?:          | Choose 2nd or 3rd operand        | R     | 3     | bool,any,any→any |
| =           | Assign to a variable or property | R     | 2     | lval,any→any     |
| *=, /=, %=, += <br> -=, &=, ^=, \| = <br> <<=, >>=, >>>= | Operate and assign | R | 2 | lval,any→any |


#### 操作数的个数

运算符可以根据操作数的个数进行分类，JavaScript 中的大多数运算符（比如「*」乘法运算符）是一个二元运算符（binary operator），将两个表达式合并成一个稍复杂的表达式。JavaScript 同样支持一元运算符（unary operator），表达式 -x 中的「-」运算符就是一个一元运算符，是将操作数 x 求负值。JavaScript 支持一个三元运算符（ternary operator），条件判断运算符「?:」，它将三个表达式合并成一个表达式

#### 操作数的类型和结果类型

JavaScript 运算符通常会根据需要对操作数进行类型转换。乘法运算符「*」希望操作数为籽安，但是表达式 "3" * "5" 却是合法的，因为 JavaScript 会将操作数转换为数字。结果是数字类型的 15

一些运算符对操作数类型有着不同程度的依赖。比如加法运算符「+」可以对数字进行加法，也可以做字符串连接。同样「<」比较运算符可以进行数值大小比较，也可以比较字符在字母表中的次序先后

#### 左值（lvalues）

左传是一个古老的术语，它指「表达式只能出现在赋值运算符的左侧」。在 JavaScript 中，变量、对象属性、数组元素均是左值，ECMAScript 规范中允许内置函数返回一个左值，但自定义函数则不能

#### 运算符的副作用（opreator side effects）

计算一个简单的表达式（比如 2*3）不会对程序的运行状态造成任何影响，程序后续执行的计算也不会受到该计算的影响。而有一些表达式则具有很多副作用，赋值运算符是最明显的一个例子：如果给一个变量或者属性赋值，那么那些使用这个变量或者属性的表达式的值都会发生改变。「++」和「--」与些类似，因为它们包含 __隐式的__ 赋值。delete 运算符同样有副作用删除一个属性就像（但不完全一样）给这个属性赋值 undefined

#### 运算符优先级

如果你不确定你所使用的运算符的优先级，最简单的方法就是使用圆括号来强行指定运算次序

#### 运算符的结合性

表 4-1 标题为 A 的列说明了运算符的结合性。__L 指从左至右结合，R 指从右至左结合__。结合性指定了在多个具有同样优先级的运算符表达式中的运算顺序。

```javascript
w = x - y - z;              // 减法运算符具有从左至右的结合性
x = ~-y                     // 等价于 ~(-y)
w = x = y = z               // 等价于 w = (x = (y = z))
q = a?b:c?d:e?f:g           // 等价于 q = a?b:(c?d:(e?f:g))
```

#### 运算顺序

运算符优先级和结合性规定了它们在复杂的表达式中的运算顺序，但并没有规定子表达式的计算过程中的运算顺序。JavaScript 总是严格按照从左至右的顺序来计算表达式。例如，在表达式 w = x + y * z 中，将首先计算子表达式 w， 然后计算 x, y 和 z，然后，y,z 相乘，再加上 x 的值，最后赋值给表达式 w 所指代的变量或者属性

假设存在 a = 1，那么「b = (a++) + a」将如何计算呢？

1) 计算 b
2) 计算 a++ （假设为 c）
3) 计算 a
4) 计算 c + a
5) 将 c + a 的结果赋值给 b

按照「++」的定义，第 2) 步中 a++ 的结果依然是 1，即 c 为 1，随后 a 立即增 1， 因此在执行第 3) 步时，a 的值已经是 2。所以 b 的结果为 3

### 算术表达式

所有那些无法转换数字的操作数都转换为 NaN 值，如果操作数（或者转换结果）是 NaN 值，算术运算的结果也是 NaN。

#### 「+」运算符

加号的转换规则优先考虑字符串链接，如果其中一个操作数是字符串或者转换为字符串的对象，另外一个操作数将会转换为字符串，加法将进行字符串的连接操作

加法操作符的行为表现为：

如果其中一个操作数是对象，则对象会遵循对象到原始值的转换规则转换成原始类值：日期对象通过 toString() 方法执行转换，其它对象则通过 valueOf() 方法执行转换（如果 valueOf 谅坂加一个原始值的话）。由于多数对象都不具备可用的 valueOf() 方法，因为它们会通过 toString() 方法来执行转换

* 在进行了对象到原始值的转换后，如果其中一个操作数是字符串的话，另外一个操作数也会被转换为字符串，然后进行字符串连接
* 否则，两个操作数都将转换为数字（或者 NaN），然后进行加法操作

```javascript
1 + 2                   // => 3
"1" + "2"               // => "12"
"1" + 2                 // => "12"
1 + {}                  // => "1[object Object]"
true + true             // => 2
2 + null                // => 2
2 + undefined           // => NaN

1 + 2 + " blind mice"    // => "3 blind mice"
1 + (2 + " blind mice")  // => "12 blind mice"
```

#### 一元运算符

一元运算符作用于一个单独的操作数，并产生一个新值。在 JavaScript 中一元运算符有很高的优先级，而且都是 __右结合__（right-associative），「+」和「-」是一元运算符，也是二元运算符

##### 一元加法（+）

一元加运算符把操作数转换为数字（或者 NaN），并返回这个转换后的数字。如果操作数本身就是数字，则直接返回这个数字

##### 一元减（-）

当「-」胜仗和一元运算时，它会根据需要把操作数转换为数字，然后改变运算结果的符号

##### 递增（++）

递增「++」运算符对其操作数进行增量（加一）操作，操作数是一个左传（lvalue）（变量、数组元素或对象属性）。运算符将操作数转换为数字，然后给数字加 1，并将加 1 后的数值重新赋值给变量、数组或者对象属性

递增「++」运算符的返回值依赖于它相对于操作数的位置。当运算符在操作数之前，称为「前增量」（pre-increment）运算符，它对操作数进行增量计算，并返回计算后的值。当运算符在操作数之后，称为「后增量」（post-increment）运算符，它对操作数进行增量计算，但返回未做增量计算的（unincremented）值

```javascript
var i = 1, j = ++i;     // i,j 都是 2
var i = 1, j = i++;     // i 是 2， j 是 1
```

##### 递减（--）

同递增

#### 位运算符

位运算符可以对由数字表壳的二进制数据进行更低层级的按位运算

位运算要求它的操作数是整数，这些整数表示为 32 位整数而不是 64 位。必要时运算符先将操作数转换为数字，并将数字强制表示为 32 位整型，这时会魅力原格式中的小数部分和任何超过 32 位的二进制位。移位运算符要求右操作数在 0 ~ 31 之前。在将其操作数转换为无符号的 32 位整数后，它们将作序第 5 位之后的二进制位，以便生成一个位数正确的数字。需要注意的是，位运算符会将 NaN, Infinity, -Infinity 都转换为 0


### 关系表达式

#### 相等和不等运算符

「==」和「===」运算符用于比较两个值是否相等，两个运算符允许任意类型的操作数，如果操作数相等返回 true，否则返回 false。「===」也称为严格相等（strict equality）运算符，有时也称做恒等运算符（identity operator）

__严格相等运算符__「===」首先计算期操作数的值，然后比较这两个值，比较过程 __没有任何类型转换__：

* 如果两个值类型不相同，则它们不相等
* 如果两个值都是 null 或著都是 undefined，则它们不相等
* 如果两个值都是布尔值 true 或 false，则它们相等
* 如果其中一个值是 NaN，或者两个值都是 NaN，则它们不相等。NaN 和其他任何值都不相等，__包括它本身__
* 如果两个值为数字且数值相等。如果一个值为 0，另一个值为 -0，则它们同样相等
* 如果两个值为字符串，且所售的对应位上的 16 位数完全相等，则它们相等。如果它们的长度或内容不同，则不相等。
* 如果两个引用值指向同一个对象、数组或者函数，则它们是相等的。如果指向不同的对象，则不相等，尽管两个对象可能具有完全一样的属性

__相等运算符__「==」和恒等类似，但是如果操作数不是同一类型，相等运算符会尝试进行一些类型转换，然后比较：

* 如果两个操作数的类型相同，则和上文所述的严格相等规则一样
* 如果两个操作数类型不同，相等操作符也可能会认为它们相等。检测相等规则如下：
    * 如果一个值是 null，另一个是 undefined，则它们相等
    * 如果一个值是数字，另一个是字符串，先将字符串转换为数字，然后比较
    * 如果其中一个值是 true，则将其转换为 1 再进行比较。false 为 0
    * 如果一个值是对象，另一个值是数字或者字符串，则使用「转换规则」将对象转换为原始值，然后再比较
    * 其他不同类型之前的比较均不相等

#### 比较运算符

比较运算符用来检测两个操作数的大小关系（数值大小或者字母表顺序），例如：<, >, <=, >=

比较运算符的操作数可能是任意类型。然而 __只有数字和字符串才能真正执行比较操作__，因此那些不是数字和字符串的操作都将进行类型转换，规则如下：

* 如果操作数为对象，那么这个对象将依照「转换规则」转换为原始值
* 在对象转换为原始值之后，如果至少有一个操作数不是字符串，那么两个操作数都将转换为数字进行数值比较。0 和 -0 是相等的。Infinity 比其它任何数字都大（除它本身），如果一个操作数是（或者转换后是）NaN，那么比较操作符 __总是__ 返回 false

需要注意的是，JavaScript 字符串是一个由 16 位整数值组成的序列，字符串的比较也只是两个字符的数值比较。字符串的比较是区分大小写的，所有的大写 ASCII 字母都「小于」小写的 ASCII 字母。比如比较「Zoo」和「aardvark」，结果为 true

```javascript
1 + 2               // => 3
"1" + 2             // => "12"
"11" < "3"          // => true 字符串的比较
"11" < 3            // => false 转换后数字的比较
"one" < 3           // => false 数字的比较，"one"转换成 NaN
```

注意比较运算符（<=, >=）并没有严格「大、小」于的说法

#### in 运算符

in 运算符希望它的左操作数是一个字符串或者可以转换为字符串，希望它的右操作数是一个对象。如果右侧的对象拥有一个名为右操作数值的属性名，那么表达式返回 true，例如：

```javascript
var point = { x:1, y:1 }
"x" in point
"z" in point
"toString" in point
var data = [7,8,9]
"0" in data                 // => true      data["0"]
1 in data                   // => true      data[1]
3 in data                   // => false     data[3]
```

#### instanceof 运算符

instanceof 运算符希望左侧操作数是一个对象，右操作数标识对象的类。如果左侧的对象是右侧类的实例，则表达式返回 true，否则返回 false。

```javascript
var d = new Date();
d instanceof Date;   // => true
d instanceof Object; // => true
d instanceof Number; // => false

var a = [1,2,3];
a instanceof Array   // => true
a instanceof Object  // => true
a instanceof RegExp  // => false
```

需要注意的是，__所有的对象都是 Ojbect 的实例__。当通过 instanceof 判断一个对象是否是一个类的实例的时候，__这个判断也会包含对「父类」__（superclass）的检测。如果左操作数不是对象的话，instanceof 返回 false。如果右操作数不是函数，则抛出一个类型错误异常


### 逻辑表达式

#### 逻辑与（&&）

如果逻辑与运算符的左操作数转换成逻辑值为假的时候 && 操作符不会去计算右操作数，比如：

```javascript
var o = { x: 1 }
var p = null;
o && o.x            // => 1
p && p.x            // => null p 是伟假值，因此将其返回，并不计算 p.x
```

「&&」的行为有胡称做「短路」（short circuiting），我们经常看到很多代码利用这一我来有条件的执行代码，例如下面两条代码完全等价：

```javascript
if (a == b) stop();
(a == b) && stop;
```

#### 逻辑或（||）

|| 会首先计算第一个操作数的值，也就是说会首先计算左侧的表达式。如果计算结果为真值，就返回这个真值。否则，再计算第二个操作数的值，即右侧的表达式，并返回计算结果

通常我们用「||」来从一组备选表达式中选出第一个真值：

```javascript
var max = max_width || preferences.max_width || 500

function copy(o, p) {
    p = p || {}         // 用来给函数参数添加默认值
}
```

#### 逻辑非（!）

```javascript
// 对于 p 和 q 取任意值，这两个等式都永远成立
!(p && q) === !p || !q
!(p || q) === !p && !q
```

### 赋值表达式

```javascript
i = 0
o.x = 1
(a = b) == 0              // b 的值赋给 a 再进行相等判断

i = j = k = 0;            // 把三个变量寝化为 0
total += sales_tax        // 带操作的赋值运算
total = total + sales_tax // 和上面等价
```

_表4-2_

| 运算符   | 示例     | 等价于      |
| -------- | -------  | ----------  |
| +=       | a += b   | a = a + b   |
| -=       | a -= b   | a = a - b   |
| *=       | a *= b   | a = a * b   |
| /=       | a /= b   | a = a / b   |
| %=       | a %= b   | a = a % b   |
| <<=      | a <<= b  | a = a << b  |
| >>=      | a >>= b  | a = a >> b  |
| >>>=     | a >>>= b | a = a >>> b |
| &=       | a &= b   | a = a & b   |
| \|=      | a \|= b  | a = a \| b  |
| ^=       | a ^= b   | a = a ^ b   |

### 表达式计算

#### eval()

eval() 是一个函数，但是它通常被当成运算符。如果一个池娄调用了 eval()，那么解释器将无法对这个函数做进一步的优化。而将 eval() 定义为函数的另一个问题是，它可以被赋予其他的名字：

```javascript
var f = eval;
var g = f;
```

eval() 只有一个参数。如果传入的参数不是字符串，它直接返回这个参数。如果参数是字符串，它会把字符串当成 JavaScript 代码进行编译（parse），如果编译失败则抛出一个语法错误（SyntaxError）异常。如果编译成功，则开始执行这段代码，并返回字符串中的最后一个表达式或者语句的值，如果最后一个表达式或者语句没有值，则最终返回 undefined

__eval() 使用了调用它的变量作用域__ 环境。也就是说，它查找变量的值和定义新变量和函数的操作和局部作用域中的代码完全一样

#### 全局 eval()

eval() 具有更改局部变量的能力。ECMAScript 3 标准规定了任何解释器都不允许对 eval() 赋予别名，通过别名调用会抛出一个 EvalError 异常

实际上，大多数的实现并不是这么做的。当通过别名调用时，eval()  会将其字符串当成顶层的全局代码来执行

ECMAScript 5 是返回使用 EvalError 的，并且规范了 eval() 的行为

```javascript
var geval = eval;
var x = "global", y = "global";
function f() {
    var x = "local";
    eval("x += 'changed'");
    return x
}
function g(){
    var y = 'local';
    geval("y += 'changed'");
    return y
}

console.log(f(), x);
"changed global"
console.log(g(), y);
"globalchanged"
```

#### 严格 eval()

ECMAScript 5 严格模式函数的行为施加了更多的限制，甚至对标识符 eval 的使用也施加了限制。当在严格模式下调用 eval() 时，或者 eval() 执行的代码段以「use strict」指令开始，这里的 eval() 是私有上下文环境中的局部 eval。也就是说，在严格模式下，eval 挂靠的代码段可以查询或者更改局部变量。但不能在局部作用域中定义新的变量或者函数，此外严格模式将「eval」列为保留字，这让 eval() 更像一个运算符。不能用一人上别名覆盖 eval() 函数。并且变量名、函数名、函数参数或者异常捕获的参数都不能取名为「eval」


### 其它运算符

#### 条件运算符（?:）

条件运算符是 JavaScript 中唯一的个三元运算符（三个操作数）。

条件运算符的操作数可以是任意类型。第一个操作数当成布尔值，如果它是真值，那么将计算第二个操作数，并返回其计算结果。否则，如果第一个操作数是假值，那么将计算第三个操作数，并返回期计算结果。第二、三个操作数总是会计算其中一个，不可能同时执行

```javascript
gretting = "hello " + (username ? username : "there");

// 等价于下面的条件语句
gretting = "hello ";
if (username)
    gretting += username;
else
    gretting += "there";
```

#### typeof 运算符

typeof 是一元运算符，放在其单个操作数前面，操作数可以是任意类型。返回值为表示操作数类型的一个字符串

_表4-3_

| 值                     | typeof运算结果 |
| ---------------        | ----------     |
| undefined              | "undefined"    |
| null                   | "object"       |
| true/false             | "boolean"      |
| 任意数字或者NaN        | "number"       |
| 任意字符串             | "string"       |
| 任意函数               | "function"     |
| 任意内置对象（非函数） | "object"       |
| 任意宿主对象           | 由编译器各自实现的字符串，但不是<br> "undefined", "boolean", "number", "string" |


#### delete 运算符

delete 是一元运算符，它用来删除对象属性或者数组元素。就像赋值、递增/减运算符一样，delete 也是有副作用的

```javascript
var o = { x: 1, y: 2 }
delete o.x                  // => true 删除成功
"x" in o                    // => false 没有 "x" 元素
var a = [1,2,3]
delete a[2]                 // => true 删除最后一个元素成功
2 in a                      // => false 不存在 2 这个元素
a.length                    // => 3
```

需要注意的是，删除属性或者数组元素不难舍难分是设置了一个 undefined 值。当删除一个属性时，这个属性将不再存在。庋了一个不存在的属性将返回 undefined，但是可以通过 in 运算符来检测这个属性是否在对象中存在

delete 希望他的操作数是一个左传，如果它不是左传，那么 delete 将 __不进行任何操作同时返回 true__。否则，delete 将试图删除这个指定的左传。如果删除不成功，delete 将返回 true。然后并不是所有的属性都可删除，一些内置核心和客户端属性是不能删除的，用户通过 var 语句声明的变量、function语句声明的函数 也不能删除

ECMAScript 5 严格模式中，如果 delete 的操作数是非法的，比如变量、函数或者函数参数，delete 操作将抛出一个语法错误（SyntaxError）异常，只有操作数是一个属性访问表达式的时候它才会正常工作。在严格模式下，delete 删除不可配置的属性时会抛出一个错误异常，非严格模式下，不会报错，只是简单地返回了 false

```javascript
var o = { x:1, y: 2 }
delete o.x              // => true
typeof o.x              // => "undefined"
delete o.x              // => true 删除一个不存在的属性
delete o                // => false 不能删除通过 var 声明的变量

delete 1                // => true 参数不是一个左值
this.x = 1              // => 给全局对象一个属性 x，没使用 var
delete x                // => 试图删除它，在非严格模式下返回 true，严格模式下会抛出异常，这时只能使用 delete this.x
```

#### void 运算符

void 是一元运算符，它出现在操作数之前，操作数可以是任意类型。这个运算符不经常使用：操作数会照常计算，但忽略计算结果并返回 undefined。由于 void 会忽略操作数的值，因为在操作数具有副作用的时候使用 void 来让程序更具语义

这个运算符最学用丰客户端的 URL —— javascript: URL 中，在 URL 中写带有副作用的表达式，而 void 则让浏览器不必显示这个表达式的计算结果

```html
<a href="javascript: void window.open();">打开一个窗口</a>
```

#### 逗号运算符

逗号运算符是二元运算符，它的操作数是任意类型。它首先计算左操作数，然后计算右操作数，最后返回右操作数的值，看下面的示例代码

```javascript
i = 0, j = 1, k = 2;
// 和下面的代码基本上是等价的
i = 0; j = 1; k = 2;
```

总会计算左侧的表达式，但计算结果魅力掉，也就是说只有左侧表达式具有副作用，最常用的场景是 for 循环

```javascript
for (var i = 0, j = 10; i < j; i++,j--)
    console.log(i+j);
```
