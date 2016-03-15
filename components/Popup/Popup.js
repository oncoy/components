/**
 * Created by xcp on 2016/3/15.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var PopupWrap = require('./PopupWrap');
var Animate = require('../Animate');
var absolutePosition = require('../../com/absolutePosition');

var Popup = React.createClass({

    getInitialState: function () {
        return {
            isVisible: false
        }
    },

    getDefaultProps: function () {
        return {
            animate: {
                from: {opacity: 0},
                to: {opacity: 1},
                during: 500
            }
        }
    },

    componentWillMount: function () {
        var body = this.__body = document.body || document.documentElement;
        var popupMountNode = this.__popupMountNode = document.createElement('div');
        body.appendChild(popupMountNode);
    },

    onVisible: function () {
        ReactDOM.unmountComponentAtNode(this.__popupMountNode);
        this.__body.removeChild(this.__popupMountNode);
    },

    showPopup: function (e) {
        e.stopPropagation();
        this.setState({isVisible: false})
    },

    hidePopup: function (e) {
        this.setState({isVisible: true})
    },

    componentDidUpdate: function (nextProps, nextState) {
        var props = this.props;

        // todo 全局定位弹窗位置
        var targetNode = this.refs.targetNode;
        var pos = absolutePosition(targetNode);

        ReactDOM.render(
            <Animate
                component="div"
                from={props.animate.from}
                to={props.animate.to}
                during={props.animate.during}>
                <PopupWrap
                    isVisible={this.state.isVisible}
                    onVisible={this.onVisible}
                    exceptElement={targetNode}
                >
                    {props.content}
                </PopupWrap>
            </Animate>,
            this.__popupMountNode
        );
    },

    render: function () {
        return React.cloneElement(this.props.children, {
            onClick: this.showPopup,
            ref: 'targetNode'
        });
    }
});

module.exports = Popup;