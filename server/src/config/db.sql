-- db.sql
CREATE TABLE IF NOT EXISTS links (
  code TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  click_count INTEGER NOT NULL DEFAULT 0,
  last_clicked TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- optional index for quick lookups (code is primary key already)
CREATE UNIQUE INDEX IF NOT EXISTS idx_links_code ON links (code);
