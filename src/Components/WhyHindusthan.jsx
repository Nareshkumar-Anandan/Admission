import React from 'react';
import '../Styles/WhyHindusthan.css';
import whyHindusthanImg from '../assets/whyhindusthan.webp';
import CollaborationSlider from './CollaborationSlider';
const WhyHindusthan = () => {
  const reasons = [
    { number: '01', text: 'International Collaboration' },
    { number: '02', text: 'Global Exposure' },
    { number: '03', text: 'Industry Ready Integrated Programmes' },
    { number: '04', text: 'Experiential and Collaborative Learning' },
    { number: '05', text: 'Explore Innovation in Multidisciplinary Teams' },
    { number: '06', text: 'Career Transition Programmes' },
    { number: '07', text: 'Scholarship and Financial Aids' },
    { number: '08', text: 'Entrepreneurship Development' },
    { number: '09', text: 'Global Research Partnerships' },
    { number: '10', text: 'Holistic Development Environment' },
  ];

  return (
    <section className="hindusthan-great section-offset" id="whyHindusthan">
      <div className="admission-head">
        <h2>
          The Excellence of Hindusthan Becomes{' '}
          <span style={{ color: '#f5b220' }}>the Strength of Your Future.</span>
        </h2>
      </div>
      <div className="admission-para-image-container">
        <div className="admission-para">
          <p>
            "Education is the passport for the future, for tomorrow belongs to those who prepare for it today".
          </p>
          <p>
            As the world progresses, the emergence of new industries, technologies, processes, products and services are inevitable.
            With it, comes the need for professionals or employees with knowledge and skillset required for this work.
          </p>
          <p>
            HEI prides itself in providing quality education with an industry-driven curriculum directed to employment. With the
            growing demand for knowledgeable and skillful professionals across various industries. HEI prepares its students by giving
            courses and training programs that meet the standards of different businesses.
          </p>
          <p>
            HEI establishes, maintains, and promotes partnerships with the legitimate members of the industry to increase
            its students employability under the institutional linkages as the "HINDUSTHAN" brand is very familiar in the Field of
            Engineering and Health Care.
          </p>
        </div>
        <div className="admission-image">
          <img src={whyHindusthanImg} alt="why hindusthan" />
        </div>
      </div>
<CollaborationSlider />
      {/* Reason to be on board */}
      <section className="reason-container">
        {reasons.map((reason) => (
          <div key={reason.number} className="reason-box">
            <div className="reason-number">{reason.number}</div>
            <p>{reason.text}</p>
          </div>
        ))}
      </section>
    </section>
  );
};

export default WhyHindusthan;