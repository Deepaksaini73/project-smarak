import React from 'react';
import Image from 'next/image';
import './footer.css';
import img2 from '../../../assets/footer-2.jpg';

const Card = ({ imgSrc, imgName }) => {
  return (
    <div className="card-box">
      <div className="img-box">
        <Image src={imgSrc} alt="nit logo" />
        <p className="img-name">{imgName}</p>
      </div>
    </div>
  );
};

export default Card;
