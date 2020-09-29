import React from 'react';

function Button(props) {
    //displaying buttons based on choices
    return (
        <div>
          {(props.status === 0)?  //if cleared
            <button className="stopwatch-btn stopwatch-btn-gre"
            onClick={props.start}>Start</button> : ""
          }
    
          {(props.status === 1)? //if running
            <div>
              <button className="stopwatch-btn stopwatch-btn-red"
                      onClick={props.stop}>Stop</button>
              <button className="stopwatch-btn stopwatch-btn-yel"
                      onClick={props.reset}>Reset</button>
            </div> : ""
          }
    
         {(props.status === 2)?  //if paused
            <div>
              <button className="stopwatch-btn stopwatch-btn-gre"
                      onClick={props.resume}>Resume</button>
              <button className="stopwatch-btn stopwatch-btn-yel"
                      onClick={props.reset}>Reset</button>
            </div> : ""
          }
         
        </div>
      );
}

export default Button;
