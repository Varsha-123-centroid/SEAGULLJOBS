import React, { useState, useEffect } from 'react';
import { Link ,Routes,Route,Router,Switch, useNavigate, useHistory , useLocation } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
const BASE_URL=process.env.REACT_APP_BASE_URL;
const JobDetails = () => {
	const location = useLocation();
	const navigate = useNavigate();
//	const { response } = location.state || {};
const [errorData, setErrorData] = useState('');
const [successData, setSuccessData] = useState('');
	const [jobDetails, setJobDetails] = useState([]);
	const [loginApply, setLoginApply] = useState('Login To Apply');
	const [regApply, setRegApply] = useState('Register To Apply');
	const [regDisply, setRegDisply] = useState('block');
	const [prime, setPrime] = useState([]);
	const [jobid, setJobid] = useState('');
	const [applied, setApplied] = useState(0);
	useEffect(() => {
		// Retrieve jobs from sessionStorage
		const login1 = sessionStorage.getItem('login');
		if(login1==='yes'){
			setLoginApply('Apply');
			setRegDisply('none')
		}
		else{
			setLoginApply('Login To Apply');
			setRegApply('Register To Apply')
			setRegDisply('block')
		}
	}, []);
	useEffect(() => {
		axios
        .get(`${BASE_URL}getprimeJobs`)        
        .then((response) => {
         // alert(JSON.stringify(response.data));
         setPrime(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
	}, []);
	useEffect(() => {
		// Retrieve jobs from sessionStorage
		const jobsData = sessionStorage.getItem('jobdetails');
		
		if (jobsData) {
		  try {
			// Parse the jobs data and set it to the state
			const parsedJobs = JSON.parse(jobsData);
			setJobDetails(parsedJobs);
			//console.log(parsedJobs); 
			setJobid(parsedJobs[0].jobidd);
		  } catch (error) {
			console.error('Error parsing jobs data:', error);
		  }
		}
	  }, []);
	  useEffect(() => {
		if (jobid) {  // Ensure jobid is not undefined or null
		  axios
			.get(`${BASE_URL}getCountApplies`, {
			  params: { jobid: jobid }  // Pass jobid as a query parameter
			})
			.then((response) => {
			  // alert(JSON.stringify(response.data));
			  setApplied(response.data.applicantCount);
			})
			.catch((error) => {
			  console.error('Error fetching data:', error);
			});
		}
	  }, [jobid]);
	const calculateDaysAgo = (dateString) => {
		if (!dateString) {
		  return "Invalid date";
		}
	  
		try {
		  const postedDate = parseISO(dateString);
		  return formatDistanceToNow(postedDate, { addSuffix: true });
		} catch (error) {
		  console.error("Error parsing date:", error);
		  return "Invalid date..";
		}
	  };
	  const concatenateStrings = (str1, str2, str3) => {
		
		const parts = [str1, str2, str3].filter(part => part !== null && part !== undefined && part !== '');

		//alert(parts);
		return parts.join('/');
	  };
	  const handleButtonClick = async (jobId) => {
		
		const candidateId = sessionStorage.getItem('candidateId');
		//alert(jobId);
		if (candidateId) {

			const formData={
				jobopeningid: jobId,
				candidateid: candidateId
			  };
		  // User is logged in, proceed to apply for the job
		  try {
			//const response = await fetch('http://localhost:8000/api/applyJob',{
			const response = await fetch(`${BASE_URL}applyJob`,{
			 method: 'POST',
		 	headers: {
		 	  'Content-Type': 'application/json'
		 	},
			 body: JSON.stringify(formData)
		   });
	
			if (response.status === 200) {
				const data1 = await response.json();
				setSuccessData('Job application successful. Acknowledge Number: ' + data1.acknowledge);
				setErrorData("");
				if (data1) {
					setSuccessData('Job application successful. Acknowledge Number: ' + data1.acknowledge);
					
				  } else {
					console.error('Unexpected response structure:', response.error);
					setSuccessData('Job application successful, but unable to retrieve acknowledge number.');
					setErrorData("");
				  }
			} else {
				setErrorData('Failed to apply for the job');
				setSuccessData("");
			}
		  } catch (error) {
			setErrorData('Error applying for the job:', error);
			setSuccessData("");
			//alert('An error occurred while applying for the job');
		  }
		} else {
		  // User is not logged in, redirect to login page
		  navigate('/login', { state: { jobId } });
		}
	  };
	  const handleClick = async (e,idd,desigid) => {
	
		e.preventDefault();
	//alert(JSON.stringify(formData));
	const formData={
		jobId: idd,
		designationId: desigid
	  };
	 // alert(JSON.stringify(formData));
		try {
			
		  //const response = await fetch('http://localhost:8000/api/getJobDetails', {
		  const response = await fetch(`${BASE_URL}getJobDetails`, {
			
		 	method: 'POST',
		 	headers: {
		 	  'Content-Type': 'application/json'
		 	},
			 body: JSON.stringify(formData)
		   });
		   if (response.ok) {
		
		 	const data = await response.json();
			 sessionStorage.setItem('jobdetails', JSON.stringify(data));
			 const jobsData = sessionStorage.getItem('jobdetails');

			setJobDetails(JSON.parse(jobsData));
		//	navigate('/jobdetails', { state: { response: data } });
			
		   } else {
		 	console.error('Failed to submit form');
		   }
		} catch (error) {
		  console.error('Error submitting form', error);
		}
	  };
	  const SkillsDisplay = ({ keySkills }) => {
		// Split the keySkills string into an array
		//const skillsArray = keySkills.split(', ');
	    const skillsArray = keySkills ? keySkills.split(',') : [];
		return (
		  <div>
			<div  className="searchlist mt-3">
			{skillsArray.map((skill, index) => (
			
					
						<div key={index} className="searchitem">
							<a href="#!" className="Searchitemsview">{skill}</a>
						</div>
			  	
				



			))}
	</div>
		  </div>
		);
	  };
	  const renderResponse = () => {
		if (Array.isArray(jobDetails)) {
		  return jobDetails.map((item, index) => (
			<div key={index}>
				<div className="card mb-3">
						<div className="card-body">
							<div className="row">
								<div className="col-lg-10">
									<h4>{item.jobtitle} - ({item.numberofposts}Posts)</h4>
									<h5 className="mb-3">{item.companyname}</h5>
									
									<div className="deatilssec"><span className="pe-3"><i className="fa fa-briefcase" aria-hidden="true"></i> {item.minimumexperince} - {item.maximumexperince} years of experience - {item.industryname}  </span> <span className="pe-3"> <i className="fa fa fa-inr" aria-hidden="true"></i> {item.minbasicsalary} - {item.maxbasicsalary} /Month </span> <span className="pe-3"> <i className="fa fa-map-marker" aria-hidden="true"></i>{item.location_name}
                                    </span></div>
									<div className="deatilssec"><span className="pe-3"><i className="fa fa-file" aria-hidden="true"></i> {concatenateStrings(`${item.requiredqualification1}`,`${item.requiredqualification2}`,`${item.requiredqualification3}`)} </span></div>
									
								</div>
								<div className="col-lg-2">
									<div className="companylogo">
										<img src={`https://seagulljobs4u.com/admin/uploads/images/companylogos/${item.company_logo}`} alt="" className="img-fluid" />
									</div>
								</div>
							</div>
							<hr />
							<div className="row">
								<div className="col-lg-6">
									<h5>Posted {calculateDaysAgo(`${item.posteddate}`)}  <br /> Openings: {item.numberofposts} | Applicants: {applied} </h5>
								</div>
								<div className="col-lg-3" style={{display:regDisply}}>
									<a href="/signup"><button className="btn btn-pink mb-2 w-100">{regApply}</button></a>
								</div>
								{/* <div className="col-lg-3" style={{display:regDisply}}>
									<a href="/signup"><button className="btn btn-pink mb-2 w-100" onClick={() => handleButtonClick(item.jobidd)}>{loginApply}</button></a>
								</div> */}
									{item.acknowledge_no ? (
										<div className="col-lg-6">
										<span style={{fontWeight:"bold"}}>You are already Applied this job <br /> Your Acknowledge Number is : {item.acknowledge_no}</span>
										</div>
									) : (
										<div className="col-lg-3">
										<a href="javascript:void(0);">
										<button
											className="btn btn-blue mb-2 w-100"
											onClick={() => handleButtonClick(item.jobidd)}
										>
											{loginApply}
										</button>
										</a>
										
										</div>
									)}
									<br />
									<h5 className="text-center mb-3 pb-3" style={{color:"red",paddingLeft:"20px"}}>{errorData}</h5>
									<h5 className="text-center mb-3 pb-3" style={{color:"green",paddingLeft:"20px"}}>{successData}</h5>
							</div>
						</div>
					</div>
					
					
					
					
					<div className="card mb-3">
						<div className="card-body">
							<div className="mb-3">
								<h4>Job Description</h4>
								<h5>
								{item.descriptions?.length > 0 ? item.descriptions : "No description available"}
                                </h5>
								
							</div>
							
							<div className="mb-3">
								<h4>Required Candidate Profile</h4>
								
								<h5>
								{item.required_profile}
								</h5>

							</div>
							
							<div className="mb-3">
								<h5><b>Role : </b>{item.jobrole} </h5>
								<h5><b>Industry : </b>{item.industryname} </h5>
								<h5><b>Department : </b>{item.departmentname} </h5>
								<h5><b>Employment Type : </b>{item.employment_type}</h5>
								<h5><b>Education : </b>{concatenateStrings(`${item.requiredqualification1}`,`${item.requiredqualification2}`,`${item.requiredqualification3}`)} </h5>
							</div>
							
							<div className="mb-3">
								<h4>Key Skils</h4>
								<h5>Skils highlighted with are preferred Keyskils</h5>
								
								

								<SkillsDisplay keySkills={item.key_skills} />
								{/* <div className="searchlist mt-3">

									<div className="searchitem">
										<a href="#!" className="Searchitemsview">Welders</a>
									</div>
									<div className="searchitem">
										<a href="#!" className="Searchitemsview">Fiters</a>
									</div>
									<div className="searchitem">
										<a href="#!" className="Searchitemsview">Accounts</a>
									</div>
									<div className="searchitem">
										<a href="#!" className="Searchitemsview">Project Managers</a>
									</div>
									<div className="searchitem">
										<a href="#!" className="Searchitemsview">Riggers</a>
									</div>
									<div className="searchitem">
										<a href="#!" className="Searchitemsview">Designers</a>
									</div>
									<div className="searchitem">
										<a href="#!" className="Searchitemsview">Engineres</a>
									</div>
									
									
									<div className="searchitem">
										<a href="#!" className="Searchitemsview">Riggers</a>
									</div>
									<div className="searchitem">
										<a href="#!" className="Searchitemsview">Engineres</a>
									</div>
									<div className="searchitem">
										<a href="#!" className="Searchitemsview">Welders</a>
									</div>
									<div className="searchitem">
										<a href="#!" className="Searchitemsview">Fiters</a>
									</div>
									<div className="searchitem">
										<a href="#!" className="Searchitemsview">Designers</a>
									</div>
									<div className="searchitem">
										<a href="#!" className="Searchitemsview">Accounts</a>
									</div>
									<div className="searchitem">
										<a href="#!" className="Searchitemsview">Project Managers</a>
									</div>
									<div className="searchitem">
										<a href="#!" className="Searchitemsview">Welders</a>
									</div>
									<div className="searchitem">
										<a href="#!" className="Searchitemsview">Fiters</a>
									</div>
									<div className="searchitem">
										<a href="#!" className="Searchitemsview">Accounts</a>
									</div>
									<div className="searchitem">
										<a href="#!" className="Searchitemsview">Project Managers</a>
									</div>
									<div className="searchitem">
										<a href="#!" className="Searchitemsview">Riggers</a>
									</div>
									<div className="searchitem">
										<a href="#!" className="Searchitemsview">Designers</a>
									</div>
							    </div> */}
							</div>
						</div>
					</div>
					
					<div className='row'>
					<div className='col-lg-6'>
					<div className="card mb-3">
						<div className="card-body">
							<div className="mb-3">
								<h4>About Company</h4>
								<p>{item.companyname} </p>
								<p>{item.companyaddress}</p>
								<p>{item.location} </p>
							</div>
							<div className="mb-3">
								<h4>Company Info</h4>
								<p><b>Website.{item.companywebsite}</b></p>
								<p>Call No.{item.contactnumber}<br />
								Email.{item.contactemail}</p>
							</div>
						</div>
					</div>
					</div>
					<div className='col-lg-6'>
					<div className="card mb-3">
						<div className="card-body">
							<h4>Benfits & Perks</h4>
							<div className="row ">
								<div className="col-lg-4">
									<div className="benfitssec text-center">
										<img src="assets/images/about/food.jpg" alt="" />
										<h6>Free <br /> Food</h6>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="benfitssec text-center">
										<img src="assets/images/about/acco.jpg" alt="" />
										<h6>Free <br /> Accommodation</h6>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="benfitssec text-center">
										<img src="assets/images/about/leave.jpg" alt="" />
										<h6>Annual <br /> paid Leave</h6>
									</div>
								</div>
							</div>
						</div>
					</div>
					</div>
					</div>
{/* 					
					<div className="card mb-3">
						<div className="card-body">
							<div className="mb-3">
								<h4>Beware Of imposters</h4>
								<h5>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga....</h5>
							</div>
						</div>
					</div> */}
			  
			</div>
		  ));
		}  else {
		  return <p>Invalid data format received</p>;
		}
	  };
  return (
    <div>
        <Header />
        <section className="practise-part section-p bg-light">
        <div className="container">
			<div className="row">
				<div className="col-lg-8">
<div>
{renderResponse()}
</div>


					
					{/* {response ? (
        <div>
          <h2>Data received:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      ) : (
        <p>No data received</p>
      )} 	
					 */}
					
				</div>
				<div className="col-lg-4">
					<div className="card mb-3">
						<div className="card-body">
						<h4 className="mb-2">Jobs you might be intersted</h4>
						{prime.length > 0 ? (
					<div className="row ">
						{prime.map((job) => (
							<div style={{paddingLeft:"20px"}}>
								<a href="javascript:void(0);" onClick={(e) => handleClick(e, job.id,job.designationid)}>
							<div className="row ">
								<div className="col-lg-8">
									<h5>{job.jobtitle}</h5>
									<h5 className="mb-3">{job.companyname}</h5>
									<div className="deatilssec"><span className="pe-3"> <i className="fa fa-map-marker" aria-hidden="true"></i>{job.location_name}
                                    </span></div>
									<small>Posted {calculateDaysAgo(`${job.posteddate}`)}  <br /> Openings: {job.numberofposts}</small>
								</div>
								<div className="col-lg-4">
									<div className="companylogo">
										<img src={`https://seagulljobs4u.com/admin/uploads/images/companylogos/${job.company_logo}`} alt="" className="img-fluid" />
										<br />
										
									</div>
								</div>
							</div>
							</a>
							<hr />
							</div>
 ))}
 </div>
) : (
 <p>No jobs available.</p>
)}


							
						</div>
					</div>
					
					
					
					
				
				
				
				</div>
			</div>
		</div>
    </section>
    <Footer />
    </div>
  )
}

export default JobDetails