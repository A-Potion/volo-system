"use server"

import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/mongodb'
import Event from '@/models/Event'
import { betterAuth } from "better-auth"
import { authClient } from '@/lib/auth/auth-client';
import { headers } from 'next/headers'
import Volunteer from '@/models/Volunteer'
import { auth } from '@/lib/auth/auth'

export default async function handler(req: NextApiRequest,
  res: NextApiResponse
) {
    // const headersList = await headers()
    await dbConnect();

    const { method } = req;
    const { id } = req.query
    const session = await auth.api.getSession({
    headers: req.headers
})

    console.log(session)
    
    switch (method) {
            case 'POST':
                try {
                    const reqbody = req.body
                    const event = await Event.findById(id)
                    

                

                    const isVolunteering = event.volunteers.some(
                        (volunteer: any) => volunteer.userid === session?.user.id
                    )
                    console.log(isVolunteering)

                    if (isVolunteering) {
                        res.status(302).json({ success: false, message: 'You have already signed up for this event.' })
                        break
                    } else if (event.owner === session?.user.id) {
                        res.status(302).json({ success: false, message: 'You cannot volunteer at your own event.' })
                        break
                    } 

                    const volunteer = {
                        ...req.body,
                        userid: session?.user.id,
                    }
                    await Event.updateOne(
                    { _id: id }, 
                    { $push: { volunteers: volunteer } })
                    res.status(201).json({ success: true, message: 'Successfully applied to volunteer.' })
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