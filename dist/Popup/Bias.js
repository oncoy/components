'use strict';

/**
 * Created by xcp on 2016/3/15.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var Bias = React.createClass({
    displayName: 'Bias',

    propTypes: {
        symBolClass: React.PropTypes.array
    },

    getDefaultProps: function getDefaultProps() {
        return {
            placement: 'topLeft',
            closeable: false,
            symbolStyle: {},
            symbolClass: [],
            style: {}
        };
    },

    getClassName: function getClassName() {
        var symbolDir = ({
            topLeft: 'd-l',
            right: 'r',
            topRight: 'd-r',
            left: 'l'
        })[this.props.placement] || 'd-l';

        var dir = ({
            topLeft: 'd',
            topRight: 'd',
            right: 'r',
            left: 'l'
        })[this.props.placement] || 'd';

        return {
            wrapperClass: 'bub bub-bias-dir-' + dir,
            symbolClass: 'bub-symbol icon-img icon-bias-' + symbolDir
        };
    },

    unmount: function unmount() {
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
    },

    render: function render() {

        var classNames = this.getClassName();
        var symbolClassName = this.props.symbolClass.length > 0 ? ' ' + this.props.symbolClass.join(' ') : '';
        var closeElement = null;
        if (this.props.closeable) {
            closeElement = React.createElement('span', {
                className: 'icon-img icon-close-yellow bub-bias-last',
                onClick: this.unmount });
        }

        return React.createElement(
            'div',
            { className: classNames.wrapperClass, style: this.props.style },
            React.createElement('span', { className: classNames.symbolClass + symbolClassName,
                style: this.props.symbolStyle }),
            React.createElement(
                'div',
                { className: 'bub-bias-con' },
                React.createElement(
                    'div',
                    { className: 'bub-bias-con-text inline-block' },
                    this.props.children
                ),
                closeElement
            )
        );
    }
});

module.exports = Bias;