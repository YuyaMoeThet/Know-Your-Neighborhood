import FacebookLogin from "@greatsumini/react-facebook-login";

const FacebookLoginButton = ({ onHandleFacebookLoginSuccess }) => {
  return (
    <FacebookLogin
      className="fa_btn"
      appId="796603412325227"
      autoLoad={false}
      fields="name, email, picture"
      onProfileSuccess={(data) => {}}
      onSuccess={onHandleFacebookLoginSuccess}
    >
      Join with Facebook
    </FacebookLogin>
  );
};

export default FacebookLoginButton;
