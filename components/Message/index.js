/**
 * Created by xcp on 2016/3/18.
 * 全局提示信息，会自动隐藏掉
 * 如果有多个信息同时出现，则依次排成一列
 */

var React = require('react');
var ReactDOM = require('react-dom');
var Animate = require('../Animate');
var AutoUnmountMixins = require('./AutoUnmountMixins');

var Message = React.createClass({

    mixins: [AutoUnmountMixins],

    componentDidMount: function () {
        this.__backToTheStart = this.__message.props.parent.backToTheStart;
    },

    render: function () {
        var message = this.__message = <span>{this.props.message}</span>;
        return (<Animate>
            {message}
        </Animate>);
    }
});

module.exports = Message;