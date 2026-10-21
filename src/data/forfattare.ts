// Författare. Bara riktiga personer (Projektfakta). En påhittad persona kräver Alex ok och noteras i CLAUDE.md.
// Profilsida: /om-oss/<nyckel>/. Länkas från Om oss, artiklar och innehåll, aldrig från sidfoten.
export interface Forfattare { namn: string; roll: string; bio: string[]; foto?: string; sameAs?: string[] }

export const FORFATTARE: Record<string, Forfattare> = {
  // Roller från Alex 2026-10-21 (båda äger Markisbyrån). Foton och LinkedIn saknas än; bio skrivs när de finns.
  'mikael-lundgren': { namn: 'Mikael Lundgren', roll: 'Delägare i Markisbyrån', bio: [] },
  'roy-ridderberg': { namn: 'Roy Ridderberg', roll: 'Delägare i Markisbyrån', bio: [] },
};

export const forfattarUrl = (nyckel: string) => `/om-oss/${nyckel}/`;
