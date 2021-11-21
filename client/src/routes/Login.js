import '../css/login.css'

import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';

export default function Login(props) {
    const [isRegister, setIsRegister] = useState(true);
    let navigate = useNavigate();

    function handleIsRegisterState(event) {
        if (event.target.innerText === "Connexion") {
            setIsRegister(false);
        } else {
            setIsRegister(true);
        }
    }

    function handleLogState(event) {
        event.preventDefault();
        props.setIsLoginPage(false);
        navigate('/');
    }

    return (
        <div className="form-container">

            <form className={isRegister ? "hidden" : ""} onSubmit={handleLogState}>

                <div className="form-field">
                    <FaEnvelope className="icon" />
                    <input value="test@test.fr" name="email" type="email" autoComplete="off" placeholder="Email" spellCheck="false" required />
                </div>

                <div className="form-field">
                    <FaLock className="icon" />
                    <input value="test" name="password" type="password" placeholder="Mot de passe" spellCheck="false" required />
                </div>

                <p className="form-link" onClick={handleIsRegisterState}>Créer un compte</p>

                <div className="form-field">
                    <button className="form-btn" type="submit">Connexion</button>
                </div>

            </form>

            <form className={isRegister ? "" : "hidden"} onSubmit={handleLogState}>

                <div className="form-field">
                    <FaUser className="icon" />
                    <input name="username" type="text" autoComplete="off" placeholder="Pseudo" spellCheck="false" required />
                </div>

                <div className="form-field">
                    <FaEnvelope className="icon" />
                    <input name="email" type="email" autoComplete="off" placeholder="Email" spellCheck="false" required />
                </div>

                <div className="form-field">
                    <FaLock className="icon" />
                    <input name="password" type="password" placeholder="Mot de passe" spellCheck="false" required />
                </div>

                <div className="form-field">
                    <FaLock className="icon" />
                    <input name="password2" type="password" placeholder="Retapez le mot de passe" spellCheck="false" required />
                </div>

                <p className="form-link" onClick={handleIsRegisterState}>Connexion</p>

                <div className="form-field">
                    <button className="form-btn" type="submit">Envoyer</button>
                </div>

            </form>
        </div>
    )
}