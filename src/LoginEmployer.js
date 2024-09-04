import React from 'react'
import Header from './Header';
import Footer from './Footer';
const LoginEmployer = () => {
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
										  <h3 className="text-white fw-600">Your Requirement is <br />Our Priority!</h3>
									   </div>
									</div>
								 </div>
							</div>

							<div className="col-lg-6 p-0">
							  <div className="form-2-wrapper">
								
								<h3 className="text-center mb-4">Employer Login</h3>
								<form action="#">
								  <div className="mb-3 form-box">
									<label>Email/Username</label>
									<input type="email" className="form-control" id="email" name="email" placeholder="Enter Your Email" required />
								  </div>
								  <div className="mb-0">
								  <label>Password</label>
									<input type="password" className="form-control" id="password" name="password" placeholder="Enter Your Password" required />
								  </div>
								  <div className="mb-3">
									<div className="text-right float-end">
									  <a href="#!" className="text-decoration-none text-dark">Forget Password</a>
									</div>

								  </div>
								  <button type="submit" className="btn btn-outline-secondary login-btn w-100 mb-2">Login</button>
								  <h5 className="text-center mb-3 pb-3">Use OTP to Login</h5>
								  
								  <div className="social-login  type--A">
								  <hr /> 
									<h5 className="text-center">or</h5>
									
									<button className="btn btn-outline-secondary  mb-2"><i className="fa fa-google text-danger"></i> Sign With Google</button>
									<button className="btn btn-outline-secondary mb-2"><i className="fa fa-facebook-f text-primary"></i> Sign With Facebook</button>
								  </div>
								  
								</form>

								<p className="text-center register-test mt-3">Don't have an account? <a href="#" className="text-decoration-none">Sign In</a></p>
							  </div>
							</div>
						  </div>	
					</div>
				</div>
			</div>
		</div>
    </section>
    <Footer />
    </body>
    </div>
  )
}

export default LoginEmployer