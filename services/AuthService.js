// services/AuthService.js
export const AuthService = {
    async login(email, password) {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        console.error('Error during login:', result.error);
        return { error: result.error };
      }
  
      return { data: result.user };
    },
  };
  
