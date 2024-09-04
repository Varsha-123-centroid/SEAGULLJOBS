import React, { useContext ,useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//import { AuthContext } from './AuthContext';

const Logout = () => {
  //const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
  const handleLogout = () => {
    try {
        /*
        await fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
    
        */
      // alert(sessionStorage.getItem('login'));
        sessionStorage.removeItem('candidateId');
        sessionStorage.removeItem('candidateFName');
        sessionStorage.removeItem('jobs');
        sessionStorage.setItem('login','no');
     // alert(sessionStorage.getItem('login'));
     //   localStorage.removeItem('authToken');
     //   sessionStorage.removeItem('authToken');
     //   dispatch(logout());
     navigate('/login');
      //  history.push('/login');
      } catch (error) {
        console.error('Failed to logout:', error);
      }
  };
  handleLogout();
}, [navigate]);

  return null;
};

export default Logout;
