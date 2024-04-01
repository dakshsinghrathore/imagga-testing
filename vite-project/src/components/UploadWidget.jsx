import React, { useState } from 'react'
import { useEffect, useRef } from 'react';
import 

function UploadWidget() {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const [images, setImage] = useState([]);
  const [body, setBody] = useState([]);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dbvtanb1c",
        uploadPreset: "antaragyps",
      },
      function (error, result) {
        if ((result?.info === "shown") && result?.event === "display-changed") {
          setImage([]);
          return;
        } else if (result.event === "success") {
          setImage(prev => [...prev, result?.info?.url])
        }

      }
    );
  }, []);

  return (
    <div >
      <div style={{ display: "flex", justifyContent: "center" }}>

        <button style={{ width: "fit-content", border: "1px solid white" }} onClick={() => widgetRef.current.open()}>Upload</button>
      </div>
      <div style={{ width: "400px", height: "400px", border: "2px solid white" }}>
        {
          images.map((image)=>(
            <div>{image}</div>
          ))
        }
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>

        <button style={{ width: "fit-content", border: "1px solid white" }}
        >Search</button>
      </div>
      <div style={{ display: "flex" , width: "100px", justifyContent: "center" }}>

        url a gaya per index.js se image ko fetch karne pe error a raha hai<br/> wo apka sar dard hai good bye !!!
      </div>
    </div>
  )
}

export default UploadWidget
