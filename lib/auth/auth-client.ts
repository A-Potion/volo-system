'use client';

import { createAuthClient } from 'better-auth/react'
import { magicLinkClient } from 'better-auth/client/plugins'
export const authClient = createAuthClient({
    plugins: [
        magicLinkClient(),
    ],
    baseURL: process.env.BASE_AUTH_URL
})

export const {
    signIn,
    signOut,
    signUp,
    useSession
} = authClient;