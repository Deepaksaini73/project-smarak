import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { registrationSchema } from '@/config/register/schema';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedData = registrationSchema.parse(body);

    const user = await prisma.user.create({
      data: validatedData,
    });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ success: false, error: 'Failed to register user' }, { status: 500 });
  }
}
