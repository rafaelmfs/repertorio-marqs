"use client";

import { Button } from "@/components/ui/button";
import { IconClose, IconFileText, IconPlus } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { buildSongMarkdown, createSongSlug } from "@/lib/services/song-markdown.service";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type ComposerForm = {
  title: string;
  artist: string;
  slug: string;
  content: string;
};

const INITIAL_FORM: ComposerForm = {
  title: "",
  artist: "",
  slug: "",
  content: "",
};

export function SongMarkdownComposer() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [downloadFeedback, setDownloadFeedback] = useState("Baixar markdown");
  const [form, setForm] = useState<ComposerForm>(INITIAL_FORM);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const generatedSlug = useMemo(() => createSongSlug(form.title), [form.title]);
  const markdown = useMemo(
    () =>
      buildSongMarkdown({
        title: form.title,
        artist: form.artist,
        slug: form.slug || generatedSlug,
        content: form.content,
      }),
    [form.artist, form.content, form.slug, form.title, generatedSlug],
  );

  const contentPreview = useMemo(() => {
    const match = markdown.match(/^---[\s\S]*?---\n\n([\s\S]*)$/);
    return (match?.[1] ?? "").trimEnd();
  }, [markdown]);

  function updateField<Key extends keyof ComposerForm>(key: Key, value: ComposerForm[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleDownload() {
    const fileNameBase = (form.slug || generatedSlug || "nova-musica").trim();
    const fileName = `${fileNameBase || "nova-musica"}.md`;

    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    setDownloadFeedback("Arquivo baixado");
    window.setTimeout(() => setDownloadFeedback("Baixar markdown"), 1600);
  }

  return (
    <>
      <Button type="button" variant="solid" size="sm" onClick={() => setIsOpen(true)}>
        <IconPlus className="h-3.5 w-3.5" />
        Nova musica
      </Button>

      {isOpen && isMounted
        ? createPortal(
          <div className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-sm dark:bg-[#020817]/75">
            <div className="song-scrollbar h-full overflow-y-auto p-3 sm:p-4 md:p-6">
              <div className="mx-auto w-full max-w-3xl rounded-lg sm:rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-[#0f1f36]">
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-5 sm:py-4 dark:border-slate-700">
                  <div>
                    <h2 className="flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100">
                      <IconFileText className="h-4 w-4" />
                      Gerar markdown da musica
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Preencha os campos e baixe o arquivo markdown pronto para usar.
                    </p>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                    <IconClose className="h-4 w-4" />
                    Fechar
                  </Button>
                </div>

                <div className="space-y-3 sm:space-y-4 px-4 py-4 sm:px-5 sm:py-5">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="song-title">
                      Titulo
                    </label>
                    <Input
                      id="song-title"
                      placeholder="Ex.: Santo pra Sempre"
                      value={form.title}
                      onChange={(event) => updateField("title", event.target.value)}
                    />
                  </div>

                  <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="song-artist">
                        Artista
                      </label>
                      <Input
                        id="song-artist"
                        placeholder="Ex.: Ministerio Zoe"
                        value={form.artist}
                        onChange={(event) => updateField("artist", event.target.value)}
                      />
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="song-slug">
                        Slug
                      </label>
                      <Input
                        id="song-slug"
                        placeholder={generatedSlug || "gerado automaticamente"}
                        value={form.slug}
                        onChange={(event) => updateField("slug", event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="song-content">
                      Conteudo da cifra
                    </label>
                    <Textarea
                      id="song-content"
                      className="min-h-36 sm:min-h-48 font-mono text-xs sm:text-sm leading-5 sm:leading-6"
                      placeholder="Cole aqui a cifra com o espacamento original"
                      value={form.content}
                      onChange={(event) => updateField("content", event.target.value)}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 pt-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      O markdown abaixo e atualizado automaticamente.
                    </p>
                    <Button type="button" variant="outline" size="sm" onClick={handleDownload}>
                      <IconFileText className="h-3.5 w-3.5" />
                      {downloadFeedback}
                    </Button>
                  </div>

                  <pre className="song-scrollbar max-h-48 sm:max-h-72 overflow-auto rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 p-2 sm:p-4 text-xs leading-5 sm:leading-6 text-slate-800 dark:border-slate-700 dark:bg-[#0b1a2f] dark:text-slate-200">
                    {markdown}
                  </pre>

                  <div className="space-y-1.5 sm:space-y-2 pt-1">
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-300">Preview limpo da cifra</p>
                    <pre className="song-scrollbar max-h-48 sm:max-h-72 overflow-auto rounded-lg sm:rounded-xl border border-slate-200 bg-white p-2 sm:p-4 text-xs sm:text-sm leading-5 sm:leading-7 text-slate-800 dark:border-slate-700 dark:bg-[#0b1a2f] dark:text-slate-200">
                      {contentPreview}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )
        : null}
    </>
  );
}
