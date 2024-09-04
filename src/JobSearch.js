import React, { useState, useEffect } from 'react';
import { Link ,Routes,Route,Router,Switch, useNavigate, useHistory , useLocation } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
const BASE_URL=process.env.REACT_APP_BASE_URL;
const JobSearch = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const jobsData = sessionStorage.getItem('jobs');
	const [jobs, setJobs] = useState(JSON.parse(jobsData));
	const [filteredJobs, setFilteredJobs] = useState([]);
	const [minSalary, setMinSalary] = useState(0);
	const [maxSalary, setMaxSalary] = useState(300000);
	const [salary, setSalary] = useState(0);
	const [status, setStatus] = useState(null);
	const [locations, setLocations] = useState([]);
	const [designations, setDesignations] = useState([]);
	const [minExperience, setMinExperience] = useState(0);
	const [maxExperience, setMaxExperience] = useState(25);
	const [experience, setExperience] = useState(1);
	useEffect(() => {
		// Retrieve jobs from sessionStorage
		const jobsData = sessionStorage.getItem('jobs');
		
		if (jobsData) {
		  try {
			// Parse the jobs data and set it to the state
			const parsedJobs = JSON.parse(jobsData);
			//alert(JSON.stringify(parsedJobs));
			setJobs(parsedJobs);
		  } catch (error) {
			console.error('Error parsing jobs data:', error);
		  }
		}
	  }, []);
	  useEffect(() => {
		const filtered = jobs.filter(job => job.minbasicsalary >= salary);
		setFilteredJobs(filtered);
	  }, [minSalary, maxSalary, jobs]);
	useEffect(() => {
		axios.get(`${BASE_URL}distinct-data`)
		  .then(response => {
			console.log(JSON.stringify(response.data));
			setLocations(response.data.locations);
			setDesignations(response.data.designations);
			setMinExperience(response.data.minExperience);
			setMaxExperience(response.data.maxExperience);
			setExperience(response.data.minExperience);
		  })
		  .catch(error => {
			console.error("There was an error fetching the data!", error);
		  });
	  }, []);
 const handleSalaryChange = (e) => {
		const newSalary = parseFloat(e.target.value);
		const filtered = jobs.filter(job => job.minbasicsalary >= newSalary);
		setFilteredJobs(filtered);
		setSalary(newSalary);
	  };

 const [selectedLocation, setSelectedLocation] = useState(null);
 const [selectedDesignation, setSelectedDesignation] = useState(null);
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    console.log('Selected location ID:', event.target.value);
  };
  const handleDesignationChange = (event) => {
    setSelectedDesignation(event.target.value);
    console.log('Selected Designation ID:', event.target.value);
  };
	  const handleButtonClick = async (e) => {
		e.preventDefault();
	
		const formData={
			skill: selectedDesignation,  // Changed from 'skils' to 'skill'
			location: selectedLocation,
			exp: experience
		}
		//alert(JSON.stringify(formData));
		console.log('Submitting form data:', formData);  // For debugging
		
		try {
		 //  const response = await fetch('http://localhost:8000/api/getJobs', {
			const response = await fetch(`${BASE_URL}getJobs`, {
		
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		  });
	  
		  if (response.ok) {
			setStatus(response.status);
			const data = await response.json();
			sessionStorage.setItem('jobs', JSON.stringify(data));
			const jobsData = sessionStorage.getItem('jobs');
			setJobs(JSON.parse(jobsData));
		//	navigate('/jobsearch', { state: { response: data } });
		  } else {
			setStatus(response.status);
			console.error('Failed to submit form');
		  }
		} catch (error) {
		  console.error('Error submitting form', error);
		}
	  };
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
	 const handleClick = async (e,idd,desigid) => {
	
		e.preventDefault();
		//alert(idd);
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
			navigate('/jobdetails', { state: { response: data } });
			
		   } else {
		 	console.error('Failed to submit form');
		   }
		} catch (error) {
		  console.error('Error submitting form', error);
		}
	  };
	const renderResponse = () => {
		if (status === 404) {
			return <div>No job openings found..</div>;
		  }
		if (Array.isArray(filteredJobs)) {
		  return filteredJobs.map((item, index) => (
			<div key={index}>
			 
			  <div className="card mb-3">
						<div className="card-body">
                        <a href="javascript:void(0);" onClick={(e) => handleClick(e, item.id,item.designationid)}>
							<div className="row">
								<div className="col-lg-10">
									
									<h4>{item.jobtitle}</h4>
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
							<div className="row mt-3">
								<div className="col-lg-6">
								<h5>Posted {calculateDaysAgo(`${item.posteddate}`)}  | Openings: {item.numberofposts} </h5>
								</div>
								<div className="col-lg-6 text-right">
									<small className="pe-3"> <i className="fa fa-bookmark-o" aria-hidden="true"> </i> Save</small>
								</div>
							</div>
                            </a>
						</div>
					</div>
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
			    <div className="col-lg-3">
					<div className="card mb-3">
						<div className="card-body">
							<h4 className="mb-2">More Search</h4>
								<div className="list-group-select">
									<h5>Designations</h5>

									<div className="facet-wrapper" data-facet="district"> 
									{designations.map(designation => (
										 <label key={designation.id} className="checkBox-wrap" htmlFor={designation.designation}>
										 {designation.designation}
										 <input
										   type="radio"
										   id={designation.designation}
										   value={designation.id}
										   onChange={handleDesignationChange}
										   checked={selectedDesignation === designation.id.toString()}
										   data-el="facet"
										   name="designation"
										 />
										 <span className="checkmark"></span>
									   </label>
										))}
										
									</div>
									<hr />
									<h5>Experience</h5>
									<div>
										<small>Current Value: {experience} yrs</small>
									</div>
									<input
										name="range-2"
										value={experience}
										min={minExperience}
										max={maxExperience}
										step="1"
										type="range"
										style={{ width: "100%" }}
										onChange={(e) => setExperience(e.target.value)}
									/>
									 <div className="d-flex row">
										<small className="col-lg-6 text-left">{minExperience} yrs</small>
										<small className="col-lg-6 text-right">{maxExperience} yrs</small>
									</div>
									
									<hr />
									<h5>Locations</h5>
										<div className="facet-wrapper" data-facet="district"> 
										{locations.map(location => (
										
												<label key={location.id}  className="checkBox-wrap" for={location.location_name}>{location.location_name}
											<input type="radio" 
											 data-el="facet" 
											 id={location.location_name}
											 value={location.id}
											 onChange={handleLocationChange}
											 name="location" 
											  checked={selectedLocation === location.id.toString()}
											 />
											 <span className="checkmark"></span> 
											</label>
											
											))}

										
										</div>
										<hr />
										<input type="button" id="16" onClick={handleButtonClick} value="Search" className='form-control btn btn-primary' /> 
											
								</div>
				
						</div>
					</div>
				</div>
				<div className="col-lg-9">
					<div className="row mb-3">
						{/* <div className="col-lg-4">
							<p>1 - 20 of 43690 Search result</p>
						</div> */}
						<div className="col-lg-12">
						
									<div>
										<small>Minimum Salary: {salary} /Month</small>
									</div>
									<input
										name="range-3"
										value={salary}
										min={minSalary}
										max={maxSalary}
										step=".25"
										type="range"
										style={{ width: "100%" }}
										onChange={handleSalaryChange}
									/>
									 <div className="d-flex row">
										<small className="col-lg-6 text-left">{minSalary} /Month</small>
										<small className="col-lg-6 text-right">{maxSalary} /Month</small>
									</div>
						</div>
						
						{/* <div className="col-lg-4">
							<select className="btn btn-defult border-1 form-contorl text-left w-100">
								<option selected>Sort By Relavence</option>
								<option value="3">Three</option>
								<option value="1">One</option>
								<option value="0">Zero</option>
								<option value="2">Two</option>
								<option value="8">Eight</option>
							</select>
						</div> */}
					</div>


{jobs ? (
        <div>

          {renderResponse()}
        </div>
      ) : (
        <p>No data received</p>
      )}

					

{/* {response ? (
        <div>
          <h2>Data received:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      ) : (
        <p>No data received</p>
      )}  */}
					
					
				</div>
				
			</div>
		</div>
    </section>
    <Footer />
    </div>
  )
}

export default JobSearch