import React,{useState} from "react";
import { useEffect } from "react";
import { Steps,Modal,Loader,Button as ButtonRsuite,IconButton } from 'rsuite';
import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FirstStepDonation from "../../components/makeDonation/fisrtStepComponent/FirstStepDonation";
import SecondeStepDonation from "../../components/makeDonation/secondeStepComponent/SecondeStepDonation";
import ThirdStepComponent from "../../components/makeDonation/thirdStepComponent/ThirdStepComponent";

import {makeDonation} from "../../redux/features/donationSlice"
import './MakeDonation.css';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { CinetPay, makePayment, makePaymentRedirection } from "../../services/payment";
import axios from "axios";
import { cinet_pay } from "../../api/cinet_pay_config";



const userItem = "userDonnateurIformationsLanfiatech"




function MakeDonation() {
  const [isLogged,setIsLogged] = useState(localStorage.getItem(userItem))
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  const displayNone = "d-none"
  const [step, setStep] = React.useState(0);
  const [stepLoader, setStepLoader] = React.useState(false);
  const [isLoadingDonation, setIsLoadingDonation] = React.useState(false);
  const [montantError, setMontantError] = React.useState(false);
  
  const [montantDon,setMontantDon] = useState("")
  const [raisonSocial,setRaisonSocial] = useState('')
  const [cibleDons,setCibleDons] = useState('')
  const [provenanceDon,setProvenanceDon] = useState('')

  const [categorieV, setCategorieV] = useState('');
  const [typeVulnerabilite, seTypeVulnerabilite] = useState('');

  const [open, setOpen] = useState(false);
  const [openModaError, setOpenModaError] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  
  

  const handleCloseModaError = () =>setOpenModaError(false)

  const handleClose = () =>{
    setOpen(false)
    if(!isLogged  ){
      window.location.reload();
      navigate('/make_donation',{replace:true})
      setMontantDon('')
      setProvenanceDon('')
      setRaisonSocial('')
      setCibleDons('')
      setStep(0)
    }else{
      window.location.reload();
      navigate('/my_actions',{replace:true})
      setStep(0)
    }
    
    };

 
  const onChangeMontantDon =(montant)=>{
    setMontantError(false)
    setMontantDon(montant)
   
  }

// categorieV: "Urgences"
    // ​​​​
    // cibleV: "aucun"
    // ​​​​
    // create: "2022-09-16T20:07:46.309305Z"
    // ​​​​
    // donateur: "OUEDRAOGO"
    // ​​​​
    // id: 1
    // ​​​​
    // montant: "20000"
    // ​​​​
    // provenanced: "null"
    // ​​​​
    // provider: "CINETPAY"
    // ​​​​
    // typeDons: "Argent"
    // ​​​​
    // typePersonne: "null"



  // const onChange = nextStep => {
  //   setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
  // };

  // const onNext = () => onChange(step + 1);
  // const onPrevious = () => onChange(step - 1);

  const submitFunction = async(dataDonation)=>{
     await axiosInstance.post('efdoargent/',dataDonation)
        .then((res)=>{
          console.log(res)
          if(res.data.status === 200){
            setIsLoadingDonation(false)
            setOpen(true)
            setMontantDon('')
            setProvenanceDon('')
            setRaisonSocial('')
            setCibleDons('')
          }else{
          setIsLoadingDonation(false)
          console.log(res)

          setOpenModaError(true)
          }
         

        })
        .catch(()=>{
          setOpenModaError(true)
          setIsLoadingDonation(false)
        })
  }

  const onSubmitMakeDonation = async (e)=>{
    e.preventDefault();
    setMontantError(false)
    let customerName = userInfo ?userInfo?.user_name :"bienfaiteur"
    let customerSurname = userInfo ?userInfo?.last_name :"anonyme"

    let montantNumber = parseInt(montantDon)
    if(montantNumber%5===0){

        setIsLoadingDonation(true)
        const dataDonation= {
          typeDons:"Argent",
          cibleV:cibleDons ? cibleDons : "aucun" ,
          montant:montantDon,
          provider:"CINETPAY",
          provenanced:provenanceDon,
          categorieV:categorieV?categorieV:"aucun",
          typePersonne:typeVulnerabilite?typeVulnerabilite:"aucun",
          affecter:false
          }

        //   {
        //     "typeDons":"Objet",
        //     "categorieV":"Handicap",
        //     "cibleV":"Handicap",
        //     "categorieObjet":"Nourriture",
        //     "typeObjet":"RIZ",
        //     "lieu_reception":"Abidjan",
        //     "Etat":"bon",
        //     "typePersonne":"morale",
        //     "provenanced":"Maison",
        //     "titre":"Aide",
        //     "description":"Aide1",
        //     "code":"2222",
        //     "message":"ZZZZZ",
        //     "data": {"payment_token": "5df64dd9c5447739327eb88e1e4ea0ac015555cc262ea308c91acbd4e5c8fb95f4bd0bd7cad877a452f877fa6f51fe74184d00a84ab7f9",
        //         "payment_url": "https://checkout.cinetpay.com/payment/5df64dd9c5447739327eb88e1e4ea0ac015555cc262ea308c91acbd4e5c8fb95f4bd0bd7cad877a452f877fa6f51fe74184d00a84ab7f9"},
        //     "api_response_id": "1632143554.8513"
        // }

        // let dataPaymentR = makePaymentRedirection(montantDon,customerName,customerSurname);
        // var config = {
        //   method: 'post',
        //   url: 'https://api-checkout.cinetpay.com/v2/payment',
        //   headers: { 
        //     'Content-Type': 'application/json'
        //   },
        //   data : JSON.stringify({dataPaymentR})
        // };

        // axios(config)
        // .then(function (response) {
        //   console.log(JSON.stringify(response.data));
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });

      
        // var data = JSON.stringify({
        //   "apikey": cinet_pay.API_KEY,
        //   "site_id": cinet_pay.SITE_ID,
        //   "transaction_id":  Math.floor(Math.random() * 100000000).toString(), //
        //   "amount": 100,
        //   "currency": "XOF",
        //   "alternative_currency": "",
        //   "description": " TEST INTEGRATION ",
        //   "customer_id": "172",
        //   "customer_name": "KOUADIO",
        //   "customer_surname": "Francisse",
        //   "customer_email": "harrissylver@gmail.com",
        //   "customer_phone_number": "+225004315545",
        //   "customer_address": "Antananarivo",
        //   "customer_city": "Antananarivo",
        //   "customer_country": "CM",
        //   "customer_state": "CM",
        //   "customer_zip_code": "065100",
        //   "notify_url": "https://webhook.site/d1dbbb89-52c7-49af-a689-b3c412df820d",
        //   "return_url": "https://webhook.site/d1dbbb89-52c7-49af-a689-b3c412df820d",
        //   "channels": "ALL",
        //   "metadata": "user1",
        //   "lang": "FR",
        //   "invoice_data": {
        //     "Donnee1": "",
        //     "Donnee2": "",
        //     "Donnee3": ""
        //   }
        // });
  
          makePayment(montantDon,customerName,customerSurname)
          CinetPay.waitResponse(function(data) {
            if (data.status === "REFUSED") {
              setIsLoadingDonation(false)
              window.location.reload();
                
            } else if (data.status === "ACCEPTED") {
                setIsLoadingDonation(false)

            let dataPayement = {...dataDonation, 
              payement_date:data.payment_date,
              payement_method:data.payment_method,
              matadata:data?.metadata?data?.metadata:"aucun",
              ...data }
                  submitFunction(dataPayement)
                  console.log("data payment : ",dataPayement)


                  // window.location.reload();
              }
        });
        CinetPay.onError(function(data) {
            console.log(data);
            setIsLoadingDonation(false)
            window.location.reload();


        });

        // dispatch(makeDonation(dataDonation))
        // await axiosInstance.post('efdoargent/',dataDonation)
        // .then((res)=>{
        //   console.log(res)
        //   if(res.data.status === 200){
        //     setIsLoadingDonation(false)
        //     setOpen(true)
        //     setMontantDon('')
        //     setProvenanceDon('')
        //     setRaisonSocial('')
        //     setCibleDons('')
        //   }else{
        //   setIsLoadingDonation(false)
        //   console.log(res)

        //   setOpenModaError(true)
        //   }
         

        // })
        // .catch(()=>{
        //   setOpenModaError(true)
        //   setIsLoadingDonation(false)
        // })

    }else{
    setMontantError(true)
    }

  }
  

  useEffect(()=>{

    setStepLoader(true)

    const loaderTImer = setTimeout(()=>{
      setStepLoader(false)
    },1000)

    return(()=>{
      clearTimeout(loaderTImer)
    })

  },[step])

  
  useEffect(()=>{
    setIsLogged(localStorage.getItem(userItem))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[localStorage.getItem(userItem)])
 

  useEffect(()=>{
    let isMounted = true
    const controller = new AbortController()
    const getUserInfo = async()=>{
      try {
        let response = await axiosInstance.get("detailconnecte/",{signal:controller.signal})
        if(isMounted){ 
          let data = response.data.data[0]
          setUserInfo(data)
         
        }
      } catch (error) {
        console.error(error)
      }
    }
    getUserInfo()

    return ()=>{
      isMounted = false
      controller.abort()
    }
  },[])
 

  return (
    <div className="make-donation-container">
      <div className="container pb-5">
       
        <div className="make-donation-steps-container pb-5">
          <div>
            {/* <div shaded className="bg-white">
              <Steps current={step} currentStatus="process" >
                <Steps.Item />

                 <Steps.Item  /> 
                
                <Steps.Item />
              </Steps>
            </div> */}
          
          {
            stepLoader 
            ? (
              <div className="stepLoader-contenair" >
                <Loader size="lg" center />
              </div>
            ):(
              <>
            
            <div  className="make-donation-step-container" >
              
              {/* <div className={`make-donation-first-step ${step !==0 && displayNone} ` }>

                <FirstStepDonation
                  isLogged={isLogged}
                  onNextStep={onNext} 
                  onPreviousStep={onPrevious}  
                  
                  />

              <&/div> */}

              <div className={`make-donation-first-step ${step !==0 && displayNone} ` }>
                
                <SecondeStepDonation
                  setMontantDon={setMontantDon} 
                  categorieV={categorieV}
                  setCategorieV={setCategorieV}
                  typeVulnerabilite={typeVulnerabilite}
                  seTypeVulnerabilite={seTypeVulnerabilite}
                  raisonSocial={raisonSocial}
                  setRaisonSocial={setRaisonSocial}
                  cibleDons={cibleDons}
                  setCibleDons={setCibleDons}
                  provenanceDon={provenanceDon}
                  setProvenanceDon={setProvenanceDon}

                  // onNextStep={onNext} 
                  // onPreviousStep={onPrevious} 
                  montantDon={montantDon} 
                  montantError={montantError}
                  onChangeMontantDon={onChangeMontantDon}
                   />
                
              </div>

              {/* <div className={`make-donation-first-step ${step !==1 && displayNone} ` }>
                
                <ThirdStepComponent 
                  montantError={montantError}
                  onChangeMontantDon={onChangeMontantDon}
                  onSubmitMakeDonation={onSubmitMakeDonation} 
                  montantDon={montantDon} 
                  setMontantDon={setMontantDon} 
                  isLoadingDonation={isLoadingDonation} 
                  onNextStep={onNext} 
                  onPreviousStep={onPrevious} 
                  />
                
              </div> */}

            </div>
      

            <div  className="mt-4 mb-5 step-btn-contenair ">
             

                {/* <Button 
                onClick={onPrevious}
                className={`py-3 px-5 float-start ${step ===0 && "d-none"} `}
                variant="contained" 
                startIcon={<ArrowBackIcon />}
                style={{
                    background:"#272aad",
                }}
                >
                    Précédent
                </Button> */}



                <ButtonRsuite 
                loading={isLoadingDonation}
                disabled={!provenanceDon || !montantDon}
                onClick={onSubmitMakeDonation}
                appearance="primary"
                className={`py-3 px-5 float-end ${step !==0 && "d-none"} `}
                style={{
                    background:"#272aad",
                }}
                >
                    Suivant
                </ButtonRsuite>
              

            </div>

            <div className="mt-4 mb-5 step-btn-contenair-md">
                <IconButton
                
                    style={{
                      background:"#272aad",
                  }}
                  icon={<i className="fa-solid fa-arrow-left m-2"></i>}
                  circle 
                  size="lg" 
                  // onClick={onPrevious}
                  className={`btn btn-primary float-start p-3 ${step ===0 && "d-none"} `}
                  />

                <IconButton
                  disabled={!provenanceDon || !montantDon }
                  style={{
                      background:"#272aad",
                  }}
                  icon={<i className="fa-solid fa-arrow-right m-2"></i>}
                  circle 
                  size="lg" 
                  onClick={onSubmitMakeDonation}
                  className={`btn btn-primary float-end p-3 ${step !==0 && "d-none"} `}
                  />
             
            </div>

     
            </>) }

          </div>
 

          <Modal open={open} onClose={handleClose}>
            <Modal.Header>
              <Modal.Title>

              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="fw-bolder text-center" style={{color:"green"}} >
                Don effectué avec succes!
              </p>
              <p className="fw-bolder text-center">
                Nous vous remercions pour votre contribution
              </p>
            </Modal.Body>
            <Modal.Footer>
             
              <Button onClick={handleClose} appearance="subtle">
                fermer
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal open={openModaError} onClose={handleCloseModaError}>
            <Modal.Header>
              <Modal.Title>

              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="fw-bolder text-center" style={{color:"red"}} >
                Une erreur est survenue
              </p>
              <p className="fw-bolder text-center">
                veuillez reprendre le processus de don.
              </p>
            </Modal.Body>
            <Modal.Footer>
             
              <Button onClick={handleCloseModaError} appearance="subtle">
                fermer
              </Button>
            </Modal.Footer>
          </Modal>

        </div>
      </div>

   
    </div>
  );
}

export default MakeDonation;
