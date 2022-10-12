import React from "react" 
import { Panel,Loader,useToaster,Message } from "rsuite"
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import "./DonNature.css"
import axiosInstance from "../../../api/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { listVulenerabilite } from "../../../services/vulnerabilites";
import { useEffect } from "react";



const etatsDon = [
    {
      value: 'bon',
      label: 'Bon',
    },
    {
      value: 'moyen',
      label: 'Moyen',
    },
    {
      value: 'mauvaise',
      label: 'Mauvaise',
    },
  ];



//   const messageDon = (
//     <Notification type="success" header="Informations" closable>
//       civ
      
//     </Notification>
//   );
  
//   const MessageDon = React.forwardRef(({ type,message, ...rest }, ref) => {
//     return (
//         <Message showIcon type="success" header="Success">
//       Detailed description and advices about successful copywriting.
//     </Message>
//     );
//   });

const categoriesObjets = [
    {
        title: "Alimentaire",
        items:[
            "Fruit ou Légume",
            "conserves "
        ]
    },
    {
        title: "Accessoire de mode",
        items:[
            "Montres et bijoux",
            "Sacs "
        ]
    },
    {
        title: "Chaussures",
        items:[
            "Hommes",
            "Femmes"
        ]
    }
]




export default function DonNature(){

    const navigate = useNavigate()
    const location = useLocation()
    const toaster = useToaster();
    const categoriesVulnerables = listVulenerabilite


    const [listTypeDon, setListTypeDon] = React.useState([]);
    const [listTypeVulnerabilite, setListTypeVulnerabilite] = React.useState([]);

    const [categorieObjet, setCategorieObjet] = React.useState('');
    const [titreDon, setTitreDon] = React.useState('');
    const [typeDon, setTypeDon] = React.useState('');
    const [etatDon, setEtatDon] = React.useState('');
    const [categorieV, setCategorieV] = React.useState('');
    const [villeDon, setVilleDon] = React.useState('');
    const [cibleV, setCibleV] = React.useState("");
    const [descriptionDon, setDescriptionDon] = React.useState("");
    const [imageDon, setImageDon] = React.useState("");

    const [messageInfo, setMessageInfo] = React.useState("");
    const [errormsg, setErrormsg] = React.useState("");
    const [loading, setLoading] = React.useState(false);

	const onChangeImageDon = (event) => {
		setImageDon(event.target.files[0]);
		// console.log(event.target.files[0]);
	};
    const onChangeDescriptionDon = (event) => {
        setDescriptionDon(event.target.value);
    };

    const onChangeCibleV = (event) => {
        setCibleV(event.target.value);
    };

    const onChangeVilleDon = (event) => {
        setVilleDon(event.target.value);
    };
    
    const onChangeCategorieV = (event) => {
        let categorieVul = event.target.value
        let listTypes = categoriesVulnerables.filter(option=> option.name ===categorieVul)
        setCategorieV(categorieVul);
        // console.log(listTypes[0].list)
        setListTypeVulnerabilite(listTypes[0].list)
    };


    const onchangeEtatDon = (event) => {
        setEtatDon(event.target.value);
    };

    const onChangeTypeDon = (event) => {
        setTypeDon(event.target.value);
    };
    const onChangeCategorieObjet = (event) => {
        let categorieDonValue = event.target.value
        let listTypes = categoriesObjets.filter(option=> option.title ===categorieDonValue)
        setCategorieObjet(categorieDonValue);
        setListTypeDon(listTypes[0].items)
    };

    const onChangeTitreAnnonce = (event) => {
        setTitreDon(event.target.value);
    };
  
   
    const messageDon = (
        <Message showIcon type="success" header="Opération reussite">
           <p className="text-center">
            Don Effectué avec succes!
            Merci pour votre contribution <br/>
            Nous vous contacterons dans peu.
           </p>
        </Message>
      );

    const onSubmitForm = async (e)=>{
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();
        // navigate('/my_actions', { state: { from: location }, replace: true });
        //check if all fields is empty
        if( categorieObjet.trim()!=="" || 
            titreDon.trim()!=="" || 
            typeDon.trim()!=="" || 
            etatDon.trim()!=="" || 
            categorieV.trim()!=="" || 
            villeDon.trim()!=="" ||
            cibleV.trim()!==""){
                // {
                //     "id":"",
                //     "typeDons":"",
                //     "categorieV":"",
                //     "cibleV":"",
                //     "categorieObjet":"",
                //     "typeObjet":"",
                //     "lieu_reception":"",
                //     "photo":"",
                //     "Etat":"",
                //     "typePersonne":"",
                //     "create":"",
                //     "provenanced":"",
                //     "affecter":""
                // }

                // const dataVulnerable = {
                //     typeDons : 'Objet',
                //     categorieObjet : categorieObjet,
                //     titreDon : titreDon,
                //     typeObjet :typeDon ,
                //     categorieV :categorieV ,
                //     cibleV :cibleV ,
                //     lieu_reception : villeDon,
                //     Etat : etatDon,
                //     photo : imageDon,
                // }

                // Etat: "bon"
                // ​​​
                // affecter: false
                // ​​​
                // categorieObjet: "valeur2"
                // ​​​
                // categorieV: "valeur1"
                // ​​​
                // cibleV: "Valeur1"
                // ​​​
                // create: "2022-10-01T09:49:32.893217Z"
                // ​​​
                // description: "null"
                // ​​​
                // donateur: "KONE"
                // ​​​
                // id: 2
                // ​​​
                // lieu_reception: "ville2"
                // ​​​
                // photo: "/media/images/Valeur1/photo1.jpg"
                // ​​​
                // provenanced: "null"
                // ​​​
                // titre: "null"
                // ​​​
                // typeDons: "Objet"
                // ​​​
                // typeObjet: "Valeur1"
                // ​​​
                // typePersonne: "null"
                formData.append("typeDons","Objet")
                formData.append("titre",titreDon)
                formData.append("categorieObjet",categorieObjet)
                formData.append("typeObjet",typeDon)
                formData.append("categorieV",categorieV)
                formData.append("cibleV",cibleV)
                formData.append("lieu_reception",villeDon)
                formData.append("Etat",etatDon)
                formData.append("descriptionDon",descriptionDon)
                formData.append("photo",imageDon,imageDon.name)

                await axiosInstance.post('efdoobjet/',formData)
                .then(res=>{
                    console.log("response : ",res.data.message)
                    setLoading(false)
                    setMessageInfo(res.data.message)
                    toaster.push(messageDon,"topCenter")
                    setTimeout(()=>{
                        navigate('/my_actions', { state: { from: location }, replace: true });
                    },3000)
                   

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

    // useEffect(()=>{
    //     console.log("cities list: ",cities)
    // },[])



    return(
        <>
     
        <section className="don-nature">
            <div className="container">
           
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
                        {categoriesObjets.map((option,index) => (
                            <MenuItem key={index} value={option.title}>
                            {option.title}
                            </MenuItem>
                        ))}
                        </TextField>
                        { listTypeDon.length !==0 &&
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
                                { listTypeDon.map((value,index)=>{
                                    return(
                                        <FormControlLabel 
                                            key={index}
                                            value={value} 
                                            label={value}
                                            control={<Radio />} 
                                             />
                                    )
                                })
                                }

                            </RadioGroup>
                         </FormControl>}

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
                        {categoriesVulnerables?.map((option,index) => (
                            <MenuItem 
                                key={index}
                                value={option.name}>
                            {option.name}
                            </MenuItem>
                        ))}
                        </TextField>

                        { listTypeVulnerabilite?.length !==0 &&<FormControl required className="ms-md-3 mt-md-3" >
                            <FormLabel id="type-don-label">
                                Choisissez la cible de personnes vulnérables
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby="type-don-label"
                                name="type-don-radio-group"
                                value={cibleV}
                                onChange={onChangeCibleV}
                            >
                                 { listTypeVulnerabilite.map((value,index)=>{
                                    return(
                                        <FormControlLabel 
                                            key={index}
                                            value={value} 
                                            label={value}
                                            control={<Radio />} 
                                             />
                                    )
                                })
                                }
                            </RadioGroup>
                         </FormControl>}
                    </Panel>
                    <Panel shaded={true} className="my-4 bg-white">
                        {/* <TextField
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
                        </TextField> */}
                        <TextField 
                            required
                            fullWidth
                            value={villeDon}
                            onChange={onChangeVilleDon}
                            id="ville-don" 
                            label="Précisez dans quelle ville se trouve votre don"  
                            helperText="La précision de la ville du don, nous permet de mieux nous organisez pour le receptionné"
                            variant="filled" />
                    </Panel>
                    <Panel shaded={true} className="my-4 bg-white">
                        <TextField
                            required
                            value={descriptionDon}
                            onChange={onChangeDescriptionDon}
                            fullWidth
                            id="description-don"
                            label="Entrez une description pour votre don"
                            multiline
                            rows={4}
                            placeholder="Ex: la couleur, la taille ..."
                            variant="filled"
                            />
                    </Panel>
                    <Panel shaded={true} className="bg-white" >
                        <div>
                            <label htmlFor="image-don" className="form-label">
                                Selectionnez une image de votre don *
                            </label>
                            <input 
                                accept="image/png, image/jpeg,image/jpg" 
                                required
                                onChange={onChangeImageDon}
                                className="form-control form-control-lg" 
                                id="image-don" 
                                type="file"
                                />
                        </div>
                    </Panel>


                    <Panel className="py-5 align-items-center text-end" >
                    <LoadingButton
                        loading={loading}
                        loadingPosition="start"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        type="submit"
                    >
                         Effectuer le don
                    </LoadingButton>
                        {/* <Button type="submit" variant="contained">
                            Effectuer le don
                        </Button> */}
                    </Panel>
                </form>
            
            </div>
        </section>
       </>
        )
}