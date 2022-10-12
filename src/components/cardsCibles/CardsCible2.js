import * as React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import './CardsCible2.css'
import { useNavigate } from 'react-router-dom';

export default function CardsCible2(props) {
  const navigate = useNavigate()
  return (
    <div className="item"  >
      <div className="cards-cibles ">
        <CardMedia
          component="img"
          alt="green iguana"
          height="250"
          image={props.image}
        />
        <CardContent className="cards-cicle-content" >
          <h3 className="text-uppercase" >
          {props.titre}
          </h3>
          <div className='card-cicle-content-p-content'>

          <p>
          {props.text}
          </p>
          </div>
        </CardContent>
        {/* <CardActions>
          <Button onClick={()=>navigate(`/causes_details/${props.id}`,{replace:true})} variant="contained" size="large">
            Nous soutenir 
          </Button>
        
        </CardActions> */}
      </div>
    </div>
  );
}
