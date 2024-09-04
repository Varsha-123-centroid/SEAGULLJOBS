
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import LoginEmployer from './LoginEmployer';
import SignupEmployer from './SignupEmployer';
import JobSearch from './JobSearch';
import JobDetails from './JobDetails';
import Biodata from './Biodata';
import Logout from './Logout';
import ShowList from './ShowList';
import PhoneAuth from './PhoneAuth';
function App() {
  return (
    <div className="App">
      <Router>
     {/* <Navbar /> */}
    	<Routes>
 		    <Route path="/" element={<Home />} /> 
         <Route path="/login" element={<Login />} /> 
         <Route path="/logout" element={<Logout />} /> 
         <Route path="/signup" element={<Signup />} /> 
         <Route path="/loginemployer" element={<LoginEmployer />} /> 
         <Route path="/signupemployer" element={<SignupEmployer />} /> 
         <Route path="/jobsearch" element={<JobSearch />} /> 
         <Route path="/jobdetails" element={<JobDetails />} /> 
         <Route path="/biodata" element={<Biodata />} /> 
         <Route path="/showList" element={<ShowList />} /> 
         <Route path="/otptest" element={<PhoneAuth />} />
         {/* <Route path="/why_us" element={<WhyUs />} /> 
         <Route path="/about_us" element={<About_us />} />
         <Route path="/how_works" element={<How_works />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Navbar /> */}
   
        </Routes>
      </Router>  
    </div>
  );
}

export default App;
