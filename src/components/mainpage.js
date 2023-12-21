import React from 'react'
import TodoForm from './todoForm'
import TodoList from './todoList'
import Navbar from './Navbar'

const MainPage = () => {
  return (
    <div>

        <Navbar/>
        <TodoList/>
    </div>
  )
}

export default MainPage