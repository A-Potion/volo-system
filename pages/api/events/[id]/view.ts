import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import type { NextApiRequest, NextApiResponse } from 'next'
import { auth } from '@/lib/auth/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { method } = req;
  const { id } = req.query;

  // ✅ Convert headers properly
  const session = await auth.api.getSession({
    headers: new Headers(
      Object.entries(req.headers).map(([key, value]) => [
        key,
        Array.isArray(value) ? value.join(', ') : value ?? ''
      ])
    )
  });

  switch (method) {
    case 'GET':
      try {
        let isOwner = false;
        const event = await Event.findOne({ _id: id });

        if (!event) {
          return res.redirect('/404');
        }

        const { volunteers, ...safeEvent } = event;
        if (session?.user.id === event.owner) {
          isOwner = true;
        }

        res.status(200).json({ success: true, data: safeEvent._doc, isOwner });
      } catch (error) {
        console.error(error);
        res.status(404).json({ success: false });
      }
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
