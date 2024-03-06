import {createContext, useState} from 'react'

export const postContext = createContext(null)

function Post(props){
    const [postdetail,setpostdetail] = useState()
  return (
    <postContext.Provider value={{postdetail,setpostdetail}}>
        {props.children}
    </postContext.Provider>
  )
}

export default Post