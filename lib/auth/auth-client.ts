'use client';

import { createAuthClient } from 'better-auth/react'
import { magicLinkClient } from 'better-auth/client/plugins'
export const authClient = createAuthClient({
    plugins: [
        magicLinkClient(),
    ],
    baseURL: 'https://volo-system.wacper.hackclub.app'
})

export const {
    signIn,
    signOut,
    signUp,
    useSession
} = authClient;