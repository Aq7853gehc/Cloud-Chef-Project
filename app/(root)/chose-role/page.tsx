import React from 'react';
import Link from 'next/link';

const ChoseRole = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-6">Cloud Chef</h1>
        <p className="text-gray-600 mb-8">Choose your role to get started</p>

        <div className="space-y-6">
          {/* Chef Role Card */}
          <Link href="/chef/auth/register">
            <div className="group cursor-pointer p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-300 border-2 border-green-200 hover:border-green-400">
              <h2 className="text-2xl font-semibold text-green-800 mb-2">Chef</h2>
              <p className="text-gray-600">Create and manage your recipes, share your culinary skills with the world!</p>
            </div>
          </Link>

          {/* Customer Role Card */}
          <Link href="/customer-login">
            <div className="group cursor-pointer p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-300 border-2 border-green-200 hover:border-green-400">
              <h2 className="text-2xl font-semibold text-green-800 mb-2">Customer</h2>
              <p className="text-gray-600">Explore delicious recipes, order meals, and enjoy the best culinary experiences!</p>
            </div>
          </Link>
        </div>

        <p className="text-gray-500 mt-8 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-green-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ChoseRole;