import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './NavTabDon.css'
import MakeDonation from '../../views/makeDonation/MakeDonation';
import DonNature from '../makeDonation/donNature/DonNature';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import CreditCardIcon from '@mui/icons-material/CreditCard';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function NavTabDon() {
  const userItem = "userDonnateurIformationsLanfiatech"
  const theme = useTheme();
  const navigate = useNavigate()
  const [value, setValue] = React.useState(0);

  const [isLogged,setIsLogged] = React.useState(localStorage.getItem(userItem))
      

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };


useEffect(()=>{
  setIsLogged(localStorage.getItem(userItem))

// eslint-disable-next-line react-hooks/exhaustive-deps
},[localStorage.getItem(userItem)])

  return (
    <Box className="nav-tab-don-container" sx={{ width: '100%' }}>
      <AppBar className="nav-tab-don-appBar" position="static">
        <Tabs
           
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab  className="nav-tab-don-appBar-tab py-4 px-1 me-1 " label="Effectuer un don en Argent" {...a11yProps(0)} />
          <Tab   className="nav-tab-don-appBar-tab py-4 px-1 ms-1 "  label="Effectuer un don en Natures" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <h2 className="fw-bolder mt-3" >
          <CreditCardIcon fontSize='large' /> Effectuer un don en Argent
          </h2>

          <MakeDonation />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        

        {!!isLogged?
         ( <> <h2 className="fw-bolder  mt-3" >
          <GridViewIcon fontSize='large' /> Effectuer un don en Nature
          </h2>

        
          <DonNature value={value} />
          
          </>):
          <>
          <div className="row justify-content-center align-items-center ">
            <h3 className="text-danger text-center mt-3" >
              Desolé, vous devez vous connecter afin de pouvoir effectuer un don en Nature
            </h3>
          </div>
          <div className="text-center">

          <Button onClick={()=>navigate('/sign_in/',{replace:true})} className="text-center mx-auto mt-3" variant="outlined">Se Connecter</Button>
          </div>
          </>
         }
        </TabPanel>
   
      </SwipeableViews>
    </Box>
  );
}
