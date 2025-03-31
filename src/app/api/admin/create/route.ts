import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    return NextResponse.json(
      {
        status: 'error',
        data: null,
        message: 'Method not allowed',
      },
      { status: 405 }
    );

    const { email } = await req.json();

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: 'admin' },
    });

    return NextResponse.json(
      {
        status: 'success',
        data: { updatedUser },
        message: 'User updated successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update user admin';

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
