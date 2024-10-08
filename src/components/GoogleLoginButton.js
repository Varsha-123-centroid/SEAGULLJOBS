import { GoogleLogin } from '@react-oauth/google';

function GoogleLoginButton() {
  const handleSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    // Handle successful login
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
}