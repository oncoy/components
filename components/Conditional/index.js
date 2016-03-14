/**
 * Created by xcp on 2016/3/14.
 */

var React = require('react');
var assert = require('../../com/assert');
var noop = require('../../com/noop');
var ConditionItem = require('./ConditionItem');
var ConditionMixins = require('./ConditionMixins');

var Conditional = React.createClass({

    mixins: [ConditionMixins],

    getInitialState: function () {
        return {
            checkedItemValue: null
        }
    },

    getDefaultProps: function () {
        return {
            itemList: [],
            onChecked: noop,
            onChange: noop,
            className: 'conditional',
            itemClassName: 'cond-item',
            checkedClassName: 'checked'
        }
    },

    onChecked: function (isChecked, currentValue) {
        var self = this;
        var prev = self.state.checkedItemValue;

        self.props.onChecked(isChecked, currentValue);

        if (currentValue === self.state.checkedItemValue)
            return self;

        self.setState({checkedItemValue: currentValue}, function () {
            self.props.onChange(prev, currentValue);
        });
    },


    render: function () {
        var props = this.props;

        var items = props.itemList.map(function (item) {
            return <ConditionItem
                key={item.value}
                isChecked={this.state.checkedItemValue === item.value}
                className={props.itemClassName}
                onChecked={this.onChecked}
                onChange={this.onChange}
                checkedClassName={props.checkedClassName}
                value={item.value}>
                {item.children}
            </ConditionItem>;
        }, this);

        return (<div className={props.className}>
            {items}
        </div>)
    }
});

module.exports = Conditional;
