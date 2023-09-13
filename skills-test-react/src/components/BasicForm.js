import { Add } from '@mui/icons-material'
import { Box, IconButton, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addTodo } from '../store/todosSlice'
import TodosTable from './TodosTable'

const initialValues = {
  todos: '',
}

const BasicForm = () => {
  const dispatch = useDispatch()

  const onSubmit = (values) => {
    const payload = {
      ...values,
      id: uuidv4(),
    }
    dispatch(addTodo(payload))
    resetForm()
  }

  const { values, handleChange, handleSubmit, errors, resetForm } = useFormik({
    initialValues,
    onSubmit,
  })
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'start' }}>
        <TextField
          fullWidth
          size='small'
          id='todo'
          name='todos'
          onChange={handleChange}
          value={values.todos}
          error={Boolean(errors.todos)}
          placeholder='TextHere'
        />
        <IconButton
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'primary.main',
            ml: 1,
          }}
          onClick={handleSubmit}
        >
          <Add sx={{ color: 'primary.main' }} />
        </IconButton>
      </Box>
      <TodosTable />
    </div>
  )
}

export default BasicForm
