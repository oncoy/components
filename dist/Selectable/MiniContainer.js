'use strict';

/**
 * Created by xcp on 2016/3/23.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var HideOnBodyClick = require('../HideOnBodyClick');
var classNames = require('classnames');

var SelectableMixin = require('./SelectableMixin');
var ContainerMixin = require('./ContainerMixin');

var MiniContainer = React.createClass({
    displayName: 'MiniContainer',

    mixins: [SelectableMixin, ContainerMixin],

    reRender: function reRender(itemList) {
        var mountNode = ReactDOM.findDOMNode(this).parentNode;
        ReactDOM.render(React.createElement(MiniContainer, {
            itemList: itemList,
            onSelect: this.props.onSelect,
            defaultSelectedValue: this.props.defaultSelectedValue }), mountNode);
    },

    render: function render() {
        var panelClassName = {
            'comp-custom-select': true,
            'comp-show-panel': this.state.panelStateIsShow
        };

        var progressClassName = this.getProgressClassName(this.state.currentSelectedValue ? this.state.currentSelectedValue.percent : 0, 'progress-bar-text');

        var itemList = this.props.itemList.map(function (item) {
            return React.createElement(
                'div',
                { className: 'col-xs-4', key: item.index },
                React.createElement(
                    'div',
                    { className: 'comp-mini-item', onClick: this.onSelect.bind(this, item) },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'strong',
                            { className: 'col-xs-4 util-text-right' },
                            item.index
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-xs-8' },
                            React.createElement('span', { className: this.getProgressClassName(item.percent) })
                        )
                    )
                )
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
                    { className: 'comp-select-panel comp-progress-panel comp-mini-progress' },
                    React.createElement(
                        'div',
                        { className: 'comp-select-m-t' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            itemList,
                            React.createElement(
                                'div',
                                { className: 'comp-panel-title util-text-center col-xs-12' },
                                React.createElement('span', { className: 'icon-img icon-plus util-v-m', onClick: this.addOne })
                            )
                        )
                    )
                )
            )
        );
    }
});

module.exports = MiniContainer;