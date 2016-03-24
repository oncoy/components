/**
 * Created by xcp on 2016/3/23.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var HideOnBodyClick = require('../HideOnBodyClick');
var classNames = require('classnames');
var noop = require('../../com/noop');
var SelectableMixin = require('./SelectableMixin');

var FOContainer = React.createClass({

    propTypes: {
        firstOut: React.PropTypes.array
    },

    mixins: [SelectableMixin],

    getDefaultProps: function () {
        return {firstOut: []}
    },

    reRender: function (itemList) {
        var mountNode = ReactDOM.findDOMNode(this).parentNode;
        ReactDOM.render(<FOContainer
                itemList={itemList}
                firstOut={this.props.firstOut}
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

    removeOne: function (item) {
        var index = this.props.itemList.indexOf(item);
        if (index !== -1) {
            this.props.itemList.splice(index, 1)
        }
        this.reRender(this.props.itemList)
    },

    getProgressClassName: function (percent) {
        var className = {'progress-bar-text': true};
        className['progress-' + parseInt(percent * 100)] = true;
        return classNames(className);
    },

    getItemElement: function (item) {
        return <li className="comp-panel-item" key={item.index}>
            <strong className="comp-icon-gap">{item.index}</strong>
            <div className="comp-select-progress comp-icon-gap"
                 onClick={this.onSelect.bind(this, item)}>
                <span className={this.getProgressClassName(item.percent)}/>
            </div>
                <span
                    className="icon-img icon-close util-v-m"
                    onClick={this.removeOne.bind(this, item)}/>
        </li>
    },

    render: function () {
        var panelClassName = {
            'comp-custom-select': true,
            'comp-show-panel': this.state.panelStateIsShow
        };

        var progressClassName = this.getProgressClassName(
            this.state.currentSelectedValue ?
                this.state.currentSelectedValue.percent :
                0
        );

        var itemList = this.props.itemList.map(this.getItemElement, this);
        var firstOutList = this.props.firstOut.map(this.getItemElement, this);

        return (<div className={classNames(panelClassName)} ref="selectable">
                <div className="comp-select-selector-pd">
                    <div className="comp-select-selector" onClick={this.showPanel}>
                        <div className="comp-select-progress">
                            <span className={progressClassName}/>
                        </div>
                        <span className="icon-img icon-tran-black-d"/>
                    </div>
                </div>
                <HideOnBodyClick
                    refTarget={this.refs.selectable}
                    onVisible={this.onVisible}
                    onAnimateMount={this.onAnimateMount}
                    triggerHide={this.triggerHide}>
                    <div className="comp-select-panel comp-progress-panel">
                        <div className="bub-bd-b">
                            <div className="bub-pd-l-lg bub-pd-r-lg">
                                <span className="color-selection comp-neg-m-l comp-icon-gap">先出货柜</span>
                                <span className="icon-img icon-qa-normal util-v-text-t"/>
                            </div>
                            <div className="bub-pd-b">
                                <ol className="comp-select-m-t bub-pd-t">
                                    {firstOutList}
                                </ol>
                            </div>
                        </div>
                        <ol className="comp-select-m-t bub-pd-t">
                            <li className="comp-panel-title util-line-14">
                                <span className="color-selection comp-neg-m-l comp-icon-gap">其他货柜</span>
                                <span className="icon-img icon-qa-normal util-v-text-t"/>
                            </li>
                            {itemList}
                            <li className="comp-panel-title util-text-center">
                                <span className="icon-img icon-plus util-v-m" onClick={this.addOne}/>
                            </li>
                        </ol>
                    </div>
                </HideOnBodyClick>
            </div>
        )
    }
});

module.exports = FOContainer;