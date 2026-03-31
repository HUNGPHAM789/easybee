import type { Class } from '../types';

const moneyTips: Class = {
  id: 'money-tips',
  title: 'Money & Tips',
  titleVi: 'Tiền Bạc & Tiền Boa',
  lessons: [
    {
  id: "L43",
  title: "Stating the Total",
  titleVi: "Thông Báo Tổng Tiền",
  level: "A1",
  context: "Dùng những câu này khi bạn thông báo tổng số tiền và nhận thanh toán từ khách.",
  phrases: [
    {
      english: "Your total is thirty-five dollars.",
      vietnamese: "Tổng cộng là ba mươi lăm đô la.",
      pronunciation: "yor to-təl iz ther-tee faiv da-lerz"
    },
    {
      english: "Will you be paying by cash or card?",
      vietnamese: "Bạn muốn trả tiền mặt hay thẻ?",
      pronunciation: "wil yu bi pei-ing bai kash or kard"
    },
    {
      english: "Here is your change.",
      vietnamese: "Đây là tiền thừa của bạn.",
      pronunciation: "heer iz yor cheinj"
    }
  ],
  drill: [
    {
      id: "L43C01",
      type: "read",
      prompt: "Your total is thirty-five dollars.",
      hint: "Tổng cộng là ba mươi lăm đô la.",
      answer: "Your total is thirty-five dollars."
    },
    {
      id: "L43C02",
      type: "recall",
      prompt: "Tổng cộng là ba mươi lăm đô la.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Your total is thirty-five dollars."
    },
    {
      id: "L43C03",
      type: "read",
      prompt: "Will you be paying by cash or card?",
      hint: "Bạn muốn trả tiền mặt hay thẻ?",
      answer: "Will you be paying by cash or card?"
    },
    {
      id: "L43C04",
      type: "recall",
      prompt: "Bạn muốn trả tiền mặt hay thẻ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Will you be paying by cash or card?"
    },
    {
      id: "L43C05",
      type: "read",
      prompt: "Here is your change.",
      hint: "Đây là tiền thừa của bạn.",
      answer: "Here is your change."
    },
    {
      id: "L43C06",
      type: "recall",
      prompt: "Đây là tiền thừa của bạn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Here is your change."
    },
    {
      id: "L43C07",
      type: "fill",
      prompt: "Your total is thirty-five ___.",
      hint: "Tổng cộng là ba mươi lăm đô la.",
      answer: "dollars",
      answerHint: "Your total is thirty-five dollars."
    },
    {
      id: "L43C08",
      type: "fill",
      prompt: "Will you be paying by cash or ___?",
      hint: "Bạn muốn trả tiền mặt hay thẻ?",
      answer: "card",
      answerHint: "Will you be paying by cash or card?"
    },
    {
      id: "L43C09",
      type: "fill",
      prompt: "Here is your ___.",
      hint: "Đây là tiền thừa của bạn.",
      answer: "change",
      answerHint: "Here is your change."
    },
    {
      id: "L43C10",
      type: "dialogue",
      prompt: "Worker: Your total is thirty-five dollars.\nCustomer: Thank you!\nWorker: Will you be paying by cash or card?\nWorker: Here is your change.",
      hint: "Thợ nail: Tổng cộng là ba mươi lăm đô la.\nKhách: Cảm ơn!\nThợ nail: Bạn muốn trả tiền mặt hay thẻ?\nThợ nail: Đây là tiền thừa của bạn.",
      answer: "Worker: Your total is thirty-five dollars.\nCustomer: Thank you!\nWorker: Will you be paying by cash or card?\nWorker: Here is your change."
    }
  ]
},
    {
  id: "L44",
  title: "Payment Methods",
  titleVi: "Phương Thức Thanh Toán",
  level: "A1",
  context: "Dùng những câu này để giải thích các phương thức thanh toán cho khách hàng.",
  phrases: [
    {
      english: "We accept Visa, Mastercard, and cash.",
      vietnamese: "Chúng tôi nhận Visa, Mastercard, và tiền mặt.",
      pronunciation: "wi ak-sept vi-za mas-ter-kard ænd kash"
    },
    {
      english: "Sorry, we don't take American Express.",
      vietnamese: "Xin lỗi, chúng tôi không nhận American Express.",
      pronunciation: "sor-ee wi dont teik uh-mer-i-kən ek-spres"
    },
    {
      english: "You can tap your card here.",
      vietnamese: "Bạn có thể chạm thẻ vào đây.",
      pronunciation: "yu kan tap yor kard heer"
    }
  ],
  drill: [
    {
      id: "L44C01",
      type: "read",
      prompt: "We accept Visa, Mastercard, and cash.",
      hint: "Chúng tôi nhận Visa, Mastercard, và tiền mặt.",
      answer: "We accept Visa, Mastercard, and cash."
    },
    {
      id: "L44C02",
      type: "recall",
      prompt: "Chúng tôi nhận Visa, Mastercard, và tiền mặt.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "We accept Visa, Mastercard, and cash."
    },
    {
      id: "L44C03",
      type: "read",
      prompt: "Sorry, we don't take American Express.",
      hint: "Xin lỗi, chúng tôi không nhận American Express.",
      answer: "Sorry, we don't take American Express."
    },
    {
      id: "L44C04",
      type: "recall",
      prompt: "Xin lỗi, chúng tôi không nhận American Express.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Sorry, we don't take American Express."
    },
    {
      id: "L44C05",
      type: "read",
      prompt: "You can tap your card here.",
      hint: "Bạn có thể chạm thẻ vào đây.",
      answer: "You can tap your card here."
    },
    {
      id: "L44C06",
      type: "recall",
      prompt: "Bạn có thể chạm thẻ vào đây.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "You can tap your card here."
    },
    {
      id: "L44C07",
      type: "fill",
      prompt: "We accept Visa, Mastercard, and ___.",
      hint: "Chúng tôi nhận Visa, Mastercard, và tiền mặt.",
      answer: "cash",
      answerHint: "We accept Visa, Mastercard, and cash."
    },
    {
      id: "L44C08",
      type: "fill",
      prompt: "Sorry, we don't take American ___.",
      hint: "Xin lỗi, chúng tôi không nhận American Express.",
      answer: "Express",
      answerHint: "Sorry, we don't take American Express."
    },
    {
      id: "L44C09",
      type: "fill",
      prompt: "You can tap your card ___.",
      hint: "Bạn có thể chạm thẻ vào đây.",
      answer: "here",
      answerHint: "You can tap your card here."
    },
    {
      id: "L44C10",
      type: "dialogue",
      prompt: "Worker: We accept Visa, Mastercard, and cash.\nCustomer: Thank you!\nWorker: Sorry, we don't take American Express.\nWorker: You can tap your card here.",
      hint: "Thợ nail: Chúng tôi nhận Visa, Mastercard, và tiền mặt.\nKhách: Cảm ơn!\nThợ nail: Xin lỗi, chúng tôi không nhận American Express.\nThợ nail: Bạn có thể chạm thẻ vào đây.",
      answer: "Worker: We accept Visa, Mastercard, and cash.\nCustomer: Thank you!\nWorker: Sorry, we don't take American Express.\nWorker: You can tap your card here."
    }
  ]
},
    {
  id: "L45",
  title: "Talking About Tips",
  titleVi: "Nói Về Tiền Boa",
  level: "A2",
  context: "Dùng những câu này khi nói về tiền boa một cách lịch sự và tự nhiên với khách.",
  phrases: [
    {
      english: "Tips are not included.",
      vietnamese: "Tiền boa không được tính vào.",
      pronunciation: "tips ar not in-klu-ded"
    },
    {
      english: "Would you like to add a tip?",
      vietnamese: "Bạn có muốn thêm tiền boa không?",
      pronunciation: "wud yu laik tu æd uh tip"
    },
    {
      english: "Thank you so much, I really appreciate it!",
      vietnamese: "Cảm ơn bạn rất nhiều, tôi rất trân trọng!",
      pronunciation: "thænk yu so mutʃ ai ri-li uh-pri-shi-eit it"
    }
  ],
  drill: [
    {
      id: "L45C01",
      type: "read",
      prompt: "Tips are not included.",
      hint: "Tiền boa không được tính vào.",
      answer: "Tips are not included."
    },
    {
      id: "L45C02",
      type: "recall",
      prompt: "Tiền boa không được tính vào.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Tips are not included."
    },
    {
      id: "L45C03",
      type: "read",
      prompt: "Would you like to add a tip?",
      hint: "Bạn có muốn thêm tiền boa không?",
      answer: "Would you like to add a tip?"
    },
    {
      id: "L45C04",
      type: "recall",
      prompt: "Bạn có muốn thêm tiền boa không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Would you like to add a tip?"
    },
    {
      id: "L45C05",
      type: "read",
      prompt: "Thank you so much, I really appreciate it!",
      hint: "Cảm ơn bạn rất nhiều, tôi rất trân trọng!",
      answer: "Thank you so much, I really appreciate it!"
    },
    {
      id: "L45C06",
      type: "recall",
      prompt: "Cảm ơn bạn rất nhiều, tôi rất trân trọng!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Thank you so much, I really appreciate it!"
    },
    {
      id: "L45C07",
      type: "fill",
      prompt: "Tips are not ___.",
      hint: "Tiền boa không được tính vào.",
      answer: "included",
      answerHint: "Tips are not included."
    },
    {
      id: "L45C08",
      type: "fill",
      prompt: "Would you like to add a ___?",
      hint: "Bạn có muốn thêm tiền boa không?",
      answer: "tip",
      answerHint: "Would you like to add a tip?"
    },
    {
      id: "L45C09",
      type: "fill",
      prompt: "Thank you so much, I really appreciate ___!",
      hint: "Cảm ơn bạn rất nhiều, tôi rất trân trọng!",
      answer: "it",
      answerHint: "Thank you so much, I really appreciate it!"
    },
    {
      id: "L45C10",
      type: "dialogue",
      prompt: "Worker: Tips are not included.\nCustomer: Thank you!\nWorker: Would you like to add a tip?\nWorker: Thank you so much, I really appreciate it!",
      hint: "Thợ nail: Tiền boa không được tính vào.\nKhách: Cảm ơn!\nThợ nail: Bạn có muốn thêm tiền boa không?\nThợ nail: Cảm ơn bạn rất nhiều, tôi rất trân trọng!",
      answer: "Worker: Tips are not included.\nCustomer: Thank you!\nWorker: Would you like to add a tip?\nWorker: Thank you so much, I really appreciate it!"
    }
  ]
},
  {
  id: "L57",
  title: "Nail Service Prices",
  titleVi: "Giá Dịch Vụ Làm Móng",
  level: "A2",
  context: "Sử dụng các cụm từ này khi bạn giải thích giá cho khách hàng tại tiệm nail.",
  phrases: [
    {
      english: "Manicure is twenty dollars.",
      vietnamese: "Sửa móng tay là hai mươi đô.",
      pronunciation: "man-i-kyoor iz twen-tee dol-urz"
    },
    {
      english: "Gel costs thirty-five dollars.",
      vietnamese: "Sơn gel giá ba mươi lăm đô.",
      pronunciation: "jel kosts thur-tee faiv dol-urz"
    },
    {
      english: "Acrylic is forty dollars.",
      vietnamese: "Đắp bột là bốn mươi đô.",
      pronunciation: "uh-kril-ik iz for-tee dol-urz"
    }
  ],
  drill: [
    {
      id: "L57C01",
      type: "read",
      prompt: "Manicure is twenty dollars.",
      hint: "Sửa móng tay là hai mươi đô.",
      answer: "Manicure is twenty dollars."
    },
    {
      id: "L57C02",
      type: "recall",
      prompt: "Sửa móng tay là hai mươi đô.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Manicure is twenty dollars."
    },
    {
      id: "L57C03",
      type: "read",
      prompt: "Gel costs thirty-five dollars.",
      hint: "Sơn gel giá ba mươi lăm đô.",
      answer: "Gel costs thirty-five dollars."
    },
    {
      id: "L57C04",
      type: "recall",
      prompt: "Sơn gel giá ba mươi lăm đô.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Gel costs thirty-five dollars."
    },
    {
      id: "L57C05",
      type: "read",
      prompt: "Acrylic is forty dollars.",
      hint: "Đắp bột là bốn mươi đô.",
      answer: "Acrylic is forty dollars."
    },
    {
      id: "L57C06",
      type: "recall",
      prompt: "Đắp bột là bốn mươi đô.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Acrylic is forty dollars."
    },
    {
      id: "L57C07",
      type: "fill",
      prompt: "___ is twenty dollars.",
      hint: "Sửa móng tay là hai mươi đô.",
      answer: "Manicure",
      answerHint: "Manicure is twenty dollars."
    },
    {
      id: "L57C08",
      type: "fill",
      prompt: "Gel ___ thirty-five dollars.",
      hint: "Sơn gel giá ba mươi lăm đô.",
      answer: "costs",
      answerHint: "Gel costs thirty-five dollars."
    },
    {
      id: "L57C09",
      type: "fill",
      prompt: "___ is forty dollars.",
      hint: "Đắp bột là bốn mươi đô.",
      answer: "Acrylic",
      answerHint: "Acrylic is forty dollars."
    },
    {
      id: "L57C10",
      type: "dialogue",
      prompt: "Worker: How much is the manicure?\nCustomer: How much is it?\nWorker: It is twenty dollars.",
      hint: "Thợ: Sửa móng tay bao nhiêu tiền?\nKhách: Bao nhiêu tiền một bộ?\nThợ: Hai mươi đô.",
      answer: "Worker: How much is the manicure?\nCustomer: How much is it?\nWorker: It is twenty dollars."
    }
  ]
},
  {
  id: "L58",
  title: "Payment Problems",
  titleVi: "Các vấn đề thanh toán",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi khách hàng gặp vấn đề về thanh toán tại tiệm nail.",
  phrases: [
    {
      english: "The card is declined.",
      vietnamese: "Thẻ bị từ chối.",
      pronunciation: "thuh kahrd iz dih-klahynd"
    },
    {
      english: "The machine isn't working.",
      vietnamese: "Máy không hoạt động.",
      pronunciation: "thuh muh-sheen iz-uhnt wur-king"
    },
    {
      english: "Do you have cash?",
      vietnamese: "Bạn có tiền mặt không?",
      pronunciation: "doo yoo hav kash"
    }
  ],
  drill: [
    {
      id: "L58C01",
      type: "read",
      prompt: "The card is declined.",
      hint: "Thẻ bị từ chối.",
      answer: "The card is declined."
    },
    {
      id: "L58C02",
      type: "recall",
      prompt: "Thẻ bị từ chối.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "The card is declined."
    },
    {
      id: "L58C03",
      type: "read",
      prompt: "The machine isn't working.",
      hint: "Máy không hoạt động.",
      answer: "The machine isn't working."
    },
    {
      id: "L58C04",
      type: "recall",
      prompt: "Máy không hoạt động.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "The machine isn't working."
    },
    {
      id: "L58C05",
      type: "read",
      prompt: "Do you have cash?",
      hint: "Bạn có tiền mặt không?",
      answer: "Do you have cash?"
    },
    {
      id: "L58C06",
      type: "recall",
      prompt: "Bạn có tiền mặt không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Do you have cash?"
    },
    {
      id: "L58C07",
      type: "fill",
      prompt: "The card is ___.",
      hint: "Thẻ bị từ chối.",
      answer: "declined",
      answerHint: "The card is declined."
    },
    {
      id: "L58C08",
      type: "fill",
      prompt: "The ___ isn't working.",
      hint: "Máy không hoạt động.",
      answer: "machine",
      answerHint: "The machine isn't working."
    },
    {
      id: "L58C09",
      type: "fill",
      prompt: "Do you have ___?",
      hint: "Bạn có tiền mặt không?",
      answer: "cash",
      answerHint: "Do you have cash?"
    },
    {
      id: "L58C10",
      type: "dialogue",
      prompt: "Worker: The card is declined. Do you have another card?\nCustomer: No, I don't. What about cash?\nWorker: Yes, cash is fine.",
      hint: "Thợ: Thẻ bị từ chối. Bạn có thẻ khác không?\nKhách: Không, tôi không có. Tiền mặt thì sao?\nThợ: Được, tiền mặt cũng được.",
      answer: "Worker: The card is declined. Do you have another card?\nCustomer: No, I don't. What about cash?\nWorker: Yes, cash is fine."
    }
  ]
},
  {
  id: "L59",
  title: "Offering Discounts",
  titleVi: "Đề nghị giảm giá",
  level: "B1",
  context: "Sử dụng các cụm từ này khi bạn muốn đề nghị giảm giá hoặc giới thiệu chương trình khách hàng thân thiết cho khách hàng tại tiệm nail.",
  phrases: [
    {
      english: "We offer student discounts.",
      vietnamese: "Chúng tôi có giảm giá cho học sinh.",
      pronunciation: "wee o-fer stoo-dent dis-counts"
    },
    {
      english: "First-time customers get 10% off.",
      vietnamese: "Khách hàng lần đầu được giảm 10%.",
      pronunciation: "furst-time cus-tuh-mers get ten per-cent off"
    },
    {
      english: "Join our loyalty program!",
      vietnamese: "Tham gia chương trình khách hàng thân thiết của chúng tôi!",
      pronunciation: "join our loy-al-tee pro-gram"
    }
  ],
  drill: [
    {
      id: "L59C01",
      type: "read",
      prompt: "We offer student discounts.",
      hint: "Chúng tôi có giảm giá cho học sinh.",
      answer: "We offer student discounts."
    },
    {
      id: "L59C02",
      type: "recall",
      prompt: "Chúng tôi có giảm giá cho học sinh.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "We offer student discounts."
    },
    {
      id: "L59C03",
      type: "read",
      prompt: "First-time customers get 10% off.",
      hint: "Khách hàng lần đầu được giảm 10%.",
      answer: "First-time customers get 10% off."
    },
    {
      id: "L59C04",
      type: "recall",
      prompt: "Khách hàng lần đầu được giảm 10%.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "First-time customers get 10% off."
    },
    {
      id: "L59C05",
      type: "read",
      prompt: "Join our loyalty program!",
      hint: "Tham gia chương trình khách hàng thân thiết của chúng tôi!",
      answer: "Join our loyalty program!"
    },
    {
      id: "L59C06",
      type: "recall",
      prompt: "Tham gia chương trình khách hàng thân thiết của chúng tôi!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Join our loyalty program!"
    },
    {
      id: "L59C07",
      type: "fill",
      prompt: "We offer ___ discounts.",
      hint: "Chúng tôi có giảm giá cho học sinh.",
      answer: "student",
      answerHint: "We offer student discounts."
    },
    {
      id: "L59C08",
      type: "fill",
      prompt: "First-time customers get ___ off.",
      hint: "Khách hàng lần đầu được giảm 10%.",
      answer: "10%",
      answerHint: "First-time customers get 10% off."
    },
    {
      id: "L59C09",
      type: "fill",
      prompt: "Join our ___ program!",
      hint: "Tham gia chương trình khách hàng thân thiết của chúng tôi!",
      answer: "loyalty",
      answerHint: "Join our loyalty program!"
    },
    {
      id: "L59C10",
      type: "dialogue",
      prompt: "Worker: Are you a student?\nCustomer: Yes, I am.\nWorker: Great! We offer student discounts.",
      hint: "Thợ: Bạn có phải là sinh viên không?\nKhách: Vâng, tôi là sinh viên.\nThợ: Tuyệt vời! Chúng tôi có giảm giá cho sinh viên.",
      answer: "Worker: Are you a student?\nCustomer: Yes, I am.\nWorker: Great! We offer student discounts."
    }
  ]
},
  {
  id: "L60",
  title: "Nail Service Costs",
  titleVi: "Giá Dịch Vụ Làm Móng",
  level: "B1",
  context: "Sử dụng các cụm từ này khi giải thích giá dịch vụ làm móng cho khách hàng.",
  phrases: [
    {
      english: "Quality products cost more.",
      vietnamese: "Sản phẩm chất lượng có giá cao hơn.",
      pronunciation: "kwol-i-tee prod-uhkts cost mor"
    },
    {
      english: "It takes time and skill.",
      vietnamese: "Cần thời gian và kỹ năng.",
      pronunciation: "it tayks tyme and skill"
    },
    {
      english: "The price reflects the quality.",
      vietnamese: "Giá cả phản ánh chất lượng.",
      pronunciation: "thuh price ri-fleks thuh kwol-i-tee"
    }
  ],
  drill: [
    {
      id: "L60C01",
      type: "read",
      prompt: "Quality products cost more.",
      hint: "Sản phẩm chất lượng có giá cao hơn.",
      answer: "Quality products cost more."
    },
    {
      id: "L60C02",
      type: "recall",
      prompt: "Sản phẩm chất lượng có giá cao hơn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Quality products cost more."
    },
    {
      id: "L60C03",
      type: "read",
      prompt: "It takes time and skill.",
      hint: "Cần thời gian và kỹ năng.",
      answer: "It takes time and skill."
    },
    {
      id: "L60C04",
      type: "recall",
      prompt: "Cần thời gian và kỹ năng.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It takes time and skill."
    },
    {
      id: "L60C05",
      type: "read",
      prompt: "The price reflects the quality.",
      hint: "Giá cả phản ánh chất lượng.",
      answer: "The price reflects the quality."
    },
    {
      id: "L60C06",
      type: "recall",
      prompt: "Giá cả phản ánh chất lượng.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "The price reflects the quality."
    },
    {
      id: "L60C07",
      type: "fill",
      prompt: "Quality products cost ___.",
      hint: "Sản phẩm chất lượng có giá cao hơn.",
      answer: "more",
      answerHint: "Quality products cost more."
    },
    {
      id: "L60C08",
      type: "fill",
      prompt: "It takes time and ___.",
      hint: "Cần thời gian và kỹ năng.",
      answer: "skill",
      answerHint: "It takes time and skill."
    },
    {
      id: "L60C09",
      type: "fill",
      prompt: "The price reflects the ___.",
      hint: "Giá cả phản ánh chất lượng.",
      answer: "quality",
      answerHint: "The price reflects the quality."
    },
    {
      id: "L60C10",
      type: "dialogue",
      prompt: "Worker: This design is a little more. \nCustomer: Why is it more expensive?\nWorker: It takes more time and skill.",
      hint: "Thợ: Thiết kế này đắt hơn một chút.\nKhách: Tại sao nó đắt hơn?\nThợ: Nó tốn nhiều thời gian và kỹ năng hơn.",
      answer: "Worker: This design is a little more. \nCustomer: Why is it more expensive?\nWorker: It takes more time and skill."
    }
  ]
},
  {
  id: "L61",
  title: "Handling Price Objections",
  titleVi: "Xử lý khi khách mặc cả giá",
  level: "B1",
  context: "Sử dụng những câu này khi khách hàng muốn mặc cả hoặc nói giá quá cao.",
  phrases: [
    {
      english: "I understand your concern.",
      vietnamese: "Tôi hiểu sự lo lắng của bạn.",
      pronunciation: "ai un-der-stand yor con-sern"
    },
    {
      english: "That's the best price I can offer.",
      vietnamese: "Đó là giá tốt nhất tôi có thể đưa ra.",
      pronunciation: "thats the best prais ai can o-fer"
    },
    {
      english: "What price were you considering?",
      vietnamese: "Bạn đang cân nhắc mức giá nào?",
      pronunciation: "wot prais wer yoo con-sid-er-ing"
    }
  ],
  drill: [
    {
      id: "L61C01",
      type: "read",
      prompt: "I understand your concern.",
      hint: "Tôi hiểu sự lo lắng của bạn.",
      answer: "I understand your concern."
    },
    {
      id: "L61C02",
      type: "recall",
      prompt: "Tôi hiểu sự lo lắng của bạn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I understand your concern."
    },
    {
      id: "L61C03",
      type: "read",
      prompt: "That's the best price I can offer.",
      hint: "Đó là giá tốt nhất tôi có thể đưa ra.",
      answer: "That's the best price I can offer."
    },
    {
      id: "L61C04",
      type: "recall",
      prompt: "Đó là giá tốt nhất tôi có thể đưa ra.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "That's the best price I can offer."
    },
    {
      id: "L61C05",
      type: "read",
      prompt: "What price were you considering?",
      hint: "Bạn đang cân nhắc mức giá nào?",
      answer: "What price were you considering?"
    },
    {
      id: "L61C06",
      type: "recall",
      prompt: "Bạn đang cân nhắc mức giá nào?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What price were you considering?"
    },
    {
      id: "L61C07",
      type: "fill",
      prompt: "I understand your ___.",
      hint: "Tôi hiểu sự lo lắng của bạn.",
      answer: "concern",
      answerHint: "I understand your concern."
    },
    {
      id: "L61C08",
      type: "fill",
      prompt: "That's the best price I can ___.",
      hint: "Đó là giá tốt nhất tôi có thể đưa ra.",
      answer: "offer",
      answerHint: "That's the best price I can offer."
    },
    {
      id: "L61C09",
      type: "fill",
      prompt: "What ___ were you considering?",
      hint: "Bạn đang cân nhắc mức giá nào?",
      answer: "price",
      answerHint: "What price were you considering?"
    },
    {
      id: "L61C10",
      type: "dialogue",
      prompt: "Worker: What price were you considering?\nCustomer: I was hoping for $50.\nWorker: I understand your concern. That's the best price I can offer.",
      hint: "Thợ: Bạn đang cân nhắc mức giá nào?\nKhách: Tôi hy vọng là $50.\nThợ: Tôi hiểu sự lo lắng của bạn. Đó là giá tốt nhất tôi có thể đưa ra.",
      answer: "Worker: What price were you considering?\nCustomer: I was hoping for $50.\nWorker: I understand your concern. That's the best price I can offer."
    }
  ]
},
  {
  id: "L62",
  title: "Understanding Tipping in America",
  titleVi: "Hiểu Về Tiền Boa Ở Mỹ",
  level: "A2",
  context: "Khi bạn đi ăn nhà hàng hoặc sử dụng dịch vụ, bạn thường cần phải trả thêm tiền boa. Bài học này giúp bạn hiểu rõ hơn về việc này.",
  phrases: [
    {
      english: "Tip is usually 15-20 percent.",
      vietnamese: "Tiền boa thường là 15 đến 20 phần trăm.",
      pronunciation: "tip iz yoo-zhuh-lee fif-teen too twen-tee per-sent"
    },
    {
      english: "How much is the total?",
      vietnamese: "Tổng cộng là bao nhiêu?",
      pronunciation: "hau much iz thuh toh-tuhl"
    },
    {
      english: "Thank you for your service!",
      vietnamese: "Cảm ơn vì dịch vụ của bạn!",
      pronunciation: "thangk yoo for yoor sur-vis"
    }
  ],
  drill: [
    {
      id: "L62C01",
      type: "read",
      prompt: "Tip is usually 15-20 percent.",
      hint: "Tiền boa thường là 15 đến 20 phần trăm.",
      answer: "Tip is usually 15-20 percent."
    },
    {
      id: "L62C02",
      type: "recall",
      prompt: "Tiền boa thường là 15 đến 20 phần trăm.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Tip is usually 15-20 percent."
    },
    {
      id: "L62C03",
      type: "read",
      prompt: "How much is the total?",
      hint: "Tổng cộng là bao nhiêu?",
      answer: "How much is the total?"
    },
    {
      id: "L62C04",
      type: "recall",
      prompt: "Tổng cộng là bao nhiêu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How much is the total?"
    },
    {
      id: "L62C05",
      type: "read",
      prompt: "Thank you for your service!",
      hint: "Cảm ơn vì dịch vụ của bạn!",
      answer: "Thank you for your service!"
    },
    {
      id: "L62C06",
      type: "recall",
      prompt: "Cảm ơn vì dịch vụ của bạn!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Thank you for your service!"
    },
    {
      id: "L62C07",
      type: "fill",
      prompt: "Tip is usually 15-20 ___.",
      hint: "Tiền boa thường là 15 đến 20 phần trăm.",
      answer: "percent",
      answerHint: "Tip is usually 15-20 percent."
    },
    {
      id: "L62C08",
      type: "fill",
      prompt: "How much is the ___?",
      hint: "Tổng cộng là bao nhiêu?",
      answer: "total",
      answerHint: "How much is the total?"
    },
    {
      id: "L62C09",
      type: "fill",
      prompt: "Thank you for your ___!",
      hint: "Cảm ơn vì dịch vụ của bạn!",
      answer: "service",
      answerHint: "Thank you for your service!"
    },
    {
      id: "L62C10",
      type: "dialogue",
      prompt: "Worker: How was your meal?\nCustomer: It was great, thank you!\nWorker: The total is $25.00.",
      hint: "Thợ: Bữa ăn của quý khách thế nào?\nKhách: Rất tuyệt, cảm ơn!\nThợ: Tổng cộng là 25 đô la.",
      answer: "Worker: How was your meal?\nCustomer: It was great, thank you!\nWorker: The total is $25.00."
    }
  ]
}
  ],
};

export default moneyTips;
