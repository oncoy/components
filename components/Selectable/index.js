/**
 * Created by xcp on 2016/3/22.
 */

var React = require('react');
var DropDown = require('./DropDown');
var noop = require('../../com/noop');

var getNormalSelectorContent = function (value) {
    if (value === '10+') {
        return <input className="input-default" placeholder="请输入数值"/>
    }
    return <div className="comp-select-selector">
        <span className="util-font-12">{value}</span>
        <span className="icon-img icon-tran-black-d"/>
    </div>
};

var getNormalItemContent = function (value, props) {
    var item = <li className="comp-panel-item"><strong>{value}</strong></li>;
    return React.cloneElement(item, props);
};

function __dropDownClassFactory(getSelectorContent, getItemContent) {
    return React.createClass({

        getInitialState: function () {
            return {
                currentSelectedValue: null
            }
        },

        getDefaultProps: function () {
            return {
                itemList: [],
                defaultSelectedValue: null,
                onSelect: noop,
                getSelectorContent: getSelectorContent,
                getItemContent: getItemContent,
                rejectValue: null
            }
        },

        onSelect: function (value) {
            var self = this;
            this.setState({currentSelectedValue: value}, function () {
                self.props.onSelect(value);
            });
        },

        render: function () {
            var props = this.props;

            var selectorContent = <DropDown.Selector
                onSelect={this.onSelect}
                defaultSelectedValue={this.state.currentSelectedValue !== null ?
             this.state.currentSelectedValue :
             props.defaultSelectedValue}
                getSelectorContent={props.getSelectorContent}/>;

            var panelContent = React.Children.map(props.itemList, function (value, index) {
                return <DropDown.Item
                    value={value}
                    key={index}
                    getItemContent={props.getItemContent}/>;
            });

            return <DropDown
                selectorBindEvent={this.state.currentSelectedValue !== props.rejectValue}
                selectorContent={selectorContent}
                panelContent={panelContent}/>
        }
    });
}

exports.Normal = __dropDownClassFactory(getNormalSelectorContent, getNormalItemContent);