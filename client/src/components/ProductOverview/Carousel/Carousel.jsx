import React from 'react';
import carouselstyles from './Carousel.module.css';

export default function Carousel() {
  return (
    <div className={carouselstyles.imagegallery}>
      <div className={carouselstyles.thumbnailrow}>
        thumbnails
      </div>
    </div>
  );
}