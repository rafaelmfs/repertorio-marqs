import { ListsPageClient } from "@/app/lists/_components/lists-page.client";
import { getSongsPageViewModel } from "@/lib/viewmodels/songs.view-model";
import { MobileTopNav } from "../songs/[slug]/_components/mobile-top-nav.client";

export default async function ListsPage() {
  const { songs } = await getSongsPageViewModel();

  return (
    <>
      <MobileTopNav />

      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <ListsPageClient songs={songs} />
      </main>
    </>
  );
}
