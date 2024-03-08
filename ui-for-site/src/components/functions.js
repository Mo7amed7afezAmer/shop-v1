import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

function tick() {
    const element = (
        <div className="tick-container">
            <h1>start test!</h1>
            <h4>{ new Date().toLocaleTimeString() }</h4>
        </div>
    );
    root.render(element);
}


function Car(props) {
    return <li>I am a { props.brand }</li>;
  }
  
export default function Garage() {
    const cars = ['Ford', 'BMW', 'Audi'];
    return (
        <>
        <h1>Who lives in my garage?</h1>
        <ul>
            {cars.map((car) => <Car brand={car} />)}
        </ul>
        </>
    );
}

// export default tick;


