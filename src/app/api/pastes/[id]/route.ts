import { connectDB } from "@/lib/db";
import Paste from "@/lib/models/Paste";
import { getNowMs } from "@/lib/time";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  await connectDB();

  const paste = await Paste.findById(id);

  if (!paste) return Response.json({ error: "Not found" }, { status: 404 });

  const now = getNowMs(req);

  // Expiry check
  if (paste.expiresAt && now >= paste.expiresAt)
    return Response.json({ error: "Paste has expired" }, { status: 404 });

  // Max views check (before incrementing)
  if (paste.maxViews && paste.views >= paste.maxViews)
    return Response.json(
      { error: "Paste has reached max views" },
      { status: 404 },
    );

  // Atomic increment to prevent race conditions
  const updatedPaste = await Paste.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  );

  // Double-check after atomic increment
  if (updatedPaste.maxViews && updatedPaste.views > updatedPaste.maxViews) {
    return Response.json(
      { error: "Paste has reached max views" },
      { status: 404 },
    );
  }

  return Response.json({
    content: updatedPaste.content,
    remaining_views: updatedPaste.maxViews
      ? Math.max(Number(updatedPaste.maxViews) - updatedPaste.views, 0)
      : null,
    expires_at: updatedPaste.expiresAt
      ? new Date(Number(updatedPaste.expiresAt)).toISOString()
      : null,
  }, { status: 200 });
}
