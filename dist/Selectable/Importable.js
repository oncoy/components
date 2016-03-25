'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/**
 * Created by xcp on 2016/3/23.
 */

var React = require('react');
var DropDown = require('./DropDown');
var noop = require('../../com/noop');

var getSelectorContent = function getSelectorContent(rejectValue, onChange) {
    return function (value) {
        if (value === rejectValue) {
            return React.createElement('input', {
                onChange: onChange,
                className: 'input-default',
                style: { width: 60 },
                placeholder: '请输入...' });
        }
        return React.createElement(
            'div',
            { className: 'comp-select-selector' },
            React.createElement(
                'span',
                { className: 'util-font-12' },
                value
            ),
            React.createElement('span', { className: 'icon-img icon-tran-black-d' })
        );
    };
};

var getItemContent = function getItemContent(value, props) {
    var item = React.createElement(
        'li',
        { className: 'comp-panel-item' },
        React.createElement(
            'strong',
            null,
            value
        )
    );
    return React.cloneElement(item, props);
};

var Importable = React.createClass({
    displayName: 'Importable',

    getInitialState: function getInitialState() {
        return {
            currentSelectedValue: null
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            itemList: [1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'],
            defaultSelectedValue: 1,
            onSelect: noop,
            getSelectorContent: getSelectorContent(null),
            getItemContent: getItemContent,
            rejectValue: '10+'
        };
    },

    onSelect: function onSelect(value) {
        var self = this;
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.target) {
            self.props.onSelect(value.target.value);
        } else {
            self.setState({ currentSelectedValue: value }, function () {
                self.props.onSelect(value);
            });
        }
    },

    componentWillMount: function componentWillMount() {
        this._getSelectorContent = getSelectorContent(this.props.rejectValue, this.onSelect);
    },

    ensureEvent: function ensureEvent() {
        var value = this.state.currentSelectedValue;
        return value !== this.props.rejectValue || value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !value.target;
    },

    render: function render() {
        var self = this;
        var props = self.props;

        var selectorContent = React.createElement(DropDown.Selector, {
            onSelect: self.onSelect,
            defaultSelectedValue: self.state.currentSelectedValue !== null ? self.state.currentSelectedValue : props.defaultSelectedValue,
            getSelectorContent: self._getSelectorContent });

        var panelContent = React.Children.map(props.itemList, function (value, index) {
            return React.createElement(DropDown.Item, {
                value: value,
                key: index,
                getItemContent: props.getItemContent });
        });

        return React.createElement(DropDown, {
            selectorBindEvent: this.ensureEvent(),
            selectorContent: selectorContent,
            panelContent: panelContent });
    }
});

module.exports = Importable;