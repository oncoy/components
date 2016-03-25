'use strict';

/**
 * Created by xcp on 2016/3/15.
 */

var React = require('react');
var Bubble = React.createClass({
    displayName: 'Bubble',

    propTypes: {
        symBolClass: React.PropTypes.array
    },

    getDefaultProps: function getDefaultProps() {
        return {
            placement: 'top',
            symbolStyle: {},
            symbolClass: [],
            style: {}
        };
    },

    getClassName: function getClassName() {
        var dir = ({
            top: 'd',
            right: 'l',
            bottom: 't',
            left: 'r'
        })[this.props.placement] || 'd';

        return {
            wrapperClass: 'bub bub-dir-' + dir,
            symbolClass: 'bub-symbol icon-img icon-arrow-blue-' + dir
        };
    },

    render: function render() {

        var classNames = this.getClassName();
        var symbolClassName = this.props.symbolClass.length > 0 ? ' ' + this.props.symbolClass.join(' ') : '';

        return React.createElement(
            'div',
            { className: classNames.wrapperClass, style: this.props.style },
            React.createElement('span', { className: classNames.symbolClass + symbolClassName,
                style: this.props.symbolStyle }),
            React.createElement(
                'div',
                { className: 'bub-con bub-all-pd' },
                this.props.children
            )
        );
    }
});

module.exports = Bubble;