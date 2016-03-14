/**
 * Created by xcp on 2016/3/14.
 */

var React = require('react');
var noop = require('../../com/noop');
var ConditionMixins = require('./ConditionMixins');
var classNames = require('classnames');

var ConditionItem = React.createClass({

    mixins: [ConditionMixins],

    getInitialState: function () {
        return {
            isChecked: false
        }
    },

    getDefaultProps: function () {
        return {
            className: 'cond-item',
            checkedClassName: 'checked',
            children: null,
            value: null,
            onChecked: noop,
            onChange: noop,
            isChecked: false
        }
    },

    onChecked: function () {
        var self = this;

        self.setState({isChecked: !self.state.isChecked}, function () {
            self.props.onChecked(self.state.isChecked, self.props.value);
        });
    },


    render: function () {
        var props = this.props;
        var className = {};

        className[props.className] = true;
        className[props.checkedClassName] = this.props.isChecked;

        return (<span
            className={classNames(className)}
            onClick={this.onChecked}>
            {props.children}
        </span>)
    }

});

module.exports = ConditionItem;