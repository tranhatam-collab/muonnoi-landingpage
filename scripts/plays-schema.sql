-- ============================================================
-- plays.muonnoi.org — schema D1 (chạy thêm sau scripts/schema.sql)
-- Mọi bảng dùng users.id sẵn có => thành viên muonnoi.org auto-link.
-- ============================================================

-- Hồ sơ game 1-1 với users (tự tạo khi đăng nhập lần đầu vào plays)
CREATE TABLE IF NOT EXISTS plays_profiles (
  user_id        TEXT PRIMARY KEY,          -- = users.id
  display_name   TEXT,
  points_balance INTEGER NOT NULL DEFAULT 0, -- cache số dư (nguồn sự thật = ledger)
  created_at     INTEGER NOT NULL,
  updated_at     INTEGER NOT NULL
);

-- Tiến trình mỗi (user, game): đã chơi / đang chơi / chưa chơi + state dở dang
CREATE TABLE IF NOT EXISTS plays_progress (
  user_id     TEXT NOT NULL,
  game_id     TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'playing', -- unplayed | playing | played
  best_level  INTEGER NOT NULL DEFAULT 0,
  best_score  INTEGER NOT NULL DEFAULT 0,
  state_json  TEXT,                            -- trạng thái "đang chơi dở" (tùy game)
  plays_count INTEGER NOT NULL DEFAULT 0,
  updated_at  INTEGER NOT NULL,
  PRIMARY KEY (user_id, game_id)
);
CREATE INDEX IF NOT EXISTS idx_plays_progress_user ON plays_progress(user_id);

-- Phiên chơi (mở/đóng) -> chống gian lận điểm (server-authoritative)
CREATE TABLE IF NOT EXISTS plays_sessions (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL,
  game_id     TEXT NOT NULL,
  started_at  INTEGER NOT NULL,
  ended_at    INTEGER,
  reported_score INTEGER,
  valid       INTEGER NOT NULL DEFAULT 1       -- 0 = nghi ngờ, không cộng điểm
);
CREATE INDEX IF NOT EXISTS idx_plays_sessions_user ON plays_sessions(user_id);

-- Sổ cái Muôn Điểm (ghi kép). Số dư = SUM(delta) theo user.
-- KHÔNG mua bằng tiền, KHÔNG quy đổi ra tiền mặt.
CREATE TABLE IF NOT EXISTS plays_point_ledger (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL,                   -- chủ tài khoản bị ảnh hưởng
  delta       INTEGER NOT NULL,                -- + nhận / - tiêu
  kind        TEXT NOT NULL,                   -- earn_play | streak | challenge | contrib | transfer_in | transfer_out | spend
  game_id     TEXT,
  ref_user    TEXT,                            -- đối tác khi transfer
  reason      TEXT,
  created_at  INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_plays_ledger_user ON plays_point_ledger(user_id, created_at DESC);

-- (Tùy chọn) danh mục server-side; giai đoạn đầu đọc tĩnh từ catalog.js
CREATE TABLE IF NOT EXISTS plays_catalog (
  game_id    TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  genre      TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'roadmap',  -- live | wave1 | roadmap
  sort       INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL
);
