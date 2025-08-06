import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import type { NextApiRequest, NextApiResponse } from 'next'
import { auth } from '@/lib/auth/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await dbConnect()
    const { method } = req;
    const { id } = req.query
    
    const session = await auth.api.getSession({
        headers: req.headers
    })

    if ( method === 'DELETE' ) {
            try {
                const { id } = req.query
                const event = await Event.findOne({ _id: id })
                console.log(event)
                if (event.owner != session?.user.id ) {
                    res.status(403).json({ success: false, message: 'Only event owners can delete them.'})
                    
                } else {
                const result = await Event.deleteOne(event)
                res.status(200).json({ success: true, data: result})
                }
            } catch (error) {
                res.status(404).json({ success: false })
                console.log(error)
            }
        } else {
            res.status(405).json({ success: false, message: 'Method not allowed.' })
        }

    }