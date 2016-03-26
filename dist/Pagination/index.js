'use strict';

/**
 * Created by xcp on 2016/3/23.
 */

var React = require('react');
var noop = require('../../com/noop');

var Pagination = React.createClass({
    displayName: 'Pagination',

    propTypes: {
        defaultCurrent: React.PropTypes.number,
        total: React.PropTypes.number,
        pageSize: React.PropTypes.number,
        itemsInOnePage: React.PropTypes.number,
        keepPages: React.PropTypes.number,
        onChange: React.PropTypes.func,
        onSelect: React.PropTypes.func,
        getPage: React.PropTypes.func
    },

    getInitialState: function getInitialState() {
        return {
            // current page
            current: 1
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            // default page
            defaultCurrent: 1,
            // item total
            total: 0,
            itemsInOnePage: 10,
            // pages in one item
            pageSize: 5,
            keepPages: 2,
            // invoke when page number changed
            onChange: noop,
            onSelect: noop,
            getPage: function getPage(num, isCurrent) {
                return React.createElement(
                    'span',
                    { className: 'page-item' + (isCurrent ? ' focus' : '') },
                    num
                );
            }
        };
    },

    componentWillMount: function componentWillMount() {
        var props = this.props;
        var pages = Math.ceil(props.total / props.itemsInOnePage);
        var showPages = pages > props.pageSize ? props.pageSize : pages;

        this.__computed = {
            pages: pages,
            showPages: showPages,
            currentPageOffset: Math.ceil(showPages / 2) - 1
        };
    },

    componentDidMount: function componentDidMount() {
        this.skip(this.props.defaultCurrent);
    },

    onSelect: function onSelect(num) {
        this.skip(num);
        this.props.onSelect(num);
    },

    prev: function prev() {
        this.skip(this.state.current - 1);
    },

    next: function next() {
        this.skip(this.state.current + 1);
    },

    skip: function skip(num, silent) {
        if (num < 1 || num > this.__computed.pages || num === this.state.current) return;

        var self = this;
        self.setState({ current: num }, function () {
            if (!silent) self.props.onChange(num);
        });
    },

    _getCurrentStart: function _getCurrentStart(page) {
        // 只需要保持 current 在一个固定位置
        // 即可保证鼠标下一次点击的时候不会点击在同一个 number 上
        // 点击固定位置的右边 -> next
        // 点击因定位置的右边 -> prev
        // 该函数需要根据 page 确认当前页码的开始位置
        var computed = this.__computed;
        var start = page - computed.currentPageOffset;

        // 衡量边界 start > 0 && pages > start + showPages
        return start + computed.showPages > computed.pages ? computed.pages - computed.showPages + 1 : start > this.props.keepPages ? start : 1;
    },

    _getPage: function _getPage(num, isCurrent) {
        return React.cloneElement(this.props.getPage(num, isCurrent), {
            onClick: this.onSelect.bind(this, num),
            key: num
        });
    },

    render: function render() {
        var props = this.props;
        var computed = this.__computed;
        var current = this.state.current;
        var start = this._getCurrentStart(current);
        var prev, next;

        if (start > props.keepPages) {
            prev = new Array(props.keepPages).fill(1).map(function (v, i) {
                return this._getPage(i + 1, i + 1 === v);
            }, this);
        }

        var pageItems = new Array(computed.showPages).fill(1).map(function () {
            var num = start++;
            return this._getPage(num, current === num);
        }, this);

        if (start < computed.pages) {
            next = new Array(props.keepPages).fill(1).map(function (v, i) {
                var num = computed.pages - props.keepPages + i + 1;
                return this._getPage(num, current === num);
            }, this);
        }

        return React.createElement(
            'div',
            { className: 'pagination' },
            prev,
            prev ? React.createElement('span', { className: 'page-item default' }) : null,
            pageItems,
            next ? React.createElement('span', { className: 'page-item default' }) : null,
            next
        );
    }
});

module.exports = Pagination;