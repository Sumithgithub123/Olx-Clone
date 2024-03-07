import React from 'react'
import { PulseLoader } from 'react-spinners'

function Loading1() {
  return (
    <div style={{marginTop:'1rem'}}>
      <PulseLoader color='grey' size={10}/>
    </div>
  )
}

export default Loading1