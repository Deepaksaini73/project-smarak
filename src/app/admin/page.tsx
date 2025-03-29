import React from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const adminOptions = [
    {
      title: 'Manage Events',
      description: 'Create, edit, and delete events',
      icon: '📅',
      href: '/admin/events',
    },
    {
      title: 'Manage User Payments',
      description: 'View and process user payments',
      icon: '💰',
      href: '/admin/payments',
    },
    {
      title: 'Manage Event Registrations',
      description: 'Review and manage user registrations',
      icon: '📋',
      href: '/admin/registrations',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Admin Dashboard</h1>
          <p className="mt-3 text-xl text-gray-500">Manage your platform from one place</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {adminOptions.map((option, index) => (
            <Link href={option.href} key={index} className="block">
              <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="px-4 py-5 sm:p-6 flex-1">
                  <div className="text-5xl mb-4">{option.icon}</div>
                  <h3 className="text-lg font-medium text-gray-900">{option.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{option.description}</p>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm text-indigo-600 hover:text-indigo-500">
                    Access {option.title.toLowerCase()} &rarr;
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
