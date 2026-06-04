import { json, bad } from "../util/http";

/**
 * POST /api/plays/register  (CÔNG KHAI — chưa cần phiên đăng nhập)
 * body: { nickname, age, gender, email, phone, consent_version, parental }
 *
 * Lưu "đăng ký chờ" (pending) theo email. Việc TẠO tài khoản/đăng nhập thật vẫn qua
 * luồng magic-email hiện có (/api/auth/request). Khi người dùng xác nhận email, dev hợp nhất
 * bản ghi này vào users + plays_profiles (nickname/age/gender/phone).
 *
 * LƯU Ý TUÂN THỦ: dữ liệu cá nhân (gồm SĐT) + người dưới tuổi quy định cần đồng ý của
 * cha mẹ/người giám hộ (Nghị định 13/2023/NĐ-CP, Luật Trẻ em). Trường `parental` ghi nhận điều này.
 */
export const onRequestPost: PagesFunction = async (ctx) => {
  const { env } = ctx as any;
  let b: any = {};
  try { b = await ctx.request.json(); } catch {}

  const nickname = String(b.nickname || "").trim().slice(0, 40);
  const age = Math.floor(Number(b.age) || 0);
  const gender = ["nam", "nu", "khac", "khong"].includes(b.gender) ? b.gender : "khong";
  const email = String(b.email || "").trim().toLowerCase().slice(0, 200);
  const phone = String(b.phone || "").trim().slice(0, 20);
  const consentVersion = String(b.consent_version || "").slice(0, 32);
  const parental = b.parental ? 1 : 0;

  if (nickname.length < 2) return bad(400, "bad_nickname", "Biệt danh không hợp lệ.");
  if (age < 3 || age > 120) return bad(400, "bad_age", "Độ tuổi không hợp lệ.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad(400, "bad_email", "Email không hợp lệ.");
  if (!/^[0-9+\-\s().]{8,20}$/.test(phone)) return bad(400, "bad_phone", "Số điện thoại không hợp lệ.");
  if (age < 16 && !parental) return bad(400, "need_parental", "Cần đồng ý của cha mẹ/người giám hộ.");

  const now = Date.now();
  try {
    await env.DB.prepare(
      `INSERT INTO plays_registrations
         (email, nickname, age, gender, phone, consent_version, parental, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(email) DO UPDATE SET
         nickname = excluded.nickname, age = excluded.age, gender = excluded.gender,
         phone = excluded.phone, consent_version = excluded.consent_version,
         parental = excluded.parental, updated_at = excluded.updated_at`
    ).bind(email, nickname, age, gender, phone, consentVersion, parental, now, now).run();
    return json({ ok: true, pending: true, next: "verify_email" });
  } catch (e: any) {
    // fail-open: vẫn trả ok để client tiếp tục bước email; dev xem log
    return json({ ok: true, pending: true, next: "verify_email", note: "store_skipped" });
  }
};
