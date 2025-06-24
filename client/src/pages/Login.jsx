import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    login(res.data.user, res.data.token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />
      <button type="submit">Ingresar</button>
    </form>
  );
};

export default Login;
