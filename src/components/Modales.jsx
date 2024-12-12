import { useState } from 'react';  
import Modal from './Modal';  
import Contador from './Contador';  
import Formulario from './ContactForm';  

const Modales = () => {  
    const [mostrar, setMostrar] = useState(false);  
    const [verContador, setVerContador] = useState(false);  
    const [verFormulario, setVerFormulario] = useState(false);  

    return (  
        <div className="container">  
            <h1 className="text-center my-4">Modales</h1>  
            <button className="btn btn-success m-2" onClick={() => setMostrar(true)}>Ver Modal</button>  
            <Modal isOpen={mostrar} onClose={() => setMostrar(false)}>  
                <h2>Prueba de Children</h2>  
                <h4>Segundo Componente</h4>  
                <button className='btn btn-danger' onClick={() => setMostrar(false)}>Cerrar</button>  
            </Modal>  

            <button className="btn btn-success m-2" onClick={() => setVerContador(true)}>Ver Contador</button>  
            <Modal isOpen={verContador} onClose={() => setVerContador(false)}>  
                <Contador />  
                <button className='btn btn-danger' onClick={() => setVerContador(false)}>Cerrar</button>  
            </Modal>  

            <button className="btn btn-success m-2" onClick={() => setVerFormulario(true)}>Ver Formulario</button>  
            <Modal isOpen={verFormulario} onClose={() => setVerFormulario(false)}>  
                <Formulario />  
                <button className='btn btn-danger' onClick={() => setVerFormulario(false)}>Cerrar</button>  
            </Modal>  
        </div>  
    );  
}  

export default Modales;  