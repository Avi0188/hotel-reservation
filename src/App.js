import logo from './logo.svg';
import './App.css';

import Navbar from './components/Navbar';
import Hotel from './components/Hotel';
import { Box } from '@chakra-ui/react';
import Reservation from './components/Reservation';
import MainRoutes from './MainRoutes';

function App() {
  return (
    <Box className="App">
   <Navbar/>
   <MainRoutes />
   {/* <Hotel /> */}
{/* <Box style={{display:"flex", gap:"50vh"}}>
  <Box style={{marginTop:"10vh"}}> <Hotel /></Box>
  <Box style={{marginTop:"10vh"}}><Reservation /></Box>
 
  
</Box> */}
 
    </Box>
  );
}

export default App;

// Note===>Must run json server first 
// we  run the server by  "json-server --watch db.json --port 8080"   running the command in terminal for db.json
// no backend or mock server so everytime first we have to run json-server then only our data will display

// click on view reservation to check the booking 

