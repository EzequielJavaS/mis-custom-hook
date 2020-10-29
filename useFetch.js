import { useState, useEffect, useRef } from 'react';

export const useFetch = ( url ) => { //Necesitamos un URL para poder entrar en el servicio
    //En el customHook useFetch utilizamos el useRef. Lo ambiamos de nombre a isMounted
    const isMounted = useRef(true); //Cuando esto se llama, el componente está montado porque se está renderizando la primera vez
                            //La idea del isMounted es que mantenga la referencia cuando este hook está vivo o cuando el componente que lo está usando sigue montado. Cuandoo cambie los valores del isMounted, no quiero lanzar una renderización
                            // simplemente estoy manteniendo la referencia al valor.  

    const [state, setState] = useState({data: null, loading: true, error: null });

    //Cuando el componente se desmonte por primera vez ocurrirá esto:
    useEffect(() => {

        return () => {
            isMounted.current = false;
        }
    }, [])

    //Cuando recibimos el URL quiero que pase algo:
    useEffect( ()=>{
        setState({ data:null, loading: true, error:null });
        
        fetch( url ) //Quiero que se ejecute el fetch para conectar con la url
            .then( resp => resp.json() )
            .then( data => {  //extraemos la información

                    if ( isMounted.current ){
                        setState({  //Modificamos el estado
                            loading: false,
                            error: null,
                            data
                        })
                    }
            })
            .catch( () => {
                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info'
                })
            })
    },[url])

    return state; //Esto es lo que enviamos a nuestro componente. El estado. 
}
