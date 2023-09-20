import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import  {auth}  from "../../firebase";
import { useNavigate } from 'react-router-dom';
import "./styles.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
  
    const signIn = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, 'user@example.com', '1Password' )
        .then((userCredential) => {
          console.log(userCredential);
          navigate('/dd')
        })
        .catch((error) => {
          console.log(error);
        });
    };

return (
<div className='login'>
            <div className='log-container'>
               <form className='log-form' onSubmit={signIn}>
                 <div className='log-top'>
                  <h2 className='log-h2'> Welcome! </h2> 
                 </div>
                 <label>Email</label>
              <input
                className="login-input-text"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password</label>
              <input
                className="login-input-text"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='log-but'>
              <button className="login-button" type='submit"'>
                Log In
              </button>
              </div>
              <br/>
               </form>
            </div>
        </div>
);
}

export default Login;