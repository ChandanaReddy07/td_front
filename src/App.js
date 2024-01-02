

import * as React from "react";

import { Routes, Route } from "react-router-dom";

import TodoList from './components/todoList';
import CurrentBill from './components/Billing';
import ActionMatrix from './components/ActionMatrix';


function App() {
  return (
   
        <Routes>
          <Route path="/" element={<TodoList />} />
         
          <Route path="/bill" element={<CurrentBill />} />
          <Route path="/usage" element={< ActionMatrix/>} />
          
        </Routes>
   
  
  );
}

export default App;
