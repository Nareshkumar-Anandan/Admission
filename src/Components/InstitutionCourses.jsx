// components/InstitutionsCourses.jsx
import React, { useState } from 'react';
import '../Styles/InstitutionsCourses.css';

const InstitutionCourses = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const institutionsData = [
    {
      id: 'hicas',
      name: 'Hindusthan College of Arts & Science (HICAS)',
      courses: [
        { name: 'B.Com - Commerce', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Com - Computer Applications', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Com - Information Technology', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Com - Corporate Secretaryship', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Com - Professional Accounting', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Com - Accounting & Finance', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Com - Banking & Insurance', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Com - International Business', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.C.A - Computer Applications', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.B.A - Business Administration', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.B.A - Computer Applications', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.B.A - Logistics', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.B.A - Business Analytics', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Voc - Graphic Design', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.A - English', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Computer Science', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Information Technology', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Computer Technology', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Computer Science with Cognitive Systems', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Artificial Intelligence & Machine Learning', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Data Science & Analytics', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Computer Science with Cyber Security', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Electronics & Communication Systems', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Biotechnology', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Microbiology', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Food Processing Technology & Management', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Physics', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Animation & Visual Effects', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Visual Communication', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Catering Science & Hotel Management', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Costume Design & Fashion', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Mathematics', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Psychology', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'M.Sc - Biotechnology', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'M.Sc - Microbiology', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'M.Sc - Computer Science', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'M.Sc - Information Technology', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'M.Sc - Electronics & Communication Systems', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'M.Sc - Physics', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'M.Sc - Costume Design & Fashion', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'M.Sc - Mathematics', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'M.Sc - Visual Communication', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'M.Sc - Applied Psychology', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'M.A - English', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'M.S.W - Master of Social Work', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'M.Com - Computer Applications', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'M.Com - International Business', duration: '2 Years', fees: 'Contact Admission' },
      ]
    },
    {
      id: 'hicet',
      name: 'Hindusthan College of Engineering and Technology (HICET)',
      courses: [
        { name: 'B.E - Aeronautical Engineering', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.E - Agricultural Engineering', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.Tech - Artificial Intelligence and Machine Learning', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.E - Automobile Engineering', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.E - Biomedical Engineering', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.Tech - Chemical Engineering', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.E - Civil Engineering', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.E - Computer Science and Engineering', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.E - Computer Science and Engineering with Cyber Security', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.E - Computer Science and Engineering with Business Systems', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.E - Electrical and Electronics Engineering', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.E - Electronics and Communication Engineering', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.E - Electronics and Instrumentation Engineering', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.Tech - Food Technology', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.Tech - Information Technology', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.E - Mechanical Engineering', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.E - Mechatronics Engineering', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'M.E - Computer Science and Engineering', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'M.E - CAD/CAM', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'M.E - Communication Systems', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'M.E - Embedded Systems', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'M.B.A - Master of Business Administration', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'M.C.A - Master of Computer Applications', duration: '2 Years', fees: 'Contact Admission' },
      ]
    },
    {
      id: 'hit',
      name: 'Hindusthan Institute of Technology (HIT)',
      courses: [
        { name: 'B.E - Aeronautical Engineering', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.Tech - Artificial Intelligence and Data Science', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.E - Computer Science and Engineering', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.E - Electronics and Communication Engineering', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.Tech - Information Technology', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.E - Mechanical Engineering', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'M.E - Computer Science and Engineering', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'M.E - VLSI Design', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'M.B.A - Master of Business Administration', duration: '2 Years', fees: 'Contact Admission' },
      ]
    },
    {
      id: 'hisac',
      name: 'Hindusthan College of Science and Commerce (HISAC)',
      courses: [
        { name: 'B.Sc - Computer Science', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.C.A - Computer Applications', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Information Technology', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Com - Commerce', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.B.A - Business Administration', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Artificial Intelligence & Machine Learning', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Com - Computer Applications', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Com - Professional Accounting', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Artificial Intelligence & Data Science', duration: '3 Years', fees: 'Contact Admission' },
      ]
    },
    {
      id: 'hice',
      name: 'Hindusthan College of Engineering (HICE)',
      courses: [
        { name: 'B.Tech - Artificial Intelligence and Data Science', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.E - Computer Science and Engineering', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.E - Electronics and Communication Engineering', duration: '4 Years', fees: 'Contact Admission' },
        { name: 'B.Tech - Information Technology', duration: '4 Years', fees: 'Contact Admission' },
      ]
    },
    {
      id: 'hsoa',
      name: 'Hindusthan School of Architecture (HSOA)',
      courses: [
        { name: 'B.Arch - Bachelor of Architecture', duration: '5 Years', fees: 'Contact Admission' },
      ]
    },
    {
      id: 'hce',
      name: 'Hindusthan College of Education (HCE)',
      courses: [
        { name: 'B.Ed - Tamil', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'B.Ed - English', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'B.Ed - Mathematics', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'B.Ed - Biological Science', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'B.Ed - Social Science', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'B.Ed - Geography', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'B.Ed - History', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'B.Ed - Computer Science', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'B.Ed - Physical Science', duration: '2 Years', fees: 'Contact Admission' },
        { name: 'B.Ed - Commerce & Accountancy', duration: '2 Years', fees: 'Contact Admission' },
      ]
    },
    {
      id: 'hchs',
      name: 'Hindusthan College of Health Science (HCHS)',
      courses: [
        { name: 'B.Sc - Cardiac Technology', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Cardiopulmonary Perfusion Care Technology', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Operation Theatre and Anaesthesia Technology', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Radiography and Imaging Technology', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Respiratory Therapy', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'B.Sc - Optometry', duration: '3 Years', fees: 'Contact Admission' },
      ]
    },
    {
      id: 'hcn',
      name: 'Hindusthan College of Nursing (HCN)',
      courses: [
        { name: 'B.Sc - Nursing', duration: '4 Years', fees: 'Contact Admission' },
      ]
    },
    {
      id: 'hpc',
      name: 'Hindusthan Polytechnic College (HPC)',
      courses: [
        { name: 'Diploma - Mechanical Engineering', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'Diploma - Electrical and Electronics Engineering', duration: '3 Years', fees: 'Contact Admission' },
        { name: 'Diploma - Computer Engineering', duration: '3 Years', fees: 'Contact Admission' },
      ]
    }
  ];

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <section className="institutions-section section-offset" id="Intitutionsandcourses">
      <h2 className="offset-head">Hindusthan Institutions & Courses</h2>

      {institutionsData.map((institution) => (
        <div key={institution.id} className={`dropdown ${openDropdown === institution.id ? 'active' : ''}`}>
          <div className="dropdown-header" onClick={() => toggleDropdown(institution.id)}>
            {institution.name}
          </div>
          <div className="dropdown-content">
            <ul>
              {institution.courses.map((course, index) => (
                <li key={index} className="course-item">
                  <span className="course-name">{course.name}</span>
                  <div className="course-hover-details">
                    <p><strong>Duration:</strong> {course.duration}</p>
                    <a href="#formSection" className="apply-btn">Apply Now</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
};

export default InstitutionCourses;