/*
 * Muôn Nơi · plays.muonnoi.org — Bộ sưu tập "Học viện" (collections)
 * --------------------------------------------------------
 * Công bố các BỘ game đã thiết kế (thuyết minh trong các PLAN-*.md).
 * Đây là danh mục "đã lên kế hoạch" (planned) — hiển thị trên trang chủ.
 * Mọi game đều SONG NGỮ Anh–Việt. audience/minAge theo nguyên tắc cổng tuổi.
 */
(function (root) {
  const COLLECTIONS = [
    {
      id: 'bilingual', icon: '🔤',
      vi: 'Học Từ Vựng Song Ngữ', en: 'Bilingual Vocabulary',
      audience: 'Trẻ em 5–18', minAge: 0, doc: 'PLAN-EDU-BILINGUAL.md',
      desc: 'Học từ vựng Anh–Việt qua 10 cơ chế thông minh, thang 10 cấp Pre-A1 → C1.',
      games: [
        ['Cầu Từ Đôi', 'Word Bridge'], ['Thợ Săn Nghĩa', 'Meaning Hunter'],
        ['Xây Câu', 'Sentence Builder'], ['Mật Mã Chữ', 'Word Cipher'],
        ['Cây Từ Vựng', 'Vocabulary Tree'], ['Phân Loại Thần Tốc', 'Quick Sort'],
        ['Đường Ống Nghĩa', 'Meaning Pipes'], ['Suy Luận Ngữ Cảnh', 'Context Detective'],
        ['Đối Chữ', 'Word Duel'], ['Bản Đồ Từ', 'Word Map'],
      ],
    },
    {
      id: 'creative', icon: '🎨',
      vi: 'Sáng Tạo & Vẽ Tự Do', en: 'Creativity & Free Drawing',
      audience: 'Trẻ em 3–15', minAge: 0, doc: 'PLAN-KIDS-CREATIVE.md',
      desc: 'Vẽ & sáng tạo, ưu tiên điện thoại; từ dẫn dắt → bán tự do → sáng tạo thoải mái.',
      games: [
        ['Tô Màu Thần Kỳ', 'Magic Coloring'], ['Nối Chấm', 'Connect the Dots'],
        ['Đồ Theo Nét Mờ', 'Trace & Fade'], ['Ghép Hình Sáng Tạo', 'Shape Maker'],
        ['Đối Xứng Kỳ Diệu', 'Symmetry Mirror'], ['Vẽ Hoàn Thành', 'Finish the Drawing'],
        ['Kể Chuyện Bằng Tranh', 'Draw a Story'], ['Vẽ Theo Cảm Xúc', 'Draw the Feeling'],
        ['Phòng Tranh Sống', 'Animate It'], ['Xưởng Sáng Tạo Tự Do', 'Free Studio'],
      ],
    },
    {
      id: 'genius', icon: '🧠',
      vi: 'Siêu Trí Tuệ', en: 'Genius Mind',
      audience: 'Mọi lứa tuổi', minAge: 0, doc: 'PLAN-GENIUS.md',
      desc: '10 game phủ toàn phổ trí tuệ, mỗi game một cách chơi; AI giữ bạn ở ngưỡng "flow".',
      games: [
        ['Tháp Ký Ức', 'Mind Stack'], ['Khối Xoay Trong Đầu', 'MindCube'],
        ['Cờ Tiên Tri', 'Foresight'], ['Tia Chớp Ý', 'Sparks'],
        ['Trực Giác Xác Suất', 'Hunch'], ['Dòng Thác Chú Ý', 'Flow'],
        ['Cảm Quy Luật', 'Aha'], ['Người Mô Phỏng', 'Simulor'],
        ['Cung Điện Ký Ức', 'Memory Palace'], ['Trí Tuệ Tự Soi', 'Metamind'],
      ],
    },
    {
      id: 'adult', icon: '💬',
      vi: 'Giao Tiếp & Tư Duy Logic', en: 'Communication & Logic',
      audience: 'Người lớn ≥ 12', minAge: 12, doc: 'PLAN-EDU-ADULT.md',
      desc: 'Luyện đối thoại + tư duy phản biện, căn bản → chuyên sâu, với AI nhập vai.',
      games: [
        ['Sân Khấu Tình Huống', 'Role-play Studio'], ['Đấu Trường Tán Gẫu', 'Small Talk Arena'],
        ['Lắng Nghe Chủ Động', 'Active Listening'], ['Sắc Thái & Văn Phong', 'Tone & Register'],
        ['Đấu Thuyết Phục', 'Persuasion Duel'], ['Suy Luận Lưới', 'Logic Grid'],
        ['Thợ Săn Ngụy Biện', 'Fallacy Hunter'], ['Kiến Trúc Lập Luận', 'Argument Architect'],
        ['Phòng Thí Nghiệm Quyết Định', 'Decision Lab'], ['Mô Phỏng Đàm Phán', 'Negotiation Sim'],
      ],
    },
    {
      id: 'entrepreneur', icon: '💼',
      vi: 'Doanh Nhân', en: 'Entrepreneur',
      audience: 'Người lớn ≥ 12', minAge: 12, doc: 'PLAN-EDU-ENTREPRENEUR.md',
      desc: 'Chiến lược · kế hoạch · lập luận · sáng tạo + 1 game LUẬT kinh doanh (vừa chơi vừa học).',
      games: [
        ['Ma Trận Giải Pháp', 'Solution Matrix'], ['Bàn Cờ Thị Trường', 'Market Board'],
        ['Kiến Trúc Kế Hoạch', 'Plan Architect'], ['Mô Hình Kinh Doanh', 'Model Canvas'],
        ['Đấu Trường Gọi Vốn', 'Pitch Arena'], ['Phòng Lab Định Giá', 'Pricing Lab'],
        ['Cây Quyết Định Kinh Doanh', 'Decision Tree'], ['Lý Luận Sáng Tạo', 'Creative Reasoning'],
        ['⚖️ Luật Kinh Doanh', 'Business Law Quest'], ['Mô Phỏng Vận Hành', 'Operations Sim'],
      ],
    },
    {
      id: 'moonshot', icon: '🚀',
      vi: 'Nguyên Bản Giá Trị Lớn', en: 'Moonshot Originals',
      audience: 'Mọi lứa tuổi', minAge: 0, doc: 'PLAN-MOONSHOT.md',
      desc: '10 game nguyên bản, cơ chế AI-native + hào Muôn Nơi; nhóm IP tham vọng.',
      games: [
        ['Đồng Thuận', 'Consensus'], ['Người Gác Sự Thật', 'Proof Keepers'],
        ['Bản Giao Hưởng Của Đám Đông', 'Living Symphony'], ['Khảm Ký Ức', 'Memory Mosaic'],
        ['Hệ Quả', 'Ripple'], ['Người Phiên Dịch Vạn Vật', 'Translator of All Things'],
        ['Trò Chơi Câu Hỏi', 'The Question Game'], ['Khu Vườn Chung', 'The Commons'],
        ['Tấm Gương', 'The Mirror'], ['Đổi Vai', 'Walk In My Shoes'],
      ],
    },
  ];

  const DATA = {
    collections: COLLECTIONS,
    counts: {
      sets: COLLECTIONS.length,
      games: COLLECTIONS.reduce((s, c) => s + c.games.length, 0), // 60
    },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = DATA;
  root.MN_COLLECTIONS = DATA;
})(typeof window !== 'undefined' ? window : globalThis);
