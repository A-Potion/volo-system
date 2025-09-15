'use client';

import { createAuthClient } from 'better-auth/react'
import { magicLinkClient } from 'better-auth/client/plugins'
export const authClient = createAuthClient({
    plugins: [
        magicLinkClient(),
    ],
    baseURL: 'http://hackclub.app:40451'
})

export const {
    signIn,
    signOut,
    signUp,
    useSession
} = authClient;