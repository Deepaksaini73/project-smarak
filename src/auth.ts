import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { prisma } from '@/lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false;
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        return true;
      }

      return true;
    },
    async jwt({ token, user, account, trigger }) {
      if (user) {
        token.email = user.email ?? undefined;
        token.name = user.name ?? undefined;
        token.picture = user.image;

        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        });

        if (existingUser) {
          token.id = existingUser.id;
          token.role = existingUser.role || 'user';
          token.isRegistered = true;
        } else {
          token.isRegistered = false;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;

        session.user.isRegistered = token.isRegistered as boolean;

        if (token.isRegistered) {
          session.user.id = token.id as string;
          session.user.role = token.role as string;
        }
      } else {
        console.error('Session callback missing token');
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url;
      }
      if (url.startsWith('/')) {
        return new URL(url, baseUrl).toString();
      }

      return baseUrl;
    },
  },
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
});
