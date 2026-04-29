import { SongsPageClient } from "@/app/_components/songs-page.client";
import { getSongsPageViewModel } from "@/lib/viewmodels/songs.view-model";
import { MobileTopNav } from "./songs/[slug]/_components/mobile-top-nav.client";

export default async function HomePage() {
  const { songs, total } = await getSongsPageViewModel();

  return (
    <>
      <MobileTopNav />

      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <SongsPageClient songs={songs} total={total} />
      </main>
    </>
  );
}
