'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/**
 * Created by xcp on 2016/3/23.
 */

var React = require('react');
var DropDown = require('./DropDown');
var noop = require('../../com/noop');

var getSelectorContent = function getSelectorContent(item) {
    return React.createElement(
        'div',
        { className: 'comp-select-selector' },
        React.createElement(
            'span',
            { className: 'util-font-12' },
            item.text
        ),
        React.createElement('span', { className: 'icon-img icon-tran-black-d' })
    );
};

var getItemContent = function getItemContent(item, props) {
    var elem = React.createElement(
        DropDown.Item,
        { isItem: !!item.value, value: item },
        item.value ? React.createElement(
            'li',
            { className: 'comp-panel-item' },
            React.createElement(
                'strong',
                null,
                item.text
            )
        ) : React.createElement(
            'li',
            { className: 'comp-panel-title' },
            React.createElement(
                'span',
                { className: 'color-remind' },
                item.text
            )
        )
    );
    return React.cloneElement(elem, props);
};

var Diff = React.createClass({
    displayName: 'Diff',

    getInitialState: function getInitialState() {
        return {
            currentSelectedValue: null
        };
    },

    getDefaultProps: function getDefaultProps() {
        var itemList = [{ value: 0, text: '筛选异常原因' }, { value: 1, text: '全部' }, { value: 2, text: '编号重复' }, { value: 3, text: '编号不存在' }, { value: 4, text: '已下架' }];

        return {
            itemList: itemList,
            defaultSelectedValue: itemList[0],
            onSelect: noop,
            getSelectorContent: getSelectorContent,
            getItemContent: getItemContent
        };
    },

    onSelect: function onSelect(value) {
        var self = this;
        self.setState({ currentSelectedValue: value }, function () {
            self.props.onSelect(value);
        });
    },

    ensureEvent: function ensureEvent() {
        var value = this.state.currentSelectedValue;
        return value !== this.props.rejectValue || value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !value.target;
    },

    render: function render() {
        var self = this;
        var props = self.props;
        var panelContent = props.itemList.map(props.getItemContent);
        var selector = React.createElement(DropDown.Selector, {
            onSelect: self.onSelect,
            defaultSelectedValue: props.defaultSelectedValue,
            getSelectorContent: props.getSelectorContent });

        return React.createElement(DropDown, {
            selectorContent: selector,
            panelContent: panelContent });
    }
});

module.exports = Diff;