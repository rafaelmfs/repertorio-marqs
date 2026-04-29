import { includesNormalized, normalizeForSearch } from "@/lib/utils/string.utils";
import { describe, expect, it } from "vitest";

describe("string utils", () => {
  it("normalizes search values", () => {
    expect(normalizeForSearch("  TeStE  ")).toBe("teste");
  });

  it("strips diacritics", () => {
    expect(normalizeForSearch("Naamã")).toBe("naama");
    expect(normalizeForSearch("Glória")).toBe("gloria");
    expect(normalizeForSearch("Aleluia")).toBe("aleluia");
  });

  it("checks normalized includes", () => {
    expect(includesNormalized("Projeto Sola", "projeto")).toBe(true);
    expect(includesNormalized("Projeto Sola", "xpto")).toBe(false);
  });

  it("matches with and without accents", () => {
    expect(includesNormalized("Naamã", "naama")).toBe(true);
    expect(includesNormalized("naama", "Naamã")).toBe(true);
    expect(includesNormalized("Glória", "gloria")).toBe(true);
  });
});
