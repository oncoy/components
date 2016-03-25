'use strict';

/**
 * Created by xcp on 2016/3/23.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var HideOnBodyClick = require('../HideOnBodyClick');
var classNames = require('classnames');
var noop = require('../../com/noop');

var SelectableMixin = require('./SelectableMixin');
var ContainerMixin = require('./ContainerMixin');

var Container = React.createClass({
    displayName: 'Container',

    mixins: [SelectableMixin, ContainerMixin],

    reRender: function reRender(itemList) {
        var mountNode = ReactDOM.findDOMNode(this).parentNode;
        ReactDOM.render(React.createElement(Container, {
            itemList: itemList,
            onSelect: this.props.onSelect,
            defaultSelectedValue: this.props.defaultSelectedValue }), mountNode);
    },

    render: function render() {
        var panelClassName = {
            'comp-custom-select': true,
            'comp-show-panel': this.state.panelStateIsShow
        };

        var progressText = 'progress-bar-text';

        var progressClassName = this.getProgressClassName(this.state.currentSelectedValue ? this.state.currentSelectedValue.percent : 0, progressText);

        var itemList = this.props.itemList.map(function (item) {
            return React.createElement(
                'li',
                { className: 'comp-panel-item', key: item.index },
                React.createElement(
                    'strong',
                    { className: 'comp-icon-gap' },
                    item.index
                ),
                React.createElement(
                    'div',
                    { className: 'comp-select-progress comp-icon-gap',
                        onClick: this.onSelect.bind(this, item) },
                    React.createElement('span', { className: this.getProgressClassName(item.percent, progressText) })
                ),
                React.createElement('span', {
                    className: 'icon-img icon-close util-v-m',
                    onClick: this.removeOne.bind(this, item) })
            );
        }, this);

        return React.createElement(
            'div',
            { className: classNames(panelClassName), ref: 'selectable' },
            React.createElement(
                'div',
                { className: 'comp-select-selector-pd' },
                React.createElement(
                    'div',
                    { className: 'comp-select-selector', onClick: this.showPanel },
                    React.createElement(
                        'div',
                        { className: 'comp-select-progress' },
                        React.createElement('span', { className: progressClassName })
                    ),
                    React.createElement('span', { className: 'icon-img icon-tran-black-d' })
                )
            ),
            React.createElement(
                HideOnBodyClick,
                {
                    refTarget: this.refs.selectable,
                    onVisible: this.onVisible,
                    onAnimateMount: this.onAnimateMount,
                    triggerHide: this.triggerHide },
                React.createElement(
                    'div',
                    { className: 'comp-select-panel comp-progress-panel' },
                    React.createElement(
                        'ol',
                        { className: 'comp-select-m-t' },
                        itemList,
                        React.createElement(
                            'li',
                            { className: 'comp-panel-title util-text-center' },
                            React.createElement('span', { className: 'icon-img icon-plus util-v-m', onClick: this.addOne })
                        )
                    )
                )
            )
        );
    }
});

module.exports = Container;