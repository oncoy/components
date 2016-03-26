/**
 * Created by xcp on 2016/3/18.
 */

var Message = require('../index');

function __message(message, log) {
    return function () {
        Message(message, function () {
            console.log(log)
        })
    }
}

setTimeout(__message('message-1', 1), 0);
setTimeout(__message('message-2', 2), 500);
setTimeout(__message('message-3', 3), 1000);
setTimeout(__message('message-4', 4), 1500);
setTimeout(__message('message-5', 5), 2000);
setTimeout(__message('message-6', 6), 2500);