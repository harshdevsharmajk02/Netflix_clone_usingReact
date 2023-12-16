import { Button, Grid, TextField, collapseClasses } from "@mui/material";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { auth, database } from "../firebase/setup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Trailer from "./Trailer";

function MovieDetail() {
  const location = useLocation();

  const [review,setReview] = useState(); 
  const[reviewData, setReviewData] = useState([]);

  const movieRef = doc(database,"Movies",`${location.state?.movie.id}`)
const reviewRef = collection(movieRef, "Reviews")

  const AddReview = async()=>{
    try{
    auth.currentUser && await addDoc(reviewRef, {
   movieReview: review,
   email: auth.currentUser?.email,
   username:auth.currentUser?.displayName,
   profile_image:auth.currentUser?.photoURL
    })
  auth.currentUser ?  toast.success("review added successfully",
    {theme:"dark"})
    :toast.warning("Please log in")
    }catch(err){
        console.error(err)
    }
   
  }

  const ShowReview = async()=> {
    try {
      const data =   await getDocs(reviewRef)
       const filteredData = data.docs.map((doc)=>(
        {
            ...doc.data(),
            id:doc.id
        }))
        setReviewData(filteredData)
    } catch (error) {
        console.log(error)
    }
    
}
  useEffect(()=>{
    ShowReview()
        },[])

        
  return (
    <Grid container  sx={{ padding: "20px" }}>
      {/* Left grid with movie information */}
      <Grid item xs={8}>
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${location.state?.movie?.poster_path})`,
            height: "100vh",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        >
        <ToastContainer autoClose={2000}/>
          <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)" }}>
            <h1 style={{ color: "red", fontSize: "50px", margin: 0 }}>{location.state?.movie?.original_title}</h1>
            <div style={{ display: "flex", color: "white" }}>
              <p style={{ marginRight: "20px" }}>Language: {location.state?.movie?.original_language}</p>
              <p>Release date: {location.state?.movie?.release_date}</p>
            </div>
            <p style={{ color: "white", fontWeight: "100", fontSize: "18px" }}>{location.state?.movie?.overview}</p>
            {/* <Button variant="contained" sx={{ color: "black", bgcolor: "white" }}>Play Trailer</Button> */
            <Trailer location={location} />}
          </div>
        </div>
      </Grid>

      {/* Right grid with review section */}
      <Grid item xs={4}>
        <div style={{ backgroundColor: "white", height: "100vh", padding: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h5
               style={{ color: "#A4A4A4", fontWeight:"100" }}>ADD REVIEW</h5>
              <TextField onChange={(e)=> setReview(e.target.value)}  size="small" label="Review" variant="outlined" style={{backgroundColor:"white", borderRadius:"5px"}} />
              <Button onClick={AddReview} sx={{ margin: "10px", bgcolor: "red", color: "white" }} variant="contained">Submit</Button>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <div>
                <h5 style={{ color: "#A4A4A4" }}>REVIEW</h5>
                {reviewData.map((each)=>{
                    return<>
                    <div style={{display:"flex"}}>
                    <img style={{width:"20px", borderRadius:"50px"}} src={each.profile_image}/>
                      <li style={{color:"grey", paddingLeft:"10px"}}>{each.username}</li>  
                      </div>
                      <h6  style={{color:"grey"}}>{each.movieReview}</h6>
                    </>
                })}
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}

export default MovieDetail;
