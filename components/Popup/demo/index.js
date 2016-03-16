/**
 * Created by xcp on 2016/3/15.
 */

var ReactDOM = require('react-dom');
var Popup = require('../Popup');
var Bubble = require('../Bubble');
var content = <div style={{width: 200}}>Popup组件中的元素，在body被点击后，会隐藏</div>;

ReactDOM.render(
    <Popup
        placement="top"
        content={content}>
        <button>靠上的弹层</button>
    </Popup>,
    document.getElementById('demo')
);

content = <Bubble>
    <div styleProps={{width:270}}>Popup组件中的元素，在body被点击后，会隐藏</div>
</Bubble>;


ReactDOM.render(
    <Popup placement="right" content={content}>
        <button>靠右的弹层</button>
    </Popup>,
    document.getElementById('demo-1')
);