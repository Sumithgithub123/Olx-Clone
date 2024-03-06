import React from 'react';
import { useContext } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/context';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

function Header() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div onClick={()=>navigate('/')} className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="headerplaceSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="headerproductSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="headersearchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="headerloginPage">
          <span>{user ? `Welcome ${user.displayName}` : <span  className='login' onClick={() => { navigate('/login') }}>Login</span>}</span>
          <hr />
        </div>
        {user ? <span style={{cursor:'pointer'}} onClick={() => {
          const auth = getAuth();
          signOut(auth).then((res) => {
              navigate('/login')
          }).catch((error) => {
            console.log(error)
          });
        }}>Logout</span> : ''}
        <div onClick={()=>{navigate('/create')}} className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
