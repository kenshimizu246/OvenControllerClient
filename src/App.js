import './App.css';

import Connection from './Connection';
import Range from './Range';
import Temperature from './Temperature';
import TempChart from './TempChart';
import React, {useState, useEffect, useContext} from 'react';
import { Chart } from 'react-charts';


const urlParams = new URLSearchParams(window.location.search);
const host = (urlParams.has('host') ? urlParams.get('host') : window.location.hostname);
const port = (urlParams.has('port') ? urlParams.get('port') : '9012');
console.log("connection:"+host+":"+port)

var msgcnt = 0;

//var conn = new Connection('ws://' + host + ':' + port, ['ovnctrl']);
var conn = new Connection('ws://' + '192.168.1.71' + ':9012', ['ovnctrl']);


conn.connect();

const appInitValues = {
  power: 120,
  scale: 60
};


const context = React.createContext(appInitValues);

function App() {
  //const context = useContext({power: 0, scale: 20});
  //const context = useContext('power');
  //console.log("app.context:"+context);
//  useEffect(() => {
//    conn.connect();
//    return () => {
//      conn.close();
//    };
//  }, []);

  function handlerRangePower(value){
    const message = {
      header: {
        type: 'command',
        version: 1.0,
        seq: msgcnt,
      },
      body: {
        command: "set_power",
        value: parseInt(value, 10),
      },
    }
    const str = JSON.stringify(message)
    conn.send(str);
  }

  function handlerRangeChartScale(value){
    console.log("Scale:"+value)
  }

  function handlerScaleChanged(value){
    console.log("ScaleChanged:"+value)
  }

  return (
    <div className="App">
      <div className="App">
        <Temperature conn={conn} source='Temperature' id='0' label='Temperature' description='Temperature'/>
      </div>
      <div className="App">
        <Range handlerOnClick={handlerRangePower} 
               minVal={0} maxVal={2000} stepVal={10} initVal={150} flip={false} />
      </div>
      <div className="App">
        <TempChart conn={conn} />
      </div>
    </div>
  );
}

export default App;
