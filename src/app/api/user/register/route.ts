import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { registrationSchema } from '@/config/register/schema';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = registrationSchema.parse(body);

    const { referralCode, ...userData } = validatedData;

    let referredById = null;

    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode },
      });

      if (referrer) {
        referredById = referrer.id;
      }
    }

    const user = await prisma.user.create({
      data: {
        ...userData,
        referredBy: referredById,
      },
    });

    return NextResponse.json(
      {
        status: 'success',
        data: { user },
        message: 'User registered successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to register user';

    return NextResponse.json(
      {
        status: 'error',
        data: null,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
