import React, { useState, useEffect } from 'react';
import { Link ,Routes,Route,Router,Switch, useNavigate, useHistory } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import Dropdown from './components/Dropdown';
import DropdownExp from './components/DropdownExp';
import DropdownLocation from './components/DropdownLocation';
import Autocomplete from './components/Autocomplete';
const BASE_URL=process.env.REACT_APP_BASE_URL;
const BannerSlider = () => {
	const [msgData, setMsgData] = useState('');
	const [formData, setFormData] = useState({
		skill: '',  // Changed from 'skils' to 'skill'
		location: '',
		exp: ''
	  });
	  const navigate = useNavigate();
	  const handleDropdownChange = (name, value) => {
		setFormData({ ...formData, [name]: value });
	  };
	
	  const handleSubmit = async (e) => {
		e.preventDefault();
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
			const data = await response.json();
			sessionStorage.setItem('jobs', JSON.stringify(data));
			navigate('/jobsearch', { state: { response: data } });
		  } else {
			//alert("h");
			setMsgData('No Result Found, Please Try another');
			console.error('No Result for such Criteria..');
		  }
		} catch (error) {
			setMsgData('No Result Found, Please Try another');
		  console.error('Error submitting form', error);
		}
	  };
	  const handleSkillChange = (selectedId) => {
		setFormData(prevData => ({
		  ...prevData,
		  skill: selectedId
		}));
	  };
  return (
    <section className="banner-3-part">
      <Swiper
        loop={true}
        effect="fade"
        speed={800}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
      >
        <SwiperSlide className="banner-3-item">
          <img src="assets/images/bg/slide.png" alt="Banner Image 1" />
        </SwiperSlide>
        <SwiperSlide className="banner-3-item">
          <img src="assets/images/bg/slide2.jpg" alt="Banner Image 2" />
        </SwiperSlide>
        <SwiperSlide className="banner-3-item">
          <img src="assets/images/bg/slide3.jpg" alt="Banner Image 3" />
        </SwiperSlide>
      </Swiper>
      <div className="banner-overlay-form">
			<div className="container">
				<div className="row">
					<div className="banner-contact">
						<div className="brand-color mb-3"><img src="assets/images/tagline.png" /></div>
						<div className="form-view">
							<form  onSubmit={handleSubmit}>
							
							<div className="form-group">
							 {/* <Dropdown onChange={(value) => handleDropdownChange('skils', value)} />  */}
							 <Autocomplete
								value={formData.skill}
								onChange={handleSkillChange}
								/>
								</div> 
								<div className="form-group">
									<DropdownExp  onChange={(value) => handleDropdownChange('exp', value)}  />
							
								</div>
								<div className="form-group">
									<DropdownLocation  onChange={(value) => handleDropdownChange('location', value)} />
						
								</div>
								<button className="btn-1">SEARCH</button>
								
							</form>
							<span style={{position: "absolute",color:"red",marginLeft:"-120px"}}>{msgData}</span>
						</div>
					</div>
				</div>
				
			</div>
		</div>
    </section>
	
  );
};

export default BannerSlider;
