import Paste from "@/lib/models/Paste";

export async function fetchPaste(
  id: string,
  {
    now,
    countView,
  }: {
    now: number;
    countView: boolean;
  }
) {
  const paste = await Paste.findById(id);

  if (!paste) return null;

  if (paste.expiresAt && now >= paste.expiresAt) return null;

  if (countView) {
    if (paste.maxViews && paste.views >= paste.maxViews) return null;

    paste.views += 1;
    await paste.save();
  }

  return paste;
}
