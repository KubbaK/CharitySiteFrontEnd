import { Button } from '@mui/material'
import {React} from 'react'
import {RotatingLines} from 'react-loader-spinner'
import { useNavigate } from "react-router-dom";

const SuccessfullDonate = () => {
    const close = () =>{
        window.close()
    }
    return(
        <div style={{backgroundColor:'white',height:'95vh',width:'90%',left:'0',right:'0',margin:'0 auto',borderRadius:'30px'}}>
            <div style={{textAlign:'center',fontSize:'40px',paddingTop:'20px', marginTop:'10px',fontWeight:'bold'}}>
                Przekierowywanie do płatności...
            </div>
            <div style={{height:'114px',textAlign:'center',marginTop:'50px'}}>
                <Button onClick={close} variant='contained' color='error' style={{fontWeight:'bold',width:'300px',height:'100px'}}>Zakończ płatność</Button>
            </div>
            <div style={{textAlign:'center',marginTop:'90px'}}>
            <RotatingLines 
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="216"
                visible={true}
            />
            </div>
        </div>
    )
}

export default SuccessfullDonate