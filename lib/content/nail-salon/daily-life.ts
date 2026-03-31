import type { Class } from '../types';

const dailyLife: Class = {
  id: 'daily-life',
  title: 'Daily Life',
  titleVi: 'Cuộc Sống Hàng Ngày',
  lessons: [{id: "L28",
  title: "At the Grocery Store: Basic English",
  titleVi: "Tại Cửa Hàng Tạp Hóa: Tiếng Anh Cơ Bản",
  level: "A1",
  context: "Sử dụng những mẫu câu này khi bạn đi mua sắm ở cửa hàng tạp hóa.",
  phrases: [
    {
      english: "How much is this?",
      vietnamese: "Cái này bao nhiêu tiền?",
      pronunciation: "hao much iz this"
    },
    {
      english: "I need some milk.",
      vietnamese: "Tôi cần một ít sữa.",
      pronunciation: "ai need sum milk"
    },
    {
      english: "Where are the eggs?",
      vietnamese: "Trứng ở đâu?",
      pronunciation: "we-ah ah the eggs"
    }
  ],
  drill: [
    {
      id: "L28C01",
      type: "read",
      prompt: "How much is this?",
      hint: "Cái này bao nhiêu tiền?",
      answer: "How much is this?"
    },
    {
      id: "L28C02",
      type: "recall",
      prompt: "Cái này bao nhiêu tiền?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How much is this?"
    },
    {
      id: "L28C03",
      type: "read",
      prompt: "I need some milk.",
      hint: "Tôi cần một ít sữa.",
      answer: "I need some milk."
    },
    {
      id: "L28C04",
      type: "recall",
      prompt: "Tôi cần một ít sữa.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I need some milk."
    },
    {
      id: "L28C05",
      type: "read",
      prompt: "Where are the eggs?",
      hint: "Trứng ở đâu?",
      answer: "Where are the eggs?"
    },
    {
      id: "L28C06",
      type: "recall",
      prompt: "Trứng ở đâu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Where are the eggs?"
    },
    {
      id: "L28C07",
      type: "fill",
      prompt: "How ___ is this?",
      hint: "Cái này bao nhiêu tiền?",
      answer: "much",
      answerHint: "How much is this?"
    },
    {
      id: "L28C08",
      type: "fill",
      prompt: "I ___ some milk.",
      hint: "Tôi cần một ít sữa.",
      answer: "need",
      answerHint: "I need some milk."
    },
    {
      id: "L28C09",
      type: "fill",
      prompt: "Where are the ___?",
      hint: "Trứng ở đâu?",
      answer: "eggs",
      answerHint: "Where are the eggs?"
    },
    {
      id: "L28C10",
      type: "dialogue",
      prompt: "You: How much is this milk?\nWorker: It's $3.\nYou: I need some milk. Where are the eggs?\nWorker: Aisle 4!",
      hint: "Bạn: Sữa này bao nhiêu tiền?\nNhân viên: 3 đô.\nBạn: Tôi cần một ít sữa. Trứng ở đâu?\nNhân viên: Lối đi số 4!",
      answer: "You: How much is this milk?\nWorker: It's $3.\nYou: I need some milk. Where are the eggs?\nWorker: Aisle 4!"
    }
  ]
},
 {id: "L29",
  title: "At the Doctor: Basic English",
  titleVi: "Tại phòng khám bác sĩ: Tiếng Anh cơ bản",
  level: "A1",
  context: "Sử dụng những mẫu câu này khi bạn đi khám bác sĩ.",
  phrases: [
    {
      english: "I have a headache.",
      vietnamese: "Tôi bị đau đầu.",
      pronunciation: "ai hev uh heh-ake"
    },
    {
      english: "Where does it hurt?",
      vietnamese: "Bạn bị đau ở đâu?",
      pronunciation: "wer duz it hurt"
    },
    {
      english: "I need some medicine.",
      vietnamese: "Tôi cần một ít thuốc.",
      pronunciation: "ai nid sum meh-di-sin"
    }
  ],
  drill: [
    {
      id: "L29C01",
      type: "read",
      prompt: "I have a headache.",
      hint: "Tôi bị đau đầu.",
      answer: "I have a headache."
    },
    {
      id: "L29C02",
      type: "recall",
      prompt: "Tôi bị đau đầu.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I have a headache."
    },
    {
      id: "L29C03",
      type: "read",
      prompt: "Where does it hurt?",
      hint: "Bạn bị đau ở đâu?",
      answer: "Where does it hurt?"
    },
    {
      id: "L29C04",
      type: "recall",
      prompt: "Bạn bị đau ở đâu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Where does it hurt?"
    },
    {
      id: "L29C05",
      type: "read",
      prompt: "I need some medicine.",
      hint: "Tôi cần một ít thuốc.",
      answer: "I need some medicine."
    },
    {
      id: "L29C06",
      type: "recall",
      prompt: "Tôi cần một ít thuốc.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I need some medicine."
    },
    {
      id: "L29C07",
      type: "fill",
      prompt: "I have a ___.",
      hint: "Tôi bị đau đầu.",
      answer: "headache",
      answerHint: "I have a headache."
    },
    {
      id: "L29C08",
      type: "fill",
      prompt: "Where does it ___?",
      hint: "Bạn bị đau ở đâu?",
      answer: "hurt",
      answerHint: "Where does it hurt?"
    },
    {
      id: "L29C09",
      type: "fill",
      prompt: "I ___ some medicine.",
      hint: "Tôi cần một ít thuốc.",
      answer: "need",
      answerHint: "I need some medicine."
    },
    {
      id: "L29C10",
      type: "dialogue",
      prompt: "Doctor: What's wrong?\nYou: I have a headache.\nDoctor: Where does it hurt?\nYou: Here, behind my eyes.\nDoctor: How long?\nYou: Two days. I need some medicine.\nDoctor: Okay, I'll give you something.",
      hint: "Bác sĩ: Bạn bị sao vậy?\nBạn: Tôi bị đau đầu.\nBác sĩ: Bạn đau ở đâu?\nBạn: Ở đây, sau mắt tôi.\nBác sĩ: Bao lâu rồi?\nBạn: Hai ngày rồi. Tôi cần một ít thuốc.\nBác sĩ: Được, tôi sẽ cho bạn thuốc.",
      answer: "Doctor: What's wrong?\nYou: I have a headache.\nDoctor: Where does it hurt?\nYou: Here, behind my eyes.\nDoctor: How long?\nYou: Two days. I need some medicine.\nDoctor: Okay, I'll give you something."
    }
  ]
},
 {id: "L30",
  title: "Making Small Talk Anywhere",
  titleVi: "Nói chuyện xã giao ở mọi nơi",
  level: "A2",
  context: "Sử dụng những mẫu câu này để bắt đầu một cuộc trò chuyện ngắn với khách hàng hoặc người lạ.",
  phrases: [
    {
      english: "How's your day going?",
      vietnamese: "Ngày của bạn thế nào?",
      pronunciation: "hao-z yor day go-ing"
    },
    {
      english: "Nice weather today, right?",
      vietnamese: "Thời tiết hôm nay đẹp nhỉ?",
      pronunciation: "nais weh-ther tuh-day, rait?"
    },
    {
      english: "Busy day at the salon?",
      vietnamese: "Hôm nay tiệm có đông khách không?",
      pronunciation: "bi-zee day at thuh suh-lon?"
    }
  ],
  drill: [
    {
      id: "L30C01",
      type: "read",
      prompt: "How's your day going?",
      hint: "Ngày của bạn thế nào?",
      answer: "How's your day going?"
    },
    {
      id: "L30C02",
      type: "recall",
      prompt: "Ngày của bạn thế nào?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How's your day going?"
    },
    {
      id: "L30C03",
      type: "read",
      prompt: "Nice weather today, right?",
      hint: "Thời tiết hôm nay đẹp nhỉ?",
      answer: "Nice weather today, right?"
    },
    {
      id: "L30C04",
      type: "recall",
      prompt: "Thời tiết hôm nay đẹp nhỉ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Nice weather today, right?"
    },
    {
      id: "L30C05",
      type: "read",
      prompt: "Busy day at the salon?",
      hint: "Hôm nay tiệm có đông khách không?",
      answer: "Busy day at the salon?"
    },
    {
      id: "L30C06",
      type: "recall",
      prompt: "Hôm nay tiệm có đông khách không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Busy day at the salon?"
    },
    {
      id: "L30C07",
      type: "fill",
      prompt: "How's ___ day going?",
      hint: "Ngày của bạn thế nào?",
      answer: "your",
      answerHint: "How's your day going?"
    },
    {
      id: "L30C08",
      type: "fill",
      prompt: "Nice ___ today, right?",
      hint: "Thời tiết hôm nay đẹp nhỉ?",
      answer: "weather",
      answerHint: "Nice weather today, right?"
    },
    {
      id: "L30C09",
      type: "fill",
      prompt: "Busy day at the ___?",
      hint: "Hôm nay tiệm có đông khách không?",
      answer: "salon",
      answerHint: "Busy day at the salon?"
    },
    {
      id: "L30C10",
      type: "dialogue",
      prompt: "Worker: How's your day going?\nCustomer: Good! Nice weather today, right?\nWorker: Busy day at the salon!",
      hint: "Thợ: Ngày của bạn thế nào?\nKhách: Tốt! Thời tiết hôm nay đẹp nhỉ?\nThợ: Hôm nay tiệm đông khách lắm!",
      answer: "Worker: How's your day going?\nCustomer: Good! Nice weather today, right?\nWorker: Busy day at the salon!"
    }
  ]
},
  {
  id: "L31",
  title: "Basic Grocery Phrases",
  titleVi: "Các câu cơ bản ở siêu thị",
  level: "A1",
  context: "Sử dụng những câu này khi bạn đi mua sắm ở siêu thị để hỏi đường, giá cả và cảm ơn.",
  phrases: [
    {
      english: "Where is the milk?",
      vietnamese: "Sữa ở đâu ạ?",
      pronunciation: "Wer iz the milk?"
    },
    {
      english: "How much is this?",
      vietnamese: "Cái này bao nhiêu tiền?",
      pronunciation: "How much iz this?"
    },
    {
      english: "Do you have eggs?",
      vietnamese: "Bạn có trứng không?",
      pronunciation: "Do you hav eggs?"
    }
  ],
  drill: [
    {
      id: "L31C01",
      type: "read",
      prompt: "Where is the milk?",
      hint: "Sữa ở đâu ạ?",
      answer: "Where is the milk?"
    },
    {
      id: "L31C02",
      type: "recall",
      prompt: "Sữa ở đâu ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Where is the milk?"
    },
    {
      id: "L31C03",
      type: "read",
      prompt: "How much is this?",
      hint: "Cái này bao nhiêu tiền?",
      answer: "How much is this?"
    },
    {
      id: "L31C04",
      type: "recall",
      prompt: "Cái này bao nhiêu tiền?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How much is this?"
    },
    {
      id: "L31C05",
      type: "read",
      prompt: "Do you have eggs?",
      hint: "Bạn có trứng không?",
      answer: "Do you have eggs?"
    },
    {
      id: "L31C06",
      type: "recall",
      prompt: "Bạn có trứng không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Do you have eggs?"
    },
    {
      id: "L31C07",
      type: "fill",
      prompt: "Where ___ the milk?",
      hint: "Sữa ở đâu ạ?",
      answer: "is",
      answerHint: "Where is the milk?"
    },
    {
      id: "L31C08",
      type: "fill",
      prompt: "How ___ is this?",
      hint: "Cái này bao nhiêu tiền?",
      answer: "much",
      answerHint: "How much is this?"
    },
    {
      id: "L31C09",
      type: "fill",
      prompt: "Do you have ___?",
      hint: "Bạn có trứng không?",
      answer: "eggs",
      answerHint: "Do you have eggs?"
    },
    {
      id: "L31C10",
      type: "dialogue",
      prompt: "You: Excuse me, where is the milk?\nWorker: It's in aisle 5.\nYou: Thank you. Do you have eggs?\nWorker: Yes, aisle 3.\nYou: How much is this?\nWorker: That's $3.50.",
      hint: "Bạn: Xin lỗi, sữa ở đâu ạ?\nNhân viên: Ở lối đi số 5.\nBạn: Cảm ơn. Bạn có trứng không?\nNhân viên: Có, lối đi số 3.\nBạn: Cái này bao nhiêu tiền?\nNhân viên: Cái đó 3 đô la rưỡi.",
      answer: "You: Excuse me, where is the milk?\nWorker: It's in aisle 5.\nYou: Thank you. Do you have eggs?\nWorker: Yes, aisle 3.\nYou: How much is this?\nWorker: That's $3.50."
    }
  ]
},
  {
  id: "L32",
  title: "Basic Phrases at the Doctor",
  titleVi: "Các câu cơ bản ở phòng khám bác sĩ",
  level: "A1",
  context: "Sử dụng những câu này khi bạn không cảm thấy khỏe và cần đi khám bác sĩ.",
  phrases: [
    {
      english: "I don't feel well.",
      vietnamese: "Tôi không khỏe.",
      pronunciation: "Ai dont feel well"
    },
    {
      english: "Where does it hurt?",
      vietnamese: "Bạn đau ở đâu?",
      pronunciation: "Wer duz it hurt?"
    },
    {
      english: "I need medicine.",
      vietnamese: "Tôi cần thuốc.",
      pronunciation: "Ai need med-sin"
    }
  ],
  drill: [
    {
      id: "L32C01",
      type: "read",
      prompt: "I don't feel well.",
      hint: "Tôi không khỏe.",
      answer: "I don't feel well."
    },
    {
      id: "L32C02",
      type: "recall",
      prompt: "Tôi không khỏe.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I don't feel well."
    },
    {
      id: "L32C03",
      type: "read",
      prompt: "Where does it hurt?",
      hint: "Bạn đau ở đâu?",
      answer: "Where does it hurt?"
    },
    {
      id: "L32C04",
      type: "recall",
      prompt: "Bạn đau ở đâu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Where does it hurt?"
    },
    {
      id: "L32C05",
      type: "read",
      prompt: "I need medicine.",
      hint: "Tôi cần thuốc.",
      answer: "I need medicine."
    },
    {
      id: "L32C06",
      type: "recall",
      prompt: "Tôi cần thuốc.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I need medicine."
    },
    {
      id: "L32C07",
      type: "fill",
      prompt: "I don't feel ___.",
      hint: "Tôi không khỏe.",
      answer: "well",
      answerHint: "I don't feel well."
    },
    {
      id: "L32C08",
      type: "fill",
      prompt: "Where does it ___?",
      hint: "Bạn đau ở đâu?",
      answer: "hurt",
      answerHint: "Where does it hurt?"
    },
    {
      id: "L32C09",
      type: "fill",
      prompt: "I ___ medicine.",
      hint: "Tôi cần thuốc.",
      answer: "need",
      answerHint: "I need medicine."
    },
    {
      id: "L32C10",
      type: "dialogue",
      prompt: "Doctor: Hello, what's wrong?\nYou: I don't feel well.\nDoctor: Where does it hurt? I will give you medicine.",
      hint: "Bác sĩ: Xin chào, bạn bị sao vậy?\nBạn: Tôi không khỏe.\nBác sĩ: Bạn đau ở đâu? Tôi sẽ cho bạn thuốc.",
      answer: "Doctor: Hello, what's wrong?\nYou: I don't feel well.\nDoctor: Where does it hurt? I will give you medicine."
    }
  ]
},
  {
  id: "L33",
  title: "Making Small Talk: Nice Day, Good Morning",
  titleVi: "Nói chuyện xã giao: Ngày đẹp trời, Chào buổi sáng",
  level: "A1",
  context: "Sử dụng những câu này để bắt đầu một cuộc trò chuyện ngắn với hàng xóm hoặc người lạ ở Mỹ.",
  phrases: [
    {
      english: "Good morning!",
      vietnamese: "Chào buổi sáng!",
      pronunciation: "Good MOR-ning!"
    },
    {
      english: "Nice day, isn't it?",
      vietnamese: "Ngày đẹp trời phải không?",
      pronunciation: "NICE day, IZ-ent it?"
    },
    {
      english: "How are you?",
      vietnamese: "Bạn khỏe không?",
      pronunciation: "How ARE you?"
    }
  ],
  drill: [
    {
      id: "L33C01",
      type: "read",
      prompt: "Good morning!",
      hint: "Chào buổi sáng!",
      answer: "Good morning!"
    },
    {
      id: "L33C02",
      type: "recall",
      prompt: "Chào buổi sáng!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Good morning!"
    },
    {
      id: "L33C03",
      type: "read",
      prompt: "Nice day, isn't it?",
      hint: "Ngày đẹp trời phải không?",
      answer: "Nice day, isn't it?"
    },
    {
      id: "L33C04",
      type: "recall",
      prompt: "Ngày đẹp trời phải không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Nice day, isn't it?"
    },
    {
      id: "L33C05",
      type: "read",
      prompt: "How are you?",
      hint: "Bạn khỏe không?",
      answer: "How are you?"
    },
    {
      id: "L33C06",
      type: "recall",
      prompt: "Bạn khỏe không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How are you?"
    },
    {
      id: "L33C07",
      type: "fill",
      prompt: "Good ___!",
      hint: "Chào buổi sáng!",
      answer: "morning",
      answerHint: "Good morning!"
    },
    {
      id: "L33C08",
      type: "fill",
      prompt: "Nice ___, isn't it?",
      hint: "Ngày đẹp trời phải không?",
      answer: "day",
      answerHint: "Nice day, isn't it?"
    },
    {
      id: "L33C09",
      type: "fill",
      prompt: "How ___ you?",
      hint: "Bạn khỏe không?",
      answer: "are",
      answerHint: "How are you?"
    },
    {
      id: "L33C10",
      type: "dialogue",
      prompt: "Worker: Good morning!\nCustomer: Good morning! How are you?\nWorker: I'm good. Nice day, isn't it?",
      hint: "Thợ: Chào buổi sáng!\nKhách: Chào buổi sáng! Bạn khỏe không?\nThợ: Tôi khỏe. Ngày đẹp trời phải không?",
      answer: "Worker: Good morning!\nCustomer: Good morning! How are you?\nWorker: I'm good. Nice day, isn't it?"
    }
  ]
},
  {
  id: "L34",
  title: "At the Pharmacy",
  titleVi: "Ở Tiệm Thuốc",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn đi mua thuốc ở tiệm thuốc tây, có toa thuốc hoặc không.",
  phrases: [
    {
      english: "I have a prescription.",
      vietnamese: "Tôi có toa thuốc.",
      pronunciation: "ai hav uh preh-SKRIP-shun."
    },
    {
      english: "Can I buy this over-the-counter?",
      vietnamese: "Tôi có thể mua cái này không cần toa thuốc không?",
      pronunciation: "kan ai bai this OH-ver-thuh-KOWN-ter?"
    },
    {
      english: "How often should I take it?",
      vietnamese: "Tôi nên uống thuốc này bao lâu một lần?",
      pronunciation: "hao OF-en shud ai tayk it?"
    }
  ],
  drill: [
    {
      id: "L34C01",
      type: "read",
      prompt: "I have a prescription.",
      hint: "Tôi có toa thuốc.",
      answer: "I have a prescription."
    },
    {
      id: "L34C02",
      type: "recall",
      prompt: "Tôi có toa thuốc.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I have a prescription."
    },
    {
      id: "L34C03",
      type: "read",
      prompt: "Can I buy this over-the-counter?",
      hint: "Tôi có thể mua cái này không cần toa thuốc không?",
      answer: "Can I buy this over-the-counter?"
    },
    {
      id: "L34C04",
      type: "recall",
      prompt: "Tôi có thể mua cái này không cần toa thuốc không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can I buy this over-the-counter?"
    },
    {
      id: "L34C05",
      type: "read",
      prompt: "How often should I take it?",
      hint: "Tôi nên uống thuốc này bao lâu một lần?",
      answer: "How often should I take it?"
    },
    {
      id: "L34C06",
      type: "recall",
      prompt: "Tôi nên uống thuốc này bao lâu một lần?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How often should I take it?"
    },
    {
      id: "L34C07",
      type: "fill",
      prompt: "I have a ___.",
      hint: "Tôi có toa thuốc.",
      answer: "prescription",
      answerHint: "I have a prescription."
    },
    {
      id: "L34C08",
      type: "fill",
      prompt: "Can I buy this ___?",
      hint: "Tôi có thể mua cái này không cần toa thuốc không?",
      answer: "over-the-counter",
      answerHint: "Can I buy this over-the-counter?"
    },
    {
      id: "L34C09",
      type: "fill",
      prompt: "How often should I ___ it?",
      hint: "Tôi nên uống thuốc này bao lâu một lần?",
      answer: "take",
      answerHint: "How often should I take it?"
    },
    {
      id: "L34C10",
      type: "dialogue",
      prompt: "Pharmacist: Hello, can I help you?\nYou: Yes, I have a prescription.\nPharmacist: Okay, one moment.\nYou: Can I buy this over-the-counter?\nPharmacist: Yes, that one is over-the-counter.\nYou: How often should I take it?\nPharmacist: Twice a day, after meals.",
      hint: "Dược sĩ: Xin chào, tôi có thể giúp gì cho bạn?\nBạn: Vâng, tôi có toa thuốc.\nDược sĩ: Được rồi, đợi một chút.\nBạn: Tôi có thể mua cái này không cần toa thuốc không?\nDược sĩ: Được, cái đó không cần toa.\nBạn: Tôi nên uống thuốc này bao lâu một lần?\nDược sĩ: Hai lần một ngày, sau bữa ăn.",
      answer: "Pharmacist: Hello, can I help you?\nYou: Yes, I have a prescription.\nPharmacist: Okay, one moment.\nYou: Can I buy this over-the-counter?\nPharmacist: Yes, that one is over-the-counter.\nYou: How often should I take it?\nPharmacist: Twice a day, after meals."
    }
  ]
},
  {
  id: "L35",
  title: "Asking for Help in a Store",
  titleVi: "Hỏi xin giúp đỡ trong cửa hàng",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn cần tìm một món đồ cụ thể hoặc hỏi đường trong một cửa hàng.",
  phrases: [
    {
      english: "Excuse me, can you help me?",
      vietnamese: "Xin lỗi, bạn có thể giúp tôi được không?",
      pronunciation: "Ek-skyuz mee, kan yoo help mee?"
    },
    {
      english: "I'm looking for...",
      vietnamese: "Tôi đang tìm...",
      pronunciation: "Aym look-ing for..."
    },
    {
      english: "Where is the...?",
      vietnamese: "... ở đâu vậy?",
      pronunciation: "Wair iz the...?"
    }
  ],
  drill: [
    {
      id: "L35C01",
      type: "read",
      prompt: "Excuse me, can you help me?",
      hint: "Xin lỗi, bạn có thể giúp tôi được không?",
      answer: "Excuse me, can you help me?"
    },
    {
      id: "L35C02",
      type: "recall",
      prompt: "Xin lỗi, bạn có thể giúp tôi được không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Excuse me, can you help me?"
    },
    {
      id: "L35C03",
      type: "read",
      prompt: "I'm looking for...",
      hint: "Tôi đang tìm...",
      answer: "I'm looking for..."
    },
    {
      id: "L35C04",
      type: "recall",
      prompt: "Tôi đang tìm...",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I'm looking for..."
    },
    {
      id: "L35C05",
      type: "read",
      prompt: "Where is the...?",
      hint: "... ở đâu vậy?",
      answer: "Where is the...?"
    },
    {
      id: "L35C06",
      type: "recall",
      prompt: "... ở đâu vậy?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Where is the...?"
    },
    {
      id: "L35C07",
      type: "fill",
      prompt: "Excuse me, can you ___ me?",
      hint: "Xin lỗi, bạn có thể giúp tôi được không?",
      answer: "help",
      answerHint: "Excuse me, can you help me?"
    },
    {
      id: "L35C08",
      type: "fill",
      prompt: "I'm ___ for...",
      hint: "Tôi đang tìm...",
      answer: "looking",
      answerHint: "I'm looking for..."
    },
    {
      id: "L35C09",
      type: "fill",
      prompt: "Where ___ the...?",
      hint: "... ở đâu vậy?",
      answer: "is",
      answerHint: "Where is the...?"
    },
    {
      id: "L35C10",
      type: "dialogue",
      prompt: "Worker: Excuse me, can you help me?\nCustomer: Sure, what do you need?\nWorker: I'm looking for cuticle oil. Where is the nail care section?",
      hint: "Thợ: Xin lỗi, bạn có thể giúp tôi được không?\nKhách: Chắc chắn rồi, bạn cần gì?\nThợ: Tôi đang tìm dầu biểu bì. Khu vực chăm sóc móng ở đâu vậy?",
      answer: "Worker: Excuse me, can you help me?\nCustomer: Sure, what do you need?\nWorker: I'm looking for cuticle oil. Where is the nail care section?"
    }
  ]
},
  {
  id: "L36",
  title: "American Small Talk",
  titleVi: "Nói chuyện xã giao kiểu Mỹ",
  level: "A2",
  context: "Sử dụng những câu này để bắt đầu cuộc trò chuyện ngắn với khách hàng.",
  phrases: [
    {
      english: "Nice weather today, right?",
      vietnamese: "Thời tiết hôm nay đẹp nhỉ?",
      pronunciation: "nais weh-ther tuh-day, rait?"
    },
    {
      english: "How was your weekend?",
      vietnamese: "Cuối tuần của bạn thế nào?",
      pronunciation: "hau woz yor wee-kend?"
    },
    {
      english: "Are your kids in school?",
      vietnamese: "Các con bạn có đi học không?",
      pronunciation: "ar yor kidz in skool?"
    }
  ],
  drill: [
    {
      id: "L36C01",
      type: "read",
      prompt: "Nice weather today, right?",
      hint: "Thời tiết hôm nay đẹp nhỉ?",
      answer: "Nice weather today, right?"
    },
    {
      id: "L36C02",
      type: "recall",
      prompt: "Thời tiết hôm nay đẹp nhỉ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Nice weather today, right?"
    },
    {
      id: "L36C03",
      type: "read",
      prompt: "How was your weekend?",
      hint: "Cuối tuần của bạn thế nào?",
      answer: "How was your weekend?"
    },
    {
      id: "L36C04",
      type: "recall",
      prompt: "Cuối tuần của bạn thế nào?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How was your weekend?"
    },
    {
      id: "L36C05",
      type: "read",
      prompt: "Are your kids in school?",
      hint: "Các con bạn có đi học không?",
      answer: "Are your kids in school?"
    },
    {
      id: "L36C06",
      type: "recall",
      prompt: "Các con bạn có đi học không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Are your kids in school?"
    },
    {
      id: "L36C07",
      type: "fill",
      prompt: "Nice ___ today, right?",
      hint: "Thời tiết hôm nay đẹp nhỉ?",
      answer: "weather",
      answerHint: "Nice weather today, right?"
    },
    {
      id: "L36C08",
      type: "fill",
      prompt: "How was your ___?",
      hint: "Cuối tuần của bạn thế nào?",
      answer: "weekend",
      answerHint: "How was your weekend?"
    },
    {
      id: "L36C09",
      type: "fill",
      prompt: "Are your ___ in school?",
      hint: "Các con bạn có đi học không?",
      answer: "kids",
      answerHint: "Are your kids in school?"
    },
    {
      id: "L36C10",
      type: "dialogue",
      prompt: "Worker: Nice weather today, right?\nCustomer: Yes, it's beautiful!\nWorker: How was your weekend?",
      hint: "Thợ: Thời tiết hôm nay đẹp nhỉ?\nKhách: Vâng, rất đẹp!\nThợ: Cuối tuần của bạn thế nào?",
      answer: "Worker: Nice weather today, right?\nCustomer: Yes, it's beautiful!\nWorker: How was your weekend?"
    }
  ]
}
  ]
};

export default dailyLife;
