import { NextApiRequest } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosResponse } from "axios";

interface Credentials {
  email?: string | undefined;
  password?: string | undefined;
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any, req) {
        const { email, password } = credentials as Credentials;

        if (!email || !password) {
          return null;
        }

        const payload = { email, password };

        try {
          const user = await axios.post(`/v1/auth/login`, payload);
          // console.log("user auth", user);

          if (user) {
            return user.data.user;
          }
        } catch (error) {
          console.error(error);
        }

        return null;

        // const user = await axios.post(`/v1/auth/login`, payload);

        // console.log("user auth", user);

        // if (user) {
        //   return user.data.user;
        // } else {
        //   return null;
        // }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token;

      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
