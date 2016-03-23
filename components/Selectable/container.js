/**
 * Created by xcp on 2016/3/23.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var DropDown = require('./DropDown');
var noop = require('../../com/noop');

var getSelectorContent = function (item) {
    var className = 'progress-' + (item.percent * 100) + ' progress-bar-text';
    return <div className="comp-select-selector">
        <div className="comp-select-progress">
            <span className={className}/>
        </div>
        <span className="icon-img icon-tran-black-d"/>
    </div>

};

var getItemContent = function (item, removeFunc) {
    removeFunc = removeFunc || noop;
    var className = 'progress-' + (item.percent * 100) + ' progress-bar-text';
    return <DropDown.Item value={item}>
        <li className="comp-panel-item">
            <strong className="comp-icon-gap">{item.index}</strong>
            <div className="comp-select-progress comp-icon-gap">
                <span className={className}/>
            </div>
            <span className="icon-img icon-close util-v-m"
                  onClick={removeFunc.bind(this, item)}/>

        </li>
    </DropDown.Item>;
};

var Container = React.createClass({

    getInitialState: function () {
        return {
            currentSelectedValue: null
        }
    },

    getDefaultProps: function () {
        var itemList = [
            {percent: 0, index: 0},
            {percent: 0, index: 1},
            {percent: 0, index: 2},
            {percent: 0, index: 3},
            {percent: 0, index: 4},
            {percent: 0, index: 5},
            {percent: 0, index: 6},
            {percent: 0, index: 7},
            {percent: 0, index: 8},
            {percent: 0, index: 9}
        ];

        return {
            itemList: itemList,
            defaultSelectedValue: itemList[0],
            onSelect: noop,
            getSelectorContent: getSelectorContent,
            getItemContent: getItemContent
        }
    },

    removeOne: function (item) {
        console.log(item)
    },

    onSelect: function (value) {
        var self = this;
        self.setState({currentSelectedValue: value}, function () {
            self.props.onSelect(value);
        });
    },

    ensureEvent: function () {
        var value = this.state.currentSelectedValue;
        return value !== this.props.rejectValue ||
            (value && typeof value === 'object' && !value.target)
    },

    reRender: function (itemList) {
        var mountNode = ReactDOM.findDOMNode(this).parentNode;
        ReactDOM.render(<Container
                itemList={itemList}
                onSelect={this.props.onSelect}
                defaultSelectedValue={this.props.defaultSelectedValue}/>,
            mountNode)
    },

    addOne: function () {
        var index = 0;
        this.props.itemList.forEach(function (item) {
            if (item.index > index)
                index = item.index
        });

        this.props.itemList.push({percent: 0, index: index + 1});
        this.reRender(this.props.itemList);
    },

    render: function () {
        var self = this;
        var props = self.props;

        var panelContent = props.itemList.map(function (item) {
            return props.getItemContent.call(this, item, this.removeOne)
        }, this);

        var addElement = <DropDown.Item isItem={false}>
            <li className="comp-panel-title util-text-center">
                <span className="icon-img icon-plus util-v-m" onClick={this.addOne}/>
            </li>
        </DropDown.Item>;

        panelContent.push(addElement);

        var selector = <DropDown.Selector
            onSelect={self.onSelect}
            defaultSelectedValue={props.defaultSelectedValue}
            getSelectorContent={props.getSelectorContent}/>;

        return <DropDown
            selectorContent={selector}
            panelContent={panelContent}/>
    }
});

module.exports = Container;