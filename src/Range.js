import React, { useState, useEffect } from 'react';



function Range(props){
  const [value, setValue] = useState(props.initVal);
  const [eventDesc, setEventDesc] = useState("");
  const range = props.maxVal - props.minVal;
  const center = range/2;

  function convert(value) {
    if(props.flip){
      value = range - (value - props.minVal) + props.minVal
    }
    return value;
  }

  function handlerWrapper(){
    console.log('handlerWrapper:'+props.handlerOnClick);
    if(props.handlerOnClick){
      props.handlerOnClick(convert(value));
    }
  }

  function handleOnChange(e){
    setValue(e.target.value);
  }

  function handleOnInput(e){
    setValue(e.target.value);
  }
  function handleOnTouchStart(e){
    setEventDesc('OnTouchStart');
  }
  function handleOnTouchEnd(e){
    setEventDesc('OnTouchEnd');
    handlerWrapper();
  }

     // {value} : {eventDesc}
  return (
    <div>
      <input type="range"
        min={props.minVal} max={props.maxVal} step={props.stepVal} defaultValue={props.initVal}
        onClick={() => {handlerWrapper();}}
        onChange={(e) => {handleOnChange(e);}}
        onInput={(e) => {handleOnInput(e);}}
        onTouchStart={(e) => {handleOnTouchStart(e);}}
        onTouchEnd={(e) => {handleOnTouchEnd(e);}}
      />
      <div>{value}</div>
    </div>
  );
}

export default Range;
