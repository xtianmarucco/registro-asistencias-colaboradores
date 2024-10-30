// components/LoginForm.js
import { useState } from 'react';
import { AuthService } from '../../../services/AuthService';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    // Llamar al servicio de autenticación
    const { data, error } = await AuthService.login(email, password);

    if (error) {
      setErrorMessage(error);
    } else {
      // Redirigir al dashboard o pantalla principal tras login exitoso
      router.push('/');
    }
  };

  return (
    <div >
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
}
export default LoginForm;