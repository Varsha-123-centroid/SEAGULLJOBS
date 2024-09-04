import FacebookLogin from 'react-facebook-login';

function FacebookLoginButton() {
  const responseFacebook = (response) => {
    console.log(response);
    // Handle successful login
  };

  return (
    <FacebookLogin
      appId="YOUR_FACEBOOK_APP_ID"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
    />
  );
}