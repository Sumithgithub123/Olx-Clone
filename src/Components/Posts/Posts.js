import React, { useEffect,useState,useContext } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { postContext } from '../../store/postcontext';
import Loading1 from '../../assets/loading1';

function Posts() {
  let {setpostdetail} = useContext(postContext)
  const [products,setproducts] = useState([])
  const [load,setload] = useState(true)
  const navigate = useNavigate()
  useEffect(()=>{
    getDocs(collection(db,'products')).then((data)=>{
      const allpost = data.docs.map((product)=>{
        return{
          ...product.data(),
          id:product.id
        }
      })
      setproducts(allpost)
      setload(false)
    })
  },[])
 
  return (
    <div className="postParentDiv">
      <div className="postmoreView">
        <div className="postheading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="postcards">
          { products.map((obj)=>{
            return(
              <div onClick={()=>{
                setpostdetail(obj)
                navigate('/view')
              }} className="postcard">
            <div className="postfavorite">
              <Heart></Heart>
            </div>
            <div className="postimage">
              <img src={obj.src} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {obj.price}</p>
              <span className="kilometer">{obj.category}</span>
              <p className="name"> {obj.name}</p>
            </div>
            <div className="date">
              <span>{obj.createdAt}</span>
            </div>
          </div>
            )
          }) }
          {load && <Loading1/>}
        </div>
      </div>
      <div className="postrecommendations">
        <div className="postheading">
          <span>Fresh recommendations</span>
        </div>
        <div className="postcards">
          <div className="postcard">
            <div className="postfavorite">
              <Heart></Heart>
            </div>
            <div className="postimage">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
