import { useState } from 'react'
import { ImBin, ImCheckmark, ImCheckmark2 } from "react-icons/im";

const App = () => {

  const [input, setInput] = useState('')
  const [todos, setTodos] = useState([])

  const clearInput = () => {
    const target = document.getElementById('input')
    target.value = ''
    setInput('')
  }

  const handleAdd = () => {
    if(input.trim() !== '' && input.length > 0){
      setTodos([...todos,{todo:input, id:todos.id, complete: false}])
    }
    clearInput()
  }
  
  const handleClear = () => {
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
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-cyan-100 via-cyan-300 to-amber-200 outline-none font-serif">
      <div className='w-full md:w-1/2 mx-10 h-3/4 bg-slate-200 bg-opacity-10 backdrop-blur-2xl ring-1 ring-cyan-200 rounded-lg shadow-xl break-words text-cyan-900'>

        <div className='flex flex-col justify-around'>
          <input type="text" id="input" onChange={e => setInput(e.target.value)} className="w-full h-10 shadow-inner rounded-lg px-4 outline-none caret-cyan-400 font-sans"/>
          <div className='flex justify-evenly text-lg font-sans'>
            <button onClick={() => handleAdd()} className="bg-cyan-400 bg-opacity-60 drop-shadow-lg box-border w-1/2 h-10 m-4 rounded outline-none brightness-100 hover:brightness-125 transition">Add Todo</button> 
            <button onClick={() => handleClear()} className="bg-rose-500 bg-opacity-60 drop-shadow-lg box-border w-1/2 h-10 m-4 rounded outline-none brightness-100 hover:brightness-125 transition text-rose-50">Clear All</button> 
          </div>
        </div>
        
        <div id='todo-box' className='overflow-y-auto h-3/4 flex flex-col items-center snap-y'>
            {todos.map((todo) => {
              todo.id = crypto.randomUUID()
              const style = {
                item:{
                  pending:'flex gap-6 justify-between items-center w-5/6 px-10 py-4 my-4 bg-opacity-20 rounded shadow-md snap-start bg-cyan-500',
                  completed:'flex gap-6 justify-between items-center w-5/6 px-10 py-4 my-4 bg-opacity-20 rounded shadow-md snap-start bg-emerald-200'
                },
                text:{
                  pending:'text-xl w-2/3 font-serif tracking-wide',
                  completed:'text-xl w-2/3 font-serif tracking-wide text-emerald-600 '
                }
              }
              return(
                <div key={todo.id} className={todo.complete ? style.item.completed : style.item.pending}>
                  <span className={todo.complete ? style.text.completed : style.text.pending}>{todo.todo}</span>
                  <span className='flex gap-4 text-2xl'>
                    <button className='outline-none' onClick={() => handleComplete(todo.id)}>
                      {todo.complete? <ImCheckmark className='text-emerald-600'/> : <ImCheckmark2 />}
                    </button>
                    <button className='outline-none' onClick={() => handleDelete(todo.id)}>
                      <ImBin className='hover:text-rose-500 transition'/>
                    </button>
                  </span>
                </div>
              )
            })}
        </div>

      </div>
    </div>
  )
}

export default App
