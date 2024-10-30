'use client'

import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);

    // Trae los datos de la tabla 'users' en Supabase
    const { data, error } = await supabase
      .from('users')  // Asegúrate de que el nombre coincida con tu tabla en Supabase
      .select('*');

    if (error) {
      console.error('Error fetching users:', error);
    } else {
      setUsers(data);
    }
    setLoading(false);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-white">Hola</h1>

      <div>
      <h1>Users List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id}>
                <p><strong>Name:</strong> {user.username} {user.lastname}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>id:</strong> {user.id}</p>
                <p><strong>dni:</strong> {user.id_number}</p>


              </li>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </ul>
      )}
      </div>
    </div>
  );
}
