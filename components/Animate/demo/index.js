/**
 * Created by xcp on 2016/3/12.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var Animate = require('../index');
var AnimateChild = React.createClass({
    render(){
        var parent = this.props.parent;
        return (
            <div>
                <p>{this.props.name}</p>
                <button onClick={parent.backToTheStart}>出场</button>
            </div>
        )
    }
});
var TWEEN = require('tween');

// 最简单的调用
ReactDOM.render(
    <Animate
        from={{left:0}}
        during={500}
        to={{left:400}}
        styleProps={{position:'absolute', background: 'red', overflow: 'hidden'}}>
        <AnimateChild name="Animate Child" key="animate-child"/>
    </Animate>,
    document.getElementById('demo')
);

// 传入参数
ReactDOM.render(
    <Animate
        from={{left:0}}
        during={500}
        repeat={2}
        delay={300}
        component="div"
        to={{left:400}}
        easing={TWEEN.Easing.Back.InOut}
        styleProps={{position:'absolute', background: 'red', overflow: 'hidden', top: 50}}>
        <AnimateChild name="Animate Child 1" key="animate-child-1-1"/>
    </Animate>,
    document.getElementById('demo-1')
);