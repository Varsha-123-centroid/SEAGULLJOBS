import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link ,Routes,Route,Router,Switch, useNavigate, useHistory , useLocation } from 'react-router-dom';
import './Header.css';
const BASE_URL=process.env.REACT_APP_BASE_URL;
const Header = () => {
    const navigate = useNavigate();

    const [mobileNavVisible, setMobileNavVisible] = useState(false);
    const [candidateFName, setCandidateFName] = useState('Candidate');
    const [candidateId, setCandidateId] = useState('');
    const [jobDt, setJobDt] = useState('');
    const [count, setCount] = useState(0);
    //const [logText, setLogText] = useState('<a href="/logout">Logout</a>');
    const [loginStatus, setLoginStatus] = useState("no");
    const badgeCircleStyles = {
        position: 'absolute', // Position relative to parent
        top: '-5px', // Adjust position
        right: '-10px', // Adjust position
        backgroundColor: 'red', // Background color of the circle
        color: 'white', // Text color
        borderRadius: '50%', // Circular shape
        padding: '5px 8px', // Adjust padding to control size
        fontSize: '12px', // Font size
        fontWeight: 'bold', // Bold text
        minWidth: '20px', // Minimum width for consistency
        height: '20px', // Height to make it a perfect circle
        display: 'flex', // Center text
        alignItems: 'center', // Center text vertically
        justifyContent: 'center', // Center text horizontally
      };
    
    // Function to toggle the visibility of mobile navigation
    const toggleMobileNav = () => {
       // console.log("Toggling mobile navigation:", !mobileNavVisible);
        setMobileNavVisible(!mobileNavVisible);
    };
    const closeMobileNav = () => {
        setMobileNavVisible(false);
    };
    const handleNavigation = () => {
        const jobsData = sessionStorage.getItem('jobs');
        if (jobsData) {
            setJobDt(jobsData);
          navigate('/jobsearch');
        } else {
            setJobDt('');
          navigate('/');
        }
      };
      useEffect(() => {
        // Prevent back navigation by pushing the current route again
        navigate(window.location.pathname, { replace: true });
    
        const handlePopState = (event) => {
          // Prevent back button navigation
          event.preventDefault();
          navigate(window.location.pathname, { replace: true });
        };
    
        window.addEventListener('popstate', handlePopState);
    
        // Cleanup the event listener on component unmount
        return () => {
          window.removeEventListener('popstate', handlePopState);
        };
      }, [navigate]);  
    useEffect(() => {
        const jobsData = sessionStorage.getItem('jobs');
        if (jobsData) {
            setJobDt(jobsData);
        } else {
            setJobDt('');
        }
        const candidateFName1=  sessionStorage.getItem('candidateFName');
        const candidateId1=  sessionStorage.getItem('candidateId')
        const login1=  sessionStorage.getItem('login');
      if(candidateFName1){
      setCandidateFName(candidateFName1);
      }
      if(candidateId1){
        setCandidateId(candidateId1);
        }
      if(login1==='yes'){
       // alert(login1);
        setLoginStatus("yes");
        //setLogText('<a href="/logout">Logout</a>');

        }
        if(login1==='no'){
          //  alert(login1);
            setLoginStatus("no");
            //setLogText('<a href="/logout">Logout</a>');
            }
	  }, []);
      useEffect(() => {
        if (!candidateId) return;  // Ensure candidateId is available
    
        // Fetch the job application count from Laravel API
        axios.get(`${BASE_URL}nofiycount?candidateid=${candidateId}`)
          .then(response => {
            setCount(response.data.count); // Update the state with the count
          })
          .catch(error => {
            console.error('There was an error fetching the job application count:', error);
          });
      }, [candidateId]);

      const handleNotificationClick = () => {
        if (count > 0) {
          // Navigate to ShowList page and pass notifications as state
          navigate('/showList');
        }
      };
    return (
        <div>
            <nav id="navigation" className="navbar navbar-expand-lg nav-bg-white">
                <div className="container">
                    <a className="navbar-brand" href="/"><img src="assets/images/logo.png" alt="Logo" /></a>
                    <div className="collapse navbar-collapse" id="nav-list">
                        <ul className="navbar-nav ml-auto">
                            <li><a href="/otptest" >..</a> </li> 
                           <li className="nav-item">
                                <a href="#"  onClick={handleNotificationClick}><i className="fas fa-bell"></i>
                                {count > 0 && (<span style={badgeCircleStyles}>{count}</span>)}
                                </a>
                            </li>
                            <li><a href="#" onClick={handleNavigation}>Job Search</a> </li>
                            {jobDt === '' ? (<></>):
                            (<li><a href="/jobsearch" >Back List</a> </li>)}
                            <li className="nav-item">
                                <a href="javascript:void(0);">{candidateFName}</a>
                                <br />
                                {loginStatus === 'yes' ? 
                                (<span><a href="/logout">Logout</a></span>) : (<span></span>)}
                                {loginStatus === 'no' ? 
                                (<span><a href="/login">Login</a>/<a href="/signup">Signup</a></span>): (<span></span>)}
                            </li>
                           
                            {/* <li className="nav-item">
                                <a href="javascript:void(0);">Employer</a>
                                <br />
                                <span><a href="/loginemployer">Login</a>/<a href="/signupemployer">Signup</a></span>
                            </li> */}
                        </ul>
                    </div>
                    <button className="second-nav-toggler" type="button" onClick={toggleMobileNav}>
                        <img src="assets/images/menu.png" alt="Menu" />
                    </button>
                </div>
            </nav>

            <div id="mobile-nav" data-prevent-default="true" data-mouse-events="true" style={{ display: mobileNavVisible ? 'block' : 'none' }}>
                <div className="mobile-nav-box">
                    <div className="mobile-logo">
                    <a href="/" className="mobile-main-logo"><img src="assets/images/logo.png" alt="Mobile Logo" /></a>
                        <button className="menu-close" onClick={toggleMobileNav} style={{marginLeft:"30px"}}>
                            <img src="assets/images/cancel.png" style={{height:"30px",width:"auto"}} alt="Close" />
                            </button>
                    </div>
                    <ul className="mobile-list-nav">
                    <li className="nav-item">
                                <a href="#"  onClick={handleNotificationClick}><i className="fas fa-bell"></i>
                                {count > 0 && (<span style={badgeCircleStyles}>{count}</span>)}
                                </a>
                            </li>
                        <li><a href="#" onClick={handleNavigation}>Job Search</a> </li>
                        {jobDt === '' ? (<></>):
                            (<li><a href="/jobsearch" >Back List</a> </li>)}
                        {loginStatus === 'yes' ? 
                                (<li><a href="/biodata">Profile</a></li>) : (<></>)}
                        <li className="nav-item">
                                <a href="javascript:void(0);">{candidateFName}</a>
                                <br />
                                {loginStatus === 'yes' ? 
                                (<span><a href="/logout">Logout</a></span>) : (<span></span>)}
                                {loginStatus === 'no' ? 
                                (<span><a href="/login">Login</a>/<a href="/signup">Signup</a></span>): (<span></span>)}
                            </li>
                        {/* <li><a href="javascript:void(0);">EMPLOYER</a>
                            <br />
                            <span><a href="/loginemployer" onClick={closeMobileNav}>Login</a>/<a href="/signupemployer" onClick={closeMobileNav}>Signup</a></span>
                        </li> */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
