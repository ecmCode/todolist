import { useState } from 'react'
import { ImBin, ImCheckmark, ImCheckmark2 } from "react-icons/im";

const App = () => {

  // Event handlers / States
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState([])

  const clearInput = () => {
    const target = document.getElementById('input')
    target.value = ''
    setInput('')
  }

  const handleAdd = () => {
    const target = document.getElementById('todo-box')
    target.scrollTop = target.scrollHeight;
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

  const handleChange = (e) => {
    setInput(e.target.value)
    const target = document.getElementById(e.target.id)
    target.addEventListener('keypress', e => {
      if (e.key == 'Enter'){
        document.getElementById('addbtn').click()
      }
    })
  }

  // Tailwind CSS Modules
  const style = {
    theme:{
      bgBody:'bg-gradient-to-br from-cyan-100 via-cyan-300 to-amber-200',
      bgCard:'bg-slate-200 bg-opacity-10 backdrop-blur-2xl',
    },
    flex:{
      col:'flex flex-col',
      row:'flex flex-row',
      center:'justify-center items-center'
    },
    body:'w-screen h-screen outline-none font-serif',
    card:'w-full md:w-1/2 mx-10 h-3/4 ring-1 ring-cyan-200 rounded-lg shadow-xl break-words text-cyan-900',
    head:{
      color:{
        add:'bg-cyan-400',
        clear:'bg-rose-500 text-rose-50',
      },
      input:'w-full h-10 shadow-inner rounded-lg px-4 outline-none caret-cyan-400 font-sans',
      button:'bg-opacity-60 drop-shadow-lg box-border w-1/2 h-10 m-4 rounded outline-none brightness-100 hover:brightness-125 transition text-lg font-sans',
    },
    todobox:'overflow-y-auto h-3/4 flex flex-col items-center snap-y'
  }

  return (
    <div className=
    {`
      ${style.body} 
      ${style.flex.col}
      ${style.flex.center}  
      ${style.theme.bgBody}
    `}>

      <div className={`
        ${style.card}
        ${style.theme.bgCard}
      `}>

        <div className={style.flex.col}>

          <input type="text" id="input" 
          onChange={e => handleChange(e)} 
          className={style.head.input}/>

          <div className={`${style.flex.row}`}>

            <button id='addbtn' 
            onClick={() => handleAdd()} 
            className={`
            ${style.head.button}
            ${style.head.color.add}
            `}>
              Add Todo
            </button> 

            <button 
            onClick={() => handleClear()} 
            className={`
            ${style.head.button}
            ${style.head.color.clear}
            `}>
              Clear All
            </button> 

          </div>

        </div>
        
        <div id='todo-box' 
        className={style.todobox}>

            {todos.map((todo) => {

              todo.id = crypto.randomUUID()
              
              // Local style
              const style = {
                color:{
                  pending:'bg-cyan-500 bg-opacity-40',
                  complete:'bg-emerald-200 bg-opacity-20 ',
                  completeText:'text-emerald-600',
                },
                item:'flex gap-6 justify-between items-center w-5/6 px-10 py-4 my-4  rounded shadow-md snap-start',
                text:'text-xl w-2/3 font-serif tracking-wide'
              }

              return(
                <div key={todo.id} 
                className={`
                ${style.item} 
                ${todo.complete 
                ? style.color.complete 
                : style.color.pending}`}>

                  <span 
                  className={`
                  ${style.text}
                  ${todo.complete && style.color.completeText}`}>
                    {todo.todo}
                  </span>

                    <span className='flex gap-4 text-2xl'>

                    <button 
                    className='outline-none' 
                    onClick={() => handleComplete(todo.id)}>
                      {
                      todo.complete
                      ? <ImCheckmark className='text-emerald-600'/> 
                      : <ImCheckmark2 />
                      }
                    </button>

                    <button 
                    className='outline-none' 
                    onClick={() => handleDelete(todo.id)}>
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
