"use server"

import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/mongodb'
import Event from '@/models/Event'
import { betterAuth } from "better-auth"
import { authClient } from '@/lib/auth/auth-client';
import { headers } from 'next/headers'
import { auth } from '@/lib/auth/auth'

export default async function handler(req: NextApiRequest,
  res: NextApiResponse
) {
    // const headersList = await headers()
    await dbConnect();

    const { method } = req;
    const session = await auth.api.getSession({
    headers: req.headers
})

    console.log(session)
    
    switch (method) {
        case 'GET':
            try {
                
                const event = await Event.find({ 
                "volunteers.userid": session?.user.id
                }); 
                res.status(200).json({ success: true, data: event})
            } catch (error) {
                res.status(400).json({ success: false })
                console.log(error)
            }
            break

            default:
                res.status(400).json({ success: false })
                break
    }
}