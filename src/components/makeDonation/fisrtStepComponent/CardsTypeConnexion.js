import React, { useState,useEffect } from 'react';
import { Panel,Message,Notification, useToaster } from 'rsuite';

import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './CardsTypeConnexion.css'

const userItem = "userDonnateurIformationsLanfiatech"


export default function CardsTypeConnexion({auth,warning,typeConnexion,informations,onNextStep}) {

    const [isLogged,setIsLogged] = useState(localStorage.getItem(userItem))
    const toaster = useToaster();

    const message = (
        <Notification type="info" header="informations" closable>
            <p>
                Vous devez vous Connectez d'abord.
            </p>
        </Notification>
    );


  
    const onClickMakeDonationCard = ()=>{
        if(auth){
            if(!isLogged){

                toaster.push(message, "topEnd")
            }else{
                onNextStep()
            }
        }else{
            onNextStep()
        }
    }

    useEffect(()=>{
        setIsLogged(localStorage.getItem(userItem))
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[localStorage.getItem(userItem)])
     


  return (
    <>
    <Panel  onClick={()=>onClickMakeDonationCard()} shaded className="card-type-connexion bg-white my-3 pb-2" >
        <div className="card-type-connexion-header" >
            <h3 className="h3 text-dark" >
               Dons {typeConnexion}
            </h3>
        </div>
      
        <div className="card-type-connexion-text-container">
      
                <h5 className="h5" >
                  En choisissant de faire des dons de façon <span className="fw-bolder">{typeConnexion}</span>, vous acceptez de :
                    
                </h5>
                <div className="mx-auto mt-3">
                    <ul className="list-inline ms-md-5">  
                        {
                            informations.map((item, index)=>{
                            return (<li key={index}> 
                            {item}
                            </li>)
                            })
                        }

                    </ul>
                </div>
        </div>
        
       {!isLogged && (<div className="mb-2">
            <Message showIcon type="warning" header=" ">
                {warning}
            </Message>
        </div>)}

        <div className="card-type-connexion-btn-container">
         
            <Button 
                onClick={()=>onClickMakeDonationCard()}
                className="float-end" 
                variant="contained" 
                endIcon={<ArrowForwardIcon />}
                style={{
                    background:"#272aad",
                }}
            >
                Continuer
            </Button>
        </div>
        
    </Panel>
    </>
  );
}