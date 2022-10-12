import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import './CardDonsViews.css'
import { Panel,Modal } from 'rsuite';

import imgCard from "../../assets/images/donation/money.jpg"

const CardDonsViews = (props) => {
    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState();
    const handleOpen = value => {
      setSize(value);
      setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const header = (
        <img alt="Card"  className="img-fluid card-view-dons-img" src="https://www.mifassur.com/sites/default/files/styles/mif_742xauto/public/donation.jpg" />
    );
    const footer = (
        <span>
            <Button onClick={()=>handleOpen()} label="Voir details" icon="pi pi-eye" />
            
        </span>
    );
    const t1 =  Date(props.create);
    const t =  new Date(props?.create);
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    const hours = ('0' + t.getHours()).slice(-2);
    const minutes = ('0' + t.getMinutes()).slice(-2);
    const seconds = ('0' + t.getSeconds()).slice(-2);
    const dateDon = `${date}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
    // let dateDon = Date(props.create)
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


    return (
            <>
            <div  onClick={()=>handleOpen()} className="card-view-argent m-3">
                <div className="">
                <img alt="Card"  className="img-fluid card-view-dons-img" src="https://www.mifassur.com/sites/default/files/styles/mif_742xauto/public/donation.jpg" />
                <p className='montant-p' >
                    {props.montant} francs cfa
                </p>
                </div>
                <div className="card-view-argent-text-content py-3">
                    {/* <h3>
                    {props.cibleV==="aucun"? 'cible libre' :"Cible :"+props.cibleV} 
                    </h3> */}
                    <div className="row">
                        <div className="col-12">
                        <h6>
                            statut du don
                        </h6>
                        <p className="mt-n2 ms-5" style={{lineHeight: '1.5,',color:props.affecter? "green":"orange"}}>

                        {props.affecter?'Distribué':"Pas encore distribué"}
                    
                        </p>
                        </div>

                       <p>
                        Fait le :{dateDon}
                       </p>
                    </div>
                   
                    <div className="m-auto">
                    <Button onClick={()=>handleOpen()} label="Voir details" icon="pi pi-eye" />
                    
                    </div>

                </div>
            </div>
     
            {/* <Card
            
             onClick={()=>handleOpen()}
             title={props.cibleV==="aucun"? 'Aucun cible choisie' :"Cible :"+props.cibleV} 
             subTitle={props.montant} 
             className="card-view-dons m-md-3 my-3" 
             footer={footer} 
             header={header}>

                <p className="m-0" style={{lineHeight: '1.5,',color:props.affecter? "green":"orange"}}>

                {props.affecter?'Distribué':"Pas encore distribué"}
                    
                    </p>
            </Card> */}
        <Modal size={size} open={open} onClose={handleClose}>
            <Modal.Header>
            <Modal.Title> <u>Détails du don N* {props.Numero}</u> </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            <h5 className="card-title"> <i className='pi pi-money-bill text-success '></i> </h5>
                <h6 className="card-subtitle mb-2 text-muted"> N* <u>{props.id}</u></h6>
                <p className="card-text">  <b>Type :</b> Argent </p>
                <p className="card-text">  <b>Montant :</b> {props.montant} Francs CFA  </p>
               
                <p className="card-text">  <b>Nom Donateur :</b> {props.donateur}   </p>

               
                <p className="card-text">  <b>Fait le :</b> {dateDon}   </p>
                
                {props.provenanced !== 'null' && <p className="card-text">  <b>Provenance du don :</b> {props.provenanced}   </p>}

                <p className="card-text">  <b>Catégorie choisie :</b> {props.categorieV}   </p>

                <p className="card-text">  <b>Personnes ciblées :</b> {props.typePersonne}   </p>

              
                
              { props.Date && <p className="card-text">  <b>Date Distribution :</b> {props.Date} </p>
}
                <p className="card-text"> <b>Statut :</b> <b className= 'statut badge badge' style={{backgroundColor:props.affecter? "green":"orange" }}> {props.affecter?'Distribué':"Pas encore distribué"} </b> </p>
               
                <br></br>
               
        
            </Modal.Body>
            <Modal.Footer>

          
            
            <button className="btn btn-outline-danger" onClick={handleClose} appearance="subtle">
                Fermer
            </button>
           
            </Modal.Footer>
        </Modal>
        </>
    )
}
               
export default CardDonsViews