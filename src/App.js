import React, { Component } from 'react';
import { TodoBanner } from './TodoBanner';
import { TodoCreator } from './TodoCreator';
import { TodoRow } from './TodoRow';
import { VisibilityControl } from './VisibilityControl';
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
      showCompleted: true,

    }
    
    this.createNewTodo = this.createNewTodo.bind(this);
  }


  createNewTodo = (task)=>{
    if (!this.state.todoItems.find(item => item.action === task)){
      this.setState({
        todoItems: [...this.state.todoItems, {action: task, done:false}],        
      }, ()=>localStorage.setItem("todos", JSON.stringify(this.state)));
    }
  }

  todoTableRows(doneValue){
    return this.state.todoItems
          .filter(item=>item.done === doneValue)
              .map(item =>(
                <TodoRow 
                  key={ item.action }
                  item={ item }
                  callback={ ()=>this.toggleTodo(item) } 
                />
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

  componentDidMount = ()=>{
    let data = localStorage.getItem("todos");
    this.setState(
      data != null 
          ? JSON.parse(data)
          : {
            username: "Adma",
            todoItems: [
              {action: "Buy flowers", done: false},
              {action: "Get shoes", done: false},
              {action: "Collect tickets", done: true},
              {action: "Call Joe", done: false}
            ],
            showCompleted: true
          }
    )
  }

  render(){

    let changeStyle = "bg-primary text-white text-center p-2";

    return (
      <div>
        <h4 className={changeStyle}>
         <TodoBanner 
            name={this.state.username}
            tasks={this.state.todoItems} />
        </h4>
        <div className="container-fluid">
          <TodoCreator 
              callback={ this.createNewTodo } />
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
              {this.todoTableRows(false)}
            </tbody>
          </table>
          <div className="bg-secondary text-white text-center p-2">
            <VisibilityControl
              description="Completed Tasks"
              isChecked={ this.state.showCompleted }
              callback={ (checked)=> 
                          this.setState({ showCompleted: checked })} />
          </div>
          { this.state.showCompleted && 
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Done</th>
                  </tr>
                </thead>
                <tbody>
                  { this.todoTableRows(true) }
                </tbody>
              </table>
            }
        </div>
      </div>
    );
  }
}

