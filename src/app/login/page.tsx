// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [tokenInput, setTokenInput] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const ADMIN_TOKEN = process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'my-super-secret-admin-key-2025';
    if (tokenInput === ADMIN_TOKEN) {
      document.cookie = `adminToken=${tokenInput}; path=/`; // Set cookie
      router.push('/admin/blogs');
    } else {
      alert('Invalid token');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <input
        type="password"
        value={tokenInput}
        onChange={(e) => setTokenInput(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter admin token"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
        Login
      </button>
    </div>
  );
}