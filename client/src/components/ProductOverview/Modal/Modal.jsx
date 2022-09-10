import React, { useState, useEffect, useRef } from 'react';
import modalStyles from './Modal.module.css';

import styled from 'styled-components';

const Container = styled.div`
  cursor: crosshair;
  position: relative;
  overflow: hidden;
  display: block;
  padding: 30px;
  height: 72vh;
`;

const Image = styled.img.attrs((props) => ({
  src: props.source
}))``;

const Target = styled(Image)`
  width: 250%;
  height: 250%;
  position: absolute;
  left: ${(props) => props.offset.left}px;
  top: ${(props) => props.offset.top}px;
  opacity: ${(props) => props.opacity};
`;

export default function Modal({ currentStyles, setShowModal }) {
  const [productImages, setProductImages] = useState([]);
  const [currentImage, setCurrentImage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const [currentThumbnail, setCurrentThumbnail] = useState('');

  const sourceRef = useRef(null);
  const targetRef = useRef(null);
  const containerRef = useRef(null);

  const [opacity, setOpacity] = useState(0);
  const [offset, setOffset] = useState({ left: 0, top: 0 });

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const handleMouseMove = (e) => {
    const targetRect = targetRef.current.getBoundingClientRect();
    const sourceRect = sourceRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const xRatio = (targetRect.width - containerRect.width) / sourceRect.width;
    const yRatio = (targetRect.height - containerRect.height) / sourceRect.height;

    const left = Math.max(
      Math.min(e.pageX - sourceRect.left, sourceRect.width),
      0
    );
    const top = Math.max(
      Math.min(e.pageY - sourceRect.top, sourceRect.height),
      0
    );

    setOffset({
      left: left * -xRatio,
      top: top * -yRatio,
    });
  };

  useEffect(() => {
    //
    if (Object.keys(currentStyles).length !== 0) {
      setProductImages(currentStyles.photos);
      if (productImages.length !== 0) {
        setCurrentIndex(0);
        setCurrentImage(productImages[currentIndex].url);
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

  // const [magnify, setMagnify] = useState(false);

  // const handleMagnify = () => {
  //   setMagnify(!magnify);
  // };

  return(
    <>
      <button
        className={modalStyles.button}
        onClick={() => {setShowModal(false)}}>
        <span style={{ margin: '10px', color: 'grey' }}>X</span>
      </button>
      <div className={modalStyles.modal}>
          <div className={modalStyles.imgContainer}>
            {currentIndex === 0 ? <div className={modalStyles.leftArrow}></div> : <div className={modalStyles.leftArrow} onClick={handlePreviousImg}>❮</div>}
            {/* IMAGE */}
            <Container
              ref={containerRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <Image ref={sourceRef} alt="source" source={currentImage} />
              <Target
                ref={targetRef}
                alt="target"
                opacity={opacity}
                offset={offset}
                source={currentImage}
              />
            </Container>
            {/* <div className={modalStyles.zoom}> */}
              {/* {magnify ? <img className={modalStyles.image} src={currentImage} style={{ transform: 'scale(2.5) translate(20%, 25%)' }} onClick={() => {handleMagnify()}}/> : <img className={modalStyles.image} src={currentImage} onClick={() => {handleMagnify()}}/>} */}
            {currentIndex === productImages.length - 1 ? <div className={modalStyles.rightArrow}></div> : <div className={modalStyles.rightArrow} onClick={handleNextImg}>❯</div>}
          </div>
        <div className={modalStyles.thumbnailRow}>
          {productImages.map((productImage, index) => (
            <div className={modalStyles.thumbs} onClick={() => {handleThumbnailClick(index)}} key={index} id={index} productimage={productImage} style={{ backgroundImage: `url(${productImage.thumbnail_url})`, border: currentIndex === index ? '5px solid lightseagreen' : '' }} />))}
        </div>
      </div>
    </>
  );
}
