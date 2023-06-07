import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import {  useLocation } from "react-router-dom";


function Navbar(props) {
  const [value, setValue] = React.useState('');
  const [homeColor, setHomeColor] = React.useState('');
  const [settingsColor, setSettingColor] = React.useState('');
  const [newSessionColor, setNewSColor] = React.useState('');
  const [calendarColor, setCalColor] = React.useState('');



  const location = useLocation();

  React.useEffect(() => {
    if (location) {
        setValue(location.pathname.slice(1))
        if (location.pathname.slice(1) == 'home') {
          setHomeColor('white')
          setCalColor('')
          setNewSColor('')
          setSettingColor('')
        }
        else if (location.pathname.slice(1) == 'newSession') {
          setNewSColor('white')
          setSettingColor('')
          setHomeColor('')
          setCalColor('')
        }
        else if (location.pathname.slice(1) == 'settings') {
          setSettingColor('white')
          setNewSColor('')
          setCalColor('')
          setHomeColor('')
        }
        else if (location.pathname.slice(1) == 'calendar') {
          setCalColor('white')
          setSettingColor('')
          setNewSColor('')
          setHomeColor('')
        }
        else {
          setSettingColor('')
          setNewSColor('')
          setHomeColor('')
          setCalColor('')
        }
      }
  }, [location])


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation style={{ width: "100%", paddingLeft: 0, paddingRight: 0, margin: 0, paddingBottom: 0, paddingTop: 0, backgroundColor: '#547792', }} className='fixed-bottom'  value={value} onChange={handleChange} >
      <BottomNavigationAction
        style={{ color: homeColor }}
        label="Home"
        value="home"
        onClick={props.goToHome}
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        style={{ color: calendarColor }}
        label="Calendar"
        value="calendar"
        onClick={props.goToCalendar}
        icon={<CalendarMonthIcon />}
      />
      <BottomNavigationAction
        style={{ color: newSessionColor }}
        label="New"
        value="newSession"
        onClick={() => {
          props.goToCreateStudyPlan();
          props.cleanSession()
        }
        }
        icon={<AddCircleOutlineIcon />}
      />
      <BottomNavigationAction
        style={{ color: settingsColor }}
        label="Settings"
        value="settings"
        onClick={props.goToSettings}
        icon={<SettingsIcon />}
      />
    </BottomNavigation>
  );
}

export default Navbar;