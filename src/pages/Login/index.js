import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import  {auth}  from "../../firebase";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
  
    const signIn = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, 'user@example.com', '1Password' )
        .then((userCredential) => {
          console.log(userCredential);
          navigate('/upload')
        })
        .catch((error) => {
          console.log(error);
        });
    };

return (
<div className="sign-in-container">
      <form onSubmit={signIn}>
        <h1>Log In to your Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/>
        <br/>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
        <br/>
        <button type="submit">Log In</button>
      </form>
    </div>
);
}

export default Login;