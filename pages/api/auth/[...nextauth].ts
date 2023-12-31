import { NextApiRequest } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosResponse } from "axios";
import { useUserStore } from "@app/store/userState";

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
      type: "credentials",
      credentials: {},
      authorize: async (credentials: any, req) => {
        const { email, password } = credentials as Credentials;

        if (!email || !password) {
          return null;
        }

        const payload = { email, password };

        const user = await axios.post(`https://api.theroishop.com/v1/auth/login`, payload); //external link
        console.log(user.data.user.role, "userData")

        if (user) {
          return user.data;

        } else {
          return null;
        }
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
};

export default NextAuth(authOptions);
