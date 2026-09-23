export function CatSvg() {
  return (
    <svg viewBox="0 0 100 85" className="animal-svg cat-svg user-animal-svg" aria-hidden="true">
      <ellipse cx="50" cy="80" rx="34" ry="4" className="animal-ground-shadow" />
      <g className="cat-tail-group">
        <path
          d="M 68 56 Q 84 50 86 36 Q 88 22 79 18 Q 74 16 75 22 Q 76 30 78 40 Q 74 48 64 54 Z"
          fill="#ea580c"
          className="cat-tail-path"
        />
        <path d="M 86 36 Q 88 22 79 18 Q 74 16 75 22 Q 76 28 83 33 Z" fill="#fff7ed" />
      </g>
      <ellipse cx="64" cy="66" rx="10" ry="12" fill="#c2410c" className="cat-hind-leg-back" />
      <ellipse cx="62" cy="74" rx="8" ry="4.5" fill="#ea580c" />
      <path
        d="M 32 50 C 32 38, 48 38, 58 42 C 68 46, 72 56, 70 68 C 68 76, 50 78, 36 76 C 30 74, 32 58, 32 50 Z"
        fill="#f97316"
        className="cat-body-torso"
      />
      <path
        d="M 38 52 C 40 46, 50 46, 55 50 C 60 55, 60 68, 54 73 C 46 75, 38 72, 38 52 Z"
        fill="#fff7ed"
      />
      <g className="cat-leg-back">
        <rect x="42" y="62" width="6" height="15" rx="3" fill="#c2410c" />
        <ellipse cx="45" cy="76" rx="5" ry="3" fill="#fff7ed" />
      </g>
      <g className="cat-licking-paw-group">
        <path
          d="M 33 54 C 31 58, 28 66, 26 73 C 26 76, 32 77, 34 74 C 36 68, 37 60, 37 54 Z"
          fill="#ea580c"
          className="cat-arm-stem"
        />
        <ellipse cx="28" cy="74" rx="5" ry="3.5" fill="#fff7ed" className="cat-paw-pad" />
      </g>
      <g className="cat-leg-front">
        <rect x="48" y="60" width="6.5" height="17" rx="3" fill="#ea580c" />
        <ellipse cx="51" cy="76" rx="5" ry="3" fill="#fff7ed" />
      </g>
      <g className="cat-head-group">
        <path d="M 28 32 L 23 15 L 37 24 Z" fill="#ea580c" className="cat-ear-left" />
        <path d="M 27 29 L 25 18 L 34 24 Z" fill="#fda4af" />
        <path d="M 43 25 L 53 17 L 49 33 Z" fill="#ea580c" className="cat-ear-right" />
        <path d="M 45 26 L 50 20 L 48 30 Z" fill="#fda4af" />
        <circle cx="37" cy="35" r="16" fill="#f97316" />
        <ellipse cx="37" cy="42" rx="10" ry="7.5" fill="#fff7ed" />
        <ellipse cx="32" cy="42" rx="5.5" ry="5" fill="#fff7ed" />
        <ellipse cx="42" cy="42" rx="5.5" ry="5" fill="#fff7ed" />
        <path d="M 28 22 C 34 22, 38 27, 36 33 C 33 34, 25 32, 26 27 Z" fill="#7c2d12" />
        <g className="cat-eyes">
          <ellipse cx="31" cy="34" rx="2.8" ry="3.2" fill="#047857" className="cat-eye-ball" />
          <circle cx="30.2" cy="33.2" r="1" fill="#fff" />
          <ellipse cx="43" cy="34" rx="2.8" ry="3.2" fill="#047857" className="cat-eye-ball" />
          <circle cx="42.2" cy="33.2" r="1" fill="#fff" />
        </g>
        <polygon points="36,40 38,40 37,42" fill="#f43f5e" />
        <path d="M 35 43 Q 37 45 39 43" stroke="#9a3412" strokeWidth="1" fill="none" />
        <path d="M 35.5 43.5 Q 37 47 38.5 43.5 Z" fill="#fb7185" className="cat-licking-tongue" />
        <line x1="22" y1="41" x2="14" y2="40" stroke="#fed7aa" strokeWidth="1" />
        <line x1="22" y1="43" x2="13" y2="44" stroke="#fed7aa" strokeWidth="1" />
        <line x1="52" y1="41" x2="60" y2="40" stroke="#fed7aa" strokeWidth="1" />
        <line x1="52" y1="43" x2="61" y2="44" stroke="#fed7aa" strokeWidth="1" />
      </g>
    </svg>
  )
}

export function DogSvg() {
  return (
    <svg viewBox="0 0 100 85" className="animal-svg dog-svg user-animal-svg" aria-hidden="true">
      <ellipse cx="50" cy="80" rx="35" ry="4" className="animal-ground-shadow" />
      <g className="dog-tail-group">
        <path d="M 28 48 C 16 46, 12 36, 17 32 C 22 28, 25 36, 30 44 Z" fill="#d97706" className="dog-tail-shape" />
        <circle cx="16" cy="33" r="4.5" fill="#fffbeb" />
      </g>
      <g className="dog-leg-back-left">
        <rect x="33" y="60" width="7" height="16" rx="3.5" fill="#b45309" />
        <ellipse cx="36" cy="75" rx="5" ry="3" fill="#fffbeb" />
      </g>
      <g className="dog-leg-back-right">
        <rect x="42" y="60" width="7.5" height="17" rx="3.5" fill="#d97706" />
        <ellipse cx="45" cy="76" rx="5.5" ry="3" fill="#fffbeb" />
      </g>
      <path
        d="M 30 46 C 30 38, 48 38, 62 42 C 72 46, 75 58, 72 68 C 70 76, 44 76, 34 72 C 28 68, 30 52, 30 46 Z"
        fill="#f59e0b"
        className="dog-body-torso"
      />
      <path d="M 44 50 C 48 46, 62 46, 68 52 C 72 58, 68 72, 60 74 C 48 76, 42 66, 44 50 Z" fill="#fffbeb" />
      <g className="dog-leg-front-left">
        <rect x="55" y="60" width="7" height="16" rx="3.5" fill="#b45309" />
        <ellipse cx="58" cy="75" rx="5" ry="3" fill="#fffbeb" />
      </g>
      <g className="dog-leg-front-right">
        <rect x="63" y="58" width="7.5" height="19" rx="3.5" fill="#f59e0b" />
        <ellipse cx="66" cy="76" rx="5.5" ry="3" fill="#fffbeb" />
      </g>
      <g className="dog-head-group">
        <path d="M 58 26 L 56 10 L 68 18 Z" fill="#d97706" className="dog-ear-left" />
        <path d="M 59 23 L 58 13 L 66 19 Z" fill="#fed7aa" />
        <path d="M 72 20 L 82 11 L 80 27 Z" fill="#d97706" className="dog-ear-right" />
        <path d="M 73 21 L 80 14 L 78 26 Z" fill="#fed7aa" />
        <circle cx="68" cy="32" r="15" fill="#f59e0b" />
        <path d="M 66 20 C 67 18, 69 18, 70 20 L 71 30 L 65 30 Z" fill="#fffbeb" />
        <ellipse cx="73" cy="38" rx="8" ry="6" fill="#fffbeb" />
        <ellipse cx="63" cy="36" rx="3" ry="2" fill="#fbbf24" opacity="0.4" />
        <ellipse cx="77" cy="36" rx="3" ry="2" fill="#fbbf24" opacity="0.4" />
        <g className="dog-eyes">
          <ellipse cx="64" cy="30" rx="2.6" ry="3" fill="#1e293b" className="dog-eye" />
          <circle cx="63.2" cy="29.2" r="0.9" fill="#fff" />
          <ellipse cx="75" cy="30" rx="2.6" ry="3" fill="#1e293b" className="dog-eye" />
          <circle cx="74.2" cy="29.2" r="0.9" fill="#fff" />
        </g>
        <ellipse cx="76" cy="35" rx="2.8" ry="2.2" fill="#1e293b" />
        <circle cx="75.2" cy="34.5" r="0.7" fill="#fff" />
        <path d="M 72 38 Q 74 41 77 38" stroke="#78350f" strokeWidth="1" fill="none" />
        <path d="M 73 39 Q 74.5 45 76 39 Z" fill="#fb7185" className="dog-panting-tongue" />
      </g>
    </svg>
  )
}

export function BunnySvg() {
  return (
    <svg viewBox="0 0 60 70" className="animal-svg bunny-svg user-animal-svg" aria-hidden="true">
      <ellipse cx="30" cy="66" rx="20" ry="3.5" className="animal-ground-shadow" />
      <circle cx="48" cy="55" r="5" fill="#fefce8" className="bunny-tail" />
      <g className="bunny-ears-group">
        <path d="M 22 28 C 17 18, 15 4, 21 2 C 26 0, 27 15, 27 27 Z" fill="#fefce8" className="bunny-ear-left" />
        <path d="M 21 24 C 18 16, 17 6, 21 5 C 24 4, 25 14, 25 24 Z" fill="#fbcfe8" />
        <path d="M 33 27 C 33 15, 34 0, 39 2 C 45 4, 43 18, 38 28 Z" fill="#fefce8" className="bunny-ear-right" />
        <path d="M 35 24 C 35 14, 36 4, 39 5 C 42 6, 41 16, 38 24 Z" fill="#fbcfe8" />
      </g>
      <ellipse cx="32" cy="52" rx="16" ry="14" fill="#fefce8" className="bunny-body" />
      <ellipse cx="30" cy="52" rx="10" ry="10" fill="#ffffff" />
      <circle cx="30" cy="34" r="13" fill="#fefce8" className="bunny-head" />
      <ellipse cx="24" cy="38" rx="4" ry="2.5" fill="#fbcfe8" opacity="0.6" />
      <ellipse cx="36" cy="38" rx="4" ry="2.5" fill="#fbcfe8" opacity="0.6" />
      <g className="bunny-eyes">
        <ellipse cx="24" cy="32" rx="2" ry="2.6" fill="#1e293b" className="bunny-eye" />
        <circle cx="23.3" cy="31.3" r="0.7" fill="#fff" />
        <ellipse cx="36" cy="32" rx="2" ry="2.6" fill="#1e293b" className="bunny-eye" />
        <circle cx="35.3" cy="31.3" r="0.7" fill="#fff" />
      </g>
      <polygon points="29,35 31,35 30,37" fill="#f43f5e" className="bunny-nose" />
      <g className="bunny-hands-group">
        <ellipse cx="26" cy="45" rx="3.5" ry="4.5" fill="#ffffff" stroke="#fef08a" strokeWidth="0.5" className="bunny-hand-left" />
        <ellipse cx="34" cy="45" rx="3.5" ry="4.5" fill="#ffffff" stroke="#fef08a" strokeWidth="0.5" className="bunny-hand-right" />
      </g>
      <ellipse cx="22" cy="63" rx="7" ry="4" fill="#ffffff" />
      <ellipse cx="38" cy="63" rx="7" ry="4" fill="#ffffff" />
    </svg>
  )
}

export function FoxSvg() {
  return (
    <svg viewBox="0 0 100 85" className="animal-svg fox-svg user-animal-svg" aria-hidden="true">
      <ellipse cx="50" cy="80" rx="34" ry="4" className="animal-ground-shadow" />
      <g className="cat-tail-group">
        <path
          d="M 68 56 C 88 52, 94 36, 88 24 C 84 18, 76 22, 74 28 C 72 38, 72 48, 64 54 Z"
          fill="#c2410c"
          className="cat-tail-path"
        />
        <path d="M 88 24 C 84 18, 76 22, 75 27 C 82 30, 87 27, 88 24 Z" fill="#ffffff" />
      </g>
      <path
        d="M 32 50 C 32 38, 48 38, 58 42 C 68 46, 72 56, 70 68 C 68 76, 50 78, 36 76 C 30 74, 32 58, 32 50 Z"
        fill="#ea580c"
      />
      <path
        d="M 36 50 C 38 46, 48 46, 54 50 C 58 55, 58 68, 52 73 C 44 75, 36 72, 36 50 Z"
        fill="#ffffff"
      />
      <rect x="42" y="62" width="6" height="15" rx="3" fill="#1c1917" />
      <rect x="48" y="60" width="6.5" height="17" rx="3" fill="#1c1917" />
      <g className="cat-licking-paw-group">
        <path d="M 33 54 L 26 73 L 34 74 L 37 54 Z" fill="#1c1917" />
      </g>
      <g className="cat-head-group">
        <path d="M 27 32 L 20 12 L 35 24 Z" fill="#ea580c" />
        <path d="M 26 28 L 22 15 L 33 24 Z" fill="#1c1917" />
        <path d="M 43 24 L 54 12 L 49 33 Z" fill="#ea580c" />
        <path d="M 45 25 L 52 15 L 48 29 Z" fill="#1c1917" />
        <circle cx="37" cy="35" r="16" fill="#ea580c" />
        <polygon points="24,38 37,45 28,48" fill="#ffffff" />
        <polygon points="50,38 37,45 46,48" fill="#ffffff" />
        <g className="cat-eyes">
          <ellipse cx="31" cy="33" rx="2.5" ry="3" fill="#1c1917" />
          <circle cx="30.2" cy="32.2" r="0.9" fill="#fff" />
          <ellipse cx="43" cy="33" rx="2.5" ry="3" fill="#1c1917" />
          <circle cx="42.2" cy="32.2" r="0.9" fill="#fff" />
        </g>
        <polygon points="36,41 38,41 37,43" fill="#1c1917" />
      </g>
    </svg>
  )
}

export function PandaSvg() {
  return (
    <svg viewBox="0 0 100 85" className="animal-svg panda-svg user-animal-svg" aria-hidden="true">
      <ellipse cx="50" cy="80" rx="32" ry="4" className="animal-ground-shadow" />
      {/* Panda Ears */}
      <circle cx="28" cy="22" r="7" fill="#18181b" className="cat-ear-left" />
      <circle cx="46" cy="22" r="7" fill="#18181b" className="cat-ear-right" />
      {/* Panda Body */}
      <ellipse cx="48" cy="58" rx="22" ry="18" fill="#ffffff" stroke="#18181b" strokeWidth="1" />
      <ellipse cx="33" cy="66" rx="9" ry="8" fill="#18181b" />
      <ellipse cx="58" cy="66" rx="9" ry="8" fill="#18181b" />
      {/* Black shoulder band & arms */}
      <path d="M 28 50 C 32 46, 58 46, 62 50 C 66 56, 64 68, 58 66 C 52 64, 48 56, 44 56 C 40 56, 36 64, 32 66 C 26 68, 24 56, 28 50 Z" fill="#18181b" />
      {/* Waving/grooming paw */}
      <g className="cat-licking-paw-group">
        <ellipse cx="28" cy="64" rx="6" ry="7" fill="#18181b" />
        <ellipse cx="28" cy="66" rx="4" ry="3.5" fill="#fda4af" opacity="0.7" />
      </g>
      {/* Panda Head */}
      <g className="cat-head-group">
        <circle cx="37" cy="35" r="16" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1" />
        {/* Eye Patches */}
        <ellipse cx="30" cy="34" rx="4.5" ry="6" fill="#18181b" transform="rotate(-15 30 34)" />
        <ellipse cx="44" cy="34" rx="4.5" ry="6" fill="#18181b" transform="rotate(15 44 34)" />
        {/* Eyes (Blinking) */}
        <g className="cat-eyes">
          <circle cx="30" cy="34" r="1.8" fill="#ffffff" />
          <circle cx="30" cy="34" r="1.1" fill="#18181b" />
          <circle cx="44" cy="34" r="1.8" fill="#ffffff" />
          <circle cx="44" cy="34" r="1.1" fill="#18181b" />
        </g>
        {/* Cute dark nose & mouth */}
        <ellipse cx="37" cy="40" rx="2.5" ry="1.8" fill="#18181b" />
        <path d="M 35 43 Q 37 45 39 43" stroke="#18181b" strokeWidth="1" fill="none" />
      </g>
    </svg>
  )
}

export function HamsterSvg() {
  return (
    <svg viewBox="0 0 100 85" className="animal-svg hamster-svg user-animal-svg" aria-hidden="true">
      <ellipse cx="50" cy="80" rx="30" ry="4" className="animal-ground-shadow" />
      {/* Round tail */}
      <circle cx="68" cy="58" r="4" fill="#fde68a" />
      {/* Chubby Body */}
      <ellipse cx="48" cy="54" rx="22" ry="18" fill="#d97706" />
      <ellipse cx="44" cy="55" rx="16" ry="14" fill="#fef3c7" />
      {/* Little feet */}
      <ellipse cx="36" cy="72" rx="5" ry="3.5" fill="#fed7aa" />
      <ellipse cx="56" cy="72" rx="5" ry="3.5" fill="#fed7aa" />
      {/* Hands holding / nibbling */}
      <g className="bunny-hands-group">
        <ellipse cx="38" cy="54" rx="3.5" ry="4.5" fill="#fed7aa" />
        <ellipse cx="44" cy="54" rx="3.5" ry="4.5" fill="#fed7aa" />
      </g>
      {/* Head */}
      <g className="cat-head-group">
        {/* Round ears */}
        <circle cx="28" cy="24" r="6" fill="#d97706" className="cat-ear-left" />
        <circle cx="28" cy="24" r="3.5" fill="#fda4af" />
        <circle cx="46" cy="24" r="6" fill="#d97706" className="cat-ear-right" />
        <circle cx="46" cy="24" r="3.5" fill="#fda4af" />
        <circle cx="37" cy="35" r="15" fill="#d97706" />
        {/* Chubby cheeks */}
        <ellipse cx="29" cy="40" rx="7" ry="5.5" fill="#fef3c7" />
        <ellipse cx="45" cy="40" rx="7" ry="5.5" fill="#fef3c7" />
        <ellipse cx="37" cy="40" rx="5" ry="4" fill="#fef3c7" />
        {/* Blinking eyes */}
        <g className="cat-eyes">
          <circle cx="31" cy="33" r="2.4" fill="#18181b" />
          <circle cx="30.3" cy="32.3" r="0.8" fill="#ffffff" />
          <circle cx="43" cy="33" r="2.4" fill="#18181b" />
          <circle cx="42.3" cy="32.3" r="0.8" fill="#ffffff" />
        </g>
        {/* Nose & Whiskers */}
        <polygon points="36,37 38,37 37,39" fill="#f43f5e" className="bunny-nose" />
        <line x1="24" y1="41" x2="16" y2="40" stroke="#fcd34d" strokeWidth="0.8" />
        <line x1="24" y1="43" x2="15" y2="44" stroke="#fcd34d" strokeWidth="0.8" />
        <line x1="50" y1="41" x2="58" y2="40" stroke="#fcd34d" strokeWidth="0.8" />
        <line x1="50" y1="43" x2="59" y2="44" stroke="#fcd34d" strokeWidth="0.8" />
      </g>
    </svg>
  )
}

export function ShibaSvg() {
  return (
    <svg viewBox="0 0 100 85" className="animal-svg shiba-svg user-animal-svg" aria-hidden="true">
      <ellipse cx="50" cy="80" rx="34" ry="4" className="animal-ground-shadow" />
      {/* Curled curly Shiba tail */}
      <g className="dog-tail-group">
        <path d="M 30 48 Q 18 34 24 24 Q 30 18 36 26 Q 38 32 30 40 Z" fill="#ea580c" />
        <circle cx="28" cy="22" r="4" fill="#fffbeb" />
      </g>
      <rect x="36" y="60" width="7" height="16" rx="3.5" fill="#c2410c" />
      <rect x="58" y="60" width="7" height="16" rx="3.5" fill="#ea580c" />
      <path
        d="M 32 46 C 32 38, 50 38, 62 42 C 72 46, 75 58, 72 68 C 70 76, 44 76, 34 72 C 30 68, 32 52, 32 46 Z"
        fill="#f97316"
        className="dog-body-torso"
      />
      <path d="M 46 50 C 50 46, 62 46, 68 52 C 72 58, 68 72, 60 74 C 48 76, 44 66, 46 50 Z" fill="#fffbeb" />
      <g className="dog-head-group">
        <path d="M 58 26 L 56 11 L 68 18 Z" fill="#ea580c" className="dog-ear-left" />
        <path d="M 59 23 L 58 14 L 66 19 Z" fill="#fed7aa" />
        <path d="M 72 20 L 82 11 L 80 27 Z" fill="#ea580c" className="dog-ear-right" />
        <path d="M 73 21 L 80 14 L 78 26 Z" fill="#fed7aa" />
        <circle cx="68" cy="32" r="15" fill="#f97316" />
        {/* Shiba eyebrow dots */}
        <circle cx="63" cy="25" r="1.8" fill="#fffbeb" />
        <circle cx="73" cy="25" r="1.8" fill="#fffbeb" />
        {/* White muzzle */}
        <ellipse cx="73" cy="38" rx="8" ry="6" fill="#fffbeb" />
        <g className="dog-eyes">
          <ellipse cx="64" cy="30" rx="2.5" ry="2.8" fill="#18181b" />
          <circle cx="63.3" cy="29.3" r="0.8" fill="#fff" />
          <ellipse cx="75" cy="30" rx="2.5" ry="2.8" fill="#18181b" />
          <circle cx="74.3" cy="29.3" r="0.8" fill="#fff" />
        </g>
        <ellipse cx="76" cy="35" rx="2.5" ry="2" fill="#18181b" />
        <path d="M 72 38 Q 74 41 77 38" stroke="#78350f" strokeWidth="1" fill="none" />
        <path d="M 73 39 Q 74.5 45 76 39 Z" fill="#fb7185" className="dog-panting-tongue" />
      </g>
    </svg>
  )
}

export function BearSvg() {
  return (
    <svg viewBox="0 0 100 85" className="animal-svg bear-svg user-animal-svg" aria-hidden="true">
      <ellipse cx="50" cy="80" rx="32" ry="4" className="animal-ground-shadow" />
      {/* Round bear ears */}
      <circle cx="28" cy="22" r="7" fill="#78350f" className="cat-ear-left" />
      <circle cx="28" cy="22" r="4" fill="#fed7aa" />
      <circle cx="46" cy="22" r="7" fill="#78350f" className="cat-ear-right" />
      <circle cx="46" cy="22" r="4" fill="#fed7aa" />
      {/* Bear body */}
      <ellipse cx="48" cy="56" rx="22" ry="18" fill="#92400e" />
      <ellipse cx="45" cy="57" rx="15" ry="13" fill="#fde68a" opacity="0.85" />
      <ellipse cx="34" cy="72" rx="7" ry="4" fill="#78350f" />
      <ellipse cx="56" cy="72" rx="7" ry="4" fill="#78350f" />
      {/* Front resting/waving paw */}
      <g className="cat-licking-paw-group">
        <ellipse cx="30" cy="60" rx="6" ry="6" fill="#78350f" />
        <circle cx="30" cy="60" r="3" fill="#fed7aa" />
      </g>
      {/* Bear head */}
      <g className="cat-head-group">
        <circle cx="37" cy="35" r="16" fill="#92400e" />
        <ellipse cx="37" cy="41" rx="8" ry="6" fill="#fde68a" />
        <g className="cat-eyes">
          <circle cx="31" cy="33" r="2.2" fill="#18181b" />
          <circle cx="30.3" cy="32.3" r="0.7" fill="#ffffff" />
          <circle cx="43" cy="33" r="2.2" fill="#18181b" />
          <circle cx="42.3" cy="32.3" r="0.7" fill="#ffffff" />
        </g>
        <ellipse cx="37" cy="39" rx="3" ry="2.2" fill="#18181b" />
        <path d="M 35 43 Q 37 45 39 43" stroke="#78350f" strokeWidth="1" fill="none" />
      </g>
    </svg>
  )
}

export function BirdSvg() {
  return (
    <svg viewBox="0 0 70 60" className="animal-svg bird-svg user-animal-svg" aria-hidden="true">
      <ellipse cx="34" cy="54" rx="16" ry="2.5" className="animal-ground-shadow" />
      {/* Tail feathers */}
      <g className="bird-tail-group">
        <path d="M 22 34 L 8 36 L 10 40 L 24 38 Z" fill="#0284c7" />
        <path d="M 20 32 L 6 33 L 8 37 L 22 35 Z" fill="#0369a1" />
      </g>
      {/* Bird body */}
      <ellipse cx="34" cy="34" rx="15" ry="12" fill="#38bdf8" className="bird-body" />
      {/* Creamy chest/belly */}
      <ellipse cx="38" cy="36" rx="9" ry="8" fill="#fef08a" />
      {/* Back wing (flapping) */}
      <g className="bird-wing-back-group">
        <path d="M 28 26 Q 18 14 26 10 Q 34 20 30 32 Z" fill="#0369a1" className="bird-wing-back" />
      </g>
      {/* Front wing (flapping) */}
      <g className="bird-wing-front-group">
        <path d="M 34 28 Q 24 12 36 8 Q 44 20 36 34 Z" fill="#0ea5e9" className="bird-wing-front" />
        <path d="M 33 26 Q 26 15 35 12 Q 40 20 35 28 Z" fill="#7dd3fc" />
      </g>
      {/* Head & Beak */}
      <g className="bird-head-group">
        <circle cx="44" cy="24" r="10" fill="#0284c7" />
        <circle cx="47" cy="22" r="2.2" fill="#0f172a" />
        <circle cx="47.6" cy="21.4" r="0.7" fill="#ffffff" />
        {/* Cute beak */}
        <polygon points="53,23 60,26 53,28" fill="#f97316" className="bird-beak" />
      </g>
      {/* Cute feet perched or tucked */}
      <g className="bird-feet">
        <line x1="32" y1="44" x2="30" y2="52" stroke="#d97706" strokeWidth="1.5" />
        <line x1="37" y1="44" x2="36" y2="52" stroke="#d97706" strokeWidth="1.5" />
      </g>
    </svg>
  )
}

export function TurtleSvg() {
  return (
    <svg viewBox="0 0 80 55" className="animal-svg turtle-svg user-animal-svg" aria-hidden="true">
      <ellipse cx="40" cy="48" rx="28" ry="3" className="animal-ground-shadow" />
      {/* Tail */}
      <polygon points="18,36 12,38 18,40" fill="#4ade80" />
      {/* Back crawling flipper */}
      <ellipse cx="25" cy="42" rx="7" ry="4" fill="#22c55e" className="turtle-flipper-back" />
      {/* Textured dome shell */}
      <path d="M 18 38 C 18 20 62 20 62 38 Z" fill="#15803d" className="turtle-shell" />
      {/* Shell scute plates */}
      <ellipse cx="40" cy="30" rx="14" ry="7.5" fill="#22c55e" stroke="#166534" strokeWidth="1.2" />
      <path d="M 28 30 L 22 36 M 52 30 L 58 36 M 40 22 L 40 38" stroke="#166534" strokeWidth="1" />
      {/* Front crawling flipper */}
      <ellipse cx="58" cy="42" rx="7.5" ry="4" fill="#4ade80" className="turtle-flipper-front" />
      {/* Head and neck extending */}
      <g className="turtle-head-group">
        <path d="M 58 33 Q 66 31 69 27" stroke="#86efac" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="69" cy="26" rx="6" ry="5" fill="#4ade80" />
        <circle cx="71" cy="24" r="1.5" fill="#0f172a" />
        <circle cx="71.5" cy="23.5" r="0.5" fill="#ffffff" />
        <path d="M 70 28 Q 72 29 71 27" stroke="#166534" strokeWidth="0.8" fill="none" />
      </g>
    </svg>
  )
}

export function FishSvg() {
  return (
    <svg viewBox="0 0 75 50" className="animal-svg fish-svg user-animal-svg" aria-hidden="true">
      {/* Soft water ambient shadow */}
      <ellipse cx="38" cy="44" rx="22" ry="2.5" fill="rgba(56, 189, 248, 0.15)" />
      {/* Tail fin with undulating oscillation */}
      <g className="fish-tail-group">
        <path
          d="M 26 25 Q 12 14 10 18 Q 16 25 10 32 Q 12 36 26 25 Z"
          fill="#ea580c"
          className="fish-tail-fin"
        />
        <path d="M 25 25 Q 15 19 14 22 Q 18 25 14 28 Q 15 31 25 25 Z" fill="#fdba74" />
      </g>
      {/* Dorsal fin on top */}
      <path d="M 38 18 Q 44 8 50 18 Z" fill="#ea580c" className="fish-dorsal-fin" />
      {/* Streamlined koi fish body */}
      <path
        d="M 25 25 C 31 14 54 15 62 25 C 54 35 31 36 25 25 Z"
        fill="#f97316"
        className="fish-body"
      />
      {/* Belly gradient shimmer */}
      <path d="M 32 25 C 37 19 50 20 55 25 C 50 29 37 30 32 25 Z" fill="#fdba74" opacity="0.9" />
      {/* Pectoral fin */}
      <path d="M 44 26 Q 40 33 46 32 Z" fill="#ea580c" className="fish-pectoral-fin" />
      {/* Head and eye */}
      <circle cx="56" cy="23" r="2.2" fill="#0f172a" />
      <circle cx="56.6" cy="22.4" r="0.7" fill="#ffffff" />
      {/* Mouth and floating water bubbles */}
      <circle cx="66" cy="20" r="1.5" fill="none" stroke="#38bdf8" strokeWidth="0.8" opacity="0.75" className="fish-bubble-1" />
      <circle cx="70" cy="15" r="1.1" fill="none" stroke="#38bdf8" strokeWidth="0.7" opacity="0.6" className="fish-bubble-2" />
    </svg>
  )
}

/* ── 8 DISTINCT REALISTIC ANIMAL ROSTER: EACH USER GETS A UNIQUE ANIMAL ── */
const ANIMAL_ROSTER = [
  "rabbit", // User 0: Rabbit (parabolic hops, ear inertia, body bounce)
  "cat",    // User 1: Cat (graceful walking gait, alternating paws, tail sway)
  "dog",    // User 2: Dog (energetic 4-beat trot, head bob, happy wag)
  "bird",   // User 3: Bird (wing flapping flight, floating gliding lift)
  "turtle", // User 4: Turtle (slow deliberate crawling flippers, neck bob)
  "fish",   // User 5: Fish (sinusoidal undulating swim, tail fin oscillation)
  "fox",    // User 6: Fox (stealthy trotting, bushy tail counterbalance)
  "panda",  // User 7: Panda (playful rolling waddle, paw waving)
]

/* ── COMPONENT: ANIMAL WITH SPECIES-SPECIFIC BEHAVIOR & REAL-TIME VISIBILITY ── */
export function UserPeekingAnimal({ index = 0, name, isHovered, isVisible = false }) {
  // Guaranteed distinct animal for every user by roster index
  const animalType = ANIMAL_ROSTER[index % ANIMAL_ROSTER.length]
  const delay = ((index * 1.8) % 5.5).toFixed(1)

  return (
    <div
      className={`user-peeking-animal-wrap animal-behavior-${animalType} ${isHovered ? "user-animal-hovered" : ""} ${!isVisible ? "user-animal-hidden" : ""}`}
      style={{ animationDelay: `${delay}s` }}
      title={`${name}'s companion (${animalType})`}
      aria-hidden="true"
    >
      <div className="peeking-animal-body">
        {animalType === "rabbit" && <BunnySvg />}
        {animalType === "cat" && <CatSvg />}
        {animalType === "dog" && <DogSvg />}
        {animalType === "bird" && <BirdSvg />}
        {animalType === "turtle" && <TurtleSvg />}
        {animalType === "fish" && <FishSvg />}
        {animalType === "fox" && <FoxSvg />}
        {animalType === "panda" && <PandaSvg />}
      </div>
    </div>
  )
}
