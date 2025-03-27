'use client';
import React, { useEffect, useState } from 'react';
import { useApi } from '@/hooks/use-api';
import Link from 'next/link';
import Image from 'next/image';
import {
  User as UserIcon,
  Phone,
  Calendar,
  School,
  CreditCard,
  Clock,
  Edit,
  ArrowRight,
  Loader2,
  AlertCircle,
  Award,
  GraduationCap,
  RefreshCw,
  BookOpenCheck,
  Building,
} from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  age: number;
  institute: string;
  idCardImage: string;
  rollNo: string;
  yearOfStudy: number;
  createdAt: string;
  updatedAt: string;
  hasPaid: boolean;
  role: string;
  transactions?: Transaction[];
};

type Transaction = {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export default function Profile() {
  const { isLoading, makeRequest } = useApi();
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeRequest('GET', '/user/me');
        if (response.data) {
          setUser(response.data.user);
          setIsRegistered(true);
        } else {
          setIsRegistered(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load profile data');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">User Profile</h1>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      ) : error ? (
        <div
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p className="font-medium">Error</p>
          </div>
          <p className="text-sm mt-1">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-100 hover:bg-red-200 text-red-800 font-medium py-1 px-3 rounded text-sm flex items-center"
          >
            <RefreshCw className="h-3 w-3 mr-1" /> Try Again
          </button>
        </div>
      ) : !isRegistered ? (
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <UserIcon className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">User Not Registered</h2>
          <p className="text-gray-600 mb-6">You need to register to Smarak 2025.</p>
          <Link
            href="/register"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Register Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Summary Card */}
          <div className="md:col-span-3 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
              <div className="flex flex-col md:flex-row items-center gap-5">
                <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center text-blue-500 text-2xl font-bold overflow-hidden">
                  {user?.idCardImage ? (
                    <Image src={user.idCardImage} alt={user.name} fill className="object-cover" />
                  ) : (
                    user?.name?.charAt(0).toUpperCase() || 'U'
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user?.name}</h2>
                  <p className="text-blue-100">{user?.email}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="bg-blue-400 bg-opacity-30 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                      <Award className="h-3 w-3 mr-1" />
                      {(user?.role ?? '').charAt(0).toUpperCase() + (user?.role ?? '').slice(1)}
                    </span>
                    <span
                      className={`${user?.hasPaid ? 'bg-green-400 bg-opacity-30' : 'bg-yellow-400 bg-opacity-30'} text-xs font-medium px-2 py-1 rounded-full flex items-center`}
                    >
                      <CreditCard className="h-3 w-3 mr-1" />
                      {user?.hasPaid ? 'Payment Complete' : 'Payment Pending'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b flex items-center">
              <UserIcon className="h-5 w-5 mr-2 text-blue-500" /> Personal Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Phone className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p>{user?.phone || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start">
                <UserIcon className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p>{user?.gender || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p>{user?.age || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p>
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-blue-500" /> Academic Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Building className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Institute</p>
                  <p>{user?.institute || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start">
                <BookOpenCheck className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Roll Number</p>
                  <p>{user?.rollNo || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start">
                <School className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Year of Study</p>
                  <p>{user?.yearOfStudy ? `Year ${user.yearOfStudy}` : 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Image
                  width={16}
                  height={16}
                  src="/placeholder.svg"
                  alt="ID Card"
                  className="h-4 w-4 text-gray-400 mt-0.5 mr-2"
                />
                <div>
                  <p className="text-sm text-gray-500">ID Card</p>
                  <p>{user?.idCardImage ? 'Uploaded' : 'Not uploaded'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-blue-500" /> Payment Information
            </h3>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium flex items-center">
                  <CreditCard className="h-4 w-4 mr-1" /> Payment Status:
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${user?.hasPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                >
                  {user?.hasPaid ? 'Paid' : 'Pending'}
                </span>
              </div>

              {!user?.hasPaid && (
                <Link
                  href="/payment"
                  className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  <CreditCard className="h-4 w-4 mr-2" /> Complete Payment
                </Link>
              )}
            </div>

            {/* Transaction History */}
            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <Clock className="h-4 w-4 mr-1" /> Transaction History
              </h4>
              {user?.transactions && user.transactions.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {user.transactions.map(transaction => (
                    <div key={transaction.id} className="text-sm bg-gray-50 p-3 rounded">
                      <div className="flex justify-between">
                        <span className="font-medium">₹{transaction.amount}</span>
                        <span
                          className={`${transaction.status === 'success' ? 'text-green-600' : transaction.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}
                        >
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-gray-500 text-xs mt-1 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(transaction.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No transactions found</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-3 flex flex-wrap gap-3 justify-center mt-4">
            <Link
              href="/profile/edit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors flex items-center"
            >
              <Edit className="h-4 w-4 mr-2" /> Edit Profile
            </Link>
            <Link
              href="/dashboard"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded-md transition-colors flex items-center"
            >
              <ArrowRight className="h-4 w-4 mr-2" /> Go to Dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
