import './App.css';
import Home from './Pages/Home'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Signup from './Pages/Signup'
import Login from './Components/Login/Login';
import { useContext,useEffect } from 'react';
import { AuthContext } from './store/context';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import Create from './Components/Create/Create';
import View from './Components/View/View';
import Post from './store/postcontext';

function App() {
  let {setuser} = useContext(AuthContext)
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
       setuser(user)
      } else {
        
      }
    });
  },[])
  return (
    <div className="App">
      <Post>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/view' element={<View/>}/>
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
