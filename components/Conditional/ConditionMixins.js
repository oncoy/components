/**
 * Created by xcp on 2016/3/14.
 */

var React = require('react');

module.exports = {
    propTypes: {
        itemList: React.PropTypes.array,
        onChecked: React.PropTypes.func,
        onChange: React.PropTypes.func,
        className: React.PropTypes.string,
        itemClassName: React.PropTypes.string,
        checkedClassName: React.PropTypes.string
    }
};