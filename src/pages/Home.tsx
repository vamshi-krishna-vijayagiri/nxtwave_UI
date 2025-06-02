import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../api/getUserDetails';
import '../App.css';
import Btn from '../components/Button';
import { deleteAccount } from '../api/deleteAccount';
import ToastMessage from '../components/Snackbar';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const userId = localStorage.getItem('userId');

  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userId) {
          const data = await getUserDetails(userId);
          setUser(data.user);
        }
      } catch (err: any) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, [userId]);

  const handleDelete = async () => {
    if (!userId) return;
    try {
      const res = await deleteAccount({ id: userId });
      if (res.message === 'Account Deleted Successfully') {
        setToast({
            open: true,
            message:'User Deleted Successfully',
            severity: 'success',
        });
        localStorage.removeItem('userId');
        setTimeout(() => navigate('/'), 1500);
      }
    } catch (err) {
      setToast({
            open: true,
            message: 'Account Deletion Failed, Try After Sometime',
            severity: 'error',
        });
      console.error('Account deletion failed:', err);
    }
  };

  const formatDOB = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); 
    const year = date.getFullYear().toString();

    const getOrdinal = (n: number) => {
      const s = ['th', 'st', 'nd', 'rd'];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return `${getOrdinal(day)} ${month} ${year}`;
  };


  return (
    <div className="container">
      <h2>Welcome</h2>
      {user ? (
        <div className="user-card">
          <p><strong>Name: </strong>{user.name}</p>
          <p><strong>Email: </strong>{user.email}</p>
          <p><strong>Company: </strong> {user.company}</p>
          <p><strong>Age: </strong> {user.age}</p>
          <p><strong>Date of Birth: </strong> {formatDOB(user.dob)}</p>
          <Btn label="Delete Account" type="submit" variant="contained" onClick={handleDelete}/>
        </div>
      ) : (
        <p className="loading-text">Loading user details...</p>
      )}
      <ToastMessage
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </div>
  );
};

export default Home;
