import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import {NavLink, useNavigate} from "react-router-dom";
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';



import logo from '../../assets/images/logo1.png';

import './SideNavbar.css'



export default function SideNavbar(props) {

    const navigate = useNavigate()

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    props.setStateDraw(open);
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));



  return (
    <div>
        <React.Fragment>
          <Drawer
            anchor='left'
            open={props.stateDraw}
            onClose={toggleDrawer( false)}
          >
            <DrawerHeader>
                <a href="/" className="navbar-brand">
            <img alt='logo' className='img-fluid'  src={logo} height={75} width="190px"/>

          </a>
                <IconButton
                 className=''
                 size="small" 
                 onClick={toggleDrawer( false)} 
                 style={{
                   background: "#1d076c",
                   color:'#fff'
                 }}
                  >
                    <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader>
            <Divider />

            <Box
            className="text-center mx-auto"
           
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            >
                <List className="text-center mx-auto" >
                  
                    <ListItem   >
                        <ListItemButton className="side-navbar-list-item" >
                            <NavLink className="nav-link" to="/" >Accueil</NavLink>
                        </ListItemButton>
                    </ListItem>

                    {/* <ListItem   >
                        <ListItemButton className="side-navbar-list-item" >
                            <NavLink className="nav-link" to="/causes" >Les causes</NavLink>
                        </ListItemButton>
                    </ListItem> */}
                  
                    <ListItem   >
                        <ListItemButton>
                    <Button
                     onClick={()=>navigate('/make_donation',{replace:true})}
                     className="w-100" 
                     size='large' 
                     variant="contained"
                        style={{
                            background: "#1d076c"
                        }}
                      >
                    Fiare un don
                    </Button>
                        </ListItemButton>
                    </ListItem>
                  {!props.isLogged?
                 ( <div className={``} >
                    
                  <ListItem   >
                        <ListItemButton  className="side-navbar-list-item">
                      <NavLink className="nav-link" to="/sign_up" >Inscription</NavLink>
                        </ListItemButton>
                    </ListItem>
                    
                    <ListItem   >
                        <ListItemButton  className="side-navbar-list-item"> 
                            <NavLink 
                            className="nav-link" 
                            to="/sign_in" >
                                Connexion
                             </NavLink>
                        </ListItemButton>
                    </ListItem>
                  </div>)
                    :(
                  <div className={``} >
                    <ListItem   >
                        <ListItemButton  className="side-navbar-list-item">
                            <NavLink className="nav-link" to="/my_actions" >Mes actions</NavLink>
                        </ListItemButton>
                    </ListItem>
                    <ListItem   >
                        <ListItemButton  className="side-navbar-list-item">
                           <NavLink className="nav-link" to="/monprofil" >Mon profil</NavLink>
                        </ListItemButton>
                    </ListItem>
                    <ListItem   >
                        <ListItemButton  className="side-navbar-list-item" >
                       
                        <Button
                     onClick={()=>props.onClickLogout()}
                     className="w-100" 
                     size='large' 
                     variant="outlined"
                     color="error"
                      >
                    Déconnexion
                    </Button>
                        </ListItemButton>
                    </ListItem>
                    </div>)}
                </List>
            
            </Box>
          
          </Drawer>



        </React.Fragment>
    </div>
  );
}
