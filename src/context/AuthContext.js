import { createContext,useState,useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext=createContext();
 export const AuthProvider=({children}) =>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true); 
   
    useEffect(()=>{
        const token=localStorage.getItem('token');
        if(token){
            setUser({token});
        }
        setLoading(false);
    },[]);
    const login=(token)=>{
        localStorage.setItem('token',token);
        setUser({token});
    };
    const logout=()=>{
        localStorage.removeItem('token');
        setUser(null);
    };

    const value={
        user,
        isAuthenticated:!!user,
        login,
        logout,
    };
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
 };
 export const useAuth=()=>{
    return useContext(AuthContext);
 };

 export const ProtectedRoute=({children})=>{
    const {isAuthenticated,loading}=useAuth();
    const navigate=useNavigate();
    useEffect(()=>{
        if(!loading && !isAuthenticated){
            navigate('/');
        }
    },[loading,isAuthenticated]);
    if(loading){
        return <div>Loading...</div>
    }
    return isAuthenticated?children:null;
 };

 export const PublicRoute =({children})=>{
    const {isAuthenticated,loading}=useAuth();
    const navigate=useNavigate();
    useEffect(()=>{
        if(!loading && isAuthenticated){
            navigate('/todo');
        }
    },[loading,isAuthenticated]);
    if(loading){
        return <div>Loading...</div>
    }
    return !isAuthenticated?children:null;
 }