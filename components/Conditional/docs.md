## Conditional - 条件选择
### Props
+ itemList `React.PropTypes.array` 内容列表
  ```JavaScript
   var conditionData = [
       {value: 0, children: 'a'},
       {value: 1, children: 'b'},
       {value: 2, children: 'c'},
       {value: 3, children: 'd'}
   ];
   // children 的值可以是string\number\React.Element
  ```
+ onChecked - `React.PropTypes.func` - 某一个选择被点击时触发
  > 函数被调用时，将会传入两个参数 `isChecked`、 `currentValue`。
  > 分别表示 `是否处于选择状态`、`当前按钮代表的值`
  
+ onChange - `React.PropTypes.func`  - 选择的值有变化时触发
  > 函数被调用时，将会传入两个参数 `prev`、`current`。
  > 分别表示 `上一次选中的值`、 `当次选中的值`
  
+ className - `React.PropTypes.string` - 组件className
+ itemClassName - `React.PropTypes.string` - 每一个选项的className
+ checkedClassName - `React.PropTypes.string` - 被选中时添加的className
+ defaultChecked - `React.PropTypes.any` - 默认选中的值

## 最简单的调用

1. 引入内容
```Javascript
var React = require('react');
var ReactDOM = require('react-dom');
var Condition = require('react-components-essa').Conditional;
```

2. 调用
```JavaScript
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
    mountNode
);
```