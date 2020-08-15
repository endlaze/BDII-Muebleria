import React from 'react';
import './App.css';
import {StoreProvider} from './Store'
import Routes from './Routes';
import Map from './components/Map';
import Profile from './pages/Profile';


const App = () => {
  return (
    //<AddReview/>
    //<AddPromotion/>
    <div className="App">
      
      {/* <StoreProvider>
        <Routes/>
      </StoreProvider> */}
    <Profile></Profile>

    
    </div>
  );
}

export default App;
