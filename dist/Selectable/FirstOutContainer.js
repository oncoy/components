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

var FOContainer = React.createClass({
    displayName: 'FOContainer',

    propTypes: {
        firstOut: React.PropTypes.array
    },

    mixins: [SelectableMixin, ContainerMixin],

    getDefaultProps: function getDefaultProps() {
        return { firstOut: [] };
    },

    reRender: function reRender(itemList) {
        var mountNode = ReactDOM.findDOMNode(this).parentNode;
        ReactDOM.render(React.createElement(FOContainer, {
            itemList: itemList,
            firstOut: this.props.firstOut,
            onSelect: this.props.onSelect,
            defaultSelectedValue: this.props.defaultSelectedValue }), mountNode);
    },

    getItemElement: function getItemElement(item) {
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
                React.createElement('span', { className: this.getProgressClassName(item.percent, 'progress-bar-text') })
            ),
            React.createElement('span', { className: 'icon-img icon-close util-v-m', onClick: this.removeOne.bind(this, item) })
        );
    },

    render: function render() {
        var panelClassName = {
            'comp-custom-select': true,
            'comp-show-panel': this.state.panelStateIsShow
        };

        var progressText = 'progress-bar-text';

        var progressClassName = this.getProgressClassName(this.state.currentSelectedValue ? this.state.currentSelectedValue.percent : 0, progressText);

        var props = this.props;

        var itemList = props.itemList.filter(function (item) {
            return props.firstOut.indexOf(item) === -1;
        }, this).map(this.getItemElement, this);

        var firstOutList = props.firstOut.map(this.getItemElement, this);

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
                        'div',
                        { className: 'bub-bd-b' },
                        React.createElement(
                            'div',
                            { className: 'bub-pd-l-lg bub-pd-r-lg' },
                            React.createElement(
                                'span',
                                { className: 'color-selection comp-neg-m-l comp-icon-gap' },
                                '先出货柜'
                            ),
                            React.createElement('span', { className: 'icon-img icon-qa-normal util-v-text-t' })
                        ),
                        React.createElement(
                            'div',
                            { className: 'bub-pd-b' },
                            React.createElement(
                                'ol',
                                { className: 'comp-select-m-t bub-pd-t' },
                                firstOutList
                            )
                        )
                    ),
                    React.createElement(
                        'ol',
                        { className: 'comp-select-m-t bub-pd-t' },
                        React.createElement(
                            'li',
                            { className: 'comp-panel-title util-line-14' },
                            React.createElement(
                                'span',
                                { className: 'color-selection comp-neg-m-l comp-icon-gap' },
                                '其他货柜'
                            ),
                            React.createElement('span', { className: 'icon-img icon-qa-normal util-v-text-t' })
                        ),
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

module.exports = FOContainer;