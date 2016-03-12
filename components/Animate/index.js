"use strict";

var React = require('react');

var Animate = React.createClass({

    getInitialState: function () {
        return {scopeClassName: 'comp-animate'};
    },

    render: function () {
        var props = this.props;
        var children = props.children;
        var state = this.state;

        if (!(children && children.key)) {
            throw new Error('children\'s key required');
        }

        return (<div class={state.scopeClassName}>
            {children}
        </div>)
    }

});

module.exports = Animate;