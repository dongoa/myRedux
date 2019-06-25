import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
const appState={
	title:{
		text:'React.js 小书',
		color:'red',
	},
	content:{
		text:'React.js 小书内容',
		color:'blue'
	}
}

function renderApp(newAppState,oldAppState={}){
	console.log(newAppState,oldAppState);
	if(newAppState === oldAppState) return
	console.log('render app...')
	renderTitle(newAppState.title,oldAppState.title)
	renderContent(newAppState.content,oldAppState.content)
}

function renderTitle(newTitle,oldTitle={}){
	if(newTitle === oldTitle) return
	console.log('render title...')
	const titleDOM = document.getElementById('title');
	titleDOM.innerHTML=newTitle.text
	titleDOM.style.color = newTitle.color
}

function renderContent(newContent,oldContent={}){
	console.log(newContent,oldContent)
	if(newContent === oldContent) return 
	console.log('render content...')
	const contentDOM = document.getElementById('content');
	contentDOM.innerHTML=newContent.text
	contentDOM.style.color = newContent.color
}

function createStore(reducer){
	let state=null
	const listeners=[]
	const subscribe = (listener)=>listeners.push(listener)
	const getState = ()=>state;
	const dispatch = (action)=>{
		state = reducer(state,action)
		listeners.forEach((listener)=>listener())
	}
	dispatch({})//初始化state
	return { getState, dispatch,subscribe }
}

function stateChanger(state,action){
	if(!state){
		return {
			title:{
				text:'React.js小书',
				color:'red',
			},
			content:{
				text:'React.js小书内容',
				color:'blue'
			}
		}
	}
	switch(action.type){
		case 'UPDATE_TITLE_TEXT':
			return {
				...state,
				title:{
					...state.title,
					text:action.text
				}
			}
			break
		case 'UPDATE_TITLE_COLOR':
			return {
				...state,
				title:{
					...state.title,
					color:action.color
				}
			}
			break
		default:
			return state
	}
}

const store = createStore(stateChanger)
var oldState=store.getState()
// console.log(oldState)
store.subscribe(()=>{
	// console.log('subscribe');
	const newState = store.getState()
	renderApp(newState,oldState)
	oldState=newState;
})
renderApp(store.getState())
store.dispatch({ type:'UPDATE_TITLE_TEXT',text:'《React.js 小书》' })
store.dispatch({ type:'UPDATE_TITLE_COLOR',color:'red' })


