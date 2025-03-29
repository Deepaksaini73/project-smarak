import axios from 'axios';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { createPaymentRecord } from '@/actions/payments';

const MERCHANT_KEY = process.env.MERCHANT_KEY;
const MERCHANT_ID = process.env.MERCHANT_ID;
const MERCHANT_STATUS_URL = process.env.MERCHANT_STATUS_URL;
const CLIENT_URL = process.env.CLIENT_URL;

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const merchantTransactionId = searchParams.get('id');
  const userId = searchParams.get('userId');

  const keyIndex = 1;
  const string = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + MERCHANT_KEY;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  const checksum = sha256 + '###' + keyIndex;

  const option = {
    method: 'GET',
    url: `${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${merchantTransactionId}`,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': checksum,
      'X-MERCHANT-ID': MERCHANT_ID,
    },
  };

  try {
    const response = await axios.request(option);
    if (response?.data?.code === 'PAYMENT_SUCCESS') {
      const paymentDetails = response.data;

      const dbUpdate = await createPaymentRecord({
        userId: userId!,
        amount: paymentDetails.data.amount,
        transactionId: paymentDetails.data.transactionId,
        merchantTransactionId: paymentDetails.data.merchantTransactionId,
        merchantId: paymentDetails.data.merchantId,
        status: paymentDetails.data.state,
      });

      if (dbUpdate?.status == 'error') {
        console.error('Error saving details to db ', dbUpdate);
        const redirectUrl = new URL('/payment/failed', CLIENT_URL);
        redirectUrl.searchParams.set('details', 'unableToSave');
        redirectUrl.searchParams.set('error', 'true');
        return NextResponse.redirect(redirectUrl.toString(), {
          status: 303,
        });
      }

      const successUrl = new URL('/payment/success', CLIENT_URL);
      return NextResponse.redirect(successUrl.toString(), {
        status: 303,
      });
    }
    const failedUrl = new URL('/payment/failed', CLIENT_URL);
    failedUrl.searchParams.set('details', 'paymentFailed');
    failedUrl.searchParams.set('error', 'true');
    return NextResponse.redirect(failedUrl.toString(), { status: 303 });
  } catch (error) {
    console.error('error in payment status', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch payment status',
        details: (error as Error)?.message,
      },
      { status: 500 }
    );
  }
}
