import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import {  Button as ButtonRsuite, Modal } from 'rsuite';

import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Slider from '@mui/material/Slider';
import './SignUp.css';
import userService from '../../services/userServices';
import 'react-phone-number-input/style.css'


import Button from '@mui/material/Button';

import imageBg from "../../assets/images/singup/image1.png"


const setValueToUppercase =(valeur)=>{
  return valeur.toUpperCase()
}


function SignUp() {

  const navigate = useNavigate(); 

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false)
    navigate('/',{replace:true})
  };

  // const [messagesValidation, setMessagesValidation] = useState('');
  const [messages, setMessages] = useState('');

  const [typeCompte, setTypeCompte] = useState("");

  const [prenomUser, setPrenomUser] = useState("");
  const [nomUser, setNomUser] = useState("");
  const [numeroTel, setNumeroTel] = useState("");
  const [email, setEmail] = useState("");

  const [nomEntreprise, setNomEntreprise] = useState("");
  const [emailEntreprise, setEmailEntreprise] = useState("");
  const [numeroTelEntreprise, setNumeroTelEntreprise] = useState("");
  const [addresseEntreprise, setAddresseEntreprise] = useState("");
  
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isOganisation, setIsOganisation] = useState(false);
  const [isOganisationStep, setIsOganisationStep] = useState(0);

  const [singUpLoader, setSingUpLoader] = useState(false);

  // const [messageErrorContent, setMessageErrorContent] = useState([]);
  const [changeFromLoader, setChangeFromLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [stepForm, setStepForm] = useState(0);

  

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  // function onChangeIsOrganistion(){

  //   setIsOganisation(!isOganisation)
  //   setPrenomUser("")
  //   setNomUser("")
  //   setNumeroTel("")
  //   setEmail("")
  //   setNomEntreprise("")
  //   setEmailEntreprise("")
  //   setNumeroTelEntreprise("")
  //   setPassword("")
  //   setPasswordConfirm("")

  // }



  const submitFunctionSignUp = async e  => {

    e.preventDefault();
    setSingUpLoader(true)
    setMessages('')

    const  url = isOganisation? "donateurorg/" : "donateurm/"
    const dataUser = isOganisation?{
                  last_name: setValueToUppercase(prenomUser),
                  user_name: setValueToUppercase(nomUser),
                  organisations: setValueToUppercase(nomEntreprise),
                  email: emailEntreprise,
                  numero: numeroTelEntreprise,
                  password: password,
                 
                  
                }:{
                  last_name: setValueToUppercase(prenomUser),
                  user_name: setValueToUppercase(nomUser),
                  numero: numeroTel,
                  email: email,
                  password: password,
                 
                }

    if(password !== passwordConfirm ){
      setMessages("Vos deux mot de passe doivent etre indentiques.")
      setPassword('')
      setPasswordConfirm('')
      setSingUpLoader(false)
    }
    else{
      userService.signUpUser(url,dataUser)
      .then((response)=>{
        setSingUpLoader(false)
        if(response.data.status === 400){
          setMessages("Un compte existe déjà avec cette Email.")
        }else{
          setPrenomUser("")
          setNomUser("")
          setNumeroTel("")
          setEmail("")
          setNomEntreprise("")
          setEmailEntreprise("")
          setNumeroTelEntreprise("")
          setPassword("")
          setPasswordConfirm("")

          setOpen(true)
          
        
        }
      })
      .catch((error)=>{ 
        setMessages("Une erreur s'est produite, veuillez actualisé la page.")
        setSingUpLoader(false)
      })
    }

  }


  useEffect(()=>{

    setChangeFromLoader(true)
    const timerChangerLoader = setTimeout(()=>{
      setChangeFromLoader(false)
    },1000)

    return(()=>{
      clearTimeout(timerChangerLoader)
    })
  },[isOganisationStep])

  useEffect(()=>{

    setChangeFromLoader(true)
    const timerChangerLoader = setTimeout(()=>{
      setChangeFromLoader(false)
    },1000)

    return(()=>{
      clearTimeout(timerChangerLoader)
    })
  },[isOganisation])

  return (
    <div className="sign-up-container ">

      <section className="sign-up-section">
        <div className="container">
          <div className="sign-up-form-content bg-white ">
            <div className="row">
              <div className="col-lg-4 col-md-3 sign-up-style-content mx-auto text-center py-5">
                  <h3>
                    Inscription
                  </h3>   
                  <p>
                  Garder une trace de vos actions.
                 </p>
                  <img className="img-fluid " src={imageBg} alt="sign-in"/>
                  
                 <div className="row justify-content-center">
                  <div className="col-md-10">
                    <Button 
                    onClick={()=>navigate('/sign_in',{replace:true})}
                    fullWidth
                    style={{color:"#fff"}} 
                    variant="outlined">déjà un compte ?</Button>
                  </div>
                 </div>
                 
              </div>
              <div className="col-lg-8 col-md-9 px-md-5 px-1">
                <div className="row sign-up-slider-container">
                  <div className="col-12">
                    <Slider disabled  defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
                  </div>
                </div>
                <div className="form-content-sign-up">
                  <div className="row align-items-center">
                    <div className="col-md-8 col-12">
                      <h3 >Formulaire d'Enregistrement</h3>
                      <p>tous les champs sont obligatoires.</p>
                    </div>
                  </div>
                  <form  onSubmit={submitFunctionSignUp}>
                  <div className={`${stepForm===1 && 'd-none' } entreprise-form-detail  mx-2`} >
                  <div className="row">
                    <div className="col-12">
                    <FormControl  fullWidth variant="standard">
                      <InputLabel id="type-compte-label">
                        Choisissez un type de compte
                      </InputLabel>
                      <Select
                        value={typeCompte}
                        onChange={(e)=>setTypeCompte(e.target.value)}
                        labelId="type-compte-label"
                        id="type-compte"
                      
                        label="Choisissez un type de compte"
                      >
                        <MenuItem value="individuel">Individuel</MenuItem>
                        <MenuItem value="organisation">Organisation</MenuItem>
                      </Select>
                    </FormControl>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 py-3">
                      <TextField
                        value={setValueToUppercase(prenomUser)}
                        onChange={e => setPrenomUser(e.target.value)}
                        fullWidth 
                        label="Entrer votre prénom"
                        id="prenom"
                        defaultValue="Normal"
                        variant="standard"
                      />
                    </div>
                    <div className="col-md-6 py-3">
                      <TextField
                        fullWidth 
                        id="prenom"
                        label="Entrer votre nom"
                        value={setValueToUppercase(nomUser)}
                        onChange={e => setNomUser(e.target.value)}
                        defaultValue="Normal"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 py-3">
                      <TextField
                        fullWidth 
                        type='email' 
                        label='Entrer votre adresse electronique'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        id="email"
                        defaultValue="Normal"
                        variant="standard"
                      />
                    </div>
                    <div className="col-md-6 py-3">
                      <TextField
                        fullWidth 
                        id="prenom"
                        label="Entrer votre numéro de téléphone"
                        value={numeroTel}
                        onChange={(e)=>setNumeroTel(e.target.value)}
                        defaultValue="Normal"
                        variant="standard"
                      />
                    </div>
                  </div>

                  
                  <div className="row">
                    <div className="col-md-6 py-3">
                        <FormControl fullWidth variant="standard">
                        <InputLabel htmlFor="password">Entrer un mot de passe</InputLabel>
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </div>
                    <div className="col-md-6 py-3">
                        <FormControl fullWidth variant="standard">
                        <InputLabel htmlFor="confirm-password">Confirmer le mot de passe</InputLabel>
                        <Input
                          id="confirm-password"
                          type={showPassword1 ? 'text' : 'password'} 
                          value={passwordConfirm}
                          onChange={e => setPasswordConfirm(e.target.value)}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword1}
                                onMouseDown={handleMouseDownPassword1}
                              >
                                {showPassword1 ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </div>

                    </div>
                    </div>
                    
                    <div className={`${stepForm===0 && 'd-none' } entreprise-form-detail  mx-2`} >
                    <div className="row">
                      <div className="col-md-6 py-3">
                        <TextField
                          fullWidth 
                          label="Entrer la raison sociale de l'entreprise"
                          value={setValueToUppercase(nomEntreprise)}
                          onChange={e => setNomEntreprise(e.target.value)}
                          id="nomEntreprise"
                          defaultValue="Normal"
                          variant="standard"
                        />
                      </div>
                      <div className="col-md-6 py-3">
                        <TextField
                          fullWidth 
                          type='email' 
                          label='Entrer une adresse electronique' 
                          value={emailEntreprise}
                          onChange={e => setEmailEntreprise(e.target.value)}
                          defaultValue="Normal"
                          variant="standard"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 py-3">
                        <TextField
                          fullWidth 
                          label="Entrer l'addresse de l'entreprise"
                          value={setValueToUppercase(addresseEntreprise)}
                          onChange={e => setAddresseEntreprise(e.target.value)}
                          id="addresseEntreprise"
                          defaultValue="Normal"
                          variant="standard"
                        />
                      </div>
                      <div className="col-md-6 py-3">
                        <TextField
                          fullWidth 
                          label="Numéro de l'entreprise" 
                          value={numeroTelEntreprise}
                          onChange={e => setNumeroTelEntreprise(e.target.value) }
                          defaultValue="Normal"
                          variant="standard"
                        />
                      </div>
                    </div>



                  </div>
                  <div className="row sign-up-btn-container justify-content-end align-items-center">
                    <div className="col-11 py-3 text-end">

                    <Button onClick={()=>setStepForm(stepForm-1)} className={`${stepForm===0 && 'd-none' } mx-2`}  variant="contained">précédent</Button>

                    <Button  
                    onClick={()=>setStepForm(stepForm+1)} 
                    className={`${((stepForm===0 && (typeCompte ==="" || typeCompte ==="individuel") ) || stepForm===1 ) && 'd-none' } mx-2`} 
                    variant="contained">Suivant</Button>

                    <ButtonRsuite appearance='primary' type="submit" className={`${(stepForm===0 && typeCompte ==="organisation" ) && 'd-none' } mx-2 text-uppercase`}  variant="contained">Enregistrer</ButtonRsuite>
                    </div>
                  </div>
                </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

{/*       
      <div className="container mt-1 mt-md-5">
        <div  className="sign-up-container-inner">

         

            <Panel shaded className="sign-up-form-container bg-white "
      >   
          <h2 className="sign-up-title text-center">Inscription</h2>
         <div className="sign-up-img-container text-center">
            <img src={signUpImage} alt="logo login" className="sign-up-img" />
       </div> 
       { messages &&(
          <Message className={`mx-auto fw-bolder`}  type="error">
            <ul>
              {
                messages
              }
            </ul>
          </Message>)}
      

          <div className="py-4">
            <MDBCheckbox name='flexCheck' checked={isOganisation === true} value={isOganisation} onChange={()=>onChangeIsOrganistion()} id='flexCheckDefault' label='Etês-vous une Organisation ?' />
          </div>

          <form onSubmit={submitFunctionSignUp} >
            <div className={`mx-auto text-center py-5 ${!changeFromLoader && 'd-none' } `}>
              <Loader size="lg" />
            </div>

            
            <div className={`${changeFromLoader && 'd-none' }`}>
            <div className={`is-organisation-content ${ !isOganisation && 'd-none' }`}  >
              <div className={`${isOganisationStep != 0 && 'd-none' } `}   >

                <p className="text-dark-1" >
                  Informations personnelles
                </p>
                <MDBInput 
                  required={isOganisation}
                  className='mb-4 sign-up-input' 
                  type='text' 
                  label="Entrer votre prénom"
                  placeholder='Amidou'
                  value={setValueToUppercase(prenomUser)}
                  onChange={e => setPrenomUser(e.target.value)}
                  />
                  <MDBInput 
                    required={isOganisation}
                    className='mb-4 sign-up-input' 
                    type='text' 
                    label="Entrer votre nom"
                    placeholder='Touré'
                    value={setValueToUppercase(nomUser)}
                    onChange={e => setNomUser(e.target.value)}
                    />
                  <MDBInput
                   required={isOganisation}
                    className='mb-4 sign-up-input' 
                    type='password' 
                    label='Entrer un mot de passe'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                  <MDBInput
                      className='mb-4 sign-up-input' 
                      type='password' 
                      required={isOganisation}
                      label='Confirmer le mot de passe' 
                      value={passwordConfirm}
                      onChange={e => setPasswordConfirm(e.target.value)}
                      />

              </div>

              <div className={`${isOganisationStep != 1 && 'd-none' } `}  >

                <p className="text-dark-1" >
                Informations de l'organisation
                </p>
                <MDBInput 
                required={isOganisation}
                className='mb-4 sign-up-input' 
                type='text' 
                label="Entrer la raison sociale de l'entreprise"
                placeholder='lanfiactech'
                value={setValueToUppercase(nomEntreprise)}
                onChange={e => setNomEntreprise(e.target.value)}
                />
                <MDBInput 
                required={isOganisation}
                className='mb-4 sign-up-input' 
                type='email' 
                label='Entrer une adresse electronique' 
                placeholder='lanfiactech@gmail.com'
                value={emailEntreprise}
                onChange={e => setEmailEntreprise(e.target.value)}
                />

            
                <PhoneInput
                  required={isOganisation}
                  international
                  country="CI"
                  label='Entrer un numéro de téléphone'
                  defaultCountry="CI"
                  className='mb-4 sign-up-input' 
                  placeholder="Entrer un numéro de téléphone"
                  value={numeroTelEntreprise}
                  onChange={setNumeroTelEntreprise}/>

              
              </div>
            </div>





            <div className={`${ isOganisation && 'd-none' }`}  >
              <MDBInput 
                required={!isOganisation}
                className='mb-4 sign-up-input' 
                type='text' 
                label="Entrer votre prénom"
                placeholder='Amidou'
                value={setValueToUppercase(prenomUser)}
                onChange={e => setPrenomUser(e.target.value)}
                />
                <MDBInput 
                 required={!isOganisation}
                  className='mb-4 sign-up-input' 
                  type='text' 
                  label="Entrer votre nom"
                  placeholder='Touré'
                  value={setValueToUppercase(nomUser)}
                  onChange={e => setNomUser(e.target.value)}
                  />
                <MDBInput 
                required={!isOganisation}
                className='mb-4 sign-up-input' 
                type='email' 
                label='Entrer votre adresse electronique' 
                placeholder='lanfiactech@gmail.com'
                value={email}
                onChange={e => setEmail(e.target.value)}
                />

              

                <PhoneInput
                  required={!isOganisation}
                  international
                  country="CI"
                  label='Entrer un numéro de téléphone'
                  defaultCountry="CI"
                  className='mb-4 sign-up-input' 
                  placeholder="Entrer votre numéro de téléphone"
                  value={numeroTel}
                  onChange={setNumeroTel}/>

                <MDBInput
                 required={!isOganisation}
                 className='mb-4 sign-up-input' 
                 type='password' 
                 label='Entrer un mot de passe'
                 value={password}
                 onChange={e => setPassword(e.target.value)}
                 />
                 <MDBInput
                  required={!isOganisation}
                  className='mb-4 sign-up-input' 
                  type='password' 
                  label='Confirmer le mot de passe' 
                  value={passwordConfirm}
                  onChange={e => setPasswordConfirm(e.target.value)}
                  />


            </div>
            
          </div>
                <div className={`d-flex justify-content-between justify-item-center ${ !isOganisation && 'd-none' }`} > 
                 
                  <ButtonRsuite 
                  size="lg" 
                  className="sign-up-btn"
                  onClick={()=>setIsOganisationStep(isOganisationStep - 1 )} 
                  disabled={isOganisationStep < 1 && true} 
                  color="cyan" 
                  appearance="primary">
                    Précedent
                  </ButtonRsuite>
                  <ButtonRsuite 
                  size="lg" 
                  onClick={()=>setIsOganisationStep(isOganisationStep + 1)}  
                  className={` ${isOganisationStep ==1 ? 'd-none sign-up-btn':"sign-up-btn"} `} 
                  disabled={isOganisationStep == 1 && true} 
                  color="cyan" 
                  appearance="primary">
                     Suivant
                  </ButtonRsuite>

                  <ButtonRsuite 
                  size="lg" 
                  loading={singUpLoader} 
                  type="submit" 
                  className={` ${isOganisationStep !=1 ? 'd-none sign-up-btn': "sign-up-btn"} `} color="cyan" 
                  appearance="primary">
                     Enregistrement
                  </ButtonRsuite>

                </div>

                <div className={`${ isOganisation && 'd-none' }`}> 
                 
                  <ButtonRsuite  
                  loading={singUpLoader} 
                  type='submit' 
                  className='py-3 sign-up-btn' 
                  size='lg' 
                  block 
                  color="cyan" 
                  appearance="primary">
                  Enregistrement
                  </ButtonRsuite>

                </div>
               
            </form>



         
            </Panel>
        </div>
      </div>
      
    */}
      <Modal  open={open} onClose={handleClose}>
           
            <Modal.Body className='text-center fw-bolder'>
              <h2 className="" style={{color:"green"}} >Félicitation !</h2>
              <p>
              Votre compte a été crée avec success
              </p>
              <p>
              Connectez-vous ?
              </p>
              <div className="mx-auto text-center">
                  <div className="mt-2 d-flex justify-content-around ">
                    <Button onClick={handleClose} variant="outlined">
                      Non
                    </Button>
                    <Button onClick={()=>navigate('/sign_in',{replace:true})} variant="contained" >
                      Oui
                    </Button>
                  </div>
                </div>
            </Modal.Body>
        </Modal>

    </div>
  );
}

export default SignUp;