'use strict';

/**
 * Created by xcp on 2016/3/14.
 */

var React = require('react');
var assert = require('../../com/assert');
var noop = require('../../com/noop');
var ConditionItem = require('./ConditionItem');
var ConditionMixin = require('./ConditionMixin');

var Conditional = React.createClass({
    displayName: 'Conditional',

    mixins: [ConditionMixin],

    getInitialState: function getInitialState() {
        return {
            checkedItemValue: null
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            itemList: [],
            onChecked: noop,
            onChange: noop,
            className: 'conditional',
            itemClassName: 'cond-item',
            checkedClassName: 'checked',
            defaultChecked: null
        };
    },

    onChecked: function onChecked(isChecked, currentValue) {
        var prev = this.state.checkedItemValue;

        this.setState({ checkedItemValue: isChecked ? currentValue : null });
        this.props.onChecked(isChecked, currentValue);

        if (isChecked && prev !== currentValue) {
            this.props.onChange(prev, currentValue);
        }
    },

    componentWillMount: function componentWillMount() {
        this.setState({ checkedItemValue: this.props.defaultChecked });
    },

    render: function render() {
        var props = this.props;

        var items = props.itemList.map(function (item) {
            return React.createElement(
                ConditionItem,
                {
                    key: item.value,
                    isChecked: this.state.checkedItemValue === item.value,
                    onChecked: this.onChecked,
                    value: item.value },
                item.children
            );
        }, this);

        return React.createElement(
            'div',
            { className: props.className },
            items
        );
    }
});

module.exports = Conditional;