import NextAuth from 'next-auth';
import { authConfig } from './app/authconfig';
 
export default NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async redirect({ url, baseUrl }) {
      // Force correct baseUrl for localhost development
      const correctedBaseUrl = 'http://localhost:3001';
      
      if (url.startsWith("/")) {
        return `${correctedBaseUrl}${url}`;
      }
      if (new URL(url).origin === correctedBaseUrl) {
        return url;
      }
      return correctedBaseUrl;
    },
  },
}).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  runtime: 'nodejs',
};