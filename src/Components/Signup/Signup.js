import React, { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
//import { Firebasecontext } from '../../store/firebasecontext';
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Loading from '../../assets/loading';

export default function Signup() {
  const [username,setusername] = useState('')
  const [email,setemail] = useState('')
  const [phone,setphone] = useState('')
  const [password,setpassword] = useState('')
  const [load,setload] = useState(true)
  const [err1,seterr1] = useState(false)
  const [err2,seterr2] = useState(false)
  //const Firebase = useContext(Firebasecontext)
  const navigate = useNavigate()

   const handlesubmit = (e)=>{
    setload(false)
   e.preventDefault()
    createUserWithEmailAndPassword(auth,email,password).then((userdetail)=>{
      updateProfile(userdetail.user,{displayName:username}).then(()=>{
        addDoc(collection(db,'users'),{
          id:userdetail.user.uid,
          username:username,
          phonenumber:phone
        }).then(()=>{
           navigate('/login')
        })
      })
    }).catch((err)=>{
      console.log(err);
      setload(true)
      if(err.code ==='auth/weak-password'){
        seterr2(true)
        seterr1(false)
      }else{
        seterr1(true)
        seterr2(false)
      }
    })
  }
  return (
    <div>
        {load &&
      <div className="signupParentDiv">
        <img className='signupimg' alt='np' src={Logo}/>
        <form onSubmit={handlesubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
          required
            className="input"
            type="text"
            id="fname"
            value={username}
            onChange={(e)=>{setusername(e.target.value)}}
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
          required
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e)=>{setemail(e.target.value)}}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
          required
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>{setphone(e.target.value)}}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
          required
            className="input"
            type="password"
            value={password}
            onChange={(e)=>{setpassword(e.target.value)}}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          {err1 && <div style={{fontWeight:'bold',color:'red'}}>Email already exist!!!</div>}
          {err2 && <div style={{fontWeight:'bold',color:'red'}}>Password should be atleast 6 characters</div>}
          <br />
          <button>Signup</button>
        </form>
        <button onClick={()=>navigate('/login')}>Login</button>
      </div>
}
{!load && <Loading/>}
    </div>
  );
}
