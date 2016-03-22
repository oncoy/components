/**
 * Created by xcp on 2016/3/22.
 */

var React = require('react');
var noop = require('../../com/noop');
var classNames = require('classnames');
var HideOnBodyClick = require('../HideOnBodyClick');

var Selectable = React.createClass({

    getDefaultProps: function () {
        return {
            onSelect: noop,
            itemTemplate: '<strong>{{item}}</strong>',
            itemList: [],
            defaultSelected: null
        }
    },

    getInitialState: function () {
        return {
            panelStateIsShow: false,
            currentSelectedValue: null
        }
    },

    componentDidMount: function () {
        this.setState({currentSelectedValue: this.props.defaultSelected})
    },

    componentWillMount: function () {
        this.__INSERT_REG = /{{([^}]+)}}/g;
    },

    renderTemplate: function (item) {
        return this.props.itemTemplate.replace(this.__INSERT_REG, item);
    },

    showPanel: function () {
        var self = this;
        this.setState({panelStateIsShow: true}, function () {
            var animate = self.__animate;
            var animateProps = animate.props;
            animate.animate(animateProps.from, animateProps.to)
        })
    },

    onAnimateMount: function (animate) {
        this.__animate = animate;
    },

    onSelect: function (item) {
        var self = this;
        this.props.onSelect(item);
        this.setState({currentSelectedValue: item});

        this.__animate.backToTheStart(function () {
            self.onVisible();
        })
    },

    onVisible: function () {
        this.setState({panelStateIsShow: false});
    },

    triggerHide: function () {
        return this.state.panelStateIsShow
    },

    render: function () {
        var props = this.props;
        var keysBegin = 0;
        var items = props.itemList.map(function (item) {
            return <li
                onClick={this.onSelect.bind(null, item)}
                className="comp-panel-item"
                key={keysBegin++}
                dangerouslySetInnerHTML={{__html:this.renderTemplate(item)}}/>
        }, this);

        var className = classNames({
            'comp-custom-select': true,
            'comp-show-panel': this.state.panelStateIsShow
        });

        return (<div className={className} ref="selectable">
            <div className="comp-select-selector-pd">
                <div className="comp-select-selector" onClick={this.showPanel}>
                    <span className="util-font-12">{this.state.currentSelectedValue}</span>
                    <span className="icon-img icon-tran-black-d"/>
                </div>
            </div>
            <HideOnBodyClick
                refTarget={this.refs.selectable}
                onVisible={this.onVisible}
                onAnimateMount={this.onAnimateMount}
                triggerHide={this.triggerHide}>
                <div className="comp-select-panel">
                    <ol className="comp-select-m-t">
                        {items}
                    </ol>
                </div>
            </HideOnBodyClick>
        </div>)
    }

});

module.exports = Selectable;