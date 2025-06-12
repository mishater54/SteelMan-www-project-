import React, { useState } from "react";
import "./Photo.css";

import Photo1 from "../../assets/1.png";
import Photo2 from "../../assets/2.png";
import Photo3 from "../../assets/3.png";
import Photo4 from "../../assets/4.png";
import Photo5 from "../../assets/5.png";
import Photo6 from "../../assets/6.png";

const Photo = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const photos = [
    {
      id: 1,
      src: Photo1,
      alt: "Cycling adventure in nature",
      title: "Mountain Biking",
    },
    {
      id: 2,
      src: Photo2,
      alt: "Rock climbing adventure",
      title: "Rock Climbing",
    },
    {
      id: 3,
      src: Photo3,
      alt: "Water sports activity",
      title: "Water Adventures",
    },
    {
      id: 4,
      src: Photo4,
      alt: "Mountain hiking at sunset",
      title: "Mountain Hiking",
    },
    {
      id: 5,
      src: Photo5,
      alt: "Beach activities at sunset",
      title: "Beach Sports",
    },
    {
      id: 6,
      src: Photo6,
      alt: "Fire performance art",
      title: "Fire Performance",
    },
  ];

  const openModal = (photo) => {
    setSelectedImage(photo);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="photo-gallery">
      <div className="photo-container">
        <div className="photo-grid">
          {photos.map((photo) => (
            <div key={photo.id} className="photo-item">
              <img src={photo.src} alt={photo.alt} className="photo-image" />
              <div className="photo-overlay">
                <h3 className="photo-title">{photo.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Photo;
