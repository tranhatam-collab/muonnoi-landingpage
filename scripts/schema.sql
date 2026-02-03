-- users: magic email + access control
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | approved | blocked
  created_at INTEGER NOT NULL,
  approved_at INTEGER,
  last_login_at INTEGER,
  wallet_slot TEXT
);

-- posts: proof-first metadata
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  author_id TEXT NOT NULL,
  kind TEXT NOT NULL, -- text | link | file
  title TEXT,
  body TEXT,
  source_link TEXT,
  file_key TEXT,
  file_mime TEXT,
  file_size INTEGER,
  content_hash TEXT NOT NULL,    -- sha256 of normalized content metadata or file bytes
  proof_hash TEXT,
  proof_level INTEGER NOT NULL DEFAULT 0, -- 0 none, 1 soft
  trust_weight REAL NOT NULL DEFAULT 1.0,
  ai_flag TEXT NOT NULL DEFAULT 'neutral', -- neutral | caution | suspicious
  visibility TEXT NOT NULL DEFAULT 'public', -- public | unlisted
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);

-- domain intelligence
CREATE TABLE IF NOT EXISTS domains (
  domain TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'neutral', -- trusted | neutral | harmful
  note TEXT,
  updated_at INTEGER NOT NULL
);

-- flags (off-chain)
CREATE TABLE IF NOT EXISTS flags (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  reporter_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

-- follow (phase 2.5)
CREATE TABLE IF NOT EXISTS follows (
  follower_id TEXT NOT NULL,
  following_id TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (follower_id, following_id)
);
