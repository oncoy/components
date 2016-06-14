/**
 * Tabs
 * @huiye
 */
import React from 'react';
import './Tabs.less';

//Tabs 插件
const Tabs = React.createClass({
  propTypes: {
    defaultVal: React.PropTypes.number,
    callBack: React.PropTypes.func,
    data: React.PropTypes.array
  },
  getDefaultProps: function () {
    return {
      defaultVal: 0
    }
  },
  getInitialState: function () {
    return {
      defaultVal: this.props.defaultVal
    }
  },
  callBack: function (index, name) {
    this.props.callBack && this.props.callBack(window.parseInt(index), name);
  },
  handleClick: function (e) {
    var liNode = e.currentTarget;
    var num = liNode.getAttribute('data-id');
    var name = liNode.getAttribute('data-name');
    this.setState({
      defaultVal: num
    });
    setTimeout(function () {
      this.callBack(num, name);
    }.bind(this), 0);
  },
  tabsHead: function () {
    var arr = [];
    this.props.data.map(function (index, elem) {
      arr.push(<li onClick={this.handleClick} data-id={elem} data-name={index.title} key={elem}>
        <a className={elem==this.state.defaultVal?'tabs-active':''} href="javascript: void(0)">{index.title}</a></li>);
    }.bind(this));
    return arr;
  },
  tabBody: function () {
    var arr = [];
    this.props.data.map(function (index, elem) {
      arr.push(<div className={elem==this.state.defaultVal?'tabs-item tabs-active':'tabs-item'}
                    key={elem}>{index.content}</div>);
    }.bind(this));
    return arr;
  },
  render: function () {
    var animate = 'tabs-animate';
    if (!this.props.animate) {
      animate = "";
    }
    return (
      <div className={"tabs "+(!!this.props.className?this.props.className:"")}>
        <ul className="tabs-header">
          {this.tabsHead()}
        </ul>
        <div className={"tabs-content "+animate}>
          {this.tabBody()}
        </div>
      </div>
    );
  }
});

//配置信息
export default Tabs;

