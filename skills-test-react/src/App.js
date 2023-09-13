import Container from '@mui/material/Container'
import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import AccountMenu from './components/AccountMenu'
import paths from './router'
import Home from './views/Home'
import Todos from './views/Todos'

export default function App() {
  const [openForm, setOpenForm] = React.useState(false)
  const handleOnClick = (page) => {
    console.log('open')
    if (!openForm) {
      setOpenForm(true)
    } else {
      setOpenForm(false)
    }
  }
  return (
    <Container maxWidth='sm'>
      <AccountMenu onClick={handleOnClick} />
      <Routes>
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.todo} element={<Todos />} />
      </Routes>
    </Container>
  )
}
