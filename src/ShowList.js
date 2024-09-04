import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { formatDistanceToNow, parseISO } from 'date-fns';
const BASE_URL=process.env.REACT_APP_BASE_URL;
const ShowList = () => {
  const [notifications, setNotifications] = useState([]);
  const [candidateId, setCandidateId] = useState('');
  const [prime, setPrime] = useState([]);
  const [errorData, setErrorData] = useState('');
  const [acceptData, setAcceptData] = useState('Accept');
  const [successData, setSuccessData] = useState('');
  const [jobDetails, setJobDetails] = useState([]);
  const [buttonTexts, setButtonTexts] = useState({});
  const [successTexts, setSuccessTexts] = useState({});
  useEffect(() => { 
    const candidateId1=  sessionStorage.getItem('candidateId')
  
  if(candidateId1){
    setCandidateId(candidateId1);
    }
  }, []);
  useEffect(() => {
    if (!candidateId) return;  // Ensure candidateId is available

    // Fetch the job application count from Laravel API
    axios.get(`${BASE_URL}nofiyList?candidateid=${candidateId}`)
      .then(response => {
        setNotifications(response.data.nofiyList); // Update the state with the count
      })
      .catch(error => {
        console.error('There was an error fetching the job application List:', error);
      });
  }, [candidateId]);
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
  const handleButtonClick = async (appId) => {
		
    const candidateId = sessionStorage.getItem('candidateId');
    //alert(jobId);
    if (candidateId) {

        const formData={
            applicationid: appId,
            candidateid: candidateId
          };
      // User is logged in, proceed to apply for the job
      try {
        //const response = await fetch('http://localhost:8000/api/applyJob',{
        const response = await fetch(`${BASE_URL}acceptNotification`,{
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(formData)
       });

        if (response.status === 200) {
            const data1 = await response.json();
           
            if (data1) {
             
              setButtonTexts((prevButtonTexts) => ({
                ...prevButtonTexts,
                [appId]: 'Accepted', // Change the text to "Accepted" or any other value
              }));
              setSuccessTexts((prevSuccessTexts) => ({
                ...prevSuccessTexts,
                [appId]: 'Job Notification Accepted Further Communication will be direct.', // Change the text to "Accepted" or any other value
              }));
                //setSuccessData('Job Notification Accepted Further Communication will be direct.');
                setErrorData("");
              } else {
                console.error('Unexpected response structure:', response.error);
               setErrorData('Some Error');
               setSuccessData("");
              }
        } else {
            setErrorData('Some Error');
            setSuccessData("");
        }
      } catch (error) {
        setErrorData('Some Error');
        setSuccessData("");
        //alert('An error occurred while applying for the job');
      }
    } 
  };
  const concatenateStrings = (str1, str2, str3) => {
		
    const parts = [str1, str2, str3].filter(part => part !== null && part !== undefined && part !== '');

    //alert(parts);
    return parts.join('/');
  };
  return (
    <div>
         <Header />
         <section className="practise-part section-p bg-light">
        <div className="container">
			<div className="row">
				<div className="col-lg-8">
<div>
      <h3>Job Alerts</h3>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((item, index) => (
            
            <div className="card mb-3">
						<div className="card-body">
							<div className="row">
								<div className="col-lg-10">
                                    <h5 style={{color:"green"}}>You are Short Listed with the Acknowledge Number :<span style={{fontSize:"20px"}}>{item.acknowledge_no}</span>, for Jobs you Applied below,Please accept for further communications</h5>
									<h4>{item.jobtitle} - ({item.numberofposts}Posts)</h4>
									<h5 className="mb-3">{item.companyname}</h5>
									
									<div className="deatilssec"><span className="pe-3"><i className="fa fa-briefcase" aria-hidden="true"></i> {item.minimumexperince} - {item.maximumexperince} years of experience - {item.industryname}  </span> <span className="pe-3"> <i className="fa fa fa-inr" aria-hidden="true"></i> {item.minbasicsalary} - {item.maxbasicsalary} Lacs PA </span> <span className="pe-3"> <i className="fa fa-map-marker" aria-hidden="true"></i>{item.location_name}
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
									<h5>Posted {calculateDaysAgo(`${item.posteddate}`)}  <br /> Openings: {item.numberofposts}  </h5>
								</div>
								
								{/* <div className="col-lg-3" style={{display:regDisply}}>
									<a href="/signup"><button className="btn btn-pink mb-2 w-100" onClick={() => handleButtonClick(item.jobidd)}>{loginApply}</button></a>
								</div> */}
									{item.nofiy_status ? (
										<>
										</>
									) : (
										<div className="col-lg-3">
										<a href="javascript:void(0);">
										<button
											className="btn btn-blue mb-2 w-100"
											onClick={() => handleButtonClick(item.appId)}
										>
											{buttonTexts[item.appId] || acceptData}
										</button>
										</a>
										
										</div>
									)}
									<br />
									<h5 className="text-center mb-3 pb-3" style={{color:"red",paddingLeft:"20px"}}>{errorData}</h5>
                  <h5 className="text-center mb-3 pb-3" style={{color:"green",paddingLeft:"20px"}}>{successTexts[item.appId] || successData}</h5>
              </div>
						</div>
					</div>
          ))}
        </ul>
      ) : (
        <p>No notifications available.</p>
      )}
</div>
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

    </div>
  );
};

export default ShowList;
