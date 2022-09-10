import React, { useState, useEffect } from 'react';
import selectionStyles from './Selection.module.css';

import axiosConfig from '../../../../../axiosConfig.js';

export default function Selection({ styles, currentStyles, setCurrentStyles }) {
  const [currentSelected, setCurrentSelected] = useState(0);

  useEffect(() => {
    //
    console.log('currentSelected... ', currentSelected);
  }, [styles, currentStyles]);

  const handleClick = (index, style) => {
    setCurrentStyles(style);
    setCurrentSelected(index);
  }

  return(
    <div className={selectionStyles.productSelection}>
      <h3>STYLE > <span>{currentStyles.name}</span></h3>
      <div className={selectionStyles.selectionContainer}>
        {styles.map((style, index) =>
        <img
          className={selectionStyles.selectionOption}
          key={index} src={style.photos[0].thumbnail_url}
          id={index}
          onClick={() => {handleClick(index, style)}}
          style={{ border: currentSelected === index ? '3px solid lightseagreen' : '' }}
        />)}
      </div>
    </div>
  );
}