import '../css/login.css'

// Import icon
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';

export default function Login() {
    // IsRegister handle if the form had to show register or sign in
    const [isRegister, setIsRegister] = useState(true);

    function handleRegisterState(event) {
        if (event.target.innerText === "Connexion") {
            setIsRegister(false);
        } else {
            setIsRegister(true);
        }
    }

    return (
        <div className="form-container">

            {/* Form selector button */}
            <div className="form-selector">
                <div onClick={handleRegisterState} className={isRegister ? "form-selector__btn --signin" : "form-selector__btn --signin --active"}>Connexion</div>
                <div onClick={handleRegisterState} className={isRegister ? "form-selector__btn --register --active" : "form-selector__btn --register" }>Créer un compte</div>
            </div>

            {/* Sign in form */}
            <form className={isRegister ? "hidden" : ""}>

                <div className="form-field">
                    <FaEnvelope className="icon" />
                    <input className="form-input" value="test@test.fr" name="email" type="email" autoComplete="off" placeholder="Email" spellCheck="false" required />
                </div>

                <div className="form-field">
                    <FaLock className="icon" />
                    <input className="form-input" value="test" name="password" type="password" placeholder="Mot de passe" spellCheck="false" required />
                </div>

                <div className="form-field">
                    <button className="form-btn" type="submit">Connexion</button>
                </div>

            </form>

            {/* Register form */}
            <form className={isRegister ? "" : "hidden"}>

                <div className="form-field">
                    <FaUser className="icon" />
                    <input className="form-input" name="username" type="text" autoComplete="off" placeholder="Pseudo" spellCheck="false" required />
                </div>

                <div className="form-field">
                    <FaEnvelope className="icon" />
                    <input className="form-input" name="email" type="email" autoComplete="off" placeholder="Email" spellCheck="false" required />
                </div>

                <div className="form-field">
                    <FaLock className="icon" />
                    <input className="form-input" name="password" type="password" placeholder="Mot de passe" spellCheck="false" required />
                </div>

                <div className="form-field">
                    <FaLock className="icon" />
                    <input className="form-input" name="password2" type="password" placeholder="Retapez le mot de passe" spellCheck="false" required />
                </div>

                <div className="form-field">
                    <button className="form-btn" type="submit">Envoyer</button>
                </div>

            </form>
        </div>
    )
}