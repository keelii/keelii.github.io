---
layout: post
title: "JavaScript节流函数throttle详解"
date: 2016-06-11 6:52:57 +0800
comments: true
categories:
    - javascript
tags:
    - javascript
    - throttle
---

在浏览器DOM事件里面，有一些事件会随着用户的操作不间断触发。比如：重新调整浏览器窗口大小(resize)，浏览器页面滚动(scroll)，鼠标移动(mousemove)。也就是说用户在触发这些浏览器操作的时候，如果脚本里面绑定了对应的事件处理方法，这个方法就不停的触发。

<!--more-->
这并不是我们想要的，因为有的时候如果事件处理方法比较庞大，DOM操作比如复杂，还不断的触发此类事件就会造成性能上的损失，导致用户体验下降（UI反映慢、浏览器卡死等）。所以通常来讲我们会给相应事件添加延迟执行的逻辑。

通常来说我们用下面的代码来实现这个功能：

```javascript
var COUNT = 0;
function testFn() { console.log(COUNT++); }
// 浏览器resize的时候
// 1. 清除之前的计时器
// 2. 添加一个计时器让真正的函数testFn延后100毫秒触发
window.onresize = function () {
    var timer = null;
    clearTimeout(timer);

    timer = setTimeout(function() {
        testFn();
    }, 100);
};

```

细心的同学会发现上面的代码其实是错误的，这是新手会犯的一个问题：setTimeout 函数返回值应该保存在一个相对全局变量里面，否则每次 resize 的时候都会产生一个新的计时器，这样就达不到我们发的效果了

于是我们修改了代码：

```javascript
var timer = null;
window.onresize = function () {
    clearTimeout(timer);
    timer = setTimeout(function() {
        testFn();
    }, 100);
};
```

这时候代码就正常了，但是又多了一个新问题 —— 产生了一个全局变量 timer。这是我们不想见到的，如果这个页面还有别的功能也叫 timer 不同的代码之前就是产生冲突。为了解决这个问题我们要用 JavaScript 的一个语言特性：[闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures) closures 。相关知识读者可以去MDN中了解，改造后的代码如下：

```javascript
/**
 * 函数节流方法
 * @param Function fn 延时调用函数
 * @param Number delay 延迟多长时间
 * @return Function 延迟执行的方法
 */
var throttle = function (fn, delay) {
    var timer = null;

    return function () {
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn();
        }, delay);
    }
};
window.onresize = throttle(testFn, 200, 1000);
```

我们用一个闭包函数(throttle节流)把timer放在内部并且返回延时处理函数，这样以来timer变量对外是不可见的，但是内部延时函数触发时还可以访问到timer变量。

当然这种写法对于新手来说不好理解，我们可以变换一种写法来理解一下：

```javascript
var throttle = function (fn, delay) {
    var timer = null;

    return function () {
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn();
        }, delay);
    }
};

var f = throttle(testFn, 200);
window.onresize = function () {
    f();
};
```

这里主要了解一点：throttle 被调用后返回的 function 才是真正的 onresize 触发时需要调用的函数

现在看起来这个方法已经接近完美了，然而实际使用中并非如此。举个例子：

> 如果用户 __不断的__ resize 浏览器窗口大小，这时延迟处理函数一次都不会执行

于是我们又要添加一个功能：当用户触发 resize 的时候应该 __在某段时间__ 内至少触发一次，既然是在某段时间内，那么这个判断条件就可以取当前的时间毫秒数，每次函数调用把当前的时间和上一次调用时间相减，然后判断差值如果大于 __某段时间__ 就直接触发，否则还是走 timeout 的延迟逻辑。

下面的代码里面需要指出的是：

1.	previous 变量的作用和 timer 类似，都是记录上一次的标识，必须是相对的全局变量
2.	如果逻辑流程走的是“至少触发一次”的逻辑，那么函数调用完成需要把 previous 重置成当前时间，简单来说就是：相对于下一次的上一次其实就是当前

```javascript
/**
 * 函数节流方法
 * @param Function fn 延时调用函数
 * @param Number delay 延迟多长时间
 * @param Number atleast 至少多长时间触发一次
 * @return Function 延迟执行的方法
 */
var throttle = function (fn, delay, atleast) {
    var timer = null;
    var previous = null;

    return function () {
        var now = +new Date();

        if ( !previous ) previous = now;

        if ( now - previous > atleast ) {
            fn();
            // 重置上一次开始时间为本次结束时间
            previous = now;
        } else {
            clearTimeout(timer);
            timer = setTimeout(function() {
                fn();
            }, delay);
        }
    }
};
```


实践：

我们模拟一个窗口 scroll 时节流的场景，也就是说当用户滚动页面向下的时候我们需要节流执行一些方法，比如：计算 DOM 位置等需要连续操作 DOM 元素的动作

完整代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>throttle</title>
</head>
<body>
    <div style="height:5000px">
        <div id="demo" style="position:fixed;"></div>
    </div>
    <script>
    var COUNT = 0, demo = document.getElementById('demo');
    function testFn() {demo.innerHTML += 'testFN 被调用了 ' + ++COUNT + '次<br>';}

    var throttle = function (fn, delay, atleast) {
        var timer = null;
        var previous = null;

        return function () {
            var now = +new Date();

            if ( !previous ) previous = now;
            if ( atleast && now - previous > atleast ) {
                fn();
                // 重置上一次开始时间为本次结束时间
                previous = now;
                clearTimeout(timer);
            } else {
                clearTimeout(timer);
                timer = setTimeout(function() {
                    fn();
                    previous = null;
                }, delay);
            }
        }
    };
    window.onscroll = throttle(testFn, 200);
    // window.onscroll = throttle(testFn, 500, 1000);
    </script>
</body>
</html>
```

我们用两个 case 来测试效果，分别是添加至少触发 atleast 参数和不添加：

```javascript
// case 1
window.onscroll = throttle(testFn, 200);
// case 2
window.onscroll = throttle(testFn, 200, 500);
```

__case 1__ 的表现为：在页面滚动的过程（不能停止）中 testFN 不会被调用，直到停止的时候会调用一次，也就是说执行的是 throttle 里面 __最后__ 一个 setTimeout ，效果如图（查看原 gif 图）：

![case1](https://cloud.githubusercontent.com/assets/458894/16030022/43a9b794-3220-11e6-9f41-554bb6876303.gif)

__case 2__ 的表现为：在页面滚动的过程（不能停止）中 testFN 第一次会延迟 500ms 执行（来自至少延迟逻辑），后来至少每隔 500ms 执行一次，效果如图

![case2](https://cloud.githubusercontent.com/assets/458894/16030023/43aa1d92-3220-11e6-9987-aa14f2bce83e.gif)

至此为止，我们想要实现的效果已经基本完成。后续的一些辅助性优化读者可以自己琢磨，如：函数 this 指向，返回值保存等。


## 引用

1.	测试代码 http://jsbin.com/tanuxegija/edit
2.	完整版本代码 http://jsbin.com/jigozuvuko
3.	Debounce VS throttle https://github.com/dcorb/debounce-throttle
