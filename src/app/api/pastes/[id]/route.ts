import { connectDB } from "@/lib/db";
import Paste from "@/lib/models/Paste";
import { getNowMs } from "@/lib/time";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();

  const now = getNowMs(req);

  // Atomic + guarded update
const paste = await Paste.findOneAndUpdate(
  {
    _id: id,
    $and: [
      {
        $or: [
          { expiresAt: null },
          { expiresAt: { $gt: now } },
        ],
      },
      {
        $or: [
          { maxViews: null },
          { $expr: { $lt: ["$views", "$maxViews"] } },
        ],
      },
    ],
  },
  { $inc: { views: 1 } },
  { new: true }
);


  if (!paste) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({
    content: paste.content,
    remaining_views: paste.maxViews
      ? Math.max(paste.maxViews - paste.views, 0)
      : null,
    expires_at: paste.expiresAt
      ? new Date(paste.expiresAt).toISOString()
      : null,
  });
}
