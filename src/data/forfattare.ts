// Författare. Bara riktiga personer (Projektfakta). En påhittad persona kräver Alex ok och noteras i CLAUDE.md.
// Profilsida: /om-oss/<nyckel>/. Länkas från Om oss, artiklar och innehåll, aldrig från sidfoten.
export interface Forfattare { namn: string; roll: string; bio: string[]; foto?: string; epost?: string; linkedin?: string; sameAs?: string[] }

export const FORFATTARE: Record<string, Forfattare> = {
  // Roller från Alex 2026-10-21 (båda äger Markisbyrån). Foton, mejl och LinkedIn från Alex 2026-10-22.
  'mikael-lundgren': {
    namn: 'Mikael Lundgren', roll: 'Delägare i Markisbyrån', bio: [], foto: 'agare-mikael-lundgren-2', epost: 'mikael@markisbyran.se',
    linkedin: 'https://www.linkedin.com/in/mikael-lundgren-6717397a/', sameAs: ['https://www.linkedin.com/in/mikael-lundgren-6717397a/'],
  },
  'roy-ridderberg': {
    namn: 'Roy Ridderberg', roll: 'Delägare i Markisbyrån', bio: [], foto: 'agare-roy-ridderberg', epost: 'roy@markisbyran.se',
    linkedin: 'https://www.linkedin.com/in/roy-ridderberg-79179a94/', sameAs: ['https://www.linkedin.com/in/roy-ridderberg-79179a94/'],
  },
};

export const forfattarUrl = (nyckel: string) => `/om-oss/${nyckel}/`;
