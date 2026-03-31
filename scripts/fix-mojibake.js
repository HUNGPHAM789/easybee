const fs = require('fs');
const filePath = 'lib/content/permanent-makeup/consultation.ts';
let txt = fs.readFileSync(filePath, 'utf8');

// Map of garbled string → correct Vietnamese
const replacements = [
  // Class-level titleVi
  ['Tư Vấn Kh\u{FFFD}ch H\u{FFFD}ng', 'Tư Vấn Khách Hàng'],
  
  // L49
  ['Sử dụng những mẫu câu này \u{FFFD}\u2019\u{FFFD}\u0192 chào khách hàng PMU và hỏi họ mu\u{FFFD}\u2019n làm d\u{FFFD}\u2039ch vụ gì.', 
   'Sử dụng những mẫu câu này để chào khách hàng PMU và hỏi họ muốn làm dịch vụ gì.'],
  ['Mừng bạn \u{FFFD}\u2019ến!', 'Mừng bạn đến!'],
  ['Bạn mu\u{FFFD}\u2019n làm d\u{FFFD}\u2039ch vụ gì?', 'Bạn muốn làm dịch vụ gì?'],
  ['Nh\u{FFFD}\u203A lại câu tiếng Anh...', 'Nhớ lại câu tiếng Anh...'],
  ['Làm \u{FFFD}\u2019iêu khắc chân mày', 'Làm điêu khắc chân mày'],
  
  // L50
  ['Na-chơ-r\u{FFFD}\u201C arch.', 'Na-chơ-rồ arch.'],
  ['Bạn có mu\u{FFFD}\u2019n dáng lông mày ngang không?', 'Bạn có muốn dáng lông mày ngang không?'],
  ['Tôi mu\u{FFFD}\u2019n dáng vòng cung tự nhiên.', 'Tôi muốn dáng vòng cung tự nhiên.'],
  ['Được r\u{FFFD}\u201Ci, và rất mềm mại và tự nhiên phải không?', 'Được rồi, và rất mềm mại và tự nhiên phải không?'],
  
  // L51
  ['khi khách hàng hỏi về phun x\u{FFFD}\u0192m môi.', 'khi khách hàng hỏi về phun xăm môi.'],
  ['Màu h\u{FFFD}\u201Cng nude, làm ơn.', 'Màu hồng nude, làm ơn.'],
  ['Bạn mu\u{FFFD}\u2019n màu môi gì?', 'Bạn muốn màu môi gì?'],
  
  // L52
  ['Hỏi về d\u{FFFD}\u2039 ứng và tiền sử b\u{FFFD}\u2021nh', 'Hỏi về dị ứng và tiền sử bệnh'],
  ['Sử dụng những mẫu câu này \u{FFFD}\u2019\u{FFFD}\u0192 hỏi khách hàng về d\u{FFFD}\u2039 ứng và tiền sử b\u{FFFD}\u2021nh trư\u{FFFD}\u203Ac khi làm phun x\u{FFFD}\u0192m thẩm mỹ.',
   'Sử dụng những mẫu câu này để hỏi khách hàng về dị ứng và tiền sử bệnh trước khi làm phun xăm thẩm mỹ.'],
  ['Bạn có \u{FFFD}\u2019ang mang thai không?', 'Bạn có đang mang thai không?'],
  ['Bạn có b\u{FFFD}\u2039 d\u{FFFD}\u2039 ứng gì không?', 'Bạn có bị dị ứng gì không?'],
  ['Bạn có u\u{FFFD}\u2019ng thu\u{FFFD}\u2019c làm loãng máu không?', 'Bạn có uống thuốc làm loãng máu không?'],
  ['Không, tôi không b\u{FFFD}\u2039.', 'Không, tôi không bị.'],
  
  // L53
  ['Trang \u{FFFD}\u2019i\u{FFFD}\u0192m vĩnh vi\u{FFFD}\u2026n: Đặt kỳ vọng', 'Trang điểm vĩnh viễn: Đặt kỳ vọng'],
  ['Sử dụng những câu này \u{FFFD}\u2019\u{FFFD}\u0192 giải thích cho khách hàng về quá trình h\u{FFFD}\u201Ci phục sau khi làm trang \u{FFFD}\u2019i\u{FFFD}\u0192m vĩnh vi\u{FFFD}\u2026n.',
   'Sử dụng những câu này để giải thích cho khách hàng về quá trình hồi phục sau khi làm trang điểm vĩnh viễn.'],
  ['Màu sẽ nhạt \u{FFFD}\u2019i.', 'Màu sẽ nhạt đi.'],
  ['Ban \u{FFFD}\u2019ầu nó trông \u{FFFD}\u2019ậm.', 'Ban đầu nó trông đậm.'],
  ['trông rất \u{FFFD}\u2019ẹp! Nhưng ban \u{FFFD}\u2019ầu nó trông \u{FFFD}\u2019ậm.', 'trông rất đẹp! Nhưng ban đầu nó trông đậm.'],
  ['\u{FFFD}\u2019, thật sao? Nó sẽ \u{FFFD}\u2019ậm như thế này sao?', 'Ồ, thật sao? Nó sẽ đậm như thế này sao?'],
  ['màu sẽ nhạt \u{FFFD}\u2019i.', 'màu sẽ nhạt đi.'],
];

let count = 0;
for (const [bad, good] of replacements) {
  while (txt.includes(bad)) {
    txt = txt.replace(bad, good);
    count++;
  }
}

// Also catch any remaining isolated garbled patterns
// \u{FFFD}\u2019 = đ (d with stroke)
// \u{FFFD}\u2039 = ị
// \u{FFFD}\u0192 = ể or ă or ẽ
// \u{FFFD}\u203A = ớ  
// \u{FFFD}\u201C = ồ
// \u{FFFD}\u2026 = ễ
// \u{FFFD}\u2021 = ệ

console.log('Replacements made:', count);

// Check for any remaining \u{FFFD}
const remaining = [...txt.matchAll(/\uFFFD/g)];
console.log('Remaining \uFFFD characters:', remaining.length);
if (remaining.length > 0) {
  // Show context around each
  for (const m of remaining) {
    const start = Math.max(0, m.index - 20);
    const end = Math.min(txt.length, m.index + 20);
    console.log('  ...', JSON.stringify(txt.substring(start, end)), '...');
  }
}

fs.writeFileSync(filePath, txt, 'utf8');
console.log('File saved!');

// Verify all titleVi
const allTitleVi = [...txt.matchAll(/(?:"titleVi"|titleVi):\s*"([^"]+)"/g)];
console.log('\nAll titleVi values:');
allTitleVi.forEach(m => console.log('  ', m[1]));
