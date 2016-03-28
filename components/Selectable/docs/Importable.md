## Importable - 可选择后输入的组件
该组件是对 [DropDown](./DropDown.html) 的一个封装，选择某一个固定项时， `selector` 区域变为一个 `input`。

### Props
+ itemList - 选项值列表 - `[1, 2, 3, 4, 5, 6, 7, 8, 9, '10+']`
+ defaultSelectedValue - 默认选中的值 - `1`
+ onSelect - 选择某个Item时（如果变为input，则为input.onchange事件的回调）的回调 - noop
+ rejectValue - 触发`selector`变为`input`的值 - '10+'

### 调用
```JavaScript
var Selector = require('react-components-s').Selectable;
var ReactDOM = require('react-dom');
var React = require('react');
var log = function () {
    console.info(arguments)
};
```
1. 默认Props
```JavaScript
ReactDOM.render(<Selector.Importable onSelect={log}/>,mountNode);
```
2. 传入Props
```JavaScript
var itemList = ['全部时间', '3天内', '7天内', '30天内', '其他'];
ReactDOM.render(
    <Selector.Importable
        onSelect={log}
        itemList={itemList}
        defaultSelectedValue={itemList[0]}
        rejectValue={itemList[itemList.length - 1]}/>,
    mountNode
);
```