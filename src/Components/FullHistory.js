import React from 'react';

function FullHistory(props) {
    
    //same as viewhistory but fullhistory is shown using localstorage
    var st;
    if(props.fullhist[0] === 0){
        st = "CLEARED"
    }
    else if(props.fullhist[0]===1){
        st = "ON"
    }
    else if(props.fullhist[0]===2){
        st = "PAUSED"
    }
    else{
        st = "CLEARED"
    }

     return (
       <div>
           <h1>History</h1>
           <h2>Current Status of timer</h2>
           <h3>{st}</h3>
           <br></br>
           <br></br>
           <h2><u>Button Press History</u></h2>
           <br></br>
           {
           
           props.fullhist.map(value=>{
            if(value === 0){
                return (<div><br></br><h3>RESET BUTTON - Timer Cleared</h3></div>)
            }
            else if(value===1){
                return <h3>START/RESUME BUTTON -  Timer On</h3>;
            }
            else{
                return <h3>STOP BUTTON -  TImer Paused</h3>;
            }
        })
    }
       </div>
     );
}

export default FullHistory;
