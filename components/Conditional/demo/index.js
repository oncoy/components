/**
 * Created by xcp on 2016/3/12.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var Condition = require('../index');

var conditionDemoData = [
    {value: 0, children: 'a'},
    {value: 1, children: 'b'},
    {value: 2, children: 'c'},
    {value: 3, children: 'd'}
];

var log = function (args) {
    console.log(args)
};

ReactDOM.render(
    <Condition
        itemList={conditionDemoData}
        onChecked={log}
        onChange={log}
    />,

    document.getElementById('demo')
);