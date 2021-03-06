## DropDown 创建下拉菜单
该组件包含两个粒子组件

### DropDown.Item - 包含如下四个属性
+ value - null - Item的值，在 `onSelect` 执行时会将该属性传入
+ isItem - true - 是否是一个Item，如果是，会绑定对应的事件，如果不是，则不会绑定。
+ getItemContent - noop - 获取Item内容函数；组件会优先取用 `props.children` 的内容，
  如果 `props.children` 为null，则使用该函数的返回值。
  该函数会传入两个参数：`value` 、 `{onClick: this.onSelect}`，使用时可以将属性绑定在对应的元素上。
+ onSelect - noop - Item被选择时调用该函数，传入 `value`
  
### DropDown.Selector - 包含如下四个属性
+ defaultSelectedValue - null - 默认选中的值
+ onSelect - noop - 当Item被选中后的回调
+ onComponentMount - noop - 组件挂载后回调，传入参数为组件实例。
+ getSelectorContent - noop - 同 `DropDown.Item` 的 `getItemContent`

## DropDown Props

+ onSelect - noop - 选择时的回调
+ selectorContent - null - 选择器内容
+ selectorBindEvent - true - 是否绑定事件
+ panelContent - null -面板内容
```
+-----------------------+
|    selector           |  --------> 点击该区域，弹出面板，该区域称之为 selector
+-----------------------+

+-----------------------+
|    item               |
|    item               |
|    item               |
|    item               |
|    item               |
|    item               |
+-----------------------+
\                       /
+---- panelContent ----+
```