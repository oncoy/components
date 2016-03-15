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

var log = function () {
    console.info(arguments)
};

ReactDOM.render(
    <Condition
        itemList={conditionDemoData}
        onChecked={function(isChecked, value) {
          log('onChecked');
          log(isChecked, value);
        }}
        onChange={function(prev, current) {
          log('onChange');
          log(prev, current);
        }}
    />,

    document.getElementById('demo')
);