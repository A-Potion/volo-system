import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await dbConnect()
    const { method } = req;
    const { id } = req.query

    switch (method) {
        case 'GET':
            try {
                const { id } = req.query
                const event = await Event.findOne({ _id: id })
                if (!event) {
                    res.redirect('/404')
                }
                res.status(200).json({ success: true, data: event.volunteers})
            } catch (error) {
                res.status(404).json({ success: false })
                console.log(error)
            }
            break

    }}