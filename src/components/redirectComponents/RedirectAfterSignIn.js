

import {  Message, Panel } from 'rsuite';
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect,useState } from 'react';

export default function RedirectAfterSignIn(){
    const [messageSuccess,setMessageSuccess] = useState('')

    let location = useLocation();

    useEffect(()=>{

        let stateMessage = location.state?.message
        setMessageSuccess(stateMessage)

    },[location?.state])

    return(
        <div className="" style={{marginTop:'10rem'}} >
            <Panel  >
                <Message duration={5000}  showIcon type="success">
                    <p className="p-2" >{messageSuccess}</p>
                </Message>
            </Panel>
            
        </div>
        )
}