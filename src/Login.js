import React, { useState,useEffect } from 'react';
import { Link ,Routes,Route,Router,Switch, useNavigate, useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
//import AlertModal from './components/AlertModal';
const BASE_URL=process.env.REACT_APP_BASE_URL;
const Login = () => {
  const [errorData, setErrorData] = useState('');
  const [successData, setSuccessData] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [alertTitle, setAlertTitle] = useState('');
  // const [alertMessage, setAlertMessage] = useState('');

  // // Function to show the alert modal
  // const showAlert = (title, message) => {
  //   setAlertTitle(title);
  //   setAlertMessage(message);
  //   setIsModalOpen(true);
  // };

  // // Function to handle modal close
  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
   // alert(JSON.stringify(formData)) ; 
     // const response = await axios.post('http://localhost:8000/api/loginemp', formData);
   const response = await axios.post(`${BASE_URL}loginemp`, formData);
      //console.log(JSON.stringify(response));
      if(response.status===200){
        setErrorData("");
        setShowModal(true);
       // setShowLoader(true);
      
        // Hide the loader after 4 seconds
        
    // alert("Hi, "+response.data.user.name+", Login Success");
     //showAlert('Login Success', `Hi, ${response.data.user.name}, Login Success`);
      const data =response.data; //await response.json();
      sessionStorage.setItem('candidateId', data.candidate.id);
      sessionStorage.setItem('candidateFName', data.candidate.firstname);
      const lastname=data.candidate.lastname;
      sessionStorage.setItem('login', "yes");
      sessionStorage.setItem('user', JSON.stringify(data));
      const jobs1=sessionStorage.getItem('jobs');
      const jobdetails1=sessionStorage.getItem('jobdetails');
      setTimeout(() => {
        setShowModal(false); // Hide the modal
        
         
if(lastname===null){
			navigate('/biodata');
}
else if(jobs1){
  if(jobdetails1){
    navigate('/jobdetails');
  }else{
  navigate('/');
  }
}else{
  navigate('/');
  }
}, 4000);  

      }
      else{
        setErrorData("Login Failed, Try again..");
        sessionStorage.removeItem('login');  
        sessionStorage.removeItem('candidateId');
        sessionStorage.removeItem('candidateFName');
      }
    } catch (error) {
   setErrorData("Login Failed, Try again..");
      sessionStorage.setItem('login', 'no');
      //alert("Login Failed due to " + error.response ? error.response.data : error.message);
     // console.error('Login failed:', error.response ? error.response.data : error.message);
      // Handle login error (e.g., show error message)
    }
  };
  // useEffect(() => {
  //   // Cleanup the timer when the component unmounts
  //   return () => {
  //     setShowLoader(false); // Hide loader on component unmount
  //   };
  // }, []);
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
        <body class="home-3">
        <Header />
        <section className="practise-part section-p pt-2">
        <div className="container">
			<div className="row align-items-center justify-content-center">
				<div className="col-lg-8">
					<div className="logview">
						<div className="row">
							<div className="col-lg-6 p-0 bg-banner">
								<div className="reservation-card p-4 h-100">
									<div className="reservation-card-container p-6">
									   <div className="reservation-card-inner p-sm-6">
										  <h3 className="text-white fw-600">We are glad to <br />see you again!</h3>
									   </div>
									</div>
								 </div>
							</div>

							<div className="col-lg-6 p-0">
							  <div className="form-2-wrapper">
								
								<h3 className="text-center mb-4">Login</h3>
								<form onSubmit={handleSubmit}>
      <div className="mb-3 form-box">
        <label htmlFor="email">Email/Username</label>
        <input 
          type="email" 
          className="form-control" 
          id="email" 
          name="email" 
          placeholder="Enter Your Email" 
          required 
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-0">
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          className="form-control" 
          id="password" 
          name="password" 
          placeholder="Enter Your Password" 
          required 
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <div className="text-right float-end">
          <a href="#!" className="text-decoration-none text-dark">Forget Password</a>
        </div>
      </div>
      <button type="submit" className="btn btn-outline-secondary login-btn w-100 mb-2">Login</button>
      <h5 className="text-center mb-3 pb-3" style={{color:"red"}}>{errorData}</h5>
      {/* {showLoader && <div className="loader">Loading...</div>} */}
      <div className="social-login type--A">
        <hr />
        <h5 className="text-center">or</h5>
        {/* <button className="btn btn-outline-secondary mb-2" type="button">
          <i className="fa fa-google text-danger"></i> Sign With Google
        </button>
        <button className="btn btn-outline-secondary mb-2" type="button">
          <i className="fa fa-facebook-f text-primary"></i> Sign With Facebook
        </button> */}
      </div>
    </form>

								<p className="text-center register-test mt-3">Don't have an account? <a href="/signup" className="text-decoration-none">Sign Up</a></p>
							  </div>
							</div>
						  </div>	
					</div>
				</div>
			</div>
		</div>
    </section>
    <Footer />
    {/* <AlertModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={alertTitle}
        message={alertMessage}
      /> */}
    </body>
    {showModal && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>Login Success</h3>
            <p>Hi, You have successfully logged in.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login