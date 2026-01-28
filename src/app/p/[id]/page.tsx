export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import Paste from "@/lib/models/Paste";
import { notFound } from "next/navigation";

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();
  const paste = await Paste.findById(id);

  if (!paste) notFound();

  return (
    <main style={{ padding: 20 }}>
      <pre>{paste.content}</pre>
    </main>
  );
}
