---
layout: post
title: "《JavaScript 权威指南》读书笔记 6 - 对象"
date: 2016-06-23 19:10:28 +0800
comments: true
categories:
    - javascript
    - JavaScript_The_Definitive_Guide
---

对象是 JavaScript 的基本数据类型。是一种复合值：将很多值聚合在一起。对象可以看做是无序集合，每个属性都是一个名/值对。这种基本数据结构还有很多叫法，比如「散列」（hash）、「散列表」（hashtable）、「字典」（dictionary）、「关联数组」（associative array）。JavaScript 还可以从一个称为 **原型** 的对象继承属性

JavaScript 对象是动态的 —— 可以新增属性也可以删除属性，除了字符串、数字、布尔值、null 和 undefined 之外，JavaScript 中的值都是对象

对象是可变的，通过引用操作对象原对象也会受到影响
<!--more-->

属性包括名字和值。名字是可以包含空字符串在内的 **任意字符串**，值可以是任意 JavaScript 值，或者（在 ECMAScript 5中）可以是一个 getter 或者 setter （或都有），每个属性还有一些与之相关的值称为「属性特性」（property attribute）：

* 可写（writable）
* 可枚举（enumerable）
* 可配置（configurable），表明是否可以删除或者修改

ECMAScript 5 之前，**通过代码给对象创建的所有属性都是可写、可枚举和可配置的**

除了包含属性之外，每个对象还拥有三个相关的对象特性（object attribute）：

* 对象的原型（prototype）指向另外一个对象，本对象的属性继承自它的原型对象
* 对象的类（class）是一个标识对象类型的字符串
* 对象的扩展标记（extensible flag）指明了（在 ECMAScript 5 中）是否可以向该对象添加新属性

下面这些术语用来区分三类 JavaScript 对象和两类属性：

* 内置对象（native object），由 ECMAScript 规范定义的对象或类。例如 数组、日期
* 宿主对象（host object），由 JavaScript 解释器所嵌入的宿主环境（比如浏览器）定义的。比如浏览器中的 HTMLElement，document
* 自定义对象（user-defined object），由运行中的 JavaScript 代码创建的对象
* 自有属性（own property），直接在对象中定义的属性
* 继承属性（inherited property）是在对象的原型对象中定义的属性

## 创建对象

### 对象直接量

```javascript
var empty = {}
var point = { x:0, y:0 }
var point2 = { x:point.x, y:point.y + 1 }
var book = {
    "main title": "JavaScript",
    "for": "all audiences",
    author: {
        firstname: "David",
        surname: "Flanagan"
    }
}
```

在 ECMAScript 5 中，保留字可以用做不带引号的属性名。然后对于 ECMAScript 3 来说，使用保留字作为属性名必须使用引号引起来。ECMAScript 5 中属性最后一个逗号会被忽略，但在 IE 中则报错

### 通过 new 创建对象

new 运算符创建并初始化一个新对象。new 后跟随一个函数调用。这里的函数称做构造函数（constructor），用来初始化一个新创建的对象。JavaScript 语言核心的原始类型都包含内置构造函数（另一方面也证实了 JavaScript 中一切皆对象）

```javascript
var o = new Object();
var a = new Array();
var d = new Date();
var r = new RegExp('js');
```

### 原型

每一个 JavaScript 对象（null 除外）都和另一个对象相关联，这个对象就是「原型」，每一个对象都从原型继承属性

通过 new 创建的对象原型就是构造函数的 prototype 属性值，通过 new Object() 创建的对象也继承自 Obejct.property

没有原型对象的为数不多，Obejct.prototype 就是其中之一。它不继承任何属性，普通对象都具有原型。所有的内置构造函数都具有一个继承自 Object.prototype 的原型。例如，Date.prototype 的属性继承自 Object.prototype，因此由 new Date() 创建的 Date 对象的属性现时继承自 Date.prototype 和 Object.prototype，这一系列链接的原型对象就是所谓的「原型链」（prototype chain）

### Object.create()

ECMAScript 5 定义了一个名为 Obejct.create() 的方法，用来创建一个新对象，其中第一个参数是这个对象的原型，第二个可选参数用来对对象的属性进行进一步描述，Object.create() 是一个 **静态函数**，不是提供给对象调用的方法

```javascript
var o1 = Object.create({ x:1, y:2 });       // o1 继承了属性 x 和 y
var o2 = Obejct.create(null);               // o2 不继承任何属性和方法
```

在 ECMAScript 3 中可以用类似代码来模拟原型继承：

```javascript
function inherit(p) {
    if (p == null) throw TypeError();
    if (Object.create) return Object.create(p);

    var t = typeof p;
    if (t !== "object" && t !== "undefined") throw TypeError();

    function f() {}
    f.prototype = p;

    return new f();
}

var o = { x: "test o" }

var c = inherit(o);

c.x = "test c";

console.log(c.x);       // => "test c"
console.log(o.x);       // => "test o"
```

## 属性的查询和设置

```javascript
var author = book.author;           // 取得 book 的 author 属性
var title = book["main title"];     // 使用 [] 访问属性时 [] 内必须是一个计算结果为字符串的表达式

book.edition = 6;                   // 给 book 创建一个名为 edition 的属性，「.」号运算符后的标识符不能是保留字
```

### 作为关联数组的对象

当通过 [] 来访问对象属性时，属性名通过字符串来表示。字符串是 JavaScript 的数据类型，在程序运行时可以修改创建它们。因此，可以在 JavaScript 中使用下面这种代码来动态添加/查找属性：

```javascript
var addr = "";
for (i = 0; i < 4; i++) {
    addr += customer["address" + i] + '\n';
}
```

### 继承

假设要查询对象 o 的属性 x，如果 o 中不存在 x，那么将会继续在 o 的原型对象中查询属性 x。如果原型对象中也没有 x，但这个原型对象还有原型，那么继续在这个原型对象的原型上执行查找，直到找到 x 或者找到一个原型是 null 的对象为止。可以看出来，原型的属性构成了一个「链接」，通过这个「链」可以实现属性的继承

```javascript
var o = {}
o.x = 1;

var p = inherit(o);
p.y = 2;

var q = inherit(p);
q.z = 3;

var s = q.toString();   // => "[object Object]"
q.x + q.y               // => 3
```

### 属性访问错误

属性访问并不总是返回或设置一个值，下页场景给对象 o 设置 属性 p 会失败：

* o 中的属性 p 是只读的（defineProperty() 方法中有一个例外，可以对可配置的只读属性重新赋值）
* o 中不存在自有属性 p：o 没有使用 setter 方法继承属性 p，并且 o 的可扩展性（extensible attribute）是 false。如果 o 中不存在 p，而且没有 setter 方法可供调用，则 p 一定会添加至 o 中。如果 o 不是可扩展的，那么在 o 中不能定义新的属性

## 删除属性

使用 delete 运算符可以删除对象的属性，delete 运算符只能删除 __自有属性__，不能删除继承属性（要删除继承属性必须从定义这个属性的原型对象上删除它，而且这会影响到所有继承自这个原型的对象）

如果删除成功或者删除了一个没有影响的值（不存在的属性），delete 表达式返回 true。当 delete 运算符的操作数不是一个对象的属性的时候也返回 true

```javascript
var o = { x: 1 }
delete o.x;             // => true
delete o.x;             // => true x 并不存在
delete o.toString;      // => true toString 是继承属性
delete 1                // => true 不是对象属性
this.b = 1;
delete b;               // => true 删除全局对象上的变量 b

delete Object.property  // => false
var x = 1;
delete this.x;          // => false 不能删除这个属性，因为是通过 var 声明的
function f() {}
delete f                // => false 不能删除全局函数
```

## 检测属性

可以通过 in 运算符、hasOwnProperty() 方法和 propertyIsEnumerable() 方法来检测对象是否存在某属性，propertyIsEnumerable 只有检测到是自有属性且这个属性的可枚举性为 true 时它才返回 true

```javascript
var o = { x: 1 };
"x" in o;                          // => true
"y" in o;                          // => false
"toString" in o                    // => true

o.hasOwnProperty("x")              // => true
o.hasOwnProperty("y")              // => false
o.hasOwnProperty("toString")       // => false

var o = inherit({ y: 2});
o.x = 1;
o.propertyIsEnumerable("x")        // => true
o.propertyIsEnumerable("y")        // => false
o.propertyIsEnumerable("toString") // => false

```

还可以通过判断属性是否是 undefined 来模拟 in 运算符

```javascript
o.x !== undefined;                 // => true
o.y !== undefined;                 // => false
o.toString !== undefined;          // => true
```

然而有一种场景只能使用 in 运算符而不能通过只判断 undefined 的方式。**in 可以区分不存在的属性和存在但值为 undefined 的属性**

```javascript
var o = { x: undefined }
o.x !== undefined           // => false 存在 x，只是值为 undefined
o.y !== undefined           // => false
"x" in o                    // => true
"y" in o                    // => false
delete o.x                  // => true
"x" in o                    // => false delete 后 o 完全不存在了
```

## 枚举属性

许多工具库给 Object.prototype 添加了新的方法或者属性（通常不建议这么做），这些方法和属性可以被所有对象继承并使用。然而在 ECMAScript 5 标签之前，这些添加的方法是 **不能定义为不可枚举的**，因此它们都可以在 for/in 循环枚举出来。为了避免这和践情况，需要过滤 for/in 循环返回的属性，下面两种方法是最常见的：

```javascript
Object.prototype.test = 1;
var o = { a: 1, b:2, c: function() {} };
for (p in o) {
    if (!o.hasOwnProperty(p)) continue;
    console.log(p);
}
for (p in o) {
    if (typeof o[p] === "function") continue;
}
```

除了 for/in 循环之外，ECMAScript 5 定义了两个用以枚举属性名称的函数。第一个是 Object.keys()，它返回一个数组，由对象中的 **可枚举的自有属性名称** 组成，第二个是 Object.getOwnPropertyNames()，它和上面的方法类似，只是它返回对象的 **所有自有属性名称**，不仅仅是可枚举的属性

## 属性 getter 和 setter

在 ECMAScript 5 中，属性的值可以用一个或两个方法替代，这两个方法就是 getter 和 setter。由它们定义的属性称做「存取器属性」（accessor property），不同于「数据属性」（data property），数据属性只有一个简单的值

当程序查询存取器属性的值时，JavaScript 调用 getter 方法（无参数）。这个方法返回属性的存取表达式值。当程序设置一个存取器属性的值时，调用 setter 方法，将赋值表达式右侧的值当做参数传入 setter。从某种意义上讲，这个方法负责「设置」属性值。可以忽略 setter 方法的返回值

使用存取器属性写入的属性不具有可写性（writable）。如果属性同时具有 getter 和 setter 方法，那么它是一个读/写属性。哪果它只有 getter 方法，那么它是一个只读属性。如果只有 setter 方法，那么它是一个只写属性，读取只写属性总是返回 undefined

```javascript
var p = {
  x: 1.0,
  y: 1.0,

  get r() {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  },
  set r(newValue) {
    var oldValue = Math.sqrt(this.x*this.x + this.y*this.y);
    var ratio = newValue/oldValue;

    this.x *= ratio;
    this.y *= ratio;
  },
  get theta() {
    return Math.atan2(this.y, this.x)
  }
};
p.r             // => 1.4142135623730951
```

## 属性的特性

除了包含名字和值之外，属性还包含一些标识它们可写、可枚举和可配置的特性。ECMAScript 3 程序创建的属性都是可写、可枚举、可配置的，且无法对这些特性做出修改。ECMAScript 5 中却提供了查询和设置这些属性鹅的 API，这些 API 对于库的开发者来说非常重要，因为：

* 可以通过这些 API 给原型对象添加方法，并将它们设置成不可枚举的，**让它们看起来更像内置方法**
* 可以通过这些 API 给对象定义不修改或删除的属性借此「锁定」这个对象

**数据属性** 的 4 个属性分别是它的值（value）、可写性（writable）、可枚举性（enumerable）和可配置性（configurable）

**存取器属性** 不具有值（value）特性和可写性，它们的可写性是由 setter 方法存在与否决定，因此存取器属性的 4 个特性是读取（get）、写入（set）、可枚举性和可配置性

为了实现属性特性的查询和设置操作，ECMAScript 5 中定义了一个名为「**属性描述符**」（property descriptor）的对象，这个对象代表那 4 个特性。描述符对象的属性和它们所描述的属性特性是同名的。因此，数据属性的描述符对象的属性有 value, writable, enumerable 和 configurable。存取器属性描述符对象则用 get, set 属性代替 value, writable。其中 writable、enumerable 和 configurable 都是布尔值，get、set 都是函数值

通过调用 Object.getOwnPropertyDescriptor() 可以获得某个对象特定属性的属性描述符

```javascript
// => {value: 1, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor({ x: 1}, "x")
var random = {
    get octet() {
        return Math.floor(Math.random() * 256)
    },
    get uint16() {
        return Math.floor(Math.random() * 65536)
    },
    get int16() {
        return Math.floor(Math.random() * 65536 - 32768)
    }
}
// => {set: undefined, get: function, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor(random, "octet")
// => undefined
Object.getOwnPropertyDescriptor({}, "x")
```

从函数名字就可以看出来 Object.getOwnPropertyDescriptor() 只能得到自有属性的描述符。继承属性的特性需要遍历原型链

要想设置属性的特性，或者让新建属性具有某种特性，则需要调用 Object.defineProperty()，传入要修改的对象、要创建或者修改的属性的名称以前属性描述符对象：

```javascript
var o = {};
Object.defineProperty(o, "x", {
    value: 1,
    writable: true,
    enumerable: false,
    configurable: true
});
// x 属性存在但不可枚举
Object.keys()       // => []

Object.defineProperty(o, "x", { writable: false })
o.x = 2             // 试图更改这个属性的值，会操作失败不报错，严格模式中则抛出类型错误异常
o.x                 // => 1

// 将 x 从数据属性修改为存取器属性
Object.defineProperty(o, "x", { value: 2 })
Object.defineProperty(o, "x", { get: function() { return 0} }
o.x                 // => 0
```

传入 Object.defineProperty() 的属性描述符对象 **不必** 包含所有 4 个特性。对于创建属性来说，默认的特性值是 false 或 undefined。对于修改的已有属性来说，默认的特性值没有做任何修改。注意，这个方法要么修改已有属性要么新建自胡属性，但 **不能修改继承属性**，想要同时修改或者创建多个属性则需要使用 Object.defineProperties()，使用方法可以参考 MDN [相关 api](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)

对于那些不允许创建或者修改的属性来说，如果用 Object.defineProperty() 对其操作就会抛出类型错误异常，比如给一个不可扩展的对象新增属性就会抛出类型错误异常。**可写性控制着对特定值特性的修改，可配置性控制着对其它特性的修改**，使用的时候以下情况会抛出类型错误异常：

* 如果对象是不可扩展的，则可以编辑已有的自有属性，但不能给它添加新属性
* 如果属性是不可配置的，则不能修改它的可配置性和可枚举性
* 如果存取器属性是不可配置的，则不能修改其 getter 和 setter 方法，也不能将它转换为数据属性
* 如果数据属性是不可配置的，则不能将它转换为存取器属性
* 如果数据属性是不可配置的，则不能将它的可写性从 false 修改为 true，但可以从 true  修改为 false
* 如果数据属性是不可配置且不可写的，则不能修改它的值，然而 **可配置但不可写的属性值是可以修改的**

```javascript
// 给 Object.prototype 添加一个不可枚举的 extend() 方法
// 这个方法继承自调用它的对象，将作为参数什入的对象属性都复制
Object.defineProperty(Object.prototype, "extend", {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function(o) {
        var names = Object.getOwnPropertyNames(0);

        for (var i = 0, l = names.length; i < l; i++) {
            if (names[i] in this) continue;

            var desc = Object.getOwnPropertyDescriptor(o, name[i]);
            Object.defineProperty(this, names[i], desc)
        }
    }
});
```

**getter 和 setter 的老式 API**

在ECMAScript 5标准被采纳之前，大多数 JavaScript 的实现（IE 除外）已经可以支持对象直接量语法中的 get 和 set 写法。这些实现提供了非标准的老式 API 用来查询和设置 getter 和 setter。这些 API 由 4 个方法组成，所有对象都拥有这些方法。`__lookupGetter__()` 和 `__lookupSetter__()` 用以返回一个命名属性的 getter 和 setter 方法，`__defineSetter__()` 和 `__defineGetter__()` 用以定义 getter 和 setter

## 对象的三个属性

每个对象都胡与之相关的 **原型**（prototype）、**类**（class）和 **可扩展性**（extensible attribute）

### 原型属性

原型属性是在实例对象创建之初就设置好的，ECMAScript 5 中，对象作为参数传入 `Object.getPrototypeOf()` 可以查看它的原型，在 ECMAScript 3 中，则没有与之等价的函数，但经常使用表达式 o.constructor.prototype 来检测一个对象的原型。通过 new 表达式创建的对象，通常继承一个 constructor 属性，这个属性指代创建这个对象的构造函数

要想检测一个对象是否是另一个对象的原型（或者处于原型链中），请使用 isPrototypeOf() 方法，这个方法和 instanceof 运算符非常类似，例如：

```javascript
var p = { x:1 };
var o = Object.create(p);
p.isPrototypeOf(o)                  // => true
Object.prototype.isPrototypeOf(o)   // => true
```

### 类属性

对象的类属性是一个字符串，用以表示对象的类型信息。ECMAScript 3/5 都未提供设置这个属性的方法，并只有一种间接的方法可以查询它。默认的 toString() 方法（继承自 Object.prototype），返回了如下这种格式的字符串：

> [object class]

所以可以通过 toString() 方法返回的字符串截取处理取到 class 名，不过很多对象继承的 toString() 方法被重写了，为了能调用正确的 toString() 版本，必须间接地调用 Function.call() 方法

```javascript
function classof(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -2);
}
classof(null)     // => "Null"
classof(1)        // => "Number"
classof("")       // => "String"
classof(true)     // => "Boolean"
classof({})       // => "Object"
classof([])       // => "Array"
classof(/./)      // => "Regexp"
classof(new Date) // => "Date"
function f() {}
classof(new f())  // => "Object"
```

### 可扩展属性

可扩展性用以表示是否可以给对象是添加新属性。所有内置对象和自定义对象都是显式可扩展的，宿主对象的可扩展属性是由 JavaScript 引擎定义的，ECMAScript 5 中，所有的内置对象和自定义对象都是可扩展的，除非将它们转换为不可扩展的，宿主对象的可扩展性也是由实现 ECMAScript 5 的 JavaScript 引擎定义的

ECMAScript 5 定义了用来查询和设置对象可扩展性的函数：Object.isExtensible()，如果将对象转换为不可扩展的，需要调用 Object.preventExtensions()，不过一量旦将对象转换为不可扩展的，就无法再转换回去了。

Object.seal() 和 Object.preventExtensions() 类似，除了能将对象设置为不可扩展的，还可以将对象的所有自有属性都设置为不可配置的，也就是说不能给对象添加新的属性，已有的属性也不能删除或配置，已封闭（sealed）的对象是不能解封的，可以使用 Object.isSealed() 来检测对象是否封闭

Object.freeze() 将更严格地锁定对象 —— 「冻结」，它还可以将它自有的所有数据属性设置为只读，可以使用 Object.isFrozen() 来检测对象是否冻结

## 序列化对象

对象序列化（serialization）是指将对象的状态转换为字符串，也可将字符串还原为对象。ECMAScript 5 提供了内置函数 JSON.stringify 和 JSON.parse() 用来序列化和还原 JavaScript 对象。这些方法都使用 JSON 作为数据交换格式，JSON的全称是「JavaScript Object Notation」—— JavaScript 对象表示法，正如其名，它的语法和 JavaScript 对象与数组直接量的语法非常相近

ECMAScript 3 环境中可以引用 [json2](https://github.com/douglascrockford/JSON-js) 类库来支持这两个序列化函数

JSON 语法是 JavaScript 语法的子集，它并不能表示 JavaScript 里的所有值，函数、RegExp、Error 对象和 undefined 值不能序列化和不愿。JSON.stringify() **只能序列化对象可枚举的自有属性**，关于 JSON 对象更多 API 可以参考 [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

## 对象方法

### toString() 方法

toString() 方法没有参数，在需要将对象转换为字符串的时候，JavaScript 都调用这个方法

```javascript
var s = { x: 1, y: 1 }
s.toString();       // => "[object Ojbect]"
```

### toLocaleString() 方法

返回一个对象的本地化字符串。Object 中默认的 toLocaleString() 方法并不做任何本地化自身操作，它仅调用 toString() 方法并返回值。Date 和 Number 类对 toString() 方法做了定制，可以用它对数字、日期和时间做本地化的转换

### toJSON() 方法

Object.prototype 实际上不有定义 toJSON() 方法，但对于需要执行序列化的对象来说，JSON.stringify() 方法会调用 toJSON() 方法，如果存在则调用它，返回值即是序列化的结果，而不是原始对象，参见 [Date.toJSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON)

### valueOf() 方法

valueOf() 和 toString() 方法非常类似，但往往当 JavaScript 需要 **将对象转换为某种原始值而非字符串** 的时候才会用到它，尤其是转换为数字的时候。如果在需要使用原始值的上下文中使用了对象，JavaScript 就会自动调用这个方法，同样有些内置类自定义了 valueOf() 方法，比如 [Date.valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/valueOf)
