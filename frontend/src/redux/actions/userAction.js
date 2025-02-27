import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiPost } from '../../config/axiosIntance';
import { loginAsync, logoutAsync, UpdateUserData } from '../reducers/userReducer';
import { showErrorAlert, showSuccessAlert } from './alertActions';
export const login = (credentials) => async (dispatch) => {
      // const navigate = useNavigate();
  console.log('a gaia ')
    
    // try {
        const result = await apiPost('/auth/login', credentials);

        if (result?.success) {
            const userData = result;
            dispatch(loginAsync(userData));
            // dispatch(showSuccessAlert("Logged in successfully"));
            toast.success('Logged in successfully', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            // navigate('/dashboard');
        } else {
            toast.error(result?.message || "Login failed. Please check your details and try again.", {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    // } catch (error) {
    //     // Handle Axios error object more effectively
    //     if (error?.response?.status === 401) {
    //       toast.error("Invalid username or password.", {
    //         position: 'top-center',
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: false,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: 'light',
    //       });
    //         // dispatch(showErrorAlert("Invalid username or password."));
    //     } else {
    //         toast.error("Network Error. Please try again.", {
    //             position: 'top-center',
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: false,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: 'light',
    //         });
    //         // dispatch(showErrorAlert("Network Error. Please try again."));
    //     }
    //     console.error('Login error:', error);
    // }
};

// Async logout action
export const logout = () => async (dispatch) => {
    try {
      await dispatch(logoutAsync());
    } catch (error) {
      console.error('Logout error:', error);
    }
  };  

export const updateUser = (data) => async (dispatch) => {
    try {
        dispatch(UpdateUserData(data)); 
    } catch (error) {
        console.error('Update user error:', error);
        dispatch(showErrorAlert("An error occurred while updating user data. Please try again."));
    }
};

export const signup = (userDetails) => async (dispatch) => {
    // try {
      const result = await apiPost('/auth/signup', userDetails);
      if (result?.success) {
        const userData = result;
        dispatch(loginAsync(userData));
        toast.success('Account created successfully! You are now logged in.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        
        // dispatch(showSuccessAlert("Account created successfully! You are now logged in."));
    } else {
      toast.error(result?.message || "Signup failed. Please check your details and try again.", {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
        // dispatch(showErrorAlert(result?.message || "Signup failed. Please check your details and try again."));
    }
    // } catch (error) {
    //   if (error?.response?.message) {
    //     dispatch(showErrorAlert(error.response.data.message));
    //   } else {
    //     dispatch(showErrorAlert("Network Error. Please try again."));
    //   }
    //   console.error('Signup error:', error);
    // }
  };  