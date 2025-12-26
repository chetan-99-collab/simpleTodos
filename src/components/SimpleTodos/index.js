import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
    isCompleted: false,
    isEditing: false,
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
    isCompleted: false,
    isEditing: false,
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    isCompleted: false,
    isEditing: false,
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
    isCompleted: false,
    isEditing: false,
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
    isCompleted: false,
    isEditing: false,
  },
  {
    id: 6,
    title: 'Fix the production issue',
    isCompleted: false,
    isEditing: false,
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
    isCompleted: false,
    isEditing: false,
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
    isCompleted: false,
    isEditing: false,
  },
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
    newTodoTitle: '',
  }

  deleteTodo = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.filter(todo => todo.id !== id),
    }))
  }

  toggleComplete = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo,
      ),
    }))
  }

  toggleEdit = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo,
      ),
    }))
  }

  updateTodoTitle = (id, title) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, title, isEditing: false} : todo,
      ),
    }))
  }

  onChangeNewTodo = event => {
    this.setState({newTodoTitle: event.target.value})
  }

  addTodo = () => {
    const {newTodoTitle} = this.state
    if (newTodoTitle.trim() === '') return

    const words = newTodoTitle.trim().split(' ')
    const lastWord = words[words.length - 1]
    const count = parseInt(lastWord, 10)

    const isBulkAdd = !Number.isNaN(count) && count > 0
    const title = isBulkAdd ? words.slice(0, -1).join(' ') : newTodoTitle
    const todosCount = isBulkAdd ? count : 1

    this.setState(prevState => {
      const lastId =
        prevState.todosList.length > 0
          ? prevState.todosList[prevState.todosList.length - 1].id
          : 0

      const newTodos = Array.from({length: todosCount}, (_, index) => ({
        id: lastId + index + 1,
        title,
        isCompleted: false,
        isEditing: false,
      }))

      return {
        todosList: [...prevState.todosList, ...newTodos],
        newTodoTitle: '',
      }
    })
  }

  render() {
    const {todosList, newTodoTitle} = this.state

    return (
      <div className="app-container">
        <div className="simple-todos-container">
          <h1 className="heading">Simple Todos</h1>

          <div className="add-todo-container">
            <input
              type="text"
              value={newTodoTitle}
              placeholder="Add a todo"
              onChange={this.onChangeNewTodo}
            />
            <button type="button" onClick={this.addTodo}>
              Add
            </button>
          </div>

          <ul className="todos-list">
            {todosList.map(todo => (
              <TodoItem
                key={todo.id}
                todoDetails={todo}
                deleteTodo={this.deleteTodo}
                toggleComplete={this.toggleComplete}
                toggleEdit={this.toggleEdit}
                updateTodoTitle={this.updateTodoTitle}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
