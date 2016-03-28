## Message
全局提示窗口，自动关闭，无法手动关闭。
如果有多个窗口同时出现，则多个窗口依次排成一次在视窗上。

## 参数说明
+ message - `String` - 将要显示的内容
+ callback - `Function` - 消息窗卸载时调用的函数

## 调用
1. 引入
```Javascript
var Message = require('react-components-s').Message;
```

2. 调用
```Javascript
function __message(message, log) {
    return function () {
        Message(message, function () {
            console.log(log)
        })
    }
}
// 多个Message同时出现
setTimeout(__message('message-1', 1), 0);
setTimeout(__message('message-2', 2), 500);
setTimeout(__message('message-3', 3), 1000);
setTimeout(__message('message-4', 4), 1500);
setTimeout(__message('message-5', 5), 2000);
setTimeout(__message('message-6', 6), 2500);
```
现在默认持续时间为3000ms，如果后期有需要，可以开放更多的配置参数。