/**
 * Created by xcp on 2016/3/22.
 */

var DropDown = require('../index');
var ReactDOM = require('react-dom');
var React = require('react');

ReactDOM.render(
    <DropDown.Normal
        rejectValue={'10+'}
        itemList={[1,2,3,4,5,6,7,8,9,'10+']}
        defaultSelectedValue={1}/>,
    document.getElementById('demo')
);

ReactDOM.render(
    <DropDown.Normal
        rejectValue={'其他'}
        itemList={['全部时间','3天内', '7天内', '30天内', '其他']}
        defaultSelectedValue={'全部时间'}/>,
    document.getElementById('time')
);

var getItemContent = function (value) {
    return value ?
        <li class="comp-panel-title"><span class="color-remind">筛选异常原因</span></li> :
        <li class="comp-panel-title"><span class="color-remind">筛选异常原因</span></li>
};

ReactDOM.render(
    <DropDown>
        <DropDown.Item isItem={false} value="1" />
        <DropDown.Item value="2" />
        <DropDown.Item value="3" />
    </DropDown>
)