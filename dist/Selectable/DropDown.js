'use strict';

/**
 * Created by xcp on 2016/3/22.
 */

var React = require('react');
var noop = require('../../com/noop');
var Selectable = require('./Selectable');

var DropDown = React.createClass({
    displayName: 'DropDown',

    getDefaultProps: function getDefaultProps() {
        return {
            onSelect: noop,
            selectorContent: null,
            selectorBindEvent: true,
            panelContent: null
        };
    },

    getInitialState: function getInitialState() {
        return {
            currentSelectedValue: null
        };
    },

    onSelect: function onSelect(value) {
        this.props.onSelect(value);
        this.__selector.onSelect(value);
        if (this.__selectable) {
            this.__selectable.onSelect(value);
        }
    },

    onSelectableMount: function onSelectableMount(selectable) {
        this.__selectable = selectable;
    },

    onSelectorMount: function onSelectorMount(selector) {
        this.__selector = selector;
    },

    render: function render() {
        var props = this.props;
        var items = React.Children.map(props.panelContent, function (item) {
            return item.props.isItem ? React.cloneElement(item, { onSelect: this.onSelect }) : item;
        }, this);

        var panelContent = React.createElement(
            'ol',
            { className: 'comp-select-m-t' },
            items
        );

        var selectorContent = React.cloneElement(props.selectorContent, {
            componentDidMount: this.onSelectorMount
        });

        return React.createElement(Selectable, {
            selectorBindEvent: props.selectorBindEvent,
            componentDidMount: this.onSelectableMount,
            selectorContent: selectorContent,
            panelContent: panelContent });
    }

});

DropDown.Item = React.createClass({
    displayName: 'Item',

    getDefaultProps: function getDefaultProps() {
        return {
            value: null,
            isItem: true,
            getItemContent: noop,
            onSelect: noop
        };
    },

    onSelect: function onSelect() {
        this.props.onSelect(this.props.value);
    },

    render: function render() {
        return this.props.children ? React.cloneElement(this.props.children, { onClick: this.onSelect }) : this.props.getItemContent(this.props.value, { onClick: this.onSelect });
    }
});

DropDown.Selector = React.createClass({
    displayName: 'Selector',

    getInitialState: function getInitialState() {
        return {
            panelStateIsShow: false,
            currentSelectedValue: null
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            defaultSelectedValue: null,
            onSelect: noop,
            componentDidMount: noop,
            getSelectorContent: noop
        };
    },

    componentDidMount: function componentDidMount() {
        this.props.componentDidMount(this);
    },

    componentWillMount: function componentWillMount() {
        this.setState({ currentSelectedValue: this.props.defaultSelectedValue });
    },

    onSelect: function onSelect(value) {
        var self = this;
        this.setState({ currentSelectedValue: value }, function () {
            self.props.onSelect(value);
        });
    },

    render: function render() {
        return this.props.children ? this.props.children : this.props.getSelectorContent(this.state.currentSelectedValue);
    }
});

module.exports = DropDown;