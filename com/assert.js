/**
 * Created by xcp on 2016/3/14.
 */

module.exports = function (condition, format) {
    var args = Array.prototype.splice.call(arguments, 0);

    if (args.length < 2) {
        throw new Error("condition and message are required");
    }

    format = '' + format;

    if (!condition) {
        var index = 2;
        var message = format.replace(/%s/g, function () {
            return args[index++]
        });

        if (typeof console !== 'undefined')
            console.log(message);
        try {
            throw new Error(message);
        } catch (e) {
        }
    }
};
