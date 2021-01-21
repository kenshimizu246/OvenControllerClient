import React, { useState, useEffect, useContext } from 'react';
import { Chart } from 'react-charts';
import Range from './Range';

function TempChart(props){
  const [temperatures, setTemperatures] = useState(0);
  const [size, setSize] = useState(60);
//  const context = useContext('power');

  console.log("size:"+size);
  const dd = [];
  let sz = temperatures.length - size;
  for(let i = sz; i < temperatures.length; i++){
    dd[i - sz] = [i - sz, temperatures[i]];
  }
//  console.log("dd:"+dd);

  const series = React.useMemo(
    () => ({
      showPoints: false
    }),
    []
  );

  const data = React.useMemo(
    () => [
      {
        label: 'Temp 1',
        data: dd
      }
    ],
    [dd],
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom'},
      { type: 'linear', position: 'left' }
    ],
    []
  );

  function onMessage(msg){
    setTemperatures(msg.body.history);
  }

  function handlerRangeSize(value){
    setSize(value);
  }

  useEffect(() => {
    props.conn.on('MSG',onMessage.bind(this));

    return () => {props.conn.removeEventListener('MSG', onMessage)};
  }, []);

  return (
      <div className='chartFrame'>
        <div className='chartBody'>
          <Chart data={data} axes={axes} series={series}
          />
        </div>
        <div className='chartRange'>
          <Range handlerOnClick={handlerRangeSize}
                 minVal={12} maxVal={120} stepVal={1} initVal={60} flip={false} />
        </div>
      </div>
  );
}

export default TempChart;
