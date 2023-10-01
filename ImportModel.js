import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function() {
  const [imageURL, setImageURL] = useState(null);
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const formData = new FormData();
      formData.append('Image', file);

      console.log(formData)
  
      try {
        const response = await axios.post('http://localhost:3001/model/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 200) {
          const { imageURL } = response.data;
          setImageURL(imageURL);
        } else {
          console.error('Image upload failed:', response.data.error);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div className="window">

 <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />

<button
  className="import-btn"
  onClick={() => document.querySelector('input[type="file"]').click()}
>
  Import Scan
</button>

{imageURL && (
        <div className="modelview">
          <img src="" alt="Uploaded" />
        </div>
      )}

    </div>
  );







}
