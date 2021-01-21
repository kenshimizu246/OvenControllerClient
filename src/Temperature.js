import React, { useState, useEffect } from 'react';

function Temperature(props){
  const [value, setValue] = useState(0);
  const [timestamp, setTimestamp] = useState("");

  function onMessage(msg){
    var s = JSON.stringify(msg);
    //if(msg.header.source === props.source){
      //console.log("onMessageX:"+String(msg.header.source-id.toString()));
      //console.log("onMessageY:"+String(msg.body.status));
      if(0 < msg.body.temperature){
        setValue(msg.body.temperature);
        //setTimestamp(msg.body.timestamp);
      }
   // }
  }

  useEffect(() => {
    props.conn.on('MSG',onMessage.bind(this));

    return () => {props.conn.removeEventListener('MSG', onMessage)};
  }, []);

  let vv = value
  if(typeof(value) === "number"){
    vv = value.toFixed(2);
  }
  
  return (
    <div className='temperatureBox'>
      <div className='temperatureBoxLabel'>{props.label}({props.id})</div>
      <div className='temperatureBoxDescr'>{props.description}</div>
      <div className='temperatureBoxValue'>{vv}</div>
    </div>
  );
}

export default Temperature;
