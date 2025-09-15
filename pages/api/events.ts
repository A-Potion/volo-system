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
        headers: new Headers(
          Object.entries(req.headers).map(([key, value]) => [
            key,
            Array.isArray(value) ? value.join(', ') : value ?? ''
          ])
        )
      });

    console.log(session)
    
    switch (method) {
        case 'GET':
            try {
                
                const event = await Event.find({ owner: session?.user.id });
                res.status(200).json({ success: true, data: event})
            } catch (error) {
                res.status(400).json({ success: false })
                console.log(error)
            }
            break
            case 'POST':
                try {
                    const reqbody = req.body
                    // const eventbody = {
                    //     ...req.body,
                    //     owner: session.data?.user.id
                    // }
                    const event = await Event.create({
                        ...req.body,
                        owner: session?.user.id
                    })
                    res.status(201).json({ success: true, data: event })
                } catch (error) {
                    res.status(400).json({ success: false })
                    console.log(error)
                }
            break;

            default:
                res.status(400).json({ success: false })
                break
    }
}