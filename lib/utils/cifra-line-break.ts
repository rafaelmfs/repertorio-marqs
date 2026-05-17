/**
 * Quebra linhas de cifras para no máximo 48 caracteres,
 * mantendo o alinhamento dos acordes com as palavras.
 *
 * @param content Texto da cifra
 * @param maxLen Tamanho máximo da linha
 * @returns Texto da cifra com linhas quebradas
 */
export function breakCifraLines(content: string, maxLen = 48): string {
  const lines = content.split(/\r?\n/);
  const result: string[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    // Verifica se é linha de acorde (só acordes, espaços, |, :, etc)
    const isChordLine = /^[\s\|:\-\w#bm\(\)\/]+$/.test(line) && /[A-G]/.test(line);
    if (!isChordLine || line.length <= maxLen) {
      result.push(line);
      i++;
      continue;
    }
    // Se for linha de acorde longa, quebra e ajusta a linha de baixo
    const lyricLine = lines[i + 1] || "";
    let chord = line;
    let lyric = lyricLine;
    let offset = 0;
    while (chord.length > maxLen) {
      // Procura melhor ponto de quebra (antes do maxLen, em espaço ou barra)
      let breakAt = chord.lastIndexOf(" ", maxLen);
      if (breakAt < maxLen - 8) breakAt = maxLen; // força quebra se não achar espaço
      // Quebra acorde e letra
      const chordPart = chord.slice(0, breakAt);
      const lyricPart = lyric.slice(0, breakAt);
      result.push(chordPart);
      result.push(lyricPart);
      chord = chord.slice(breakAt);
      lyric = lyric.slice(breakAt);
      // Remove espaços iniciais
      chord = chord.replace(/^ +/, "");
      lyric = lyric.replace(/^ +/, "");
      offset += breakAt;
    }
    // Adiciona o resto
    result.push(chord);
    if (lyric.length > 0) result.push(lyric);
    i += 2;
  }
  return result.join("\n");
}
