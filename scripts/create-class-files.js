const fs = require('fs');
const path = require('path');

const base = 'C:/easyenglish/lib/content';

const files = [
  ['shopping-errands/grocery-store.ts', 'grocery-store', 'Grocery Store', 'Tiếng Anh Tại Siêu Thị'],
  ['shopping-errands/pharmacy.ts', 'pharmacy', 'Pharmacy', 'Tiếng Anh Tại Hiệu Thuốc'],
  ['shopping-errands/clothing-shopping.ts', 'clothing-shopping', 'Clothing & Shopping', 'Mua Sắm Quần Áo'],
  ['shopping-errands/bank-post-office.ts', 'bank-post-office', 'Bank & Post Office', 'Ngân Hàng Và Bưu Điện'],
  ['healthcare/at-the-doctor.ts', 'at-the-doctor', 'At the Doctor', 'Đi Khám Bác Sĩ'],
  ['healthcare/at-the-dentist.ts', 'at-the-dentist', 'At the Dentist', 'Đi Khám Nha Sĩ'],
  ['healthcare/emergency-phrases.ts', 'emergency-phrases', 'Emergency Phrases', 'Câu Nói Khẩn Cấp'],
  ['community/school-kids.ts', 'school-kids', 'School & Kids', 'Trường Học Và Con Cái'],
  ['community/neighbors-building.ts', 'neighbors-building', 'Neighbors & Building', 'Hàng Xóm Và Tòa Nhà'],
  ['community/restaurants.ts', 'restaurants', 'Restaurants', 'Nhà Hàng'],
];

for (const [file, id, title, titleVi] of files) {
  const filePath = path.join(base, file);
  const content = `import type { Class } from '../types';

const data: Class = {
  id: "${id}",
  title: "${title}",
  titleVi: "${titleVi}",
  lessons: []
};

export default data;
`;
  fs.writeFileSync(filePath, content);
  console.log('Created:', file);
}
