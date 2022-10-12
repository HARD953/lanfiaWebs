import React,{ useState} from 'react';
import {
  MDBInput,
  MDBCol,
  MDBRow
} from 'mdb-react-ui-kit';
import {  Message,Button, Panel } from 'rsuite';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ReactPhoneInput from 'react-phone-input-mui';
import TextField from '@mui/material/TextField';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import userService from '../../services/userServices';
import signInImage from '../../assets/images/login/user.gif';

import './SignIn.css';



function SignIn() {
  const userItem = "userDonnateurIformationsLanfiatech"

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isloading, setIsloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const location = useLocation()
  const navigate = useNavigate()
  const from = location?.state?.from?.pathname || '/'
  


  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

 

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };


  const onChangeEmail =(value)=>{
    setErrorMessage("")
    setEmail(value)
  }

  const onChangePassword =(value)=>{
    setErrorMessage("")
    setPassword(value)
  }

  const submitFunction = async e => {
    
    e.preventDefault();
    setIsloading(true)
    setErrorMessage('')

    const dataUser = { email:email, password:password }

    userService.loginUser(dataUser)
    .then((data)=>{

      localStorage.setItem(userItem,data?.data?.access);
      navigate(from,{replace: true})
      window.location.reload(false);

      setIsloading(false)

    })
    .catch((error)=>{
      setErrorMessage("Mot de passe ou Email incorrect.")
      setIsloading(false)
    })
    
  }


  // if(localStorage.getItem(userItem)){
  //   return <Navigate to="/" replace />;
  // }

  return (
    <div className="sign-in-container ">
      <section className="sign-in-section pt-5">
        <div className="container">
          <div  className="sign-in-form-container mx-auto p-md-0">
            <div className="row justify-content-center align-items-center p-0 m-0">
              {/* <div className="col-lg-7 col-md-7 col-sm-10 col-11 d-none d-lg-block sign-in-img-content p-0 m-0">
                  <img className="img-fluid" src="https://cdn.dribbble.com/users/1018473/screenshots/5344535/login.png" alt="sign-in"/>
              </div> */}
              <div className="col-lg-5 col-md-10 col-sm-11 col-12 mx-auto">
                <div className="form-content px-lg-5 px-3 py-5">
                      <div className="row justify-content-center align-items-center text-center">
                        <h3 >Connexion</h3>
                        <img  alt='avatar' className="img-fluid" src="https://img.myloview.fr/papiers-peints/beautiful-latin-woman-avatar-character-icon-400-225026984.jpg" />
                      </div>
                      { errorMessage && 
                        (<div className={`mx-auto mb-4 fw-bolder text-center bg-danger text-white p-1 rounded-1`}  >
                            <p className="text-white" >
                            {errorMessage}
                            </p>
                          </div>)
                        }
                    <form onSubmit={submitFunction} >
                    
                      <div className="row pb-3 ">
                        <div className="col-md-12 pb-3">
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
                        <div className="col-md-12 py-3">
                            <FormControl fullWidth variant="standard">
                            <InputLabel htmlFor="confirm-password">Entrer mot de passe</InputLabel>
                            <Input
                              id="confirm-password"
                              type={showPassword1 ? 'text' : 'password'} 
                              value={password}
                              onChange={e => onChangePassword(e.target.value)}
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

                      <MDBRow className='mb-4'>
                        <MDBCol>
                          <a href='#!'>Mot de passe oublié ?</a>
                        </MDBCol>
                      </MDBRow>

                      <Button loading={isloading} className="sign-in-btn text-white" type='submit' block>
                        Connexion
                      </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* <div className="container mt-5">
        
          <div className="sign-in-container-content-side">
            <Panel shaded className="sign-in-form-container bg-white"
      >   
          <h2 className="sign-in-title text-center">Connexion</h2>
          <div className="sign-in-img-container text-center">
            <img src={signInImage} alt="logo login" className="sign-in-img" />
          </div>
         
         { errorMessage && 
          (<Message className={`mx-auto mb-4 fw-bolder text-center`} type="error" >
              <p>
               {errorMessage}
              </p>
            </Message>)
          }

            <form onSubmit={submitFunction} >
                <MDBInput 
                required
                className='mb-4 sign-in-input' 
                type='email' 
                label='Entrer votre adresse electronique' 
                onChange={e => setEmail(e.target.value)}
                
                />
                <MDBInput
                required
                 className='mb-4 sign-in-input' 
                 type='password' 
                 label='Entrer votre mot de passe' 
                 onChange={e => setPassword(e.target.value)}
                 />

                <MDBRow className='mb-4'>
                  <MDBCol>
                    <a href='#!'>Mot de passe oublié ?</a>
                  </MDBCol>
                </MDBRow>

                <Button loading={isloading} className="sign-in-btn text-white" type='submit' block>
                  Connexion
                </Button>
            </form>

        
            </Panel>
          </div>
      </div>
       */}
   
    </div>
  );
}

export default SignIn;