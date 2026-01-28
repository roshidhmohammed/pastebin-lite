import { connectDB } from "@/lib/db";
import Paste from "@/lib/models/Paste";
import { getNowMs } from "@/lib/time";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const { ttl_seconds, max_views, content } = body;

  // content validation
  if (!content?.trim() || typeof content !== "string") {
    return Response.json(
      { error: "Content is required and must be a non-empty string" },
      { status: 400 },
    );
  }

  // ttl_seconds validation
  if (
    ttl_seconds !== undefined &&
    (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)
  ) {
    return Response.json({ error: "Invalid ttl_seconds" }, { status: 400 });
  }

  // max_views validation
  if (
    max_views !== undefined &&
    (!Number.isInteger(max_views) || max_views < 1)
  ) {
    return Response.json({ error: "Invalid max_views" }, { status: 400 });
  }

  const now = getNowMs(req);

  await connectDB();

  const paste = await Paste.create({
    content: body.content,
    createdAt: now,
    expiresAt: ttl_seconds ? now + ttl_seconds * 1000 : null,
    maxViews: max_views ?? null,
    views: 0,
  });

  return Response.json({
    id: paste._id,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/p/${paste._id}`,
  }, {status: 201});
}
