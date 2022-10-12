import React,{Suspense, useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Routes,Route } from 'react-router-dom';
import { Loader } from 'rsuite';
import './App.css';
import FooterApp from './components/footer/FooterApp';
import NavbarApp from "./components/navbar/NavbarApp";
import SideNavbar from './components/sideNavbar/SideNavbar';
import useUserConnexion from './hooks/useUserConnexion';
import routes from './routes';

import ProtectedRoute from './services/ProtectedRoute'


const userItem = "userDonnateurIformationsLanfiatech"

const loaderApp = (
  <div>
    <Loader backdrop={true} size="lg" />
  </div>
);



function App() {
  const [isLogged,setIsLogged] = useState(localStorage.getItem(userItem)? true : false)

  useEffect(()=>{
    setIsLogged(true)
    if(localStorage.getItem(userItem)){
    setIsLogged(true)
    }
    else{
      
    setIsLogged(false)
    }
    

  },[localStorage.getItem(userItem)])
 

  return (
    <div className="">

      <NavbarApp />
      <Suspense fallback={loaderApp} >
                <Routes>
                  
                    {routes.map((route, index)=> 
                        !route.private 
                          && <Route 
                                      key={index}
                                      exact={route.exact}
                                      path={route.path}
                                      element={
                                      <route.element 
                                      />}
                                      name={route.name}
                              />
                            
                        )
                    }

                <Route element={<ProtectedRoute isAllowed={isLogged} />}>
                  { routes.map((route, index)=> 
                            route.private
                             && <Route 
                                      key={index}
                                      exact={route.exact}
                                      path={route.path}
                                      element={<route.element/>}
                                      name={route.name}
                                  />
                                                    
                            )
                    }
                </Route>

                </Routes>
        </Suspense>

       {/* <FooterApp/> */}
      <SideNavbar/>
       
    </div>
  );
}

export default App;
