import React, { useState, useEffect } from 'react';
import '../Styles/Gallery.css';
import dsc00476 from '../assets/DSC00476.webp';
import dsc00453 from '../assets/DSC00453.webp';
import dsc00437 from '../assets/DSC00437.webp';
import hicas01 from '../assets/HICAS-01.webp';
import hicet01 from '../assets/HICET-01.webp';
import img0809 from '../assets/IMG_0809.webp';

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [
    {
      src: dsc00476,
      alt: 'Gallery 1',
      className: 'gallery-image img-wide'
    },
    {
      src: dsc00453,
      alt: 'Gallery 2',
      className: 'gallery-image img-tall'
    },
    {
      src: dsc00437,
      alt: 'Gallery 3',
      className: 'gallery-image'
    },
    {
      src: img0809,
      alt: 'Gallery 4',
      className: 'gallery-image img-wide'
    },
    {
      src: hicas01,
      alt: 'Gallery 5',
      className: 'gallery-image img-tall'
    },
    {
      src: dsc00453,
      alt: 'Gallery 6',
      className: 'gallery-image'
    },
    {
      src: hicet01,
      alt: 'Gallery 7',
      className: 'gallery-image img-wide'
    }
  ];

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  const goToPrevious = () => {
    setCurrentImageIndex(prev =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex(prev =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  // Close lightbox when clicking outside the image
  const handleLightboxClick = (e) => {
    if (e.target.classList.contains('lightbox')) {
      closeLightbox();
    }
  };

  return (
    <div className="gallery-container section-offset" id="gallerySection">
      <h1 className="gallery-title">Infrastructure</h1>

      <div className="gallery">
        {galleryImages.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={image.className}
            onClick={() => openLightbox(index)}
            loading="lazy"
          />
        ))}
      </div>

      {/* Lightbox */}
      <div
        className={`lightbox ${lightboxOpen ? 'active' : ''}`}
        id="lightbox"
        onClick={handleLightboxClick}
      >
        <span className="close-btn" id="closeBtn" onClick={closeLightbox}>
          &times;
        </span>
        <span className="nav-btn prev-btn" id="prevBtn" onClick={goToPrevious}>
          &#10094;
        </span>
        <img
          id="lightboxImg"
          src={galleryImages[currentImageIndex]?.src}
          alt={galleryImages[currentImageIndex]?.alt}
        />
        <span className="nav-btn next-btn" id="nextBtn" onClick={goToNext}>
          &#10095;
        </span>
      </div>
    </div>
  );
};

export default Gallery;