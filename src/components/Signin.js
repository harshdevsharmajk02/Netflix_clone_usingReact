import React from "react";
import { signInWithPopup } from "firebase/auth";
import netflix from "../images/netlflix.png"
import { auth, googleAuth } from "../firebase/setup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function Signin() {

    const navigate = useNavigate()

    const googleSignin = async () => {
        try {
            await signInWithPopup(auth,googleAuth)
 setTimeout(()=> {
    auth.currentUser?.emailVerified && navigate("/")
 },2000)
           toast.success("Signed In successfully",{
            theme:"dark"
           })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div style={{backgroundColor:"#181818", height:"100vh", padding: "20px"}}>
        <ToastContainer autoClose={2000}/>
        <img style={{width:"100px", height:"70px"}} src={netflix}/>
        <div style={{position:"fixed", left:"45%", top:"35%"}}>
        <button onClick={googleSignin} variant = 'contained' color= 'Red' >Sign In with Google</button>
        <br/>
        <h2 style={{color:"white"}}>Let's start <br/>to explore movies<br/>from here.</h2>
        </div>
        </div>
    )
}

export default Signin