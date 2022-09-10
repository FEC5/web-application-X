import React, { useState, useEffect } from 'react';
import carouselstyles from './Carousel.module.css';

export default function Carousel({ currentStyles, setShowModal }) {
  const [productImages, setProductImages] = useState([]);
  const [currentImage, setCurrentImage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [borderSpec, setBorderSpec] = useState('none');

  const [currentThumbnail, setCurrentThumbnail] = useState('');

  useEffect(() => {
    //
    if (Object.keys(currentStyles).length !== 0) {
      setProductImages(currentStyles.photos);
      if (productImages.length !== 0) {
        setCurrentIndex(0);
        setCurrentImage(productImages[currentIndex].url);
        setCurrentThumbnail(productImages[currentIndex].url);
      }
    }
  }, [currentStyles, productImages]);

  const handlePreviousImg = () => {
    const isFirst = currentIndex === 0;
    const newIndex = isFirst ? productImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setCurrentImage(productImages[newIndex].url);
    setCurrentThumbnail(productImages[newIndex].thumbnail_url);
  };

  const handleNextImg = () => {
    const isLast = currentIndex === productImages.length - 1;
    const newIndex = isLast ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setCurrentImage(productImages[newIndex].url);
    setCurrentThumbnail(productImages[newIndex].thumbnail_url);
  };

  const handleThumbnailClick = (index) => {
    setCurrentThumbnail(productImages[index].thumbnail_url);
    setCurrentIndex(index);
    setCurrentImage(productImages[index].url);
  };

  const hideLeftArrow = <div className={carouselstyles.leftArrow}></div>;
  const showLeftArrow = <div className={carouselstyles.leftArrow} onClick={handlePreviousImg}>❮</div>;

  const hideRightArrow = <div className={carouselstyles.rightArrow}></div>;
  const showRightArrow = <div className={carouselstyles.rightArrow} onClick={handleNextImg}>❯</div>;

  return (
    <div className={carouselstyles.imageGallery} style={{ backgroundImage: `url(${currentImage})`}}>
      <div className={carouselstyles.thumbnailRow}>
        {productImages.map((productImage, index) => (
          <div
            className={carouselstyles.thumbnail}
            onClick={() => {handleThumbnailClick(index)}}
            key={index}
            id={`thumbnail-${index}`}
            tabIndex="1"
            productimage={productImage}
            style={{ backgroundImage: `url(${productImage.thumbnail_url})`, border: currentIndex === index ? '3px solid lightseagreen' : '' }}
          />))}
      </div>
      <div className={carouselstyles.arrows}>
        {currentIndex === 0 ? hideLeftArrow : showLeftArrow}
        {currentIndex === productImages.length - 1 ? hideRightArrow : showRightArrow}
      </div>
      <div
        className={carouselstyles.lightbox}
        onClick={() => {setShowModal(true)}}
      />
    </div>
  );
}
