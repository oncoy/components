/**
 * Created by xcp on 2016/3/23.
 */

var React = require('react');
var noop = require('../../com/noop');

var Pagination = React.createClass({

    propTypes: {
        defaultCurrent: React.PropTypes.number,
        total: React.PropTypes.number,
        pageSize: React.PropTypes.number,
        itemsInOnePage: React.PropTypes.number,
        onChange: React.PropTypes.func,
        getPageElement: React.PropTypes.func
    },

    getInitialState: function () {
        return {
            // current page
            current: 1
        }
    },

    getDefaultProps: function () {
        return {
            // default page
            defaultCurrent: 1,
            // item total
            total: 0,
            itemsInOnePage: 10,
            // pages in one item
            pageSize: 5,
            // invoke when page number changed
            onChange: noop,
            getPageElement: function (num, isCurrent) {
                return <span className={'page-item' + (isCurrent ? ' focus' : '')}>{num}</span>
            }
        }
    },

    componentWillMount: function () {
        var props = this.props;
        this.__computed = {
            pages: Math.ceil(props.total / props.itemsInOnePage)
        };
    },

    onSelect: function (num) {
        this.skip(num)
    },

    prev: function () {
        this.skip(this.state.current - 1)
    },

    next: function () {
        this.skip(this.state.current + 1)
    },

    skip: function (num) {
        if (num < 1
            || num > this.__computed.pages
            || num === this.state.current)
            return;

        var self = this;
        self.setState({current: num}, function () {
            self.props.onChange(num)
        })
    },

    render: function () {
        var props = this.props;
        var computedPages = this.__computed.pages;
        var current = this.state.current;
        var pages = computedPages > props.pageSize ?
            props.pageSize :
            computedPages;

        var pageItems = new Array(Math.min(computedPages - current, pages))
            .fill(1)
            .map(function (v, i) {
                var num = current + i;
                var item = props.getPageElement(num, i === 0);
                return React.cloneElement(item, {
                    onClick: this.onSelect.bind(this, num),
                    key: num
                })
            }, this);

        return <div className="pagination">
            {pageItems}
        </div>
    }
});

module.exports = Pagination;