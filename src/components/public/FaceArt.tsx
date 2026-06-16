type FaceKind = "face-1" | "face-2" | "face-3" | "face-4";

const VARIANTS: Record<FaceKind, { skin: string; hair: string; cheek: string }> = {
  "face-1": { skin: "#f0c79a", hair: "#3a2a1f", cheek: "#e8a886" },
  "face-2": { skin: "#d9a679", hair: "#2b2018", cheek: "#c79066" },
  "face-3": { skin: "#e8b596", hair: "#1f1814", cheek: "#d99a85" },
  "face-4": { skin: "#e8c4a0", hair: "#1f150f", cheek: "#d6a988" },
};

const HAIR_PATHS: Record<FaceKind, string> = {
  "face-1": "M30 55 Q32 32 50 30 Q68 32 70 55 Q66 38 50 36 Q34 38 30 55 Z",
  "face-2": "M32 50 Q30 35 50 32 Q70 35 68 50 Q66 38 50 36 Q34 38 32 50 Z",
  "face-3": "M30 55 Q30 28 50 28 Q70 28 70 55 Q72 50 72 42 Q70 22 50 22 Q30 22 28 42 Q28 50 30 55 Z",
  "face-4": "M30 52 Q28 30 50 28 Q72 30 70 52 Q66 36 50 34 Q34 36 30 52 Z",
};

export function FaceArt({ kind }: { kind: FaceKind }) {
  const v = VARIANTS[kind];
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMax meet"
      className="absolute inset-0 w-full h-full"
    >
      <ellipse cx="50" cy="105" rx="42" ry="32" fill={v.hair} opacity="0.88" />
      <ellipse cx="50" cy="108" rx="36" ry="26" fill={v.skin} opacity="0.4" />
      <rect x="44" y="68" width="12" height="14" rx="4" fill={v.skin} />
      <ellipse cx="50" cy="58" rx="18" ry="22" fill={v.skin} />
      <path d={HAIR_PATHS[kind]} fill={v.hair} />
      <circle cx="42" cy="62" r="2.5" fill={v.cheek} opacity="0.4" />
      <circle cx="58" cy="62" r="2.5" fill={v.cheek} opacity="0.4" />
      <circle cx="43" cy="56" r="1.2" fill="#2a1f18" />
      <circle cx="57" cy="56" r="1.2" fill="#2a1f18" />
      <path d="M45 64 Q50 67 55 64" stroke="#6b4534" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
