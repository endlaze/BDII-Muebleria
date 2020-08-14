import React from 'react';
import './App.css';
import {StoreProvider} from './Store'
import Routes from './Routes';
import Map from './components/Map';


const App = () => {
  return (
    //<AddReview/>
    //<AddPromotion/>
    <div className="App">
      
      <StoreProvider>
        <Routes/>
      </StoreProvider>


    
    </div>
  );
}

export default App;
