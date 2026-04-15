import { SongsPageClient } from "@/app/_components/songs-page.client";
import { TopNav } from "@/components/layout/top-nav";
import { getSongsPageViewModel } from "@/lib/viewmodels/songs.view-model";

export default async function HomePage() {
  const { songs, total } = await getSongsPageViewModel();

  return (
    <>
      <TopNav />
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <SongsPageClient songs={songs} total={total} />
      </main>
    </>
  );
}
