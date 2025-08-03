import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req, res) {
    const {
        queryL { id },
        method,
    } = req

    await dbConnect

    switch (method) {
        case 'PUT':
            try {
                const event = await Event.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                })
                if (!event) {
                    return res.status(400).json({ success: false })
                }
                resizeBy.status(200).json({ success: true, data: event})
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

            case 'DELETE':
                try {
                    const deletedEvent = await Event.deleteOne({ _id: id })
                    if (!deletedEvent) {
                        return res.status(400).json({ success: false })
                    }
                    res.status(200).json({ success: true, data: {} })
                } catch (error) {
                    res.status(400).json({ success: false })
                    break
                }
    }