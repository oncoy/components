/**
 * Created by xcp on 2016/3/15.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var Bias = React.createClass({

    propTypes: {
        symBolClass: React.PropTypes.array
    },

    getDefaultProps: function () {
        return {
            placement: 'topLeft',
            closeable: false,
            symbolStyle: {},
            symbolClass: [],
            style: {}
        }
    },

    getClassName: function () {
        var symbolDir = {
                topLeft: 'd-l',
                right: 'r',
                topRight: 'd-r',
                left: 'l'
            }[this.props.placement] || 'd-l';

        var dir = {
                topLeft: 'd',
                topRight: 'd',
                right: 'r',
                left: 'l'
            }[this.props.placement] || 'd';

        return {
            wrapperClass: 'bub bub-bias-dir-' + dir,
            symbolClass: 'bub-symbol icon-img icon-bias-' + symbolDir
        }
    },

    unmount: function () {
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
    },

    render: function () {

        var classNames = this.getClassName();
        var symbolClassName = this.props.symbolClass.length > 0 ?
            (' ' + this.props.symbolClass.join(' ')) :
            '';
        var closeElement = null;
        if (this.props.closeable) {
            closeElement = <span
                className="icon-img icon-close-yellow bub-bias-last"
                onClick={this.unmount}/>
        }

        return (<div className={classNames.wrapperClass} style={this.props.style}>
            <span className={classNames.symbolClass + symbolClassName}
                  style={this.props.symbolStyle}/>
            <div className="bub-bias-con">
                <div className="bub-bias-con-text inline-block">{this.props.children}</div>
                {closeElement}
            </div>
        </div>);
    }
});

module.exports = Bias;