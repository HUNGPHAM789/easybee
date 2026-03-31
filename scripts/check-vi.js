const fs = require('fs');
const txt = fs.readFileSync('app/page.tsx', 'utf8');

// Check key Vietnamese strings
const checks = [
  'Lớp học của',
  'Đăng xuất', 
  'Tìm bài học',
  'Bài Học',
  'Thầy giáo EasyBee',
  'Bài học gợi ý cho bạn',
  'Không tìm thấy bài học nào',
  'câu',
  'bài tập',
];

for (const s of checks) {
  const found = txt.includes(s);
  console.log(found ? '✅' : '❌', s);
}

// Check for remaining \uXXXX (should be none with code >= 0x80)
const remaining = txt.match(/\\u[0-9A-Fa-f]{4}/g);
if (remaining) {
  console.log('\nRemaining escapes:', remaining.length);
  remaining.slice(0, 5).forEach(r => console.log('  ', r));
} else {
  console.log('\n✅ No Unicode escapes remaining');
}
