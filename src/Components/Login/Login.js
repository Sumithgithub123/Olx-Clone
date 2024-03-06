import React, { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import Loading from '../../assets/loading';

function Login() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [load,setload] = useState(true)
  const [err1,seterr1] = useState(false)
  const [err2,seterr2] = useState(false)
  const navigate = useNavigate()

  const handlesubmit = (e) => {
    setload(false)
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password).then(() => {
      navigate('/')
    }).catch((err)=>{
      if(err.code==='auth/network-request-failed'){
        seterr2(true)
        seterr1(false)
      }else{
        seterr1(true)
        seterr2(false)
      }
      setload(true)
    })
  }
  return (
    <div>
      {load && <div className="loginParentDiv">
        <img className='loginimg' width="200px" height="200px" alt='' src={Logo}></img>
        <form onSubmit={handlesubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => { setemail(e.target.value) }}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e) => { setpassword(e.target.value) }}
            name="password"
            defaultValue="Doe"
          />
          <br />
          {err1 && <div style={{color:'red',fontWeight:'bold'}}>Invalid Email or Password!!!</div>}
          {err2 && <div style={{color:'red',fontWeight:'bold'}}>Check Your Internet Connection !!!</div>}
          <br />
          <button>Login</button>
        </form>
        <button onClick={() => navigate('/signup')}>Signup</button>
      </div>}
      {!load && <Loading/>}
    </div>
  );
}

export default Login;
