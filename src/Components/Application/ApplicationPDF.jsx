import React from 'react';
import './ApplicationPDF.css';
import { UPLOADS_URL } from '../../config';
import HindusthanLogo from '../../assets/Hindusthanblack.png';
import HICAS from '../../assets/Clglogos/HICAS.png';
import HICET from '../../assets/Clglogos/HICET.png';
import HIT from '../../assets/Clglogos/HIT.png';
import HCN from '../../assets/Clglogos/HCN.png';
import HCE from '../../assets/Clglogos/HCE.png';
import HISAC from '../../assets/Clglogos/HISAC.png';
import HSOA from '../../assets/Clglogos/HSOA.png';
import HICE from '../../assets/Clglogos/HICE.png';
import HCHS from '../../assets/Clglogos/HCHS.png';

const collegeLogos = {
    HICAS, HICET, HIT, HCN, HCE, HISAC, HSOA, HICE, HCHS
};

const collegeFullNames = {
    HICAS: 'Hindusthan College of Arts & Science',
    HICET: 'Hindusthan College of Engineering and Technology',
    HIT: 'Hindusthan Institute of Technology',
    HCN: 'Hindusthan College of Nursing',
    HCE: 'Hindusthan College of Education',
    HISAC: 'Hindusthan International School and College',
    HSOA: 'Hindusthan School of Architecture',
    HICE: 'Hindusthan Institute of Creative Education',
    HCHS: 'Hindusthan College of Health Sciences'
};



const FieldItem = ({ label, value, className = "" }) => (
    <div className={`fidelity-field-item ${className}`}>
        {label && <label>{label}</label>}
        <div className="field-box">{value || ''}</div>
    </div>
);

const SquareOpt = ({ label, checked }) => (
    <div className="square-opt-wrapper">
        <div className="square-opt-box">{checked ? '✓' : ''}</div>
        <span>{label}</span>
    </div>
);

const ApplicationPDF = ({ data }) => {
    if (!data) return null;

    const logoKey = data.college_name || 'HICAS';

    let twelfthMarks = [];
    if (data.twelfth_marks_json) {
        try {
            twelfthMarks = typeof data.twelfth_marks_json === 'string'
                ? JSON.parse(data.twelfth_marks_json)
                : data.twelfth_marks_json;
        } catch (e) {
            twelfthMarks = [];
        }
    }

    return (
        <div className="printable-form">
            {/* PAGE 1 */}
            <div className="page-wrapper-fidelity">
                <div className="form-pdf-header-centered">
                    <div className="header-logo-side">
                        {/* Placeholder for balance */}
                    </div>
                    <div className="header-text-center">
                        <img src={collegeLogos[logoKey] || HICAS} alt="Logo" className="institution-logo-pdf-centered" />
                    </div>
                    <div className="header-right-meta">
                        <div className="app-no-box-pdf">
                            <span className="app-no-label">No.</span>
                            <span className="app-no-val">
                                {logoKey}{data.app_sequence_no ? String(data.app_sequence_no).padStart(2, '0') : '----'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="fidelity-main-title">
                    APPLICATION FOR ADMISSION TO UNDERGRADUATE PROGRAMMES
                </div>

                <div className="programme-note-row">
                    <div className="programme-box-area">
                        <div className="prog-field">
                            <span>PROGRAMME APPLIED FOR :</span>
                            <div style={{ flex: 1, borderBottom: '1px solid #000' }}>{data.programme_applied}</div>
                        </div>
                        <div className="notes-area">
                            <strong>Note :</strong>
                            <ul>
                                <li>Use separate application for each Programme.</li>
                                <li>Tick (✓) the relevant box wherever provided.</li>
                                <li>No column should be left blank. Write N.A against a column if the same does not apply.</li>
                                <li>Application incomplete in any respect is liable to be rejected.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="photo-space-pdf">
                        {data.photo ? (
                            <img src={`${UPLOADS_URL}/documents/${data.photo}`} alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <span>Space for affixing Passport size Photograph</span>
                        )}
                    </div>
                </div>

                <div className="fidelity-field-row">
                    <FieldItem label="Name of the Applicant in Block Letters" value={data.full_name?.toUpperCase()} className="full-w" />
                </div>

                <div className="fidelity-field-row">
                    <FieldItem label="Date of Birth" value={data.dob ? new Date(data.dob).toLocaleDateString('en-GB') : ''} className="quarter-w" />
                    <div className="fidelity-field-item" style={{ marginLeft: '10px' }}>
                        <label>Gender</label>
                        <div className="square-option-group">
                            <SquareOpt label="M" checked={data.gender === 'Male'} />
                            <SquareOpt label="F" checked={data.gender === 'Female'} />
                            <SquareOpt label="T" checked={data.gender === 'Transgender'} />
                        </div>
                    </div>
                    <FieldItem label="Aadhaar No." value={data.aadhaar_no} className="half-w" />
                </div>

                <div className="fidelity-field-row">
                    <FieldItem label="Nationality" value={data.nationality || 'Indian'} className="quarter-w" />
                    <FieldItem label="Religion" value={data.religion} className="quarter-w" />
                    <div className="fidelity-field-item flex-grow">
                        <label>Community</label>
                        <div className="square-option-group">
                            {['OC', 'BCM', 'BC', 'MBC/DNC', 'SCA', 'SC', 'ST'].map(c => (
                                <SquareOpt key={c} label={c.replace('/', ' / ')} checked={(data.community || '').toUpperCase() === c.toUpperCase()} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="fidelity-field-row">
                    <FieldItem label="Caste" value={data.caste} className="quarter-w" />
                    <FieldItem label="Mother Tongue" value={data.mother_tongue} className="quarter-w" />
                    <FieldItem label="Blood Group" value={data.blood_group} className="quarter-w" />
                </div>

                <div className="fidelity-field-row">
                    <FieldItem label="Mobile No." value={data.phone} className="half-w" />
                    <FieldItem label="E-mail" value={data.email} className="half-w" />
                </div>

                <div className="parent-details-grid mt-10">
                    <div className="parent-row">
                        <div className="parent-type-label">F</div>
                        <div className="parent-info-cols">
                            <FieldItem label="Name of the Parent" value={data.father_name} className="full-w" />
                            <FieldItem label="Mobile No." value={data.parent_phone} className="full-w" />
                        </div>
                    </div>
                    <div className="parent-row">
                        <div className="parent-type-label">M</div>
                        <div className="parent-info-cols">
                            <FieldItem label="Name of the Parent" value={data.mother_name} className="full-w" />
                            <FieldItem label="Mobile No." value={data.parent_phone} className="full-w" />
                        </div>
                    </div>
                    <div className="parent-row">
                        <div className="parent-type-label">G</div>
                        <div className="parent-info-cols">
                            <FieldItem label="Name of the Guardian (if applicable)" value={data.guardian_name} className="full-w" />
                        </div>
                    </div>
                    <div className="parent-row">
                        <div className="parent-type-label">F</div>
                        <div className="parent-info-cols">
                            <FieldItem label="Occupation" value={data.father_occupation} className="full-w" />
                        </div>
                    </div>
                    <div className="parent-row">
                        <div className="parent-type-label">M</div>
                        <div className="parent-info-cols">
                            <FieldItem label="Occupation" value={data.mother_occupation} className="full-w" />
                        </div>
                    </div>
                    <div className="fidelity-field-row">
                        <FieldItem label="Family Annual Income" value={data.annual_income} className="half-w" />
                    </div>
                    <div className="fidelity-field-row">
                        <FieldItem label="Address for Communication with Pincode" value={`${data.address}, ${data.city}, ${data.state} - ${data.pincode}`} className="full-w" />
                    </div>
                </div>

                <div className="fidelity-section-bar">INSTITUTION LAST STUDIED</div>
                <table className="fidelity-table-pdf">
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>Class</th>
                            <th>Institution Name</th>
                            <th>Medium of Study</th>
                            <th>Month & Year of Passing</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="center-text">Class XI</td>
                            <td>{data.eleventh_institution}</td>
                            <td>{data.eleventh_medium}</td>
                            <td>{data.eleventh_passing_info}</td>
                        </tr>
                        <tr>
                            <td className="center-text">Class X</td>
                            <td>{data.tenth_school}</td>
                            <td>{data.tenth_medium}</td>
                            <td>{data.tenth_year}</td>
                        </tr>
                    </tbody>
                </table>

                <table className="fidelity-table-pdf mt-5">
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>Class</th>
                            <th>Name of the Board</th>
                            <th>Total Marks Obtained</th>
                            <th>Percentage of Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="center-text">Class XI</td>
                            <td>{data.eleventh_board}</td>
                            <td className="center-text">{data.eleventh_total_marks} / {data.eleventh_max_marks}</td>
                            <td className="center-text">{data.eleventh_percentage}</td>
                        </tr>
                        <tr>
                            <td className="center-text">Class X</td>
                            <td>{data.tenth_board}</td>
                            <td className="center-text">{data.tenth_total_marks} / {data.tenth_max_marks}</td>
                            <td className="center-text">{data.tenth_percentage}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="fidelity-section-bar">SOURCE OF INFORMATION ABOUT HINDUSTHAN</div>
                <div className="scholarship-print-grid">
                    {['Parents', 'Students', 'Alumni', 'Print Media', 'Social Media', 'Friends & Relatives', 'Education Fair'].map(s => (
                        <div key={s} className="schol-item">
                            <div className="schol-box">{(data.source_info || '').includes(s) ? '✓' : ''}</div>
                            <span className="schol-label">{s}</span>
                        </div>
                    ))}
                </div>
            </div>


            <div className="page-break" style={{ pageBreakBefore: 'always' }}></div>

            {/* PAGE 2 */}
            <div className="page-wrapper-fidelity page-2">
                <div className="fidelity-section-bar">SCHOLARSHIP CATEGORY</div>
                <p style={{ fontSize: '8pt', fontStyle: 'italic', marginBottom: '8px' }}>Note : Applying for and / or qualifying HSC Examination does not entitle the Student for Scholarship.</p>
                <div className="scholarship-print-grid">
                    {[
                        'Academic Meritorious', 'Sports Meritorious', 'Ward of Military / Para-Military',
                        'NCC / NSS', 'Single Parent', 'Orphan / Foster Child', 'Physically Challenged',
                        'Girl Child', 'Sibling Quota', 'Ward of Employee', 'Alumni'
                    ].map(s => (
                        <div key={s} className="schol-item">
                            <div className="schol-box">{(data.scholarship_category || '').includes(s) ? '✓' : ''}</div>
                            <span className="schol-label">{s}</span>
                        </div>
                    ))}
                </div>
                <div className="fidelity-section-bar" style={{ marginTop: '0' }}>CLASS XII / DIPLOMA DETAILS</div>
                <div className="fidelity-field-row">
                    <FieldItem label="Institution Name" value={data.twelfth_school} className="half-w" />
                    <FieldItem label="Name of the Board" value={data.twelfth_board} className="half-w" />
                </div>
                <div className="fidelity-field-row">
                    <FieldItem label="Medium of Study" value={data.twelfth_medium} className="quarter-w" />
                    <FieldItem label="Reg. No." value={data.twelfth_reg_no} className="quarter-w" />
                    <FieldItem label="Year of Passing" value={data.twelfth_year} className="quarter-w" />
                </div>

                <p style={{ fontWeight: 'bold', fontSize: '9pt', margin: '10px 0 5px 0' }}>Marks Obtained in Class XII</p>
                <table className="fidelity-table-pdf">
                    <thead>
                        <tr>
                            <th className="center-text" style={{ width: '40px' }}>S.No.</th>
                            <th className="center-text">Subject</th>
                            <th className="center-text">Marks Obtained</th>
                            <th className="center-text">Max. Marks</th>
                            <th className="center-text">Month & Year of Passing</th>
                        </tr>
                    </thead>
                    <tbody>
                        {twelfthMarks.length > 0 ? twelfthMarks.map((m, idx) => (
                            <tr key={idx}>
                                <td className="center-text">{idx + 1}</td>
                                <td>{m.subject}</td>
                                <td className="center-text">{m.marks}</td>
                                <td className="center-text">{m.max}</td>
                                <td className="center-text">{m.passing}</td>
                            </tr>
                        )) : (
                            [1, 2, 3, 4, 5, 6].map(n => <tr key={n}><td>{n}</td><td></td><td></td><td></td><td></td></tr>)
                        )}
                        <tr>
                            <td colSpan="2" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Marks</td>
                            <td className="center-text" style={{ fontWeight: 'bold' }}>{data.twelfth_total_marks || '0'}</td>
                            <td className="center-text" style={{ fontWeight: 'bold' }}>{data.twelfth_max_marks || '0'}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                <div className="fidelity-field-row mt-10">
                    <FieldItem label="Percentage of Marks" value={data.twelfth_percentage} className="half-w" />
                    <FieldItem label="12th Cut-off Mark" value={data.twelfth_cutoff ? `${data.twelfth_cutoff} / 400` : ''} className="half-w" />
                </div>

                {/* <div className="fidelity-section-bar">DOCUMENTS SUBMITTED (CHECKLIST)</div>
                <div className="documents-checklist-pdf">
                    <SquareOpt label="10th Marksheet" checked={!!data.marksheet_10} />
                    <SquareOpt label="12th / Diploma Marksheet" checked={!!data.marksheet_12} />
                    <SquareOpt label="Transfer Certificate" checked={!!data.transfer_certificate} />
                    <SquareOpt label="Community Certificate" checked={!!data.community_certificate} />
                    <SquareOpt label="Aadhaar Card" checked={!!data.aadhaar_no} />
                </div> */}

                <div className="pdf-footer-section">
                    <div className="fidelity-declaration mt-10">
                        <p className="declaration-title">DECLARATION BY THE APPLICANT</p>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <div className="square-opt-box" style={{ marginTop: '2px', flexShrink: 0 }}>✓</div>
                            <p style={{ margin: 0 }}>I solemnly and sincerely affirm that all particulars furnished by me in this application form are true and correct. However, in the event of my information being found to be incorrect either before or after my admission to the programme, the institution can claim all authority to cancel my admission as the case may be and I would have to forego my seat and the fees paid.</p>
                        </div>
                    </div>
                    <div className="fidelity-section-bar">PAYMENT DETAILS</div>
                    <div className="fidelity-field-row">
                        <FieldItem label="Transaction ID" value={data.payment_id} className="half-w" />
                        <FieldItem label="Amount Paid" value={data.payment_id ? "₹ 500" : ""} className="quarter-w" />
                        <FieldItem label="Payment Status" value={data.payment_status} className="quarter-w" />
                    </div>
                    <div className="sig-area-pdf">
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ borderBottom: '1px solid #000', width: '250px', height: '40px' }}></div>
                            <p style={{ marginTop: '5px' }}>Signature of the Parent / Guardian</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ borderBottom: '1px solid #000', width: '250px', height: '40px', marginLeft: 'auto' }}></div>
                            <p style={{ marginTop: '5px' }}>Signature of the Applicant with Date</p>
                        </div>
                    </div>

                    <div className="fidelity-field-row mt-10">
                        <FieldItem label="Place" value={data.place || data.city} className="quarter-w" />
                        <FieldItem label="Date of Submission" value={data.declaration_at ? new Date(data.declaration_at).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB')} className="quarter-w" />
                    </div>

                    <div className="fidelity-section-bar">OFFICE USE ONLY</div>
                    <div className="office-grid">
                        <div className="office-col">
                            <label>Admitted by</label>
                            <div className="office-signature-box"></div>
                            <div className="office-signature-box"></div>
                        </div>
                        <div className="office-col">
                            <label>Checked by</label>
                            <div className="office-signature-box"></div>
                            <div className="office-signature-box"></div>
                        </div>
                        <div className="office-col">
                            <label>Approved by</label>
                            <div className="office-signature-box"></div>
                            <div className="office-signature-box"></div>
                        </div>
                    </div>
                    <div className="office-bottom-row">
                        <div className="office-small-box"></div>
                        <div className="office-wide-box"></div>
                    </div>
                    <p className="office-footer-note">Note : Institution will not be responsible for any kind of communication lapse because of wrong contact details.</p>
                </div>
            </div>
        </div>
    );
};

export default ApplicationPDF;
