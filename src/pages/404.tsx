// pages/404.tsx

import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-center px-4">
      <h1 className="text-5xl font-bold text-gray-800">404</h1>
      <p className="text-lg text-gray-600 mt-4 mb-6">
        Oops! The page you are looking for doesn’t exist.
      </p>
      <Link href="/" className="text-blue-600 hover:underline text-md">
        Go to Homepage
      </Link>
    </div>
  );
}
