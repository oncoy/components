'use strict';

/**
 * Created by xcp on 2016/3/24.
 */
var classNames = require('classnames');

module.exports = {

    addOne: function addOne() {
        var index = 0;
        this.props.itemList.forEach(function (item) {
            if (item.index > index) index = item.index;
        });

        this.props.itemList.push({ percent: 0, index: index + 1 });
        this.reRender(this.props.itemList);
    },

    removeOne: function removeOne(item) {
        var index = this.props.itemList.indexOf(item);
        if (index !== -1) {
            this.props.itemList.splice(index, 1);
            this.reRender(this.props.itemList);
        }
    },

    getProgressClassName: function getProgressClassName() {
        var args = Array.prototype.slice.call(arguments, 1);
        var percent = arguments[0];
        var className = {};

        args.forEach(function (name) {
            className[name] = true;
        });

        className['progress-' + parseInt(percent * 100)] = true;
        return classNames(className);
    }
};