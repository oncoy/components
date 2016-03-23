/**
 * Created by xcp on 2016/3/22.
 */

var Selector = require('../index');
var DropDown = require('../DropDown');
var ReactDOM = require('react-dom');
var React = require('react');
var log = function () {
    console.info(arguments)
};

ReactDOM.render(
    <Selector.Number onSelect={log}/>,
    document.getElementById('demo')
);

// 自定义内容
var itemList = ['全部时间', '3天内', '7天内', '30天内', '其他'];
ReactDOM.render(
    <Selector.Number
        onSelect={log}
        itemList={itemList}
        defaultSelectedValue={itemList[0]}
        rejectValue={itemList[itemList.length - 1]}/>,
    document.getElementById('time')
);

// itemList:
// [{value:0, text: '筛选异常原因'}]
// 凡value不为真的item，全部会设置为不可选择项
ReactDOM.render(
    <Selector.Diff onSelect={log}/>,
    document.getElementById('diff')
);


// 自定义下拉菜单-货柜详情列表
ReactDOM.render(
    <Selector.Container onSelect={log}/>,
    document.getElementById('container')
);

