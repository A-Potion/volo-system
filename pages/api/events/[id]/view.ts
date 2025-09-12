import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import type { NextApiRequest, NextApiResponse } from 'next'
import { auth } from '@/lib/auth/auth'
import { useState } from "react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await dbConnect()
    const { method } = req;
    const { id } = req.query

    const session = await auth.api.getSession({
            headers: req.headers
        })

    switch (method) {
        case 'GET':
            try {
                let isOwner = false
                const { id } = req.query
                const event = await Event.findOne({ _id: id })
                if (!event) {
                    res.redirect('/404')
                }
                const { volunteers, ...safeEvent } = event;
                if (session?.user.id === event.owner) {
                    isOwner = true
                }
                console.log(safeEvent)
                res.status(200).json({ success: true, data: safeEvent._doc, isOwner})
            } catch (error) {
                res.status(404).json({ success: false })
                console.log(error)
            }
            break

    }}