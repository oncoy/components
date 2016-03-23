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
            componentDidMount: noop,
            selectorBindEvent: true,
            selectorContent: null,
            panelContent: null
        }
    },

    getInitialState: function () {
        return {
            panelStateIsShow: false
        }
    },

    componentDidMount: function () {
        this.props.componentDidMount(this);
    },

    showPanel: function () {
        var self = this;
        self.setState({panelStateIsShow: true}, function () {
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
        self.props.onSelect(item);
        self.__animate.backToTheStart(function () {
            self.onVisible();
        })
    },

    onVisible: function () {
        this.setState({panelStateIsShow: false});
    },

    triggerHide: function () {
        return this.state.panelStateIsShow;
    },

    render: function () {
        var props = this.props;
        var className = classNames({
            'comp-custom-select': true,
            'comp-show-panel': this.state.panelStateIsShow
        });

        var selector = null;
        if (props.selectorBindEvent) {
            selector = <div onClick={this.showPanel}>
                {props.selectorContent}
            </div>
        } else {
            selector = props.selectorContent;
        }

        // todo 加载完成后，应该计算最长的宽度是多少，以免换行
        // 或者应该用样式自己控制？如果此处写死了 width，也是个麻烦
        // 再说吧
        return (<div className={className} ref="selectable">
            <div className="comp-select-selector-pd">
                {selector}
            </div>
            <HideOnBodyClick
                refTarget={this.refs.selectable}
                onVisible={this.onVisible}
                onAnimateMount={this.onAnimateMount}
                triggerHide={this.triggerHide}>
                <div className="comp-select-panel">
                    {props.panelContent}
                </div>
            </HideOnBodyClick>
        </div>)
    }

});

module.exports = Selectable;