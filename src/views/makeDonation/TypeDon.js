import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Divider, Panel } from 'rsuite'
import FooterApp from '../../components/footer/FooterApp'
import NavTabDon from '../../components/navTabDon/NavTabDon'

import './TypeDon.css' 

const userItem = "userDonnateurIformationsLanfiatech"

export default function TypeDons(){
    const location = useLocation()
    const [isLogged,setIsLogged] = useState(localStorage.getItem(userItem))

       
    useEffect(()=>{
        setIsLogged(localStorage.getItem(userItem))
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[localStorage.getItem(userItem)])
     


    return(
        <>
        <div className="types-dons-container">
            <section className="types-dons-header-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-7 col-lg-7 col-md-8 col-sm-11">
                            <h1>
                                Effectuer un don
                            </h1>
                            <h2>
                              Contribuer à l'amélioration des conditions de vies des personnes vulnérables
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
        
            <section className="mt-n5">
                <div className="container">
                  <NavTabDon />
                </div> 
            </section>
        </div>
      { !(!!!isLogged && location.pathname==="/make_donation" )&&  <FooterApp />}
        </>
        )
}