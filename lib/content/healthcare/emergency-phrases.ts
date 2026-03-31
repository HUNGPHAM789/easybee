import type { Class } from '../types';

const data: Class = {
  id: "emergency-phrases",
  title: "Emergency Phrases",
  titleVi: "Câu Nói Khẩn Cấp",
  lessons: [
  {
  id: "L162",
  title: "Call 911: Ambulance",
  titleVi: "Gọi 911: Cần Cứu Thương",
  level: "A1",
  context: "Sử dụng những câu này khi bạn cần gọi cấp cứu vì có người bị thương.",
  phrases: [
    {
      english: "I need an ambulance.",
      vietnamese: "Tôi cần xe cứu thương.",
      pronunciation: "ai need an am-byoo-luhns"
    },
    {
      english: "Someone fell down.",
      vietnamese: "Có người bị ngã.",
      pronunciation: "sum-wuhn fell down"
    },
    {
      english: "The address is...",
      vietnamese: "Địa chỉ là...",
      pronunciation: "thuh a-dress iz"
    }
  ],
  drill: [
    {
      id: "L162C01",
      type: "read",
      prompt: "I need an ambulance.",
      hint: "Tôi cần xe cứu thương.",
      answer: "I need an ambulance."
    },
    {
      id: "L162C02",
      type: "recall",
      prompt: "Tôi cần xe cứu thương.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I need an ambulance."
    },
    {
      id: "L162C03",
      type: "read",
      prompt: "Someone fell down.",
      hint: "Có người bị ngã.",
      answer: "Someone fell down."
    },
    {
      id: "L162C04",
      type: "recall",
      prompt: "Có người bị ngã.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Someone fell down."
    },
    {
      id: "L162C05",
      type: "read",
      prompt: "The address is...",
      hint: "Địa chỉ là...",
      answer: "The address is..."
    },
    {
      id: "L162C06",
      type: "recall",
      prompt: "Địa chỉ là...",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "The address is..."
    },
    {
      id: "L162C07",
      type: "fill",
      prompt: "I need an ___.",
      hint: "Tôi cần xe cứu thương.",
      answer: "ambulance",
      answerHint: "I need an ambulance."
    },
    {
      id: "L162C08",
      type: "fill",
      prompt: "Someone ___ down.",
      hint: "Có người bị ngã.",
      answer: "fell",
      answerHint: "Someone fell down."
    },
    {
      id: "L162C09",
      type: "fill",
      prompt: "The ___ is...",
      hint: "Địa chỉ là...",
      answer: "address",
      answerHint: "The address is..."
    },
    {
      id: "L162C10",
      type: "dialogue",
      prompt: "Worker: 911, what's your emergency?\nCustomer: I need an ambulance, someone fell down.\nWorker: What is the address?",
      hint: "Thợ: 911, có chuyện gì khẩn cấp vậy?\nKhách: Tôi cần xe cứu thương, có người bị ngã.\nThợ: Địa chỉ là gì?",
      answer: "Worker: 911, what's your emergency?\nCustomer: I need an ambulance, someone fell down.\nWorker: What is the address?"
    }
  ]
},
  {
  id: "L163",
  title: "Car Accident English",
  titleVi: "Tiếng Anh Khi Gặp Tai Nạn Xe",
  level: "A2",
  context: "Học các cụm từ tiếng Anh hữu ích khi bạn gặp tai nạn xe hơi ở Mỹ.",
  phrases: [
    {
      english: "He hit my car!",
      vietnamese: "Anh ấy đâm vào xe của tôi!",
      pronunciation: "hee hit my car"
    },
    {
      english: "Are you hurt?",
      vietnamese: "Bạn có bị thương không?",
      pronunciation: "ar you hirt"
    },
    {
      english: "We need to exchange insurance.",
      vietnamese: "Chúng ta cần trao đổi bảo hiểm.",
      pronunciation: "wee need too eks-change in-shur-ance"
    }
  ],
  drill: [
    {
      id: "L163C01",
      type: "read",
      prompt: "He hit my car!",
      hint: "Anh ấy đâm vào xe của tôi!",
      answer: "He hit my car!"
    },
    {
      id: "L163C02",
      type: "recall",
      prompt: "Anh ấy đâm vào xe của tôi!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "He hit my car!"
    },
    {
      id: "L163C03",
      type: "read",
      prompt: "Are you hurt?",
      hint: "Bạn có bị thương không?",
      answer: "Are you hurt?"
    },
    {
      id: "L163C04",
      type: "recall",
      prompt: "Bạn có bị thương không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Are you hurt?"
    },
    {
      id: "L163C05",
      type: "read",
      prompt: "We need to exchange insurance.",
      hint: "Chúng ta cần trao đổi bảo hiểm.",
      answer: "We need to exchange insurance."
    },
    {
      id: "L163C06",
      type: "recall",
      prompt: "Chúng ta cần trao đổi bảo hiểm.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "We need to exchange insurance."
    },
    {
      id: "L163C07",
      type: "fill",
      prompt: "He hit my ___!",
      hint: "Anh ấy đâm vào xe của tôi!",
      answer: "car",
      answerHint: "He hit my car!"
    },
    {
      id: "L163C08",
      type: "fill",
      prompt: "Are you ___?",
      hint: "Bạn có bị thương không?",
      answer: "hurt",
      answerHint: "Are you hurt?"
    },
    {
      id: "L163C09",
      type: "fill",
      prompt: "We need to exchange ___.",
      hint: "Chúng ta cần trao đổi bảo hiểm.",
      answer: "insurance",
      answerHint: "We need to exchange insurance."
    },
    {
      id: "L163C10",
      type: "dialogue",
      prompt: "Worker: Are you hurt?\nCustomer: No, I'm okay. But he hit my car!\nWorker: We need to exchange insurance.",
      hint: "Thợ: Bạn có bị thương không?\nKhách: Không, tôi ổn. Nhưng anh ấy đâm vào xe của tôi!\nThợ: Chúng ta cần trao đổi bảo hiểm.",
      answer: "Worker: Are you hurt?\nCustomer: No, I'm okay. But he hit my car!\nWorker: We need to exchange insurance."
    }
  ]
},
  {
  id: "L164",
  title: "Emergency: Fire, Help, Pain",
  titleVi: "Khẩn Cấp: Cháy, Cứu, Đau",
  level: "A1",
  context: "Sử dụng những câu này khi bạn cần gọi 911 trong trường hợp khẩn cấp.",
  phrases: [
    {
      english: "There is a fire!",
      vietnamese: "Có cháy!",
      pronunciation: "ther iz uh fai-er"
    },
    {
      english: "Someone is not breathing.",
      vietnamese: "Có người không thở được.",
      pronunciation: "sum-wun iz not bree-thing"
    },
    {
      english: "I have chest pain.",
      vietnamese: "Tôi bị đau ngực.",
      pronunciation: "ai hav chest pein"
    }
  ],
  drill: [
    {
      id: "L164C01",
      type: "read",
      prompt: "There is a fire!",
      hint: "Có cháy!",
      answer: "There is a fire!"
    },
    {
      id: "L164C02",
      type: "recall",
      prompt: "Có cháy!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "There is a fire!"
    },
    {
      id: "L164C03",
      type: "read",
      prompt: "Someone is not breathing.",
      hint: "Có người không thở được.",
      answer: "Someone is not breathing."
    },
    {
      id: "L164C04",
      type: "recall",
      prompt: "Có người không thở được.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Someone is not breathing."
    },
    {
      id: "L164C05",
      type: "read",
      prompt: "I have chest pain.",
      hint: "Tôi bị đau ngực.",
      answer: "I have chest pain."
    },
    {
      id: "L164C06",
      type: "recall",
      prompt: "Tôi bị đau ngực.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I have chest pain."
    },
    {
      id: "L164C07",
      type: "fill",
      prompt: "There is a ___!",
      hint: "Có cháy!",
      answer: "fire",
      answerHint: "There is a fire!"
    },
    {
      id: "L164C08",
      type: "fill",
      prompt: "Someone is not ___.",
      hint: "Có người không thở được.",
      answer: "breathing",
      answerHint: "Someone is not breathing."
    },
    {
      id: "L164C09",
      type: "fill",
      prompt: "I have chest ___.",
      hint: "Tôi bị đau ngực.",
      answer: "pain",
      answerHint: "I have chest pain."
    },
    {
      id: "L164C10",
      type: "dialogue",
      prompt: "Worker: Hello, 911. What is your emergency?\nCaller: There is a fire!\nWorker: What is your address?",
      hint: "Thợ: Xin chào, 911. Bạn gặp vấn đề gì?\nKhách: Có cháy!\nThợ: Địa chỉ của bạn là gì?",
      answer: "Worker: Hello, 911. What is your emergency?\nCaller: There is a fire!\nWorker: What is your address?"
    }
  ]
},
  {
  id: "L165",
  title: "At the Emergency Room",
  titleVi: "Tại phòng cấp cứu",
  level: "A2",
  context: "Sử dụng các cụm từ này khi bạn đến phòng cấp cứu và cần nói chuyện với nhân viên y tế.",
  phrases: [
    {
      english: "I fell and hit my head.",
      vietnamese: "Tôi bị ngã và đập đầu.",
      pronunciation: "ai fel and hit mai hed"
    },
    {
      english: "My child is very sick.",
      vietnamese: "Con tôi rất ốm.",
      pronunciation: "mai chaild iz ve-ri sik"
    },
    {
      english: "How long is the wait?",
      vietnamese: "Tôi phải đợi bao lâu?",
      pronunciation: "hau long iz the weit"
    }
  ],
  drill: [
    {
      id: "L165C01",
      type: "read",
      prompt: "I fell and hit my head.",
      hint: "Tôi bị ngã và đập đầu.",
      answer: "I fell and hit my head."
    },
    {
      id: "L165C02",
      type: "recall",
      prompt: "Tôi bị ngã và đập đầu.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I fell and hit my head."
    },
    {
      id: "L165C03",
      type: "read",
      prompt: "My child is very sick.",
      hint: "Con tôi rất ốm.",
      answer: "My child is very sick."
    },
    {
      id: "L165C04",
      type: "recall",
      prompt: "Con tôi rất ốm.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "My child is very sick."
    },
    {
      id: "L165C05",
      type: "read",
      prompt: "How long is the wait?",
      hint: "Tôi phải đợi bao lâu?",
      answer: "How long is the wait?"
    },
    {
      id: "L165C06",
      type: "recall",
      prompt: "Tôi phải đợi bao lâu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How long is the wait?"
    },
    {
      id: "L165C07",
      type: "fill",
      prompt: "I fell and hit my ___.",
      hint: "Tôi bị ngã và đập đầu.",
      answer: "head",
      answerHint: "I fell and hit my head."
    },
    {
      id: "L165C08",
      type: "fill",
      prompt: "My ___ is very sick.",
      hint: "Con tôi rất ốm.",
      answer: "child",
      answerHint: "My child is very sick."
    },
    {
      id: "L165C09",
      type: "fill",
      prompt: "How long is the ___?",
      hint: "Tôi phải đợi bao lâu?",
      answer: "wait",
      answerHint: "How long is the wait?"
    },
    {
      id: "L165C10",
      type: "dialogue",
      prompt: "Worker: What's wrong?\nCustomer: I fell and hit my head.\nWorker: How long is the wait?",
      hint: "Nhân viên: Có chuyện gì vậy?\nKhách hàng: Tôi bị ngã và đập đầu.\nNhân viên: Tôi phải đợi bao lâu?",
      answer: "Worker: What's wrong?\nCustomer: I fell and hit my head.\nWorker: How long is the wait?"
    }
  ]
},
  {
  id: "L166",
  title: "At the Accident Scene",
  titleVi: "Tại Hiện Trường Tai Nạn",
  level: "A2",
  context: "Những câu này giúp bạn nói chuyện với cảnh sát sau khi xảy ra tai nạn xe cộ.",
  phrases: [
    {
      english: "Here is my license.",
      vietnamese: "Đây là bằng lái xe của tôi.",
      pronunciation: "heer iz mai lai-sens"
    },
    {
      english: "He ran the red light.",
      vietnamese: "Anh ấy vượt đèn đỏ.",
      pronunciation: "hee ran the red lait"
    },
    {
      english: "I was going straight.",
      vietnamese: "Tôi đang đi thẳng.",
      pronunciation: "ai woz go-ing strait"
    }
  ],
  drill: [
    {
      id: "L166C01",
      type: "read",
      prompt: "Here is my license.",
      hint: "Đây là bằng lái xe của tôi.",
      answer: "Here is my license."
    },
    {
      id: "L166C02",
      type: "recall",
      prompt: "Đây là bằng lái xe của tôi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Here is my license."
    },
    {
      id: "L166C03",
      type: "read",
      prompt: "He ran the red light.",
      hint: "Anh ấy vượt đèn đỏ.",
      answer: "He ran the red light."
    },
    {
      id: "L166C04",
      type: "recall",
      prompt: "Anh ấy vượt đèn đỏ.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "He ran the red light."
    },
    {
      id: "L166C05",
      type: "read",
      prompt: "I was going straight.",
      hint: "Tôi đang đi thẳng.",
      answer: "I was going straight."
    },
    {
      id: "L166C06",
      type: "recall",
      prompt: "Tôi đang đi thẳng.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I was going straight."
    },
    {
      id: "L166C07",
      type: "fill",
      prompt: "Here is my ___.",
      hint: "Đây là bằng lái xe của tôi.",
      answer: "license",
      answerHint: "Here is my license."
    },
    {
      id: "L166C08",
      type: "fill",
      prompt: "He ran the ___ light.",
      hint: "Anh ấy vượt đèn đỏ.",
      answer: "red",
      answerHint: "He ran the red light."
    },
    {
      id: "L166C09",
      type: "fill",
      prompt: "I was going ___.",
      hint: "Tôi đang đi thẳng.",
      answer: "straight",
      answerHint: "I was going straight."
    },
    {
      id: "L166C10",
      type: "dialogue",
      prompt: "Worker: Excuse me, officer. Here is my license.\nPolice: Thank you. What happened?\nWorker: He ran the red light. I was going straight.",
      hint: "Thợ: Xin lỗi, cảnh sát. Đây là bằng lái xe của tôi.\nKhách: Cảm ơn. Chuyện gì đã xảy ra?\nThợ: Anh ấy vượt đèn đỏ. Tôi đang đi thẳng.",
      answer: "Worker: Excuse me, officer. Here is my license.\nPolice: Thank you. What happened?\nWorker: He ran the red light. I was going straight."
    }
  ]
},
  {
  id: "L167",
  title: "Car Trouble on Highway",
  titleVi: "Xe gặp sự cố trên đường cao tốc",
  level: "A2",
  context: "Sử dụng những câu này khi xe của bạn bị hỏng và bạn cần gọi cứu hộ trên đường.",
  phrases: [
    {
      english: "My car broke down.",
      vietnamese: "Xe của tôi bị hỏng rồi.",
      pronunciation: "mai kar broke daun"
    },
    {
      english: "I have a flat tire.",
      vietnamese: "Tôi bị xịt lốp.",
      pronunciation: "ai hav a flat tai-er"
    },
    {
      english: "I'm on Highway 95.",
      vietnamese: "Tôi đang ở trên đường cao tốc 95.",
      pronunciation: "aim on hai-way nai-tee faiv"
    }
  ],
  drill: [
    {
      id: "L167C01",
      type: "read",
      prompt: "My car broke down.",
      hint: "Xe của tôi bị hỏng rồi.",
      answer: "My car broke down."
    },
    {
      id: "L167C02",
      type: "recall",
      prompt: "Xe của tôi bị hỏng rồi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "My car broke down."
    },
    {
      id: "L167C03",
      type: "read",
      prompt: "I have a flat tire.",
      hint: "Tôi bị xịt lốp.",
      answer: "I have a flat tire."
    },
    {
      id: "L167C04",
      type: "recall",
      prompt: "Tôi bị xịt lốp.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I have a flat tire."
    },
    {
      id: "L167C05",
      type: "read",
      prompt: "I'm on Highway 95.",
      hint: "Tôi đang ở trên đường cao tốc 95.",
      answer: "I'm on Highway 95."
    },
    {
      id: "L167C06",
      type: "recall",
      prompt: "Tôi đang ở trên đường cao tốc 95.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I'm on Highway 95."
    },
    {
      id: "L167C07",
      type: "fill",
      prompt: "My car ___ down.",
      hint: "Xe của tôi bị hỏng rồi.",
      answer: "broke",
      answerHint: "My car broke down."
    },
    {
      id: "L167C08",
      type: "fill",
      prompt: "I have a ___ tire.",
      hint: "Tôi bị xịt lốp.",
      answer: "flat",
      answerHint: "I have a flat tire."
    },
    {
      id: "L167C09",
      type: "fill",
      prompt: "I'm on ___ 95.",
      hint: "Tôi đang ở trên đường cao tốc 95.",
      answer: "Highway",
      answerHint: "I'm on Highway 95."
    },
    {
      id: "L167C10",
      type: "dialogue",
      prompt: "Worker: What's the problem?\nCustomer: I have a flat tire.\nWorker: Where are you?",
      hint: "Thợ: Có vấn đề gì vậy?\nKhách: Tôi bị xịt lốp.\nThợ: Anh/chị đang ở đâu?",
      answer: "Worker: What's the problem?\nCustomer: I have a flat tire.\nWorker: Where are you?"
    }
  ]
},
  {
  id: "L168",
  title: "Filing an Insurance Claim",
  titleVi: "Nộp Đơn Yêu Cầu Bảo Hiểm",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi bạn cần nộp đơn yêu cầu bảo hiểm sau một tai nạn và có số báo cáo của cảnh sát.",
  phrases: [
    {
      english: "I need to file a claim.",
      vietnamese: "Tôi cần nộp đơn yêu cầu bồi thường.",
      pronunciation: "ai need too file uh claim"
    },
    {
      english: "Here's the police report number.",
      vietnamese: "Đây là số báo cáo của cảnh sát.",
      pronunciation: "heerz thuh puh-lees ri-port num-ber"
    },
    {
      english: "What information do you need?",
      vietnamese: "Bạn cần thông tin gì?",
      pronunciation: "wot in-fer-may-shun doo yoo need"
    }
  ],
  drill: [
    {
      id: "L168C01",
      type: "read",
      prompt: "I need to file a claim.",
      hint: "Tôi cần nộp đơn yêu cầu bồi thường.",
      answer: "I need to file a claim."
    },
    {
      id: "L168C02",
      type: "recall",
      prompt: "Tôi cần nộp đơn yêu cầu bồi thường.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I need to file a claim."
    },
    {
      id: "L168C03",
      type: "read",
      prompt: "Here's the police report number.",
      hint: "Đây là số báo cáo của cảnh sát.",
      answer: "Here's the police report number."
    },
    {
      id: "L168C04",
      type: "recall",
      prompt: "Đây là số báo cáo của cảnh sát.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Here's the police report number."
    },
    {
      id: "L168C05",
      type: "read",
      prompt: "What information do you need?",
      hint: "Bạn cần thông tin gì?",
      answer: "What information do you need?"
    },
    {
      id: "L168C06",
      type: "recall",
      prompt: "Bạn cần thông tin gì?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What information do you need?"
    },
    {
      id: "L168C07",
      type: "fill",
      prompt: "I need to file a ___.",
      hint: "Tôi cần nộp đơn yêu cầu bồi thường.",
      answer: "claim",
      answerHint: "I need to file a claim."
    },
    {
      id: "L168C08",
      type: "fill",
      prompt: "Here's the police ___ number.",
      hint: "Đây là số báo cáo của cảnh sát.",
      answer: "report",
      answerHint: "Here's the police report number."
    },
    {
      id: "L168C09",
      type: "fill",
      prompt: "What ___ do you need?",
      hint: "Bạn cần thông tin gì?",
      answer: "information",
      answerHint: "What information do you need?"
    },
    {
      id: "L168C10",
      type: "dialogue",
      prompt: "Worker: I need to file a claim.\nCustomer: Okay, I can help you with that.\nWorker: Here's the police report number.",
      hint: "Thợ: Tôi cần nộp đơn yêu cầu bồi thường.\nKhách: Được rồi, tôi có thể giúp bạn việc đó.\nThợ: Đây là số báo cáo của cảnh sát.",
      answer: "Worker: I need to file a claim.\nCustomer: Okay, I can help you with that.\nWorker: Here's the police report number."
    }
  ]
},
  {
  id: "L169",
  title: "Allergic Reaction Emergency",
  titleVi: "Cấp Cứu Dị Ứng",
  level: "A1",
  context: "Sử dụng những cụm từ này khi bạn bị dị ứng nghiêm trọng và cần giúp đỡ ngay lập tức.",
  phrases: [
    {
      english: "I'm having an allergic reaction!",
      vietnamese: "Tôi đang bị dị ứng!",
      pronunciation: "ime ha-ving an a-lur-jik ree-ak-shun"
    },
    {
      english: "I need my EpiPen!",
      vietnamese: "Tôi cần bút tiêm EpiPen của tôi!",
      pronunciation: "ai need mai eh-pi-pen"
    },
    {
      english: "Call 911!",
      vietnamese: "Gọi số 911!",
      pronunciation: "call nine-one-one"
    }
  ],
  drill: [
    {
      id: "L169C01",
      type: "read",
      prompt: "I'm having an allergic reaction!",
      hint: "Tôi đang bị dị ứng!",
      answer: "I'm having an allergic reaction!"
    },
    {
      id: "L169C02",
      type: "recall",
      prompt: "Tôi đang bị dị ứng!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I'm having an allergic reaction!"
    },
    {
      id: "L169C03",
      type: "read",
      prompt: "I need my EpiPen!",
      hint: "Tôi cần bút tiêm EpiPen của tôi!",
      answer: "I need my EpiPen!"
    },
    {
      id: "L169C04",
      type: "recall",
      prompt: "Tôi cần bút tiêm EpiPen của tôi!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I need my EpiPen!"
    },
    {
      id: "L169C05",
      type: "read",
      prompt: "Call 911!",
      hint: "Gọi số 911!",
      answer: "Call 911!"
    },
    {
      id: "L169C06",
      type: "recall",
      prompt: "Gọi số 911!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Call 911!"
    },
    {
      id: "L169C07",
      type: "fill",
      prompt: "I'm having an allergic ___!",
      hint: "Tôi đang bị dị ứng!",
      answer: "reaction",
      answerHint: "I'm having an allergic reaction!"
    },
    {
      id: "L169C08",
      type: "fill",
      prompt: "I need my ___!",
      hint: "Tôi cần bút tiêm EpiPen của tôi!",
      answer: "EpiPen",
      answerHint: "I need my EpiPen!"
    },
    {
      id: "L169C09",
      type: "fill",
      prompt: "___ 911!",
      hint: "Gọi số 911!",
      answer: "Call",
      answerHint: "Call 911!"
    },
    {
      id: "L169C10",
      type: "dialogue",
      prompt: "Worker: I'm having an allergic reaction!\nCustomer: Oh no! What do you need?\nWorker: I need my EpiPen! Call 911!",
      hint: "Thợ: Tôi đang bị dị ứng!\nKhách: Ối không! Bạn cần gì?\nThợ: Tôi cần bút tiêm EpiPen của tôi! Gọi số 911!",
      answer: "Worker: I'm having an allergic reaction!\nCustomer: Oh no! What do you need?\nWorker: I need my EpiPen! Call 911!"
    }
  ]
},
  {
  id: "L170",
  title: "Emergency: Ask for Help",
  titleVi: "Khẩn cấp: Gọi giúp đỡ",
  level: "A2",
  context: "Sử dụng những câu này khi bạn cần giúp đỡ khẩn cấp từ hàng xóm.",
  phrases: [
    {
      english: "Can you call 911?",
      vietnamese: "Bạn gọi số 911 được không?",
      pronunciation: "kan yoo kawl nine-one-one?"
    },
    {
      english: "Do you have first aid?",
      vietnamese: "Bạn có đồ sơ cứu không?",
      pronunciation: "doo yoo hav furst aid?"
    },
    {
      english: "Please help me, please!",
      vietnamese: "Làm ơn giúp tôi với!",
      pronunciation: "pleez help mee, pleez!"
    }
  ],
  drill: [
    {
      id: "L170C01",
      type: "read",
      prompt: "Can you call 911?",
      hint: "Bạn gọi số 911 được không?",
      answer: "Can you call 911?"
    },
    {
      id: "L170C02",
      type: "recall",
      prompt: "Bạn gọi số 911 được không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can you call 911?"
    },
    {
      id: "L170C03",
      type: "read",
      prompt: "Do you have first aid?",
      hint: "Bạn có đồ sơ cứu không?",
      answer: "Do you have first aid?"
    },
    {
      id: "L170C04",
      type: "recall",
      prompt: "Bạn có đồ sơ cứu không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Do you have first aid?"
    },
    {
      id: "L170C05",
      type: "read",
      prompt: "Please help me, please!",
      hint: "Làm ơn giúp tôi với!",
      answer: "Please help me, please!"
    },
    {
      id: "L170C06",
      type: "recall",
      prompt: "Làm ơn giúp tôi với!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Please help me, please!"
    },
    {
      id: "L170C07",
      type: "fill",
      prompt: "Can you call ___?",
      hint: "Bạn gọi số 911 được không?",
      answer: "911",
      answerHint: "Can you call 911?"
    },
    {
      id: "L170C08",
      type: "fill",
      prompt: "Do you have first ___?",
      hint: "Bạn có đồ sơ cứu không?",
      answer: "aid",
      answerHint: "Do you have first aid?"
    },
    {
      id: "L170C09",
      type: "fill",
      prompt: "Please ___ me, please!",
      hint: "Làm ơn giúp tôi với!",
      answer: "help",
      answerHint: "Please help me, please!"
    },
    {
      id: "L170C10",
      type: "dialogue",
      prompt: "Worker: Help! I need help!\nNeighbor: What's wrong?\nWorker: Can you call 911?",
      hint: "Thợ: Giúp tôi! Tôi cần giúp đỡ!\nHàng xóm: Có chuyện gì vậy?\nThợ: Bạn gọi số 911 được không?",
      answer: "Worker: Help! I need help!\nNeighbor: What's wrong?\nWorker: Can you call 911?"
    }
  ]
}
  ]
};

export default data;
