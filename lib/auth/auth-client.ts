'use client';

import { createAuthClient } from 'better-auth/react'
import { magicLinkClient } from 'better-auth/client/plugins'
export const authClient = createAuthClient({
    plugins: [
        magicLinkClient(),
    ],
    baseURL: 'http://localhost:3000'
})

export const {
    signIn,
    signOut,
    signUp,
    useSession
} = authClient;