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
    <Pagination
        defaultCurrent={10}
        total={1000}
        onSelect={onChange}
        onChange={onChange}/>,
    document.getElementById('demo')
);


ReactDOM.render(
    <Pagination
        defaultCurrent={3}
        total={1000}
        keepPages={1}
        pageSize={6}
        onChange={onChange}/>,
    document.getElementById('demo-1')
);

ReactDOM.render(
    <Pagination
        total={20}
        pageSize={9}
        itemsInOnePage={5}
        onChange={onChange}/>,
    document.getElementById('demo-2')
);