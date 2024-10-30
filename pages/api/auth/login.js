import { supabase } from '../../../supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // Verificar si se reciben los datos de email y password
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  // Buscar al usuario en la tabla `users` por su email
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  // Verificar si ocurrió un error o si el usuario no fue encontrado
  if (error || !user) {
    console.error('User not found or error in Supabase query:', error);
    return res.status(401).json({ error: 'User not found or incorrect credentials.' });
  }

  // Comparar la contraseña directamente (texto plano)
  if (password !== user.password) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  // Crear una respuesta de éxito para el usuario autenticado
  res.status(200).json({
    message: 'Login successful',
    user: { id: user.id, email: user.email, role: user.role },
  });
}
