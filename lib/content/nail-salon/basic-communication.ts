import type { Class } from '../types';

const basicCommunication: Class = {
  id: 'basic-communication',
  title: 'Basic Communication',
  titleVi: 'Giao Tiếp Cơ Bản',
  lessons: [{id: "L01",
  title: "Greeting New Customers",
  titleVi: "Chào Khách Hàng Mới",
  level: "A1",
  context: "Sử dụng những câu này khi bạn chào đón khách hàng mới đến tiệm nail của bạn.",
  phrases: [
    {
      english: "Hello, welcome!",
      vietnamese: "Xin chào, mừng bạn đến!",
      pronunciation: "heh-loh, wel-kuhm!"
    },
    {
      english: "Hi, how can I help you?",
      vietnamese: "Chào bạn, tôi có thể giúp gì cho bạn?",
      pronunciation: "hai, hao kuhn ai help yu?"
    },
    {
      english: "Good morning/afternoon!",
      vietnamese: "Chào buổi sáng/chiều!",
      pronunciation: "good mawr-ning/af-ter-noon!"
    }
  ],
  drill: [
    {
      id: "L01C01",
      type: "read",
      prompt: "Hello, welcome!",
      hint: "Xin chào, mừng bạn đến!",
      answer: "Hello, welcome!"
    },
    {
      id: "L01C02",
      type: "recall",
      prompt: "Xin chào, mừng bạn đến!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Hello, welcome!"
    },
    {
      id: "L01C03",
      type: "read",
      prompt: "Hi, how can I help you?",
      hint: "Chào bạn, tôi có thể giúp gì cho bạn?",
      answer: "Hi, how can I help you?"
    },
    {
      id: "L01C04",
      type: "recall",
      prompt: "Chào bạn, tôi có thể giúp gì cho bạn?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Hi, how can I help you?"
    },
    {
      id: "L01C05",
      type: "read",
      prompt: "Good morning/afternoon!",
      hint: "Chào buổi sáng/chiều!",
      answer: "Good morning/afternoon!"
    },
    {
      id: "L01C06",
      type: "recall",
      prompt: "Chào buổi sáng/chiều!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Good morning/afternoon!"
    },
    {
      id: "L01C07",
      type: "fill",
      prompt: "Hello, ___!",
      hint: "Xin chào, mừng bạn đến!",
      answer: "welcome",
      answerHint: "Hello, welcome!"
    },
    {
      id: "L01C08",
      type: "fill",
      prompt: "Hi, how can I ___ you?",
      hint: "Chào bạn, tôi có thể giúp gì cho bạn?",
      answer: "help",
      answerHint: "Hi, how can I help you?"
    },
    {
      id: "L01C09",
      type: "fill",
      prompt: "Good ___/afternoon!",
      hint: "Chào buổi sáng/chiều!",
      answer: "morning",
      answerHint: "Good morning/afternoon!"
    },
    {
      id: "L01C10",
      type: "dialogue",
      prompt: "Customer: Hello!\nWorker: Hi, how can I help you?\nCustomer: Good morning!",
      hint: "Khách: Xin chào!\nThợ nail: Chào bạn, tôi có thể giúp gì cho bạn?\nKhách: Chào buổi sáng!",
      answer: "Customer: Hello!\nWorker: Hi, how can I help you?\nCustomer: Good morning!"
    }
  ]
}, {id: "L02",
  title: "Small Talk with Regular Customers",
  titleVi: "Trò Chuyện Với Khách Hàng Thân Thiết",
  level: "A2",
  context: "Sử dụng những mẫu câu này để trò chuyện thân mật với khách hàng quen thuộc.",
  phrases: [
    {
      english: "How have you been?",
      vietnamese: "Dạo này cô/chị/anh thế nào?",
      pronunciation: "hao hav yu bin"
    },
    {
      english: "Busy week, huh?",
      vietnamese: "Tuần này bận rộn hả chị/anh?",
      pronunciation: "bi-zi wik huh"
    },
    {
      english: "Nice weather today!",
      vietnamese: "Thời tiết hôm nay đẹp quá!",
      pronunciation: "nais we-ther tu-day"
    }
  ],
  drill: [
    {
      id: "L02C01",
      type: "read",
      prompt: "How have you been?",
      hint: "Dạo này cô/chị/anh thế nào?",
      answer: "How have you been?"
    },
    {
      id: "L02C02",
      type: "recall",
      prompt: "Dạo này cô/chị/anh thế nào?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How have you been?"
    },
    {
      id: "L02C03",
      type: "read",
      prompt: "Busy week, huh?",
      hint: "Tuần này bận rộn hả chị/anh?",
      answer: "Busy week, huh?"
    },
    {
      id: "L02C04",
      type: "recall",
      prompt: "Tuần này bận rộn hả chị/anh?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Busy week, huh?"
    },
    {
      id: "L02C05",
      type: "read",
      prompt: "Nice weather today!",
      hint: "Thời tiết hôm nay đẹp quá!",
      answer: "Nice weather today!"
    },
    {
      id: "L02C06",
      type: "recall",
      prompt: "Thời tiết hôm nay đẹp quá!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Nice weather today!"
    },
    {
      id: "L02C07",
      type: "fill",
      prompt: "How ___ you been?",
      hint: "Dạo này cô/chị/anh thế nào?",
      answer: "have",
      answerHint: "How have you been?"
    },
    {
      id: "L02C08",
      type: "fill",
      prompt: "Busy ___, huh?",
      hint: "Tuần này bận rộn hả chị/anh?",
      answer: "week",
      answerHint: "Busy week, huh?"
    },
    {
      id: "L02C09",
      type: "fill",
      prompt: "Nice ___ today!",
      hint: "Thời tiết hôm nay đẹp quá!",
      answer: "weather",
      answerHint: "Nice weather today!"
    },
    {
      id: "L02C10",
      type: "dialogue",
      prompt: "Worker: How have you been?\nCustomer: Good, thanks! Busy week, huh?\nWorker: Nice weather today!",
      hint: "Thợ: Dạo này chị thế nào?\nKhách: Tốt! Tuần này bận rộn hả?\nThợ: Thời tiết hôm nay đẹp quá!",
      answer: "Worker: How have you been?\nCustomer: Good, thanks! Busy week, huh?\nWorker: Nice weather today!"
    }
  ]
}, {id: "L03",
  title: "Saying Goodbye",
  titleVi: "Nói lời tạm biệt",
  level: "A1",
  context: "Sử dụng những câu này khi khách hàng của bạn rời khỏi tiệm.",
  phrases: [
    {
      english: "Goodbye!",
      vietnamese: "Tạm biệt!",
      pronunciation: "good-bai"
    },
    {
      english: "Have a good day!",
      vietnamese: "Chúc một ngày tốt lành!",
      pronunciation: "hav uh good day"
    },
    {
      english: "See you next time!",
      vietnamese: "Hẹn gặp lại lần sau!",
      pronunciation: "see yoo next time"
    }
  ],
  drill: [
    {
      id: "L03C01",
      type: "read",
      prompt: "Goodbye!",
      hint: "Tạm biệt!",
      answer: "Goodbye!"
    },
    {
      id: "L03C02",
      type: "recall",
      prompt: "Tạm biệt!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Goodbye!"
    },
    {
      id: "L03C03",
      type: "read",
      prompt: "Have a good day!",
      hint: "Chúc một ngày tốt lành!",
      answer: "Have a good day!"
    },
    {
      id: "L03C04",
      type: "recall",
      prompt: "Chúc một ngày tốt lành!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Have a good day!"
    },
    {
      id: "L03C05",
      type: "read",
      prompt: "See you next time!",
      hint: "Hẹn gặp lại lần sau!",
      answer: "See you next time!"
    },
    {
      id: "L03C06",
      type: "recall",
      prompt: "Hẹn gặp lại lần sau!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "See you next time!"
    },
    {
      id: "L03C07",
      type: "fill",
      prompt: "Have a good ___!",
      hint: "Chúc một ngày tốt lành!",
      answer: "day",
      answerHint: "Have a good day!"
    },
    {
      id: "L03C08",
      type: "fill",
      prompt: "See you ___ time!",
      hint: "Hẹn gặp lại lần sau!",
      answer: "next",
      answerHint: "See you next time!"
    },
    {
      id: "L03C09",
      type: "fill",
      prompt: "Good___!",
      hint: "Tạm biệt!",
      answer: "bye",
      answerHint: "Goodbye!"
    },
    {
      id: "L03C10",
      type: "dialogue",
      prompt: "Customer: Thank you!\nWorker: Have a good day!\nCustomer: See you next time!\nWorker: Goodbye!",
      hint: "Khách: Cảm ơn!\nThợ nail: Chúc một ngày tốt lành!\nKhách: Hẹn gặp lại lần sau!\nThợ nail: Tạm biệt!",
      answer: "Customer: Thank you!\nWorker: Have a good day!\nCustomer: See you next time!\nWorker: Goodbye!"
    }
  ]
}, {id: "L04",
  title: "Casual Greetings",
  titleVi: "Chào Hỏi Thông Thường",
  level: "A2",
  context: "Học cách chào hỏi khách hàng một cách thân thiện và tự nhiên khi họ đến tiệm.",
  phrases: [
    { english: "How's it going?", vietnamese: "Dạo này thế nào?", pronunciation: "hao-z it go-ing?" },
    { english: "You good?", vietnamese: "Bạn ổn không?", pronunciation: "yu gud?" },
    { english: "What's up?", vietnamese: "Có gì mới không?", pronunciation: "wats up?" }
  ],
  drill: [
    { id: "L04C01", type: "read", prompt: "How's it going?", hint: "Dạo này thế nào?", answer: "How's it going?" },
    { id: "L04C02", type: "recall", prompt: "Dạo này thế nào?", hint: "Nhớ lại câu tiếng Anh...", answer: "How's it going?" },
    { id: "L04C03", type: "read", prompt: "You good?", hint: "Bạn ổn không?", answer: "You good?" },
    { id: "L04C04", type: "recall", prompt: "Bạn ổn không?", hint: "Nhớ lại câu tiếng Anh...", answer: "You good?" },
    { id: "L04C05", type: "read", prompt: "What's up?", hint: "Có gì mới không?", answer: "What's up?" },
    { id: "L04C06", type: "recall", prompt: "Có gì mới không?", hint: "Nhớ lại câu tiếng Anh...", answer: "What's up?" },
    { id: "L04C07", type: "fill", prompt: "How's it ___?", hint: "Dạo này thế nào?", answer: "going", answerHint: "How's it going?" },
    { id: "L04C08", type: "fill", prompt: "You ___?", hint: "Bạn ổn không?", answer: "good", answerHint: "You good?" },
    { id: "L04C09", type: "fill", prompt: "What's ___?", hint: "Có gì mới không?", answer: "up", answerHint: "What's up?" },
    { id: "L04C10", type: "dialogue", prompt: "Worker: Hi! Welcome!\nCustomer: Hi!\nWorker: How's it going?\nCustomer: I'm good, what's up? I need a fill.\nWorker: You good with Jenny?", hint: "Nhân viên: Chào! Mừng bạn đến!\nKhách: Chào!\nNhân viên: Dạo này thế nào?\nKhách: Tôi ổn, có gì mới không? Tôi cần dặm móng.\nNhân viên: Bạn thấy Jenny làm có ổn không?", answer: "Worker: Hi! Welcome!\nCustomer: Hi!\nWorker: How's it going?\nCustomer: I'm good, what's up? I need a fill.\nWorker: You good with Jenny?" }
  ]
}, {id: "L05",
  title: "Participating in Small Talk",
  titleVi: "Tham Gia Trò Chuyện Ngắn",
  level: "B1",
  context: "Sử dụng những mẫu câu này để trò chuyện một cách tự nhiên với khách hàng trong khi làm móng.",
  phrases: [
    { english: "Not bad, how about you?", vietnamese: "Không tệ, còn bạn thì sao?", pronunciation: "not bad, hao a-baut yu" },
    { english: "Same old, same old.", vietnamese: "Vẫn vậy thôi.", pronunciation: "saim old saim old" },
    { english: "Can't complain!", vietnamese: "Không có gì để phàn nàn!", pronunciation: "kant kum-plain" }
  ],
  drill: [
    { id: "L05C01", type: "read", prompt: "Not bad, how about you?", hint: "Không tệ, còn bạn thì sao?", answer: "Not bad, how about you?" },
    { id: "L05C02", type: "recall", prompt: "Không tệ, còn bạn thì sao?", hint: "Nhớ lại câu tiếng Anh...", answer: "Not bad, how about you?" },
    { id: "L05C03", type: "read", prompt: "Same old, same old.", hint: "Vẫn vậy thôi.", answer: "Same old, same old." },
    { id: "L05C04", type: "recall", prompt: "Vẫn vậy thôi.", hint: "Nhớ lại câu tiếng Anh...", answer: "Same old, same old." },
    { id: "L05C05", type: "read", prompt: "Can't complain!", hint: "Không có gì để phàn nàn!", answer: "Can't complain!" },
    { id: "L05C06", type: "recall", prompt: "Không có gì để phàn nàn!", hint: "Nhớ lại câu tiếng Anh...", answer: "Can't complain!" },
    { id: "L05C07", type: "fill", prompt: "Not bad, how ___ you?", hint: "Không tệ, còn bạn thì sao?", answer: "about", answerHint: "Not bad, how about you?" },
    { id: "L05C08", type: "fill", prompt: "Same old, ___ old.", hint: "Vẫn vậy thôi.", answer: "same", answerHint: "Same old, same old." },
    { id: "L05C09", type: "fill", prompt: "Can't ___!", hint: "Không có gì để phàn nàn!", answer: "complain", answerHint: "Can't complain!" },
    { id: "L05C10", type: "dialogue", prompt: "Customer: How have you been?\nWorker: Not bad, how about you?\nCustomer: Same old, same old.\nWorker: Ha! Can't complain, right?", hint: "Khách: Dạo này bạn thế nào?\nThợ: Không tệ, còn bạn thì sao?\nKhách: Vẫn vậy thôi.\nThợ: Ha! Không có gì để phàn nàn đúng không?", answer: "Customer: How have you been?\nWorker: Not bad, how about you?\nCustomer: Same old, same old.\nWorker: Ha! Can't complain, right?" }
  ]
}, {id: "L06",
  title: "American Slang & Jokes",
  titleVi: "Tiếng Lóng Mỹ & Câu Đùa",
  level: "B2",
  context: "Sử dụng những cụm từ này để làm cho cuộc trò chuyện trở nên thân thiện và hài hước hơn.",
  phrases: [
    { english: "Long time no see!", vietnamese: "Lâu rồi không gặp!", pronunciation: "long taim no si" },
    { english: "You look great!", vietnamese: "Bạn trông tuyệt vời!", pronunciation: "yu luk greit" },
    { english: "I'm dying!", vietnamese: "Tôi chết mất! (cười)", pronunciation: "aim dai-ing" }
  ],
  drill: [
    { id: "L06C01", type: "read", prompt: "Long time no see!", hint: "Lâu rồi không gặp!", answer: "Long time no see!" },
    { id: "L06C02", type: "recall", prompt: "Lâu rồi không gặp!", hint: "Nhớ lại câu tiếng Anh...", answer: "Long time no see!" },
    { id: "L06C03", type: "read", prompt: "You look great!", hint: "Bạn trông tuyệt vời!", answer: "You look great!" },
    { id: "L06C04", type: "recall", prompt: "Bạn trông tuyệt vời!", hint: "Nhớ lại câu tiếng Anh...", answer: "You look great!" },
    { id: "L06C05", type: "read", prompt: "I'm dying!", hint: "Tôi chết mất! (cười)", answer: "I'm dying!" },
    { id: "L06C06", type: "recall", prompt: "Tôi chết mất! (cười)", hint: "Nhớ lại câu tiếng Anh...", answer: "I'm dying!" },
    { id: "L06C07", type: "fill", prompt: "___ time no see!", hint: "Lâu rồi không gặp!", answer: "Long", answerHint: "Long time no see!" },
    { id: "L06C08", type: "fill", prompt: "You ___ great!", hint: "Bạn trông tuyệt vời!", answer: "look", answerHint: "You look great!" },
    { id: "L06C09", type: "fill", prompt: "I'm ___!", hint: "Tôi chết mất!", answer: "dying", answerHint: "I'm dying!" },
    { id: "L06C10", type: "dialogue", prompt: "Customer: Long time no see! How have you been?\nWorker: I've been good! You look great! New hair?\nCustomer: Thanks! This color is killing me though. I'm dying!\nWorker: Ha! It looks amazing!", hint: "Khách: Lâu rồi không gặp! Bạn dạo này thế nào?\nThợ: Tôi vẫn khỏe! Bạn trông tuyệt vời! Tóc mới à?\nKhách: Cảm ơn! Nhưng màu này làm tôi mệt quá. Tôi chết mất!\nThợ: Ha! Nhìn đẹp lắm!", answer: "Customer: Long time no see! How have you been?\nWorker: I've been good! You look great! New hair?\nCustomer: Thanks! This color is killing me though. I'm dying!\nWorker: Ha! It looks amazing!" }
  ]
}, {
  id: "L07",
  title: "Holding Phrases",
  titleVi: "Câu Nói Khi Cần Thêm Thời Gian",
  level: "A1",
  context: "Sử dụng các câu này khi bạn cần thêm một chút thời gian để chuẩn bị hoặc hoàn thành công việc cho khách.",
  phrases: [
    { english: "One moment, please.", vietnamese: "Xin chờ một chút.", pronunciation: "wun moh-ment pleez" },
    { english: "Almost finished.", vietnamese: "Gần xong rồi.", pronunciation: "ol-mohst fin-isht" },
    { english: "Just a second.", vietnamese: "Chỉ một giây thôi.", pronunciation: "juhst uh seh-kuhnd" }
  ],
  drill: [
    { id: "L07C01", type: "read", prompt: "One moment, please.", hint: "Xin chờ một chút.", answer: "One moment, please." },
    { id: "L07C02", type: "recall", prompt: "Xin chờ một chút.", hint: "Nhớ lại câu tiếng Anh...", answer: "One moment, please." },
    { id: "L07C03", type: "read", prompt: "Almost finished.", hint: "Gần xong rồi.", answer: "Almost finished." },
    { id: "L07C04", type: "recall", prompt: "Gần xong rồi.", hint: "Nhớ lại câu tiếng Anh...", answer: "Almost finished." },
    { id: "L07C05", type: "read", prompt: "Just a second.", hint: "Chỉ một giây thôi.", answer: "Just a second." },
    { id: "L07C06", type: "recall", prompt: "Chỉ một giây thôi.", hint: "Nhớ lại câu tiếng Anh...", answer: "Just a second." },
    { id: "L07C07", type: "fill", prompt: "___ moment, please.", hint: "Xin chờ một chút.", answer: "One", answerHint: "One moment, please." },
    { id: "L07C08", type: "fill", prompt: "___ finished.", hint: "Gần xong rồi.", answer: "Almost", answerHint: "Almost finished." },
    { id: "L07C09", type: "fill", prompt: "Just a ___.", hint: "Chỉ một giây thôi.", answer: "second", answerHint: "Just a second." },
    { id: "L07C10", type: "dialogue", prompt: "Customer: Hello, are you ready for me?\nWorker: Just a second. I need to clean the station.\nCustomer: Okay.\nWorker: Almost finished. One moment, please.\nCustomer: No problem.", hint: "Khách: Xin chào, bạn đã sẵn sàng chưa?\nThợ: Chỉ một giây thôi. Tôi cần lau dọn chỗ này.\nKhách: Được thôi.\nThợ: Gần xong rồi. Xin chờ một chút.\nKhách: Không sao.", answer: "Customer: Hello, are you ready for me?\nWorker: Just a second. I need to clean the station.\nCustomer: Okay.\nWorker: Almost finished. One moment, please.\nCustomer: No problem." }
  ]
},
  {
  id: "L08",
  title: "Numbers & Time",
  titleVi: "Số Và Thời Gian",
  level: "A1",
  context: "Học cách nói về số tiền, thời gian chờ đợi và hẹn khách quay lại.",
  phrases: [
    { english: "That will be 35 dollars.", vietnamese: "Hết tất cả là 35 đô la.", pronunciation: "dat wil bi thur-tee faiv da-lerz" },
    { english: "It will take 20 minutes.", vietnamese: "Sẽ mất khoảng 20 phút.", pronunciation: "it wil teik twen-tee mi-nits" },
    { english: "Come back in 15 minutes.", vietnamese: "Quay lại sau 15 phút nhé.", pronunciation: "kum bak in fif-teen mi-nits" }
  ],
  drill: [
    { id: "L08C01", type: "read", prompt: "That will be 35 dollars.", hint: "Hết tất cả là 35 đô la.", answer: "That will be 35 dollars." },
    { id: "L08C02", type: "recall", prompt: "Hết tất cả là 35 đô la.", hint: "Nhớ lại câu tiếng Anh...", answer: "That will be 35 dollars." },
    { id: "L08C03", type: "read", prompt: "It will take 20 minutes.", hint: "Sẽ mất khoảng 20 phút.", answer: "It will take 20 minutes." },
    { id: "L08C04", type: "recall", prompt: "Sẽ mất khoảng 20 phút.", hint: "Nhớ lại câu tiếng Anh...", answer: "It will take 20 minutes." },
    { id: "L08C05", type: "read", prompt: "Come back in 15 minutes.", hint: "Quay lại sau 15 phút nhé.", answer: "Come back in 15 minutes." },
    { id: "L08C06", type: "recall", prompt: "Quay lại sau 15 phút nhé.", hint: "Nhớ lại câu tiếng Anh...", answer: "Come back in 15 minutes." },
    { id: "L08C07", type: "fill", prompt: "That will be 35 ___.", hint: "Hết tất cả là 35 đô la.", answer: "dollars", answerHint: "That will be 35 dollars." },
    { id: "L08C08", type: "fill", prompt: "It will ___ 20 minutes.", hint: "Sẽ mất khoảng 20 phút.", answer: "take", answerHint: "It will take 20 minutes." },
    { id: "L08C09", type: "fill", prompt: "Come ___ in 15 minutes.", hint: "Quay lại sau 15 phút nhé.", answer: "back", answerHint: "Come back in 15 minutes." },
    { id: "L08C10", type: "dialogue", prompt: "Customer: I want a manicure.\nWorker: Okay. It will take 20 minutes. That will be 35 dollars.\nCustomer: Okay, thank you.\nWorker: Come back in 15 minutes after you pay.", hint: "Khách: Tôi muốn làm móng tay.\nThợ: Được thôi. Sẽ mất khoảng 20 phút. Hết tất cả là 35 đô la.\nKhách: Được, cảm ơn.\nThợ: Quay lại sau 15 phút sau khi thanh toán nhé.", answer: "Customer: I want a manicure.\nWorker: Okay. It will take 20 minutes. That will be 35 dollars.\nCustomer: Okay, thank you.\nWorker: Come back in 15 minutes after you pay." }
  ]
},
  {
  id: "L09",
  title: "Asking for Clarification",
  titleVi: "Yêu Cầu Nói Lại Hoặc Chậm Hơn",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn không hiểu khách hàng đang nói gì.",
  phrases: [
    { english: "Could you repeat that, please?", vietnamese: "Bạn có thể lặp lại được không ạ?", pronunciation: "kud yu ri-PEET that pleez" },
    { english: "Can you speak slower, please?", vietnamese: "Bạn có thể nói chậm hơn được không ạ?", pronunciation: "kan yu SPEEK SLO-er pleez" },
    { english: "I'm still learning English.", vietnamese: "Tôi vẫn đang học tiếng Anh.", pronunciation: "aim stil LUR-ning ING-glish" }
  ],
  drill: [
    { id: "L09C01", type: "read", prompt: "Could you repeat that, please?", hint: "Bạn có thể lặp lại được không ạ?", answer: "Could you repeat that, please?" },
    { id: "L09C02", type: "recall", prompt: "Bạn có thể lặp lại được không ạ?", hint: "Nhớ lại câu tiếng Anh...", answer: "Could you repeat that, please?" },
    { id: "L09C03", type: "read", prompt: "Can you speak slower, please?", hint: "Bạn có thể nói chậm hơn được không ạ?", answer: "Can you speak slower, please?" },
    { id: "L09C04", type: "recall", prompt: "Bạn có thể nói chậm hơn được không ạ?", hint: "Nhớ lại câu tiếng Anh...", answer: "Can you speak slower, please?" },
    { id: "L09C05", type: "read", prompt: "I'm still learning English.", hint: "Tôi vẫn đang học tiếng Anh.", answer: "I'm still learning English." },
    { id: "L09C06", type: "recall", prompt: "Tôi vẫn đang học tiếng Anh.", hint: "Nhớ lại câu tiếng Anh...", answer: "I'm still learning English." },
    { id: "L09C07", type: "fill", prompt: "Could you ___ that, please?", hint: "Bạn có thể lặp lại được không ạ?", answer: "repeat", answerHint: "Could you repeat that, please?" },
    { id: "L09C08", type: "fill", prompt: "Can you speak ___, please?", hint: "Bạn có thể nói chậm hơn được không ạ?", answer: "slower", answerHint: "Can you speak slower, please?" },
    { id: "L09C09", type: "fill", prompt: "I'm still ___ English.", hint: "Tôi vẫn đang học tiếng Anh.", answer: "learning", answerHint: "I'm still learning English." },
    { id: "L09C10", type: "dialogue", prompt: "Customer: I want a gel manicure with a French tip and glitter on my ring fingers.\nWorker: I'm still learning English. Could you repeat that, please?\nCustomer: Sure. Gel manicure. French tip. Glitter on ring fingers.\nWorker: Can you speak slower, please?\nCustomer: Gel. Manicure. French. Tip. Glitter. Ring fingers.\nWorker: Okay, I understand now!", hint: "Khách: Tôi muốn làm móng gel kiểu Pháp và kim tuyến ở ngón áp út.\nThợ: Tôi vẫn đang học tiếng Anh. Bạn có thể lặp lại được không ạ?\nKhách: Chắc chắn. Gel. Kiểu Pháp. Kim tuyến ở ngón áp út.\nThợ: Bạn có thể nói chậm hơn được không ạ?\nKhách: Gel. Móng. Kiểu Pháp. Kim tuyến. Ngón áp út.\nThợ: Vâng, tôi hiểu rồi!", answer: "Customer: I want a gel manicure with a French tip and glitter on my ring fingers.\nWorker: I'm still learning English. Could you repeat that, please?\nCustomer: Sure. Gel manicure. French tip. Glitter on ring fingers.\nWorker: Can you speak slower, please?\nCustomer: Gel. Manicure. French. Tip. Glitter. Ring fingers.\nWorker: Okay, I understand now!" }
  ]
}
],
};

export default basicCommunication;