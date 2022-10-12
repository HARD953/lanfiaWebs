import React, { useState,useEffect,useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { TabView, TabPanel } from 'primereact/tabview';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import 'primereact/resources/primereact.css';
import '../../index.css';
import './MyActions.css';
// import donationService from '../../services/donationServices';
import CardDonsViews from '../../components/cardMesDons/CardDonsViews';
import { ProgressSpinner } from 'primereact/progressspinner';
import imgObjet from "../../assets/images/donation/shoe.jpg"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Button from '@mui/material/Button';
import { Modal, Panel,Loader, useToaster,Message } from 'rsuite';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import axiosInstance, { BASE_URL } from '../../api/axiosInstance';
import SaveIcon from '@mui/icons-material/Save';

import RemindIcon from '@rsuite/icons/legacy/Remind';
import { useLocation, useNavigate } from 'react-router-dom';

const steps = [
  {label:'Attribué',date: "00/00/000" ,heure:"00h00"},
  {label:'Distribué',date: "00/00/000" ,heure:"00h00"},
];





const CardDonObjets = (props)=>{
  return(
  <Panel shaded className="col-lg-4 col-md-4 col-sm-5 m-3">
  <div className="row justify-content-center align-items-center "> 
  <div className="don-objet-card-img">
      <img className="img-fluid" alt="card-img" src={`${BASE_URL}${props.photo}`} />
    </div>
    <div className="don-obejt-card-description">
      <h2>{props.titre} </h2>
      <p className="don-obejt-card-description-text" >
        {
          props.description!=="null" ? props.description : "Aucune description du don."
        }
        
      </p>
      <div className="row align-items-center">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-6 my-2">
              <p className="fw-bolder etat-don-objet-p ">
                { !!!props.affecter?
                <span style={{color:'#bf9003'}} > Non affecté</span>:
                <span style={{color:'#097e1d'}} > Affecté</span>
                }
              </p>
          </div>
          <div className="col-md-6 my-2">
              <p className="fw-bolder text-dark text-end ">
              {
                new Date(props.create).toLocaleDateString('fr')
              }
            </p>
          </div>
        </div>
        <Button onClick={()=>props.handleOpenModalDonObjet(props.id)} variant="outlined" startIcon={<RemoveRedEyeIcon />}>
          Voir plus
        </Button>
       
      </div>
    </div>
  </div>
</Panel>
)}


const villes = [
  {
    value: 'ville1',
    label: 'ville1',
  },
  {
    value: 'ville2',
    label: 'ville2',
  },
 
];

const etatsDon = [
  {
    value: 'bon',
    label: 'bon',
  },
  {
    value: 'moyen',
    label: 'moyen',
  },
 
];

const categories = [
  {
    value: 'valeur1',
    label: 'valeur1',
  },
  {
    value: 'valeur2',
    label: 'valeur2',
  },
 
];



function MyActions() {
  
  const inputRef =  useRef(null)
  const location = useLocation()
  // const toaster = useToaster();
  const navigate = useNavigate()
  // let from = location.state?.from?.pathname || " ";
  const [listDonsNature, setListDonsNature] = useState([]);
  const [listDonsArgent,setListDonsArgent] = useState([])

  const [infosDonNatureClick,setInfosDonNatureClick] = useState([])

  const [categorieObjet, setCategorieObjet] = useState('');
  const [titreDon, setTitreDon] = useState('');
  const [typeDon, setTypeDon] = useState('');
  const [etatDon, setEtatDon] = useState('');
  const [categorieV, setCategorieV] = useState('');
  const [villeDon, setVilleDon] = useState('');
  const [cibleV, setCibleV] = useState("");
  const [imageDon, setImageDon] = useState("");
  const [errormsq, setErrormsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [loadingDon,setLoadingDon] = useState(true)
  const [searchEtat,setSearchEtat] = useState('tous')
  const [openModalDonObjet, setOpenModalDonObjet] = useState(false);
  const [openPhotoAlert, setOpenPhotoAlert] = useState(false);
  const [openModalSuppressionDon, setOpenModalSuppressionDon] = useState(false);
  const [openModalModifierDon, setOpenModalModifierDon] = useState(false);
  const [accordChangePhoto, setAccordChangePhoto] = useState(false);
  const [rows, setRows] = useState(0);

  const onClickButtonConfirmModif = ()=>{
    setAccordChangePhoto(true)
    setOpenPhotoAlert(false)
  }
  const handleClosePhotoAlert = () => {
    setAccordChangePhoto(false)
    setOpenPhotoAlert(false)
  }; 

  const handleOpenModalModifierDon = () => setOpenModalModifierDon(true);
  const handleCloseModalModifierDon = () => setOpenModalModifierDon(false);  

  const handleOpenModalSuppressionDon = () => setOpenModalSuppressionDon(true);
  const handleCloseModalSuppressionDon = () => setOpenModalSuppressionDon(false);  

  const handleOpenModalDonObjet = (id_don) =>{
      let donNature = listDonsNature.filter(don=>don.id===id_don)
      console.log(donNature)
      setInfosDonNatureClick(donNature[0])
      setOpenModalDonObjet(true)
    };
  const handleCloseModalDonObjet = () => setOpenModalDonObjet(false);  
  const handleEntered = () => {
    setTimeout(() => setRows(80), 2000);
  };

 
  const onClickPhotoButton = ()=>{
    inputRef.current.click()
  }

  // const MeessageDonNature = (
  //   <Message  showIcon type="info"  header="Success">
  //   Detailed description and advices about successful copywriting.
  // </Message>
  // )

	const onChangeImageDon = async (event) => {
    const photoObjet = event.target.files && event.target.files[0]
    if(!photoObjet){return }
    setOpenPhotoAlert(true)
    if(accordChangePhoto){
    const formData = new FormData()
    formData.append("photo",photoObjet,photoObjet.name)
    
    // await axiosInstance.post('efdoobjet/',formData)
    // .then(res=>{
		//     setImageDon(photoObjet);
    //     console.log("response : ",res)
    //     setLoading(false)
    //     event.target.value = null
    // })
    // .catch(err=>{
    //     console.log(err)
    //     setErrormsg("Erreur du serveur")
    //     setLoading(false)

    // })
  }
    else{return}
	};

    const onChangeCibleV = (event) => {
        setCibleV(event.target.value);
    };

    const onChangeVilleDon = (event) => {
        setVilleDon(event.target.value);
    };
    
    const onChangeCategorieV = (event) => {
        setCategorieV(event.target.value);
    };


    const onchangeEtatDon = (event) => {
        setEtatDon(event.target.value);
    };

    const onChangeTypeDon = (event) => {
        setTypeDon(event.target.value);
    };
    const onChangeCategorieObjet = (event) => {
        setCategorieObjet(event.target.value);
    };

    const onChangeTitreAnnonce = (event) => {
        setTitreDon(event.target.value);
    };
  
   

    const onSubmitForm = async (e)=>{
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();

        //check if all fields is empty
        if( categorieObjet.trim()!=="" || 
            titreDon.trim()!=="" || 
            typeDon.trim()!=="" || 
            etatDon.trim()!=="" || 
            categorieV.trim()!=="" || 
            villeDon.trim()!=="" ||
            cibleV.trim()!==""){
           

                formData.append("typeDons","Objet")
                formData.append("categorieObjet",categorieObjet)
                formData.append("titreDon",titreDon)
                formData.append("typeObjet",typeDon)
                formData.append("categorieV",categorieV)
                formData.append("cibleV",cibleV)
                formData.append("lieu_reception",villeDon)
                formData.append("Etat",etatDon)
                formData.append("photo",imageDon,imageDon.name)

                await axiosInstance.post('efdoobjet/',formData)
                .then(res=>{
                    // console.log("response : ",res)
                    setLoading(false)

                })
                .catch(err=>{
                    // console.log(err)
                    setErrormsg("Erreur du serveur")
                    setLoading(false)

                })
        }
        else{
            setErrormsg("Tous les champs doivent etre renseignés.")
            setLoading(false)

        }
    }

  useEffect(() => {
     let isMounted = true
     const abortController = new AbortController()
     const getUserDonationArgent = async()=>{
      try{
        const response = await axiosInstance.get("argent/",{signal:abortController.signal})
        if(isMounted){
          setListDonsArgent(response.data.data)
          // console.log(response.data.data)
          setLoadingDon(false)
        }
      }catch(err){
        // console.error(err)
        setLoadingDon(false)

      }
     }
     getUserDonationArgent()
   
    return()=>{
      isMounted =false
      abortController.abort()
      setLoadingDon(false)
    }

  },[])

  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()
    const getUserDonationArgent = async()=>{
     try{
       const response = await axiosInstance.get("natures/",{signal:abortController.signal})
       if(isMounted){
          // console.log("dons natures:", response)
         setListDonsNature(response.data.data)
        //  setLoadingDon(false)
       }
     }catch(err){
      //  console.error(err)
      //  setLoadingDon(false)

     }
    }
    getUserDonationArgent()
  
   return()=>{
     isMounted =false
     abortController.abort()
    //  setLoadingDon(false)
   }

 },[])

//  useEffect(() =>{
//   from === "/make_donation" && toaster.push(MeessageDonNature, "topCenter")
//   console.log("from",from)
//  },[])

//  toaster.push(MeessageDonNature, "topCenter")


  return (
    <>
    <div className="my-actions-container">

       <div className='container '>

      <h3 className="text-dark" >Mes Dons effectués</h3>

      <div className="card">
                
                <TabView className="tabview-header-icon">

                    <TabPanel header=" En Argents" leftIcon="pi pi-wallet ">
                       
                      <div className='d-flex justify-content-around flex-wrap ' >
                      { loadingDon ? (
                            <div>
                              <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>
                                  
                            </div>
                          )
                          :
                          <>
                          {listDonsArgent.length !==0?
                          (<>
                          { listDonsArgent.map((item,index) =>  <CardDonsViews  key={index} {...item} /> )}
                           </>)
                          :
                         ( <div className='pt-3 text-center'>
                          <p>
                            Aucun don en <span className='fw-bolder text-uppercase'>Argent</span> effectué pour le moment.
                          </p>
                          <Button onClick={()=>navigate('/make_donation/',{replace:true})} variant="outlined" >
                            effectuer un don 
                          </Button>
                          </div>)
                          }
                          </>
                          }

                       
                      </div>
            
                                            
                    </TabPanel>

                    <TabPanel header=" En Nature" leftIcon="pi pi-th-large">
                       {listDonsNature.length !==0?
                          (<>
                        <div className="row">
                          <div className="col-4">
                          <FormControl fullWidth>
                            <InputLabel id="don-objet-search-etat">Selectionnez un état</InputLabel>
                            <Select
                              labelId="don-objet-search-etat"
                              id="don-objet-search-etat-select"
                              value={searchEtat}
                              label="Selectionnez un état"
                              onChange={setSearchEtat}
                            >
                              <MenuItem value="tous">Tous</MenuItem>
                              <MenuItem value="affectés">Affectés</MenuItem>
                              <MenuItem value="non affectés">Non affectés</MenuItem>
                            </Select>
                          </FormControl>
                          </div>    
                        </div>
                       
                          <div className="row justify-content-evenly align-items-center">
                            {
                              listDonsNature.map((item,index)=>{
                                return(
                                <CardDonObjets
                                  key={index}
                                  handleOpenModalDonObjet={handleOpenModalDonObjet} 
                                  {...item}
                                  />

                                )
                              })
                            }
                          </div> 
                          </>
                          )
                          :
                          ( <div className='pt-3 text-center'>
                          <p>
                            Aucun don en <span className='fw-bolder text-uppercase'>Nature</span> effectué pour le moment.
                          </p>
                          <Button onClick={()=>navigate('/make_donation/',{replace:true})} variant="outlined" >
                            effectuer un don 
                          </Button>
                          </div>)
                          }
                    </TabPanel>
                    
                </TabView>
            </div>
      
      </div>
     
    </div>
    <Modal 
      backdrop="static"
        overflow={true}
        size="lg"   
        onEntered={handleEntered}
        onExited={() => {
          setRows(0);
        }}
        open={openModalDonObjet} 
        onClose={handleCloseModalDonObjet}>
      <Modal.Header>
        <Modal.Title>Details Don</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-3" >
      {rows ? (
           
            <div className="don-objet-modal-contenair">
              <div className="text-center py-3">
                <img className="img-fluid" alt="card-img" src={`${BASE_URL}${infosDonNatureClick.photo}`} />
                <div className='py-2'>
                <input 
                ref={inputRef} 
                style={{display:'none'}}
                accept="image/png, image/jpeg,image/jpg" 
                       required
                      onChange={onChangeImageDon}
                      className="form-control form-control-lg" 
                      id="image-don" 
                      type="file"
                                />
                <Button onClick={onClickPhotoButton} variant="outlined">Modifier la photo</Button>
                </div>
                <h4 className="my-2" > {infosDonNatureClick.titre} </h4>
                <p className='don-objet-modal-contenair-p'>Non affecté</p>
              </div>
              <div className="don-objet-modal-step-container">
              <Box sx={{ width: '100%' }}> 
                <Stepper activeStep={1} alternativeLabel>
                    <Step>
                      <StepLabel>Don effectué avec succes<br/> { new Date(infosDonNatureClick.create).toLocaleDateString('fr')}<br/>{ new Date(infosDonNatureClick.create).toLocaleTimeString('fr')}</StepLabel>
                      
                    </Step>
                  {steps.map((item,index) => (
                    <Step key={index}>
                      <StepLabel>{item.label}<br/> {item.date}<br/>{item.heure}</StepLabel>
                      
                    </Step>
                  ))}
                </Stepper>
              </Box>
              </div>
              <Panel shaded className="don-objet-modal-info-sup mt-3">
                    <h2>
                      Informations sur le don
                    </h2>
                    <div className="ps-md-3">
                  <div className="row  justify-content-between align-items-center">
                    <div className="col-md-6 my-md-0 my-2">
                      <h5>categorie de l'objet</h5>
                      <p>
                      {infosDonNatureClick?.categorieObjet}
                      </p>
                    </div><div className="col-md-6 my-md-0 my-2">
                      <h5>type de l'bjet</h5>
                      <p>
                      
                      {infosDonNatureClick?.typeObjet}

                      </p>
                    </div>
                  </div>
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-6 my-md-0 my-2">
                      <h5>categorie de vulnerabilité choisie</h5>
                      <p>
                      {infosDonNatureClick?.categorieV}

                      </p>
                    </div><div className="col-md-6 my-md-0 my-2">
                      <h5>cibles choisies</h5>
                      <p>
                      {infosDonNatureClick?.cibleV}

                      </p>
                    </div>
                  </div>
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-6 my-md-0 my-2">
                      <h5>Vile de reception de l'objet</h5>
                      <p>
                        
                      {infosDonNatureClick?.lieu_reception}

                      </p>
                    </div><div className="col-md-6 my-md-0 my-2">
                      <h5>Etat du don</h5>
                      <p>
                      
                      {infosDonNatureClick?.Etat}

                      </p>
                    </div>
                  </div>
                  </div>
              </Panel>
              {infosDonNatureClick?.distribuer &&
              <Panel shaded className="don-objet-modal-info-sup mt-3">
                    <h2>
                      Informations Reçeveur du don
                    </h2>
                    <div className="ps-md-3">
                  <div className="row  justify-content-between align-items-center">
                    <div className="col-md-6 my-md-0 my-2">
                      <h5>Nom</h5>
                      <p>
                      Kone
                      </p>
                    </div><div className="col-md-6 my-md-0 my-2">
                      <h5>Prénom</h5>
                      <p>
                      prenom
                      </p>
                    </div>
                  </div>
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-6 my-md-0 my-2">
                      <h5>Ville de résidence</h5>
                      <p>
                     Abidjan
                      </p>
                    </div><div className="col-md-6 my-md-0 my-2">
                      <h5>Numéro téléphonique</h5>
                      <p>
                      01055465165
                      </p>
                    </div>
                  </div>
                  </div>
              </Panel>
              }

              <div className=" text-end mt-4">
              <Button onClick={handleOpenModalModifierDon} className="mx-3 my-2" variant="contained">Modifier</Button>
              <Button onClick={handleOpenModalSuppressionDon} className="mx-3 my-2" variant="contained" color="error">Supprimer l'annonce</Button>
              </div>


            </div>

        ) : (
            <div style={{ textAlign: 'center' }}>
              <Loader size="md" />
            </div>
          )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCloseModalDonObjet} varaint="outlined">
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>

     
    <Modal  backdrop="static"  open={openModalSuppressionDon} onClose={handleCloseModalSuppressionDon}>
        <Modal.Header>
          <Modal.Title>Suppression de l'annonce</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="py-3 text-center">
            <p>
              Êtes-vous sûr de vouloir Supprimer l'annonce  
              <span className="fw-bold "> {" "}
                 titre don
              </span> ?
            </p>
            <p className="">
              Entrer le titre de l'annonce <code className="fw-bold">
                titre don
              </code> pour confirmer la suppression
            </p>
            
            <TextField className="mt-1" fullWidth label="Enter le titre de l'annonce" placeholder="titre de l'annonce" variant="outlined" /> 
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button className="mx-3" onClick={handleCloseModalSuppressionDon}  variant="outlined" >
            annuler
          </Button>
          <Button onClick={handleCloseModalSuppressionDon}  variant="contained" color="error" >
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>

    <Modal size="lg" backdrop="static"  open={openModalModifierDon} onClose={handleCloseModalModifierDon}>
        <Modal.Header>
          <Modal.Title className="fw-bolder" >Modification de l'annonce</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={onSubmitForm} >
                    <Panel shaded={true} className="my-4 bg-white">
                        <TextField 
                            required
                            fullWidth
                            value={titreDon}
                            onChange={onChangeTitreAnnonce}
                            id="titre-don" 
                            label="Entrer un titre pour votre don" 
                            variant="filled" />
                       
                    </Panel>
                    <Panel shaded={true} className="my-4 bg-white">
                        <TextField
                        required
                        fullWidth
                        id="categorie-don"
                        select
                        label="Choisissez une catégorie"
                        value={categorieObjet}
                        onChange={onChangeCategorieObjet}
                        helperText="veuillez à bien selectionner la categorie de votre don"
                        variant="filled"
                        >
                        {categories.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                        <FormControl required className="ms-md-3 mt-md-3" >
                            <FormLabel id="type-don-label">
                                Choisissez le type qui convient à votre don
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby="type-don-label"
                                name="type-don-radio-group"
                                value={typeDon}
                                onChange={onChangeTypeDon}
                            >
                                <FormControlLabel value="Valeur1" control={<Radio />} label="Valeur1" />
                                <FormControlLabel value="Valeur2" control={<Radio />} label="Valeur2" />
                            </RadioGroup>
                         </FormControl>
                    </Panel>
                    <Panel shaded={true} className="my-4 bg-white">
                        <FormControl required className="ms-md-3 mt-md-3" >
                            <FormLabel id="etat-don-label">
                                Dans quel état se trouve votre don ?
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby="etat-don-label"
                                name="etat-don-radio-group"
                                value={etatDon}
                                onChange={onchangeEtatDon}
                            >
                                { etatsDon.map((item)=>(
                                    <FormControlLabel 
                                      key={item.value}
                                      value={item.value} 
                                      control={<Radio />}
                                      label={item.label}
                                       />
                                ))
                                }
                            </RadioGroup>
                         </FormControl>
                    </Panel>
                    <Panel shaded={true} className="my-4 bg-white">
                        <TextField
                        fullWidth
                        required
                        id="categorie-v"
                        select
                        label=" Selectionner une catégorie de personnes vulnérables"
                        value={categorieV}
                        onChange={onChangeCategorieV}
                        helperText="Seule la catégorie choisie aura acces à votre don"
                        variant="filled"
                        >
                        {categories.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                        <FormControl required className="ms-md-3 mt-md-3" >
                            <FormLabel id="type-don-label">
                                Choisissez la cible de personnes vulnérables
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby="type-don-label"
                                name="type-don-radio-group"
                                value={cibleV}
                                onChange={onChangeCibleV}
                            >
                                <FormControlLabel value="Valeur1" control={<Radio />} label="Valeur1" />
                                <FormControlLabel value="Valeur2" control={<Radio />} label="Valeur2" />
                            </RadioGroup>
                         </FormControl>
                    </Panel>
                    <Panel shaded={true} className="my-4 bg-white">
                        <TextField
                        fullWidth
                        required
                        id="ville-don"
                        select
                        label="Précisez dans quelle ville se trouve votre don"
                        value={villeDon}
                        onChange={onChangeVilleDon}
                        helperText="La précision de la ville du don, nous permet de mieux nous organisez pour le receptionné"
                        variant="filled"
                        >
                        {villes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                    </Panel>
                    <Panel shaded={true} className="my-4 bg-white">
                        <TextField
                            required
                            fullWidth
                            id="description-don"
                            label="Entrez une description pour votre don"
                            multiline
                            rows={4}
                            placeholder="Ex: la couleur, la taille ..."
                            variant="filled"
                            />
                    </Panel>
                  
                </form>
          

        </Modal.Body>
        <Modal.Footer>
          <Button className="mx-3" onClick={handleCloseModalModifierDon}  variant="outlined" >
            annuler
          </Button>
          <LoadingButton
          onClick={onSubmitForm}
                  loading={loading}
                  loadingPosition="start"
                  variant="contained"
                        startIcon={<SaveIcon />}
                        type="submit"
                    >
                         Enregistrer
          </LoadingButton>
        </Modal.Footer>
    </Modal>
    <Modal backdrop="static" role="alertdialog" open={openPhotoAlert} onClose={handleClosePhotoAlert} size="xs">
        <Modal.Body>
          <RemindIcon style={{ color: '#ffb300', fontSize: 24 }} />
          Cette opération modifie l'image associée à cette annonce.<br/> 
          Êtes-vous sûr de vouloir continuer ?
        </Modal.Body>
        <Modal.Footer>
          <Button className="mx-3" onClick={handleClosePhotoAlert} variant="outlined">
            Non
          </Button>
          <Button onClick={onClickButtonConfirmModif}  variant="contained">
            Oui
          </Button>
        </Modal.Footer>
      </Modal>
   </>
  );
}

export default MyActions;
