## Animate
* props
 + component
 + style
 + from
 + to
 + during
 + delay
 + repeat
 + easing
 + className
 
 ## 最简单的调用
 ```
     var React = require('react');
     var ReactDOM = require('react-dom');
     var Animate = require('../index');
     // 创建一个 AnimateChild，当然也可以直接写 React.Element 作为
     // child，这里只是为了演示 animate.backToTheStart 方法
     var AnimateChild = React.createClass({
         render(){
             var parent = this.props.parent;
             return (
                 <div>
                     <p>{this.props.name}</p>
                     <button onClick={parent.backToTheStart.bind(parent, null)}>出场</button>
                 </div>
             )
         }
     });
     // 调用
     ReactDOM.render(
         <Animate
             from={{left:0}}
             to={{left:400}}
             style={{position:'absolute', background: 'red'}}>
             <AnimateChild name="Animate Child" key="animate-child"/>
         </Animate>,
         document.getElementById('demo')
     );
 ```