import { useState } from 'react'
import CalendarComponent from './components/calendarComponent'
import ManageTask from './components/manageTask'
import './input.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex justify-center h-screen w-screen bg-sky-700'>
      <div>     
        <h1 className="pt-8">Todo list</h1>
      </div>
      <div className="content-center">
      <CalendarComponent />
      </div>
      </div>
    </>
  )
}

export default App
