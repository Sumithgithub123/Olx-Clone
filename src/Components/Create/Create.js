import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../store/context';
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { db } from '../../firebase/config';
import { collection,addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const {user} = useContext(AuthContext)
  const [name,setname] = useState('')
  const [category,setcategory] = useState('')
  const [price,setprice] = useState('')
  const [image,setimage] = useState(null)
  const navigate = useNavigate()

  const handlesubmit = ()=>{
const storage = getStorage();
const mountainsRef = ref(storage, `/image/${image.name}`);
uploadBytes(mountainsRef, image).then(() => {
  getDownloadURL(mountainsRef).then((url)=>{
    addDoc(collection(db, "products"), {
      name,
      category,
      price,
      src:url,
      userId:user.uid,
      createdAt:new Date().toDateString()
    }).then(()=>{
      navigate('/')
    })
  })
});
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="createcenterDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>{setname(e.target.value)}}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>{setcategory(e.target.value)}}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input value={price} onChange={(e)=>{setprice(e.target.value)}} className="input" type="number" id="fname" name="Price" />
            <br /> 
          <br />
          <img alt="Posts" width="200px" height="200px" src={image? URL.createObjectURL(image) : ''}></img>
            <br />
            <input onChange={(e)=>{setimage(e.target.files[0])}} type="file" />
            <br />
            <button onClick={handlesubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
