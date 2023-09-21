import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios";

function Maps(){

    const [image,setimage]= useState(null);
    const [imagepath,setImagepath]= useState(null);

    const submitImage= async(e) => {
        e.preventDefault();
    
    const formData=new FormData();
    formData.append('image',image);

   const result = await axios.post(
    "http://localhost:3001/map/uploadmap",
    formData,
    {
        headers:{"Content-Type":"multipart/form-data"},
    }
   ).then((response)=>{
    const imagepath = "http://localhost:3001/public/"+response.data.imagename;
    setImagepath(imagepath)
    console.log(imagepath);
   });
};
    const onInputchange=(e)=>{
     
        console.log(e.target.files[0])
        setimage(e.target.files[0]);
    };
    
return(
<div>
<img src={imagepath}/>
    <form onSubmit={submitImage}>
    <h2>
        Upload Floor plan
    </h2>
    <input type="file" accept="image/*" onChange={onInputchange}></input>
    <button type="submit">Submit</button>

</form>
</div>
);
}
export default Maps;

