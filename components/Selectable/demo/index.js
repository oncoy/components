/**
 * Created by xcp on 2016/3/22.
 */

var Selectable = require('../index');
var ReactDOM = require('react-dom');
var React = require('react');

ReactDOM.render(
    <Selectable
        onSelect={function(item){console.log(item)}}
        defaultSelected={1}
        itemList={[1,2,3,4,5,6,7,8,9]}/>,
    document.getElementById('demo')
);