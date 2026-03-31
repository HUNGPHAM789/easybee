import type { Class } from '../types';

const buildingRelationships: Class = {
  id: 'building-relationships',
  title: 'Building Relationships',
  titleVi: 'Xây Dựng Mối Quan Hệ',
  lessons: [
    {
  id: "L46",
  title: "How Was Your Day?",
  titleVi: "Hôm Nay Của Bạn Thế Nào?",
  level: "A2",
  context: "Dùng những câu này để hỏi thăm và lắng nghe khách kể về ngày của họ — điều này giúp xây dựng mối quan hệ thân thiết.",
  phrases: [
    {
      english: "How was your day?",
      vietnamese: "Hôm nay của bạn thế nào?",
      pronunciation: "hao wəz yor dei"
    },
    {
      english: "That sounds really fun!",
      vietnamese: "Nghe có vẻ vui thật đó!",
      pronunciation: "dhæt saundz ri-li fʌn"
    },
    {
      english: "I'm glad you came in today.",
      vietnamese: "Tôi vui khi hôm nay bạn ghé đây.",
      pronunciation: "aim glæd yu keim in tuh-dei"
    }
  ],
  drill: [
    {
      id: "L46C01",
      type: "read",
      prompt: "How was your day?",
      hint: "Hôm nay của bạn thế nào?",
      answer: "How was your day?"
    },
    {
      id: "L46C02",
      type: "recall",
      prompt: "Hôm nay của bạn thế nào?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How was your day?"
    },
    {
      id: "L46C03",
      type: "read",
      prompt: "That sounds really fun!",
      hint: "Nghe có vẻ vui thật đó!",
      answer: "That sounds really fun!"
    },
    {
      id: "L46C04",
      type: "recall",
      prompt: "Nghe có vẻ vui thật đó!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "That sounds really fun!"
    },
    {
      id: "L46C05",
      type: "read",
      prompt: "I'm glad you came in today.",
      hint: "Tôi vui khi hôm nay bạn ghé đây.",
      answer: "I'm glad you came in today."
    },
    {
      id: "L46C06",
      type: "recall",
      prompt: "Tôi vui khi hôm nay bạn ghé đây.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I'm glad you came in today."
    },
    {
      id: "L46C07",
      type: "fill",
      prompt: "How was your ___?",
      hint: "Hôm nay của bạn thế nào?",
      answer: "day",
      answerHint: "How was your day?"
    },
    {
      id: "L46C08",
      type: "fill",
      prompt: "That sounds really ___!",
      hint: "Nghe có vẻ vui thật đó!",
      answer: "fun",
      answerHint: "That sounds really fun!"
    },
    {
      id: "L46C09",
      type: "fill",
      prompt: "I'm glad you came in ___.",
      hint: "Tôi vui khi hôm nay bạn ghé đây.",
      answer: "today",
      answerHint: "I'm glad you came in today."
    },
    {
      id: "L46C10",
      type: "dialogue",
      prompt: "Worker: How was your day?\nCustomer: Thank you!\nWorker: That sounds really fun!\nWorker: I'm glad you came in today.",
      hint: "Thợ nail: Hôm nay của bạn thế nào?\nKhách: Cảm ơn!\nThợ nail: Nghe có vẻ vui thật đó!\nThợ nail: Tôi vui khi hôm nay bạn ghé đây.",
      answer: "Worker: How was your day?\nCustomer: Thank you!\nWorker: That sounds really fun!\nWorker: I'm glad you came in today."
    }
  ]
},
    {
  id: "L47",
  title: "Weather Small Talk",
  titleVi: "Trò Chuyện Về Thời Tiết",
  level: "A2",
  context: "Nói về thời tiết là cách dễ nhất để bắt đầu trò chuyện với khách. Dùng những câu này tự nhiên trong khi làm móng.",
  phrases: [
    {
      english: "Can you believe this weather?",
      vietnamese: "Bạn có tin được thời tiết này không?",
      pronunciation: "kan yu buh-liv dhis weth-er"
    },
    {
      english: "It's been so hot lately.",
      vietnamese: "Gần đây trời nóng quá.",
      pronunciation: "its bin so hot leit-lee"
    },
    {
      english: "I hope it cools down soon.",
      vietnamese: "Tôi hy vọng trời sẽ mát hơn sớm.",
      pronunciation: "ai hop it kulz daun sun"
    }
  ],
  drill: [
    {
      id: "L47C01",
      type: "read",
      prompt: "Can you believe this weather?",
      hint: "Bạn có tin được thời tiết này không?",
      answer: "Can you believe this weather?"
    },
    {
      id: "L47C02",
      type: "recall",
      prompt: "Bạn có tin được thời tiết này không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can you believe this weather?"
    },
    {
      id: "L47C03",
      type: "read",
      prompt: "It's been so hot lately.",
      hint: "Gần đây trời nóng quá.",
      answer: "It's been so hot lately."
    },
    {
      id: "L47C04",
      type: "recall",
      prompt: "Gần đây trời nóng quá.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It's been so hot lately."
    },
    {
      id: "L47C05",
      type: "read",
      prompt: "I hope it cools down soon.",
      hint: "Tôi hy vọng trời sẽ mát hơn sớm.",
      answer: "I hope it cools down soon."
    },
    {
      id: "L47C06",
      type: "recall",
      prompt: "Tôi hy vọng trời sẽ mát hơn sớm.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I hope it cools down soon."
    },
    {
      id: "L47C07",
      type: "fill",
      prompt: "Can you believe this ___?",
      hint: "Bạn có tin được thời tiết này không?",
      answer: "weather",
      answerHint: "Can you believe this weather?"
    },
    {
      id: "L47C08",
      type: "fill",
      prompt: "It's been so hot ___.",
      hint: "Gần đây trời nóng quá.",
      answer: "lately",
      answerHint: "It's been so hot lately."
    },
    {
      id: "L47C09",
      type: "fill",
      prompt: "I hope it cools down ___.",
      hint: "Tôi hy vọng trời sẽ mát hơn sớm.",
      answer: "soon",
      answerHint: "I hope it cools down soon."
    },
    {
      id: "L47C10",
      type: "dialogue",
      prompt: "Worker: Can you believe this weather?\nCustomer: I know, right?\nWorker: It's been so hot lately.\nWorker: I hope it cools down soon.",
      hint: "Thợ nail: Bạn có tin được thời tiết này không?\nKhách: Tôi biết, phải không?\nThợ nail: Gần đây trời nóng quá.\nThợ nail: Tôi hy vọng trời sẽ mát hơn sớm.",
      answer: "Worker: Can you believe this weather?\nCustomer: I know, right?\nWorker: It's been so hot lately.\nWorker: I hope it cools down soon."
    }
  ]
},
    {
  id: "L48",
  title: "Complimenting Customers",
  titleVi: "Khen Ngợi Khách Hàng",
  level: "A2",
  context: "Một lời khen chân thành giúp khách cảm thấy thoải mái và muốn quay lại. Dùng những câu này tự nhiên trong cuộc trò chuyện.",
  phrases: [
    {
      english: "I love your outfit!",
      vietnamese: "Tôi thích bộ đồ của bạn!",
      pronunciation: "ai lʌv yor aut-fit"
    },
    {
      english: "That color looks great on you.",
      vietnamese: "Màu đó rất hợp với bạn.",
      pronunciation: "dhæt kʌl-er luks greit on yu"
    },
    {
      english: "You have such beautiful hands.",
      vietnamese: "Tay bạn thật đẹp.",
      pronunciation: "yu hæv sʌtʃ byu-tə-fəl hændz"
    }
  ],
  drill: [
    {
      id: "L48C01",
      type: "read",
      prompt: "I love your outfit!",
      hint: "Tôi thích bộ đồ của bạn!",
      answer: "I love your outfit!"
    },
    {
      id: "L48C02",
      type: "recall",
      prompt: "Tôi thích bộ đồ của bạn!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I love your outfit!"
    },
    {
      id: "L48C03",
      type: "read",
      prompt: "That color looks great on you.",
      hint: "Màu đó rất hợp với bạn.",
      answer: "That color looks great on you."
    },
    {
      id: "L48C04",
      type: "recall",
      prompt: "Màu đó rất hợp với bạn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "That color looks great on you."
    },
    {
      id: "L48C05",
      type: "read",
      prompt: "You have such beautiful hands.",
      hint: "Tay bạn thật đẹp.",
      answer: "You have such beautiful hands."
    },
    {
      id: "L48C06",
      type: "recall",
      prompt: "Tay bạn thật đẹp.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "You have such beautiful hands."
    },
    {
      id: "L48C07",
      type: "fill",
      prompt: "I love your ___!",
      hint: "Tôi thích bộ đồ của bạn!",
      answer: "outfit",
      answerHint: "I love your outfit!"
    },
    {
      id: "L48C08",
      type: "fill",
      prompt: "That color looks great on ___.",
      hint: "Màu đó rất hợp với bạn.",
      answer: "you",
      answerHint: "That color looks great on you."
    },
    {
      id: "L48C09",
      type: "fill",
      prompt: "You have such beautiful ___.",
      hint: "Tay bạn thật đẹp.",
      answer: "hands",
      answerHint: "You have such beautiful hands."
    },
    {
      id: "L48C10",
      type: "dialogue",
      prompt: "Worker: I love your outfit!\nCustomer: Thank you so much!\nWorker: That color looks great on you.\nWorker: You have such beautiful hands.",
      hint: "Thợ nail: Tôi thích bộ đồ của bạn!\nKhách: Cảm ơn rất nhiều!\nThợ nail: Màu đó rất hợp với bạn.\nThợ nail: Tay bạn thật đẹp.",
      answer: "Worker: I love your outfit!\nCustomer: Thank you so much!\nWorker: That color looks great on you.\nWorker: You have such beautiful hands."
    }
  ]
},
  {
  id: "L63",
  title: "Asking About Work",
  titleVi: "Hỏi Về Công Việc",
  level: "B1",
  context: "Sử dụng những câu này để hỏi khách hàng về công việc của họ một cách lịch sự.",
  phrases: [
    {
      english: "What do you do?",
      vietnamese: "Bạn làm nghề gì?",
      pronunciation: "wuht doo yoo doo?"
    },
    {
      english: "What kind of work?",
      vietnamese: "Bạn làm loại công việc gì?",
      pronunciation: "wuht kahynd uv wurk?"
    },
    {
      english: "Where do you work?",
      vietnamese: "Bạn làm việc ở đâu?",
      pronunciation: "wair doo yoo wurk?"
    }
  ],
  drill: [
    {
      id: "L63C01",
      type: "read",
      prompt: "What do you do?",
      hint: "Bạn làm nghề gì?",
      answer: "What do you do?"
    },
    {
      id: "L63C02",
      type: "recall",
      prompt: "Bạn làm nghề gì?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What do you do?"
    },
    {
      id: "L63C03",
      type: "read",
      prompt: "What kind of work?",
      hint: "Bạn làm loại công việc gì?",
      answer: "What kind of work?"
    },
    {
      id: "L63C04",
      type: "recall",
      prompt: "Bạn làm loại công việc gì?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What kind of work?"
    },
    {
      id: "L63C05",
      type: "read",
      prompt: "Where do you work?",
      hint: "Bạn làm việc ở đâu?",
      answer: "Where do you work?"
    },
    {
      id: "L63C06",
      type: "recall",
      prompt: "Bạn làm việc ở đâu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Where do you work?"
    },
    {
      id: "L63C07",
      type: "fill",
      prompt: "What do you ___?",
      hint: "Bạn làm nghề gì?",
      answer: "do",
      answerHint: "What do you do?"
    },
    {
      id: "L63C08",
      type: "fill",
      prompt: "What kind of ___?",
      hint: "Bạn làm loại công việc gì?",
      answer: "work",
      answerHint: "What kind of work?"
    },
    {
      id: "L63C09",
      type: "fill",
      prompt: "Where do you ___?",
      hint: "Bạn làm việc ở đâu?",
      answer: "work",
      answerHint: "Where do you work?"
    },
    {
      id: "L63C10",
      type: "dialogue",
      prompt: "Worker: What do you do?\nCustomer: I'm a teacher.\nWorker: Where do you work?",
      hint: "Thợ: Bạn làm nghề gì?\nKhách: Tôi là giáo viên.\nThợ: Bạn làm việc ở đâu?",
      answer: "Worker: What do you do?\nCustomer: I'm a teacher.\nWorker: Where do you work?"
    }
  ]
},
  {
  id: "L64",
  title: "Hobbies and Weekend Plans",
  titleVi: "Sở thích và Kế hoạch Cuối tuần",
  level: "B1",
  context: "Sử dụng những mẫu câu này để trò chuyện thân thiện với khách hàng về sở thích và kế hoạch cuối tuần của họ.",
  phrases: [
    {
      english: "What do you do for fun?",
      vietnamese: "Chị/Anh thích làm gì để giải trí?",
      pronunciation: "wot doo yoo doo for fun"
    },
    {
      english: "Any plans for the weekend?",
      vietnamese: "Chị/Anh có kế hoạch gì cho cuối tuần không?",
      pronunciation: "en-ee plans for thuh week-end"
    },
    {
      english: "I like to watch movies.",
      vietnamese: "Tôi thích xem phim.",
      pronunciation: "ai laik tuh wotch moo-vees"
    }
  ],
  drill: [
    {
      id: "L64C01",
      type: "read",
      prompt: "What do you do for fun?",
      hint: "Chị/Anh thích làm gì để giải trí?",
      answer: "What do you do for fun?"
    },
    {
      id: "L64C02",
      type: "recall",
      prompt: "Chị/Anh thích làm gì để giải trí?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What do you do for fun?"
    },
    {
      id: "L64C03",
      type: "read",
      prompt: "Any plans for the weekend?",
      hint: "Chị/Anh có kế hoạch gì cho cuối tuần không?",
      answer: "Any plans for the weekend?"
    },
    {
      id: "L64C04",
      type: "recall",
      prompt: "Chị/Anh có kế hoạch gì cho cuối tuần không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Any plans for the weekend?"
    },
    {
      id: "L64C05",
      type: "read",
      prompt: "I like to watch movies.",
      hint: "Tôi thích xem phim.",
      answer: "I like to watch movies."
    },
    {
      id: "L64C06",
      type: "recall",
      prompt: "Tôi thích xem phim.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I like to watch movies."
    },
    {
      id: "L64C07",
      type: "fill",
      prompt: "What do you do for ___?",
      hint: "Chị/Anh thích làm gì để giải trí?",
      answer: "fun",
      answerHint: "What do you do for fun?"
    },
    {
      id: "L64C08",
      type: "fill",
      prompt: "Any ___ for the weekend?",
      hint: "Chị/Anh có kế hoạch gì cho cuối tuần không?",
      answer: "plans",
      answerHint: "Any plans for the weekend?"
    },
    {
      id: "L64C09",
      type: "fill",
      prompt: "I like to watch ___.",
      hint: "Tôi thích xem phim.",
      answer: "movies",
      answerHint: "I like to watch movies."
    },
    {
      id: "L64C10",
      type: "dialogue",
      prompt: "Worker: What do you do for fun?\nCustomer: I like to read books.\nWorker: Any plans for the weekend?",
      hint: "Thợ: Chị/Anh thích làm gì để giải trí?\nKhách: Tôi thích đọc sách.\nThợ: Chị/Anh có kế hoạch gì cho cuối tuần không?",
      answer: "Worker: What do you do for fun?\nCustomer: I like to read books.\nWorker: Any plans for the weekend?"
    }
  ]
},
  {
  id: "L65",
  title: "Small Talk: Sharing",
  titleVi: "Nói chuyện xã giao: Chia sẻ",
  level: "B1",
  context: "Sử dụng những mẫu câu này để chia sẻ một chút về bản thân với khách hàng quen thuộc một cách tự nhiên.",
  phrases: [
    {
      english: "The kids keep me busy!",
      vietnamese: "Bọn trẻ làm tôi bận rộn quá!",
      pronunciation: "thuh kids keep mee bi-zee!"
    },
    {
      english: "Work has been pretty hectic.",
      vietnamese: "Công việc dạo này khá là bận rộn.",
      pronunciation: "wurk haz bin pri-tee hek-tik."
    },
    {
      english: "My family is doing well.",
      vietnamese: "Gia đình tôi vẫn khỏe.",
      pronunciation: "mai fa-muh-lee iz doo-ing wel."
    }
  ],
  drill: [
    {
      id: "L65C01",
      type: "read",
      prompt: "The kids keep me busy!",
      hint: "Bọn trẻ làm tôi bận rộn quá!",
      answer: "The kids keep me busy!"
    },
    {
      id: "L65C02",
      type: "recall",
      prompt: "Bọn trẻ làm tôi bận rộn quá!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "The kids keep me busy!"
    },
    {
      id: "L65C03",
      type: "read",
      prompt: "Work has been pretty hectic.",
      hint: "Công việc dạo này khá là bận rộn.",
      answer: "Work has been pretty hectic."
    },
    {
      id: "L65C04",
      type: "recall",
      prompt: "Công việc dạo này khá là bận rộn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Work has been pretty hectic."
    },
    {
      id: "L65C05",
      type: "read",
      prompt: "My family is doing well.",
      hint: "Gia đình tôi vẫn khỏe.",
      answer: "My family is doing well."
    },
    {
      id: "L65C06",
      type: "recall",
      prompt: "Gia đình tôi vẫn khỏe.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "My family is doing well."
    },
    {
      id: "L65C07",
      type: "fill",
      prompt: "The kids keep me ___!",
      hint: "Bọn trẻ làm tôi bận rộn quá!",
      answer: "busy",
      answerHint: "The kids keep me busy!"
    },
    {
      id: "L65C08",
      type: "fill",
      prompt: "Work has been pretty ___.",
      hint: "Công việc dạo này khá là bận rộn.",
      answer: "hectic",
      answerHint: "Work has been pretty hectic."
    },
    {
      id: "L65C09",
      type: "fill",
      prompt: "My ___ is doing well.",
      hint: "Gia đình tôi vẫn khỏe.",
      answer: "family",
      answerHint: "My family is doing well."
    },
    {
      id: "L65C10",
      type: "dialogue",
      prompt: "Worker: How are you today?\nCustomer: I'm doing well, thanks. How about you?\nWorker: The kids keep me busy!",
      hint: "Thợ: Hôm nay bạn thế nào?\nKhách: Tôi khỏe, cảm ơn. Bạn thì sao?\nThợ: Bọn trẻ làm tôi bận rộn quá!",
      answer: "Worker: How are you today?\nCustomer: I'm doing well, thanks. How about you?\nWorker: The kids keep me busy!"
    }
  ]
},
  {
  id: "L66",
  title: "Remembering Customer Preferences",
  titleVi: "Ghi Nhớ Sở Thích Của Khách Hàng",
  level: "B1",
  context: "Sử dụng những mẫu câu này để thể hiện bạn nhớ sở thích của khách hàng quen thuộc.",
  phrases: [
    {
      english: "The usual for you?",
      vietnamese: "Như thường lệ cho bạn nhé?",
      pronunciation: "thuh yoo-zhuh-wuhl for yoo?"
    },
    {
      english: "Red, like always?",
      vietnamese: "Màu đỏ, như mọi khi phải không?",
      pronunciation: "red, laik awl-weyz?"
    },
    {
      english: "I remember your order.",
      vietnamese: "Tôi nhớ đơn của bạn rồi.",
      pronunciation: "ai ri-mem-ber yor or-der."
    }
  ],
  drill: [
    {
      id: "L66C01",
      type: "read",
      prompt: "The usual for you?",
      hint: "Như thường lệ cho bạn nhé?",
      answer: "The usual for you?"
    },
    {
      id: "L66C02",
      type: "recall",
      prompt: "Như thường lệ cho bạn nhé?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "The usual for you?"
    },
    {
      id: "L66C03",
      type: "read",
      prompt: "Red, like always?",
      hint: "Màu đỏ, như mọi khi phải không?",
      answer: "Red, like always?"
    },
    {
      id: "L66C04",
      type: "recall",
      prompt: "Màu đỏ, như mọi khi phải không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Red, like always?"
    },
    {
      id: "L66C05",
      type: "read",
      prompt: "I remember your order.",
      hint: "Tôi nhớ đơn của bạn rồi.",
      answer: "I remember your order."
    },
    {
      id: "L66C06",
      type: "recall",
      prompt: "Tôi nhớ đơn của bạn rồi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I remember your order."
    },
    {
      id: "L66C07",
      type: "fill",
      prompt: "The ___ for you?",
      hint: "Như thường lệ cho bạn nhé?",
      answer: "usual",
      answerHint: "The usual for you?"
    },
    {
      id: "L66C08",
      type: "fill",
      prompt: "Red, like ___?",
      hint: "Màu đỏ, như mọi khi phải không?",
      answer: "always",
      answerHint: "Red, like always?"
    },
    {
      id: "L66C09",
      type: "fill",
      prompt: "I remember your ___.",
      hint: "Tôi nhớ đơn của bạn rồi.",
      answer: "order",
      answerHint: "I remember your order."
    },
    {
      id: "L66C10",
      type: "dialogue",
      prompt: "Worker: The usual for you?\nCustomer: Yes, please.\nWorker: Coming right up!",
      hint: "Thợ: Như thường lệ cho bạn nhé?\nKhách: Vâng, làm ơn.\nThợ: Đến ngay đây!",
      answer: "Worker: The usual for you?\nCustomer: Yes, please.\nWorker: Coming right up!"
    }
  ]
},
  {
  id: "L67",
  title: "Sports and Pop Culture",
  titleVi: "Thể thao và Văn hóa đại chúng",
  level: "B2",
  context: "Sử dụng những câu này để trò chuyện với khách hàng về tin tức thể thao và văn hóa đại chúng khi làm móng.",
  phrases: [
    {
      english: "Did you catch the game?",
      vietnamese: "Hôm qua chị có xem trận đấu không?",
      pronunciation: "did yoo kach thuh geym?"
    },
    {
      english: "Have you seen that new movie?",
      vietnamese: "Chị đã xem bộ phim mới đó chưa?",
      pronunciation: "hav yoo seen that noo moo-vee?"
    },
    {
      english: "Everyone's talking about that song.",
      vietnamese: "Ai cũng đang bàn tán về bài hát đó.",
      pronunciation: "ev-ree-wuns taw-king uh-bout that song."
    }
  ],
  drill: [
    {
      id: "L67C01",
      type: "read",
      prompt: "Did you catch the game?",
      hint: "Hôm qua chị có xem trận đấu không?",
      answer: "Did you catch the game?"
    },
    {
      id: "L67C02",
      type: "recall",
      prompt: "Hôm qua chị có xem trận đấu không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Did you catch the game?"
    },
    {
      id: "L67C03",
      type: "read",
      prompt: "Have you seen that new movie?",
      hint: "Chị đã xem bộ phim mới đó chưa?",
      answer: "Have you seen that new movie?"
    },
    {
      id: "L67C04",
      type: "recall",
      prompt: "Chị đã xem bộ phim mới đó chưa?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Have you seen that new movie?"
    },
    {
      id: "L67C05",
      type: "read",
      prompt: "Everyone's talking about that song.",
      hint: "Ai cũng đang bàn tán về bài hát đó.",
      answer: "Everyone's talking about that song."
    },
    {
      id: "L67C06",
      type: "recall",
      prompt: "Ai cũng đang bàn tán về bài hát đó.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Everyone's talking about that song."
    },
    {
      id: "L67C07",
      type: "fill",
      prompt: "Did you catch the ___?",
      hint: "Hôm qua chị có xem trận đấu không?",
      answer: "game",
      answerHint: "Did you catch the game?"
    },
    {
      id: "L67C08",
      type: "fill",
      prompt: "Have you seen that new ___?",
      hint: "Chị đã xem bộ phim mới đó chưa?",
      answer: "movie",
      answerHint: "Have you seen that new movie?"
    },
    {
      id: "L67C09",
      type: "fill",
      prompt: "Everyone's talking about that ___.",
      hint: "Ai cũng đang bàn tán về bài hát đó.",
      answer: "song",
      answerHint: "Everyone's talking about that song."
    },
    {
      id: "L67C10",
      type: "dialogue",
      prompt: "Worker: Did you catch the game last night?\nCustomer: Yes, it was so exciting!\nWorker: I know, right? What a finish!",
      hint: "Thợ: Tối qua chị có xem trận đấu không?\nKhách: Có, hay quá trời!\nThợ: Em biết mà! Kết thúc bất ngờ thật!",
      answer: "Worker: Did you catch the game last night?\nCustomer: Yes, it was so exciting!\nWorker: I know, right? What a finish!"
    }
  ]
},
  {
  id: "L68",
  title: "Building Customer Relationships",
  titleVi: "Xây dựng mối quan hệ với khách hàng",
  level: "B2",
  context: "Sử dụng những câu này để tạo ấn tượng tốt và xây dựng mối quan hệ lâu dài với khách hàng.",
  phrases: [
    {
      english: "It's always a pleasure seeing you.",
      vietnamese: "Rất vui khi được gặp lại quý khách.",
      pronunciation: "its awl-wayz a pleh-zhur see-ing yoo"
    },
    {
      english: "I'm glad you came in today.",
      vietnamese: "Tôi rất vui vì hôm nay quý khách đã ghé thăm.",
      pronunciation: "ime glad yoo came in tuh-day"
    },
    {
      english: "We appreciate your continued business.",
      vietnamese: "Chúng tôi rất trân trọng sự ủng hộ liên tục của quý khách.",
      pronunciation: "wee uh-pree-shee-ayt yor kuhn-tin-yood biz-ness"
    }
  ],
  drill: [
    {
      id: "L68C01",
      type: "read",
      prompt: "It's always a pleasure seeing you.",
      hint: "Rất vui khi được gặp lại quý khách.",
      answer: "It's always a pleasure seeing you."
    },
    {
      id: "L68C02",
      type: "recall",
      prompt: "Rất vui khi được gặp lại quý khách.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It's always a pleasure seeing you."
    },
    {
      id: "L68C03",
      type: "read",
      prompt: "I'm glad you came in today.",
      hint: "Tôi rất vui vì hôm nay quý khách đã ghé thăm.",
      answer: "I'm glad you came in today."
    },
    {
      id: "L68C04",
      type: "recall",
      prompt: "Tôi rất vui vì hôm nay quý khách đã ghé thăm.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I'm glad you came in today."
    },
    {
      id: "L68C05",
      type: "read",
      prompt: "We appreciate your continued business.",
      hint: "Chúng tôi rất trân trọng sự ủng hộ liên tục của quý khách.",
      answer: "We appreciate your continued business."
    },
    {
      id: "L68C06",
      type: "recall",
      prompt: "Chúng tôi rất trân trọng sự ủng hộ liên tục của quý khách.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "We appreciate your continued business."
    },
    {
      id: "L68C07",
      type: "fill",
      prompt: "It's always a ___ seeing you.",
      hint: "Rất vui khi được gặp lại quý khách.",
      answer: "pleasure",
      answerHint: "It's always a pleasure seeing you."
    },
    {
      id: "L68C08",
      type: "fill",
      prompt: "I'm glad you came ___ today.",
      hint: "Tôi rất vui vì hôm nay quý khách đã ghé thăm.",
      answer: "in",
      answerHint: "I'm glad you came in today."
    },
    {
      id: "L68C09",
      type: "fill",
      prompt: "We appreciate your continued ___.",
      hint: "Chúng tôi rất trân trọng sự ủng hộ liên tục của quý khách.",
      answer: "business",
      answerHint: "We appreciate your continued business."
    },
    {
      id: "L68C10",
      type: "dialogue",
      prompt: "Worker: Good morning! It's always a pleasure seeing you, Mr. Lee. What can I do for you today?\nCustomer: Good morning! I need a haircut.\nWorker: Of course. I'm glad you came in today.",
      hint: "Thợ: Chào buổi sáng! Rất vui khi được gặp lại ông Lee. Hôm nay tôi có thể giúp gì cho ông?\nKhách: Chào buổi sáng! Tôi cần cắt tóc.\nThợ: Tất nhiên rồi. Tôi rất vui vì hôm nay ông đã ghé thăm.",
      answer: "Worker: Good morning! It's always a pleasure seeing you, Mr. Lee. What can I do for you today?\nCustomer: Good morning! I need a haircut.\nWorker: Of course. I'm glad you came in today."
    }
  ]
}
  ],
};

export default buildingRelationships;
