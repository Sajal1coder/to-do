import './login.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
function RegisterPage(){
 const navigate=useNavigate();
 const [error,setError]=useState(''); 
 const {login}=useAuth();
 const handleSubmit=async(event)=>{
  try{
    event.preventDefault();
    const name=event.target.name.value;
    const email=event.target.email.value;
    const password=event.target.password.value;
    const confirmPassword=event.target.confirmPassword.value;
    if(password!==confirmPassword){
      alert("Password not matched");
      return;
    }
    const response=await fetch("http://localhost:5000/api/auth/register",{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({name,email,password}),
    });
    const data=await response.json();
    if(response.ok){
      login(data.token);
        navigate("/todo");
        alert("Register successful");
     
    }
    else{
      console.error("Register Failed : server responded with an error");
      setError(data.message || "Retry");
    }
  }catch(error){
    console.error("Register request failed:",error.message);
    setError(error.message);
  }
 };
 return(
     <>
    <div className="login-container">
      <a className='gradient-text'><h2>To-Do</h2></a>
      <form className="login-form" onSubmit={handleSubmit}>
         <label>Name</label>
     
        <input type="text" name="name" placeholder='Enter your Name'required />
        <br/>
        <label>Email</label>
     
        <input type="Email" name="email" placeholder='Enter your Email'required />
        <br/>
        <label>Password</label>
        <input type="password" name="password" placeholder='Choose your Password' required />
        <br/>
        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" placeholder='Re-enter your Password' required />
        <br/>
        {error && <p className="error" style={{color: 'red', margin: '10px 0'}}>{error}</p>}
        <button type="submit" >Create Account</button>
      </form>
      <br/>
      <p>
      Already have an account ? 
      <a href="/">Login Now </a>
    </p>
    </div>
    </>)
};
export default RegisterPage;