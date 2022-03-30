import { query as q } from "faunadb";

import NextAuth, { User, Account, Profile } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { env } from "process";

import { fauna } from "../../../services/fauna";

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: clientId,
      clientSecret: clientSecret,
      // scope: "read:user",
    }),
  ],
  // jwt: {
    // signingKey: process.env.SIGNING_KEY,
  // },
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user;

      // verificando usuario duplicado
      try {
				await fauna.query(
					q.If( // se não existir, eu crio
						q.Not(
							q.Exists(
								q.Match(
									q.Index("user_by_email"),
									q.Casefold(user.email)
								)
							)
						),
						q.Create(
							q.Collection("users"),
							{ data: { email } }
						),
						q.Get(
							q.Match(
								q.Index('user_by_email'),
								q.Casefold(user.email),
							)
						)
					)
				);

      return true;
      } catch {
        return false;
      }
    },
  },
});
