"use strict";

var React = require('react');
var AnimateMixin = require('./AnimateMixin');
var assert = require('../../com/assert');

var Animate = React.createClass({

    mixins: [AnimateMixin],

    render: function () {
        var children = this.props.children;
        var Components = this.props.component;
        var self = this;

        children = children && children.constructor === Array ?
            children :
            [children];

        assert(children.length, "children is required");

        children = React.Children.map(children, function (child) {
            return React.cloneElement(child, {parent: self});
        });

        return (<Components
            className={this.props.className}
            style={this.styleProps()}>
            {children}
        </Components>)
    }

});

module.exports = Animate;