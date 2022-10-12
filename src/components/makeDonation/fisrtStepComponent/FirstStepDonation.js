import React from 'react';


import './FirstStepDonation.css'
import CardsTypeConnexion from './CardsTypeConnexion';


const cardsTypesConnexionsData =[
  {
    auth:false,
    warning:"Aucune Authentification n'est necessaire",
    typeConnexion :'Anomymes',
    informations:[
      "Ne pas associer votre Nom au don  ",
      "Ne pas suivre l'etat de distribution de votre don",
      "Ne pas être contacté par l'équipe",

    ]


  },
  {
    auth:true,
    warning:"Authentification necessaire",
    typeConnexion :'Identifiables',
    informations:[
      "Associer votre Nom au don  ",
      "Suivre l'etat de distribution de votre don",
      "Etre contacter par l'équipe",

    ]

  }
]

export default function FirstStepDonation({onNextStep, onPreviousStep,isLogged}) {

  return (
    <>
    <div className="first-step-donation-container">
      <div className="">
              <h2 className="text-center first-step-donation-title-h2">
              Contribuer à l'amélioration des conditions de vies des personnes vulnérables
              </h2>
              <div className="first-step-donation-styled-divider"> </div>


      </div>
    <div className="d-flex justify-content-around mt-4 flex-wrap"> {
      cardsTypesConnexionsData.map((item,index)=> <CardsTypeConnexion isLogged={isLogged} {...item} key={index} onNextStep={onNextStep} />) 
    }

    </div>

    </div>


    
    </>
  );
}