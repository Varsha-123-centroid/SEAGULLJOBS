import React from 'react'
import Header from './Header';
import Footer from './Footer';
const SignupEmployer = () => {
  return (
    <div>
        <Header />
        <section className="practise-part section-p">
        <div className="container">
			<div className="row align-items-center justify-content-center">
				<div className="col-lg-10">
					<p><b>Employer Signup Form</b></p>
					<div className="logview">
						<div className="row">
							<div className="col-lg-8 p-0">
							  <div className="form-2-wrappers p-3 mt-3">
								
								<form action="#">
								  <div className="mb-3 form-box">
									<label>Company Name</label>
									<input type="text" className="form-control" id="companyname" name="companyname" placeholder="Company Name" required />
								  </div>
								  <div className="mb-3 form-box">
								    <label>Email ID</label>
									<input type="email" className="form-control" id="companyemail" name="companyemail" placeholder="Contact Email" required />
								  </div>
								  
								  <div className="mb-3 form-box">
								    <label>Mobile Number</label>
									<input type="text" className="form-control" id="companynumber" name="companynumber" Value="+91 " placeholder="Contact Number" required />
									<span style={{fontSize:"10px"}}>Recruiter Will Call you in this Number</span>
								  </div>
                                  <div className="mb-3 form-box">
								    <label>Password</label>
									<input type="password" className="form-control" id="Password" name="Password" placeholder="Enter Your Password" required />
								  </div>
                                  <div className="mb-3 form-box">
								    <label>Confirm Password</label>
									<input type="password" className="form-control" id="Password" name="Password" placeholder="Enter Your Password" required />
								  </div>
								 
								  <div className="mb-3 form-box">
								       <input type="checkbox" id="css" />
										<label for="css">Send me importnat updates On <i className="fa fa-whatsapp text-success" aria-hidden="true"></i> Whatsapp</label>
								  </div>
								  <div className="mb-3 form-box">
										<p>By Clicking Register, you agree to the <b>Terms and Conditions & Privacy Policy </b> of Seagulljobs4u.com</p>
								  </div>
								  
								  
								  <button type="submit" className="btn btn-outline-secondary login-btn mb-2">Register Now</button>
								 
								</form>

							  </div>
							</div>
							<div className="col-lg-4 p-5">
								<div className="social-logins  type--A">
									<div className="vrline">
									<h5 className="text-center">or</h5>
									</div> 
									
									<h4 className="mb-2 text-center">Continue With</h4>
									<button className="btn btn-outline-secondary w-100 mb-2"><i className="fa fa-google text-danger"> </i> Google</button>
									<button className="btn btn-outline-secondary w-100  mb-2"><i className="fa fa-facebook-f text-primary"> </i> Facebook</button>
								</div>
							</div>
							
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

export default SignupEmployer