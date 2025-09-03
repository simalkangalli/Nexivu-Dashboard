import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { connectToDB } from "./lib/utils";
import { User } from "./lib/models";
import bcrypt from "bcrypt";

const login = async (credentials) => {
  try {
    connectToDB();
    const user = await User.findOne({ username: credentials.username });

    if (!user || !user.isAdmin) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  basePath: "/api/auth",
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  // ADD ADDITIONAL INFORMATION TO SESSION
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.img = user.img;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.img = token.img;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Force correct baseUrl for localhost development
      const correctedBaseUrl = 'http://localhost:3001';
      console.log('Redirect callback - url:', url, 'baseUrl:', baseUrl, 'correctedBaseUrl:', correctedBaseUrl);
      
      // If URL is relative, make it absolute with corrected baseUrl
      if (url.startsWith("/")) {
        const fullUrl = `${correctedBaseUrl}${url}`;
        console.log('Constructed full URL:', fullUrl);
        return fullUrl;
      }
      
      // If URL is absolute, check if it's from the same origin
      try {
        const urlObj = new URL(url);
        if (urlObj.origin === correctedBaseUrl) {
          return url;
        }
      } catch (e) {
        console.log('Invalid URL, using correctedBaseUrl');
      }
      
      // Default to dashboard
      return `${correctedBaseUrl}/dashboard`;
    },
  },
});