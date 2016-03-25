'use strict';

/**
 * Created by xcp on 2016/3/15.
 */

var ReactDOM = require('react-dom');
var Popup = require('../Popup');
var Bubble = require('../Bubble');
var Bias = require('../Bias');
var assign = require('object-assign');

var __button = function __button(message) {
    return React.createElement(
        'button',
        { className: 'btn btn-primary btn-sm' },
        message
    );
};

// 根据弹层内容和触发元素位置，定义symbolStyle微调弹层位置
var horizontal = React.createElement(
    Bubble,
    { symbolStyle: { left: '50%', marginLeft: -10 } },
    React.createElement(
        'div',
        { style: { width: 270 } },
        'Popup组件中的元素，在body被点击后，会隐藏'
    )
);

var vertical = React.createElement(
    Bubble,
    { symbolStyle: { top: 6 } },
    React.createElement(
        'div',
        { style: { width: 270 } },
        'Popup组件中的元素，在body被点击后，会隐藏'
    )
);

ReactDOM.render(React.createElement(
    Popup,
    { placement: 'top', content: horizontal },
    __button('靠上的弹层')
), document.getElementById('top'));

ReactDOM.render(React.createElement(
    Popup,
    { placement: 'right', content: vertical },
    __button('靠右的弹层')
), document.getElementById('right'));

ReactDOM.render(React.createElement(
    Popup,
    { placement: 'bottom', content: horizontal },
    __button('靠下的弹层')
), document.getElementById('bottom'));

ReactDOM.render(React.createElement(
    Popup,
    { placement: 'left', content: vertical },
    __button('靠左的弹层')
), document.getElementById('left'));

// Bias
var biasContent = 'some text for bias';

ReactDOM.render(React.createElement(
    Popup,
    {
        placement: 'top',
        content: React.createElement(
            Bias,
            { style: { width: 160 } },
            biasContent
        ) },
    __button('不可自关闭的弹层')
), document.getElementById('bias-top-left'));

ReactDOM.render(React.createElement(
    Popup,
    {
        trigger: 'hover',
        placement: 'top',
        content: React.createElement(
            Bias,
            { style: { width: 160 } },
            biasContent
        ) },
    __button('hover显示关闭弹层')
), document.getElementById('bias-top-left-hover'));

ReactDOM.render(React.createElement(
    Bias,
    { closeable: true, placement: 'right' },
    biasContent
), document.getElementById('bias-right'));

ReactDOM.render(React.createElement(
    Bias,
    { closeable: true, placement: 'topRight' },
    biasContent
), document.getElementById('bias-top-right'));

ReactDOM.render(React.createElement(
    Bias,
    { closeable: true, placement: 'left' },
    biasContent
), document.getElementById('bias-left'));

// 操作弹出面板内容
(function () {

    var popup = null;

    var holdPopup = function holdPopup(popupInstance) {
        popup = popupInstance;
    };

    var unmountPopup = function unmountPopup() {
        if (popup) {
            popup.autoVisible && popup.autoVisible();
        }
    };

    var Confirm = React.createElement(
        Bubble,
        { style: { width: 210 }, symbolStyle: { left: '50%', marginLeft: -10 } },
        React.createElement(
            'button',
            { className: 'btn btn-sm btn-primary', onClick: unmountPopup },
            '删除'
        ),
        React.createElement(
            'span',
            { className: 'bub-text-gap-lg' },
            '确定删除该贴纸吗?'
        )
    );

    ReactDOM.render(React.createElement(
        Popup,
        {
            onComponentMount: holdPopup,
            placement: 'top',
            content: Confirm },
        React.createElement(
            'span',
            { className: 'color-link' },
            '取消采购'
        )
    ), document.getElementById('unmount-with-other'));
})();

// 复杂一点的弹出面板内容
(function () {

    var popup = null;

    var holdPopup = function holdPopup(popupInstance) {
        popup = popupInstance;
    };

    // 再复杂的操作，与 <Popup/> 本身无关
    // 只是弹层中的操作可能会使用到 Popup 的某个方法
    // 所以要想办法将 Popup 的实例引入到弹层的实例中

    var ComplexPanel = React.createClass({
        displayName: 'ComplexPanel',

        unmountPopup: function unmountPopup() {
            if (popup) {
                popup.autoVisible && popup.autoVisible();
            }
        },

        componentDidMount: function componentDidMount() {
            // do something
            // refs.content is standardized DOM
            console.log(this.refs.content);
        },

        render: function render() {
            // 需要继承父级传入的 style
            // 用于指定绝对位置
            return React.createElement(
                Bubble,
                {
                    style: assign(this.props.style, { width: 210 }),
                    symbolStyle: { left: '50%', marginLeft: -10 } },
                React.createElement(
                    'button',
                    {
                        className: 'btn btn-sm btn-primary',
                        onClick: this.unmountPopup },
                    '删除'
                ),
                React.createElement(
                    'span',
                    { className: 'bub-text-gap-lg', ref: 'content' },
                    '确定删除该贴纸吗?'
                )
            );
        }
    });

    ReactDOM.render(React.createElement(
        Popup,
        {
            onComponentMount: holdPopup,
            placement: 'top',
            content: React.createElement(ComplexPanel, null) },
        React.createElement(
            'span',
            { className: 'color-link' },
            '憋说话，点我！看源码！'
        )
    ), document.getElementById('unmount-with-other-complex'));
})();