import type { Class } from '../types';

const data: Class = {
  id: "at-the-dentist",
  title: "At the Dentist",
  titleVi: "Đi Khám Nha Sĩ",
  lessons: [
  {
  id: "L153",
  title: "Dental Appointment Basics",
  titleVi: "Những Câu Cơ Bản Khi Hẹn Nha Sĩ",
  level: "A1",
  context: "Sử dụng những mẫu câu này khi bạn gọi điện thoại để hẹn lịch khám răng.",
  phrases: [
    {
      english: "I need a cleaning.",
      vietnamese: "Tôi cần làm sạch răng.",
      pronunciation: "ai need uh klee-ning"
    },
    {
      english: "My tooth hurts.",
      vietnamese: "Tôi bị đau răng.",
      pronunciation: "mai tooth hurts"
    },
    {
      english: "Earliest opening, please.",
      vietnamese: "Xin cho tôi lịch hẹn sớm nhất.",
      pronunciation: "er-lee-est oh-puh-ning, pleez"
    }
  ],
  drill: [
    {
      id: "L153C01",
      type: "read",
      prompt: "I need a cleaning.",
      hint: "Tôi cần làm sạch răng.",
      answer: "I need a cleaning."
    },
    {
      id: "L153C02",
      type: "recall",
      prompt: "Tôi cần làm sạch răng.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I need a cleaning."
    },
    {
      id: "L153C03",
      type: "read",
      prompt: "My tooth hurts.",
      hint: "Tôi bị đau răng.",
      answer: "My tooth hurts."
    },
    {
      id: "L153C04",
      type: "recall",
      prompt: "Tôi bị đau răng.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "My tooth hurts."
    },
    {
      id: "L153C05",
      type: "read",
      prompt: "Earliest opening, please.",
      hint: "Xin cho tôi lịch hẹn sớm nhất.",
      answer: "Earliest opening, please."
    },
    {
      id: "L153C06",
      type: "recall",
      prompt: "Xin cho tôi lịch hẹn sớm nhất.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Earliest opening, please."
    },
    {
      id: "L153C07",
      type: "fill",
      prompt: "I need a ___.",
      hint: "Tôi cần làm sạch răng.",
      answer: "cleaning",
      answerHint: "I need a cleaning."
    },
    {
      id: "L153C08",
      type: "fill",
      prompt: "My ___ hurts.",
      hint: "Tôi bị đau răng.",
      answer: "tooth",
      answerHint: "My tooth hurts."
    },
    {
      id: "L153C09",
      type: "fill",
      prompt: "___ opening, please.",
      hint: "Xin cho tôi lịch hẹn sớm nhất.",
      answer: "Earliest",
      answerHint: "Earliest opening, please."
    },
    {
      id: "L153C10",
      type: "dialogue",
      prompt: "Worker: Hello, how can I help you?\nCustomer: I need a cleaning.\nWorker: Earliest opening is Tuesday.",
      hint: "Thợ: Xin chào, tôi có thể giúp gì cho bạn?\nKhách: Tôi cần làm sạch răng.\nThợ: Lịch hẹn sớm nhất là thứ Ba.",
      answer: "Worker: Hello, how can I help you?\nCustomer: I need a cleaning.\nWorker: Earliest opening is Tuesday."
    }
  ]
},
  {
  id: "L154",
  title: "Describe Tooth Pain",
  titleVi: "Mô tả cơn đau răng",
  level: "A1",
  context: "Sử dụng những mẫu câu này khi bạn muốn mô tả cơn đau răng của mình cho nha sĩ.",
  phrases: [
    {
      english: "My tooth hurts.",
      vietnamese: "Răng của tôi bị đau.",
      pronunciation: "mai tooth hurts"
    },
    {
      english: "It hurts when cold.",
      vietnamese: "Nó đau khi ăn đồ lạnh.",
      pronunciation: "it hurts when cold"
    },
    {
      english: "Sharp pain on right.",
      vietnamese: "Đau nhói bên phải.",
      pronunciation: "sharp pain on right"
    }
  ],
  drill: [
    {
      id: "L154C01",
      type: "read",
      prompt: "My tooth hurts.",
      hint: "Răng của tôi bị đau.",
      answer: "My tooth hurts."
    },
    {
      id: "L154C02",
      type: "recall",
      prompt: "Răng của tôi bị đau.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "My tooth hurts."
    },
    {
      id: "L154C03",
      type: "read",
      prompt: "It hurts when cold.",
      hint: "Nó đau khi ăn đồ lạnh.",
      answer: "It hurts when cold."
    },
    {
      id: "L154C04",
      type: "recall",
      prompt: "Nó đau khi ăn đồ lạnh.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It hurts when cold."
    },
    {
      id: "L154C05",
      type: "read",
      prompt: "Sharp pain on right.",
      hint: "Đau nhói bên phải.",
      answer: "Sharp pain on right."
    },
    {
      id: "L154C06",
      type: "recall",
      prompt: "Đau nhói bên phải.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Sharp pain on right."
    },
    {
      id: "L154C07",
      type: "fill",
      prompt: "My ___ hurts.",
      hint: "Răng của tôi bị đau.",
      answer: "tooth",
      answerHint: "My tooth hurts."
    },
    {
      id: "L154C08",
      type: "fill",
      prompt: "It hurts when ___.",
      hint: "Nó đau khi ăn đồ lạnh.",
      answer: "cold",
      answerHint: "It hurts when cold."
    },
    {
      id: "L154C09",
      type: "fill",
      prompt: "Sharp pain on ___.",
      hint: "Đau nhói bên phải.",
      answer: "right",
      answerHint: "Sharp pain on right."
    },
    {
      id: "L154C10",
      type: "dialogue",
      prompt: "Worker: Where does it hurt?\nCustomer: My tooth hurts.\nWorker: Does it hurt when you eat?",
      hint: "Thợ: Nó đau ở đâu?\nKhách: Răng của tôi bị đau.\nThợ: Nó có đau khi bạn ăn không?",
      answer: "Worker: Where does it hurt?\nCustomer: My tooth hurts.\nWorker: Does it hurt when you eat?"
    }
  ]
},
  {
  id: "L155",
  title: "Dental Filling: Numbing",
  titleVi: "Trám Răng: Gây Tê",
  level: "A2",
  context: "Những mẫu câu này dùng khi nha sĩ giải thích về quy trình trám răng và việc gây tê.",
  phrases: [
    {
      english: "You need a filling.",
      vietnamese: "Bạn cần trám răng.",
      pronunciation: "yoo need uh fil-ing"
    },
    {
      english: "We will numb the area.",
      vietnamese: "Chúng tôi sẽ gây tê vùng này.",
      pronunciation: "wee wil num thuh air-ee-uh"
    },
    {
      english: "It will feel like pressure.",
      vietnamese: "Bạn sẽ cảm thấy như có áp lực.",
      pronunciation: "it wil feel like presh-ur"
    }
  ],
  drill: [
    {
      id: "L155C01",
      type: "read",
      prompt: "You need a filling.",
      hint: "Bạn cần trám răng.",
      answer: "You need a filling."
    },
    {
      id: "L155C02",
      type: "recall",
      prompt: "Bạn cần trám răng.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "You need a filling."
    },
    {
      id: "L155C03",
      type: "read",
      prompt: "We will numb the area.",
      hint: "Chúng tôi sẽ gây tê vùng này.",
      answer: "We will numb the area."
    },
    {
      id: "L155C04",
      type: "recall",
      prompt: "Chúng tôi sẽ gây tê vùng này.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "We will numb the area."
    },
    {
      id: "L155C05",
      type: "read",
      prompt: "It will feel like pressure.",
      hint: "Bạn sẽ cảm thấy như có áp lực.",
      answer: "It will feel like pressure."
    },
    {
      id: "L155C06",
      type: "recall",
      prompt: "Bạn sẽ cảm thấy như có áp lực.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It will feel like pressure."
    },
    {
      id: "L155C07",
      type: "fill",
      prompt: "You need a ___.",
      hint: "Bạn cần trám răng.",
      answer: "filling",
      answerHint: "You need a filling."
    },
    {
      id: "L155C08",
      type: "fill",
      prompt: "We will ___ the area.",
      hint: "Chúng tôi sẽ gây tê vùng này.",
      answer: "numb",
      answerHint: "We will numb the area."
    },
    {
      id: "L155C09",
      type: "fill",
      prompt: "It will feel like ___.",
      hint: "Bạn sẽ cảm thấy như có áp lực.",
      answer: "pressure",
      answerHint: "It will feel like pressure."
    },
    {
      id: "L155C10",
      type: "dialogue",
      prompt: "Worker: You need a filling.\nCustomer: Okay.\nWorker: We will numb the area first.",
      hint: "Thợ: Bạn cần trám răng.\nKhách: Được thôi.\nThợ: Chúng tôi sẽ gây tê vùng này trước.",
      answer: "Worker: You need a filling.\nCustomer: Okay.\nWorker: We will numb the area first."
    }
  ]
},
  {
  id: "L156",
  title: "Dental X-rays and Exams",
  titleVi: "Chụp X-quang và Khám Răng",
  level: "A2",
  context: "Bạn sẽ sử dụng những cụm từ này khi đi khám răng và chụp X-quang răng.",
  phrases: [
    {
      english: "We need to take an X-ray.",
      vietnamese: "Chúng ta cần chụp X-quang.",
      pronunciation: "wee need too tayk an eks-ray"
    },
    {
      english: "Open your mouth wide, please.",
      vietnamese: "Xin vui lòng mở miệng rộng ra.",
      pronunciation: "oh-pen yor mowth wide pleez"
    },
    {
      english: "Bite down on this, please.",
      vietnamese: "Xin vui lòng cắn vào cái này.",
      pronunciation: "bite down on this pleez"
    }
  ],
  drill: [
    {
      id: "L156C01",
      type: "read",
      prompt: "We need to take an X-ray.",
      hint: "Chúng ta cần chụp X-quang.",
      answer: "We need to take an X-ray."
    },
    {
      id: "L156C02",
      type: "recall",
      prompt: "Chúng ta cần chụp X-quang.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "We need to take an X-ray."
    },
    {
      id: "L156C03",
      type: "read",
      prompt: "Open your mouth wide, please.",
      hint: "Xin vui lòng mở miệng rộng ra.",
      answer: "Open your mouth wide, please."
    },
    {
      id: "L156C04",
      type: "recall",
      prompt: "Xin vui lòng mở miệng rộng ra.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Open your mouth wide, please."
    },
    {
      id: "L156C05",
      type: "read",
      prompt: "Bite down on this, please.",
      hint: "Xin vui lòng cắn vào cái này.",
      answer: "Bite down on this, please."
    },
    {
      id: "L156C06",
      type: "recall",
      prompt: "Xin vui lòng cắn vào cái này.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Bite down on this, please."
    },
    {
      id: "L156C07",
      type: "fill",
      prompt: "We need to take an ___.",
      hint: "Chúng ta cần chụp X-quang.",
      answer: "X-ray",
      answerHint: "We need to take an X-ray."
    },
    {
      id: "L156C08",
      type: "fill",
      prompt: "Open your ___ wide, please.",
      hint: "Xin vui lòng mở miệng rộng ra.",
      answer: "mouth",
      answerHint: "Open your mouth wide, please."
    },
    {
      id: "L156C09",
      type: "fill",
      prompt: "Bite down on ___, please.",
      hint: "Xin vui lòng cắn vào cái này.",
      answer: "this",
      answerHint: "Bite down on this, please."
    },
    {
      id: "L156C10",
      type: "dialogue",
      prompt: "Worker: We need to take an X-ray.\nCustomer: Okay.\nWorker: Bite down on this, please.",
      hint: "Thợ: Chúng ta cần chụp X-quang.\nKhách: Được thôi.\nThợ: Xin vui lòng cắn vào cái này.",
      answer: "Worker: We need to take an X-ray.\nCustomer: Okay.\nWorker: Bite down on this, please."
    }
  ]
},
  {
  id: "L157",
  title: "Dental Work Costs",
  titleVi: "Hỏi Về Chi Phí Nha Khoa",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn muốn hỏi về chi phí điều trị nha khoa và bảo hiểm.",
  phrases: [
    {
      english: "How much is a crown?",
      vietnamese: "Bọc răng sứ giá bao nhiêu?",
      pronunciation: "hau much iz uh kraun"
    },
    {
      english: "Does insurance cover this?",
      vietnamese: "Bảo hiểm có chi trả cái này không?",
      pronunciation: "duz in-shur-uhns kuh-ver this"
    },
    {
      english: "Can I see a price list?",
      vietnamese: "Tôi có thể xem bảng giá được không?",
      pronunciation: "kan ai see uh prais list"
    }
  ],
  drill: [
    {
      id: "L157C01",
      type: "read",
      prompt: "How much is a crown?",
      hint: "Bọc răng sứ giá bao nhiêu?",
      answer: "How much is a crown?"
    },
    {
      id: "L157C02",
      type: "recall",
      prompt: "Bọc răng sứ giá bao nhiêu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How much is a crown?"
    },
    {
      id: "L157C03",
      type: "read",
      prompt: "Does insurance cover this?",
      hint: "Bảo hiểm có chi trả cái này không?",
      answer: "Does insurance cover this?"
    },
    {
      id: "L157C04",
      type: "recall",
      prompt: "Bảo hiểm có chi trả cái này không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Does insurance cover this?"
    },
    {
      id: "L157C05",
      type: "read",
      prompt: "Can I see a price list?",
      hint: "Tôi có thể xem bảng giá được không?",
      answer: "Can I see a price list?"
    },
    {
      id: "L157C06",
      type: "recall",
      prompt: "Tôi có thể xem bảng giá được không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can I see a price list?"
    },
    {
      id: "L157C07",
      type: "fill",
      prompt: "How much is a ___?",
      hint: "Bọc răng sứ giá bao nhiêu?",
      answer: "crown",
      answerHint: "How much is a crown?"
    },
    {
      id: "L157C08",
      type: "fill",
      prompt: "Does ___ cover this?",
      hint: "Bảo hiểm có chi trả cái này không?",
      answer: "insurance",
      answerHint: "Does insurance cover this?"
    },
    {
      id: "L157C09",
      type: "fill",
      prompt: "Can I see a ___ list?",
      hint: "Tôi có thể xem bảng giá được không?",
      answer: "price",
      answerHint: "Can I see a price list?"
    },
    {
      id: "L157C10",
      type: "dialogue",
      prompt: "Worker: How much is a crown?\nCustomer: It is $1200.\nWorker: Does insurance cover this?",
      hint: "Thợ: Bọc răng sứ giá bao nhiêu?\nKhách: Giá là 1200 đô.\nThợ: Bảo hiểm có chi trả cái này không?",
      answer: "Worker: How much is a crown?\nCustomer: It is $1200.\nWorker: Does insurance cover this?"
    }
  ]
},
  {
  id: "L158",
  title: "Tooth Extraction: The Nerve",
  titleVi: "Nhổ Răng: Dây Thần Kinh",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi bạn cần trao đổi về việc nhổ răng vì dây thần kinh bị nhiễm trùng.",
  phrases: [
    {
      english: "The nerve is infected.",
      vietnamese: "Dây thần kinh bị nhiễm trùng.",
      pronunciation: "thuh nerv iz in-fek-ted"
    },
    {
      english: "We need to pull the tooth.",
      vietnamese: "Chúng ta cần phải nhổ cái răng này.",
      pronunciation: "wee need tuh pool thuh tooth"
    },
    {
      english: "It might be a little painful.",
      vietnamese: "Có thể hơi đau một chút.",
      pronunciation: "it mite bee uh li-tul payn-ful"
    }
  ],
  drill: [
    {
      id: "L158C01",
      type: "read",
      prompt: "The nerve is infected.",
      hint: "Dây thần kinh bị nhiễm trùng.",
      answer: "The nerve is infected."
    },
    {
      id: "L158C02",
      type: "recall",
      prompt: "Dây thần kinh bị nhiễm trùng.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "The nerve is infected."
    },
    {
      id: "L158C03",
      type: "read",
      prompt: "We need to pull the tooth.",
      hint: "Chúng ta cần phải nhổ cái răng này.",
      answer: "We need to pull the tooth."
    },
    {
      id: "L158C04",
      type: "recall",
      prompt: "Chúng ta cần phải nhổ cái răng này.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "We need to pull the tooth."
    },
    {
      id: "L158C05",
      type: "read",
      prompt: "It might be a little painful.",
      hint: "Có thể hơi đau một chút.",
      answer: "It might be a little painful."
    },
    {
      id: "L158C06",
      type: "recall",
      prompt: "Có thể hơi đau một chút.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It might be a little painful."
    },
    {
      id: "L158C07",
      type: "fill",
      prompt: "The nerve is ___.",
      hint: "Dây thần kinh bị nhiễm trùng.",
      answer: "infected",
      answerHint: "The nerve is infected."
    },
    {
      id: "L158C08",
      type: "fill",
      prompt: "We need to ___ the tooth.",
      hint: "Chúng ta cần phải nhổ cái răng này.",
      answer: "pull",
      answerHint: "We need to pull the tooth."
    },
    {
      id: "L158C09",
      type: "fill",
      prompt: "It might be a little ___.",
      hint: "Có thể hơi đau một chút.",
      answer: "painful",
      answerHint: "It might be a little painful."
    },
    {
      id: "L158C10",
      type: "dialogue",
      prompt: "Worker: The nerve is infected. We need to pull the tooth.\nCustomer: Oh no, will it hurt?\nWorker: It might be a little painful.",
      hint: "Thợ: Dây thần kinh bị nhiễm trùng. Chúng ta cần phải nhổ cái răng này.\nKhách: Ối không, có đau không?\nThợ: Có thể hơi đau một chút.",
      answer: "Worker: The nerve is infected. We need to pull the tooth.\nCustomer: Oh no, will it hurt?\nWorker: It might be a little painful."
    }
  ]
},
  {
  id: "L159",
  title: "Dental Aftercare Instructions",
  titleVi: "Hướng Dẫn Chăm Sóc Răng Sau Thủ Thuật",
  level: "A2",
  context: "Những hướng dẫn này giúp bạn chăm sóc răng miệng sau khi đi khám nha sĩ. (These instructions help you take care of your teeth after visiting the dentist.)",
  phrases: [
    {
      english: "Don't eat for 2 hours.",
      vietnamese: "Không ăn trong 2 tiếng.",
      pronunciation: "dont eet for too a-urz"
    },
    {
      english: "Rinse with salt water.",
      vietnamese: "Súc miệng bằng nước muối.",
      pronunciation: "rinse with solt wa-ter"
    },
    {
      english: "Eat soft foods only.",
      vietnamese: "Chỉ ăn đồ ăn mềm.",
      pronunciation: "eet soft foodz on-lee"
    }
  ],
  drill: [
    {
      id: "L159C01",
      type: "read",
      prompt: "Don't eat for 2 hours.",
      hint: "Không ăn trong 2 tiếng.",
      answer: "Don't eat for 2 hours."
    },
    {
      id: "L159C02",
      type: "recall",
      prompt: "Không ăn trong 2 tiếng.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Don't eat for 2 hours."
    },
    {
      id: "L159C03",
      type: "read",
      prompt: "Rinse with salt water.",
      hint: "Súc miệng bằng nước muối.",
      answer: "Rinse with salt water."
    },
    {
      id: "L159C04",
      type: "recall",
      prompt: "Súc miệng bằng nước muối.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Rinse with salt water."
    },
    {
      id: "L159C05",
      type: "read",
      prompt: "Eat soft foods only.",
      hint: "Chỉ ăn đồ ăn mềm.",
      answer: "Eat soft foods only."
    },
    {
      id: "L159C06",
      type: "recall",
      prompt: "Chỉ ăn đồ ăn mềm.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Eat soft foods only."
    },
    {
      id: "L159C07",
      type: "fill",
      prompt: "Don't eat for ___ hours.",
      hint: "Không ăn trong 2 tiếng.",
      answer: "2",
      answerHint: "Don't eat for 2 hours."
    },
    {
      id: "L159C08",
      type: "fill",
      prompt: "Rinse with ___ water.",
      hint: "Súc miệng bằng nước muối.",
      answer: "salt",
      answerHint: "Rinse with salt water."
    },
    {
      id: "L159C09",
      type: "fill",
      prompt: "Eat ___ foods only.",
      hint: "Chỉ ăn đồ ăn mềm.",
      answer: "soft",
      answerHint: "Eat soft foods only."
    },
    {
      id: "L159C10",
      type: "dialogue",
      prompt: "Worker: Don't eat for 2 hours.\nCustomer: Okay.\nWorker: Rinse with salt water.",
      hint: "Thợ: Không ăn trong 2 tiếng.\nKhách: Được rồi.\nThợ: Súc miệng bằng nước muối.",
      answer: "Worker: Don't eat for 2 hours.\nCustomer: Okay.\nWorker: Rinse with salt water."
    }
  ]
},
  {
  id: "L160",
  title: "Dental Visit Fears",
  titleVi: "Sợ khám răng",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi bạn đưa con đi khám răng và con bạn sợ hãi.",
  phrases: [
    {
      english: "Is it normal to be scared?",
      vietnamese: "Việc sợ hãi có bình thường không?",
      pronunciation: "iz it nor-mal too bee skaird?"
    },
    {
      english: "These are just baby teeth.",
      vietnamese: "Đây chỉ là răng sữa thôi.",
      pronunciation: "theez ar just bay-bee teeth."
    },
    {
      english: "It will be over quickly.",
      vietnamese: "Sẽ xong nhanh thôi.",
      pronunciation: "it wil bee oh-ver kwik-lee."
    }
  ],
  drill: [
    {
      id: "L160C01",
      type: "read",
      prompt: "Is it normal to be scared?",
      hint: "Việc sợ hãi có bình thường không?",
      answer: "Is it normal to be scared?"
    },
    {
      id: "L160C02",
      type: "recall",
      prompt: "Việc sợ hãi có bình thường không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is it normal to be scared?"
    },
    {
      id: "L160C03",
      type: "read",
      prompt: "These are just baby teeth.",
      hint: "Đây chỉ là răng sữa thôi.",
      answer: "These are just baby teeth."
    },
    {
      id: "L160C04",
      type: "recall",
      prompt: "Đây chỉ là răng sữa thôi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "These are just baby teeth."
    },
    {
      id: "L160C05",
      type: "read",
      prompt: "It will be over quickly.",
      hint: "Sẽ xong nhanh thôi.",
      answer: "It will be over quickly."
    },
    {
      id: "L160C06",
      type: "recall",
      prompt: "Sẽ xong nhanh thôi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It will be over quickly."
    },
    {
      id: "L160C07",
      type: "fill",
      prompt: "Is it normal to be ___?",
      hint: "Việc sợ hãi có bình thường không?",
      answer: "scared",
      answerHint: "Is it normal to be scared?"
    },
    {
      id: "L160C08",
      type: "fill",
      prompt: "These are just ___ teeth.",
      hint: "Đây chỉ là răng sữa thôi.",
      answer: "baby",
      answerHint: "These are just baby teeth."
    },
    {
      id: "L160C09",
      type: "fill",
      prompt: "It will be over ___.",
      hint: "Sẽ xong nhanh thôi.",
      answer: "quickly",
      answerHint: "It will be over quickly."
    },
    {
      id: "L160C10",
      type: "dialogue",
      prompt: "Worker: Is your child nervous?\nCustomer: Yes, she's very scared.\nWorker: It will be over quickly.",
      hint: "Thợ: Con chị có lo lắng không?\nKhách: Dạ có, cháu rất sợ.\nThợ: Sẽ xong nhanh thôi.",
      answer: "Worker: Is your child nervous?\nCustomer: Yes, she's very scared.\nWorker: It will be over quickly."
    }
  ]
},
  {
  id: "L161",
  title: "Broken Tooth Emergency",
  titleVi: "Cấp Cứu Răng Bị Gãy",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn cần đi khám răng khẩn cấp vì răng bị gãy và chảy máu.",
  phrases: [
    {
      english: "My tooth broke.",
      vietnamese: "Răng của tôi bị gãy.",
      pronunciation: "mai tooth broke"
    },
    {
      english: "It's bleeding a lot.",
      vietnamese: "Nó đang chảy máu rất nhiều.",
      pronunciation: "its blee-ding a lot"
    },
    {
      english: "I need to see someone today.",
      vietnamese: "Tôi cần gặp ai đó ngay hôm nay.",
      pronunciation: "ai need too see sum-wun too-day"
    }
  ],
  drill: [
    {
      id: "L161C01",
      type: "read",
      prompt: "My tooth broke.",
      hint: "Răng của tôi bị gãy.",
      answer: "My tooth broke."
    },
    {
      id: "L161C02",
      type: "recall",
      prompt: "Răng của tôi bị gãy.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "My tooth broke."
    },
    {
      id: "L161C03",
      type: "read",
      prompt: "It's bleeding a lot.",
      hint: "Nó đang chảy máu rất nhiều.",
      answer: "It's bleeding a lot."
    },
    {
      id: "L161C04",
      type: "recall",
      prompt: "Nó đang chảy máu rất nhiều.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It's bleeding a lot."
    },
    {
      id: "L161C05",
      type: "read",
      prompt: "I need to see someone today.",
      hint: "Tôi cần gặp ai đó ngay hôm nay.",
      answer: "I need to see someone today."
    },
    {
      id: "L161C06",
      type: "recall",
      prompt: "Tôi cần gặp ai đó ngay hôm nay.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I need to see someone today."
    },
    {
      id: "L161C07",
      type: "fill",
      prompt: "My ___ broke.",
      hint: "Răng của tôi bị gãy.",
      answer: "tooth",
      answerHint: "My tooth broke."
    },
    {
      id: "L161C08",
      type: "fill",
      prompt: "It's ___ a lot.",
      hint: "Nó đang chảy máu rất nhiều.",
      answer: "bleeding",
      answerHint: "It's bleeding a lot."
    },
    {
      id: "L161C09",
      type: "fill",
      prompt: "I need to see ___ today.",
      hint: "Tôi cần gặp ai đó ngay hôm nay.",
      answer: "someone",
      answerHint: "I need to see someone today."
    },
    {
      id: "L161C10",
      type: "dialogue",
      prompt: "Worker: What happened?\nCustomer: My tooth broke.\nWorker: It's bleeding?",
      hint: "Thợ: Chuyện gì đã xảy ra?\nKhách: Răng của tôi bị gãy.\nThợ: Nó có chảy máu không?",
      answer: "Worker: What happened?\nCustomer: My tooth broke.\nWorker: It's bleeding?"
    }
  ]
}
  ]
};

export default data;
