import React from 'react'
import { PulseLoader } from 'react-spinners'

function Loading() {
  return (
    <div style={{marginLeft:'45rem',marginTop:'15rem'}}>
      <PulseLoader color='orange' size={30}/>
    </div>
  )
}

export default Loading
