import React, { useState,useEffect } from 'react';
import {IconButton } from 'rsuite';
import {NavLink, useNavigate} from "react-router-dom";
import MenuIcon from '@rsuite/icons/Menu';
import CloseIcon from '@rsuite/icons/Close';
import "./NavbarApp.css";

import Button from '@mui/material/Button';

import logo from '../../assets/images/logo1.png';
import SideNavbar from '../sideNavbar/SideNavbar';
import userService from '../../services/userServices';

const userItem = "userDonnateurIformationsLanfiatech"



  const NavbarApp = (props) => {

    // const [bgColor, setBgColor] = useState('nav-scroll-color');
    const [isLogged,setIsLogged] = useState(localStorage.getItem(userItem))
  

    const [stateDraw, setStateDraw] = React.useState(false);



    const navigate =  useNavigate()
    // React.useEffect(() => {
    //   window.addEventListener("scroll", changeColor);
    //   return function cleanup() {
    //     window.removeEventListener("scroll", changeColor);
    //   };
  
    // },[]);


    const onClickLogout = ()=>{
      userService.logoutUser()
      .then((data)=>{
       
      }).catch((erro)=>{})
      localStorage.removeItem(userItem);
  
      navigate('/',{replace:true})
      window.location.reload(false);
     
    }
    

 
    // const changeColor = () => {
    //   if (
    //     document.documentElement.scrollTop > 79 ||
    //     document.body.scrollTop > 79
    //   ) {
    //     setBgColor("nav-scroll-color");
    //   } else if (
    //     document.documentElement.scrollTop < 80 ||
    //     document.body.scrollTop < 80
    //   ) {
    //     setBgColor("nav-scroll-color");
        
    //   }
    // };

    useEffect(()=>{
      setIsLogged(localStorage.getItem(userItem))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[localStorage.getItem(userItem)])
   
    return (
      <>
      <nav className={`navbar bg-white navbar-expand-lg fixed-top  `}   >
        <div className="container-fluid">

          <a href="/" className="navbar-brand">
            <img alt='logo' className='img-fluid'  src={logo} height={75} width="190px"/>

          </a>
          <IconButton 
            onClick={() => setStateDraw(!stateDraw)}
            className="navbar-toggler f-right bg-dark-1" 
            icon={ stateDraw ? <CloseIcon />  : <MenuIcon />} 
            circle 
            style={{
              background: "#1d076c"
            }}
            appearance='primary'
            size="lg"
            />

          <div className="collapse bg-white text-center navbar-collapse  justify-content-end p-3 p-md-0" id="navbarNav">
            <ul className="navbar-nav d-flex ">
              <li className="nav-item">
                <NavLink className="nav-link " to="/" >Accueil</NavLink>
              </li>

              {/* <li className="">
                <NavLink className="nav-link nav-link-faire-don pe-4 text-white text-uppercase" to="/make_donation" >
                  <span className="span-icon-heart" >
                  <i className="fa-solid fa-heart icon-heart"></i>
                  </span> 
                 Faire un Don</NavLink>
              </li>  */}
              {/* <li className="nav-item">
                  <NavLink className="nav-link" to="/causes" >Les causes</NavLink>
              </li> */}

              { isLogged? (
                <>  
                <li className="">  
                <Button
                     onClick={()=>navigate('/make_donation',{replace:true})}
                     className="w-100" 
                     size='large' 
                     variant="contained"
                        style={{
                            color: "#fff",background:"#13085b"
                        }}
                      >
                    Faire un don                    
                    </Button>
              </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/my_actions" >Mes actions</NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/monprofil" >Mon profil</NavLink>
                  </li>
              
                      <li id="dropdown-item-logout-btn" >
                        <Button
                     onClick={()=>onClickLogout()}
                     className="w-100" 
                     size='large' 
                     variant="outlined"
                     color="error"
                      >
                    Déconnexion
                    </Button>
                        </li>
               

               

              </>
              ):
              (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/sign_up" >Inscription</NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink 
                      className="nav-link" 
                      to="/sign_in" >
                        Connexion
                        </NavLink>
                    </li>
                    <li className="">  
                      <Button
                          onClick={()=>navigate('/make_donation',{replace:true})}
                          className="w-100" 
                          size='large' 
                          variant="contained"
                              style={{
                                  color: "#fff",background:"#13085b"
                              }}
                            >
                          Faire un don                    
                          </Button>
                    </li>
                  </>
                ) }


          
          
            </ul>
          </div>
        </div>
      </nav>
      <SideNavbar
        stateDraw={stateDraw}
        setStateDraw={setStateDraw}
        onClickLogout={onClickLogout}
        isLogged={isLogged} />
      </>
    );
  };
  
export default NavbarApp ;
