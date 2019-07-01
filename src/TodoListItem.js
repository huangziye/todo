import React, { Component } from 'react';
import PropTyps from 'prop-types';

class TodoListItem extends Component {
	constructor(props) {
		super(props);
		this.handleItemDelete = this.handleItemDelete.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		//子组件上次的内容和这次的内容一样时（及没有改变），就不需要更新，这样写提升性能。
		if(nextProps.content !== this.props.content) {
			return true;
		} else {
			return false;
		}
	}

	// 当父组件的render函数被运行时，它的子组件的render都被重新运行
	render() {
		console.log('child render');		
		const { content } = this.props;
		//渲染流程：JSX -> createElement -> 虚拟DOM（JS对象）-> 真是的DOM
		return (
			<li onClick={this.handleItemDelete}>{content}</li>
		);
	}

	handleItemDelete() {
		const { deleteItem, index } = this.props;
		deleteItem(index);
	}

	// 一个组件要从父组件接收参数
	// 只要父组件的render函数被重新执行了，子组件的这个生命周期函数就会被执行了
	// 如果这个组件第一次存在于父组件中，不会执行
	// 如果这个组件已经存在于父组件中，才会执行
	componentWillReceiveProps() {
		console.log('child componentWillReceiveProps');
	}

	// 当这个组件即将从页面中剔除的时候，会被执行
	componentWillUnmount() {
		console.log('child componentWillUnmount');
	}
}

// 校验传过来的数据类型
TodoListItem.PropTyps = {
	//isRequired表示必须传
	content: PropTyps.string.isRequired,
	deleteItem: PropTyps.func,
	index: PropTyps.number
}

//定义默认值
TodoListItem.defaultProps = {
	content: 'default value'
}

export default TodoListItem;
