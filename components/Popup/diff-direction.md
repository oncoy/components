## 不同方向的汽泡
```JavaScript
// 水平方向，注意 symbolStyle
var horizontal = <Bubble symbolStyle={{left:'50%',marginLeft:-10}}>
    <div style={{width:270}}>Popup组件中的元素，在body被点击后，会隐藏</div>
</Bubble>;
// 垂直方向，注意 symbolStyle
var vertical = <Bubble symbolStyle={{top:6}}>
    <div style={{width:270}}>Popup组件中的元素，在body被点击后，会隐藏</div>
</Bubble>;
```

### 靠右的弹层
```JavaScript
ReactDOM.render(
    <Popup placement="right" content={vertical}>
        <button className="btn btn-primary btn-sm">靠右的弹层</button>
    </Popup>,
    mountNode
);
```

### 靠下的弹层
```JavaScript
ReactDOM.render(
    <Popup placement="bottom" content={vertical}>
        <button className="btn btn-primary btn-sm">靠下的弹层</button>
    </Popup>,
    mountNode
);
```

### 靠左的弹层
```JavaScript
ReactDOM.render(
    <Popup placement="left" content={vertical}>
        <button className="btn btn-primary btn-sm">靠左的弹层</button>
    </Popup>,
    mountNode
);
```