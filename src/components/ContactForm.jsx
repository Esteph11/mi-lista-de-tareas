import React from 'react';  

const ContactForm = () => {  
    const [name, setName] = React.useState('');  
    const [email, setEmail] = React.useState('');  

    const handleSubmit = (e) => {  
        e.preventDefault();  
        // Implementar la lógica de envío aquí  
    };  

    return (  
        <form onSubmit={handleSubmit}>  
            <div className="mb-3">  
                <label htmlFor="name" className="form-label">Nombre</label>  
                <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />  
            </div>  
            <div className="mb-3">  
                <label htmlFor="email" className="form-label">Email</label>  
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />  
            </div>  
            <button type="submit" className="btn btn-primary">Enviar</button>  
        </form>  
    );  
};  

export default ContactForm;  
