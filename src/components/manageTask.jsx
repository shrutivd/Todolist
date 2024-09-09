import React from 'react'

function ManageTask() {
  return (
    <>
    <div className="flex bg-white">
      <label for='title'>Title:</label>
      <input type='text' id='title'/>

      <label for='description'>Description:</label>
      <textarea id='description'/> 

      <button type='button'>Add Task</button>
    </div>
    </>

  )
}

export default ManageTask