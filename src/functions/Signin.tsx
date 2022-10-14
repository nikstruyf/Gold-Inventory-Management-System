import { useNavigate } from 'react-router-dom';

const SigninClick = () => {
  const navigate = useNavigate();
  navigate('/inventory');
};

export default SigninClick;
