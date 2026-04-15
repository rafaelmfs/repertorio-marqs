import { includesNormalized, normalizeForSearch } from "@/lib/utils/string.utils";
import { describe, expect, it } from "vitest";

describe("string utils", () => {
  it("normalizes search values", () => {
    expect(normalizeForSearch("  TeStE  ")).toBe("teste");
  });

  it("checks normalized includes", () => {
    expect(includesNormalized("Projeto Sola", "projeto")).toBe(true);
    expect(includesNormalized("Projeto Sola", "xpto")).toBe(false);
  });
});
