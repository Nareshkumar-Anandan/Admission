// components/CollaborationSlider.jsx
import React from 'react';
import '../Styles/CollaborationSlider.css';

const CollaborationSlider = () => {
  const getICImage = (name) => new URL(`../assets/IC/${name}`, import.meta.url).href;

  const collaborationLogos = [
    { src: getICImage('ACCA.webp'), alt: 'ACCA' },
    { src: getICImage('APU.webp'), alt: 'APU' },
    { src: getICImage('BUC-logo.webp'), alt: 'BUC' },
    { src: getICImage('Brooker.webp'), alt: 'Brooker Group' },
    { src: getICImage('INTI-YourFutureBuiltToday-LOGO_2020.webp'), alt: 'INTI' },
    { src: getICImage('IOA.webp'), alt: 'IOA' },
    { src: getICImage('MITS.webp'), alt: 'MITS' },
    { src: getICImage('MinT.webp'), alt: 'MinT' },
    { src: getICImage('Multimedia_University_logo.svg'), alt: 'Multimedia University' },
    { src: getICImage('RCS.webp'), alt: 'RCS' },
    { src: getICImage('Sunway_logo.webp'), alt: 'Sunway University' },
    { src: getICImage('UniversityOfCyberjaya.webp'), alt: 'University of Cyberjaya' },
    { src: getICImage('aimstUniversity.webp'), alt: 'AIMST University' },
    { src: getICImage('amity.webp'), alt: 'Amity Business School' },
    { src: getICImage('buckinghamshire-new-university-logo-png_seeklogo-609747.svg'), alt: 'Buckinghamshire New University' },
    { src: getICImage('dembidolo.webp'), alt: 'Dembidolo' },
    { src: getICImage('isdc-logo1.webp'), alt: 'ISDC' },
    { src: getICImage('kstvet+final.webp'), alt: 'KSTVET' },
    { src: getICImage('lincoln-university-college-logo-B7C63C5189-seeklogo.com.webp'), alt: 'Lincoln University' },
    { src: getICImage('logo-rcs.webp'), alt: 'RCS' },
    { src: getICImage('taylorsUniversity.webp'), alt: 'Taylors University' },
    { src: getICImage('tribhuvanUniversity.webp'), alt: 'Tribhuvan University' }
  ];

  return (
    <div className="collaboration-slider section-offset" id="international-collaboration">
      <div className="collaboration-track">
        {/* Original logos */}
        {collaborationLogos.map((logo, index) => (
          <img key={`original-${index}`} src={logo.src} alt={logo.alt} />
        ))}
        {/* Duplicate logos for seamless loop */}
        {collaborationLogos.map((logo, index) => (
          <img key={`duplicate-${index}`} src={logo.src} alt={logo.alt} />
        ))}
      </div>
    </div>
  );
};

export default CollaborationSlider;