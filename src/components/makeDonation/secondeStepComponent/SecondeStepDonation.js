import { MDBRadio,MDBInput } from 'mdb-react-ui-kit';
import React, { useState,useEffect } from 'react';
import { SelectPicker } from 'rsuite';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Panel } from 'rsuite'
import './SecondeStepDonation.css'
import { listVulenerabilite } from '../../../services/vulnerabilites';
import { Link } from 'react-router-dom';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import axiosInstance, { API_VULNERABLE } from '../../../api/axiosInstance';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';

const userItem = "userDonnateurIformationsLanfiatech"

const vulnerabilitesCategories =[
    "Précarité et vulnérabilité",
    "Recherche Médicale",
    "Enfance et adolescence",
    "Urgences",
    ]

    // const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
    //     item => ({ label: item, value: item })
    //   );
      
export default function SecondeStepDonation(props){

    const [isLogged,setIsLogged] = useState(localStorage.getItem(userItem))

    const [listTypeVulnerabilite, setListTypeVulnerabilite] = React.useState([]);
    const [listPersonneVulnerable, setListPersonneVulnerable] = React.useState([]);

    
    const [whoRadio,setWhoRadio] = useState(0)
    const [whoGiveRadio,setWhoGiveRadio] = useState('personne physique')
    // const [raisonSocial,setRaisonSocial] = useState(whoGiveRadio === 'moi-meme' ? '' : props.raisonSocial)
    // const [cibleDons,setCibleDons] = useState(whoRadio === 'non' ? 'aucun' : props.cibleDons)
    
    const [items, setItems] = React.useState([]);
    const updateData = () => {
      if (items.length === 0) {
        setItems(listPersonneVulnerable);
      }
    };

    const renderMenu = menu => {
        if (items.length === 0) {
          return (
            <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
              <SpinnerIcon spin /> Chargement...
            </p>
          );
        }
        return menu;
      };
    
    function onChangeWhoRadio(e){
        setWhoRadio(parseInt(e.target.value))
    }

    function onChangeWhoGiveRadio(e){
        setWhoGiveRadio(e.target.value)
    }

    const onChangeTypeV = (e)=>{
        props.seTypeVulnerabilite(e.target.value)
    }

    const onChangeVulnerabilite = (e)=>{

        props.seTypeVulnerabilite('')
        const vulnerabilite = e.target.value;
        props.setCategorieV(vulnerabilite)
       
    }

    useEffect(()=>{
        const listTypevulenerabilite = listVulenerabilite.filter((item)=>{
            return item.name === props.categorieV
        })
        setListTypeVulnerabilite(listTypevulenerabilite[0]?.list)
    },[props.categorieV])

    
    useEffect(()=>{
        setIsLogged(localStorage.getItem(userItem))
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[localStorage.getItem(userItem)])
     

    
    useEffect(()=>{
        let isMounted = true
        const controller = new AbortController()
        const getListPersonnesV = async()=>{
            try {
                
                let response = await axios.get(`${API_VULNERABLE}vulnerables/`,{
                    signal:controller.signal
                })
                if(isMounted){
                    let responseData = response?.data.data
                    let data = responseData.map(item => ({ label: `${item.first_name} ${item.user_name}`, value: item.id }))

                    // console.log('list vu: ',data)
                    setListPersonneVulnerable(data)
                }
             
            } catch (error) {
                // console.error(error)
            }
        }

        getListPersonnesV()
        
        return()=>{
            isMounted = false
            controller.abort()
        }
      },[])
     

    

    return(
        <>
        <div className="seconde-step-container"  >
           { !isLogged && <section className="pb-3">
                <div className="row">
                    <div className="col-12 ">
                        <div className="info-donateur-logged p-1">
                            <h5 className='ms-3'>
                                dons Anomymes
                            </h5>
                            <p className='ps-md-3'>
                                Vos informations ne seront pas associées aux dons effectués.
                            </p>
                            <p className='mt-n3 ps-md-3 ' >
                                 
                                <Link className="text-decoration-underline me-2" to="/sign_in">Connectez-vous pour y rémedier</Link>
                                ou
                                <Link className="text-decoration-underline ms-2" to="/sign_up">Créez votre compte donateur</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>}
            <form >
            { !isLogged &&    
            <Panel  shaded className="seconde-step-who-container bg-white" >
                <h6 className="h6" >
                    Choisissez le type de personne
                </h6>
                <div className="row align-items-center ps-md-4 pt-3">

                    <MDBRadio onChange={(e)=>onChangeWhoGiveRadio(e)} checked={whoGiveRadio=== "personne physique"}  name='inlineRadio' id='inlineRadio1' value='personne physique' label='Personne physique' inline />

                    <MDBRadio  onChange={(e)=>onChangeWhoGiveRadio(e)} checked={whoGiveRadio=== "personne morale"}  name='inlineRadio' id='inlineRadio2' value='personne morale' label='Personne morale' inline />

                </div>

                <div className={`organisation-input-container mt-4 ${whoGiveRadio === "personne physique" && 'd-none'} ` }>
                    <MDBInput size="lg" value={props.raisonSocial} onChange={(e)=>props.setRaisonSocial(e.target.value)} label="Entrez sa raison sociale" id='organisation' type='text' />
                </div>
            </Panel>}

            <Panel shaded className="seconde-step-who-container mt-4 bg-white" >
                <h6 className="h6" >
                    Specifiez à qui sera transmis votre don 
                </h6>
                <div className="row align-items-center ps-md-4 pt-3">

                    <MDBRadio name='receveurDon' id='receveurDon1' onChange={(e)=>onChangeWhoRadio(e)} checked={whoRadio===0} value={0} label='Non' inline />

                    <MDBRadio name='receveurDon'  onChange={(e)=>onChangeWhoRadio(e)} checked={whoRadio===1} id='receveurDon2' value={1} label='Ciblé une cause' inline />

                    <MDBRadio name='receveurDon'  onChange={(e)=>onChangeWhoRadio(e)} checked={whoRadio===2} id='receveurDon3' value={2} label='Ciblé une personne' inline />
                </div>

                <div className={`organisation-input-container mt-4 ${whoRadio !== 1 && 'd-none'} ` }  >

                <div className="row">
                    <div className="col-md-6">
                        <FormControl required={whoRadio===1?true:false}  sx={{ m: 1, width: "100%", mt: 3 }}>
                            <InputLabel 
                            id="demo-simple-select-autowidth-label" className='fw-bolder' >choisissez une catégorie</InputLabel>
                            <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={props.categorieV}
                            onChange={onChangeVulnerabilite}
                            autoWidth
                            label="choisissez une catégorie"
                            >
                           
                            {
                                vulnerabilitesCategories?.map((item,index)=>{
                                    return  <MenuItem key={index} value={item}>{item}</MenuItem>
                                })
                            }
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-md-6">
                        <FormControl disabled={!!!props.categorieV} required={whoRadio===1?true:false} sx={{ m: 1, width: "100%", mt: 3 }}>
                            <InputLabel 
                            className='fw-bolder'
                            id="demo-simple-select-autowidth-label2">Choisissez le type de vulnerabilité</InputLabel>
                            <Select
                            labelId="demo-simple-select-autowidth-label2"
                            id="demo-simple-select-autowidth"
                            value={props.typeVulnerabilite}
                            onChange={onChangeTypeV}
                            autoWidth
                            label="Choisissez le type de vulnerabilité"
                            >
                            {
                                listTypeVulnerabilite?.map((item,index)=>{
                                    return  <MenuItem key={index} value={item}>{item}</MenuItem>
                                })
                            }
                           
                            </Select>
                            
                        </FormControl>

                    </div>
                </div>


                </div>
                
                <div className={`row  mt-3 ${whoRadio !== 2 && 'd-none'} ` } >
                <FormControl
                    
                    required={whoRadio===2?true:false} 
                    fullWidth>
                    <InputLabel id="demo-simple-select-personne-label">Selectionner une personne</InputLabel>
                    <Select
                    labelId="demo-simple-select-personne-label"
                    id="demo-simple-select-personne"
                    value={props.cibleDons}
                    label="Selectionner une personne"
                    onChange={(e)=> props.setCibleDons(e.target.value)}
                    >
                         {
                            listPersonneVulnerable?.map((item,index)=>{
                                    return  <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                })
                            }
                  
                    </Select>
                </FormControl>
                {/* <SelectPicker
                    data={items}
                    required={whoRadio===2?true:false} 
                    size="lg"
                    value={props.cibleDons}
                    onChange={props.setCibleDons}
                    block
                    placeholder="Selectionner une personne"
                    onOpen={updateData}
                    onSearch={updateData}
                    renderMenu={renderMenu}
                    /> */}
                </div>
            </Panel>

            <Panel shaded className="seconde-step-who-container bg-white mt-4" >
                <h6 className="h6" >
                    Veuillez specifier la provenance du don 
                </h6>
             
                <div className="organisation-input-container mt-4">
                    <MDBInput 
                        required 
                        placeholder="Salaire"
                        size="lg" 
                        value={props.provenanceDon} 
                        onChange={(e)=>props.setProvenanceDon(e.target.value)} 
                        label="Provénance don" 
                        type='text' />
                </div>
            </Panel>

            <Panel shaded className="seconde-step-who-container bg-white mt-4" >
                <h6 className="h6" >
                    Veuillez préciser le montant de votre don 
                </h6>
                { props.montantError    &&
                <p className='text-danger' style={{fontSize:'12px'}} >
                    Le montant de votre don doit être un multiple de 5
                </p>}
             
                <div className="organisation-input-container mt-4">
                    <MDBInput 
                        value={props.montantDon} 
                        onChange={(e)=>props.onChangeMontantDon(e.target.value)}
                        required
                        size="lg"
                        label="Montant" 
                        type='number' />
                </div>

               
                
            </Panel>


    

            </form>



        </div>
        </>
    )
}