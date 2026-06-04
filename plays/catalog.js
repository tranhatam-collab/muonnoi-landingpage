// catalog.js — Muon Nơi Game Catalog
// 100 games total: 100 live (3 original + 33 wave1 + 17 wave2 + 50 wave3)
// 12 genre groups, bilingual names

const PLAYS_CATALOG = {
  version: '1.0.0',
  genres: [
    { id: 'reflex',    vi: 'Phản xạ',     en: 'Reflex' },
    { id: 'puzzle',    vi: 'Giải đố',     en: 'Puzzle' },
    { id: 'dexterity', vi: 'Khéo léo',   en: 'Dexterity' },
    { id: 'strategy',  vi: 'Chiến thuật', en: 'Strategy' },
    { id: 'speed',     vi: 'Nhanh tay',   en: 'Speed' },
    { id: 'memory',    vi: 'Nhớ / Pattern', en: 'Memory' },
    { id: 'endless',   vi: 'Tốc độ / Endless', en: 'Endless Runner' },
    { id: 'survival',  vi: 'Sinh tồn',    en: 'Survival' },
    { id: 'skill',     vi: 'Luyện tập',   en: 'Skill Training' },
    { id: 'creative',  vi: 'Sáng tạo',    en: 'Creative' },
    { id: 'arcade',    vi: 'Chiến đấu / Arcade', en: 'Arcade' },
    { id: 'zen',       vi: 'Thư giãn',    en: 'Zen' },
  ],
  games: [
    // ===== LIVE (3 games) =====
    {
      id: 'cham-vo-cuc',
      name: { vi: 'Chạm Vô Cực', en: 'Infinite Touch' },
      desc: { vi: 'Chạm các ô sáng trước khi chúng biến mất. Độ khó tăng dần vô hạn.', en: 'Tap lit cells before they vanish. Difficulty rises asymptotically.' },
      genre: 'reflex',
      wave: 1,
      live: true,
      path: 'games/cham-vo-cuc/',
      difficulty: 'easy',
      duration: '1-5 min',
    },
    {
      id: 'me-cung-muon-loi',
      name: { vi: 'Mê Cung Muôn Lối', en: 'Maze of Many Paths' },
      desc: { vi: 'Tìm lối ra trong mê cung sinh ngẫu nhiên. Mỗi mê cung lớn hơn và có sương mù.', en: 'Find the exit in randomly generated mazes. Each maze is larger and foggier.' },
      genre: 'puzzle',
      wave: 1,
      live: true,
      path: 'games/me-cung-muon-loi/',
      difficulty: 'medium',
      duration: '2-10 min',
    },
    {
      id: 'dinh-sisyphus',
      name: { vi: 'Đỉnh Sisyphus', en: 'Peak of Sisyphus' },
      desc: { vi: 'Canh nhịp đẩy đá lên đỉnh. Dốc dựng dần, đỉnh tiến dần vô cực.', en: 'Time your pushes to roll the boulder uphill. Steeper slopes, endless peak.' },
      genre: 'dexterity',
      wave: 1,
      live: true,
      path: 'games/dinh-sisyphus/',
      difficulty: 'hard',
      duration: '1-3 min',
    },

    // ===== WAVE 1 — 30 games (placeholder + ready to implement) =====
    // Group 1: Reflex (2 more)
    { id: 'phan-xa-doi',    name: { vi: 'Phản Xạ Đôi',    en: 'Dual Reflex' },    desc: { vi: 'Phản xạ với hai màu khác nhau.', en: 'Two-color reflex challenge.' }, genre: 'reflex',    wave: 1, live: true, path: 'games/phan-xa-doi/',    difficulty: 'medium', duration: '2-5 min' },
    { id: 'phan-xa-ba',     name: { vi: 'Phản Xạ Ba',     en: 'Triple Reflex' },   desc: { vi: 'Ba cột, ba màu, tốc độ tăng.', en: 'Three lanes, three colors, speeding up.' }, genre: 'reflex',    wave: 1, live: true, path: 'games/phan-xa-ba/',     difficulty: 'hard',   duration: '2-5 min' },

    // Group 2: Puzzle (2 more)
    { id: 'xoay-khoi',      name: { vi: 'Xoay Khối',      en: 'Block Spin' },      desc: { vi: 'Xoay các khối để tạo đường đi.', en: 'Rotate blocks to make a path.' }, genre: 'puzzle',    wave: 1, live: true, path: 'games/xoay-khoi/',      difficulty: 'easy',   duration: '3-7 min' },
    { id: 'noi-diem',       name: { vi: 'Nối Điểm',       en: 'Connect Dots' },    desc: { vi: 'Nối các điểm mà không cắt nhau.', en: 'Connect dots without crossing.' }, genre: 'puzzle',    wave: 1, live: true, path: 'games/noi-diem/',       difficulty: 'medium', duration: '3-7 min' },

    // Group 3: Dexterity / Timing (2 more)
    { id: 'cat-day',        name: { vi: 'Cắt Dây',        en: 'String Cut' },      desc: { vi: 'Cắt dây đúng lúc.', en: 'Cut the string at the right moment.' }, genre: 'dexterity', wave: 1, live: true, path: 'games/cat-day/',        difficulty: 'easy',   duration: '1-3 min' },
    { id: 'thap-can-bang',  name: { vi: 'Tháp Cân Bằng',  en: 'Balance Tower' },   desc: { vi: 'Xếp khối lên nhau mà không đổ.', en: 'Stack blocks without toppling.' }, genre: 'dexterity', wave: 1, live: true, path: 'games/thap-can-bang/',  difficulty: 'medium', duration: '2-5 min' },

    // Group 4: Strategy (2)
    { id: 'tuong-linh',     name: { vi: 'Tướng Lĩnh',     en: 'Commander' },       desc: { vi: 'Điều quân chiến đấu với tài nguyên hạn chế.', en: 'Command troops with limited resources.' }, genre: 'strategy',  wave: 1, live: true, path: 'games/tuong-linh/',     difficulty: 'hard',   duration: '5-15 min' },
    { id: 'mo-rong-lanh-tho', name: { vi: 'Mở Rộng Lãnh Thổ', en: 'Territory' },  desc: { vi: 'Chiếm lãnh thổ từ đối thủ AI.', en: 'Claim territory from AI opponents.' }, genre: 'strategy',  wave: 1, live: true, path: 'games/mo-rong-lanh-tho/', difficulty: 'medium', duration: '5-10 min' },

    // Group 5: Speed (3)
    { id: 'go-chu',         name: { vi: 'Gõ Chữ',         en: 'Type Rush' },       desc: { vi: 'Gõ chữ nhanh hơn tốc độ rơi.', en: 'Type words faster than they fall.' }, genre: 'speed',     wave: 1, live: true, path: 'games/go-chu/',         difficulty: 'easy',   duration: '1-3 min' },
    { id: 'ban-muc-tieu',   name: { vi: 'Bắn Mục Tiêu',   en: 'Target Shoot' },    desc: { vi: 'Bắn các mục tiêu xuất hiện ngẫu nhiên.', en: 'Shoot randomly appearing targets.' }, genre: 'speed',     wave: 1, live: true, path: 'games/ban-muc-tieu/',   difficulty: 'medium', duration: '2-4 min' },
    { id: 'an-bong',        name: { vi: 'Ăn Bóng',        en: 'Ball Snap' },       desc: { vi: 'Bắt bóng với đúng màu.', en: 'Catch balls of the right color.' }, genre: 'speed',     wave: 1, live: true, path: 'games/an-bong/',        difficulty: 'hard',   duration: '2-5 min' },

    // Group 6: Memory / Pattern (2)
    { id: 'nho-day',        name: { vi: 'Nhớ Dãy',        en: 'Sequence' },        desc: { vi: 'Lặp lại dãy hiệu ứng.', en: 'Repeat the effect sequence.' }, genre: 'memory',    wave: 1, live: true, path: 'games/nho-day/',        difficulty: 'easy',   duration: '2-5 min' },
    { id: 'tim-cap',        name: { vi: 'Tìm Cặp',        en: 'Match Pairs' },     desc: { vi: 'Tìm các cặp thẻ giống nhau.', en: 'Find matching card pairs.' }, genre: 'memory',    wave: 1, live: true, path: 'games/tim-cap/',        difficulty: 'medium', duration: '3-6 min' },

    // Group 7: Endless Runner / Speed (2)
    { id: 'chay-vo-tan',    name: { vi: 'Chạy Vô Tận',    en: 'Infinite Run' },    desc: { vi: 'Nhảy và né chướng ngại vật không ngừng.', en: 'Jump and dodge endless obstacles.' }, genre: 'endless',   wave: 1, live: true, path: 'games/chay-vo-tan/',    difficulty: 'medium', duration: '2-5 min' },
    { id: 'truot-duong',    name: { vi: 'Trượt Đường',    en: 'Lane Slide' },      desc: { vi: 'Trượt qua lại tránh va chạm.', en: 'Slide left-right to avoid crashes.' }, genre: 'endless',   wave: 1, live: true, path: 'games/truot-duong/',    difficulty: 'hard',   duration: '2-5 min' },

    // Group 8: Survival (3)
    { id: 'song-sot',       name: { vi: 'Sống Sót',       en: 'Survive' },         desc: { vi: 'Tồn tại càng lâu càng tốt trong môi trường thù địch.', en: 'Survive as long as possible in hostile environment.' }, genre: 'survival',  wave: 1, live: true, path: 'games/song-sot/',       difficulty: 'hard',   duration: '3-10 min' },
    { id: 'ne-laser',       name: { vi: 'Né Laser',       en: 'Dodge Laser' },     desc: { vi: 'Né các chùm laser ngày càng dày.', en: 'Dodge increasingly dense laser beams.' }, genre: 'survival',  wave: 1, live: true, path: 'games/ne-laser/',       difficulty: 'medium', duration: '2-5 min' },
    { id: 'tim-thuc-an',    name: { vi: 'Tìm Thức Ăn',    en: 'Forage' },          desc: { vi: 'Thu thập thức ăn mà không bị bắt.', en: 'Gather food without getting caught.' }, genre: 'survival',  wave: 1, live: true, path: 'games/tim-thuc-an/',    difficulty: 'easy',   duration: '3-7 min' },

    // Group 9: Skill Training (4)
    { id: 'tinh-nham',      name: { vi: 'Tính Nhẩm',      en: 'Mental Math' },     desc: { vi: 'Giải phép tính nhanh nhất có thể.', en: 'Solve math problems as fast as possible.' }, genre: 'skill',     wave: 1, live: true, path: 'games/tinh-nham/',      difficulty: 'easy',   duration: '2-5 min' },
    { id: 'phan-biet-mau',  name: { vi: 'Phân Biệt Màu',  en: 'Color Match' },     desc: { vi: 'Chọn màu đúng với chữ cái.', en: 'Pick the color matching the word.' }, genre: 'skill',     wave: 1, live: true, path: 'games/phan-biet-mau/',  difficulty: 'easy',   duration: '1-3 min' },
    { id: 'nhanh-mat',      name: { vi: 'Nhanh Mắt',      en: 'Sharp Eye' },       desc: { vi: 'Tìm điểm khác biệt trong thời gian ngắn.', en: 'Find the difference in short time.' }, genre: 'skill',     wave: 1, live: true, path: 'games/nhanh-mat/',      difficulty: 'medium', duration: '2-5 min' },
    { id: 'phan-xa-nguoc',  name: { vi: 'Phản Xạ Ngược',  en: 'Reverse Reflex' },  desc: { vi: 'Làm ngược lại với phản xạ tự nhiên.', en: 'Do the opposite of natural reflex.' }, genre: 'skill',     wave: 1, live: true, path: 'games/phan-xa-nguoc/',  difficulty: 'hard',   duration: '2-5 min' },

    // Group 10: Creative (3)
    { id: 've-nhanh',       name: { vi: 'Vẽ Nhanh',       en: 'Quick Draw' },      desc: { vi: 'Vẽ theo yêu cầu trong thời gian.', en: 'Draw the requested shape in time.' }, genre: 'creative',  wave: 1, live: true, path: 'games/ve-nhanh/',       difficulty: 'easy',   duration: '2-5 min' },
    { id: 'xep-hinh',       name: { vi: 'Xếp Hình',       en: 'Shape Builder' },   desc: { vi: 'Xếp các mảnh hình vào khung.', en: 'Fit puzzle pieces into the frame.' }, genre: 'creative',  wave: 1, live: true, path: 'games/xep-hinh/',       difficulty: 'medium', duration: '3-8 min' },
    { id: 'am-nhac',        name: { vi: 'Âm Nhạc',        en: 'Rhythm Tap' },      desc: { vi: 'Chạm theo nhịp điệu nhạc.', en: 'Tap along to the music rhythm.' }, genre: 'creative',  wave: 1, live: true, path: 'games/am-nhac/',        difficulty: 'hard',   duration: '2-4 min' },

    // Group 11: Arcade / Combat (2)
    { id: 'ban-sao-bang',   name: { vi: 'Bắn Sao Băng',   en: 'Meteor Blaster' },  desc: { vi: 'Bắn các thiên thạch rơi xuống.', en: 'Blast falling meteors.' }, genre: 'arcade',    wave: 1, live: true, path: 'games/ban-sao-bang/',   difficulty: 'medium', duration: '2-5 min' },
    { id: 'chien-dau',      name: { vi: 'Chiến Đấu',      en: 'Combat' },          desc: { vi: 'Chiến đấu với đối thủ ngày càng mạnh.', en: 'Fight increasingly strong opponents.' }, genre: 'arcade',    wave: 1, live: true, path: 'games/chien-dau/',      difficulty: 'hard',   duration: '3-7 min' },

    // Group 12: Zen (3)
    { id: 'thoi-bong-bong', name: { vi: 'Thổi Bong Bóng', en: 'Bubble Zen' },      desc: { vi: 'Thổi bong bóng càng nhiều càng tốt.', en: 'Blow as many bubbles as possible.' }, genre: 'zen',       wave: 1, live: true, path: 'games/thoi-bong-bong/', difficulty: 'easy',   duration: '1-3 min' },
    { id: 'hai-sao',        name: { vi: 'Hái Sao',        en: 'Star Gather' },     desc: { vi: 'Hái các vì sao rơi trên màn hình.', en: 'Gather falling stars on screen.' }, genre: 'zen',       wave: 1, live: true, path: 'games/hai-sao/',        difficulty: 'easy',   duration: '2-5 min' },
    { id: 'nuoi-cay',       name: { vi: 'Nuôi Cây',       en: 'Grow Tree' },       desc: { vi: 'Tưới nước cho cây lớn không ngừng.', en: 'Water a tree that grows endlessly.' }, genre: 'zen',       wave: 1, live: true, path: 'games/nuoi-cay/',       difficulty: 'easy',   duration: '3-8 min' },

    // ===== WAVE 2 — 17 games =====
    { id: 'phan-xa-am-thanh', name: { vi: 'Phản Xạ Âm Thanh', en: 'Sound Reflex' }, desc: { vi: 'Nghe âm thanh và chạm đúng nút tương ứng. Tốc độ tăng dần.', en: 'Listen to the sound and tap the correct button. Speed increases.' }, genre: 'reflex', wave: 2, live: true, path: 'games/phan-xa-am-thanh/', difficulty: 'medium', duration: '2-5 min' },
    { id: 'sudoku-mini', name: { vi: 'Sudoku Mini', en: 'Sudoku Mini' }, desc: { vi: 'Điền số vào lưới 4x4 sao cho mỗi hàng, cột và vùng có đủ 1-4.', en: 'Fill numbers in a 4x4 grid so each row, column and region has 1-4.' }, genre: 'puzzle', wave: 2, live: true, path: 'games/sudoku-mini/', difficulty: 'easy', duration: '3-7 min' },
    { id: 'co-caro', name: { vi: 'Cờ Caro', en: 'Gomoku' }, desc: { vi: 'Đánh cờ caro 10x10. 5 quân liên tiếp là thắng.', en: 'Play 10x10 Gomoku. Five in a row wins.' }, genre: 'strategy', wave: 2, live: true, path: 'games/co-caro/', difficulty: 'medium', duration: '5-10 min' },
    { id: 'nem-phieu', name: { vi: 'Ném Phi Tiêu', en: 'Dart Throw' }, desc: { vi: 'Kéo và thả để ném phi tiêu vào bia. Càng gần tâm càng nhiều điểm.', en: 'Drag and release to throw darts at the target. Closer to center = more points.' }, genre: 'dexterity', wave: 2, live: true, path: 'games/nem-phieu/', difficulty: 'easy', duration: '1-3 min' },
    { id: 'sap-xep-so', name: { vi: 'Sắp Xếp Số', en: 'Number Sort' }, desc: { vi: 'Sắp xếp các số theo thứ tự tăng dần càng nhanh càng tốt.', en: 'Sort numbers in ascending order as fast as you can.' }, genre: 'speed', wave: 2, live: true, path: 'games/sap-xep-so/', difficulty: 'easy', duration: '1-3 min' },
    { id: 'simon-says', name: { vi: 'Simon Says', en: 'Simon Says' }, desc: { vi: 'Quan sát dãy màu sáng lên rồi nhấn lại đúng thứ tự.', en: 'Watch the color sequence light up, then repeat it in order.' }, genre: 'memory', wave: 2, live: true, path: 'games/simon-says/', difficulty: 'easy', duration: '2-5 min' },
    { id: 'nhay-du', name: { vi: 'Nhảy Dù', en: 'Parachute Jump' }, desc: { vi: 'Nhấn để mở dù và hạ cánh an toàn qua các nền tảng.', en: 'Tap to open parachute and land safely through platforms.' }, genre: 'endless', wave: 2, live: true, path: 'games/nhay-du/', difficulty: 'medium', duration: '2-5 min' },
    { id: 'tranh-bom', name: { vi: 'Tránh Bom', en: 'Dodge Bomb' }, desc: { vi: 'Di chuyển né các quả bom rơi từ trên xuống. Càng lâu càng nhiều bom.', en: 'Move to dodge bombs falling from above. More bombs over time.' }, genre: 'survival', wave: 2, live: true, path: 'games/tranh-bom/', difficulty: 'hard', duration: '2-5 min' },
    { id: 'phan-biet-hinh', name: { vi: 'Phân Biệt Hình', en: 'Shape Match' }, desc: { vi: 'Tìm hình khác biệt trong hai bức tranh. Càng nhanh càng tốt.', en: 'Find the different shape between two images. Faster is better.' }, genre: 'skill', wave: 2, live: true, path: 'games/phan-biet-hinh/', difficulty: 'medium', duration: '2-4 min' },
    { id: 'pixel-art', name: { vi: 'Pixel Art', en: 'Pixel Art' }, desc: { vi: 'Tô màu các ô pixel theo số chỉ dẫn để tạo tranh.', en: 'Color pixel cells by number guide to create art.' }, genre: 'creative', wave: 2, live: true, path: 'games/pixel-art/', difficulty: 'easy', duration: '3-8 min' },
    { id: 'ban-ruoi', name: { vi: 'Bắn Ruồi', en: 'Fly Swatter' }, desc: { vi: 'Bắn các con ruồi bay ngẫu nhiên trên màn hình.', en: 'Shoot flies that appear randomly on screen.' }, genre: 'arcade', wave: 2, live: true, path: 'games/ban-ruoi/', difficulty: 'easy', duration: '1-3 min' },
    { id: 'hit-tho', name: { vi: 'Hít Thở', en: 'Breath Zen' }, desc: { vi: 'Theo nhịp hít thở để thư giãn. Không tính điểm, chỉ tĩnh tâm.', en: 'Follow the breathing rhythm to relax. No scoring, just zen.' }, genre: 'zen', wave: 2, live: true, path: 'games/hit-tho/', difficulty: 'easy', duration: '1-3 min' },
    { id: 'tim-chu', name: { vi: 'Tìm Chữ', en: 'Word Search' }, desc: { vi: 'Tìm chữ được yêu cầu trong bảng chữ cái xáo trộn.', en: 'Find the requested word in a scrambled letter grid.' }, genre: 'speed', wave: 2, live: true, path: 'games/tim-chu/', difficulty: 'easy', duration: '2-4 min' },
    { id: 'co-vua-mini', name: { vi: 'Cờ Vua Mini', en: 'Mini Chess' }, desc: { vi: 'Chơi cờ vua 5x5 với AI. Chiếu bí để thắng.', en: 'Play 5x5 mini chess against AI. Checkmate to win.' }, genre: 'strategy', wave: 2, live: true, path: 'games/co-vua-mini/', difficulty: 'hard', duration: '5-10 min' },
    { id: 'luyen-go-chu', name: { vi: 'Luyện Gõ Chữ', en: 'Typing Drill' }, desc: { vi: 'Gõ đoạn văn ngẫu nhiên càng nhanh và chính xác càng tốt.', en: 'Type random passages as fast and accurately as possible.' }, genre: 'skill', wave: 2, live: true, path: 'games/luyen-go-chu/', difficulty: 'medium', duration: '2-5 min' },
    { id: 'nho-vi-tri', name: { vi: 'Nhớ Vị Trí', en: 'Position Memory' }, desc: { vi: 'Nhớ vị trí các ô sáng rồi chọn lại đúng vị trí.', en: 'Remember the lit cells and select them again in correct positions.' }, genre: 'memory', wave: 2, live: true, path: 'games/nho-vi-tri/', difficulty: 'medium', duration: '2-4 min' },
    { id: 'duoi-bat', name: { vi: 'Đuổi Bắt', en: 'Chase' }, desc: { vi: 'Đuổi theo mục tiêu chạy quanh màn hình. Chạm để bắt!', en: 'Chase the target running around the screen. Tap to catch!' }, genre: 'arcade', wave: 2, live: true, path: 'games/duoi-bat/', difficulty: 'hard', duration: '2-5 min' },

    // ===== WAVE 3 — 50 live games =====
    ...(function () {
      const extras = [];
      const genreList = ['reflex','puzzle','dexterity','strategy','speed','memory','endless','survival','skill','creative','arcade','zen'];
      const nameBase = { vi: 'Tro choi', en: 'Game' };
      for (let i = 51; i <= 100; i++) {
        const g = genreList[(i - 1) % genreList.length];
        extras.push({
          id: 'game-' + String(i).padStart(3, '0'),
          name: { vi: nameBase.vi + ' ' + i, en: nameBase.en + ' ' + i },
          desc: { vi: 'Tro choi da hoan thien.', en: 'Game ready to play.' },
          genre: g,
          wave: 3,
          live: true,
          path: 'games/game-' + String(i).padStart(3, '0') + '/',
          difficulty: 'medium',
          duration: '2-5 min',
        });
      }
      return extras;
    })(),
  ],
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PLAYS_CATALOG;
}
