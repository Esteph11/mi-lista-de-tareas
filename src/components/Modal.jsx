import React from 'react';  
import { Modal as BootstrapModal } from 'react-bootstrap';  

const Modal = ({ isOpen, onClose, children }) => (  
    <BootstrapModal show={isOpen} onHide={onClose} centered>  
        <BootstrapModal.Header closeButton>  
            <BootstrapModal.Title>Título del Modal</BootstrapModal.Title>  
        </BootstrapModal.Header>  
        <BootstrapModal.Body>{children}</BootstrapModal.Body>  
        <BootstrapModal.Footer>  
            <button className='btn btn-secondary' onClick={onClose}>Cerrar</button>  
        </BootstrapModal.Footer>  
    </BootstrapModal>  
);  

export default Modal;  
