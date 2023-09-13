import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: [],
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { payload } = action
      state.todos.push(payload)
    },
    deleteTodo: (state, action) => {
      const { payload } = action
      const updatedTodos = state.todos.filter((todo) => todo.id !== payload)
      state.todos = updatedTodos
    },
  },
})

export const { addTodo, deleteTodo } = todosSlice.actions

export default todosSlice.reducer
