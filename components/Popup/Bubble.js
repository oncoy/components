/**
 * Created by xcp on 2016/3/15.
 */

var React = require('react');
var Bubble = React.createClass({

    getDefaultProps: function () {
        return {
            placement: 'top',
            styleProps: {}
        }
    },

    getClassName: function () {
        var dir = {
                top: 'd',
                right: 'l',
                bottom: 't',
                left: 'r'
            }[this.props.placement] || 't';

        return {
            wrapperClass: 'bub bub-dir-' + dir,
            symbolClass: 'bub-symbol icon-img icon-arrow-blue-' + dir
        }
    },


    render: function () {

        var classNames = this.getClassName();

        return (<div className={classNames.wrapperClass} style={this.props.styleProps}>
            <span className={classNames.symbolClass}/>
            <div className="bub-con bub-all-pd">
                {this.props.children}
            </div>
        </div>)
    }
});

module.exports = Bubble;