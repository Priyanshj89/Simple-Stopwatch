import React,{ useState } from 'react';
import Display from './Components/Display';
import ButtonComponent from './Components/Button';
import Viewhistory from './Components/ViewHistory';
import FullHistory from './Components/FullHistory';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css';

function App() {

  const [time, setTime] = useState({ms:0, s:0, m:0, h:0});
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  const [hist, setHist] = useState([]);
  //getting data from local storage for full history
  var storedState = JSON.parse(localStorage.getItem("buttons"));
  const [fullhist, setFullhist] = useState((storedState)?storedState:[]);
  //status 0 means not started/clear
  //status 1 means started
  //status 2 means stopped

  const start = () => {    
    run();
    setStatus(1);//status is on
    setHist([1,...hist])
    setFullhist([1,...fullhist])
    setInterv(setInterval(run, 10)); //runs every milli-second
  };
  
  var Ms = time.ms, S = time.s, M = time.m, H = time.h;

  const run = () => {    //updating time values
    if(M === 60){
      H++;
      M = 0;
    }
    if(S === 60){
      M++;
      S = 0;
    }
    if(Ms === 100){
      S++;
      Ms = 0;
    }
    Ms++; //increasing time
    return setTime({ms:Ms, s:S, m:M, h:H});
  };

  const stop = () => {
    setHist([2,...hist])
    setFullhist([2,...fullhist])
    clearInterval(interv);
    setStatus(2); //staus is stop
  };

  const clearHist = () => {
    localStorage.clear();
    setHist([])
    setFullhist([])
    console.log("to")
  }

  const reset = () => {
    setHist([0,...hist])
    setFullhist([0,...fullhist])
    clearInterval(interv);
    setStatus(0);//status is clear
    setTime({ms:0, s:0, m:0, h:0})
  };

  const resume = () => start();

  const storage = () => {
  localStorage.setItem("buttons", JSON.stringify(fullhist));
  console.log("Hi")
  console.log(fullhist);
  }

  return (
    <div className="main-section">
     <div className="clock-holder">
       
          <div className="stopwatch">
          <h1>Stopwatch</h1>
          <br></br>
          <BrowserRouter>
               <Route exact path='/'>
               <Display time={time}/>
               <ButtonComponent status={status} resume={resume} reset={reset} stop={stop} start={start}/>
               
                 <Link to='/viewHistory'>
                 <button className="stopwatch-btn stopwatch-btn-blu">
                 View history  
                 </button >
                 </Link>
                 
                 <Link to='/FullHistory'>
                 <button className="stopwatch-btn stopwatch-btn-blu">
                 View full history  
                 </button >
                 </Link>
            
                 <button className="stopwatch-btn stopwatch-btn-red" onClick={()=>clearHist()}>
                   Clear History
                 </button>
               </Route>
               
               <Route exact path = '/viewHistory'>
                 <Viewhistory status={status} hist={hist}/>
               </Route>
               
               <Route exact path = '/FullHistory'>
                 <FullHistory status={status} fullhist={fullhist}/>
               </Route>               
               
               </BrowserRouter>
               
          </div>
     </div>
     {
     //updating local storage information
     storage()
     }
    </div>
  );
}

export default App;
