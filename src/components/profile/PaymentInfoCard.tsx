import { usePayment } from '@/hooks/usePayment';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

export function PaymentInfoCard() {
  const { paymentStatus, hasPaid } = usePayment();

  const renderPaymentStatus = () => {
    switch (paymentStatus) {
      case 'verified':
        return (
          <div className="text-green-600 font-medium flex items-center">
            <CheckCircle className="h-5 w-5 mr-1" />
            Verified
          </div>
        );
      case 'pending':
        return (
          <div className="text-yellow-600 font-medium flex items-center">
            <Clock className="h-5 w-5 mr-1" />
            Pending Verification
          </div>
        );
      case 'rejected':
        return (
          <div className="text-red-600 font-medium flex items-center">
            <XCircle className="h-5 w-5 mr-1" />
            Rejected
          </div>
        );
      default:
        return (
          <div className="text-gray-600 font-medium flex items-center">
            <AlertCircle className="h-5 w-5 mr-1" />
            Not Available
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 col-span-full">
      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-medium">Payment Status</p>
            {renderPaymentStatus()}
          </div>
          <div>
            <p className="text-gray-600 font-medium">Payment Received</p>
            <p className={`font-medium ${hasPaid ? 'text-green-600' : 'text-red-600'}`}>
              {hasPaid ? 'Yes' : 'No'}
            </p>
          </div>
        </div>

        {paymentStatus === 'pending' && hasPaid && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-md p-4 text-sm">
            <p className="font-semibold text-yellow-800">
              Your payment has been received and is being verified.
            </p>
            <p className="text-yellow-700 mt-1">
              This usually takes 1-2 business days. You&apos;ll be notified once the verification is
              complete.
            </p>
          </div>
        )}

        {paymentStatus === 'rejected' && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4 text-sm">
            <p className="font-semibold text-red-800">Your payment verification was rejected.</p>
            <p className="text-red-700 mt-1">
              Please contact support for more information and next steps.
            </p>
          </div>
        )}

        {!hasPaid && (
          <div className="mt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Make Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
