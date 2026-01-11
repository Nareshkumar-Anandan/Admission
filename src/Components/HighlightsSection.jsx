import React, { useEffect, useState } from 'react';
import '../Styles/HighlightsSection.css';

const HighlightsSection = () => {
  const [counters, setCounters] = useState({
    institutions: 0,
    years: 0,
    collaborations: 0,
    grants: 0,
    graduates: 0,
    currentStudents: 0,
    employees: 0,
    projects: 0,
    clubs: 0,
    jobOffers: 0,
    ideas: 0,
    startups: 0
  });

  const [started, setStarted] = useState(false);

  const targetValues = {
    institutions: 13,
    years: 25,
    collaborations: 11,
    grants: 7,
    graduates: 150000,
    currentStudents: 20000,
    employees: 1500,
    projects: 500,
    clubs: 80,
    jobOffers: 81,
    ideas: 183,
    startups: 64
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('.highlights-section');
      if (!section || started) return;

      const sectionTop = section.offsetTop;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      if (scrollY + windowHeight >= sectionTop + 100) {
        setStarted(true);

        const animateCounters = () => {
          const speed = 50; // smaller = faster

          Object.keys(targetValues).forEach((key) => {
            const target = targetValues[key];
            const increment = target / 100;
            let current = 0;

            const updateCounter = () => {
              if (current < target) {
                current = Math.ceil(current + increment);
                setCounters(prev => ({
                  ...prev,
                  [key]: current
                }));
                setTimeout(updateCounter, speed);
              } else {
                setCounters(prev => ({
                  ...prev,
                  [key]: target
                }));
              }
            };

            updateCounter();
          });
        };

        animateCounters();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [started]);

  const highlights = [
    {
      label: 'Institutions',
      value: counters.institutions,
      suffix: '',
      formatted: counters.institutions
    },
    {
      label: 'Years of empowering young minds',
      value: counters.years,
      suffix: '+',
      formatted: counters.years + '+'
    },
    {
      label: 'International Collaborations',
      value: counters.collaborations,
      suffix: '+',
      formatted: counters.collaborations + '+'
    },
    {
      label: 'Crore grants funded by Government',
      value: counters.grants,
      suffix: '+',
      formatted: counters.grants + '+'
    },
    {
      label: 'Graduates',
      value: counters.graduates,
      suffix: '+',
      formatted: formatNumber(counters.graduates) + '+'
    },
    {
      label: 'Students currently pursuing',
      value: counters.currentStudents,
      suffix: '+',
      formatted: formatNumber(counters.currentStudents) + '+'
    },
    {
      label: 'Employees',
      value: counters.employees,
      suffix: '+',
      formatted: formatNumber(counters.employees) + '+'
    },
    {
      label: 'Design thinking based projects',
      value: counters.projects,
      suffix: '+',
      formatted: counters.projects + '+'
    },
    {
      label: 'Student Clubs',
      value: counters.clubs,
      suffix: '+',
      formatted: counters.clubs + '+'
    },
    {
      label: 'Graduates get job offer while studying',
      value: counters.jobOffers,
      suffix: '%',
      formatted: counters.jobOffers + '%'
    },
    {
      label: 'Industrial ideas submitted for industrial organization',
      value: counters.ideas,
      suffix: '+',
      formatted: counters.ideas + '+'
    },
    {
      label: 'Start Ups',
      value: counters.startups,
      suffix: '+',
      formatted: counters.startups + '+'
    }
  ];

  return (
    <section className="highlights-section section-offset">
      <div className="highlights-container">
        {highlights.map((highlight, index) => (
          <div key={index} className="highlight-box">
            <h3>{highlight.formatted}</h3>
            <p>{highlight.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HighlightsSection;