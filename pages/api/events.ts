import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/mongodb'
import Event from '@/models/Event';

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const event = await Event.find({});
                res.status(200).json({ success: true, data: event})
            } catch (error) {
                res.status(400).json({ success: false })
                console.log(error)
            }
            break
            case 'POST':
                try {
                    const event = await Event.create(req.body)
                    res.status(201).json({ success: true, data: event })
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