import React from 'react';  

const Contador = () => {  
    const [count, setCount] = React.useState(0);  

    return (  
        <div className="text-center">  
            <h2>Contador: {count}</h2>  
            <button className="btn btn-success" onClick={() => setCount(count + 1)}>Incrementar</button>  
            <button className="btn btn-danger" onClick={() => setCount(count - 1)}>Decrementar</button>  
        </div>  
    );  
};  

export default Contador;  
