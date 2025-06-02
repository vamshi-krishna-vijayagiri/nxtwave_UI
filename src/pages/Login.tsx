import { useState } from 'react';
import TextInputField from '../components/Textbox';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/login'; // Make sure this path is correct
import ToastMessage from '../components/Snackbar';
import '../App.css';
import Btn from '../components/Button';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  const handleLoginSubmit = async () => {
    try {
      const result = await loginUser({ email, password });
      console.log("login result", result);
      if (result?.userId) {
        setToast({
            open: true,
            message: 'Login successful',
            severity: 'success',
        });

        //Save userId to localStorage
        localStorage.setItem('userId', result.userId.toString());

        // Redirect to home page or dashboard after a short delay
        setTimeout(() => navigate('/home'), 1500);
        }

    } catch (error: any) {
        const message = error?.response?.status === 401
            ? 'Invalid Credentials'
            : 'Login failed: Try after some time';

        setToast({
            open: true,
            message,
            severity: 'error',
        });
        }
  };

  return (
    <div className='container'>
      <h2>LOGIN HERE</h2>
      <form className='form-container' 
            onSubmit={(e) => {
            e.preventDefault(); 
            handleLoginSubmit();
        }}>
        <TextInputField
          label="Email"
          value={email}
          onChange={setEmail}
          type="email"
          required
        />
        <TextInputField
          label="Password"
          value={password}
          onChange={setPassword}
          type="password"
          required
          placeholder="Enter your password"
        />
        <Btn label="Login" type="submit" variant="contained"/>
        <Btn label="Create Account" type="submit" variant="outlined" onClick={() => navigate('/register')}/>
      </form>

      {/* Toast Notification */}
      <ToastMessage
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </div>
  );
};

export default Login;
