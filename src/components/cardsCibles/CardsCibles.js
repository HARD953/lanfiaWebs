import React  ,{lazy} from 'react';
import { Panel, Placeholder, IconButton,  } from 'rsuite';
import './CardsCibles.css';
import GearIcon from '@rsuite/icons/Gear';

const { Paragraph } = Placeholder;



const CardsCibles = (props)=>{

    return(
        <Panel data-aos="zoom-in"  shaded bordered bodyFill className='cards-cibles-panel m-md-3 mt-3 '>
            <img src={props.image}  />
            <Panel header={props.titre}>
            <p>
                <small>
                A suite of React components, sensible UI design, and a friendly development experience.
                </small>
            </p>
            </Panel>
            <div className="row p-3">
               
                <button className="home-btn-don-cible "  >
                  <span className="span-icon-heart" >
                    <i className="fa-solid fa-heart icon-heart"></i>
                  </span> 
                  Leur venir en aide
                </button>
            </div>
                
        </Panel>
    )
}

export default CardsCibles;