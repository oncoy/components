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
            checkedClassName: 'checked',
            defaultChecked: null
        }
    },

    onChecked: function (isChecked, currentValue) {
        var prev = this.state.checkedItemValue;

        this.setState({checkedItemValue: isChecked ? currentValue : null});
        this.props.onChecked(isChecked, currentValue);

        if (isChecked) {
            if (prev !== currentValue)
                this.props.onChange(prev, currentValue)
        }
    },

    componentWillMount: function () {
        this.setState({checkedItemValue: this.props.defaultChecked});
    },

    render: function () {
        var props = this.props;

        var items = props.itemList.map(function (item) {

            return (<ConditionItem
                key={item.value}
                isChecked={this.state.checkedItemValue === item.value}
                onChecked={this.onChecked}
                value={item.value}>
                {item.children}
            </ConditionItem>);
        }, this);

        return (<div className={props.className}>
            {items}
        </div>)
    }
});

module.exports = Conditional;
