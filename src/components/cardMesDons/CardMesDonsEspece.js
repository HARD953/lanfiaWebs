

import React from "react";
import { Modal } from 'rsuite';


const CardMesDonsEspece = (props) => {

    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState();
    const handleOpen = value => {
      setSize(value);
      setOpen(true);
    };
    const handleClose = () => setOpen(false);
  

return(
    <div >
        
        <div className='card  border p-4 m-2' style={{display:props.type==2?'none':'block'}}>

                <h5 className="card-title"> <i className='pi pi-money-bill text-success '></i> </h5>
                <h6 className="card-subtitle mb-2 text-muted"> N* <u>{props.Numero}</u></h6>
                <p className="card-text">  <b>Montant :</b> {props.Montant} <i className='pi pi-dollar'></i>  </p>
                <p className="card-text">  <b>Date :</b> {props.Date} </p>
                <p className="card-text"> <b>Statut :</b> <b className= 'statut badge badge' style={{backgroundColor:props.Statut=="Distribué"? "green":"orange" }}> {props.Statut} </b> </p>
                <br></br>
                <a className="btn btn-outline-primary" size="sm" onClick={() => handleOpen('sm')}>Voir <i className='pi pi-plus '></i></a>
        
        
        
        </div>
        <Modal size={size} open={open} onClose={handleClose}>
            <Modal.Header>
            <Modal.Title> <u>Détails du don N* {props.Numero}</u> </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            <h5 className="card-title"> <i className='pi pi-money-bill text-success '></i> </h5>
                <h6 className="card-subtitle mb-2 text-muted"> N* <u>{props.Numero}</u></h6>
                <p className="card-text">  <b>Type :</b> Argent </p>
                <p className="card-text">  <b>Montant :</b> {props.Montant} <i className='pi pi-dollar'></i>  </p>
                <p className="card-text">  <b>Date Don :</b> {props.Date} </p>
           
                <p className="card-text">  <b>Nom Donateur :</b> Donateur 1   </p>
                <p className="card-text">  <b>Date Distribution :</b> {props.Date} </p>
                <p className="card-text"> <b>Statut :</b> <b className= 'statut badge badge' style={{backgroundColor:props.Statut=="Distribué"? "green":"orange" }}> {props.Statut} </b> </p>
               
                <br></br>
               
        
            </Modal.Body>
            <Modal.Footer>

            <a className="btn btn-outline-primary mr-5" onClick={handleClose} appearance="primary">
                Ok
            </a>
            
            <a className="btn btn-outline-danger" onClick={handleClose} appearance="subtle">
                Femer
            </a>
           
            </Modal.Footer>
        </Modal>
  
  
  </div>

    )

}

export default CardMesDonsEspece;
