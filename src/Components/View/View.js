import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { postContext } from '../../store/postcontext';
import { db } from '../../firebase/config';
import { collection, getDocs, where } from 'firebase/firestore';
function View() {
  var data;
  let [userdetail,setuserdetail] = useState()
  let {postdetail} = useContext(postContext)
  useEffect(()=>{
    if(postdetail){
      getDocs(collection(db,'users'),where('id','==',postdetail.userId)).then((res)=>{
        data = res.docs[0].data()
        setuserdetail(data)
    })
    }
  //  console.log(userdetail)
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postdetail? postdetail.src:<div>Loading...</div>}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postdetail? postdetail.price:<div>Loading...</div>}</p>
          <span>{postdetail? postdetail.name:<div>Loading...</div>}</span>
          <p>{postdetail? postdetail.category:<div>Loading...</div>}</p>
          <span>{postdetail? postdetail.createdAt:<div>Loading...</div>}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          {userdetail? <div>
          <p>{ userdetail.username}</p>
          <p>{ userdetail.phonenumber}</p>
          </div>:<div>Loading...</div>}
        </div>
      </div>
    </div>
  );
}
export default View;
