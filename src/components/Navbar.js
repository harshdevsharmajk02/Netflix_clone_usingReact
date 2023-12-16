import React, { useEffect, useState } from "react";
import netflix from "../images/netlflix.png"
import { useNavigate } from "react-router-dom";
import { auth, googleAuth } from "../firebase/setup";
import { signOut } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
const [movies, setMovies] = useState([])
const navigate = useNavigate()

const getMovie = ()=> {
  try{
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=6a779e2f0dc326f0cbb66a0b937fef9e")
    .then(res => res.json())
    .then(json => setMovies(json.results))
  } catch(err){
    console.error(err)
  }
}

const signinClick = ()=>{
navigate("/signin")
}

const logout = async()=>{
  try {
    await signOut(auth)
    navigate("/")
    toast.success("Logout successfully",{
      theme:"dark"
    })
  } catch (err) {
    console.error(err)
  }
}

useEffect(()=> {
  getMovie()
},[])


  return (
   <div style={{backgroundImage: `linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/w500${movies[3]?.poster_path})`,
    backgroundPosition: "center", backgroundRepeat:"no-repeat", backgroundSize:"cover",height:"400px", width:"100%"}}>
    <ToastContainer autoClose={2000}/>
    <div style={{display:"flex", justifyContent:"space-between", padding:"20px"}}>
<img style={{width: "90px", height:"60px"}} src={netflix}/>
<div>
   {auth.currentUser?.emailVerified ? <button onClick={logout} color='error' variant='contained' style={{width: "90px", height:"45px"}}>log out</button>
  : <button onClick={signinClick} color='error' variant='contained' style={{width: "90px", height:"45px"}}>sign in</button>
   }</div>
   </div>
   <div style={{padding: "20px"}}>
    <h1 style={{color: "#F1F1F1", fontSize:"70px", fontFamily:"initial"}}>{movies[3]?.original_title}</h1>
    
    <button variant='contained' sx={{color:"black", bgcolor:"white", fontWeight:"bold"}}>View Trailer</button>
    </div>
 </div>  
  )
     
  
}

export default Navbar;