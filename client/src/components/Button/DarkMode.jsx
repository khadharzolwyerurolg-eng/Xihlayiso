import React, { useState, useEffect } from 'react';
import '../../style/DarkMode.css';

const THEME_STORAGE_KEY = 'xihlayiso-theme';

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(
    () => window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark'
  );

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDark);
    window.localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <button
      type="button"
      onClick={() => setIsDark((currentIsDark) => !currentIsDark)}
      aria-label={`Ativar modo ${isDark ? 'claro' : 'escuro'}`}
      aria-pressed={isDark}
      className={`theme-toggle${isDark ? ' active' : ''}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {isDark ? (
          <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5a8.5 8.5 0 1 0 12 12Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
          </>
        )}
      </svg>
    </button>
  );
}

export default DarkModeToggle;