import type { Class } from '../types';

const data: Class = {
  id: "neighbors-building",
  title: "Neighbors & Building",
  titleVi: "Hàng Xóm Và Tòa Nhà",
  lessons: [
  {
  id: "L180",
  title: "Meeting New Neighbors",
  titleVi: "Gặp Gỡ Hàng Xóm Mới",
  level: "A1",
  context: "Sử dụng những câu này khi bạn mới chuyển đến và muốn chào hỏi hàng xóm.",
  phrases: [
    {
      english: "Hi, we just moved in!",
      vietnamese: "Chào, chúng tôi vừa mới chuyển đến!",
      pronunciation: "Hai, wee just moovd in!"
    },
    {
      english: "I'm from Vietnam.",
      vietnamese: "Tôi đến từ Việt Nam.",
      pronunciation: "Ahm from Vee-et-nahm."
    },
    {
      english: "Nice to meet you!",
      vietnamese: "Rất vui được gặp bạn!",
      pronunciation: "Nais too meet yoo!"
    }
  ],
  drill: [
    {
      id: "L180C01",
      type: "read",
      prompt: "Hi, we just moved in!",
      hint: "Chào, chúng tôi vừa mới chuyển đến!",
      answer: "Hi, we just moved in!"
    },
    {
      id: "L180C02",
      type: "recall",
      prompt: "Chào, chúng tôi vừa mới chuyển đến!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Hi, we just moved in!"
    },
    {
      id: "L180C03",
      type: "read",
      prompt: "I'm from Vietnam.",
      hint: "Tôi đến từ Việt Nam.",
      answer: "I'm from Vietnam."
    },
    {
      id: "L180C04",
      type: "recall",
      prompt: "Tôi đến từ Việt Nam.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I'm from Vietnam."
    },
    {
      id: "L180C05",
      type: "read",
      prompt: "Nice to meet you!",
      hint: "Rất vui được gặp bạn!",
      answer: "Nice to meet you!"
    },
    {
      id: "L180C06",
      type: "recall",
      prompt: "Rất vui được gặp bạn!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Nice to meet you!"
    },
    {
      id: "L180C07",
      type: "fill",
      prompt: "Hi, we just ___ in!",
      hint: "Chào, chúng tôi vừa mới chuyển đến!",
      answer: "moved",
      answerHint: "Hi, we just moved in!"
    },
    {
      id: "L180C08",
      type: "fill",
      prompt: "I'm from ___.",
      hint: "Tôi đến từ Việt Nam.",
      answer: "Vietnam",
      answerHint: "I'm from Vietnam."
    },
    {
      id: "L180C09",
      type: "fill",
      prompt: "Nice to meet ___!",
      hint: "Rất vui được gặp bạn!",
      answer: "you",
      answerHint: "Nice to meet you!"
    },
    {
      id: "L180C10",
      type: "dialogue",
      prompt: "Worker: Hi, we just moved in!\nCustomer: Welcome to the neighborhood!\nWorker: Nice to meet you!",
      hint: "Thợ: Chào, chúng tôi vừa mới chuyển đến!\nKhách: Chào mừng đến khu phố!\nThợ: Rất vui được gặp bạn!",
      answer: "Worker: Hi, we just moved in!\nCustomer: Welcome to the neighborhood!\nWorker: Nice to meet you!"
    }
  ]
},
  {
  id: "L181",
  title: "Noise Complaint: Nicely",
  titleVi: "Phàn nàn về tiếng ồn: Lịch sự",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn muốn yêu cầu ai đó giảm tiếng ồn một cách lịch sự.",
  phrases: [
    {
      english: "Excuse me, it's late.",
      vietnamese: "Xin lỗi, đã khuya rồi.",
      pronunciation: "ek-skyooz mee, its layt"
    },
    {
      english: "Could you keep it down?",
      vietnamese: "Bạn có thể giữ yên lặng được không?",
      pronunciation: "kood yoo keep it down"
    },
    {
      english: "The music is very loud.",
      vietnamese: "Nhạc rất ồn.",
      pronunciation: "thuh myoo-zik iz veh-ree loud"
    }
  ],
  drill: [
    {
      id: "L181C01",
      type: "read",
      prompt: "Excuse me, it's late.",
      hint: "Xin lỗi, đã khuya rồi.",
      answer: "Excuse me, it's late."
    },
    {
      id: "L181C02",
      type: "recall",
      prompt: "Xin lỗi, đã khuya rồi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Excuse me, it's late."
    },
    {
      id: "L181C03",
      type: "read",
      prompt: "Could you keep it down?",
      hint: "Bạn có thể giữ yên lặng được không?",
      answer: "Could you keep it down?"
    },
    {
      id: "L181C04",
      type: "recall",
      prompt: "Bạn có thể giữ yên lặng được không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Could you keep it down?"
    },
    {
      id: "L181C05",
      type: "read",
      prompt: "The music is very loud.",
      hint: "Nhạc rất ồn.",
      answer: "The music is very loud."
    },
    {
      id: "L181C06",
      type: "recall",
      prompt: "Nhạc rất ồn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "The music is very loud."
    },
    {
      id: "L181C07",
      type: "fill",
      prompt: "Excuse me, it's ___.",
      hint: "Xin lỗi, đã khuya rồi.",
      answer: "late",
      answerHint: "Excuse me, it's late."
    },
    {
      id: "L181C08",
      type: "fill",
      prompt: "Could you keep it ___?",
      hint: "Bạn có thể giữ yên lặng được không?",
      answer: "down",
      answerHint: "Could you keep it down?"
    },
    {
      id: "L181C09",
      type: "fill",
      prompt: "The ___ is very loud.",
      hint: "Nhạc rất ồn.",
      answer: "music",
      answerHint: "The music is very loud."
    },
    {
      id: "L181C10",
      type: "dialogue",
      prompt: "Worker: Excuse me, it's late.\nCustomer: Oh, I'm sorry.\nWorker: Could you keep it down?",
      hint: "Thợ: Xin lỗi, đã khuya rồi.\nKhách: Ồ, tôi xin lỗi.\nThợ: Bạn có thể giữ yên lặng được không?",
      answer: "Worker: Excuse me, it's late.\nCustomer: Oh, I'm sorry.\nWorker: Could you keep it down?"
    }
  ]
},
  {
  id: "L182",
  title: "Requesting Apartment Repairs",
  titleVi: "Yêu cầu sửa chữa căn hộ",
  level: "A2",
  context: "Sử dụng các cụm từ này khi bạn cần yêu cầu chủ nhà sửa chữa các vấn đề trong căn hộ của bạn.",
  phrases: [
    {
      english: "My sink is leaking.",
      vietnamese: "Bồn rửa của tôi bị rò rỉ.",
      pronunciation: "mai sink iz lee-king"
    },
    {
      english: "The AC isn't working.",
      vietnamese: "Máy lạnh không hoạt động.",
      pronunciation: "thuh ay-see iz-unt wur-king"
    },
    {
      english: "When can you fix it?",
      vietnamese: "Khi nào bạn có thể sửa nó?",
      pronunciation: "wen kan yoo fiks it"
    }
  ],
  drill: [
    {
      id: "L182C01",
      type: "read",
      prompt: "My sink is leaking.",
      hint: "Bồn rửa của tôi bị rò rỉ.",
      answer: "My sink is leaking."
    },
    {
      id: "L182C02",
      type: "recall",
      prompt: "Bồn rửa của tôi bị rò rỉ.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "My sink is leaking."
    },
    {
      id: "L182C03",
      type: "read",
      prompt: "The AC isn't working.",
      hint: "Máy lạnh không hoạt động.",
      answer: "The AC isn't working."
    },
    {
      id: "L182C04",
      type: "recall",
      prompt: "Máy lạnh không hoạt động.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "The AC isn't working."
    },
    {
      id: "L182C05",
      type: "read",
      prompt: "When can you fix it?",
      hint: "Khi nào bạn có thể sửa nó?",
      answer: "When can you fix it?"
    },
    {
      id: "L182C06",
      type: "recall",
      prompt: "Khi nào bạn có thể sửa nó?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "When can you fix it?"
    },
    {
      id: "L182C07",
      type: "fill",
      prompt: "My ___ is leaking.",
      hint: "Bồn rửa của tôi bị rò rỉ.",
      answer: "sink",
      answerHint: "My sink is leaking."
    },
    {
      id: "L182C08",
      type: "fill",
      prompt: "The ___ isn't working.",
      hint: "Máy lạnh không hoạt động.",
      answer: "AC",
      answerHint: "The AC isn't working."
    },
    {
      id: "L182C09",
      type: "fill",
      prompt: "When can you ___ it?",
      hint: "Khi nào bạn có thể sửa nó?",
      answer: "fix",
      answerHint: "When can you fix it?"
    },
    {
      id: "L182C10",
      type: "dialogue",
      prompt: "Worker: Hello, I have a problem in my apartment.\nCustomer: What is the problem?\nWorker: My sink is leaking. When can you fix it?",
      hint: "Thợ: Xin chào, tôi có một vấn đề trong căn hộ của tôi.\nKhách: Vấn đề là gì?\nThợ: Bồn rửa của tôi bị rò rỉ. Khi nào bạn có thể sửa nó?",
      answer: "Worker: Hello, I have a problem in my apartment.\nCustomer: What is the problem?\nWorker: My sink is leaking. When can you fix it?"
    }
  ]
},
  {
  id: "L183",
  title: "Building Rules: Asking",
  titleVi: "Hỏi về Nội Quy Tòa Nhà",
  level: "A1",
  context: "Sử dụng những câu này khi bạn muốn hỏi về nội quy của tòa nhà nơi bạn sống.",
  phrases: [
    {
      english: "Where do I put trash?",
      vietnamese: "Tôi đổ rác ở đâu?",
      pronunciation: "wer doo ai put trash"
    },
    {
      english: "Is parking free here?",
      vietnamese: "Đỗ xe ở đây có miễn phí không?",
      pronunciation: "iz park-ing free heer"
    },
    {
      english: "When is laundry open?",
      vietnamese: "Phòng giặt mở cửa khi nào?",
      pronunciation: "wen iz lawn-dree oh-pen"
    }
  ],
  drill: [
    {
      id: "L183C01",
      type: "read",
      prompt: "Where do I put trash?",
      hint: "Tôi đổ rác ở đâu?",
      answer: "Where do I put trash?"
    },
    {
      id: "L183C02",
      type: "recall",
      prompt: "Tôi đổ rác ở đâu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Where do I put trash?"
    },
    {
      id: "L183C03",
      type: "read",
      prompt: "Is parking free here?",
      hint: "Đỗ xe ở đây có miễn phí không?",
      answer: "Is parking free here?"
    },
    {
      id: "L183C04",
      type: "recall",
      prompt: "Đỗ xe ở đây có miễn phí không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is parking free here?"
    },
    {
      id: "L183C05",
      type: "read",
      prompt: "When is laundry open?",
      hint: "Phòng giặt mở cửa khi nào?",
      answer: "When is laundry open?"
    },
    {
      id: "L183C06",
      type: "recall",
      prompt: "Phòng giặt mở cửa khi nào?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "When is laundry open?"
    },
    {
      id: "L183C07",
      type: "fill",
      prompt: "Where do I put ___?",
      hint: "Tôi đổ rác ở đâu?",
      answer: "trash",
      answerHint: "Where do I put trash?"
    },
    {
      id: "L183C08",
      type: "fill",
      prompt: "Is ___ free here?",
      hint: "Đỗ xe ở đây có miễn phí không?",
      answer: "parking",
      answerHint: "Is parking free here?"
    },
    {
      id: "L183C09",
      type: "fill",
      prompt: "When is ___ open?",
      hint: "Phòng giặt mở cửa khi nào?",
      answer: "laundry",
      answerHint: "When is laundry open?"
    },
    {
      id: "L183C10",
      type: "dialogue",
      prompt: "Worker: Where do I put trash?\nCustomer: In the green bins.\nWorker: Thank you!",
      hint: "Thợ: Tôi đổ rác ở đâu?\nKhách: Ở thùng màu xanh.\nThợ: Cảm ơn!",
      answer: "Worker: Where do I put trash?\nCustomer: In the green bins.\nWorker: Thank you!"
    }
  ]
},
  {
  id: "L184",
  title: "Borrowing from Neighbors",
  titleVi: "Mượn đồ của hàng xóm",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn muốn mượn một vật gì đó từ hàng xóm của mình.",
  phrases: [
    {
      english: "Can I borrow a ladder?",
      vietnamese: "Tôi có thể mượn cái thang được không?",
      pronunciation: "kan ai bo-ro a la-der?"
    },
    {
      english: "Do you have jumper cables?",
      vietnamese: "Bạn có dây câu bình ắc quy không?",
      pronunciation: "doo yoo hav jom-per kay-bolz?"
    },
    {
      english: "I'll return it tomorrow.",
      vietnamese: "Tôi sẽ trả lại vào ngày mai.",
      pronunciation: "ail ree-turn it too-mor-row."
    }
  ],
  drill: [
    {
      id: "L184C01",
      type: "read",
      prompt: "Can I borrow a ladder?",
      hint: "Tôi có thể mượn cái thang được không?",
      answer: "Can I borrow a ladder?"
    },
    {
      id: "L184C02",
      type: "recall",
      prompt: "Tôi có thể mượn cái thang được không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can I borrow a ladder?"
    },
    {
      id: "L184C03",
      type: "read",
      prompt: "Do you have jumper cables?",
      hint: "Bạn có dây câu bình ắc quy không?",
      answer: "Do you have jumper cables?"
    },
    {
      id: "L184C04",
      type: "recall",
      prompt: "Bạn có dây câu bình ắc quy không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Do you have jumper cables?"
    },
    {
      id: "L184C05",
      type: "read",
      prompt: "I'll return it tomorrow.",
      hint: "Tôi sẽ trả lại vào ngày mai.",
      answer: "I'll return it tomorrow."
    },
    {
      id: "L184C06",
      type: "recall",
      prompt: "Tôi sẽ trả lại vào ngày mai.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I'll return it tomorrow."
    },
    {
      id: "L184C07",
      type: "fill",
      prompt: "Can I borrow a ___?",
      hint: "Tôi có thể mượn cái thang được không?",
      answer: "ladder",
      answerHint: "Can I borrow a ladder?"
    },
    {
      id: "L184C08",
      type: "fill",
      prompt: "Do you have ___ cables?",
      hint: "Bạn có dây câu bình ắc quy không?",
      answer: "jumper",
      answerHint: "Do you have jumper cables?"
    },
    {
      id: "L184C09",
      type: "fill",
      prompt: "I'll return it ___.",
      hint: "Tôi sẽ trả lại vào ngày mai.",
      answer: "tomorrow",
      answerHint: "I'll return it tomorrow."
    },
    {
      id: "L184C10",
      type: "dialogue",
      prompt: "Worker: Hello, do you have jumper cables?\nCustomer: Yes, I do. Here you go.\nWorker: Thank you! I'll return them tomorrow.",
      hint: "Thợ: Xin chào, bạn có dây câu bình ắc quy không?\nKhách: Có, tôi có. Của bạn đây.\nThợ: Cảm ơn! Tôi sẽ trả lại chúng vào ngày mai.",
      answer: "Worker: Hello, do you have jumper cables?\nCustomer: Yes, I do. Here you go.\nWorker: Thank you! I'll return them tomorrow."
    }
  ]
},
  {
  id: "L185",
  title: "Package Delivery Problems",
  titleVi: "Các vấn đề về giao hàng",
  level: "A2",
  context: "Sử dụng những cụm từ này khi bạn gặp vấn đề với việc giao hàng, ví dụ như nhận nhầm hàng hoặc hàng bị mất.",
  phrases: [
    {
      english: "Did I get your package?",
      vietnamese: "Tôi có nhận nhầm gói hàng của bạn không?",
      pronunciation: "did ai get yor pak-ij?"
    },
    {
      english: "My package was stolen.",
      vietnamese: "Gói hàng của tôi bị đánh cắp.",
      pronunciation: "mai pak-ij woz sto-len"
    },
    {
      english: "I didn't receive my package.",
      vietnamese: "Tôi đã không nhận được gói hàng của mình.",
      pronunciation: "ai di-dent ree-seev mai pak-ij"
    }
  ],
  drill: [
    {
      id: "L185C01",
      type: "read",
      prompt: "Did I get your package?",
      hint: "Tôi có nhận nhầm gói hàng của bạn không?",
      answer: "Did I get your package?"
    },
    {
      id: "L185C02",
      type: "recall",
      prompt: "Tôi có nhận nhầm gói hàng của bạn không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Did I get your package?"
    },
    {
      id: "L185C03",
      type: "read",
      prompt: "My package was stolen.",
      hint: "Gói hàng của tôi bị đánh cắp.",
      answer: "My package was stolen."
    },
    {
      id: "L185C04",
      type: "recall",
      prompt: "Gói hàng của tôi bị đánh cắp.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "My package was stolen."
    },
    {
      id: "L185C05",
      type: "read",
      prompt: "I didn't receive my package.",
      hint: "Tôi đã không nhận được gói hàng của mình.",
      answer: "I didn't receive my package."
    },
    {
      id: "L185C06",
      type: "recall",
      prompt: "Tôi đã không nhận được gói hàng của mình.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I didn't receive my package."
    },
    {
      id: "L185C07",
      type: "fill",
      prompt: "Did I get your ___?",
      hint: "Tôi có nhận nhầm gói hàng của bạn không?",
      answer: "package",
      answerHint: "Did I get your package?"
    },
    {
      id: "L185C08",
      type: "fill",
      prompt: "My ___ was stolen.",
      hint: "Gói hàng của tôi bị đánh cắp.",
      answer: "package",
      answerHint: "My package was stolen."
    },
    {
      id: "L185C09",
      type: "fill",
      prompt: "I didn't ___ my package.",
      hint: "Tôi đã không nhận được gói hàng của mình.",
      answer: "receive",
      answerHint: "I didn't receive my package."
    },
    {
      id: "L185C10",
      type: "dialogue",
      prompt: "Worker: Did I get your package by mistake?\nCustomer: Maybe. What's the name on it?\nWorker: It says 'Nguyen'.",
      hint: "Thợ: Tôi có nhận nhầm gói hàng của bạn không?\nKhách: Có thể. Tên trên đó là gì?\nThợ: Trên đó ghi là 'Nguyen'.",
      answer: "Worker: Did I get your package by mistake?\nCustomer: Maybe. What's the name on it?\nWorker: It says 'Nguyen'."
    }
  ]
},
  {
  id: "L186",
  title: "Neighborly Small Talk",
  titleVi: "Nói chuyện xã giao với hàng xóm",
  level: "B1",
  context: "Sử dụng những câu này để bắt đầu một cuộc trò chuyện ngắn và thân thiện với hàng xóm của bạn.",
  phrases: [
    {
      english: "How's your garden growing?",
      vietnamese: "Vườn của bác/cô/anh/chị trồng thế nào rồi ạ?",
      pronunciation: "hauz yor gar-dn gro-ing?"
    },
    {
      english: "Your dog is so cute!",
      vietnamese: "Con chó của bác/cô/anh/chị dễ thương quá!",
      pronunciation: "yor dog iz so kyoot!"
    },
    {
      english: "Did you see the storm?",
      vietnamese: "Bác/Cô/Anh/Chị có thấy trận bão hôm qua không?",
      pronunciation: "did yoo see the storm?"
    }
  ],
  drill: [
    {
      id: "L186C01",
      type: "read",
      prompt: "How's your garden growing?",
      hint: "Vườn của bác/cô/anh/chị trồng thế nào rồi ạ?",
      answer: "How's your garden growing?"
    },
    {
      id: "L186C02",
      type: "recall",
      prompt: "Vườn của bác/cô/anh/chị trồng thế nào rồi ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How's your garden growing?"
    },
    {
      id: "L186C03",
      type: "read",
      prompt: "Your dog is so cute!",
      hint: "Con chó của bác/cô/anh/chị dễ thương quá!",
      answer: "Your dog is so cute!"
    },
    {
      id: "L186C04",
      type: "recall",
      prompt: "Con chó của bác/cô/anh/chị dễ thương quá!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Your dog is so cute!"
    },
    {
      id: "L186C05",
      type: "read",
      prompt: "Did you see the storm?",
      hint: "Bác/Cô/Anh/Chị có thấy trận bão hôm qua không?",
      answer: "Did you see the storm?"
    },
    {
      id: "L186C06",
      type: "recall",
      prompt: "Bác/Cô/Anh/Chị có thấy trận bão hôm qua không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Did you see the storm?"
    },
    {
      id: "L186C07",
      type: "fill",
      prompt: "How's your ___ growing?",
      hint: "Vườn của bác/cô/anh/chị trồng thế nào rồi ạ?",
      answer: "garden",
      answerHint: "How's your garden growing?"
    },
    {
      id: "L186C08",
      type: "fill",
      prompt: "Your dog is so ___!",
      hint: "Con chó của bác/cô/anh/chị dễ thương quá!",
      answer: "cute",
      answerHint: "Your dog is so cute!"
    },
    {
      id: "L186C09",
      type: "fill",
      prompt: "Did you see the ___?",
      hint: "Bác/Cô/Anh/Chị có thấy trận bão hôm qua không?",
      answer: "storm",
      answerHint: "Did you see the storm?"
    },
    {
      id: "L186C10",
      type: "dialogue",
      prompt: "Worker: How's your garden growing?\nCustomer: It's growing well, thank you!\nWorker: That's great to hear.",
      hint: "Thợ: Vườn của bác/cô/anh/chị trồng thế nào rồi ạ?\nKhách: Nó đang phát triển tốt, cảm ơn!\nThợ: Thật tuyệt khi nghe điều đó.",
      answer: "Worker: How's your garden growing?\nCustomer: It's growing well, thank you!\nWorker: That's great to hear."
    }
  ]
},
  {
  id: "L187",
  title: "Security Deposit Return",
  titleVi: "Trả Lại Tiền Đặt Cọc",
  level: "B1",
  context: "Sử dụng những câu này khi bạn muốn nói chuyện với chủ nhà về việc lấy lại tiền đặt cọc và hỏi về các khoản phí.",
  phrases: [
    {
      english: "I want my deposit back.",
      vietnamese: "Tôi muốn lấy lại tiền đặt cọc.",
      pronunciation: "ai wont mai dih-pah-zit bak"
    },
    {
      english: "What damage are you charging me for?",
      vietnamese: "Bạn đang tính phí tôi cho những hư hại gì?",
      pronunciation: "wot da-mij ar yoo char-jing mee for"
    },
    {
      english: "Can we discuss this further?",
      vietnamese: "Chúng ta có thể thảo luận thêm về việc này không?",
      pronunciation: "kan wee dis-kus this fur-ther"
    }
  ],
  drill: [
    {
      id: "L187C01",
      type: "read",
      prompt: "I want my deposit back.",
      hint: "Tôi muốn lấy lại tiền đặt cọc.",
      answer: "I want my deposit back."
    },
    {
      id: "L187C02",
      type: "recall",
      prompt: "Tôi muốn lấy lại tiền đặt cọc.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I want my deposit back."
    },
    {
      id: "L187C03",
      type: "read",
      prompt: "What damage are you charging me for?",
      hint: "Bạn đang tính phí tôi cho những hư hại gì?",
      answer: "What damage are you charging me for?"
    },
    {
      id: "L187C04",
      type: "recall",
      prompt: "Bạn đang tính phí tôi cho những hư hại gì?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What damage are you charging me for?"
    },
    {
      id: "L187C05",
      type: "read",
      prompt: "Can we discuss this further?",
      hint: "Chúng ta có thể thảo luận thêm về việc này không?",
      answer: "Can we discuss this further?"
    },
    {
      id: "L187C06",
      type: "recall",
      prompt: "Chúng ta có thể thảo luận thêm về việc này không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can we discuss this further?"
    },
    {
      id: "L187C07",
      type: "fill",
      prompt: "I want my ___ back.",
      hint: "Tôi muốn lấy lại tiền đặt cọc.",
      answer: "deposit",
      answerHint: "I want my deposit back."
    },
    {
      id: "L187C08",
      type: "fill",
      prompt: "What ___ are you charging me for?",
      hint: "Bạn đang tính phí tôi cho những hư hại gì?",
      answer: "damage",
      answerHint: "What damage are you charging me for?"
    },
    {
      id: "L187C09",
      type: "fill",
      prompt: "Can we ___ this further?",
      hint: "Chúng ta có thể thảo luận thêm về việc này không?",
      answer: "discuss",
      answerHint: "Can we discuss this further?"
    },
    {
      id: "L187C10",
      type: "dialogue",
      prompt: "Worker: I want my deposit back.\nCustomer: Okay, I will send you an itemized list of deductions.\nWorker: What damage are you charging me for?",
      hint: "Thợ: Tôi muốn lấy lại tiền đặt cọc.\nKhách: Được rồi, tôi sẽ gửi cho bạn một danh sách chi tiết các khoản khấu trừ.\nThợ: Bạn đang tính phí tôi cho những hư hại gì?",
      answer: "Worker: I want my deposit back.\nCustomer: Okay, I will send you an itemized list of deductions.\nWorker: What damage are you charging me for?"
    }
  ]
},
  {
  id: "L188",
  title: "HOA Meeting: Parking",
  titleVi: "Cuộc họp HOA: Vấn đề đỗ xe",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi bạn muốn hỏi về cuộc họp của hiệp hội chủ nhà (HOA) và muốn thảo luận về vấn đề đỗ xe.",
  phrases: [
    {
      english: "When is the next meeting?",
      vietnamese: "Khi nào có cuộc họp tiếp theo?",
      pronunciation: "wen iz the nekst mee-ting?"
    },
    {
      english: "I have a parking issue.",
      vietnamese: "Tôi có một vấn đề về đỗ xe.",
      pronunciation: "ai hav uh par-king i-shoo."
    },
    {
      english: "Can I bring it up?",
      vietnamese: "Tôi có thể đề cập đến nó được không?",
      pronunciation: "kan ai bring it up?"
    }
  ],
  drill: [
    {
      id: "L188C01",
      type: "read",
      prompt: "When is the next meeting?",
      hint: "Khi nào có cuộc họp tiếp theo?",
      answer: "When is the next meeting?"
    },
    {
      id: "L188C02",
      type: "recall",
      prompt: "Khi nào có cuộc họp tiếp theo?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "When is the next meeting?"
    },
    {
      id: "L188C03",
      type: "read",
      prompt: "I have a parking issue.",
      hint: "Tôi có một vấn đề về đỗ xe.",
      answer: "I have a parking issue."
    },
    {
      id: "L188C04",
      type: "recall",
      prompt: "Tôi có một vấn đề về đỗ xe.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I have a parking issue."
    },
    {
      id: "L188C05",
      type: "read",
      prompt: "Can I bring it up?",
      hint: "Tôi có thể đề cập đến nó được không?",
      answer: "Can I bring it up?"
    },
    {
      id: "L188C06",
      type: "recall",
      prompt: "Tôi có thể đề cập đến nó được không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can I bring it up?"
    },
    {
      id: "L188C07",
      type: "fill",
      prompt: "When is the next ___?",
      hint: "Khi nào có cuộc họp tiếp theo?",
      answer: "meeting",
      answerHint: "When is the next meeting?"
    },
    {
      id: "L188C08",
      type: "fill",
      prompt: "I have a ___ issue.",
      hint: "Tôi có một vấn đề về đỗ xe.",
      answer: "parking",
      answerHint: "I have a parking issue."
    },
    {
      id: "L188C09",
      type: "fill",
      prompt: "Can I bring it ___?",
      hint: "Tôi có thể đề cập đến nó được không?",
      answer: "up",
      answerHint: "Can I bring it up?"
    },
    {
      id: "L188C10",
      type: "dialogue",
      prompt: "Worker: When is the next meeting?\nCustomer: It's next Tuesday at 7 PM.\nWorker: Can I bring it up?",
      hint: "Thợ: Khi nào có cuộc họp tiếp theo?\nKhách: Thứ Ba tuần tới lúc 7 giờ tối.\nThợ: Tôi có thể đề cập đến nó được không?",
      answer: "Worker: When is the next meeting?\nCustomer: It's next Tuesday at 7 PM.\nWorker: Can I bring it up?"
    }
  ]
}
  ]
};

export default data;
