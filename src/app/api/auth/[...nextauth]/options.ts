import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { GithubProfile } from 'next-auth/providers/github';

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            profile(profile: GithubProfile) {
                return {
                    ...profile,
                    role: profile.role ?? 'employee',
                    id: profile.id.toString(),
                    image: profile.avatar_url,
                    name: profile.name
                };
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Username:',
                    type: 'text',
                    placeholder: 'username'
                },
                password: {
                    label: 'Password:',
                    type: 'password',
                    placeholder: 'password'
                }
            },

            async authorize(credentials) {
                const user1 = {
                    id: 'manager@gmail.com',
                    name: 'manager',
                    password: 'manager',
                    role: 'manager'
                };

                const user2 = {
                    id: 'admin@gmail.com',
                    name: 'admin',
                    password: 'admin',
                    role: 'admin'
                };

                if (
                    credentials?.username === user1.name &&
                    credentials?.password === user1.password
                ) {
                    return user1;
                } else if (
                    credentials?.username === user2.name &&
                    credentials?.password === user2.password
                ) {
                    return user2;
                } else {
                    return null;
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },

        async session({ session, token }) {
            if (session?.user) session.user.role = token.role;
            return session;
        }
    }
};
