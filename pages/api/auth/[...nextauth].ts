import { NextApiRequest } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosResponse } from "axios";

interface Credentials {
  email?: string | undefined;
  password?: string | undefined;
}

interface User {
  verification_code: string | null;
  phone: string;
  manager: string;
  first_name: string;
  last_name: string;
  currency: string;
  email_verified_at: string | null;
  remember_token: string | null;
  role: string;
  isEmailVerified: boolean;
  avatar: string;
  status: number;
  name: string;
  email: string;
  company_id: string;
  created_by: string;
  id: string;
}

type AuthorizeReturnType = { user: User } | null;

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

        const user = await axios.post(`/v1/auth/login`, payload);

        console.log("user", user.data);

        if (user) {
          return user.data.user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
