import React from 'react'
import TodoList from './todoList'
import Navbar from './Navbar'
import ActionMatrix from './ActionMatrix'
import BillingInfo from './Billing'
import { isAuthenticated } from '../helper/user'
import InvoiceButton from './InvoiceButton'

const MainPage = () => {

  const {user}=isAuthenticated()

  return (
    <div>
        <Navbar/>
        <TodoList/>
      
      { isAuthenticated() && isAuthenticated() !== undefined  ?  <ActionMatrix/>:""} 
      { isAuthenticated() && isAuthenticated() !== undefined   ?  <BillingInfo/>:""} 
      { isAuthenticated() && isAuthenticated() !== undefined   ?   <InvoiceButton userId={user._id} />:""} 



        
    </div>
  )
}

export default MainPage