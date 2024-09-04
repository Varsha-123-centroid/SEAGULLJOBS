import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';
import Modal from 'react-modal';
import { Document, Page, pdfjs } from 'react-pdf';
import { GlobalWorkerOptions } from 'pdfjs-dist';
GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const BASE_URL=process.env.REACT_APP_BASE_URL;
const GoogleLoginButton = () => {
  const handleSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    // Handle successful login
  };

  const handleError = () => {
    console.log('Google Login Failed');
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
}

const FacebookLoginButton = () => {
  const responseFacebook = (response) => {
    console.log(response);
    // Handle successful login
  };
  return (
    <FacebookLogin
      appId="YOUR_FACEBOOK_APP_ID_HERE"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
    />
  );
}


const Biodata = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { response } = location.state || {};
  const { candidate } = response || {};

  const [formData, setFormData] = useState({
    user_id: candidate?.user_id || '',
    firstname: candidate?.firstname || '',
    lastname: candidate?.lastname || '',
    dob: candidate?.dob || '',
    genderid: candidate?.genderid || '',
    mobilenumber: candidate?.mobilenumber || '',
    emailid: candidate?.emailid || '',
    address: candidate?.address || '',
    permanent_address: candidate?.permanent_address || '',
    countryid: candidate?.countryid || '',
    stateid: candidate?.stateid || '',
    passportnumber: candidate?.passportnumber || '',
    passport_expiredate: candidate?.passport_expiredate || '',
    idproof_number: candidate?.idproof_number || '',
    idproof_type: candidate?.idproof_type || '',
    telegram_number: candidate?.telegram_number || '',
    linkedin: candidate?.linkedin || '',
    whatsapp_number: candidate?.whatsapp_number || '',
    physicallychallenge: 'no',
    resume: candidate?.resume_path || '',
  });

  useEffect(() => {
    if (!candidate) {
      // If candidate data is not available in state, load it from sessionStorage
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const storedCandidate = parsedUser.candidate;
        if (storedCandidate) {
          setFormData({
            user_id: storedCandidate.user_id,
            firstname: storedCandidate.firstname,
            lastname: storedCandidate.lastname,
            dob: storedCandidate.dob,
            genderid: storedCandidate.genderid,
            mobilenumber: storedCandidate.mobilenumber,
            emailid: storedCandidate.emailid,
            address: storedCandidate.address,
            permanent_address: storedCandidate.permanent_address,
            countryid: storedCandidate.countryid,
            stateid: storedCandidate.stateid,
            passportnumber: storedCandidate.passportnumber,
            passport_expiredate: storedCandidate.passport_expiredate,
            idproof_number: storedCandidate.idproof_number,
            idproof_type: storedCandidate.idproof_type,
            telegram_number: storedCandidate.telegram_number,
            linkedin: storedCandidate.linkedin,
            whatsapp_number: storedCandidate.whatsapp_number,
            physicallychallenge: 'no',
            resume: storedCandidate.resume,
          });
        }
      } else {
        // Handle the case where user data is not available in sessionStorage
        navigate('/login'); // Example redirect to a login page
      }
    }
  }, [candidate, navigate]);
    const [error, setError] = useState('');
    const [successData, setSuccessData] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [maxDate, setMaxDate] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [errorData, setErrorData] = useState('');
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
   
    const openModal = () => {
      setModalIsOpen(true);
    };
    
    const closeModal = () => {
      setModalIsOpen(false);
    };
    
    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    };
    useEffect(() => {
      const today = new Date();
      const maxDate = new Date(today.setFullYear(today.getFullYear() - 18)).toISOString().split('T')[0];
      setMaxDate(maxDate);
    }, []);

	  const handleInputChange = (e) => {
		const { name, value, type, checked, files } = e.target;
		setFormData(prevState => ({
		  ...prevState,
		  [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
		}));
    if (name === 'dob') {
      validateDOB(value);
    }
    
	  };
    const getResumeFileType = () => {
      if (typeof formData.resume === 'string') {
        return formData.resume.endsWith('.pdf') ? 'pdf' : 'other';
      } else if (formData.resume instanceof File) {
        return formData.resume.type === 'application/pdf' ? 'pdf' : 'other';
      }
      return 'unknown';
    };
  
    const resumeFileType = getResumeFileType();
    const validateDOB = (dob) => {
      const today = new Date();
      const birthDate = new Date(dob);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      const dayDifference = today.getDate() - birthDate.getDate();
  
      if (age < 18 || (age === 18 && (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)))) {
        setError('You must be at least 18 years old.');
      } else {
        setError('');
      }
    };
  
	  const handleSubmit = async (e) => {
		e.preventDefault();
		
		try {
		  const formDataToSend = new FormData();
		  for (const key in formData) {
				formDataToSend.append(key, formData[key]); 
		  }
		 //const response = await axios.post(`http://localhost:8000/api/candidateinfo`, formDataToSend, {
     const response = await axios.post(`${BASE_URL}candidateinfo`, formDataToSend, {
			headers: {
			  'Content-Type': 'multipart/form-data'
			}
		  });
      if(response.status===200){
      const data =response.data; //await response.json();
     // alert(JSON.stringify(data.message));
     sessionStorage.setItem('user', JSON.stringify(data));
     //alert("Your Profile Update Successful..,Please Move to Search jobs");
      sessionStorage.setItem('candidateId', data.candidate.id);
      sessionStorage.setItem('candidateFName', data.candidate.firstname);
      setErrorData("");
      setShowModal(true);
      // alert('Registration successful:', response.data);
      setTimeout(() => {
       setShowModal(false);
    
       navigate('/login', { state: { response: data } });
     }, 4000); 
			
      }
      else{
        setErrorData("Data can not Save, Please try again !");
      }
		  // Handle successful registration (e.g., show success message, redirect)
		} catch (error) {
		  console.error('Profile Update failed:', error.response ? error.response.data : error.message);
      setErrorData(error.message);
		  // Handle error (e.g., show error message)
		}
	  };
	  useEffect(() => {
		//console.log('Form data updated:', formData);
	  }, [formData]);
    const modalStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    };
  
    const modalContentStyle = {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      width: '300px',
      textAlign: 'center',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    };

    useEffect(() => {
      // Fetch countries from the API
      //alert(candidate?.stateid);
      axios.get(`${BASE_URL}countries`) // Replace with your API endpoint
        .then(response => {
          const countryOptions = response.data.map(country => ({
            value: country.id,
            label: country.countryname
          }));
          setCountries(countryOptions);
   //alert(formData.countryid);
          if (formData.countryid) {
           fetchStates(formData.countryid, formData.stateid); // Pass `stateid` to preselect it
          }
        })
        .catch(error => console.error('Error fetching countries:', error));
    }, [formData.countryid]);

    const fetchStates = (countryId, preselectStateId = null) => {
      axios.get(`${BASE_URL}states?country_id=${countryId}`) // Replace with your API endpoint
      .then(response => {
        const stateOptions = response.data.map(state => ({
          value: state.id,
          label: state.statename
        }));
       
        setStates(stateOptions);
        if (preselectStateId) {
         console.log(preselectStateId);
          setFormData(prevFormData => ({
            ...prevFormData,
            stateid: preselectStateId
          }));
          //alert(preselectStateId);
        }else{
          setFormData(prevFormData => ({
               ...prevFormData,
               countryid: countryId, // Set countryid explicitly
               stateid: null, // Reset state selection when country changes
             }));
        }

       // setFormData({ ...formData, stateid: null });
       // alert(selectedOption.value);
      })
      .catch(error => console.error('Error fetching states:', error));
    };
    const handleCountryChange = (selectedOption) => {
     
      setFormData(prevFormData => ({
        ...prevFormData,
        countryid: selectedOption ? selectedOption.value : null,
        stateid: null, // Reset state selection when country changes
      }));
    
      if (selectedOption) {
      fetchStates(selectedOption.value);
      }else {
        setStates([]); // Clear states if no country is selected
      }
    };
  
    const handleStateChange = (selectedOption) => {
      setFormData({ ...formData, stateid: selectedOption ? selectedOption.value : null });
    };
  
  return (
    <div>
        <Header />
        <section className="practise-part section-p">
        <form onSubmit={handleSubmit}>
        <div className="container">
			<div className="row align-items-center justify-content-center">
				<div className="col-lg-10">
					<h5><b>My Profile</b></h5>
					<div className="logview">
						<div className="row">
							<div className="col-lg-8 p-0">
							  <div className="form-2-wrappers p-3 mt-3">
								

  <div className="mb-3 form-box">
    <label>First Name</label>
    <input 
      type="text" 
      className="form-control" 
      name="firstname" 
      value={formData.firstname}
      onChange={handleInputChange}
      placeholder="Enter Your First Name" 
      required 
    />
  </div>
  <div className="mb-3 form-box">
    <label>Last Name</label>
    <input 
      type="text"  
      className="form-control" 
      name="lastname" 
      value={formData.lastname}
      onChange={handleInputChange}
      placeholder="Enter Your Last Name" 
      required 
    />
  </div>
  <div className="mb-3 form-box">
  <div className="row">
  <div className="col-lg-8">
  <label>Date of Birth</label>
  <input
          type="date"
          className="form-control"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          max={maxDate}
          placeholder="Enter Date of Birth"
          required
        />
     </div>
     <div className="col-lg-4">
    <label>Gender</label>
    <select 
      className="form-control" 
      name="genderid" 
      onChange={handleInputChange}
      value={formData.genderid}
      placeholder="Gender" 
      required 
    ><option value="">Select Gender</option>
      <option value="1">Male</option>
    <option value="2">Female</option>
    <option value="3">Both</option>
    </select>
     </div>
     </div>
  </div>

  <div className="mb-3 form-box">
  <div className="row">
  <div className="col-lg-8">
    <label>Email ID</label>
    <input 
      type="email" 
      className="form-control" 
      name="emailid" 
      value={formData.emailid}
      onChange={handleInputChange}
      placeholder="Enter Your email" 
      required 
    />
  </div>
  <div className="col-lg-4">
    <label>Mobile Number</label>
    <input 
      type="text" 
      className="form-control" 
      name="mobilenumber" 
      value={formData.mobilenumber}
      onChange={handleInputChange}
      placeholder="Enter Mobile Number" 
      required 
    />
    <span style={{fontSize:"10px"}}>Recruiter Will Call you on this Number</span>
  </div>
  </div>
  </div>
  <div className="mb-3 form-box">
  <div className="row">
  <div className="col-lg-6">
    <label>Country</label>
 
               <Select
          className="form-control"
          name="countryid"
          value={countries.find(option => option.value === formData.countryid) || null}
          onChange={handleCountryChange}
          options={countries}
          placeholder="Select Country"
          isClearable={true} // Allow clearing the selection
          required
        />
  </div>
  <div className="col-lg-6">
    <label>State</label>

     <Select
          className="form-control"
          name="stateid"
          value={states.find(option => option.value === formData.stateid) || null}
          onChange={handleStateChange}
          options={states}
          placeholder="Select State"
          isDisabled={!formData.countryid} // Disable until a country is selected
          isClearable={true} // Allow clearing the selection
          required
        />
  </div>
  </div>
  </div>
  <div className="mb-3 form-box">
  <div className="row">
  <div className="col-lg-6">
    <label>Passport Number</label>
    <input 
      type="text" 
      className="form-control" 
      name="passportnumber" 
      value={formData.passportnumber}
      onChange={handleInputChange}
      placeholder="Enter Your Passport Number" 
      required 
    />
     </div>
     <div className="col-lg-6">
    <label>Passport Expire Date</label>
    <input 
      type="date" 
      className="form-control" 
      name="passport_expiredate" 
      value={formData.passport_expiredate}
      onChange={handleInputChange}
      placeholder="Enter Passport Expire Date" 
      required 
    />
     </div>
     </div>
  </div>
  <div className="mb-3 form-box">
  <div className="row">
  <div className="col-lg-6">
  <label>ID Proof Type</label>
    <select 
      className="form-control" 
      name="idproof_type" 
      onChange={handleInputChange}
      value={formData.idproof_type}
      placeholder="Id Proof Type" 
      required 
    ><option value="">Select ID Proof Type</option>
      <option value="1">Aadhar</option>
    <option value="2">Voters ID</option>
    <option value="3">Driving License</option>
    </select>
     </div>
     <div className="col-lg-6">
    <label>ID Proof Number</label>
    <input 
      type="text" 
      className="form-control" 
      name="idproof_number" 
      value={formData.idproof_number}
      onChange={handleInputChange}
      placeholder="Enter ID Proof Numberr" 
      required 
    />
     </div>
     </div>
  </div>
 
  <div className="mb-3 form-box">
  <div class="row">
  
  <div className="col-lg-12">
    <label>Resume</label>
    <input 
      type="file" 
      className="form-control" 
      name="resume"
      onChange={handleInputChange}
	  accept=".doc,.docx,.pdf,.rtf"
    />

    <span style={{fontSize:"11px",color:"red"}}>Doc, DOcx, PDF, RTF | Max 2MB</span>
    <span style={{fontSize:"10px"}}>Recruiters give first preference to candidates who have a resume</span>
  </div>
  <div className="col-lg-3" style={{display:"none"}}>
  <label>&nbsp;</label>
    <input type="button" className="form-control" value="View My Resume" onClick={openModal} />
  </div>
  </div>
  </div>
 

							  </div>
							</div>
							<div className="col-lg-4 p-5">
								<div className="social-logins  type--A">
									<div className="vrline">
									<h5 className="text-center">and</h5>
									</div> 
									
		<h4 className="mb-2 text-center">Continue With</h4>
									{/* <GoogleLoginButton />
									<FacebookLoginButton /> */}
		<div className="mb-3 form-box">
    <label>Current Address</label>
    <textarea 
      className="form-control" 
      name="address" 
      onChange={handleInputChange}
      placeholder="Enter Current Address" 
      required 
      value={formData.address}
    />
  </div>
  <div className="mb-3 form-box">
    <label>Permanent Address</label>
    <textarea 
        className="form-control" 
        name="permanent_address" 
        onChange={handleInputChange}
        placeholder="Enter Permanent Address" 
        required
        value={formData.permanent_address}
      />
  </div>
  
  <h4 className="mb-2 text-center">Other Contact Details</h4>
  <div className="mb-3 form-box">
    <label>Whatsapp Number</label>
    <input 
      type="text" 
      className="form-control" 
      name="whatsapp_number" 
      value={formData.whatsapp_number || ''}
      onChange={handleInputChange}
      placeholder="Enter Whatsapp Number" 
      required 
    />
  </div>
  <div className="mb-3 form-box">
    <label>Telegram Number</label>
    <input 
      type="text" 
      className="form-control" 
      name="telegram_number" 
      value={formData.telegram_number || ''}
      onChange={handleInputChange}
      placeholder="Enter Telegram Number" 
    
    />
  </div>
  <div className="mb-3 form-box">
    <label>Linkedin Id</label>
    <input 
      type="text" 
      className="form-control" 
      name="linkedin" 
      value={formData.linkedin || ''}
      onChange={handleInputChange}
      placeholder="Enter Linkedin Id" 
    
    />
  </div>
  <div className="mb-3 form-box">
    <p>By Clicking Register, you agree to the <b>Terms and Conditions & Privacy Policy</b> of Seagulljobs4u.com</p>
  </div>
  <button type="submit" className="btn btn-outline-secondary login-btn mb-2">Save Profile</button>
  <h5 className="text-center mb-3 pb-3" style={{color:"red",fontSize:"20px"}}>{errorData}</h5>
								</div>
							</div>
							
						  </div>	
					</div>
				</div>
			</div>
		</div>
    </form>
    </section>
    <Footer />
    {showModal && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>Update Success.</h3>
            <p>Profile Successfully Update. </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Biodata