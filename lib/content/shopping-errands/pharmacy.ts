import type { Class } from '../types';

const data: Class = {
  id: "pharmacy",
  title: "Pharmacy",
  titleVi: "Tiếng Anh Tại Hiệu Thuốc",
  lessons: [
  {
  id: "L117",
  title: "Pick Up Medicine",
  titleVi: "Nhận thuốc",
  level: "A1",
  context: "Sử dụng các cụm từ này khi bạn đến nhà thuốc để nhận thuốc theo toa bác sĩ.",
  phrases: [
    {
      english: "I'm here to pick up medication.",
      vietnamese: "Tôi đến để lấy thuốc.",
      pronunciation: "ime heer too pik up med-i-kay-shun"
    },
    {
      english: "My last name is Nguyen.",
      vietnamese: "Họ của tôi là Nguyễn.",
      pronunciation: "mai last naym iz nguyen"
    },
    {
      english: "Is it ready?",
      vietnamese: "Thuốc đã sẵn sàng chưa?",
      pronunciation: "iz it red-ee"
    }
  ],
  drill: [
    {
      id: "L117C01",
      type: "read",
      prompt: "I'm here to pick up medication.",
      hint: "Tôi đến để lấy thuốc.",
      answer: "I'm here to pick up medication."
    },
    {
      id: "L117C02",
      type: "recall",
      prompt: "Tôi đến để lấy thuốc.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I'm here to pick up medication."
    },
    {
      id: "L117C03",
      type: "read",
      prompt: "My last name is Nguyen.",
      hint: "Họ của tôi là Nguyễn.",
      answer: "My last name is Nguyen."
    },
    {
      id: "L117C04",
      type: "recall",
      prompt: "Họ của tôi là Nguyễn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "My last name is Nguyen."
    },
    {
      id: "L117C05",
      type: "read",
      prompt: "Is it ready?",
      hint: "Thuốc đã sẵn sàng chưa?",
      answer: "Is it ready?"
    },
    {
      id: "L117C06",
      type: "recall",
      prompt: "Thuốc đã sẵn sàng chưa?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is it ready?"
    },
    {
      id: "L117C07",
      type: "fill",
      prompt: "I'm here to pick up ___.",
      hint: "Tôi đến để lấy thuốc.",
      answer: "medication",
      answerHint: "I'm here to pick up medication."
    },
    {
      id: "L117C08",
      type: "fill",
      prompt: "My last ___ is Nguyen.",
      hint: "Họ của tôi là Nguyễn.",
      answer: "name",
      answerHint: "My last name is Nguyen."
    },
    {
      id: "L117C09",
      type: "fill",
      prompt: "Is ___ ready?",
      hint: "Thuốc đã sẵn sàng chưa?",
      answer: "it",
      answerHint: "Is it ready?"
    },
    {
      id: "L117C10",
      type: "dialogue",
      prompt: "Worker: Can I help you?\nCustomer: I'm here to pick up medication.\nWorker: What is your last name?",
      hint: "Thợ: Tôi có thể giúp gì cho bạn?\nKhách: Tôi đến để lấy thuốc.\nThợ: Họ của bạn là gì?",
      answer: "Worker: Can I help you?\nCustomer: I'm here to pick up medication.\nWorker: What is your last name?"
    }
  ]
},
  {
  id: "L118",
  title: "Medicine Instructions: How Often?",
  titleVi: "Hướng dẫn sử dụng thuốc: Uống bao lâu một lần?",
  level: "A1",
  context: "Bạn có thể dùng những mẫu câu này khi hỏi dược sĩ về cách dùng thuốc của bạn.",
  phrases: [
    {
      english: "How many times a day?",
      vietnamese: "Uống bao nhiêu lần một ngày?",
      pronunciation: "hao men-ee taimz uh day?"
    },
    {
      english: "Take it with food?",
      vietnamese: "Uống thuốc với thức ăn?",
      pronunciation: "teik it with food?"
    },
    {
      english: "Before or after eating?",
      vietnamese: "Uống trước hay sau khi ăn?",
      pronunciation: "bee-for or af-ter eet-ing?"
    }
  ],
  drill: [
    {
      id: "L118C01",
      type: "read",
      prompt: "How many times a day?",
      hint: "Uống bao nhiêu lần một ngày?",
      answer: "How many times a day?"
    },
    {
      id: "L118C02",
      type: "recall",
      prompt: "Uống bao nhiêu lần một ngày?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How many times a day?"
    },
    {
      id: "L118C03",
      type: "read",
      prompt: "Take it with food?",
      hint: "Uống thuốc với thức ăn?",
      answer: "Take it with food?"
    },
    {
      id: "L118C04",
      type: "recall",
      prompt: "Uống thuốc với thức ăn?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Take it with food?"
    },
    {
      id: "L118C05",
      type: "read",
      prompt: "Before or after eating?",
      hint: "Uống trước hay sau khi ăn?",
      answer: "Before or after eating?"
    },
    {
      id: "L118C06",
      type: "recall",
      prompt: "Uống trước hay sau khi ăn?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Before or after eating?"
    },
    {
      id: "L118C07",
      type: "fill",
      prompt: "How many ___ a day?",
      hint: "Uống bao nhiêu lần một ngày?",
      answer: "times",
      answerHint: "How many times a day?"
    },
    {
      id: "L118C08",
      type: "fill",
      prompt: "Take it with ___?",
      hint: "Uống thuốc với thức ăn?",
      answer: "food",
      answerHint: "Take it with food?"
    },
    {
      id: "L118C09",
      type: "fill",
      prompt: "___ or after eating?",
      hint: "Uống trước hay sau khi ăn?",
      answer: "Before",
      answerHint: "Before or after eating?"
    },
    {
      id: "L118C10",
      type: "dialogue",
      prompt: "Worker: Hello, how can I help you?\nCustomer: Yes, how many times a day?\nWorker: Take it once a day.",
      hint: "Thợ: Xin chào, tôi có thể giúp gì cho bạn?\nKhách: Vâng, uống bao nhiêu lần một ngày?\nThợ: Uống một lần một ngày.",
      answer: "Worker: Hello, how can I help you?\nCustomer: Yes, how many times a day?\nWorker: Take it once a day."
    }
  ]
},
  {
  id: "L119",
  title: "Buying Medicine: Symptoms",
  titleVi: "Mua Thuốc: Triệu Chứng",
  level: "A2",
  context: "Sử dụng những mẫu câu này để mô tả triệu chứng bệnh của bạn khi mua thuốc không cần toa ở Mỹ.",
  phrases: [
    {
      english: "I have a headache.",
      vietnamese: "Tôi bị đau đầu.",
      pronunciation: "ai hav uh heh-dayk"
    },
    {
      english: "I have a sore throat.",
      vietnamese: "Tôi bị đau họng.",
      pronunciation: "ai hav uh sor throt"
    },
    {
      english: "I have a bad cough.",
      vietnamese: "Tôi bị ho nặng.",
      pronunciation: "ai hav uh bad kof"
    }
  ],
  drill: [
    {
      id: "L119C01",
      type: "read",
      prompt: "I have a headache.",
      hint: "Tôi bị đau đầu.",
      answer: "I have a headache."
    },
    {
      id: "L119C02",
      type: "recall",
      prompt: "Tôi bị đau đầu.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I have a headache."
    },
    {
      id: "L119C03",
      type: "read",
      prompt: "I have a sore throat.",
      hint: "Tôi bị đau họng.",
      answer: "I have a sore throat."
    },
    {
      id: "L119C04",
      type: "recall",
      prompt: "Tôi bị đau họng.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I have a sore throat."
    },
    {
      id: "L119C05",
      type: "read",
      prompt: "I have a bad cough.",
      hint: "Tôi bị ho nặng.",
      answer: "I have a bad cough."
    },
    {
      id: "L119C06",
      type: "recall",
      prompt: "Tôi bị ho nặng.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I have a bad cough."
    },
    {
      id: "L119C07",
      type: "fill",
      prompt: "I have a ___.",
      hint: "Tôi bị đau đầu.",
      answer: "headache",
      answerHint: "I have a headache."
    },
    {
      id: "L119C08",
      type: "fill",
      prompt: "I have a sore ___.",
      hint: "Tôi bị đau họng.",
      answer: "throat",
      answerHint: "I have a sore throat."
    },
    {
      id: "L119C09",
      type: "fill",
      prompt: "I have a bad ___.",
      hint: "Tôi bị ho nặng.",
      answer: "cough",
      answerHint: "I have a bad cough."
    },
    {
      id: "L119C10",
      type: "dialogue",
      prompt: "Worker: What's wrong?\nCustomer: I have a headache.\nWorker: I can help you with that.",
      hint: "Thợ: Có chuyện gì vậy?\nKhách: Tôi bị đau đầu.\nThợ: Tôi có thể giúp bạn.",
      answer: "Worker: What's wrong?\nCustomer: I have a headache.\nWorker: I can help you with that."
    }
  ]
},
  {
  id: "L120",
  title: "Medicine Label Instructions",
  titleVi: "Hướng Dẫn Trên Nhãn Thuốc",
  level: "A2",
  context: "Bạn sẽ sử dụng những cụm từ này khi đọc hướng dẫn sử dụng thuốc để đảm bảo bạn dùng thuốc đúng cách.",
  phrases: [
    {
      english: "Take twice daily.",
      vietnamese: "Uống hai lần mỗi ngày.",
      pronunciation: "teyk twais dey-lee"
    },
    {
      english: "Do not exceed 4 tablets.",
      vietnamese: "Không uống quá 4 viên.",
      pronunciation: "doo not ek-seed for tab-lets"
    },
    {
      english: "Keep refrigerated.",
      vietnamese: "Giữ lạnh.",
      pronunciation: "keep ree-fri-juh-rey-ted"
    }
  ],
  drill: [
    {
      id: "L120C01",
      type: "read",
      prompt: "Take twice daily.",
      hint: "Uống hai lần mỗi ngày.",
      answer: "Take twice daily."
    },
    {
      id: "L120C02",
      type: "recall",
      prompt: "Uống hai lần mỗi ngày.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Take twice daily."
    },
    {
      id: "L120C03",
      type: "read",
      prompt: "Do not exceed 4 tablets.",
      hint: "Không uống quá 4 viên.",
      answer: "Do not exceed 4 tablets."
    },
    {
      id: "L120C04",
      type: "recall",
      prompt: "Không uống quá 4 viên.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Do not exceed 4 tablets."
    },
    {
      id: "L120C05",
      type: "read",
      prompt: "Keep refrigerated.",
      hint: "Giữ lạnh.",
      answer: "Keep refrigerated."
    },
    {
      id: "L120C06",
      type: "recall",
      prompt: "Giữ lạnh.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Keep refrigerated."
    },
    {
      id: "L120C07",
      type: "fill",
      prompt: "Take twice ___.",
      hint: "Uống hai lần mỗi ngày.",
      answer: "daily",
      answerHint: "Take twice daily."
    },
    {
      id: "L120C08",
      type: "fill",
      prompt: "Do not exceed ___ tablets.",
      hint: "Không uống quá 4 viên.",
      answer: "4",
      answerHint: "Do not exceed 4 tablets."
    },
    {
      id: "L120C09",
      type: "fill",
      prompt: "Keep ___.",
      hint: "Giữ lạnh.",
      answer: "refrigerated",
      answerHint: "Keep refrigerated."
    },
    {
      id: "L120C10",
      type: "dialogue",
      prompt: "Worker: How do I take this medicine?\nCustomer: Take twice daily.\nWorker: Okay, thank you!",
      hint: "Thợ: Tôi nên uống thuốc này như thế nào?\nKhách: Uống hai lần mỗi ngày.\nThợ: Được rồi, cảm ơn!",
      answer: "Worker: How do I take this medicine?\nCustomer: Take twice daily.\nWorker: Okay, thank you!"
    }
  ]
},
  {
  id: "L121",
  title: "Pharmacy: Insurance and Copay",
  titleVi: "Nhà thuốc: Bảo hiểm và Đồng chi trả",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn muốn hỏi về bảo hiểm và chi phí đồng chi trả tại nhà thuốc.",
  phrases: [
    {
      english: "How much is my copay?",
      vietnamese: "Tôi phải trả bao nhiêu tiền đồng chi trả?",
      pronunciation: "hau much iz mai ko-pay?"
    },
    {
      english: "Is this covered by insurance?",
      vietnamese: "Thuốc này có được bảo hiểm chi trả không?",
      pronunciation: "iz this kuh-verd bai in-shur-uhns?"
    },
    {
      english: "I have [insurance name] insurance.",
      vietnamese: "Tôi có bảo hiểm [tên bảo hiểm].",
      pronunciation: "ai hav [insurance name] in-shur-uhns."
    }
  ],
  drill: [
    {
      id: "L121C01",
      type: "read",
      prompt: "How much is my copay?",
      hint: "Tôi phải trả bao nhiêu tiền đồng chi trả?",
      answer: "How much is my copay?"
    },
    {
      id: "L121C02",
      type: "recall",
      prompt: "Tôi phải trả bao nhiêu tiền đồng chi trả?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How much is my copay?"
    },
    {
      id: "L121C03",
      type: "read",
      prompt: "Is this covered by insurance?",
      hint: "Thuốc này có được bảo hiểm chi trả không?",
      answer: "Is this covered by insurance?"
    },
    {
      id: "L121C04",
      type: "recall",
      prompt: "Thuốc này có được bảo hiểm chi trả không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is this covered by insurance?"
    },
    {
      id: "L121C05",
      type: "read",
      prompt: "I have [insurance name] insurance.",
      hint: "Tôi có bảo hiểm [tên bảo hiểm].",
      answer: "I have [insurance name] insurance."
    },
    {
      id: "L121C06",
      type: "recall",
      prompt: "Tôi có bảo hiểm [tên bảo hiểm].",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I have [insurance name] insurance."
    },
    {
      id: "L121C07",
      type: "fill",
      prompt: "How much is my ___?",
      hint: "Tôi phải trả bao nhiêu tiền đồng chi trả?",
      answer: "copay",
      answerHint: "How much is my copay?"
    },
    {
      id: "L121C08",
      type: "fill",
      prompt: "Is this covered by ___?",
      hint: "Thuốc này có được bảo hiểm chi trả không?",
      answer: "insurance",
      answerHint: "Is this covered by insurance?"
    },
    {
      id: "L121C09",
      type: "fill",
      prompt: "I have [insurance name] ___.",
      hint: "Tôi có bảo hiểm [tên bảo hiểm].",
      answer: "insurance",
      answerHint: "I have [insurance name] insurance."
    },
    {
      id: "L121C10",
      type: "dialogue",
      prompt: "Worker: Hello, how can I help you?\nCustomer: I have a prescription to pick up.\nWorker: Do you have insurance?",
      hint: "Nhân viên: Xin chào, tôi có thể giúp gì cho bạn?\nKhách hàng: Tôi có một đơn thuốc cần lấy.\nNhân viên: Bạn có bảo hiểm không?",
      answer: "Worker: Hello, how can I help you?\nCustomer: I have a prescription to pick up.\nWorker: Do you have insurance?"
    }
  ]
},
  {
  id: "L122",
  title: "Generic or Brand Name?",
  titleVi: "Thuốc generic hay thuốc hiệu?",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi bạn muốn hỏi dược sĩ về thuốc generic và thuốc có giá rẻ hơn.",
  phrases: [
    {
      english: "Is there a generic version?",
      vietnamese: "Có phiên bản thuốc generic không?",
      pronunciation: "iz ther uh jeh-neh-rik vur-zhun"
    },
    {
      english: "Is there a cheaper alternative?",
      vietnamese: "Có loại thuốc thay thế nào rẻ hơn không?",
      pronunciation: "iz ther uh chee-per al-tur-nuh-tiv"
    },
    {
      english: "Same ingredients, different brand?",
      vietnamese: "Thành phần giống nhau, nhãn hiệu khác?",
      pronunciation: "seym in-gree-dee-ents, dif-fer-ent brand"
    }
  ],
  drill: [
    {
      id: "L122C01",
      type: "read",
      prompt: "Is there a generic version?",
      hint: "Có phiên bản thuốc generic không?",
      answer: "Is there a generic version?"
    },
    {
      id: "L122C02",
      type: "recall",
      prompt: "Có phiên bản thuốc generic không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is there a generic version?"
    },
    {
      id: "L122C03",
      type: "read",
      prompt: "Is there a cheaper alternative?",
      hint: "Có loại thuốc thay thế nào rẻ hơn không?",
      answer: "Is there a cheaper alternative?"
    },
    {
      id: "L122C04",
      type: "recall",
      prompt: "Có loại thuốc thay thế nào rẻ hơn không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is there a cheaper alternative?"
    },
    {
      id: "L122C05",
      type: "read",
      prompt: "Same ingredients, different brand?",
      hint: "Thành phần giống nhau, nhãn hiệu khác?",
      answer: "Same ingredients, different brand?"
    },
    {
      id: "L122C06",
      type: "recall",
      prompt: "Thành phần giống nhau, nhãn hiệu khác?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Same ingredients, different brand?"
    },
    {
      id: "L122C07",
      type: "fill",
      prompt: "Is there a ___ version?",
      hint: "Có phiên bản thuốc generic không?",
      answer: "generic",
      answerHint: "Is there a generic version?"
    },
    {
      id: "L122C08",
      type: "fill",
      prompt: "Is there a cheaper ___?",
      hint: "Có loại thuốc thay thế nào rẻ hơn không?",
      answer: "alternative",
      answerHint: "Is there a cheaper alternative?"
    },
    {
      id: "L122C09",
      type: "fill",
      prompt: "Same ___, different brand?",
      hint: "Thành phần giống nhau, nhãn hiệu khác?",
      answer: "ingredients",
      answerHint: "Same ingredients, different brand?"
    },
    {
      id: "L122C10",
      type: "dialogue",
      prompt: "Worker: Is there a generic version?\nCustomer: Yes, we have a generic option for that.\nWorker: Same ingredients, different brand?",
      hint: "Thợ: Có phiên bản thuốc generic không?\nKhách: Có, chúng tôi có một lựa chọn generic cho loại thuốc đó.\nThợ: Thành phần giống nhau, nhãn hiệu khác?",
      answer: "Worker: Is there a generic version?\nCustomer: Yes, we have a generic option for that.\nWorker: Same ingredients, different brand?"
    }
  ]
},
  {
  id: "L123",
  title: "Refilling Prescriptions",
  titleVi: "Gia Hạn Đơn Thuốc",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn cần gia hạn đơn thuốc và cần dược sĩ liên hệ với bác sĩ của bạn.",
  phrases: [
    {
      english: "I need a refill.",
      vietnamese: "Tôi cần gia hạn đơn thuốc.",
      pronunciation: "ai need uh ree-fil"
    },
    {
      english: "Can you call my doctor?",
      vietnamese: "Bạn có thể gọi cho bác sĩ của tôi không?",
      pronunciation: "kan yoo kawl mai dok-ter"
    },
    {
      english: "I need authorization.",
      vietnamese: "Tôi cần sự cho phép.",
      pronunciation: "ai need aw-thuh-ri-zey-shuhn"
    }
  ],
  drill: [
    {
      id: "L123C01",
      type: "read",
      prompt: "I need a refill.",
      hint: "Tôi cần gia hạn đơn thuốc.",
      answer: "I need a refill."
    },
    {
      id: "L123C02",
      type: "recall",
      prompt: "Tôi cần gia hạn đơn thuốc.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I need a refill."
    },
    {
      id: "L123C03",
      type: "read",
      prompt: "Can you call my doctor?",
      hint: "Bạn có thể gọi cho bác sĩ của tôi không?",
      answer: "Can you call my doctor?"
    },
    {
      id: "L123C04",
      type: "recall",
      prompt: "Bạn có thể gọi cho bác sĩ của tôi không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can you call my doctor?"
    },
    {
      id: "L123C05",
      type: "read",
      prompt: "I need authorization.",
      hint: "Tôi cần sự cho phép.",
      answer: "I need authorization."
    },
    {
      id: "L123C06",
      type: "recall",
      prompt: "Tôi cần sự cho phép.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I need authorization."
    },
    {
      id: "L123C07",
      type: "fill",
      prompt: "I need a ___.",
      hint: "Tôi cần gia hạn đơn thuốc.",
      answer: "refill",
      answerHint: "I need a refill."
    },
    {
      id: "L123C08",
      type: "fill",
      prompt: "Can you call my ___?",
      hint: "Bạn có thể gọi cho bác sĩ của tôi không?",
      answer: "doctor",
      answerHint: "Can you call my doctor?"
    },
    {
      id: "L123C09",
      type: "fill",
      prompt: "I need ___.",
      hint: "Tôi cần sự cho phép.",
      answer: "authorization",
      answerHint: "I need authorization."
    },
    {
      id: "L123C10",
      type: "dialogue",
      prompt: "Worker: I need a refill, can you call my doctor?\nCustomer: Yes, I can. What's your name and date of birth?\nWorker: My name is [Name] and my birthday is [Date].",
      hint: "Thợ: Tôi cần gia hạn đơn thuốc, bạn có thể gọi cho bác sĩ của tôi không?\nKhách: Được, tôi có thể. Tên và ngày sinh của bạn là gì?\nThợ: Tên tôi là [Tên] và sinh nhật của tôi là [Ngày].",
      answer: "Worker: I need a refill, can you call my doctor?\nCustomer: Yes, I can. What's your name and date of birth?\nWorker: My name is [Name] and my birthday is [Date]."
    }
  ]
},
  {
  id: "L124",
  title: "Medication Questions",
  titleVi: "Hỏi Về Thuốc",
  level: "B1",
  context: "Sử dụng các câu này khi bạn muốn hỏi dược sĩ hoặc bác sĩ về thuốc của bạn.",
  phrases: [
    {
      english: "Will this make me drowsy?",
      vietnamese: "Thuốc này có làm tôi buồn ngủ không?",
      pronunciation: "wil this mayk mee draow-zee?"
    },
    {
      english: "Can I take this with...?",
      vietnamese: "Tôi có thể uống thuốc này với... được không?",
      pronunciation: "kan ai tayk this with...?"
    },
    {
      english: "What are the side effects?",
      vietnamese: "Tác dụng phụ của thuốc này là gì?",
      pronunciation: "wot ar thuh said ee-fekts?"
    }
  ],
  drill: [
    {
      id: "L124C01",
      type: "read",
      prompt: "Will this make me drowsy?",
      hint: "Thuốc này có làm tôi buồn ngủ không?",
      answer: "Will this make me drowsy?"
    },
    {
      id: "L124C02",
      type: "recall",
      prompt: "Thuốc này có làm tôi buồn ngủ không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Will this make me drowsy?"
    },
    {
      id: "L124C03",
      type: "read",
      prompt: "Can I take this with...?",
      hint: "Tôi có thể uống thuốc này với... được không?",
      answer: "Can I take this with...?"
    },
    {
      id: "L124C04",
      type: "recall",
      prompt: "Tôi có thể uống thuốc này với... được không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can I take this with...?"
    },
    {
      id: "L124C05",
      type: "read",
      prompt: "What are the side effects?",
      hint: "Tác dụng phụ của thuốc này là gì?",
      answer: "What are the side effects?"
    },
    {
      id: "L124C06",
      type: "recall",
      prompt: "Tác dụng phụ của thuốc này là gì?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What are the side effects?"
    },
    {
      id: "L124C07",
      type: "fill",
      prompt: "Will this make me ___?",
      hint: "Thuốc này có làm tôi buồn ngủ không?",
      answer: "drowsy",
      answerHint: "Will this make me drowsy?"
    },
    {
      id: "L124C08",
      type: "fill",
      prompt: "Can I take this ___...?",
      hint: "Tôi có thể uống thuốc này với... được không?",
      answer: "with",
      answerHint: "Can I take this with...?"
    },
    {
      id: "L124C09",
      type: "fill",
      prompt: "What are the side ___?",
      hint: "Tác dụng phụ của thuốc này là gì?",
      answer: "effects",
      answerHint: "What are the side effects?"
    },
    {
      id: "L124C10",
      type: "dialogue",
      prompt: "Worker: Can I take this with food?\nCustomer: Yes, you can. It's better with food.\nWorker: What are the side effects?",
      hint: "Thợ: Tôi có thể uống thuốc này với thức ăn được không?\nKhách: Được, bạn có thể. Uống với thức ăn thì tốt hơn.\nThợ: Tác dụng phụ của thuốc này là gì?",
      answer: "Worker: Can I take this with food?\nCustomer: Yes, you can. It's better with food.\nWorker: What are the side effects?"
    }
  ]
},
  {
  id: "L125",
  title: "Flu Shot Pharmacy",
  titleVi: "Tiêm ngừa cúm ở tiệm thuốc",
  level: "B1",
  context: "Sử dụng các cụm từ này khi bạn đi tiêm ngừa cúm tại tiệm thuốc.",
  phrases: [
    {
      english: "Do I need an appointment?",
      vietnamese: "Tôi có cần hẹn trước không?",
      pronunciation: "doo ai need an uh-point-ment"
    },
    {
      english: "Which arm do you prefer?",
      vietnamese: "Bạn thích tiêm tay nào?",
      pronunciation: "wich ahm doo yoo pre-fur"
    },
    {
      english: "Is there any side effect?",
      vietnamese: "Có tác dụng phụ nào không?",
      pronunciation: "iz thair eh-nee side ee-fect"
    }
  ],
  drill: [
    {
      id: "L125C01",
      type: "read",
      prompt: "Do I need an appointment?",
      hint: "Tôi có cần hẹn trước không?",
      answer: "Do I need an appointment?"
    },
    {
      id: "L125C02",
      type: "recall",
      prompt: "Tôi có cần hẹn trước không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Do I need an appointment?"
    },
    {
      id: "L125C03",
      type: "read",
      prompt: "Which arm do you prefer?",
      hint: "Bạn thích tiêm tay nào?",
      answer: "Which arm do you prefer?"
    },
    {
      id: "L125C04",
      type: "recall",
      prompt: "Bạn thích tiêm tay nào?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Which arm do you prefer?"
    },
    {
      id: "L125C05",
      type: "read",
      prompt: "Is there any side effect?",
      hint: "Có tác dụng phụ nào không?",
      answer: "Is there any side effect?"
    },
    {
      id: "L125C06",
      type: "recall",
      prompt: "Có tác dụng phụ nào không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is there any side effect?"
    },
    {
      id: "L125C07",
      type: "fill",
      prompt: "Do I need an ___?",
      hint: "Tôi có cần hẹn trước không?",
      answer: "appointment",
      answerHint: "Do I need an appointment?"
    },
    {
      id: "L125C08",
      type: "fill",
      prompt: "Which ___ do you prefer?",
      hint: "Bạn thích tiêm tay nào?",
      answer: "arm",
      answerHint: "Which arm do you prefer?"
    },
    {
      id: "L125C09",
      type: "fill",
      prompt: "Is there any side ___?",
      hint: "Có tác dụng phụ nào không?",
      answer: "effect",
      answerHint: "Is there any side effect?"
    },
    {
      id: "L125C10",
      type: "dialogue",
      prompt: "Worker: Which arm do you prefer?\nCustomer: My left arm, please.\nWorker: Okay, all done.",
      hint: "Thợ: Bạn thích tiêm tay nào?\nKhách: Tay trái của tôi, làm ơn.\nThợ: Được rồi, xong rồi.",
      answer: "Worker: Which arm do you prefer?\nCustomer: My left arm, please.\nWorker: Okay, all done."
    }
  ]
}
  ]
};

export default data;
