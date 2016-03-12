/**
 * Created by xcp on 2016/3/12.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var Animate = require('../index');
var AnimateChild = React.createClass({
    render(){
        return <div>{this.props.name}</div>
    }
});

ReactDOM.render(
    <Animate>
        <AnimateChild name="Animate Child"/>
    </Animate>,
    document.getElementById('demo')
);