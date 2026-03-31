import type { Class } from '../types';

const services: Class = {
  id: 'services',
  title: 'Services',
  titleVi: 'Dịch Vụ',
  lessons: [{id: "L10",
  title: "Taking Manicure & Pedicure Orders",
  titleVi: "Ghi Lại Yêu Cầu Làm Móng Tay & Chân",
  level: "A1",
  context: "Học cách hỏi và ghi lại yêu cầu của khách hàng khi họ muốn làm móng tay và móng chân.",
  phrases: [
    {
      english: "What kind of service?",
      vietnamese: "Bạn muốn dịch vụ gì ạ?",
      pronunciation: "wot kaind uv servis"
    },
    {
      english: "Which color would you like?",
      vietnamese: "Bạn muốn màu gì ạ?",
      pronunciation: "wich kuh-ler wud yu laik"
    },
    {
      english: "Do you want gel or regular?",
      vietnamese: "Bạn muốn sơn gel hay thường ạ?",
      pronunciation: "du yu wont jel or reg-yu-ler"
    }
  ],
  drill: [
    {
      id: "L10C01",
      type: "read",
      prompt: "What kind of service?",
      hint: "Bạn muốn dịch vụ gì ạ?",
      answer: "What kind of service?"
    },
    {
      id: "L10C02",
      type: "recall",
      prompt: "Bạn muốn dịch vụ gì ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What kind of service?"
    },
    {
      id: "L10C03",
      type: "read",
      prompt: "Which color would you like?",
      hint: "Bạn muốn màu gì ạ?",
      answer: "Which color would you like?"
    },
    {
      id: "L10C04",
      type: "recall",
      prompt: "Bạn muốn màu gì ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Which color would you like?"
    },
    {
      id: "L10C05",
      type: "read",
      prompt: "Do you want gel or regular?",
      hint: "Bạn muốn sơn gel hay thường ạ?",
      answer: "Do you want gel or regular?"
    },
    {
      id: "L10C06",
      type: "recall",
      prompt: "Bạn muốn sơn gel hay thường ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Do you want gel or regular?"
    },
    {
      id: "L10C07",
      type: "fill",
      prompt: "What ___ of service?",
      hint: "Bạn muốn dịch vụ gì ạ?",
      answer: "kind",
      answerHint: "What kind of service?"
    },
    {
      id: "L10C08",
      type: "fill",
      prompt: "Which color would you ___?",
      hint: "Bạn muốn màu gì ạ?",
      answer: "like",
      answerHint: "Which color would you like?"
    },
    {
      id: "L10C09",
      type: "fill",
      prompt: "Do you want ___ or regular?",
      hint: "Bạn muốn sơn gel hay thường ạ?",
      answer: "gel",
      answerHint: "Do you want gel or regular?"
    },
    {
      id: "L10C10",
      type: "dialogue",
      prompt: "Customer: Hi, I need my nails done.\nWorker: What kind of service?\nCustomer: A manicure.\nWorker: Which color would you like?\nCustomer: Pink.\nWorker: Do you want gel or regular?\nCustomer: Gel, please.",
      hint: "Khách: Chào, tôi muốn làm móng.\nThợ: Bạn muốn dịch vụ gì ạ?\nKhách: Làm móng tay.\nThợ: Bạn muốn màu gì ạ?\nKhách: Màu hồng.\nThợ: Bạn muốn sơn gel hay thường ạ?\nKhách: Gel nhé.",
      answer: "Customer: Hi, I need my nails done.\nWorker: What kind of service?\nCustomer: A manicure.\nWorker: Which color would you like?\nCustomer: Pink.\nWorker: Do you want gel or regular?\nCustomer: Gel, please."
    }
  ]
},
 {id: "L11",
  title: "Explaining Nail Service Prices",
  titleVi: "Giải thích giá dịch vụ làm móng",
  level: "A2",
  context: "Sử dụng những mẫu câu này để giải thích giá cả dịch vụ cho khách hàng.",
  phrases: [
    {
      english: "It's $25 for a basic manicure.",
      vietnamese: "Giá cho một bộ móng tay cơ bản là 25 đô la.",
      pronunciation: "its twen-tee fai-v dol-lar for a bay-sik man-i-kyur"
    },
    {
      english: "The gel polish is an extra $10.",
      vietnamese: "Sơn gel thêm 10 đô la.",
      pronunciation: "thuh jel pol-ish iz an ek-struh ten dol-lar"
    },
    {
      english: "That will be $40 in total.",
      vietnamese: "Tổng cộng là 40 đô la.",
      pronunciation: "that wil bee for-tee dol-lar in toh-tul"
    }
  ],
  drill: [
    {
      id: "L11C01",
      type: "read",
      prompt: "It's $25 for a basic manicure.",
      hint: "Giá cho một bộ móng tay cơ bản là 25 đô la.",
      answer: "It's $25 for a basic manicure."
    },
    {
      id: "L11C02",
      type: "recall",
      prompt: "Giá cho một bộ móng tay cơ bản là 25 đô la.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It's $25 for a basic manicure."
    },
    {
      id: "L11C03",
      type: "read",
      prompt: "The gel polish is an extra $10.",
      hint: "Sơn gel thêm 10 đô la.",
      answer: "The gel polish is an extra $10."
    },
    {
      id: "L11C04",
      type: "recall",
      prompt: "Sơn gel thêm 10 đô la.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "The gel polish is an extra $10."
    },
    {
      id: "L11C05",
      type: "read",
      prompt: "That will be $40 in total.",
      hint: "Tổng cộng là 40 đô la.",
      answer: "That will be $40 in total."
    },
    {
      id: "L11C06",
      type: "recall",
      prompt: "Tổng cộng là 40 đô la.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "That will be $40 in total."
    },
    {
      id: "L11C07",
      type: "fill",
      prompt: "It's $___ for a basic manicure.",
      hint: "Giá cho một bộ móng tay cơ bản là 25 đô la.",
      answer: "25",
      answerHint: "It's $25 for a basic manicure."
    },
    {
      id: "L11C08",
      type: "fill",
      prompt: "The gel polish is an ___ $10.",
      hint: "Sơn gel thêm 10 đô la.",
      answer: "extra",
      answerHint: "The gel polish is an extra $10."
    },
    {
      id: "L11C09",
      type: "fill",
      prompt: "That will be $___ in total.",
      hint: "Tổng cộng là 40 đô la.",
      answer: "40",
      answerHint: "That will be $40 in total."
    },
    {
      id: "L11C10",
      type: "dialogue",
      prompt: "Customer: How much is a manicure?\nWorker: It's $25 for a basic manicure. The gel polish is an extra $10.\nCustomer: Okay, that will be $40 in total?",
      hint: "Khách: Làm móng tay bao nhiêu tiền?\nThợ: Bộ móng tay cơ bản là 25 đô. Sơn gel thêm 10 đô.\nKhách: Vậy tổng cộng là 40 đô la?",
      answer: "Customer: How much is a manicure?\nWorker: It's $25 for a basic manicure. The gel polish is an extra $10.\nCustomer: Okay, that will be $40 in total?"
    }
  ]
},
 {id: "L12",
  title: "Upselling Nail Services",
  titleVi: "Gợi Ý Thêm Dịch Vụ",
  level: "A2",
  context: "Sử dụng những mẫu câu này để gợi ý thêm các dịch vụ cho khách hàng của bạn.",
  phrases: [
    {
      english: "Would you like a gel top coat?",
      vietnamese: "Chị/Anh có muốn sơn gel lớp phủ không ạ?",
      pronunciation: "wud yu laik uh jel top kot?"
    },
    {
      english: "How about a paraffin wax treatment?",
      vietnamese: "Chị/Anh có muốn thử liệu pháp paraffin không ạ?",
      pronunciation: "hau uh baut uh pa-ruh-fin waks trit-ment?"
    },
    {
      english: "We have a special on nail art today.",
      vietnamese: "Hôm nay chúng tôi có ưu đãi đặc biệt cho vẽ móng.",
      pronunciation: "wee hav uh spe-shul on neil art tuh-day."
    }
  ],
  drill: [
    {
      id: "L12C01",
      type: "read",
      prompt: "Would you like a gel top coat?",
      hint: "Chị/Anh có muốn sơn gel lớp phủ không ạ?",
      answer: "Would you like a gel top coat?"
    },
    {
      id: "L12C02",
      type: "recall",
      prompt: "Chị/Anh có muốn sơn gel lớp phủ không ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Would you like a gel top coat?"
    },
    {
      id: "L12C03",
      type: "read",
      prompt: "How about a paraffin wax treatment?",
      hint: "Chị/Anh có muốn thử liệu pháp paraffin không ạ?",
      answer: "How about a paraffin wax treatment?"
    },
    {
      id: "L12C04",
      type: "recall",
      prompt: "Chị/Anh có muốn thử liệu pháp paraffin không ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How about a paraffin wax treatment?"
    },
    {
      id: "L12C05",
      type: "read",
      prompt: "We have a special on nail art today.",
      hint: "Hôm nay chúng tôi có ưu đãi đặc biệt cho vẽ móng.",
      answer: "We have a special on nail art today."
    },
    {
      id: "L12C06",
      type: "recall",
      prompt: "Hôm nay chúng tôi có ưu đãi đặc biệt cho vẽ móng.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "We have a special on nail art today."
    },
    {
      id: "L12C07",
      type: "fill",
      prompt: "Would you ___ a gel top coat?",
      hint: "Chị/Anh có muốn sơn gel lớp phủ không ạ?",
      answer: "like",
      answerHint: "Would you like a gel top coat?"
    },
    {
      id: "L12C08",
      type: "fill",
      prompt: "How about a paraffin wax ___?",
      hint: "Chị/Anh có muốn thử liệu pháp paraffin không ạ?",
      answer: "treatment",
      answerHint: "How about a paraffin wax treatment?"
    },
    {
      id: "L12C09",
      type: "fill",
      prompt: "We have a ___ on nail art today.",
      hint: "Hôm nay chúng tôi có ưu đãi đặc biệt cho vẽ móng.",
      answer: "special",
      answerHint: "We have a special on nail art today."
    },
    {
      id: "L12C10",
      type: "dialogue",
      prompt: "Customer: Just a regular manicure today.\nWorker: Would you like a gel top coat? It lasts longer.\nCustomer: Sure!\nWorker: How about a paraffin wax treatment?\nCustomer: Okay, sounds good.\nWorker: We have a special on nail art today too!",
      hint: "Khách: Hôm nay chỉ làm móng tay thường thôi.\nThợ: Chị có muốn sơn gel lớp phủ không ạ? Bền hơn đó.\nKhách: Được!\nThợ: Chị có muốn thử liệu pháp paraffin không ạ?\nKhách: Được, nghe hay đó.\nThợ: Hôm nay chúng tôi cũng có ưu đãi đặc biệt cho vẽ móng!",
      answer: "Customer: Just a regular manicure today.\nWorker: Would you like a gel top coat? It lasts longer.\nCustomer: Sure!\nWorker: How about a paraffin wax treatment?\nCustomer: Okay, sounds good.\nWorker: We have a special on nail art today too!"
    }
  ]
},
  {
  id: "L13",
  title: "Nail Shapes",
  titleVi: "Các kiểu móng tay",
  level: "A1",
  context: "Học cách nói về các kiểu móng tay khác nhau khi khách hàng yêu cầu.",
  phrases: [
    {
      english: "Square nails, please.",
      vietnamese: "Cho tôi móng tay vuông.",
      pronunciation: "skwer neylz, pleez."
    },
    {
      english: "Round nails are good.",
      vietnamese: "Móng tay tròn thì đẹp.",
      pronunciation: "rownd neylz ar good."
    },
    {
      english: "Almond shape, thank you.",
      vietnamese: "Kiểu móng hạnh nhân, cảm ơn.",
      pronunciation: "aa-muhnd sheyp, thang kyu."
    }
  ],
  drill: [
    {
      id: "L13C01",
      type: "read",
      prompt: "Square nails, please.",
      hint: "Cho tôi móng tay vuông.",
      answer: "Square nails, please."
    },
    {
      id: "L13C02",
      type: "recall",
      prompt: "Cho tôi móng tay vuông.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Square nails, please."
    },
    {
      id: "L13C03",
      type: "read",
      prompt: "Round nails are good.",
      hint: "Móng tay tròn thì đẹp.",
      answer: "Round nails are good."
    },
    {
      id: "L13C04",
      type: "recall",
      prompt: "Móng tay tròn thì đẹp.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Round nails are good."
    },
    {
      id: "L13C05",
      type: "read",
      prompt: "Almond shape, thank you.",
      hint: "Kiểu móng hạnh nhân, cảm ơn.",
      answer: "Almond shape, thank you."
    },
    {
      id: "L13C06",
      type: "recall",
      prompt: "Kiểu móng hạnh nhân, cảm ơn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Almond shape, thank you."
    },
    {
      id: "L13C07",
      type: "fill",
      prompt: "___ nails, please.",
      hint: "Cho tôi móng tay vuông.",
      answer: "Square",
      answerHint: "Square nails, please."
    },
    {
      id: "L13C08",
      type: "fill",
      prompt: "___ nails are good.",
      hint: "Móng tay tròn thì đẹp.",
      answer: "Round",
      answerHint: "Round nails are good."
    },
    {
      id: "L13C09",
      type: "fill",
      prompt: "Almond ___, thank you.",
      hint: "Kiểu móng hạnh nhân, cảm ơn.",
      answer: "shape",
      answerHint: "Almond shape, thank you."
    },
    {
      id: "L13C10",
      type: "dialogue",
      prompt: "Worker: What nail shape do you want?\nCustomer: Square nails, please.\nWorker: Okay, square! Round nails are good for short fingers too.\nCustomer: Hmm, almond shape, thank you.\nWorker: Got it, almond shape!",
      hint: "Thợ: Bạn muốn kiểu móng tay nào?\nKhách: Cho tôi móng tay vuông.\nThợ: Được, vuông! Móng tay tròn cũng hợp cho ngón ngắn nữa.\nKhách: Hmm, kiểu hạnh nhân, cảm ơn.\nThợ: Được rồi, kiểu hạnh nhân!",
      answer: "Worker: What nail shape do you want?\nCustomer: Square nails, please.\nWorker: Okay, square! Round nails are good for short fingers too.\nCustomer: Hmm, almond shape, thank you.\nWorker: Got it, almond shape!"
    }
  ]
},
  {
  id: "L14",
  title: "Nail Lengths",
  titleVi: "Độ Dài Móng Tay",
  level: "A1",
  context: "Học cách hỏi và nói về độ dài móng tay của khách hàng.",
  phrases: [
    {
      english: "Short nails, please.",
      vietnamese: "Cho tôi móng tay ngắn.",
      pronunciation: "Short nails, pleez."
    },
    {
      english: "Medium length, please.",
      vietnamese: "Cho tôi độ dài vừa phải.",
      pronunciation: "Mee-dee-um length, pleez."
    },
    {
      english: "Long nails, please.",
      vietnamese: "Cho tôi móng tay dài.",
      pronunciation: "Long nails, pleez."
    }
  ],
  drill: [
    {
      id: "L14C01",
      type: "read",
      prompt: "Short nails, please.",
      hint: "Cho tôi móng tay ngắn.",
      answer: "Short nails, please."
    },
    {
      id: "L14C02",
      type: "recall",
      prompt: "Cho tôi móng tay ngắn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Short nails, please."
    },
    {
      id: "L14C03",
      type: "read",
      prompt: "Medium length, please.",
      hint: "Cho tôi độ dài vừa phải.",
      answer: "Medium length, please."
    },
    {
      id: "L14C04",
      type: "recall",
      prompt: "Cho tôi độ dài vừa phải.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Medium length, please."
    },
    {
      id: "L14C05",
      type: "read",
      prompt: "Long nails, please.",
      hint: "Cho tôi móng tay dài.",
      answer: "Long nails, please."
    },
    {
      id: "L14C06",
      type: "recall",
      prompt: "Cho tôi móng tay dài.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Long nails, please."
    },
    {
      id: "L14C07",
      type: "fill",
      prompt: "___ nails, please.",
      hint: "Cho tôi móng tay ngắn.",
      answer: "Short",
      answerHint: "Short nails, please."
    },
    {
      id: "L14C08",
      type: "fill",
      prompt: "___ length, please.",
      hint: "Cho tôi độ dài vừa phải.",
      answer: "Medium",
      answerHint: "Medium length, please."
    },
    {
      id: "L14C09",
      type: "fill",
      prompt: "___ nails, please.",
      hint: "Cho tôi móng tay dài.",
      answer: "Long",
      answerHint: "Long nails, please."
    },
    {
      id: "L14C10",
      type: "dialogue",
      prompt: "Worker: What length do you want?\nCustomer: Medium length, please.\nWorker: Okay!",
      hint: "Thợ: Bạn muốn độ dài nào?\nKhách: Cho tôi độ dài vừa phải.\nThợ: Được thôi!",
      answer: "Worker: What length do you want?\nCustomer: Medium length, please.\nWorker: Okay!"
    }
  ]
},
  {
  id: "L15",
  title: "Taking Orders: What Service Do You Want?",
  titleVi: "Nhận Order: Bạn Muốn Dịch Vụ Gì?",
  level: "A1",
  context: "Sử dụng những mẫu câu này khi bạn muốn hỏi khách hàng về dịch vụ mà họ muốn làm.",
  phrases: [
    {
      english: "Hello, what can I do for you?",
      vietnamese: "Xin chào, tôi có thể giúp gì cho bạn?",
      pronunciation: "heh-loh, wot kan ai doo foh yoo?"
    },
    {
      english: "What service do you want today?",
      vietnamese: "Hôm nay bạn muốn làm dịch vụ gì?",
      pronunciation: "wot sur-vis doo yoo wont tuh-day?"
    },
    {
      english: "Manicure or pedicure?",
      vietnamese: "Làm móng tay hay móng chân?",
      pronunciation: "ma-ni-kyoor or peh-di-kyoor?"
    }
  ],
  drill: [
    {
      id: "L15C01",
      type: "read",
      prompt: "Hello, what can I do for you?",
      hint: "Xin chào, tôi có thể giúp gì cho bạn?",
      answer: "Hello, what can I do for you?"
    },
    {
      id: "L15C02",
      type: "recall",
      prompt: "Xin chào, tôi có thể giúp gì cho bạn?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Hello, what can I do for you?"
    },
    {
      id: "L15C03",
      type: "read",
      prompt: "What service do you want today?",
      hint: "Hôm nay bạn muốn làm dịch vụ gì?",
      answer: "What service do you want today?"
    },
    {
      id: "L15C04",
      type: "recall",
      prompt: "Hôm nay bạn muốn làm dịch vụ gì?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What service do you want today?"
    },
    {
      id: "L15C05",
      type: "read",
      prompt: "Manicure or pedicure?",
      hint: "Làm móng tay hay móng chân?",
      answer: "Manicure or pedicure?"
    },
    {
      id: "L15C06",
      type: "recall",
      prompt: "Làm móng tay hay móng chân?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Manicure or pedicure?"
    },
    {
      id: "L15C07",
      type: "fill",
      prompt: "Hello, what can I ___ for you?",
      hint: "Xin chào, tôi có thể giúp gì cho bạn?",
      answer: "do",
      answerHint: "Hello, what can I do for you?"
    },
    {
      id: "L15C08",
      type: "fill",
      prompt: "What service do you ___ today?",
      hint: "Hôm nay bạn muốn làm dịch vụ gì?",
      answer: "want",
      answerHint: "What service do you want today?"
    },
    {
      id: "L15C09",
      type: "fill",
      prompt: "___ or pedicure?",
      hint: "Làm móng tay hay móng chân?",
      answer: "Manicure",
      answerHint: "Manicure or pedicure?"
    },
    {
      id: "L15C10",
      type: "dialogue",
      prompt: "Worker: Hello, what can I do for you?\nCustomer: I need my nails done.\nWorker: What service do you want today?\nCustomer: Manicure, please.\nWorker: Manicure or pedicure? Just hands?\nCustomer: Just hands, thank you.",
      hint: "Thợ: Xin chào, tôi có thể giúp gì cho bạn?\nKhách: Tôi muốn làm móng.\nThợ: Hôm nay bạn muốn dịch vụ gì?\nKhách: Làm móng tay nhé.\nThợ: Làm móng tay hay móng chân? Chỉ tay thôi hả?\nKhách: Chỉ tay thôi, cảm ơn.",
      answer: "Worker: Hello, what can I do for you?\nCustomer: I need my nails done.\nWorker: What service do you want today?\nCustomer: Manicure, please.\nWorker: Manicure or pedicure? Just hands?\nCustomer: Just hands, thank you."
    }
  ]
},
  {
  id: "L16",
  title: "Nail Problems",
  titleVi: "Các Vấn Đề Về Móng",
  level: "A2",
  context: "Sử dụng những cụm từ này khi khách hàng có các vấn đề về móng tay.",
  phrases: [
    {
      english: "Dry cuticles need oil.",
      vietnamese: "Da khô quanh móng cần dầu.",
      pronunciation: "dry kyoo-ti-kuhlz need oil"
    },
    {
      english: "Brittle nails break easily.",
      vietnamese: "Móng giòn dễ gãy.",
      pronunciation: "bri-tl naylz brayk ee-zee-lee"
    },
    {
      english: "Hangnails can be painful.",
      vietnamese: "Da xước măng rô có thể gây đau.",
      pronunciation: "hang-naylz kan bee payn-ful"
    }
  ],
  drill: [
    {
      id: "L16C01",
      type: "read",
      prompt: "Dry cuticles need oil.",
      hint: "Da khô quanh móng cần dầu.",
      answer: "Dry cuticles need oil."
    },
    {
      id: "L16C02",
      type: "recall",
      prompt: "Da khô quanh móng cần dầu.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Dry cuticles need oil."
    },
    {
      id: "L16C03",
      type: "read",
      prompt: "Brittle nails break easily.",
      hint: "Móng giòn dễ gãy.",
      answer: "Brittle nails break easily."
    },
    {
      id: "L16C04",
      type: "recall",
      prompt: "Móng giòn dễ gãy.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Brittle nails break easily."
    },
    {
      id: "L16C05",
      type: "read",
      prompt: "Hangnails can be painful.",
      hint: "Da xước măng rô có thể gây đau.",
      answer: "Hangnails can be painful."
    },
    {
      id: "L16C06",
      type: "recall",
      prompt: "Da xước măng rô có thể gây đau.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Hangnails can be painful."
    },
    {
      id: "L16C07",
      type: "fill",
      prompt: "___ cuticles need oil.",
      hint: "Da khô quanh móng cần dầu.",
      answer: "Dry",
      answerHint: "Dry cuticles need oil."
    },
    {
      id: "L16C08",
      type: "fill",
      prompt: "Brittle nails break ___.",
      hint: "Móng giòn dễ gãy.",
      answer: "easily",
      answerHint: "Brittle nails break easily."
    },
    {
      id: "L16C09",
      type: "fill",
      prompt: "___ can be painful.",
      hint: "Da xước măng rô có thể gây đau.",
      answer: "Hangnails",
      answerHint: "Hangnails can be painful."
    },
    {
      id: "L16C10",
      type: "dialogue",
      prompt: "Worker: I see you have some hangnails. \nCustomer: Yes, they hurt!\nWorker: Don't worry, I'll be careful. Your dry cuticles need oil too.",
      hint: "Thợ: Tôi thấy bạn có một vài da xước măng rô.\nKhách: Đúng vậy, chúng đau!\nThợ: Đừng lo, tôi sẽ cẩn thận. Da khô quanh móng của bạn cũng cần dầu nữa.",
      answer: "Worker: I see you have some hangnails. \nCustomer: Yes, they hurt!\nWorker: Don't worry, I'll be careful. Your dry cuticles need oil too."
    }
  ]
},
  {
  id: "L17",
  title: "Explaining the Nail Service Process",
  titleVi: "Giải Thích Quy Trình Làm Móng",
  level: "A2",
  context: "Sử dụng những mẫu câu này để giải thích các bước làm móng cho khách hàng.",
  phrases: [
    {
      english: "First, we soak your nails.",
      vietnamese: "Đầu tiên, chúng ta sẽ ngâm móng tay của bạn.",
      pronunciation: "furst, wee sohk yor neylz."
    },
    {
      english: "Then, we shape your nails.",
      vietnamese: "Sau đó, chúng ta sẽ tạo hình móng tay của bạn.",
      pronunciation: "then, wee sheyp yor neylz."
    },
    {
      english: "Finally, we apply the polish.",
      vietnamese: "Cuối cùng, chúng ta sẽ sơn móng tay.",
      pronunciation: "fai-nuh-lee, wee uh-plai thuh paa-lish."
    }
  ],
  drill: [
    {
      id: "L17C01",
      type: "read",
      prompt: "First, we soak your nails.",
      hint: "Đầu tiên, chúng ta sẽ ngâm móng tay của bạn.",
      answer: "First, we soak your nails."
    },
    {
      id: "L17C02",
      type: "recall",
      prompt: "Đầu tiên, chúng ta sẽ ngâm móng tay của bạn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "First, we soak your nails."
    },
    {
      id: "L17C03",
      type: "read",
      prompt: "Then, we shape your nails.",
      hint: "Sau đó, chúng ta sẽ tạo hình móng tay của bạn.",
      answer: "Then, we shape your nails."
    },
    {
      id: "L17C04",
      type: "recall",
      prompt: "Sau đó, chúng ta sẽ tạo hình móng tay của bạn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Then, we shape your nails."
    },
    {
      id: "L17C05",
      type: "read",
      prompt: "Finally, we apply the polish.",
      hint: "Cuối cùng, chúng ta sẽ sơn móng tay.",
      answer: "Finally, we apply the polish."
    },
    {
      id: "L17C06",
      type: "recall",
      prompt: "Cuối cùng, chúng ta sẽ sơn móng tay.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Finally, we apply the polish."
    },
    {
      id: "L17C07",
      type: "fill",
      prompt: "First, we ___ your nails.",
      hint: "Đầu tiên, chúng ta sẽ ngâm móng tay của bạn.",
      answer: "soak",
      answerHint: "First, we soak your nails."
    },
    {
      id: "L17C08",
      type: "fill",
      prompt: "Then, we ___ your nails.",
      hint: "Sau đó, chúng ta sẽ tạo hình móng tay của bạn.",
      answer: "shape",
      answerHint: "Then, we shape your nails."
    },
    {
      id: "L17C09",
      type: "fill",
      prompt: "Finally, we ___ the polish.",
      hint: "Cuối cùng, chúng ta sẽ sơn móng tay.",
      answer: "apply",
      answerHint: "Finally, we apply the polish."
    },
    {
      id: "L17C10",
      type: "dialogue",
      prompt: "Worker: Hello! First, we soak your nails.\nCustomer: Okay.\nWorker: Then, we shape your nails, and finally, we apply the polish.",
      hint: "Thợ: Xin chào! Đầu tiên, chúng ta sẽ ngâm móng tay của bạn.\nKhách: Vâng.\nThợ: Sau đó, chúng ta sẽ tạo hình móng tay của bạn, và cuối cùng, chúng ta sẽ sơn móng tay.",
      answer: "Worker: Hello! First, we soak your nails.\nCustomer: Okay.\nWorker: Then, we shape your nails, and finally, we apply the polish."
    }
  ]
},
  {
  id: "L18",
  title: "Describing Nail Designs",
  titleVi: "Miêu Tả Các Mẫu Móng Tay",
  level: "A2",
  context: "Sử dụng các cụm từ này để miêu tả các kiểu móng tay khác nhau cho khách hàng.",
  phrases: [
    {
      english: "Glitter ombre, please.",
      vietnamese: "Tôi muốn ombre nhũ.",
      pronunciation: "GLIT-ter OM-bray, pleez."
    },
    {
      english: "I want a French tip.",
      vietnamese: "Tôi muốn làm kiểu Pháp.",
      pronunciation: "ai wont uh french tip."
    },
    {
      english: "Just a plain color.",
      vietnamese: "Chỉ cần một màu đơn giản thôi.",
      pronunciation: "just uh playn KUH-ler."
    }
  ],
  drill: [
    {
      id: "L18C01",
      type: "read",
      prompt: "Glitter ombre, please.",
      hint: "Tôi muốn ombre nhũ.",
      answer: "Glitter ombre, please."
    },
    {
      id: "L18C02",
      type: "recall",
      prompt: "Tôi muốn ombre nhũ.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Glitter ombre, please."
    },
    {
      id: "L18C03",
      type: "read",
      prompt: "I want a French tip.",
      hint: "Tôi muốn làm kiểu Pháp.",
      answer: "I want a French tip."
    },
    {
      id: "L18C04",
      type: "recall",
      prompt: "Tôi muốn làm kiểu Pháp.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I want a French tip."
    },
    {
      id: "L18C05",
      type: "read",
      prompt: "Just a plain color.",
      hint: "Chỉ cần một màu đơn giản thôi.",
      answer: "Just a plain color."
    },
    {
      id: "L18C06",
      type: "recall",
      prompt: "Chỉ cần một màu đơn giản thôi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Just a plain color."
    },
    {
      id: "L18C07",
      type: "fill",
      prompt: "___ ombre, please.",
      hint: "Tôi muốn ombre nhũ.",
      answer: "Glitter",
      answerHint: "Glitter ombre, please."
    },
    {
      id: "L18C08",
      type: "fill",
      prompt: "I want a French ___.",
      hint: "Tôi muốn làm kiểu Pháp.",
      answer: "tip",
      answerHint: "I want a French tip."
    },
    {
      id: "L18C09",
      type: "fill",
      prompt: "Just a ___ color.",
      hint: "Chỉ cần một màu đơn giản thôi.",
      answer: "plain",
      answerHint: "Just a plain color."
    },
    {
      id: "L18C10",
      type: "dialogue",
      prompt: "Worker: What kind of design today?\nCustomer: I want a French tip.\nWorker: Okay, and the color?\nCustomer: Just a plain color, please.",
      hint: "Thợ: Hôm nay chị muốn làm kiểu gì ạ?\nKhách: Tôi muốn làm kiểu Pháp.\nThợ: Dạ, còn màu thì sao ạ?\nKhách: Chỉ cần một màu đơn giản thôi.",
      answer: "Worker: What kind of design today?\nCustomer: I want a French tip.\nWorker: Okay, and the color?\nCustomer: Just a plain color, please."
    }
  ]
}
  ]
};

export default services;
