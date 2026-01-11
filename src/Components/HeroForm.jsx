// components/HeroForm.jsx
import React, { useState, useEffect } from 'react';
import '../Styles/HeroForm.css';
import axios from 'axios';
import { AUTH_API } from '../config';
const API_URL = AUTH_API;
const HeroForm = () => {
  const [activeTab, setActiveTab] = useState('register');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    institution: '',
    specialization: '',
    captcha: '',
    agreeTerms: false,
    password: ''
  });
  const [captchaText, setCaptchaText] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  const [showPassword, setShowPassword] = useState(false);

  // State-City data (simplified version)
  const stateCityMap = {


    "Andhra Pradesh": [
      "Alluri Sitarama Raju",
      "Anakapalli",
      "Ananthapuramu",
      "Annamayya",
      "Bapatla",
      "Chittoor",
      "East Godavari",
      "Eluru",
      "Guntur",
      "Kakinada",
      "Konaseema",
      "Krishna",
      "Kurnool",
      "Nandyal",
      "NTR",
      "Palnadu",
      "Parvathipuram Manyam",
      "Prakasam",
      "Sri Potti Sriramulu Nellore",
      "Sri Sathya Sai",
      "Srikakulam",
      "Tirupati",
      "Visakhapatnam",
      "Vizianagaram",
      "West Godavari",
      "YSR Kadapa"
    ],
    "Arunachal Pradesh": [
      "Anjaw",
      "Changlang",
      "Dibang Valley",
      "East Kameng",
      "East Siang",
      "Kamle",
      "Kra Daadi",
      "Kurung Kumey",
      "Lepa Rada",
      "Lohit",
      "Longding",
      "Lower Dibang Valley",
      "Lower Siang",
      "Lower Subansiri",
      "Namsai",
      "Pakke-Kessang",
      "Papum Pare",
      "Shi Yomi",
      "Siang",
      "Tawang",
      "Tirap",
      "Upper Siang",
      "Upper Subansiri",
      "West Kameng",
      "West Siang"
    ],

    "Assam": [
      "Baksa",
      "Barpeta",
      "Biswanath",
      "Bongaigaon",
      "Cachar",
      "Charaideo",
      "Chirang",
      "Darrang",
      "Dhemaji",
      "Dhubri",
      "Dibrugarh",
      "Dima Hasao",
      "Goalpara",
      "Golaghat",
      "Hailakandi",
      "Hojai",
      "Jorhat",
      "Kamrup",
      "Kamrup Metropolitan",
      "Karbi Anglong",
      "Karimganj",
      "Kokrajhar",
      "Lakhimpur",
      "Majuli",
      "Morigaon",
      "Nagaon",
      "Nalbari",
      "Sivasagar",
      "Sonitpur",
      "South Salmara-Mankachar",
      "Tamulpur",
      "Tinsukia",
      "Udalguri",
      "West Karbi Anglong"
    ],

    "Bihar": [
      "Araria",
      "Arwal",
      "Aurangabad",
      "Banka",
      "Begusarai",
      "Bhagalpur",
      "Bhojpur",
      "Buxar",
      "Darbhanga",
      "East Champaran (Motihari)",
      "Gaya",
      "Gopalganj",
      "Jamui",
      "Jehanabad",
      "Kaimur (Bhabua)",
      "Katihar",
      "Khagaria",
      "Kishanganj",
      "Lakhisarai",
      "Madhepura",
      "Madhubani",
      "Munger (Monghyr)",
      "Muzaffarpur",
      "Nalanda",
      "Nawada",
      "Patna",
      "Purnia (Purnea)",
      "Rohtas",
      "Saharsa",
      "Samastipur",
      "Saran",
      "Sheikhpura",
      "Sheohar",
      "Sitamarhi",
      "Siwan",
      "Supaul",
      "Vaishali",
      "West Champaran (Bettiah)"
    ],

    "Chhattisgarh": [
      "Balod",
      "Baloda Bazar",
      "Balrampur",
      "Bastar",
      "Bemetara",
      "Bijapur",
      "Bilaspur",
      "Dantewada (South Bastar)",
      "Dhamtari",
      "Durg",
      "Gariaband",
      "Gaurela-Pendra-Marwahi",
      "Janjgir-Champa",
      "Jashpur",
      "Kabirdham (Kawardha)",
      "Kanker (North Bastar)",
      "Kondagaon",
      "Korba",
      "Koriya",
      "Mahasamund",
      "Manendragarh-Chirmiri-Bharatpur",
      "Mohla-Manpur-Ambagarh Chowki",
      "Mungeli",
      "Narayanpur",
      "Raigarh",
      "Raipur",
      "Rajnandgaon",
      "Sakti",
      "Sarangarh-Bilaigarh",
      "Sukma",
      "Surajpur",
      "Surguja"
    ],
    "Delhi": [
      "Central Delhi",
      "East Delhi",
      "New Delhi",
      "North Delhi",
      "North East Delhi",
      "North West Delhi",
      "Shahdara",
      "South Delhi",
      "South East Delhi",
      "South West Delhi",
      "West Delhi"
    ],

    "Goa": [
      "North Goa",
      "South Goa"
    ],

    "Gujarat": [
      "Ahmedabad",
      "Amreli",
      "Anand",
      "Aravalli",
      "Banaskantha (Palanpur)",
      "Bharuch",
      "Bhavnagar",
      "Botad",
      "Chhota Udepur",
      "Dahod",
      "Dang (Ahwa)",
      "Devbhoomi Dwarka",
      "Gandhinagar",
      "Gir Somnath",
      "Jamnagar",
      "Junagadh",
      "Kheda (Nadiad)",
      "Kutch (Bhuj)",
      "Mahisagar",
      "Mehsana",
      "Morbi",
      "Narmada (Rajpipla)",
      "Navsari",
      "Panchmahal (Godhra)",
      "Patan",
      "Porbandar",
      "Rajkot",
      "Sabarkantha (Himmatnagar)",
      "Surat",
      "Surendranagar",
      "Tapi (Vyara)",
      "Vadodara",
      "Valsad"
    ],

    "Haryana": [
      "Ambala",
      "Bhiwani",
      "Charkhi Dadri",
      "Faridabad",
      "Fatehabad",
      "Gurugram",
      "Hisar",
      "Jhajjar",
      "Jind",
      "Kaithal",
      "Karnal",
      "Kurukshetra",
      "Mahendragarh",
      "Nuh",
      "Palwal",
      "Panchkula",
      "Panipat",
      "Rewari",
      "Rohtak",
      "Sirsa",
      "Sonipat",
      "Yamunanagar"
    ],

    "Himachal Pradesh": [
      "Bilaspur",
      "Chamba",
      "Hamirpur",
      "Kangra",
      "Kinnaur",
      "Kullu",
      "Lahaul and Spiti",
      "Mandi",
      "Shimla",
      "Sirmaur",
      "Solan",
      "Una"
    ],

    "Jharkhand": [
      "Bokaro",
      "Chatra",
      "Deoghar",
      "Dhanbad",
      "Dumka",
      "East Singhbhum",
      "Garhwa",
      "Giridih",
      "Godda",
      "Gumla",
      "Hazaribagh",
      "Jamtara",
      "Khunti",
      "Koderma",
      "Latehar",
      "Lohardaga",
      "Pakur",
      "Palamu",
      "Ramgarh",
      "Ranchi",
      "Sahibganj",
      "Seraikela-Kharsawan",
      "Simdega",
      "West Singhbhum"
    ],

    "Kerala": [
      "Alappuzha",
      "Ernakulam",
      "Idukki",
      "Kannur",
      "Kasaragod",
      "Kollam",
      "Kottayam",
      "Kozhikode",
      "Malappuram",
      "Palakkad",
      "Pathanamthitta",
      "Thiruvananthapuram",
      "Thrissur",
      "Wayanad"
    ],

    "Karnataka": [
      "Bagalkot",
      "Ballari (Bellary)",
      "Belagavi (Belgaum)",
      "Bengaluru Rural",
      "Bengaluru Urban",
      "Bidar",
      "Chamarajanagar",
      "Chikballapur",
      "Chikkamagaluru (Chikmagalur)",
      "Chitradurga",
      "Dakshina Kannada",
      "Davanagere",
      "Dharwad",
      "Gadag",
      "Hassan",
      "Haveri",
      "Kalaburagi (Gulbarga)",
      "Kodagu (Coorg)",
      "Kolar",
      "Koppal",
      "Mandya",
      "Mysuru (Mysore)",
      "Raichur",
      "Ramanagara",
      "Shivamogga (Shimoga)",
      "Tumakuru (Tumkur)",
      "Udupi",
      "Uttara Kannada (Karwar)",
      "Vijayapura (Bijapur)",
      "Yadgir"
    ],

    "Maharashtra": [
      "Ahmednagar",
      "Akola",
      "Amravati",
      "Aurangabad (Chhatrapati Sambhajinagar)",
      "Beed",
      "Bhandara",
      "Buldhana",
      "Chandrapur",
      "Dhule",
      "Gadchiroli",
      "Gondia",
      "Hingoli",
      "Jalgaon",
      "Jalna",
      "Kolhapur",
      "Latur",
      "Mumbai City",
      "Mumbai Suburban",
      "Nagpur",
      "Nanded",
      "Nandurbar",
      "Nashik",
      "Osmanabad (Dharashiv)",
      "Palghar",
      "Parbhani",
      "Pune",
      "Raigad",
      "Ratnagiri",
      "Sangli",
      "Satara",
      "Sindhudurg",
      "Solapur",
      "Thane",
      "Wardha",
      "Washim",
      "Yavatmal"
    ],

    "Madhya Pradesh": [
      "Agar Malwa",
      "Alirajpur",
      "Anuppur",
      "Ashoknagar",
      "Balaghat",
      "Barwani",
      "Betul",
      "Bhind",
      "Bhopal",
      "Burhanpur",
      "Chhatarpur",
      "Chhindwara",
      "Damoh",
      "Datia",
      "Dewas",
      "Dhar",
      "Dindori",
      "Guna",
      "Gwalior",
      "Harda",
      "Hoshangabad",
      "Indore",
      "Jabalpur",
      "Jhabua",
      "Katni",
      "Khandwa",
      "Khargone",
      "Mandla",
      "Mandsaur",
      "Morena",
      "Narsinghpur",
      "Neemuch",
      "Niwari",
      "Panna",
      "Raisen",
      "Rajgarh",
      "Ratlam",
      "Rewa",
      "Sagar",
      "Satna",
      "Sehore",
      "Seoni",
      "Shahdol",
      "Shajapur",
      "Sheopur",
      "Shivpuri",
      "Sidhi",
      "Singrauli",
      "Tikamgarh",
      "Ujjain",
      "Umaria",
      "Vidisha"
    ],

    "Manipur": [
      "Bishnupur",
      "Chandel",
      "Churachandpur",
      "Imphal East",
      "Imphal West",
      "Jiribam",
      "Kakching",
      "Kamjong",
      "Kangpokpi",
      "Noney",
      "Pherzawl",
      "Senapati",
      "Tamenglong",
      "Tengnoupal",
      "Thoubal",
      "Ukhrul"
    ],

    "Meghalaya": [
      "East Garo Hills",
      "East Jaintia Hills",
      "East Khasi Hills",
      "Eastern West Khasi Hills",
      "North Garo Hills",
      "Ribhoi",
      "South Garo Hills",
      "South West Garo Hills",
      "South West Khasi Hills",
      "West Garo Hills",
      "West Jaintia Hills",
      "West Khasi Hills"
    ],

    "Mizoram": [
      "Aizawl",
      "Champhai",
      "Hnahthial",
      "Khawzawl",
      "Kolasib",
      "Lawngtlai",
      "Lunglei",
      "Mamit",
      "Saiha",
      "Saitual",
      "Serchhip"
    ],

    "Nagaland": [
      "Chümoukedima",
      "Dimapur",
      "Kiphire",
      "Kohima",
      "Longleng",
      "Mokokchung",
      "Mon",
      "Niuland",
      "Noklak",
      "Peren",
      "Phek",
      "Shamator",
      "Tseminyu",
      "Tuensang",
      "Wokha",
      "Zünheboto"
    ],

    "Odisha": [
      "Angul",
      "Balangir",
      "Balasore (Baleswar)",
      "Bargarh",
      "Bhadrak",
      "Boudh",
      "Cuttack",
      "Deogarh (Debagarh)",
      "Dhenkanal",
      "Gajapati",
      "Ganjam",
      "Jagatsinghpur",
      "Jajpur",
      "Jharsuguda",
      "Kalahandi",
      "Kandhamal",
      "Kendrapara",
      "Kendujhar (Keonjhar)",
      "Khordha",
      "Koraput",
      "Malkangiri",
      "Mayurbhanj",
      "Nabarangpur",
      "Nayagarh",
      "Nuapada",
      "Puri",
      "Rayagada",
      "Sambalpur",
      "Subarnapur (Sonepur)",
      "Sundargarh"
    ],

    "Punjab": [
      "Amritsar",
      "Barnala",
      "Bathinda",
      "Faridkot",
      "Fatehgarh Sahib",
      "Fazilka",
      "Ferozepur",
      "Gurdaspur",
      "Hoshiarpur",
      "Jalandhar",
      "Kapurthala",
      "Ludhiana",
      "Malerkotla",
      "Mansa",
      "Moga",
      "Muktsar (Sri Muktsar Sahib)",
      "Pathankot",
      "Patiala",
      "Rupnagar (Ropar)",
      "Sangrur",
      "SAS Nagar (Mohali)",
      "Shahid Bhagat Singh Nagar (Nawanshahr)",
      "Tarn Taran"
    ],

    "Rajasthan": [
      "Ajmer",
      "Alwar",
      "Anupgarh",
      "Balotra",
      "Banswara",
      "Baran",
      "Barmer",
      "Beawar",
      "Bharatpur",
      "Bhilwara",
      "Bikaner",
      "Bundi",
      "Chittorgarh",
      "Churu",
      "Dausa",
      "Deeg",
      "Dholpur",
      "Didwana-Kuchaman",
      "Dudu",
      "Dungarpur",
      "Ganganagar (Sri Ganganagar)",
      "Gangapurcity",
      "Hanumangarh",
      "Jaipur",
      "Jaisalmer",
      "Jalore",
      "Jhalawar",
      "Jhunjhunu",
      "Jodhpur",
      "Karauli",
      "Kekri",
      "Khairthal-Tijara",
      "Kota",
      "Nagaur",
      "Neem Ka Thana",
      "Pali",
      "Phalodi",
      "Pratapgarh",
      "Rajsamand",
      "Salumbar",
      "Sanchore",
      "Sawai Madhopur",
      "Sikar",
      "Sirohi",
      "Tonk",
      "Udaipur"
    ],

    "Sikkim": [
      "Gangtok",
      "Gyalshing (West Sikkim)",
      "Mangan (North Sikkim)",
      "Namchi (South Sikkim)",
      "Pakyong",
      "Soreng"
    ],

    "Tamil Nadu": [
      "Ariyalur",
      "Chengalpattu",
      "Chennai",
      "Coimbatore",
      "Cuddalore",
      "Dharmapuri",
      "Dindigul",
      "Erode",
      "Kallakurichi",
      "Kanchipuram",
      "Kanyakumari",
      "Karur",
      "Krishnagiri",
      "Madurai",
      "Mayiladuthurai",
      "Nagapattinam",
      "Namakkal",
      "Nilgiris",
      "Perambalur",
      "Pudukkottai",
      "Ramanathapuram",
      "Ranipet",
      "Salem",
      "Sivaganga",
      "Tenkasi",
      "Thanjavur",
      "Theni",
      "Thoothukudi (Tuticorin)",
      "Tiruchirappalli",
      "Tirunelveli",
      "Tirupathur",
      "Tiruppur",
      "Tiruvallur",
      "Tiruvannamalai",
      "Tiruvarur",
      "Vellore",
      "Viluppuram",
      "Virudhunagar"
    ],

    "Telangana": [
      "Adilabad",
      "Bhadradri Kothagudem",
      "Hanumakonda",
      "Hyderabad",
      "Jagtial",
      "Jangaon",
      "Jayashankar Bhupalpally",
      "Jogulamba Gadwal",
      "Kamareddy",
      "Karimnagar",
      "Khammam",
      "Komaram Bheem Asifabad",
      "Mahabubabad",
      "Mahabubnagar",
      "Mancherial",
      "Medak",
      "Medchal–Malkajgiri",
      "Mulugu",
      "Nagarkurnool",
      "Nalgonda",
      "Narayanpet",
      "Nirmal",
      "Nizamabad",
      "Peddapalli",
      "Rajanna Sircilla",
      "Rangareddy",
      "Sangareddy",
      "Siddipet",
      "Suryapet",
      "Vikarabad",
      "Wanaparthy",
      "Warangal",
      "Yadadri Bhuvanagiri"
    ],

    "Tripura": [
      "Dhalai",
      "Gomati",
      "Khowai",
      "North Tripura",
      "Sepahijala",
      "South Tripura",
      "Unakoti",
      "West Tripura"
    ],

    "Uttarakhand": [
      "Almora",
      "Bageshwar",
      "Chamoli",
      "Champawat",
      "Dehradun",
      "Haridwar",
      "Nainital",
      "Pauri Garhwal",
      "Pithoragarh",
      "Rudraprayag",
      "Tehri Garhwal",
      "Udham Singh Nagar",
      "Uttarkashi"
    ],

    "West Bengal": [
      "Alipurduar",
      "Bankura",
      "Birbhum",
      "Cooch Behar",
      "Dakshin Dinajpur (South Dinajpur)",
      "Darjeeling",
      "Hooghly",
      "Howrah",
      "Jalpaiguri",
      "Jhargram",
      "Kalimpong",
      "Kolkata",
      "Malda",
      "Murshidabad",
      "Nadia",
      "North 24 Parganas",
      "Paschim Bardhaman (West Bardhaman)",
      "Paschim Medinipur (West Medinipur)",
      "Purba Bardhaman (East Bardhaman)",
      "Purba Medinipur (East Medinipur)",
      "Purulia",
      "South 24 Parganas",
      "Uttar Dinajpur (North Dinajpur)"
    ],
    "Andaman and Nicobar Islands": [
      "Nicobar",
      "North and Middle Andaman",
      "South Andaman"
    ],

    "Uttar Pradesh": [
      "Agra",
      "Aligarh",
      "Ambedkar Nagar",
      "Amethi (Chatrapati Sahuji Mahraj Nagar)",
      "Amroha (J.P. Nagar)",
      "Auraiya",
      "Ayodhya (Faizabad)",
      "Azamgarh",
      "Baghpat",
      "Bahraich",
      "Ballia",
      "Balrampur",
      "Banda",
      "Barabanki",
      "Bareilly",
      "Basti",
      "Bhadohi (Sant Ravidas Nagar)",
      "Bijnor",
      "Budaun",
      "Bulandshahr",
      "Chandauli",
      "Chitrakoot",
      "Deoria",
      "Etah",
      "Etawah",
      "Farrukhabad",
      "Fatehpur",
      "Firozabad",
      "Gautam Buddha Nagar (Noida)",
      "Ghaziabad",
      "Ghazipur",
      "Gonda",
      "Gorakhpur",
      "Hamirpur",
      "Hapur (Panchsheel Nagar)",
      "Hardoi",
      "Hathras (Mahamaya Nagar)",
      "Jalaun",
      "Jaunpur",
      "Jhansi",
      "Kannauj",
      "Kanpur Dehat (Ramabai Nagar)",
      "Kanpur Nagar",
      "Kasganj",
      "Kaushambi",
      "Kushinagar (Padrauna)",
      "Lakhimpur Kheri",
      "Lalitpur",
      "Lucknow",
      "Maharajganj",
      "Mahoba",
      "Mainpuri",
      "Mathura",
      "Mau",
      "Meerut",
      "Mirzapur",
      "Moradabad",
      "Muzaffarnagar",
      "Pilibhit",
      "Pratapgarh",
      "Prayagraj (Allahabad)",
      "Raebareli",
      "Rampur",
      "Saharanpur",
      "Sambhal (Bhimnagar)",
      "Sant Kabir Nagar",
      "Shahjahanpur",
      "Shamli",
      "Shravasti",
      "Siddharthnagar",
      "Sitapur",
      "Sonbhadra",
      "Sultanpur",
      "Unnao",
      "Varanasi"
    ],

  };


  // Institution-Course data
  const institutionCourses = {

    'HICAS - Hindusthan College of Arts and Science': [
      'B.Com - Commerce',
      'B.Com - Computer Applications',
      'B.Com - Information Technology',
      'B.Com - Corporate Secretaryship',
      'B.Com - Professional Accounting',
      'B.Com - Accounting & Finance',
      'B.Com - Banking & Insurance',
      'B.Com - International Business',
      'B.C.A - Computer Applications',
      'B.B.A - Business Administration',
      'B.B.A - Computer Applications',
      'B.B.A - Logistics',
      'B.B.A - Business Analytics',
      'B.Voc - Graphic Design',
      'B.A - English',
      'B.Sc - Computer Science',
      'B.Sc - Information Technology',
      'B.Sc - Computer Technology',
      'B.Sc - Computer Science with Cognitive Systems',
      'B.Sc - Artificial Intelligence & Machine Learning',
      'B.Sc - Data Science & Analytics',
      'B.Sc - Computer Science with Cyber Security',
      'B.Sc - Electronics & Communication Systems',
      'B.Sc - Biotechnology',
      'B.Sc - Microbiology',
      'B.Sc - Food Processing Technology & Management',
      'B.Sc - Physics',
      'B.Sc - Animation & Visual Effects',
      'B.Sc - Visual Communication',
      'B.Sc - Catering Science & Hotel Management',
      'B.Sc - Costume Design & Fashion',
      'B.Sc - Mathematics',
      'B.Sc - Psychology',
      'M.Sc - Biotechnology',
      'M.Sc - Microbiology',
      'M.Sc - Computer Science',
      'M.Sc - Information Technology',
      'M.Sc - Electronics & Communication Systems',
      'M.Sc - Physics',
      'M.Sc - Costume Design & Fashion',
      'M.Sc - Mathematics',
      'M.Sc - Visual Communication',
      'M.Sc - Applied Psychology',
      'M.A - English',
      'M.S.W - Master of Social Work',
      'M.Com - Computer Applications',
      'M.Com - International Business',
    ],
    'HISAC - Hindusthan College of Science and Commerce': [
      'B.Sc - Computer Science',
      'B.C.A - Computer Applications',
      'B.Sc - Information Technology',
      'B.Com - Commerce',
      'B.B.A - Business Administration',
      'B.Sc - Artificial Intelligence & Machine Learning',
      'B.Com - Computer Applications',
      'B.Com - Professional Accounting',
      'B.Sc - Artificial Intelligence & Data Science',
    ],
    'HICET - Hindusthan College of Engineering and Technology': [
      'B.E - Aeronautical Engineering',
      'B.E - Agricultural Engineering',
      'B.Tech - Artificial Intelligence and Machine Learning',
      'B.E - Automobile Engineering',
      'B.E - Biomedical Engineering',
      'B.Tech - Chemical Engineering',
      'B.E - Civil Engineering',
      'B.E - Computer Science and Engineering',
      'B.E - Computer Science and Engineering with Cyber Security',
      'B.E - Computer Science and Engineering with Business Systems',
      'B.E - Electrical and Electronics Engineering',
      'B.E - Electronics and Communication Engineering',
      'B.E - Electronics and Instrumentation Engineering',
      'B.Tech - Food Technology',
      'B.Tech - Information Technology',
      'B.E - Mechanical Engineering',
      'B.E - Mechatronics Engineering',
      'M.E - Computer Science and Engineering',
      'M.E - CAD/CAM',
      'M.E - Communication Systems',
      'M.E - Embedded Systems',
      'M.B.A - Master of Business Administration',
      'M.C.A - Master of Computer Applications',
    ],
    'HICE - Hindiusthan College of Engineering': [
      'B.Tech - Artificial Intelligence and Data Science',
      'B.E - Computer Science and Engineering',
      'B.E - Electronics and Communication Engineering',
      'B.Tech - Information Technology',
    ],
    'HIT - Hindusthan Institute of Technology': [
      'B.E - Aeronautical Engineering',
      'B.Tech - Artificial Intelligence and Data Science',
      'B.E - Computer Science and Engineering',
      'B.E - Electronics and Communication Engineering',
      'B.Tech - Information Technology',
      'B.E - Mechanical Engineering',
      'M.E - Computer Science and Engineering',
      'M.E - VLSI Design',
      'M.B.A - Master of Business Administration',
      'Ph.D - Computer Science and Engineering',
      'Ph.D - Electronics and Communication Engineering',
      'Ph.D - Mechanical Engineering',
      'Ph.D - Physics'
    ],
    'HSOA - Hindusthan School of Architecture': [
      'B.Arch - Bachelor of Architecture'
    ],
    'HCE - Hindusthan College of Education': [
      'B.Ed - Tamil',
      'B.Ed - English',
      'B.Ed - Mathematics',
      'B.Ed - Biological Science',
      'B.Ed - Social Science',
      'B.Ed - Geography',
      'B.Ed - History',
      'B.Ed - Computer Science',
      'B.Ed - Physical Science',
      'B.Ed - Commerce & Accountancy',
    ],

    'HCHS - Hindusthan College of Health Science': [
      'B.Sc - Cardiac Technology',
      'B.Sc - Cardiopulmonary Perfusion Care Technology',
      'B.Sc - Operation Theatre and Anaesthesia Technology',
      'B.Sc - Radiography and Imaging Technology',
      'B.Sc - Respiratory Therapy',
      'B.Sc - Optometry',
    ],
    'HCN - Hindusthan College of Nursing': [
      'B.Sc - Nursing'
    ],
    'HPC - Hindusthan Polytechnic College': [
      'Diploma - Mechanical Engineering',
      'Diploma - Electrical and Electronics Engineering',
      'Diploma - Computer Engineering',
    ]

  };

  useEffect(() => {
    // Initialize states and institutions
    setStates(Object.keys(stateCityMap));
    setInstitutions(Object.keys(institutionCourses));
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(captcha);
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, state: selectedState, city: '' });
    setCities(stateCityMap[selectedState] || []);
  };

  const handleInstitutionChange = (e) => {
    const selectedInstitution = e.target.value;
    setFormData({ ...formData, institution: selectedInstitution, specialization: '' });
    setSpecializations(institutionCourses[selectedInstitution] || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // CAPTCHA validation
    if (activeTab === "register" && formData.captcha !== captchaText) {
      alert("Invalid captcha");
      generateCaptcha();
      return;
    }

    try {
      /* ========== REGISTER ========== */
      if (activeTab === "register") {
        await axios.post(`${API_URL}/register`, {
          email: formData.email,
          fullName: formData.fullName,
          phone: formData.phone,
          institution: formData.institution,
          specialization: formData.specialization,
        });

        alert("Password setup link sent to your email 📧");
        setActiveTab("login");
        return;
      }

      /* ========== LOGIN ========== */
      const res = await axios.post(`${API_URL}/login`, {
        email: formData.email,
        password: formData.password,
      });

      /* Save token */
      localStorage.setItem("token", res.data.token);

      /* Save user info */
      /* Save user info */
      localStorage.setItem("userName", res.data.user.full_name);
      localStorage.setItem("userPhone", res.data.user.phone || '');
      localStorage.setItem("userRole", res.data.user.role);
      localStorage.setItem("userInstitution", res.data.user.institution_name || '');

      /* Redirect based on role */
      /* Redirect based on role */
      if (res.data.user.role === 'admin') {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }

    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };



  /* ========== RESEND VERIFICATION ========== */
  const handleResendVerification = async (e) => {
    e.preventDefault();

    let email = formData.email;
    if (!email) {
      email = prompt("Please enter your registered email address:");
    }

    if (!email) return;

    try {
      await axios.post(`${API_URL}/resend-verification`, { email });
      alert("Verification email resent successfully! 📧");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to resend email");
    }
  };

  return (
    <div className="form-background" id="formSection">
      <div className="form-container">
        <h2>ADMISSION OPEN 2026-27</h2>

        <div className="tab-container">
          <button
            className={`tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
          <button
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
        </div>

        {activeTab === 'register' ? (
          <form id="registerForm" onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              required
              autoComplete="name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address *"
              required
              autoComplete="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <div className="phone-group">
              <select className="country-code">
                <option value="+91">+91</option>
              </select>
              <input
                type="tel"
                placeholder="Enter Mobile Number *"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="row">
              <select
                id="stateSelect"
                required
                value={formData.state}
                onChange={handleStateChange}
              >
                <option value="">Select State *</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <select
                id="citySelect"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              >
                <option value="">Select City *</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="row">
              <select
                id="institutionSelect"
                required
                value={formData.institution}
                onChange={handleInstitutionChange}
              >
                <option value="">Select Institution *</option>
                {institutions.map(inst => (
                  <option key={inst} value={inst}>{inst}</option>
                ))}
              </select>
              <select
                id="specializationSelect"
                required
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              >
                <option value="">Select Specialization *</option>
                {specializations.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>

            <div className="captcha-row">
              <div className="captcha-box">
                <div id="captcha" className="captcha-img">{captchaText}</div>
                <button type="button" onClick={generateCaptcha} className="refresh">&#x21bb;</button>
              </div>
              <input
                type="text"
                placeholder="Enter Captcha"
                required
                value={formData.captcha}
                onChange={(e) => setFormData({ ...formData, captcha: e.target.value })}
              />
            </div>

            <label className="checkbox-input">
              <input
                type="checkbox"
                required
                style={{ height: '25px', width: '50px', marginTop: '0px' }}
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
              />
              <h3>I agree to receive updates and information from Hindusthan Educational Institutions by signing up.*</h3>
            </label>

            <button type="submit" className="register-btn">REGISTER</button>
            <a href="#" className="resend" onClick={handleResendVerification}>RESEND VERIFICATION EMAIL</a>
          </form>
        ) : (
          <form id="loginForm" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              required
              autoComplete="username"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <div className="password-input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Your Password *"
                required
                autoComplete="current-password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
              </span>
            </div>

            <button type="submit" className="login-btn">LOGIN</button>

            <a href="/forgot-password" className="forgot">FORGOT PASSWORD?</a>
          </form>
        )}
      </div>
    </div>
  );
};

export default HeroForm;