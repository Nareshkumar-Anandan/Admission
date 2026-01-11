import React, { useEffect, useRef } from 'react';
import '../Styles/TopRecruiters.css';

// Use import.meta.glob to explicitly import all images in the Re directory
const globLogos = import.meta.glob('../assets/Re/*.{png,svg,jpg,jpeg,webp,PNG,SVG,JPG,JPEG,WEBP}', { eager: true });

const TopRecruiters = () => {
  const logosSlideRef = useRef(null);

  const getReImage = (name) => {
    // Construct the lookup key which matches the glob pattern key
    const path = `../assets/Re/${name}`;
    const module = globLogos[path];
    if (!module) {
      console.error(`Image not found: ${name}`);
      return null;
    }
    // Handle both default export (if generic module) or direct string (if asset)
    return module.default || module;
  };

  const recruiterLogos = [
    { src: getReImage('1547717527_Atos_Brand_Logo-Blue updated.svg'), alt: 'Infosys' },
    { src: getReImage('Ashok-Leyland-Logo.webp'), alt: 'Ashok Leyland' },
    { src: getReImage('amazon-logo-1.webp'), alt: 'Amazon' },
    { src: getReImage('Bosch-Logo.webp'), alt: 'Bosch' },
    { src: getReImage('Capgemini_201x_logo.webp'), alt: 'Capgemini' },
    { src: getReImage('Cognizant_Logo.svg'), alt: 'Cognizant' },
    { src: getReImage('Css-corp-logo.webp'), alt: 'Css Corp' },
    { src: getReImage('ducen-it_owler_20191129_065751_original.svg'), alt: 'Ducen' },
    { src: getReImage('ellucian_1724693466942.svg'), alt: 'Ellucian' },
    { src: getReImage('Wipro_Primary_Logo_Color_RGB.webp'), alt: 'Wipro' },
    { src: getReImage('Ford_logo_flat.webp'), alt: 'Ford' },
    { src: getReImage('HCL-logo.webp'), alt: 'HCL' },
    { src: getReImage('ibm-logo-2.svg'), alt: 'IBM' },
    { src: getReImage('logo.svg'), alt: 'Logo' },
    { src: getReImage('ZOHO_logo_2023.webp'), alt: 'Zoho' },
    { src: getReImage('Zifo-Logo.webp'), alt: 'Zifo' },
    { src: getReImage('tessolve-logo-20-june.svg'), alt: 'Tessolve' },
    { src: getReImage('Tech_Mahindra-Logo.wine.webp'), alt: 'Tech Mahindra' },
    { src: getReImage('Tata_Consultancy_Services_Logo.webp'), alt: 'TCS' },
    { src: getReImage('Roots-logo.webp'), alt: 'Roots' },
    { src: getReImage('reliance-industries.webp'), alt: 'Reliance' },
    { src: getReImage('pngwing.com (6).webp'), alt: 'Pngwing' },
    { src: getReImage('pngimg.com - samsung_logo_PNG6.svg'), alt: 'Samsung' },
    { src: getReImage('pngegg.webp'), alt: 'Pngegg' },
    { src: getReImage('Oracle-Logo.webp'), alt: 'Oracle' },
    { src: getReImage('NTT-Data-Logo.webp'), alt: 'NTT Data' },
    { src: getReImage('mrf.svg'), alt: 'MRF' },
    { src: getReImage('mind_tree_logo_freelogovectors.net_.webp'), alt: 'Mindtree' },
    { src: getReImage('McKinsey_&_Company-Logo.wine.webp'), alt: 'McKinsey' },
    { src: getReImage('LTI_Lets_solve.webp'), alt: 'LTI' }
  ];

  // Duplicate logos for seamless infinite scroll
  const allLogos = [...recruiterLogos, ...recruiterLogos];

  // Pause animation on hover
  useEffect(() => {
    const logosSlide = logosSlideRef.current;
    if (!logosSlide) return;

    const handleMouseEnter = () => {
      logosSlide.style.animationPlayState = 'paused';
    };

    const handleMouseLeave = () => {
      logosSlide.style.animationPlayState = 'running';
    };

    logosSlide.addEventListener('mouseenter', handleMouseEnter);
    logosSlide.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      logosSlide.removeEventListener('mouseenter', handleMouseEnter);
      logosSlide.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="top-recruiters section-offset" id="topRecruiters">
      <h2>TOP RECRUITERS</h2>

      <div className="recruiter-logos">
        <div
          className="logos-slide"
          ref={logosSlideRef}
          style={{ animation: 'scroll-logos 30s linear infinite' }}
        >
          {allLogos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRecruiters;