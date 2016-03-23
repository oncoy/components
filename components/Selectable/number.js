/**
 * Created by xcp on 2016/3/23.
 */

var React = require('react');
var DropDown = require('./DropDown');
var noop = require('../../com/noop');

var getSelectorContent = function (rejectValue, onChange) {
    return function (value) {
        if (value === rejectValue) {
            return <input
                onChange={onChange}
                className="input-default"
                style={{width:60}}
                placeholder="请输入..."/>
        }
        return <div className="comp-select-selector">
            <span className="util-font-12">{value}</span>
            <span className="icon-img icon-tran-black-d"/>
        </div>
    }
};

var getItemContent = function (value, props) {
    var item = <li className="comp-panel-item"><strong>{value}</strong></li>;
    return React.cloneElement(item, props);
};

var Number = React.createClass({

    getInitialState: function () {
        return {
            currentSelectedValue: null
        }
    },

    getDefaultProps: function () {
        return {
            itemList: [1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'],
            defaultSelectedValue: 1,
            onSelect: noop,
            getSelectorContent: getSelectorContent(null),
            getItemContent: getItemContent,
            rejectValue: '10+'
        }
    },

    onSelect: function (value) {
        var self = this;
        if (typeof value === 'object' && value.target) {
            self.props.onSelect(value.target.value);
        } else {
            self.setState({currentSelectedValue: value}, function () {
                self.props.onSelect(value);
            });
        }
    },

    componentWillMount: function () {
        this._getSelectorContent = getSelectorContent(
            this.props.rejectValue,
            this.onSelect
        );
    },

    ensureEvent: function () {
        var value = this.state.currentSelectedValue;
        return value !== this.props.rejectValue ||
            (value && typeof value === 'object' && !value.target)
    },

    render: function () {
        var self = this;
        var props = self.props;

        var selectorContent = <DropDown.Selector
            onSelect={self.onSelect}
            defaultSelectedValue={self.state.currentSelectedValue !== null ?
                    self.state.currentSelectedValue :
                    props.defaultSelectedValue}
            getSelectorContent={self._getSelectorContent}/>;

        var panelContent = React.Children.map(props.itemList, function (value, index) {
            return <DropDown.Item
                value={value}
                key={index}
                getItemContent={props.getItemContent}/>;
        });

        return <DropDown
            selectorBindEvent={this.ensureEvent()}
            selectorContent={selectorContent}
            panelContent={panelContent}/>
    }
});

module.exports = Number;