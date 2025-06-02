import { useState } from 'react';
import TextInputField from '../components/Textbox';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/register';
import ToastMessage from '../components/Snackbar';
import '../App.css';
import Btn from '../components/Button';

const Register = () => {
  const navigate = useNavigate();

  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info',
  });

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    age: '',
    dob: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    try {
        const result = await registerUser(form);
        if (result.message === 'Success') {
            setToast({
                open: true,
                message:'User Registered Successfully',
                severity: 'success',
            });
            setForm({
              name: '',
              email: '',
              password: '',
              company: '',
              age: '',
              dob: '',
            });
        } else if(result.message === 'Email already exists') {
            setToast({  
                open: true,
                message: result.message,
                severity: 'warning',
            });
        }
        console.log('Registration Status:', result.message);
    } catch (error: any) {
        setToast({
            open: true,
            message: 'Registration Failed, Try After Sometime',
            severity: 'error',
        });
    }
  };


  return (
    <div className='container'>
      <h2>REGISTER HERE</h2>
      <form className='form-container' onSubmit={(e) => {
          e.preventDefault(); 
          handleSubmit();
        }}>
        <TextInputField
          label="Full Name"
          value={form.name}
          onChange={(val) => handleChange('name', val)}
          required
        />

        <TextInputField
          label="Email"
          value={form.email}
          onChange={(val) => handleChange('email', val)}
          type="email"
          required
        />

        <TextInputField
          label="Password"
          value={form.password}
          onChange={(val) => handleChange('password', val)}
          type="password"
          required
        />

        <TextInputField
          label="Company Name"
          value={form.company}
          onChange={(val) => handleChange('company', val)}
          required
        />

        <TextInputField
          label="Age"
          value={form.age}
          onChange={(val) => handleChange('age', val)}
          type="number"
          required
        />

        <TextInputField
          label="Date of Birth"
          value={form.dob}
          onChange={(val) => handleChange('dob', val)}
          type="date"
          required
        />

        <Btn label="Register" type="submit" variant="contained"/>
        <Btn label="back to login" type="submit" variant="outlined" onClick={() => navigate('/')}/>

      </form>
      <ToastMessage
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </div>
  );
};

export default Register;
