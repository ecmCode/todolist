import { useState, useEffect } from 'react'

function App() {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState([])

  const clearInput = () => {
    const target = document.getElementById('input')
    target.value = '';
  }

  const handleAdd = () => {
    if(input.trim() !== '' && input.length > 0){
      setTodos([...todos,{todo:input, id:todos.id, complete: false}])
    }
    setInput('')
    clearInput()
    
  }
  
  const handleClear = () => {
    setInput('')
    setTodos([])
    clearInput()
  }

  const handleComplete = (id) => {
    const updatedTodo = todos.map((todo) => {
      if(todo.id === id){
        todo.complete = !todo.complete;
      }
      
      return todo;
    })
    setTodos(updatedTodo)
    
  }

  const handleDelete = (id) => {
    const newTodo = todos.filter((todo) => todo.id != id)
    setTodos(newTodo)    
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-slate-200 via-cyan-200 to-amber-200">
      <div className='w-full md:w-1/2 mx-10 h-3/4 bg-slate-200 bg-opacity-30 backdrop-blur-2xl ring-1 rounded-lg shadow-2xl break-words text-cyan-900'>

        <div className='flex flex-col justify-around'>
          <input type="text" id="input" onChange={e => setInput(e.target.value)} className="w-full h-10 rounded-lg px-4"/>
          <div className='flex justify-evenly text-lg'>
            <button onClick={() => handleAdd()} className="bg-cyan-400 bg-opacity-40 drop-shadow-lg box-border w-1/2 h-10 m-4 rounded">Add Todo</button> 
            <button onClick={() => handleClear()} className="bg-rose-400 bg-opacity-40 drop-shadow-lg box-border w-1/2 h-10 m-4 rounded">Clear All</button> 
          </div>
        </div>
        
        <div id='todo-box' className='overflow-y-auto h-3/4'>
            {todos.map((todo,index) => {
              index +=1;
              todo.id = index

              return(
                <div key={index} className='flex gap-6 justify-between items-center w-full px-10 py-6'>
                  <span>{index}.</span> 
                  <span className='cursor-pointer text-xl' onClick={() => handleComplete(todo.id)} style={{textDecoration : todo.complete && 'line-through'}}>{todo.todo}</span>
                  <button onClick={() => handleDelete(todo.id)} className="px-6 py-4 bg-cyan-100 ring-1 rounded bg-opacity-40 shadow-md">DELETE</button>
                </div>
              )
            })}
        </div>

      </div>
    </div>
  )
}

export default App
