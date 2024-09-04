import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear(); 
  return (
    <div>
        <footer className="footer-part footer-bg-light">
    <div className="footer-widget">
        <div className="container">
            <div className="row">

                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="footer-logo">
                        <a href="#"><img src="images/logo.png" alt="" /></a>
                       
                        <ol className="flat-list pt-5">
                            <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                            <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                        </ol>
                    </div>
                </div>
        
                <div className="col-12 col-sm-6 col-lg-3 mt-4 mt-sm-0">
                    <div className="footer-widget-item">
                        <ul className="footer-widget-link pe-3">
                            <li><a href="#"><i className="fa fa-angle-double-right"></i> Job Seekers</a></li>
                            <li><a href="#"><i className="fa fa-angle-double-right"></i> Job Search</a></li>
                            <li><a href="#"><i className="fa fa-angle-double-right"></i> Job Seekers Login</a></li>
                            <li><a href="#"><i className="fa fa-angle-double-right"></i> Upload Resume</a></li>
                            <li><a href="#"><i className="fa fa-angle-double-right"></i> Career Advice</a></li>
                            <li><a href="#"><i className="fa fa-angle-double-right"></i> Search Tips</a></li>
                            <li><a href="#"><i className="fa fa-angle-double-right"></i> Free Job Alerts</a></li>
                            <li><a href="#"><i className="fa fa-angle-double-right"></i> Find complaints</a></li>
                            <li><a href="#"><i className="fa fa-angle-double-right"></i> Help</a></li>
                        </ul>
                    </div>
                </div>
       
                <div className="col-12 col-sm-6 col-lg-3 mt-4 mt-lg-0">
                   <div className="footer-widget-item">
						<ul className="footer-widget-link">
							<li><a href="#"><i className="fa fa-angle-double-right"></i> Employers</a></li>
							<li><a href="#"><i className="fa fa-angle-double-right"></i> Employer Login</a></li>
							<li><a href="#"><i className="fa fa-angle-double-right"></i> Job Posting</a></li>
							<li><a href="#"><i className="fa fa-angle-double-right"></i> Resume Access Database</a></li>
							<li><a href="#"><i className="fa fa-angle-double-right"></i> Advertise with Us</a></li>
							<li><a href="#"><i className="fa fa-angle-double-right"></i> Research Reports</a></li>
							<li><a href="#"><i className="fa fa-angle-double-right"></i> Buy Online</a></li>
						</ul>
					</div>
				</div>
      
            <div className="col-12 col-sm-6 col-lg-3 mt-4 mt-lg-0">
                   <div className="footer-widget-item">
						<ul className="footer-widget-link">
							<li><a href="#"><i className="fa fa-angle-double-right"></i> About Us</a></li>
							<li><a href="#"><i className="fa fa-angle-double-right"></i> Contact Us</a></li>
							<li><a href="#"><i className="fa fa-angle-double-right"></i> Career With Us</a></li>
							<li><a href="#"><i className="fa fa-angle-double-right"></i> Send Feedback</a></li>
							<li><a href="#"><i className="fa fa-angle-double-right"></i> Testimonials</a></li>
							<li><a href="#"><i className="fa fa-angle-double-right"></i> Stay Coonected</a></li>
							<li><a href="#"><i className="fa fa-angle-double-right"></i> Legal</a></li>
							<li><a href="#"><i className="fa fa-angle-double-right"></i> Security & Fraud</a></li>
							<li><a href="#"><i className="fa fa-angle-double-right"></i> Privacy & Policy</a></li>
						</ul>
					</div>
				</div>
            
        </div>
    </div>
</div>

<div className="footer-copyright">
    <div className="container">
        <div className="row">
            <div className="col-xl-12">
                <p>Copyright ©<span> {currentYear}</span> | All rights reserved <a href="#@!">Seagulljobs</a></p>
            </div>
        </div>
    </div>
</div>


</footer>
    </div>
  )
}

export default Footer