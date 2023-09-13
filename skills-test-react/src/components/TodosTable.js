import { DeleteOutline } from '@mui/icons-material'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo } from '../store/todosSlice'

function TodosTable() {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos.todos)

  console.log({ todos })
  return todos.length ? (
    <TableContainer
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 5,
        maxHeight: 300,
        maxWidth: 650,
      }}
    >
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell
              align='center'
              sx={{ background: 'black', color: 'white' }}
            >
              Todos
            </TableCell>
            <TableCell
              align='center'
              sx={{ background: 'black', color: 'white' }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((row) => (
            <TableRow key={row.id}>
              <TableCell align='center'>{row.todos}</TableCell>
              <TableCell align='center'>
                <DeleteOutline
                  onClick={() => {
                    dispatch(deleteTodo(row.id))
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : null
}

export default TodosTable
