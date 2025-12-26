import {Component} from 'react'

import './index.css'

class TodoItem extends Component {
  state = {
    isEditing: false,
    editedTitle: '',
  }

  onDeleteTodo = () => {
    const {todoDetails, deleteTodo} = this.props
    deleteTodo(todoDetails.id)
  }

  onToggleComplete = () => {
    const {todoDetails, toggleComplete} = this.props
    toggleComplete(todoDetails.id)
  }

  onEdit = () => {
    const {todoDetails} = this.props
    this.setState({
      isEditing: true,
      editedTitle: todoDetails.title,
    })
  }

  onSave = () => {
    const {todoDetails, updateTodoTitle} = this.props
    const {editedTitle} = this.state

    updateTodoTitle(todoDetails.id, editedTitle)
    this.setState({isEditing: false})
  }

  onChangeTitle = event => {
    this.setState({editedTitle: event.target.value})
  }

  render() {
    const {todoDetails} = this.props
    const {title, isCompleted} = todoDetails
    const {isEditing, editedTitle} = this.state

    return (
      <li className="todo-item">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={this.onToggleComplete}
        />

        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={this.onChangeTitle}
          />
        ) : (
          <p className={`title ${isCompleted ? 'completed' : ''}`}>{title}</p>
        )}

        {isEditing ? (
          <button type="button" className="save-btn" onClick={this.onSave}>
            Save
          </button>
        ) : (
          <button type="button" className="edit-btn" onClick={this.onEdit}>
            Edit
          </button>
        )}

        <button
          type="button"
          className="delete-btn"
          onClick={this.onDeleteTodo}
        >
          Delete
        </button>
      </li>
    )
  }
}

export default TodoItem
