import React from 'react';
import { MDBFooter,  MDBContainer,
} from 'mdb-react-ui-kit';

import {useLocation } from "react-router-dom";
import { useEffect,useState } from 'react';

import './FooterApp.css';

const dateYear = new Date()

export default function FooterApp() {

  const [pathname,setPathname] = useState('')

  let location = useLocation();

  useEffect(()=>{
        
    let locationPathName = location?.pathname
    setPathname(locationPathName)

},[location?.pathname])


  return (
    <MDBFooter className={`text-center bg-dark-0 footer-app ${pathname ==="/redirect" && "d-none" } `} color='white' >
      <MDBContainer className='pt-2'>
      
        <section className='text-white'>
          <p className='text-white'>
           Plateforme d'aide
          </p>
        </section>

       
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {dateYear.getFullYear()} Copyright:
        <a className='text-white' href='/'>
          Lanfiatech
        </a>
      </div>
    </MDBFooter>
  );
}