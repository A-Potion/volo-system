import type { NextApiRequest, NextApiResponse } from 'next'
import { signIn } from '@/server/users'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { email, password } = req.body

        await signIn(email, password);

        res.status(200).json({ success: true })
    } catch (error: any) {
        if (error.type === 'CredentialsSignIn') {
            res.status(401).json({ error: 'Invalid credentials.'})
        } else {
            res.status(500).json({ error: "Something went wrong."})
        }
    }
}