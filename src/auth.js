import baseURL from './api';

// Check if user is authenticated
export const checkAuth = async () => {
  try {
    const response = await fetch(`${baseURL}/api/current-user`, {
      method: 'GET',
      credentials: 'include', // Important for cookies
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return { isAuthenticated: false };
  }
};

// Redirect to Google login
export const loginWithGoogle = () => {
  // For local development, use localhost:5000 directly
  const authUrl = baseURL.includes('localhost') 
    ? 'http://localhost:5000/auth/google'
    : `${baseURL}/auth/google`;
  
  console.log('Redirecting to Google auth URL:', authUrl);
  window.location.href = authUrl;
};

// Logout user
export const logout = async () => {
  try {
    console.log('Logout function called');
    console.log('Using baseURL:', baseURL);
    
    // For local development, use localhost:5000 directly
    const logoutUrl = baseURL.includes('localhost') 
      ? 'http://localhost:5000/api/logout'
      : `${baseURL}/api/logout`;
    
    console.log('Logout URL:', logoutUrl);
    
    const response = await fetch(logoutUrl, {
      method: 'GET',
      credentials: 'include', // Important for cookies
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Logout response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    console.log('Logout response data:', data);
    
    // Even if the server logout fails, we'll clear local data
    return { success: true, message: 'Logged out locally' };
  } catch (error) {
    console.error('Error during logout:', error);
    // Even if there's an error, we'll return success to ensure local logout works
    return { success: true, message: 'Logged out locally despite server error', error: error.message };
  }
};

// Handle authentication success redirect
export const handleAuthRedirect = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const loginSuccess = urlParams.get('login');
  const completeRegistration = urlParams.get('complete_registration');
  const userId = urlParams.get('user_id');
  
  // Clean up URL parameters
  const newUrl = window.location.pathname;
  window.history.replaceState({}, document.title, newUrl);
  
  if (loginSuccess === 'success') {
    // Check if we need to complete registration (collect phone number)
    if (completeRegistration === 'true') {
      return { success: true, completeRegistration: true, userId };
    }
    
    // Regular successful login
    return { success: true, completeRegistration: false };
  }
  
  return { success: false };
};