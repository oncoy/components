/**
 * Created by xcp on 2016/3/23.
 */

var Pagination = require('../index');
var React = require('react');
var ReactDOM = require('react-dom');

var onChange = function (num) {
    console.log(num)
};

ReactDOM.render(
    <Pagination total={100} onChange={onChange}/>,
    document.getElementById('demo')
);