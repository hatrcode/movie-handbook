import MovieDetailPageClient from "@/components/items/MovieDetailPageClient";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <MovieDetailPageClient id={id} />;
}
