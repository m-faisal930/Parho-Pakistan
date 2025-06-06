import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useEffect } from 'react';
import PasswordInput from '../../elements/passwordInput/PasswordInput';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../context/AuthContext';


// import { login } from '../../redux/actions/userAction';

function LoginPage() {
    const navigate = useNavigate();
      const { login, isLoggedIn } = useAuth();
      // const navigate = useNavigate();

      // Redirect if already logged in
      useEffect(() => {
        if (isLoggedIn) navigate('/', { replace: true });
      }, [isLoggedIn, navigate]);
  // const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

        const data = { email, password };
    setLoading(true);
    setError(null);

    try {
        
            await login(email, password);
            navigate('/', { replace: true });
      
      // await dispatch(login(data));
      // navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-white text-black">
      {/* Back Arrow Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="absolute top-8 left-8 text-lg focus:outline-none"
      >
        <FaArrowLeft className="text-2xl text-black hover:opacity-80 transition-opacity" />
      </button>

      <div className="flex justify-start gap-x-4 items-center">
        {/* <img src={logo} alt="Main Logo" className="h-24 w-24 mb-6" /> */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2 drop-shadow-lg">
          Parho Pakistan
        </h1>
      </div>

      {/* Login Form */}
      <div className="p-8 rounded-lg shadow-lg w-96 bg-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-center text-black">
          Log In
        </h2>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
            required
          />
          <div className="relative w-full mb-4">
            <PasswordInput
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full bg-white"
              required
            />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="py-2 rounded-md font-semibold bg-[#1836b2] text-white hover:shadow-lg transition-all"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-gray-600 mt-4 text-center">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-gray-800 hover:underline border-none bg-transparent focus:outline-none"
          >
            Signup
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
