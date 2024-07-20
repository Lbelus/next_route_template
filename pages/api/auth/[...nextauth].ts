import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

if (!secret) {
  throw new Error("Missing SECRET environment variable");
}

const googleId = process.env.GOOGLE_ID;
const googleSecret = process.env.GOOGLE_SECRET;
const authFirebaseProjectId = process.env.AUTH_FIREBASE_PROJECT_ID;
const authFirebaseClientEmail = process.env.AUTH_FIREBASE_CLIENT_EMAIL;
const authFirebasePrivateKey = process.env.AUTH_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!googleId || !googleSecret || !authFirebaseProjectId || !authFirebaseClientEmail || !authFirebasePrivateKey) {
  throw new Error("Missing one or more environment variables for Google or Firebase authentication");
}

export const authOptions:any = {
  providers: [
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: authFirebaseProjectId,
      clientEmail: authFirebaseClientEmail,
      privateKey: authFirebasePrivateKey,
    }),
  }),
  cookies: {
    sessionToken: {
      name: "__Secure-next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "Lax",
        path: "/",
        secure: true, // set to false if you're on http (not recommended)
      },
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret,
    encode: async ({ token, secret }:any) => {
      const jwtClaims = {
        sub: token.sub,
        name: token.name,
        email: token.email,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
      };
      const encodedToken = jwt.sign(jwtClaims, secret, {
        algorithm: "HS256",
      });
      return encodedToken;
    },
    decode: async ({ token, secret }:any) => {
      const decodedToken = jwt.verify(token, secret, {
        algorithms: ["HS256"],
      });
      return decodedToken;
    },
  },
  callbacks: {
    async jwt({ token, user }:any) {
      // Initial sign in
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }:any) {
      session.user.id = token.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
