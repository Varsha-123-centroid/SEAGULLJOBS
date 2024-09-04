import React, { useState, useEffect } from 'react';
import { Link ,Routes,Route,Router,Switch, useNavigate, useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';
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
const Signup = () => {

	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		password: '',
		mobileNumber: ''
	  });
    const navigate = useNavigate();
    const [errorData, setErrorData] = useState('');
    const [successData, setSuccessData] = useState('');
    const [showModal, setShowModal] = useState(false);
	  const handleInputChange = (e) => {
		const { name, value, type, checked, files } = e.target;
		setFormData(prevState => ({
		  ...prevState,
		  [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
		}));
	  };
	  const handleSubmit = async (e) => {
		e.preventDefault();
		
		try {
		  const formDataToSend = new FormData();
		  for (const key in formData) {
			if (key === 'whatsappUpdates') {
				formDataToSend.append(key, formData[key] ? '1' : '0');
			  } else {
				formDataToSend.append(key, formData[key]);
			  }
		  }

		 // const response = await axios.post('http://localhost:8000/api/register', formDataToSend, {
       const response = await axios.post(`${BASE_URL}register`, formDataToSend, {
			headers: {
			  'Content-Type': 'multipart/form-data'
			}
		  });
      setErrorData("");
    //  setErrorData("Registration Success..");
      setShowModal(true);
		 // alert('Registration successful:', response.data);
     setTimeout(() => {
      setShowModal(false);
      navigate('/login');
    }, 4000);  
		  // Handle successful registration (e.g., show success message, redirect)
		} catch (error) {
		  console.log('Registration failed:', error.response ? error.response.data : error.message);
      setErrorData("Registration Failed.."+ error.response.data.message);
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
  return (
    <div>
        <Header />
        <section className="practise-part section-p">
        <div className="container">
			<div className="row align-items-center justify-content-center">
				<div className="col-lg-10">
					<p><b>Find a job Grow your Career</b></p>
					<div className="logview">
						<div className="row">
							<div className="col-lg-8 p-0">
							  <div className="form-2-wrappers p-3 mt-3">
								
<form onSubmit={handleSubmit}>
  <div className="mb-3 form-box">
    <label>Full Name</label>
    <input 
      type="text" 
      className="form-control" 
      name="fullName" 
      value={formData.fullName}
      onChange={handleInputChange}
      placeholder="Enter Your Name" 
      required 
    />
  </div>
  <div className="mb-3 form-box">
    <label>Email ID</label>
    <input 
      type="email" 
      className="form-control" 
      name="email" 
      value={formData.email}
      onChange={handleInputChange}
      placeholder="Enter Your email" 
      required 
    />
    <span style={{fontSize:"10px"}}>Recruiter Will send Notifications to this Email</span>
  </div>
  <div className="mb-3 form-box">
    <label>Password</label>
    <input 
      type="password" 
      className="form-control" 
      name="password" 
      value={formData.password}
      onChange={handleInputChange}
      placeholder="Enter Your Password" 
      required 
      minLength={8}
    />
  </div>
  <div className="mb-3 form-box">
    <label>Mobile Number</label>
    <input 
      type="text" 
      className="form-control" 
      name="mobileNumber" 
      value={formData.mobileNumber}
      onChange={handleInputChange}
      placeholder="Enter Your Number" 
      required 
    />
    <span style={{fontSize:"10px"}}>Recruiter Will Call you on this Number</span>
  </div>
  {/* <div className="mb-3 form-box">
    <label>Work Status</label>
    <div className="radio-buttons">
      <label className="custom-radio">
        <input 
          type="radio" 
          name="workStatus" 
          value="experienced"
          checked={formData.workStatus === 'experienced'}
          onChange={handleInputChange}
        />
        <span className="radio-btn">
          <i className="fa fa-check"></i>
          <div className="hobbies-icon">
            <h3>I am Experienced</h3>
            <i className="fa fa-briefcase" aria-hidden="true"></i>
          </div>
        </span>
      </label>
      <label className="custom-radio">
        <input 
          type="radio" 
          name="workStatus" 
          value="fresher"
          checked={formData.workStatus === 'fresher'}
          onChange={handleInputChange}
        />
        <span className="radio-btn">
          <i className="fa fa-check"></i>
          <div className="hobbies-icon">
            <h3>I am a Fresher</h3>
            <i className="fa fa-book" aria-hidden="true"></i>
          </div>
        </span>
      </label>
    </div>
  </div> */}
  {/* <div className="mb-3 form-box">
    <label>Resume</label>
    <input 
      type="file" 
      className="form-control" 
      name="resume"
      onChange={handleInputChange}
	  accept=".doc,.docx,.pdf,.rtf"
      required 
    />

    <span style={{fontSize:"11px",color:"red"}}>Doc, DOcx, PDF, RTF | Max 2MB</span>
    <span style={{fontSize:"10px"}}>Recruiters give first preference to candidates who have a resume</span>
  </div>
  <div className="mb-3 form-box">
  <input 
    type="checkbox" 
    id="whatsappUpdates"
    name="whatsappUpdates"
    checked={formData.whatsappUpdates}
    onChange={handleInputChange}
  />
  <label htmlFor="whatsappUpdates">Send me important updates on WhatsApp</label>
</div> */}
  <div className="mb-3 form-box">
    <p>By Clicking Register, you agree to the <b>Terms and Conditions & Privacy Policy</b> of Seagulljobs4u.com</p>
  </div>
  <button type="submit" className="btn btn-outline-secondary login-btn mb-2">Register Now</button>
  <h5 className="text-center mb-3 pb-3" style={{color:"red",fontSize:"20px"}}>{errorData}</h5>
</form>

							  </div>
							</div>
							<div className="col-lg-4 p-5">
								<div className="social-logins  type--A">
									{/* <div className="vrline">
									<h5 className="text-center">or</h5>
									</div> 
									
									<h4 className="mb-2 text-center">Continue With</h4> */}
									{/* <GoogleLoginButton />
									<FacebookLoginButton /> */}
									{/* <button className="btn btn-outline-secondary w-100 mb-2"><i className="fa fa-google text-danger"> </i> Google</button>
									<button className="btn btn-outline-secondary w-100  mb-2"><i className="fa fa-facebook-f text-primary"> </i> Facebook</button> */}
								</div>
							</div>
							
						  </div>	
					</div>
				</div>
			</div>
		</div>
    </section>
    <Footer />
    {showModal && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>Registration Success</h3>
            <p>Hi, Your Registration is successful </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Signup