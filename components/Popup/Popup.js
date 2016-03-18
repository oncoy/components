/**
 * Created by xcp on 2016/3/15.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var PopupWrap = require('./PopupWrap');
var Animate = require('../Animate');
var absolutePosition = require('../../com/absolutePosition');
var POPUP_GAP = 5;

var Popup = React.createClass({

    getInitialState: function () {
        return {
            isVisible: true
        }
    },

    getDefaultProps: function () {
        this.__popupMountNode = null;
        this.__position = null;
        this.__content = null;
        this.__body = null;

        return {
            animate: {
                from: {opacity: 0},
                to: {opacity: 1},
                during: 500
            }
        }
    },

    // Invoked once, only on the client
    componentDidMount: function () {
        var body = this.__body = document.body || document.documentElement;
        var popupMountNode = this.__popupMountNode = document.createElement('div');
        body.appendChild(popupMountNode);

        var props = this.props;
        // todo 全局定位弹窗位置
        var targetNode = this.refs.targetNode;
        // 左上角的位置
        var pos = absolutePosition(targetNode);
        var placement = props.placement;
        var w = targetNode.offsetWidth;
        var h = targetNode.offsetHeight;

        // 在该组件内，只需将最外层定位到对应位置
        // 不用理会内容的size
        switch (placement) {
            case "top":
                pos.y = pos.y - POPUP_GAP;
                break;
            case "right":
                pos.x = pos.x + w + POPUP_GAP;
                break;
            case "bottom":
                pos.y = pos.y + h + POPUP_GAP;
                break;
            case "left":
                pos.x = pos.x - POPUP_GAP;
                break;
        }

        this.__position = pos;

        if (typeof props.content === 'string')
            props.content = <span>{props.content}</span>;

        this.__content = React.cloneElement(props.content, {
            placement: props.placement
        });
    },

    onVisible: function () {
        var self = this;
        self.setState({isVisible: true}, function () {
            ReactDOM.unmountComponentAtNode(self.__popupMountNode);
        });
    },

    componentDidUpdate: function (prevProps, prevState) {
        if (this.state.isVisible !== prevState.isVisible)
            this.renderPopup()
    },

    renderPopup: function () {
        if (!this.isMounted()) return;

        var props = this.props;

        ReactDOM.render(
            <Animate
                style={{position:'absolute', left: this.__position.x, top: this.__position.y}}
                component="div"
                from={props.animate.from}
                to={props.animate.to}
                during={props.animate.during}>
                <PopupWrap
                    style={{position:'absolute'}}
                    placement={props.placement}
                    isVisible={this.state.isVisible}
                    onVisible={this.onVisible}
                    refTarget={this.refs.targetNode}>
                    {this.__content}
                </PopupWrap>
            </Animate>,
            this.__popupMountNode
        );
    },

    showPopup: function () {
        this.setState({isVisible: false});
    },

    componentWillUnmount: function () {
        try {
            this.__body.removeChild(this.__popupMountNode);
        } catch (e) {
        }
    },

    render: function () {

        return React.cloneElement(this.props.children, {
            onClick: this.showPopup,
            ref: 'targetNode'
        });
    }
});

module.exports = Popup;