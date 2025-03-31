import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export function PaymentInfoCard({
  paymentStatus,
  hasPaid,
  notes,
}: {
  paymentStatus: string;
  hasPaid: boolean;
  notes: string;
}) {
  const renderPaymentStatus = () => {
    switch (paymentStatus) {
      case 'verified':
        return (
          <div className="text-green-600 font-medium flex items-center font-outfit">
            <CheckCircle className="h-5 w-5 mr-2" />
            Verified
          </div>
        );
      case 'pending':
        return (
          <div className="text-yellow-600 font-medium flex items-center font-outfit">
            <Clock className="h-5 w-5 mr-2" />
            Pending Verification
          </div>
        );
      case 'rejected':
        return (
          <div className="text-red-600 font-medium flex items-center font-outfit">
            <XCircle className="h-5 w-5 mr-2" />
            Rejected
          </div>
        );
      default:
        return (
          <div className="text-gray-600 font-medium flex items-center font-outfit">
            <AlertCircle className="h-5 w-5 mr-2" />
            Not Available
          </div>
        );
    }
  };

  return (
    <div className="bg-[#FEFBED] shadow-md rounded-xl p-6 border border-[#FFD700]/30 h-full transform transition-transform hover:scale-[1.01]">
      <h3 className="text-xl font-semibold mb-6 pb-3 border-b border-[#FFD700] flex items-center font-outfit text-[#554400]">
        <AlertCircle className="h-5 w-5 mr-3 text-[#554400]" /> Payment Information
      </h3>

      <div className="space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="p-4 bg-[#FFD700]/10 rounded-lg">
            <p className="text-sm text-[#554400]/60 font-medium font-outfit mb-2">Payment Status</p>
            {renderPaymentStatus()}
          </div>
          <div className="p-4 bg-[#FFD700]/10 rounded-lg">
            <p className="text-sm text-[#554400]/60 font-medium font-outfit mb-2">
              Payment Received
            </p>
            <p className={`font-medium font-outfit ${hasPaid ? 'text-green-600' : 'text-red-600'}`}>
              {hasPaid ? 'Yes' : 'No'}
            </p>
          </div>
        </div>

        {paymentStatus === 'pending' && hasPaid && (
          <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
            <p className="font-semibold text-yellow-800 font-outfit">
              Your payment has been received and is being verified.
            </p>
            <p className="text-yellow-700 mt-2 font-outfit">
              This usually takes 1-2 business days. You&apos;ll be notified once the verification is
              complete.
            </p>
          </div>
        )}

        {paymentStatus === 'rejected' && (
          <div className="mt-5 bg-red-50 border border-red-200 rounded-lg p-4 text-sm">
            <p className="font-semibold text-red-800 font-outfit">
              Your payment verification was rejected.
            </p>
            <p className="text-red-700 mt-2 font-outfit">
              <span className="font-semibold">Noted issues include:</span>
              <ul className="list-disc list-inside mt-1">
                <li>{notes}</li>
              </ul>
            </p>
            <p className="text-red-700 mt-2 font-outfit">
              Please contact support for more information and next steps.
            </p>
          </div>
        )}

        {!hasPaid && (
          <div className="mt-6 flex justify-center">
            <Link
              href={'/payment'}
              className="bg-[#554400] hover:bg-[#6a5500] text-[#FFD700] font-medium py-3 px-6 rounded-full transition-colors font-outfit inline-flex items-center"
            >
              <span className="mr-2">Make Payment</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
