export type SongFrontmatter = {
  slug: string;
  title: string;
  artist?: string;
};

export type Song = SongFrontmatter & {
  content: string;
};

export type SongListItem = SongFrontmatter;

export type Setlist = {
  id: string;
  name: string;
  songs: string[];
};

export type SetlistsState = Record<string, Setlist>;

export const STORAGE_KEYS = {
  favorites: "repertorio:favorites",
  setlists: "repertorio:setlists",
} as const;
