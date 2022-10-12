import React from 'react'
import ProfilCard from '../../components/ProfilCard/ProfilCard';
import CardInfoUserActivite from '../../components/cardInfoUserActivite/CardInfoUserActivite';
import './compte.css'
import { Panel, Modal } from 'rsuite';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import EditIcon from '@mui/icons-material/Edit';
import PaymentsIcon from '@mui/icons-material/Payments';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import avatar1 from "../../assets/images/avatars/avatar1.jpg"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { useEffect } from 'react';
import dateFormat from "dateformat";
import { fabClasses } from '@mui/material';


//   adresse: "null"
// ​​
// email: "dev@gmail.com"
// ​​
// email1: ""
// ​​
// id: 3
// ​​
// last_login: "2022-10-01T12:12:37.546027Z"
// ​​
// last_name: "VAKARAMOKO"
// ​​
// numero: "0512052254"
// ​​
// numero1: ""
// ​​
// organisations: "null"
// ​​
// user_name: "KONE"


const Compte = () => {
  const navigate = useNavigate()

  const [userInfo,setUserInfo] = useState([])
  const [nbDonNature,setNbDonNature] = useState(0)
  const [nbDonArgent,setNbDonArgent] = useState(0)
  
  const [messageErrorPassword,setMessageErrorPassword] = useState(false)
  const [showPassword,setShowPassword] = useState(false)
  const [showPassword1, setShowPassword1] = useState(false);

  const [password,setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [nom,setNom] = useState('')
  const [prenom,setPrenom] = useState('')
  const [email,setEmail] = useState('')
  const [numero,setNumero] = useState('')

  const [nomEntreprise,setNomEntreprise] = useState('')
  const [emailEntreprise,setEmailEntreprise] = useState('')
  const [adresseEntreprise,setAdresseEntreprise] = useState('')
  const [numeroEntreprise,setNumeroEntreprise] = useState('')

  const [openModal1, setOpenModal1] = React.useState(false);
  const [openModalPassword, setOpenModalPassword] = React.useState(false);
  const [openModalEntreprise, setOpenModalEntreprise] = React.useState(false);

  const onChangePassword = (e) =>{
    setMessageErrorPassword(false)
    setPassword(e.target.value)

  };

  const onChangePasswordConf = (e) =>{
    setMessageErrorPassword(false)
    setPasswordConfirm(e.target.value)

  };

  const handleOpenModalEntreprise = () => setOpenModalEntreprise(true);
  const handleCloseModalEntreprise = () => setOpenModalEntreprise(false);

  const handleOpenModalPassword = () => setOpenModalPassword(true);
  const handleCloseModalPassword = () => setOpenModalPassword(false);

  const handleOpenModal1 = () => setOpenModal1(true);
  const handleCloseModal1 = () => setOpenModal1(false);

  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onChangePassWord = (e)=>{
    setPassword(e.target.value)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const onSubmitFormInfoUser = async(e)=>{
    e.preventDefault()
    console.log("userinfo:  ",userInfo)

    let userData = {
      "user_name":nom,
      "last_name":prenom,
      "email":email,
      "numero":numero,
    }
   
    await axiosInstance.put(`cdonateurorg/${userInfo.id}/ `,userData)
    .then(res=>{
      console.log(res)
    })
    .catch(error=>{
      console.log(error)
    })

  }

  const onSubmitFormEntreprise = async(e)=>{
    e.preventDefault()
    
    const userEntreprise = {
      nomEntreprise,
      emailEntreprise,
      adresseEntreprise,
      numeroEntreprise
    }
    await axiosInstance.put('/',userEntreprise)
    .then(res=>{
      console.log(res)
    })
    .catch(error=>{
      console.log(error)
    })

  }
  
  const onSubmitFormPassword = async(e)=>{
    e.preventDefault()
    

    if(password === passwordConfirm){
      await axiosInstance.put(`cdonateurorg/${userInfo.id}/ `,password)
      .then(res=>{
        console.log(res)
      })
      .catch(error=>{
        console.log(error)
      })
    }
    else{
      setMessageErrorPassword(true)
    }
   

  }
  
  useEffect(()=>{
    let isMounted = true
    const controller = new AbortController()
    const getUserInfo = async()=>{
      try {
        let response = await axiosInstance.get("detailconnecte/",{signal:controller.signal})
        if(isMounted){ 
          let data = response.data.data[0]
          console.log(response.data.data[0])
          setUserInfo(data)
          setNom(data.user_name)
          setPrenom(data.last_name)
          setEmail(data.email)
          setNumero(data.numero)

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
  
  useEffect(()=>{
    let isMounted = true
    const controller = new AbortController()
    const getUserDonationNature = async()=>{
      try {
        let response = await axiosInstance.get("natures/",{signal:controller.signal})
          isMounted && setNbDonNature(response.data.data.length)
        
      } catch (error) {
        console.error(error)
      }
    }
    getUserDonationNature()

    return ()=>{
      isMounted = false
      controller.abort()
    }
  },[])

  useEffect(()=>{
    let isMounted = true
    const controller = new AbortController()
    const getUserDonationArgent = async()=>{
      try {
        let response = await axiosInstance.get("argent/",{signal:controller.signal})
          isMounted && setNbDonArgent(response.data.data.length)
        
      } catch (error) {
        console.error(error)
      }
    }
    getUserDonationArgent()

    return ()=>{
      isMounted = false
      controller.abort()
    }
  },[])

//   adresse: "null"
// ​​
// email: "dev@gmail.com"
// ​​
// email1: ""
// ​​
// id: 3
// ​​
// last_login: "2022-10-01T12:12:37.546027Z"
// ​​
// last_name: "VAKARAMOKO"
// ​​
// numero: "0512052254"
// ​​
// numero1: ""
// ​​
// organisations: "null"
// ​​
// user_name: "KONE"

  return (
    <>
    <section className="section-profil-user">
      <div className="container">
        <Panel shaded className="bg-white" >
          <div className="row justify-content-between align-items-center">
            <div className="col-md-6 text-start">
              <h4 className='fw-bolder' >Sommes en Dons : <span>0 Fcfa </span> </h4>
            </div>
            <div className="col-md-6">
              <div className="row text-center justify-content-between align-items-center">
                  <div className="col-sm-6 my-md-0 my-2">
                    <Button
                      onClick={()=>navigate("/my_actions",{replace:true})}
                      variant="outlined" 
                      endIcon={
                        <Badge badgeContent={nbDonNature} color="secondary">
                          <EmojiObjectsIcon />
                        </Badge>
                      }>
                      Nombre dons Objets 
                    </Button>

                  </div>
                  <div className="col-sm-6 my-md-0 my-2">
                    <Button 
                     onClick={()=>navigate("/my_actions",{replace:true})}
                      variant="outlined" 
                      endIcon={
                        <Badge badgeContent={nbDonArgent} color="secondary">
                          <PaymentsIcon />
                        </Badge>
                      }>
                      Nombre dons Argents
                    </Button>
                  </div>
              </div>
            </div>
          </div>
          <div className="row pt-5 profil-image-content justify-content-center align-items-center">
            <div className="col-md-4 col-11 text-center">
               <img className="img-fluid "  alt="user-avatar" src={avatar1} /><br />
               <Button 
                  endIcon={  <CameraAltIcon /> }
                  className="mt-3 py-2"
                    variant="contained" 
                    >
                     Modifier votre avatar
                </Button>
            </div>
            <div className="col-md-8 profil-user-info col-11">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-6 my-md-0 my-2">
                      <h5>Nom</h5>
                      <p>
                        {userInfo.user_name}
                      </p>
                    </div><div className="col-md-6 my-md-0 my-2">
                      <h5>Prenom</h5>
                      <p>
                      {userInfo.last_name}

                      </p>
                    </div>
                  </div>
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-6 my-md-0 my-2">
                      <h5>Email</h5>
                      <p>
                      {userInfo.email}
                      </p>
                    </div><div className="col-md-6 my-md-0 my-2">
                      <h5>Numéro de téléphone</h5>
                      <p>
                      {userInfo.numero}
                      </p>
                    </div>
                  </div>
                  <div className="row justify-content-end align-items-center">
                     <div className="col-md-4 mt-md-0 mt-3 text-end">
                        <Button 
                        onClick={handleOpenModal1}
                          endIcon={  <EditIcon /> }
                          className="mt-3 py-2"
                            variant="contained" 
                            >
                            Modifier
                        </Button>
                     </div>
                  </div>
            </div>
          </div>
        </Panel>
        { userInfo.organisations !=="null" && <Panel shaded className="profil-info-entreprise bg-white"  >
          <h2>
            Informations Entreprise
          </h2>
                  <div className="row mt-2 justify-content-between align-items-center">
                    <div className="col-md-6 my-md-0 my-2">
                      <h5>Raison sociale</h5>
                      <p>
                        Kone
                      </p>
                    </div><div className="col-md-6 my-md-0 my-2">
                      <h5>Adresse Electronique</h5>
                      <p>
                      Vickyth@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-6 my-md-0 my-2">
                      <h5>Adresse </h5>
                      <p>
                        treichville
                      </p>
                    </div><div className="col-md-6 my-md-0 my-2">
                      <h5>Numéro de téléphone</h5>
                      <p>
                        05251522555
                      </p>
                    </div>
                  </div>
                  <div className="row justify-content-end align-items-center">
                     <div className="col-md-4 mt-md-0 mt-3 text-end">
                        <Button 
                        onClick={handleOpenModalEntreprise}
                          endIcon={  <EditIcon /> }
                          className="mt-3 py-2"
                            variant="contained" 
                            >
                            Modifier
                        </Button>
                     </div>
                  </div>
        </Panel>}
        <Panel shaded className="my-2 bg-white" >
          <div className="row justify-content-between align-items-center ">
            <div className="col-sm-4">
              <h5>Mot de passe </h5>
            </div>
            <div className="col-sm-8">
              <div className="row justify-content-between align-items-center">
                <div className="col-sm-8">
                <TextField 
                id="standard-basic" 
                label="" 
                disabled
                type="password"
                fullWidth
                value="password user"
                variant="standard" />

                  {/* <FormControl disabled fullWidth variant="filled">
                    <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={onChangePassWord}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Mot de passe"
                    />
                  </FormControl> */}
                </div>
                <div className="col-sm-4 text-end">
                  <Button 
                    onClick={()=>handleOpenModalPassword()}
                    endIcon={  <EditIcon /> }
                    className="mt-3 py-2"
                    variant="contained" 
                    >
                    Modifier
                  </Button>
                </div>
              </div>
                
            </div>
          </div>
        </Panel>
        <Panel shaded className="profil-info-activite mt-2 bg-white" >
          <h2>
            Informations sur vos activités 
          </h2>
          <div className="row pt-2">
            <div className="col-sm-6">
                <h6>
                  Dernière connexion
                </h6>
            </div>
            <div className="col-sm-6">
              <p> {`${new Date(userInfo.last_login).toLocaleDateString('fr')} à ${userInfo?.last_login && dateFormat(new Date(userInfo?.last_login),'HH:MM')}`} </p>
            </div>
          </div>
          <div className="row pt-2">
            <div className="col-sm-6">
                <h6>
                  Date de création du compte
                </h6>
            </div>
            <div className="col-sm-6">
              <p> 10/10/2023 </p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
                <h6>
                  Date dernière modification
                </h6>
            </div>
            <div className="col-sm-6">
              <p> 10/10/2023 </p>
            </div>
          </div>
        </Panel>
      </div>
    </section>


    <Modal open={openModal1} onClose={handleCloseModal1}>
    <Modal.Header>
      <Modal.Title>Modification informations</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form>
      <TextField
          label="Nom"
          id="nom"
          fullWidth
          className="my-3"
          value={nom}
          onChange={(e)=>setNom(e.target.value)}
          size="normal"
          variant="standard"
        />
        <TextField
            label="Prénom"
            id="nom"
            fullWidth
            className="my-3"
            value={prenom}
            onChange={(e)=>setPrenom(e.target.value)}
            size="normal"
            variant="standard"
          />
          <TextField
              label="Adresse électronique"
              id="nom"
              fullWidth
              type="email"
              className="my-3"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              size="normal"
              variant="standard"
            />
            <TextField
                label="Numéro téléphonique"
                id="nom"
                fullWidth
                className="my-3"
                value={numero}
                onChange={(e)=>setNumero(e.target.value)}
                size="normal"
                variant="standard"
              />

      </form>
    </Modal.Body>
    <Modal.Footer>
      <Button className="mx-3" onClick={onSubmitFormInfoUser} variant="contained" >
        Enregistrer
      </Button>
      <Button onClick={handleCloseModal1} variant="outlined" >
        Annuler
      </Button>
    </Modal.Footer>
    </Modal>
    
    <Modal open={openModalEntreprise} onClose={handleCloseModalEntreprise}>
    <Modal.Header>
      <Modal.Title>Modification informations Entréprise</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form>
      <TextField
          label="Raiseon sociale"
          id="nomEntreprise"
          fullWidth
          className="my-3"
          value={nomEntreprise}
          onChange={(e)=>setNomEntreprise(e.target.value)}
          size="normal"
          variant="standard"
        />
        <TextField
            label="Adresse electronique"
            id="emailEntreprise"
            fullWidth
            className="my-3"
            type="email"
            value={emailEntreprise}
            onChange={(e)=>setEmailEntreprise(e.target.value)}
            size="normal"
            variant="standard"
          />
          <TextField
              label="Adresse de l'entreprise"
              id="adresseEntreprise"
              fullWidth
              className="my-3"
              value={adresseEntreprise}
              onChange={(e)=>setAdresseEntreprise(e.target.value)}
              size="normal"
              variant="standard"
            />
            <TextField
                label="Numéro téléphonique"
                id="numeroEntreprise"
                fullWidth
                className="my-3"
                value={numeroEntreprise}
                onChange={(e)=>setNumeroEntreprise(e.target.value)}
                size="normal"
                variant="standard"
              />

      </form>
    </Modal.Body>
    <Modal.Footer>
      <Button className="mx-3" onClick={onSubmitFormEntreprise} variant="contained" >
        Enregistrer
      </Button>
      <Button onClick={handleCloseModalEntreprise} variant="outlined" >
        Annuler
      </Button>
    </Modal.Footer>
    </Modal>
    
    <Modal open={openModalPassword} onClose={handleCloseModalPassword}>
    <Modal.Header>
      <Modal.Title>Modification informations</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form>
        {
          messageErrorPassword && (
            <p className="text-danger text-center py-2">
              Les deux mots de passe ne correspondent pas.
            </p>
          )
        }
      
         <FormControl className="my-2"fullWidth variant="standard">
              <InputLabel htmlFor="password">Entrer un mot de passe</InputLabel>
                <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={onChangePassword}
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
                  
                        <FormControl className="my-2" fullWidth variant="standard">
                        <InputLabel htmlFor="confirm-password">Confirmer le mot de passe</InputLabel>
                        <Input
                          id="confirm-password"
                          type={showPassword1 ? 'text' : 'password'} 
                          value={passwordConfirm}
                          onChange={onChangePasswordConf}
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
                  
      </form>
    </Modal.Body>
    <Modal.Footer>
      <Button className="mx-3" onClick={onSubmitFormPassword} variant="contained" >
        Enregistrer
      </Button>
      <Button onClick={handleCloseModalPassword} variant="outlined" >
        Annuler
      </Button>
    </Modal.Footer>
    </Modal>
   </>
  )
}

export default Compte
