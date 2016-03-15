/**
 * Created by xcp on 2016/3/15.
 */

var ReactDOM = require('react-dom');
var Popup = require('../Popup');
var Bubble = require('../Bubble');

ReactDOM.render(
    <Popup content="Popup组件中的元素，在body被点击后，会隐藏">
        <button>点击显示弹层</button>
    </Popup>,
    document.getElementById('demo')
);

var content = <Bubble>
    <strong>Popup组件中的元素，在body被点击后，会隐藏</strong>
</Bubble>;


ReactDOM.render(
    <Popup placement="top"
           content={content}>
        <button>点击显示弹层</button>
    </Popup>,
    document.getElementById('demo-1')
);