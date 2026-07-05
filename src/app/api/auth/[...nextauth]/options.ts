import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/Users"
import { connectToDatabase } from "@/lib/db"
import bcrypt from "bcryptjs"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password")
        }

        await connectToDatabase()

        const user = await User.findOne({ email: credentials.email })
        if (!user) {
          throw new Error("No user found")
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        )
        if (!isPasswordCorrect) {
          throw new Error("Incorrect password")
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await connectToDatabase()
        const existingUser = await User.findOne({ email: user?.email })
        if (!existingUser) {
          const newUser = new User({
            name: user?.name,
            email: user?.email,
            password: "", // No password for OAuth users
          })
          await newUser.save()
        }
      } catch (error) {
        console.error("Error during sign-in:", error)
        return false // Prevent sign-in if there's an error
      }
      return true // Allow sign-in to proceed
    },
  }, // ← callbacks closes HERE now
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }