import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Header from './Header';
import Footer from './Footer';
import BannerSlider from './BannerSlider';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
const Home = () => {

	
  return (
    <div>
        <Header />
		<BannerSlider />
  
 
		<section className="clint-logo-3 section-p">
      <div className="container">
        <div className="row justify-content-center">
          <div className="section-head text-center">
            <h2>Top Recruiters</h2>
          </div>
          <div className="swiper-container clint-logo-3-slider">
            <Swiper
              loop={true}
              effect="slide"
              speed={900}
              autoplay={{ delay: 1500 }}
              pagination={{ clickable: true }}
              slidesPerView={5}
			  modules={[Autoplay, EffectFade]}
              
            >
              <SwiperSlide><img className="clientele-logo" src="assets/images/clients/samsung.jpg" alt="" /></SwiperSlide>
              <SwiperSlide><img className="clientele-logo" src="assets/images/clients/madina.jpg" alt="" /></SwiperSlide>
              <SwiperSlide><img className="clientele-logo" src="assets/images/clients/sts.jpg" alt="" /></SwiperSlide>
              <SwiperSlide><img className="clientele-logo" src="assets/images/clients/altradcape.jpg" alt="" /></SwiperSlide>
        
					
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/descon.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/bec.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/kaefer.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/drydocks.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/arabian.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/qcon.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/alshaya.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/baskinrobbins.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/adyard.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/albalagh.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/almulla.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/arabianmep.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/binladin.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/doosan.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/emrill.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/galfar.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/khansaheb.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/kier.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/lamprell.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/limak.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/limak-.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/mcsc.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/nbtc.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/satorp.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/smasco.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/SAS.jpg" alt=""/></SwiperSlide>
						<SwiperSlide><img className="clientele-logo"  src="assets/images/clients/transguard.jpg" alt=""/></SwiperSlide>
                 </Swiper>   
                </div>
            </div>
        </div>
  
</section>
<section className="counter-3-part section-p">
    <div className="container">
        <div className="row">
            <div className="col-12 text-center">
                <div className="section-head light">
                    <h2>Our Experience</h2>
                </div>
            </div>
        </div>
        <div className="row align-items-center justify-content-center">
			<div className="col-lg-10">
			   <div className="row">
			
					<div className="col-md-3 col-6 text-center">
						<div className="counter-3-item">
							<div className="number-box">
								<i className="flaticon-map-pin-marked"></i>
							</div>
							<div className="number-box">
								<h2 className="white counter">15</h2>
								<h3>Branches</h3>
							</div>
						</div>
					</div>
				
					<div className="col-md-3 col-6 text-center">
						<div className="counter-3-item">
							<div className="number-box">
								<i className="flaticon-network"></i>
							</div>
							<div className="number-box">
								<h2 className="white counter">600000</h2>
								<h3>Mobilization</h3>
							</div>
						</div>
					</div>
		
					<div className="col-md-3 col-6 text-center">
						<div className="counter-3-item">
							<div className="number-box">
								<i className="fa fa-handshake-o" aria-hidden="true"></i>
							</div>
							<div className="number-box">
								<h2 className="white counter">350</h2>
								<h3>Clients</h3>
							</div>
						</div>
					</div>
					
					<div className="col-md-3 col-6 text-center">
						<div className="counter-3-item">
							<div className="number-box">
								<i className="fa fa-globe"></i>
							</div>
							<div className="number-box">
								<h2 className="white counter">30</h2>
								<h3>Countries</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>
    </div>
</section>

    <section className="practise-part section-p">
        <div className="container">
            <div className="row">
                <div className="col-12 text-center">
                    <div className="section-head">
                        <h2>POPULAR SEARCHES</h2>
                    </div>
                </div>
            </div>
        <div className="row align-items-center justify-content-center">
			<div className="col-lg-10">
			    <div className="searchlist">
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
				</div>
            </div>
        </div>
		</div>
    </section>


<section className="blog-area section-p">
	<div className="container">
			<div className="row">
                <div className="col-12 text-center">
                    <div className="section-head">
                        <h2>LATEST BLOGS</h2>
                    </div>
                </div>
            </div>
		<div className="row">
		
			<div className="col-md-6 col-lg-6 col-xl-6">
				<div className="sin-blog-two justify-content-center align-items-center row no-gutters">
					<div className="col-xl-6">
						<div className="blog-img-two ">
							<img src="https://www.seagullgroup.in/uploads/career/172209741120240727162331.jpg" alt="" />
						</div>
					</div>
					<div className="col-xl-6">
						<div className="blog-content-two-wrap ">
							<div className="blog-con-two">
								<h2 className="mb-2"><a  target="_blank"  href="https://seagullgroup.in/blog/10/india%27s-ambitious">India's Ambitious Skill Development Initiatives: Boosting Economy and Empowering Youth:</a></h2>

								<a className="text-danger"  target="_blank"  href="https://seagullgroup.in/blog/10/india%27s-ambitious">Click here to Read blog</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div className="col-md-6 col-lg-6 col-xl-6">
				<div className="sin-blog-two justify-content-center align-items-center row no-gutters">
					<div className="col-xl-6">
						<div className="blog-img-two ">
							<img src="https://www.seagullgroup.in/uploads/career/171168867120240329050431.jpg" alt="" />
						</div>
					</div>
					<div className="col-xl-6">
						<div className="blog-content-two-wrap ">
							<div className="blog-con-two">
								<h2 className="mb-2"><a target="_blank" href="https://seagullgroup.in/blog/9/living-in-ai-era">Living in the AI Era: Embracing the Future:</a></h2>
								<a  className="text-danger"  target="_blank"  href="https://seagullgroup.in/blog/9/living-in-ai-era">Click here to Read blog</a>
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

export default Home