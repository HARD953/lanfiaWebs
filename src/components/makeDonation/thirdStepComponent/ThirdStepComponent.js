import { MDBRadio,MDBInputGroup,MDBCheckbox } from 'mdb-react-ui-kit';
import { useState } from 'react';

import { Panel,Message,Button } from 'rsuite'
import './ThirdStepComponent.css'

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';




export default function ThirdStepComponent({isLoadingDonation,montantDon,setMontantDon,onSubmitMakeDonation,onChangeMontantDon,montantError}){

    const [donMensuel,setDonMensuel] = useState(false)
    

    function onChangeDonMensuelRadio(){
        setDonMensuel(!donMensuel)
    }
    return(
        <>
        <div className="third-step-container "  >
            <form >
            <Panel shaded className="third-step-who-container mx-auto bg-white " >
                <div className="text-dark text-center">
                    <h6 className="h6" >
                       Entrez la somme de votre don
                    </h6>
                    {/* <h3 className="h3 " >
                        Lanfiatech afin de venir en aide aux personne vulnerables
                    </h3> */}
                </div>
                <div className="py-4">
                    <MDBCheckbox name='flexCheck' checked={donMensuel === true} value={donMensuel} onChange={()=>onChangeDonMensuelRadio()} id='flexCheckDefault12' label='Faire un dom mensuel ' />
                </div>
                   

                <div className="pt-1 pb-5 d-flex justify-content-around" >

                <div className="d-flex justify-content-between  " >
                    <MDBRadio 
                        btn 
                        labelStyle={{
                            backgroundColor:"#0b0d6e",
                        }}
                        btnColor='info' 
                        id='btn-radio' 
                        name='options' 
                        wrapperTag='span'                  
                        label='500 FCFA'
                        checked={montantDon==='500'}
                        value='500'
                        onChange={(e)=>{onChangeMontantDon(e.target.value)}}
                        />
                    <MDBRadio
                        labelStyle={{
                            backgroundColor:"#0b0d6e",
                        }}
                        btn
                        btnColor='info'
                        id='btn-radio2'
                        name='options'
                        wrapperClass='mx-2'
                        wrapperTag='span'
                        label='1000 FCFA'
                        checked={montantDon==='1000'}
                        value='1000'
                        onChange={(e)=>{onChangeMontantDon(e.target.value)}}
                        
                        
                    /> 
                    <MDBRadio
                        labelStyle={{
                            backgroundColor:"#0b0d6e",

                        }}
                    btn
                    btnColor='info'
                    id='btn-radio4'
                    name='options'
                    wrapperClass='mx-2'
                    wrapperTag='span'                        
                    label='2000 FCFA'
                    checked={montantDon==='2000'}
                    value='2000'
                    onChange={(e)=>{onChangeMontantDon(e.target.value)}}
                />


                </div>
                </div>
            { montantError    &&
                <p className='text-danger text-center' >
                    Votre contribution doit être un multiple de 5
                </p>}

                <div className="mx-md-5">
                  <FormControl fullWidth sx={{ m: 2 }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">Votre contribution:</InputLabel>
                    <Input
                        className='montant-don-input'
                        id="standard-adornment-amount"
                        value={montantDon}
                        onChange={ (e)=>onChangeMontantDon((e.target.value).toString())}
                        endAdornment={<InputAdornment position="start">F CFA</InputAdornment>}
                    />
                    </FormControl>
                </div>
                <div className={`mt-4 ${donMensuel !== true && "d-none" } `} >
                    <Message showIcon className="third-message" >
                        <p className="third-message-p" >
                            En Cochant cette case, vous acceptez de faire parler votre générosité chaque mois.
                        </p>
                    </Message>
                </div>

                <div className="mt-5 mb-3" >
                    <Button
                    disabled={!montantDon}
                    loading={isLoadingDonation}
                    block
                    size="lg"
                    appearance="primary" 
                    className="mt-2 py-3"
                    style={{backgroundColor:"#0b0d6e"}}
                    onClick={onSubmitMakeDonation}
                    >Procéder à la facturation</Button>
                </div>

                
            </Panel>


    

            </form>



        </div>
        </>
    )
}