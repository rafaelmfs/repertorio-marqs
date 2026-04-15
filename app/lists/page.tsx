import { ListsPageClient } from "@/app/lists/_components/lists-page.client";
import { TopNav } from "@/components/layout/top-nav";
import { getSongsPageViewModel } from "@/lib/viewmodels/songs.view-model";

export default async function ListsPage() {
  const { songs } = await getSongsPageViewModel();

  return (
    <>
      <TopNav />
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <ListsPageClient songs={songs} />
      </main>
    </>
  );
}
