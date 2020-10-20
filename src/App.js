import React, { Component } from 'react';
import { TodoBanner } from './TodoBanner';
import { TodoCreator } from './TodoCreator';
import { TodoRow } from './TodoRow';
//import logo from './logo.svg';
//import './App.css';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: "Adam",
      todoItems: [
                  {action: "Buy flowers", done: false},
                  {action: "Get shoes", done: false},
                  {action: "Collect tickets", done: true},
                  {action: "Call Joe", done: false}
                ],
    //  newItemText: "",
    }
    
   // this.updateNewTextValue = this.updateNewTextValue.bind(this);
    this.createNewTodo = this.createNewTodo.bind(this);
    this.listItems = this.listItems.bind(this);
  }

  /*
  updateNewTextValue = (event)=>{
    this.setState({
      newItemText: event.target.value,
    })
  }
  */
  createNewTodo = (task)=>{
    if (!this.state.todoItems.find(item => item.action === task)){
      this.setState({
        todoItems: [...this.state.todoItems, {action: task, done:false}],
       // newItemText: "",
      })
    }
  }

  listItems(){
    return this.state.todoItems.map(item=>(

      <TodoRow 
          key={ item.action }
          item={ item }
          callback={ this.toggleTodo } />
      /*
    <tr key={item.action}>
      <td>{item.action}</td>
      <td><input 
          type="checkbox" 
          checked={item.done}
          onChange={ ()=>this.toggleTodo(item)} /></td>
    </tr>   
    */
    ));
  }

  toggleTodo(todo){
    return this.setState({
      todoItems: this.state.todoItems.map(
        item=>item.action === todo.action ?
        {...item, done: !item.done} : item
      )
    });
  }

  render(){

    let changeStyle = "bg-primary text-white text-center p-2";

    return (
      <div>
        <h4 className={changeStyle}>
        {/*
          {this.state.username}'s To Do List
          ({this.state.todoItems.filter(t=>!t.done).length} items to do)
         */}
         <TodoBanner 
            name={this.state.username}
            tasks={this.state.todoItems} />
        </h4>
        <div className="container-fluid">
          <TodoCreator 
              callback={ this.createNewTodo } />
          {/*
          <div className="my-2">
            <input className="form-control"
                    value={ this.state.newItemText }
                    onChange={ this.updateNewTextValue } />
            <button className="btn btn-primary mt-1"
                    onClick={ this.createNewTodo }>Add</button>
          </div>
          */}
        </div>
        <div className="container-fluid">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Done</th>
              </tr>
            </thead>
            <tbody>
              {this.listItems()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

//export default App;
