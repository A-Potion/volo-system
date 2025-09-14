'use client';

import { createAuthClient } from 'better-auth/react'
import { magicLinkClient } from 'better-auth/client/plugins'
export const authClient = createAuthClient({
    plugins: [
        magicLinkClient(),
    ],
    baseURL: 'https://demo.kacperwypych.com'
})

export const {
    signIn,
    signOut,
    signUp,
    useSession
} = authClient;