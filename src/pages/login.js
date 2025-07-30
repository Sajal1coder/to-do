import './login.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
function LoginPage(){
  const navigate=useNavigate();
  const [error,setError]=useState('');
  const {login}=useAuth();
  const handleSubmit=async(event)=>{
    event.preventDefault();
    const email=event.target.email.value;
    const password=event.target.password.value;
    setError('');
    try{
      const response=await fetch("http://localhost:5000/api/auth/login",{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({email,password})
      });
      const data=await response.json();
      if(response.ok){
       
        login(data.token);
          navigate('/todo');
       
      }else{
        console.error("Login Failed : server responded with an error");
        setError(data.message || 'Invalid email or password');
      }
    }catch(error){
      console.error('login request failed:',error.message);
      setError( error.message);

    }
  }
   return(
     <>
    <div className="login-container">
      <a className='gradient-text'><h2>To-Do</h2></a>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Email</label>
     
        <input type="text" name="email" placeholder='Enter your Email'required />
        <br/>
        <label>Password</label>
        <input type="password" name="password" placeholder='Enter your Password' required />
        <br/>
        {error && <p className="error" style={{color: 'red', margin: '10px 0'}}>{error}</p>}
        <button type="submit">Sign In</button>
      </form>
      <br/>
      <p>
      Don't have an account ? 
      <a href="/register">Create One Now </a>
    </p>
    </div>
    </>)
};
export default LoginPage;