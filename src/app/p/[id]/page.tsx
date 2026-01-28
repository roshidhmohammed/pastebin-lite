import { notFound } from "next/navigation";

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ;
  const response = await fetch(`${baseUrl}/api/pastes/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    notFound();
  }

  const paste = await response.json();

  if (!paste.content) {
    notFound();
  }

  return (
    <main className="p-20 flex flex-col items-center">
      <pre>{paste.content}</pre>
    </main>
  );
}
