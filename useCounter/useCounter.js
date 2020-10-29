import { useState } from 'react';

export const useCounter = ( initialState = 10) => { //Recibe un estado inicial. Si no recibe nada el valor será 10

    const [counter, setCounter] = useState(initialState); //Creamos un estado con useState

    const increment = ()=> {
        setCounter( counter + 1);
    }

    const decrement = ( factor = 1 )=> {
        setCounter( counter - 1 );
    }

    const reset = ()=>{
        setCounter( initialState);
    }

    //Este customHook está retornando un objeto con una constante y dos funciones
    //Se está estrayendo la lógica de nuestro contador.

    return { 
        counter, 
        increment,
        reset,
        decrement
    };
}
