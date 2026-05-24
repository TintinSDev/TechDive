// "use client";
// import NextAuth from "next-auth";
// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { api } from "@/app/lib/api";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "your@email.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Invalid credentials");
//         }

//         try {
//           const response = await api.login(
//             credentials.email,
//             credentials.password,
//           );
//           return {
//             id: response.user.id,
//             email: response.user.email,
//             name: response.user.name,
//             accessToken: response.token,
//           };
//         } catch (error) {
//           throw new Error("Invalid email or password");
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/login",
//     error: "/auth/login",
//   },
//   callbacks: {
//     async jwt({ token, user }: any) {
//       if (user) {
//         token.accessToken = user.accessToken;
//       }
//       return token;
//     },
//     async session({ session, token }: any) {
//       if (token.accessToken) {
//         session.accessToken = token.accessToken;
//       }
//       return session;
//     },
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 7 * 24 * 60 * 60, // 7 days
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "@/app/lib/api";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your@email.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        try {
          const response = await api.login(
            credentials.email,
            credentials.password,
          );

          return {
            id: response.user.id,
            email: response.user.email,
            name: response.user.name,
            accessToken: response.token,
          };
        } catch (error) {
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.accessToken;
      }

      return token;
    },

    async session({ session, token }: any) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
