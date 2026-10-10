import { SignInButton, SignUpButton } from "@clerk/react";
import { Button } from "@heroui/react";
import { HERO_UI_THEME_PRESETS } from "../data/heroUiThemePresets.js";
import { WALLPAPERS } from "../data/wallpapers";
import { useTheme } from "../context/theme";
import { useWallpaper } from "../context/wallpaper";

function ControlIcon({ name }) {
  const shared = {
    "aria-hidden": true,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.7,
    viewBox: "0 0 24 24",
  };

  if (name === "wallpaper") {
    return (
      <svg {...shared}>
        <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
        <circle cx="9" cy="9" r="1.5" />
        <path d="m5 17 4.5-4 3 2.5 2.5-2 4 3.5" />
      </svg>
    );
  }

  if (name === "palette") {
    return (
      <svg {...shared}>
        <path d="M12 3.5a8.5 8.5 0 1 0 0 17h1.2a2 2 0 0 0 1.5-3.3 1.7 1.7 0 0 1 1.3-2.8H18a3 3 0 0 0 3-3C21 7 17 3.5 12 3.5Z" />
        <path
          d="M7.5 11h.01M10 7.5h.01m4 0h.01m2.5 3.5h.01"
          strokeWidth="2.5"
        />
      </svg>
    );
  }

  return name === "sun" ? (
    <svg {...shared}>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2.5v2m0 15v2m9.5-9.5h-2m-15 0h-2m16.2-6.7-1.4 1.4M6.7 17.3l-1.4 1.4m13.4 0-1.4-1.4M6.7 6.7 5.3 5.3" />
    </svg>
  ) : (
    <svg {...shared}>
      <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" />
    </svg>
  );
}

function AuthPage() {
  const { theme, toggleTheme, themePreset, setThemePreset } = useTheme();
  const { wallpaper, wallpaperId, setWallpaperId } = useWallpaper();

  return (
    <main
      className="auth-scene"
      style={{ backgroundImage: `url(${wallpaper.url})` }}
    >
      <section className="auth-window" aria-label="iChat sign in">
        <header className="auth-titlebar">
          <div className="auth-identity">
            <img src="/logo.png" alt="" className="auth-brand-icon" />
            <div>
              <strong>iChat</strong>
              <span>Private session</span>
            </div>
          </div>

          <nav className="auth-controls" aria-label="Appearance settings">
            <details className="auth-menu">
              <summary aria-label="Choose wallpaper" title="Choose wallpaper">
                <ControlIcon name="wallpaper" />
              </summary>
              <div className="auth-menu-panel auth-wallpaper-menu">
                <span className="auth-menu-title">Wallpaper</span>
                {WALLPAPERS.map((option) => (
                  <button
                    className="auth-wallpaper-option"
                    key={option.id}
                    type="button"
                    aria-pressed={wallpaperId === option.id}
                    onClick={(event) => {
                      setWallpaperId(option.id);
                      event.currentTarget.closest("details").open = false;
                    }}
                  >
                    <span
                      className="auth-wallpaper-swatch"
                      style={{ backgroundImage: `url(${option.url})` }}
                    />
                    <span>{option.label}</span>
                    {wallpaperId === option.id && (
                      <span aria-hidden="true">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </details>

            <details className="auth-menu">
              <summary
                aria-label="Choose accent theme"
                title="Choose accent theme"
              >
                <ControlIcon name="palette" />
              </summary>
              <div className="auth-menu-panel auth-theme-menu">
                <span className="auth-menu-title">Accent theme</span>
                <div className="auth-theme-options">
                  {HERO_UI_THEME_PRESETS.map((preset) => (
                    <button
                      className="auth-theme-option"
                      key={preset.id}
                      type="button"
                      aria-label={preset.label}
                      aria-pressed={themePreset === preset.id}
                      onClick={(event) => {
                        setThemePreset(preset.id);
                        event.currentTarget.closest("details").open = false;
                      }}
                    >
                      <span
                        className="auth-theme-swatch"
                        style={{ background: preset.swatch }}
                      />
                      <span>{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </details>

            <button
              className="auth-icon-button"
              type="button"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              onClick={toggleTheme}
            >
              <ControlIcon name={theme === "dark" ? "sun" : "moon"} />
            </button>
          </nav>
        </header>

        <div className="auth-content">
          <section className="auth-intro" aria-labelledby="auth-heading">
            <div className="auth-copy">
              <span className="auth-eyebrow">Secure gateway</span>
              <h1 id="auth-heading">Open message</h1>
              <p>
                Chats, photos, and reactions stay in sync. Sign in on the right
                to continue.
              </p>
            </div>
            <div
              className="auth-grid-art"
              style={{ backgroundImage: `url(${wallpaper.url})` }}
            >
              <div className="auth-grid-lines" />
              <img src="/auth.png" alt="iChat" className="w-80" />
            </div>
          </section>

          <section className="auth-entry" aria-label="Sign in to iChat">
            <div className="auth-card">
              <div className="auth-card-logo">
                <img src="/logo.png" alt="" />
              </div>
              <span className="auth-eyebrow auth-entry-eyebrow">
                Secure entry
              </span>
              <h2>Welcome to iChat</h2>
              <p className="auth-card-copy">Your conversations are waiting.</p>
              <SignInButton mode="modal">
                <Button className="auth-continue">
                  Continue <span aria-hidden="true">→</span>
                </Button>
              </SignInButton>
              <div className="auth-signup">
                <span>New to iChat?</span>
                <SignUpButton mode="modal">
                  <button type="button">Create account</button>
                </SignUpButton>
              </div>
              <div className="auth-protection">
                <span aria-hidden="true">◈</span>
                <span>Protected session · TLS encryption</span>
              </div>
            </div>
          </section>
        </div>

        <footer className="auth-statusbar">
          <span>
            End-to-end session <i>·</i> Encrypted in transit
          </span>
        </footer>
      </section>
    </main>
  );
}

export default AuthPage;
