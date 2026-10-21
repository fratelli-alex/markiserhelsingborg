// Författare. Bara riktiga personer (Projektfakta). En påhittad persona kräver Alex ok och noteras i CLAUDE.md.
// Profilsida: /om-oss/<nyckel>/. Länkas från Om oss, artiklar och innehåll, aldrig från sidfoten.
export interface Forfattare { namn: string; roll: string; bio: string[]; foto?: string; sameAs?: string[] }

export const FORFATTARE: Record<string, Forfattare> = {};

export const forfattarUrl = (nyckel: string) => `/om-oss/${nyckel}/`;
