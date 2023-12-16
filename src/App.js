import React from "react";
import Main from "./components/Main";
import Signin from "./components/Signin";
import MovieDetail from "./components/MovieDetail";
import { Route, Routes } from "react-router-dom";
function App() {

  return (
    <>
      <div>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/moviedetail" element={<MovieDetail/>}/>
      </Routes>
    
      </div>
    </>
  )
}

export default App;
