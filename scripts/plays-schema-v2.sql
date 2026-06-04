-- ============================================================
-- plays.muonnoi.org — schema bổ sung V2 (đăng ký thành viên + nhật ký đồng ý)
-- Chạy sau scripts/schema.sql và scripts/plays-schema.sql
-- ============================================================

-- Đăng ký "chờ" theo email (trước khi xác nhận magic-email).
-- Khi người dùng xác nhận email, hợp nhất bản ghi này vào users + plays_profiles.
CREATE TABLE IF NOT EXISTS plays_registrations (
  email           TEXT PRIMARY KEY,
  nickname        TEXT NOT NULL,
  age             INTEGER NOT NULL,
  gender          TEXT NOT NULL DEFAULT 'khong', -- nam | nu | khac | khong
  phone           TEXT,
  consent_version TEXT,
  parental        INTEGER NOT NULL DEFAULT 0,    -- 1 = có đồng ý của cha mẹ/giám hộ (trẻ < tuổi quy định)
  created_at      INTEGER NOT NULL,
  updated_at      INTEGER NOT NULL
);

-- Nhật ký đồng ý điều khoản/quyền riêng tư của THÀNH VIÊN (audit tuân thủ).
CREATE TABLE IF NOT EXISTS plays_consents (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL,
  version     TEXT NOT NULL,
  created_at  INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_plays_consents_user ON plays_consents(user_id, created_at DESC);

-- (Khuyến nghị) bổ sung hồ sơ thành viên vào plays_profiles khi hợp nhất đăng ký:
--   ALTER TABLE plays_profiles ADD COLUMN age INTEGER;
--   ALTER TABLE plays_profiles ADD COLUMN gender TEXT;
--   ALTER TABLE plays_profiles ADD COLUMN phone TEXT;
-- (Tách riêng để dev quyết định lưu PII ở đâu cho phù hợp chính sách bảo mật.)
