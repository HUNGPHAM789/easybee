import type { Class } from '../types';

const difficultSituations: Class = {
  id: 'difficult-situations',
  title: 'Difficult Situations',
  titleVi: 'Tình Huống Khó',
  lessons: [{id: "L19",
  title: "Handling Customer Complaints",
  titleVi: "Giải quyết phàn nàn của khách hàng",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi khách hàng không hài lòng về dịch vụ của bạn.",
  phrases: [
    {
      english: "I'm so sorry about that.",
      vietnamese: "Tôi rất xin lỗi về điều đó.",
      pronunciation: "ai-m so so-ri a-bau-t that"
    },
    {
      english: "How can I fix it?",
      vietnamese: "Tôi có thể sửa nó như thế nào?",
      pronunciation: "hau kan ai fiks it"
    },
    {
      english: "I understand your frustration.",
      vietnamese: "Tôi hiểu sự khó chịu của bạn.",
      pronunciation: "ai un-der-stand yor frus-trei-shun"
    }
  ],
  drill: [
    {
      id: "L19C01",
      type: "read",
      prompt: "I'm so sorry about that.",
      hint: "Tôi rất xin lỗi về điều đó.",
      answer: "I'm so sorry about that."
    },
    {
      id: "L19C02",
      type: "recall",
      prompt: "Tôi rất xin lỗi về điều đó.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I'm so sorry about that."
    },
    {
      id: "L19C03",
      type: "read",
      prompt: "How can I fix it?",
      hint: "Tôi có thể sửa nó như thế nào?",
      answer: "How can I fix it?"
    },
    {
      id: "L19C04",
      type: "recall",
      prompt: "Tôi có thể sửa nó như thế nào?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How can I fix it?"
    },
    {
      id: "L19C05",
      type: "read",
      prompt: "I understand your frustration.",
      hint: "Tôi hiểu sự khó chịu của bạn.",
      answer: "I understand your frustration."
    },
    {
      id: "L19C06",
      type: "recall",
      prompt: "Tôi hiểu sự khó chịu của bạn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I understand your frustration."
    },
    {
      id: "L19C07",
      type: "fill",
      prompt: "I'm so ___ about that.",
      hint: "Tôi rất xin lỗi về điều đó.",
      answer: "sorry",
      answerHint: "I'm so sorry about that."
    },
    {
      id: "L19C08",
      type: "fill",
      prompt: "How can I ___ it?",
      hint: "Tôi có thể sửa nó như thế nào?",
      answer: "fix",
      answerHint: "How can I fix it?"
    },
    {
      id: "L19C09",
      type: "fill",
      prompt: "I ___ your frustration.",
      hint: "Tôi hiểu sự khó chịu của bạn.",
      answer: "understand",
      answerHint: "I understand your frustration."
    },
    {
      id: "L19C10",
      type: "dialogue",
      prompt: "Customer: This nail is chipping!\nWorker: I'm so sorry about that. I understand your frustration.\nCustomer: I just got them done yesterday.\nWorker: How can I fix it? I can redo it right now.\nCustomer: Yes, please redo it.",
      hint: "Khách: Móng này bị tróc rồi!\nThợ: Tôi rất xin lỗi về điều đó. Tôi hiểu sự khó chịu của bạn.\nKhách: Tôi mới làm hôm qua mà.\nThợ: Tôi có thể sửa nó như thế nào? Để tôi làm lại ngay.\nKhách: Vâng, làm lại giùm tôi.",
      answer: "Customer: This nail is chipping!\nWorker: I'm so sorry about that. I understand your frustration.\nCustomer: I just got them done yesterday.\nWorker: How can I fix it? I can redo it right now.\nCustomer: Yes, please redo it."
    }
  ]
},
 {id: "L20",
  title: "When You Don't Understand",
  titleVi: "Khi Bạn Không Hiểu Khách",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn không hiểu điều khách hàng nói.",
  phrases: [
    {
      english: "Could you repeat that?",
      vietnamese: "Bạn có thể lặp lại không?",
      pronunciation: "kood yoo ri-peet that?"
    },
    {
      english: "Can you say it again?",
      vietnamese: "Bạn có thể nói lại được không?",
      pronunciation: "kan yoo say it uh-gen?"
    },
    {
      english: "I don't understand.",
      vietnamese: "Tôi không hiểu.",
      pronunciation: "ai dont un-der-stand."
    }
  ],
  drill: [
    {
      id: "L20C01",
      type: "read",
      prompt: "Could you repeat that?",
      hint: "Bạn có thể lặp lại không?",
      answer: "Could you repeat that?"
    },
    {
      id: "L20C02",
      type: "recall",
      prompt: "Bạn có thể lặp lại không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Could you repeat that?"
    },
    {
      id: "L20C03",
      type: "read",
      prompt: "Can you say it again?",
      hint: "Bạn có thể nói lại được không?",
      answer: "Can you say it again?"
    },
    {
      id: "L20C04",
      type: "recall",
      prompt: "Bạn có thể nói lại được không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can you say it again?"
    },
    {
      id: "L20C05",
      type: "read",
      prompt: "I don't understand.",
      hint: "Tôi không hiểu.",
      answer: "I don't understand."
    },
    {
      id: "L20C06",
      type: "recall",
      prompt: "Tôi không hiểu.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I don't understand."
    },
    {
      id: "L20C07",
      type: "fill",
      prompt: "Could you ___ that?",
      hint: "Bạn có thể lặp lại không?",
      answer: "repeat",
      answerHint: "Could you repeat that?"
    },
    {
      id: "L20C08",
      type: "fill",
      prompt: "Can you say it ___?",
      hint: "Bạn có thể nói lại được không?",
      answer: "again",
      answerHint: "Can you say it again?"
    },
    {
      id: "L20C09",
      type: "fill",
      prompt: "I ___ understand.",
      hint: "Tôi không hiểu.",
      answer: "don't",
      answerHint: "I don't understand."
    },
    {
      id: "L20C10",
      type: "dialogue",
      prompt: "Customer: I want a shellac top coat.\nWorker: I don't understand. Could you repeat that?\nCustomer: Shellac top coat!\nWorker: Can you say it again, slower?",
      hint: "Khách: Tôi muốn sơn shellac lớp phủ.\nThợ: Tôi không hiểu. Bạn có thể lặp lại không?\nKhách: Sơn shellac lớp phủ!\nThợ: Bạn có thể nói lại chậm hơn không?",
      answer: "Customer: I want a shellac top coat.\nWorker: I don't understand. Could you repeat that?\nCustomer: Shellac top coat!\nWorker: Can you say it again, slower?"
    }
  ]
},
 {id: "L21",
  title: "Apologizing to Customers",
  titleVi: "Xin lỗi khách hàng",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn cần xin lỗi khách hàng về một sai sót hoặc sự bất tiện nào đó.",
  phrases: [
    {
      english: "I'm so sorry.",
      vietnamese: "Tôi rất xin lỗi.",
      pronunciation: "ai-m so so-ri"
    },
    {
      english: "Sorry for the wait.",
      vietnamese: "Xin lỗi vì đã để quý khách đợi.",
      pronunciation: "so-ri for the wayt"
    },
    {
      english: "My mistake. Sorry!",
      vietnamese: "Lỗi của tôi. Xin lỗi!",
      pronunciation: "mai mis-teyk. so-ri"
    }
  ],
  drill: [
    {
      id: "L21C01",
      type: "read",
      prompt: "I'm so sorry.",
      hint: "Tôi rất xin lỗi.",
      answer: "I'm so sorry."
    },
    {
      id: "L21C02",
      type: "recall",
      prompt: "Tôi rất xin lỗi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I'm so sorry."
    },
    {
      id: "L21C03",
      type: "read",
      prompt: "Sorry for the wait.",
      hint: "Xin lỗi vì đã để quý khách đợi.",
      answer: "Sorry for the wait."
    },
    {
      id: "L21C04",
      type: "recall",
      prompt: "Xin lỗi vì đã để quý khách đợi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Sorry for the wait."
    },
    {
      id: "L21C05",
      type: "read",
      prompt: "My mistake. Sorry!",
      hint: "Lỗi của tôi. Xin lỗi!",
      answer: "My mistake. Sorry!"
    },
    {
      id: "L21C06",
      type: "recall",
      prompt: "Lỗi của tôi. Xin lỗi!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "My mistake. Sorry!"
    },
    {
      id: "L21C07",
      type: "fill",
      prompt: "I'm so ___.",
      hint: "Tôi rất xin lỗi.",
      answer: "sorry",
      answerHint: "I'm so sorry."
    },
    {
      id: "L21C08",
      type: "fill",
      prompt: "Sorry for the ___.",
      hint: "Xin lỗi vì đã để quý khách đợi.",
      answer: "wait",
      answerHint: "Sorry for the wait."
    },
    {
      id: "L21C09",
      type: "fill",
      prompt: "My ___. Sorry!",
      hint: "Lỗi của tôi. Xin lỗi!",
      answer: "mistake",
      answerHint: "My mistake. Sorry!"
    },
    {
      id: "L21C10",
      type: "dialogue",
      prompt: "Customer: The polish is smudged!\nWorker: I'm so sorry. My mistake. Sorry for the wait — let me fix it.",
      hint: "Khách: Sơn bị lem rồi!\nThợ: Tôi rất xin lỗi. Lỗi của tôi. Xin lỗi vì để chờ — để tôi sửa lại.",
      answer: "Customer: The polish is smudged!\nWorker: I'm so sorry. My mistake. Sorry for the wait — let me fix it."
    }
  ]
},
  {
  id: "L22",
  title: "Customer Comfort",
  titleVi: "Hỏi Khách Hàng Về Sự Thoải Mái",
  level: "A1",
  context: "Sử dụng những câu này để hỏi xem khách hàng có cảm thấy thoải mái trong quá trình làm móng không.",
  phrases: [
    {
      english: "Is it too hot?",
      vietnamese: "Có quá nóng không ạ?",
      pronunciation: "iz it too hot?"
    },
    {
      english: "Is it too cold?",
      vietnamese: "Có quá lạnh không ạ?",
      pronunciation: "iz it too cold?"
    },
    {
      english: "Too much pressure?",
      vietnamese: "Có mạnh tay quá không ạ?",
      pronunciation: "too much presh-er?"
    }
  ],
  drill: [
    {
      id: "L22C01",
      type: "read",
      prompt: "Is it too hot?",
      hint: "Có quá nóng không ạ?",
      answer: "Is it too hot?"
    },
    {
      id: "L22C02",
      type: "recall",
      prompt: "Có quá nóng không ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is it too hot?"
    },
    {
      id: "L22C03",
      type: "read",
      prompt: "Is it too cold?",
      hint: "Có quá lạnh không ạ?",
      answer: "Is it too cold?"
    },
    {
      id: "L22C04",
      type: "recall",
      prompt: "Có quá lạnh không ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is it too cold?"
    },
    {
      id: "L22C05",
      type: "read",
      prompt: "Too much pressure?",
      hint: "Có mạnh tay quá không ạ?",
      answer: "Too much pressure?"
    },
    {
      id: "L22C06",
      type: "recall",
      prompt: "Có mạnh tay quá không ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Too much pressure?"
    },
    {
      id: "L22C07",
      type: "fill",
      prompt: "Is it too ___?",
      hint: "Có quá nóng không ạ?",
      answer: "hot",
      answerHint: "Is it too hot?"
    },
    {
      id: "L22C08",
      type: "fill",
      prompt: "Is it too ___?",
      hint: "Có quá lạnh không ạ?",
      answer: "cold",
      answerHint: "Is it too cold?"
    },
    {
      id: "L22C09",
      type: "fill",
      prompt: "___ much pressure?",
      hint: "Có mạnh tay quá không ạ?",
      answer: "Too",
      answerHint: "Too much pressure?"
    },
    {
      id: "L22C10",
      type: "dialogue",
      prompt: "Worker: Is it too hot?\nCustomer: A little, please turn on the fan.\nWorker: Okay. Too much pressure?",
      hint: "Thợ: Có quá nóng không ạ?\nKhách: Hơi nóng, làm ơn bật quạt lên.\nThợ: Dạ vâng. Có mạnh tay quá không ạ?",
      answer: "Worker: Is it too hot?\nCustomer: A little, please turn on the fan.\nWorker: Okay. Too much pressure?"
    }
  ]
},
  {
  id: "L23",
  title: "Does That Hurt?",
  titleVi: "Có đau không?",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi khách hàng có vẻ đau đớn trong quá trình làm móng.",
  phrases: [
    {
      english: "Does that hurt?",
      vietnamese: "Có đau không ạ?",
      pronunciation: "Duz that hơt?"
    },
    {
      english: "Tell me if it's too much.",
      vietnamese: "Nói cho tôi biết nếu mạnh quá nhé.",
      pronunciation: "Tel mee if its too much."
    },
    {
      english: "I'll be more gentle.",
      vietnamese: "Tôi sẽ nhẹ tay hơn.",
      pronunciation: "Ill bee mor jen-tul."
    }
  ],
  drill: [
    {
      id: "L23C01",
      type: "read",
      prompt: "Does that hurt?",
      hint: "Có đau không ạ?",
      answer: "Does that hurt?"
    },
    {
      id: "L23C02",
      type: "recall",
      prompt: "Có đau không ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Does that hurt?"
    },
    {
      id: "L23C03",
      type: "read",
      prompt: "Tell me if it's too much.",
      hint: "Nói cho tôi biết nếu mạnh quá nhé.",
      answer: "Tell me if it's too much."
    },
    {
      id: "L23C04",
      type: "recall",
      prompt: "Nói cho tôi biết nếu mạnh quá nhé.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Tell me if it's too much."
    },
    {
      id: "L23C05",
      type: "read",
      prompt: "I'll be more gentle.",
      hint: "Tôi sẽ nhẹ tay hơn.",
      answer: "I'll be more gentle."
    },
    {
      id: "L23C06",
      type: "recall",
      prompt: "Tôi sẽ nhẹ tay hơn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I'll be more gentle."
    },
    {
      id: "L23C07",
      type: "fill",
      prompt: "___ that hurt?",
      hint: "Có đau không ạ?",
      answer: "Does",
      answerHint: "Does that hurt?"
    },
    {
      id: "L23C08",
      type: "fill",
      prompt: "Tell me if it's too ___.",
      hint: "Nói cho tôi biết nếu mạnh quá nhé.",
      answer: "much",
      answerHint: "Tell me if it's too much."
    },
    {
      id: "L23C09",
      type: "fill",
      prompt: "I'll be more ___.",
      hint: "Tôi sẽ nhẹ tay hơn.",
      answer: "gentle",
      answerHint: "I'll be more gentle."
    },
    {
      id: "L23C10",
      type: "dialogue",
      prompt: "Worker: Does that hurt?\nCustomer: Yes, a little.\nWorker: I'll be more gentle. Tell me if it's too much.",
      hint: "Thợ: Có đau không ạ?\nKhách: Có, hơi đau một chút.\nThợ: Tôi sẽ nhẹ tay hơn. Nói cho tôi biết nếu mạnh quá nhé.",
      answer: "Worker: Does that hurt?\nCustomer: Yes, a little.\nWorker: I'll be more gentle. Tell me if it's too much."
    }
  ]
},
  {
  id: "L24",
  title: "Apologizing for Mistakes",
  titleVi: "Xin Lỗi Khi Mắc Lỗi",
  level: "A2",
  context: "Sử dụng những mẫu câu này để xin lỗi khách hàng khi bạn mắc lỗi nhỏ trong quá trình làm móng.",
  phrases: [
    {
      english: "I'm so sorry!",
      vietnamese: "Tôi rất xin lỗi!",
      pronunciation: "Aim so so-ri!"
    },
    {
      english: "Let me fix that.",
      vietnamese: "Để tôi sửa lại cho bạn.",
      pronunciation: "Let mi fiks that."
    },
    {
      english: "I didn't mean to.",
      vietnamese: "Tôi không cố ý.",
      pronunciation: "Ai di-dnt min tu."
    }
  ],
  drill: [
    {
      id: "L24C01",
      type: "read",
      prompt: "I'm so sorry!",
      hint: "Tôi rất xin lỗi!",
      answer: "I'm so sorry!"
    },
    {
      id: "L24C02",
      type: "recall",
      prompt: "Tôi rất xin lỗi!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I'm so sorry!"
    },
    {
      id: "L24C03",
      type: "read",
      prompt: "Let me fix that.",
      hint: "Để tôi sửa lại cho bạn.",
      answer: "Let me fix that."
    },
    {
      id: "L24C04",
      type: "recall",
      prompt: "Để tôi sửa lại cho bạn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Let me fix that."
    },
    {
      id: "L24C05",
      type: "read",
      prompt: "I didn't mean to.",
      hint: "Tôi không cố ý.",
      answer: "I didn't mean to."
    },
    {
      id: "L24C06",
      type: "recall",
      prompt: "Tôi không cố ý.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I didn't mean to."
    },
    {
      id: "L24C07",
      type: "fill",
      prompt: "I'm so ___!",
      hint: "Tôi rất xin lỗi!",
      answer: "sorry",
      answerHint: "I'm so sorry!"
    },
    {
      id: "L24C08",
      type: "fill",
      prompt: "Let me ___ that.",
      hint: "Để tôi sửa lại cho bạn.",
      answer: "fix",
      answerHint: "Let me fix that."
    },
    {
      id: "L24C09",
      type: "fill",
      prompt: "I ___ mean to.",
      hint: "Tôi không cố ý.",
      answer: "didn't",
      answerHint: "I didn't mean to."
    },
    {
      id: "L24C10",
      type: "dialogue",
      prompt: "Worker: Oh no! I chipped your nail. I'm so sorry!\nCustomer: Oh, it's okay.\nWorker: Let me fix that for you. I didn't mean to.",
      hint: "Thợ: Ối không! Tôi làm sứt móng tay của bạn rồi. Tôi rất xin lỗi!\nKhách: Ồ, không sao đâu.\nThợ: Để tôi sửa lại cho bạn. Tôi không cố ý.",
      answer: "Worker: Oh no! I chipped your nail. I'm so sorry!\nCustomer: Oh, it's okay.\nWorker: Let me fix that for you. I didn't mean to."
    }
  ]
},
  {
  id: "L25",
  title: "Addressing Customer Complaints",
  titleVi: "Giải quyết khi khách hàng không hài lòng",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi khách hàng không hài lòng với bộ móng của họ và bạn muốn đưa ra giải pháp.",
  phrases: [
    {
      english: "I'm so sorry about that.",
      vietnamese: "Tôi rất tiếc về điều đó.",
      pronunciation: "aim so SAH-ree uh-BAUT that."
    },
    {
      english: "How can I fix it for you?",
      vietnamese: "Tôi có thể sửa lại cho bạn như thế nào?",
      pronunciation: "hao kan ai fiks it for yoo?"
    },
    {
      english: "Let me redo it for free.",
      vietnamese: "Để tôi làm lại miễn phí cho bạn.",
      pronunciation: "let mee ree-DOO it for free."
    }
  ],
  drill: [
    {
      id: "L25C01",
      type: "read",
      prompt: "I'm so sorry about that.",
      hint: "Tôi rất tiếc về điều đó.",
      answer: "I'm so sorry about that."
    },
    {
      id: "L25C02",
      type: "recall",
      prompt: "Tôi rất tiếc về điều đó.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I'm so sorry about that."
    },
    {
      id: "L25C03",
      type: "read",
      prompt: "How can I fix it for you?",
      hint: "Tôi có thể sửa lại cho bạn như thế nào?",
      answer: "How can I fix it for you?"
    },
    {
      id: "L25C04",
      type: "recall",
      prompt: "Tôi có thể sửa lại cho bạn như thế nào?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How can I fix it for you?"
    },
    {
      id: "L25C05",
      type: "read",
      prompt: "Let me redo it for free.",
      hint: "Để tôi làm lại miễn phí cho bạn.",
      answer: "Let me redo it for free."
    },
    {
      id: "L25C06",
      type: "recall",
      prompt: "Để tôi làm lại miễn phí cho bạn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Let me redo it for free."
    },
    {
      id: "L25C07",
      type: "fill",
      prompt: "I'm so ___ about that.",
      hint: "Tôi rất tiếc về điều đó.",
      answer: "sorry",
      answerHint: "I'm so sorry about that."
    },
    {
      id: "L25C08",
      type: "fill",
      prompt: "How can I ___ it for you?",
      hint: "Tôi có thể sửa lại cho bạn như thế nào?",
      answer: "fix",
      answerHint: "How can I fix it for you?"
    },
    {
      id: "L25C09",
      type: "fill",
      prompt: "Let me ___ it for free.",
      hint: "Để tôi làm lại miễn phí cho bạn.",
      answer: "redo",
      answerHint: "Let me redo it for free."
    },
    {
      id: "L25C10",
      type: "dialogue",
      prompt: "Worker: Oh, I see you're not happy. I'm so sorry about that.\nCustomer: Yes, the color is wrong.\nWorker: How can I fix it for you? Let me redo it for free.",
      hint: "Thợ: Ồ, tôi thấy bạn không hài lòng. Tôi rất tiếc về điều đó.\nKhách: Đúng vậy, màu sơn không đúng.\nThợ: Tôi có thể sửa lại cho bạn như thế nào? Để tôi làm lại miễn phí cho bạn.",
      answer: "Worker: Oh, I see you're not happy. I'm so sorry about that.\nCustomer: Yes, the color is wrong.\nWorker: How can I fix it for you? Let me redo it for free."
    }
  ]
},
  {
  id: "L26",
  title: "Handling Rude Customers",
  titleVi: "Đối phó với khách hàng thô lỗ",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi bạn gặp khách hàng khó tính hoặc cư xử không đúng mực để giữ thái độ chuyên nghiệp và bình tĩnh.",
  phrases: [
    {
      english: "I understand your frustration.",
      vietnamese: "Tôi hiểu sự khó chịu của bạn.",
      pronunciation: "ai un-der-stand yor frus-tray-shun"
    },
    {
      english: "Let me see what I can do.",
      vietnamese: "Để tôi xem tôi có thể làm gì.",
      pronunciation: "let mee see wot ai kan doo"
    },
    {
      english: "I'm happy to help you.",
      vietnamese: "Tôi rất vui được giúp bạn.",
      pronunciation: "aim hap-pee too help yoo"
    }
  ],
  drill: [
    {
      id: "L26C01",
      type: "read",
      prompt: "I understand your frustration.",
      hint: "Tôi hiểu sự khó chịu của bạn.",
      answer: "I understand your frustration."
    },
    {
      id: "L26C02",
      type: "recall",
      prompt: "Tôi hiểu sự khó chịu của bạn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I understand your frustration."
    },
    {
      id: "L26C03",
      type: "read",
      prompt: "Let me see what I can do.",
      hint: "Để tôi xem tôi có thể làm gì.",
      answer: "Let me see what I can do."
    },
    {
      id: "L26C04",
      type: "recall",
      prompt: "Để tôi xem tôi có thể làm gì.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Let me see what I can do."
    },
    {
      id: "L26C05",
      type: "read",
      prompt: "I'm happy to help you.",
      hint: "Tôi rất vui được giúp bạn.",
      answer: "I'm happy to help you."
    },
    {
      id: "L26C06",
      type: "recall",
      prompt: "Tôi rất vui được giúp bạn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I'm happy to help you."
    },
    {
      id: "L26C07",
      type: "fill",
      prompt: "I understand your ___.",
      hint: "Tôi hiểu sự khó chịu của bạn.",
      answer: "frustration",
      answerHint: "I understand your frustration."
    },
    {
      id: "L26C08",
      type: "fill",
      prompt: "Let me see what I can ___.",
      hint: "Để tôi xem tôi có thể làm gì.",
      answer: "do",
      answerHint: "Let me see what I can do."
    },
    {
      id: "L26C09",
      type: "fill",
      prompt: "I'm happy to ___ you.",
      hint: "Tôi rất vui được giúp bạn.",
      answer: "help",
      answerHint: "I'm happy to help you."
    },
    {
      id: "L26C10",
      type: "dialogue",
      prompt: "Worker: I understand your frustration. What seems to be the problem?\nCustomer: This nail polish is chipping already! I just got it done yesterday!\nWorker: Let me see what I can do. I'm happy to help you fix it.",
      hint: "Thợ: Tôi hiểu sự khó chịu của bạn. Có vẻ như vấn đề là gì?\nKhách: Sơn móng tay này đã bị bong tróc rồi! Tôi vừa mới làm hôm qua!\nThợ: Để tôi xem tôi có thể làm gì. Tôi rất vui được giúp bạn sửa nó.",
      answer: "Worker: I understand your frustration. What seems to be the problem?\nCustomer: This nail polish is chipping already! I just got it done yesterday!\nWorker: Let me see what I can do. I'm happy to help you fix it."
    }
  ]
},
  {
  id: "L27",
  title: "Setting Limits Politely",
  titleVi: "Đặt giới hạn một cách lịch sự",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi bạn cần từ chối một yêu cầu của khách hàng một cách lịch sự, vì lý do an toàn hoặc kỹ thuật.",
  phrases: [
    {
      english: "I'm not comfortable doing that.",
      vietnamese: "Tôi không thoải mái khi làm điều đó.",
      pronunciation: "Ahm not kumf-tuh-buhl doo-ing that."
    },
    {
      english: "That might damage your nails.",
      vietnamese: "Điều đó có thể làm hỏng móng tay của bạn.",
      pronunciation: "That mite da-mij yor naylz."
    },
    {
      english: "I can't do that design.",
      vietnamese: "Tôi không thể làm kiểu thiết kế đó.",
      pronunciation: "Ai kant doo that dee-zain."
    }
  ],
  drill: [
    {
      id: "L27C01",
      type: "read",
      prompt: "I'm not comfortable doing that.",
      hint: "Tôi không thoải mái khi làm điều đó.",
      answer: "I'm not comfortable doing that."
    },
    {
      id: "L27C02",
      type: "recall",
      prompt: "Tôi không thoải mái khi làm điều đó.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I'm not comfortable doing that."
    },
    {
      id: "L27C03",
      type: "read",
      prompt: "That might damage your nails.",
      hint: "Điều đó có thể làm hỏng móng tay của bạn.",
      answer: "That might damage your nails."
    },
    {
      id: "L27C04",
      type: "recall",
      prompt: "Điều đó có thể làm hỏng móng tay của bạn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "That might damage your nails."
    },
    {
      id: "L27C05",
      type: "read",
      prompt: "I can't do that design.",
      hint: "Tôi không thể làm kiểu thiết kế đó.",
      answer: "I can't do that design."
    },
    {
      id: "L27C06",
      type: "recall",
      prompt: "Tôi không thể làm kiểu thiết kế đó.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I can't do that design."
    },
    {
      id: "L27C07",
      type: "fill",
      prompt: "I'm not comfortable ___ that.",
      hint: "Tôi không thoải mái khi làm điều đó.",
      answer: "doing",
      answerHint: "I'm not comfortable doing that."
    },
    {
      id: "L27C08",
      type: "fill",
      prompt: "That might ___ your nails.",
      hint: "Điều đó có thể làm hỏng móng tay của bạn.",
      answer: "damage",
      answerHint: "That might damage your nails."
    },
    {
      id: "L27C09",
      type: "fill",
      prompt: "I ___ do that design.",
      hint: "Tôi không thể làm kiểu thiết kế đó.",
      answer: "can't",
      answerHint: "I can't do that design."
    },
    {
      id: "L27C10",
      type: "dialogue",
      prompt: "Worker: I'm not comfortable doing that, ma'am. The drill is too strong.\nCustomer: Oh, really? I want my nails very thin.\nWorker: That might damage your nails. I can't do that design with such thin nails.",
      hint: "Thợ: Tôi không thoải mái khi làm điều đó, thưa cô. Máy mài quá mạnh.\nKhách: Ồ, vậy à? Tôi muốn móng tay của tôi thật mỏng.\nThợ: Điều đó có thể làm hỏng móng tay của cô. Tôi không thể làm kiểu thiết kế đó với móng tay mỏng như vậy.",
      answer: "Worker: I'm not comfortable doing that, ma'am. The drill is too strong.\nCustomer: Oh, really? I want my nails very thin.\nWorker: That might damage your nails. I can't do that design with such thin nails."
    }
  ]
}
  ]
};

export default difficultSituations;
