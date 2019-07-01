import React, { Component, Fragment } from 'react';
import TodoListItem from './TodoListItem';

class TodoList extends Component {

	constructor(props) {
		super(props);
		// 当组件的state或者props发生改变的时候，render函数会重新执行。
		this.state = {
			inputValue: '',
			list: []
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.handleItemDelete = this.handleItemDelete.bind(this);
	}

	// 在组件即将被挂载到页面的时刻自动执行
	componentWillMount() {
		console.log('componentWillMount');
	}

	// 在组件被挂载到页面之后，自动被执行
	// 建议ajax请求数据的放在此处
	componentDidMount() {
		console.log('componentDidMount');
	}

	// 组件被更新之前，它会自动被执行
	shouldComponentUpdate() {
		console.log('shouldComponentUpdate');
		return true;
	}

	// 组件被更新之前，它会自动执行，但是它在shouldComponentUpdate之后被执行，如果shouldComponentUpdate返回true它才会执行，
	// 如果返回false，这个函数就不会被执行。
	componentWillUpdate() {
		console.log('componentWillUpdate');
	}

	// 组件更新完成之后，它会被执行
	componentDidUpdate() {
		console.log('componentDidUpdate');
	}

	render() {
		console.log('parent render');
		return (
			<Fragment>
				<div>
					<label htmlFor="requestFocus">请输入内容</label>
					<input id="requestFocus" value={this.state.inputValue} onChange={this.handleInputChange}/>
					<button onClick={this.handleButtonClick}>submit</button>
				</div>
				<ul ref={(ul) => {this.liebiao = ul}}>
					{
						this.getTodoItem()
					}
				</ul>
			</Fragment>
		);
	}

	getTodoItem() {
		return this.state.list.map((item, index) => {
			//不要用index做key值，这样会在渲染的时候影响性能
			return <TodoListItem key={item} content={item} index={index} deleteItem={this.handleItemDelete}/>
		})
	}

	handleInputChange(e) {
		const value = e.target.value;
		this.setState(() => ({
			inputValue: value
		}));
	}

	handleButtonClick() {
		//prevState 等价于 this.state，this.state 是异步函数
		// ()=>{} 是this.setState的回调函数
		this.setState((prevState) => ({
			list: [...prevState.list, prevState.inputValue],
			inputValue: ''
		}), () => {
			console.log(this.liebiao.querySelectorAll('li').length);
		});
	}

	handleItemDelete(index) {
		this.setState((prevState) => {
			const list = [...prevState.list];
			list.splice(index, 1);
			return {list: list}
		});
	}
}

export default TodoList;