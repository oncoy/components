/**
 * Created by xcp on 2016/3/22.
 */

var Normal = require('../index').Normal;
var DropDown = require('../DropDown');
var ReactDOM = require('react-dom');
var React = require('react');

ReactDOM.render(
    <Normal
        rejectValue={'10+'}
        itemList={[1,2,3,4,5,6,7,8,9,'10+']}
        defaultSelectedValue={1}/>,
    document.getElementById('demo')
);

// 自定义下拉菜单-筛选异常原因
var getItemContent = function (item, props) {
    var elem = (<DropDown.Item isItem={!!item.value} value={item}>
        {item.value ?
            <li className="comp-panel-item"><strong>{item.text}</strong></li> :
            <li className="comp-panel-title"><span className="color-remind">{item.text}</span></li>
        }
    </DropDown.Item>);
    return React.cloneElement(elem, props);
};

var getSelectorContent = function (item) {
    return <div className="comp-select-selector">
        <span className="util-font-12">{item.text}</span>
        <span className="icon-img icon-tran-black-d"/>
    </div>
};

var itemList = [
    {value: 0, text: '筛选异常原因'},
    {value: 1, text: '全部'},
    {value: 2, text: '编号重复'},
    {value: 3, text: '编号不存在'},
    {value: 4, text: '已下架'}
];

var panelContent = itemList.map(getItemContent);

var selector = <DropDown.Selector defaultSelectedValue={itemList[0]} getSelectorContent={getSelectorContent}/>;

ReactDOM.render(
    <DropDown panelContent={panelContent} selectorContent={selector}/>,
    document.getElementById('exception')
);

// 自定义下拉菜单-货柜详情列表
var containerList = [
    {percent: 0.7, index: 0},
    {percent: 0.7, index: 1},
    {percent: 0.8, index: 2},
    {percent: 0.82, index: 3},
    {percent: 0.31, index: 4},
    {percent: 0.20, index: 5}
];
// 0.7, 0.7, 0.8, 0.82, 0.31, 0.20

var containerItemContent = function (item) {
    var className = 'progress-' + (item.percent * 100) + ' progress-bar-text';
    return <DropDown.Item value={item}>
        <li className="comp-panel-item">
            <strong className="comp-icon-gap">{item.index}</strong>

            <div className="comp-select-progress">
                <span className={className}/>
            </div>
        </li>
    </DropDown.Item>;
};

var containerSelectorContent = function (item) {
    var className = 'progress-' + (item.percent * 100) + ' progress-bar-text';
    return <div className="comp-select-selector">
        <div className="comp-select-progress">
            <span className={className}/>
        </div>
        <span className="icon-img icon-tran-black-d"/>
    </div>
};

var containerPanel = containerList.map(containerItemContent);
var containerSelector = <DropDown.Selector
    defaultSelectedValue={containerList[0]}
    getSelectorContent={containerSelectorContent}
/>;

ReactDOM.render(
    <DropDown panelContent={containerPanel} selectorContent={containerSelector}/>,
    document.getElementById('container')
);

