import type { Class } from '../types';

const data: Class = {
  id: "at-the-doctor",
  title: "At the Doctor",
  titleVi: "Đi Khám Bác Sĩ",
  lessons: [
  {
  id: "L144",
  title: "Checking In: Appointment",
  titleVi: "Đăng Ký: Có Hẹn Trước",
  level: "A1",
  context: "Học cách đăng ký khi bạn có hẹn trước tại văn phòng bác sĩ hoặc nha sĩ.",
  phrases: [
    {
      english: "I have an appointment.",
      vietnamese: "Tôi có hẹn trước.",
      pronunciation: "ai hav uhn uh-point-ment"
    },
    {
      english: "My appointment is at 10.",
      vietnamese: "Tôi có hẹn lúc 10 giờ.",
      pronunciation: "mai uh-point-ment iz at ten"
    },
    {
      english: "Here is my insurance card.",
      vietnamese: "Đây là thẻ bảo hiểm của tôi.",
      pronunciation: "heer iz mai in-shur-uhns kahrd"
    }
  ],
  drill: [
    {
      id: "L144C01",
      type: "read",
      prompt: "I have an appointment.",
      hint: "Tôi có hẹn trước.",
      answer: "I have an appointment."
    },
    {
      id: "L144C02",
      type: "recall",
      prompt: "Tôi có hẹn trước.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I have an appointment."
    },
    {
      id: "L144C03",
      type: "read",
      prompt: "My appointment is at 10.",
      hint: "Tôi có hẹn lúc 10 giờ.",
      answer: "My appointment is at 10."
    },
    {
      id: "L144C04",
      type: "recall",
      prompt: "Tôi có hẹn lúc 10 giờ.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "My appointment is at 10."
    },
    {
      id: "L144C05",
      type: "read",
      prompt: "Here is my insurance card.",
      hint: "Đây là thẻ bảo hiểm của tôi.",
      answer: "Here is my insurance card."
    },
    {
      id: "L144C06",
      type: "recall",
      prompt: "Đây là thẻ bảo hiểm của tôi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Here is my insurance card."
    },
    {
      id: "L144C07",
      type: "fill",
      prompt: "I have an ___.",
      hint: "Tôi có hẹn trước.",
      answer: "appointment",
      answerHint: "I have an appointment."
    },
    {
      id: "L144C08",
      type: "fill",
      prompt: "My appointment is at ___.",
      hint: "Tôi có hẹn lúc 10 giờ.",
      answer: "10",
      answerHint: "My appointment is at 10."
    },
    {
      id: "L144C09",
      type: "fill",
      prompt: "Here is my ___ card.",
      hint: "Đây là thẻ bảo hiểm của tôi.",
      answer: "insurance",
      answerHint: "Here is my insurance card."
    },
    {
      id: "L144C10",
      type: "dialogue",
      prompt: "Worker: Hello, how can I help you?\nCustomer: I have an appointment.\nWorker: May I see your insurance card?",
      hint: "Thợ: Xin chào, tôi có thể giúp gì cho bạn?\nKhách: Tôi có hẹn trước.\nThợ: Cho tôi xem thẻ bảo hiểm của bạn được không?",
      answer: "Worker: Hello, how can I help you?\nCustomer: I have an appointment.\nWorker: May I see your insurance card?"
    }
  ]
},
  {
  id: "L145",
  title: "Describing Your Symptoms",
  titleVi: "Mô tả triệu chứng bệnh",
  level: "A1",
  context: "Bạn có thể sử dụng những mẫu câu này để mô tả các triệu chứng bệnh của bạn với bác sĩ.",
  phrases: [
    {
      english: "I have a stomachache.",
      vietnamese: "Tôi bị đau bụng.",
      pronunciation: "ai hav uh stuh-muhk-eyk"
    },
    {
      english: "My back hurts.",
      vietnamese: "Tôi bị đau lưng.",
      pronunciation: "mai bak hurts"
    },
    {
      english: "For three days.",
      vietnamese: "Đã ba ngày rồi.",
      pronunciation: "for three days"
    }
  ],
  drill: [
    {
      id: "L145C01",
      type: "read",
      prompt: "I have a stomachache.",
      hint: "Tôi bị đau bụng.",
      answer: "I have a stomachache."
    },
    {
      id: "L145C02",
      type: "recall",
      prompt: "Tôi bị đau bụng.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I have a stomachache."
    },
    {
      id: "L145C03",
      type: "read",
      prompt: "My back hurts.",
      hint: "Tôi bị đau lưng.",
      answer: "My back hurts."
    },
    {
      id: "L145C04",
      type: "recall",
      prompt: "Tôi bị đau lưng.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "My back hurts."
    },
    {
      id: "L145C05",
      type: "read",
      prompt: "For three days.",
      hint: "Đã ba ngày rồi.",
      answer: "For three days."
    },
    {
      id: "L145C06",
      type: "recall",
      prompt: "Đã ba ngày rồi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "For three days."
    },
    {
      id: "L145C07",
      type: "fill",
      prompt: "I have a ___.",
      hint: "Tôi bị đau bụng.",
      answer: "stomachache",
      answerHint: "I have a stomachache."
    },
    {
      id: "L145C08",
      type: "fill",
      prompt: "My ___ hurts.",
      hint: "Tôi bị đau lưng.",
      answer: "back",
      answerHint: "My back hurts."
    },
    {
      id: "L145C09",
      type: "fill",
      prompt: "___ three days.",
      hint: "Đã ba ngày rồi.",
      answer: "For",
      answerHint: "For three days."
    },
    {
      id: "L145C10",
      type: "dialogue",
      prompt: "Worker: What's wrong?\nCustomer: I have a stomachache.\nWorker: For how long?",
      hint: "Thợ: Bạn bị làm sao?\nKhách: Tôi bị đau bụng.\nThợ: Đã bao lâu rồi?",
      answer: "Worker: What's wrong?\nCustomer: I have a stomachache.\nWorker: For how long?"
    }
  ]
},
  {
  id: "L146",
  title: "Doctor's Questions",
  titleVi: "Câu hỏi của bác sĩ",
  level: "A2",
  context: "Học cách hiểu các câu hỏi thường gặp của bác sĩ khi bạn đi khám bệnh.",
  phrases: [
    {
      english: "When did it start?",
      vietnamese: "Nó bắt đầu khi nào?",
      pronunciation: "wen did it start?"
    },
    {
      english: "Does it hurt here?",
      vietnamese: "Ở đây có đau không?",
      pronunciation: "duz it hurt heer?"
    },
    {
      english: "Any allergies?",
      vietnamese: "Có bị dị ứng gì không?",
      pronunciation: "en-ee al-er-jeez?"
    }
  ],
  drill: [
    {
      id: "L146C01",
      type: "read",
      prompt: "When did it start?",
      hint: "Nó bắt đầu khi nào?",
      answer: "When did it start?"
    },
    {
      id: "L146C02",
      type: "recall",
      prompt: "Nó bắt đầu khi nào?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "When did it start?"
    },
    {
      id: "L146C03",
      type: "read",
      prompt: "Does it hurt here?",
      hint: "Ở đây có đau không?",
      answer: "Does it hurt here?"
    },
    {
      id: "L146C04",
      type: "recall",
      prompt: "Ở đây có đau không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Does it hurt here?"
    },
    {
      id: "L146C05",
      type: "read",
      prompt: "Any allergies?",
      hint: "Có bị dị ứng gì không?",
      answer: "Any allergies?"
    },
    {
      id: "L146C06",
      type: "recall",
      prompt: "Có bị dị ứng gì không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Any allergies?"
    },
    {
      id: "L146C07",
      type: "fill",
      prompt: "When did it ___?",
      hint: "Nó bắt đầu khi nào?",
      answer: "start",
      answerHint: "When did it start?"
    },
    {
      id: "L146C08",
      type: "fill",
      prompt: "Does it ___ here?",
      hint: "Ở đây có đau không?",
      answer: "hurt",
      answerHint: "Does it hurt here?"
    },
    {
      id: "L146C09",
      type: "fill",
      prompt: "Any ___?",
      hint: "Có bị dị ứng gì không?",
      answer: "allergies",
      answerHint: "Any allergies?"
    },
    {
      id: "L146C10",
      type: "dialogue",
      prompt: "Doctor: When did it start?\nPatient: About three days ago.\nDoctor: Does it hurt here?",
      hint: "Bác sĩ: Nó bắt đầu khi nào?\nBệnh nhân: Khoảng ba ngày trước.\nBác sĩ: Ở đây có đau không?",
      answer: "Doctor: When did it start?\nPatient: About three days ago.\nDoctor: Does it hurt here?"
    }
  ]
},
  {
  id: "L147",
  title: "Blood Test Instructions",
  titleVi: "Hướng Dẫn Xét Nghiệm Máu",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn cần đi xét nghiệm máu và nhận kết quả từ bác sĩ hoặc y tá.",
  phrases: [
    {
      english: "I need a blood test.",
      vietnamese: "Tôi cần xét nghiệm máu.",
      pronunciation: "ai need uh bluhd test"
    },
    {
      english: "Fast for twelve hours.",
      vietnamese: "Nhịn ăn trong mười hai tiếng.",
      pronunciation: "fast for twelv au-ers"
    },
    {
      english: "Results in three days.",
      vietnamese: "Có kết quả trong ba ngày.",
      pronunciation: "ri-zults in three days"
    }
  ],
  drill: [
    {
      id: "L147C01",
      type: "read",
      prompt: "I need a blood test.",
      hint: "Tôi cần xét nghiệm máu.",
      answer: "I need a blood test."
    },
    {
      id: "L147C02",
      type: "recall",
      prompt: "Tôi cần xét nghiệm máu.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I need a blood test."
    },
    {
      id: "L147C03",
      type: "read",
      prompt: "Fast for twelve hours.",
      hint: "Nhịn ăn trong mười hai tiếng.",
      answer: "Fast for twelve hours."
    },
    {
      id: "L147C04",
      type: "recall",
      prompt: "Nhịn ăn trong mười hai tiếng.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Fast for twelve hours."
    },
    {
      id: "L147C05",
      type: "read",
      prompt: "Results in three days.",
      hint: "Có kết quả trong ba ngày.",
      answer: "Results in three days."
    },
    {
      id: "L147C06",
      type: "recall",
      prompt: "Có kết quả trong ba ngày.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Results in three days."
    },
    {
      id: "L147C07",
      type: "fill",
      prompt: "I need a ___ test.",
      hint: "Tôi cần xét nghiệm máu.",
      answer: "blood",
      answerHint: "I need a blood test."
    },
    {
      id: "L147C08",
      type: "fill",
      prompt: "Fast for ___ hours.",
      hint: "Nhịn ăn trong mười hai tiếng.",
      answer: "twelve",
      answerHint: "Fast for twelve hours."
    },
    {
      id: "L147C09",
      type: "fill",
      prompt: "Results in three ___.",
      hint: "Có kết quả trong ba ngày.",
      answer: "days",
      answerHint: "Results in three days."
    },
    {
      id: "L147C10",
      type: "dialogue",
      prompt: "Worker: Do you need a blood test?\nCustomer: Yes, I do.\nWorker: Fast for twelve hours.",
      hint: "Thợ: Bạn có cần xét nghiệm máu không?\nKhách: Vâng, tôi cần.\nThợ: Nhịn ăn trong mười hai tiếng.",
      answer: "Worker: Do you need a blood test?\nCustomer: Yes, I do.\nWorker: Fast for twelve hours."
    }
  ]
},
  {
  id: "L148",
  title: "High Blood Pressure",
  titleVi: "Cao Huyết Áp",
  level: "A2",
  context: "Những mẫu câu này giúp bạn hiểu rõ hơn về chẩn đoán cao huyết áp và cách dùng thuốc hàng ngày.",
  phrases: [
    {
      english: "You have high blood pressure.",
      vietnamese: "Bạn bị cao huyết áp.",
      pronunciation: "yoo hav hai bluhd presh-er"
    },
    {
      english: "You need to take medicine.",
      vietnamese: "Bạn cần uống thuốc.",
      pronunciation: "yoo need too tayk med-i-sin"
    },
    {
      english: "Take medicine every day.",
      vietnamese: "Uống thuốc mỗi ngày.",
      pronunciation: "tayk med-i-sin ev-ree day"
    }
  ],
  drill: [
    {
      id: "L148C01",
      type: "read",
      prompt: "You have high blood pressure.",
      hint: "Bạn bị cao huyết áp.",
      answer: "You have high blood pressure."
    },
    {
      id: "L148C02",
      type: "recall",
      prompt: "Bạn bị cao huyết áp.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "You have high blood pressure."
    },
    {
      id: "L148C03",
      type: "read",
      prompt: "You need to take medicine.",
      hint: "Bạn cần uống thuốc.",
      answer: "You need to take medicine."
    },
    {
      id: "L148C04",
      type: "recall",
      prompt: "Bạn cần uống thuốc.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "You need to take medicine."
    },
    {
      id: "L148C05",
      type: "read",
      prompt: "Take medicine every day.",
      hint: "Uống thuốc mỗi ngày.",
      answer: "Take medicine every day."
    },
    {
      id: "L148C06",
      type: "recall",
      prompt: "Uống thuốc mỗi ngày.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Take medicine every day."
    },
    {
      id: "L148C07",
      type: "fill",
      prompt: "You have high blood ___.",
      hint: "Bạn bị cao huyết áp.",
      answer: "pressure",
      answerHint: "You have high blood pressure."
    },
    {
      id: "L148C08",
      type: "fill",
      prompt: "You need to take ___.",
      hint: "Bạn cần uống thuốc.",
      answer: "medicine",
      answerHint: "You need to take medicine."
    },
    {
      id: "L148C09",
      type: "fill",
      prompt: "Take medicine every ___.",
      hint: "Uống thuốc mỗi ngày.",
      answer: "day",
      answerHint: "Take medicine every day."
    },
    {
      id: "L148C10",
      type: "dialogue",
      prompt: "Worker: Do you take medicine?\nCustomer: Yes, I take medicine.\nWorker: Do you take medicine every day?",
      hint: "Thợ: Bạn có uống thuốc không?\nKhách: Có, tôi uống thuốc.\nThợ: Bạn có uống thuốc mỗi ngày không?",
      answer: "Worker: Do you take medicine?\nCustomer: Yes, I take medicine.\nWorker: Do you take medicine every day?"
    }
  ]
},
  {
  id: "L149",
  title: "Treatment Options: Questions",
  titleVi: "Các lựa chọn điều trị: Hỏi đáp",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi bạn muốn hỏi bác sĩ về các lựa chọn điều trị khác nhau và tác dụng phụ của chúng.",
  phrases: [
    {
      english: "Is there another option?",
      vietnamese: "Có lựa chọn nào khác không?",
      pronunciation: "iz ther uh-nuh-ther op-shun"
    },
    {
      english: "What are the side effects?",
      vietnamese: "Những tác dụng phụ là gì?",
      pronunciation: "wot ar thuh side i-fekts"
    },
    {
      english: "How long is the recovery?",
      vietnamese: "Thời gian hồi phục là bao lâu?",
      pronunciation: "hau long iz thuh ri-kuv-uh-ree"
    }
  ],
  drill: [
    {
      id: "L149C01",
      type: "read",
      prompt: "Is there another option?",
      hint: "Có lựa chọn nào khác không?",
      answer: "Is there another option?"
    },
    {
      id: "L149C02",
      type: "recall",
      prompt: "Có lựa chọn nào khác không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is there another option?"
    },
    {
      id: "L149C03",
      type: "read",
      prompt: "What are the side effects?",
      hint: "Những tác dụng phụ là gì?",
      answer: "What are the side effects?"
    },
    {
      id: "L149C04",
      type: "recall",
      prompt: "Những tác dụng phụ là gì?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What are the side effects?"
    },
    {
      id: "L149C05",
      type: "read",
      prompt: "How long is the recovery?",
      hint: "Thời gian hồi phục là bao lâu?",
      answer: "How long is the recovery?"
    },
    {
      id: "L149C06",
      type: "recall",
      prompt: "Thời gian hồi phục là bao lâu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How long is the recovery?"
    },
    {
      id: "L149C07",
      type: "fill",
      prompt: "Is there another ___?",
      hint: "Có lựa chọn nào khác không?",
      answer: "option",
      answerHint: "Is there another option?"
    },
    {
      id: "L149C08",
      type: "fill",
      prompt: "What are the side ___?",
      hint: "Những tác dụng phụ là gì?",
      answer: "effects",
      answerHint: "What are the side effects?"
    },
    {
      id: "L149C09",
      type: "fill",
      prompt: "How long is the ___?",
      hint: "Thời gian hồi phục là bao lâu?",
      answer: "recovery",
      answerHint: "How long is the recovery?"
    },
    {
      id: "L149C10",
      type: "dialogue",
      prompt: "Worker: Is there another option for my back pain?\nCustomer: We could try physical therapy.\nWorker: How long is the recovery?",
      hint: "Thợ: Có lựa chọn nào khác cho đau lưng của tôi không?\nKhách: Chúng ta có thể thử vật lý trị liệu.\nThợ: Thời gian hồi phục là bao lâu?",
      answer: "Worker: Is there another option for my back pain?\nCustomer: We could try physical therapy.\nWorker: How long is the recovery?"
    }
  ]
},
  {
  id: "L150",
  title: "Follow-up Appointment Scheduling",
  titleVi: "Lên lịch hẹn tái khám",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn muốn lên lịch hẹn tái khám cho khách hàng và hướng dẫn họ khi nào cần liên hệ lại.",
  phrases: [
    {
      english: "Come back in two weeks.",
      vietnamese: "Hãy quay lại sau hai tuần.",
      pronunciation: "kuhm bak in too weeks"
    },
    {
      english: "Call me if it gets worse.",
      vietnamese: "Gọi cho tôi nếu tình trạng trở nên tệ hơn.",
      pronunciation: "kawl mee if it gets wurse"
    },
    {
      english: "Let's schedule a follow-up.",
      vietnamese: "Chúng ta hãy lên lịch hẹn tái khám.",
      pronunciation: "lets sked-jool uh fol-oh-up"
    }
  ],
  drill: [
    {
      id: "L150C01",
      type: "read",
      prompt: "Come back in two weeks.",
      hint: "Hãy quay lại sau hai tuần.",
      answer: "Come back in two weeks."
    },
    {
      id: "L150C02",
      type: "recall",
      prompt: "Hãy quay lại sau hai tuần.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Come back in two weeks."
    },
    {
      id: "L150C03",
      type: "read",
      prompt: "Call me if it gets worse.",
      hint: "Gọi cho tôi nếu tình trạng trở nên tệ hơn.",
      answer: "Call me if it gets worse."
    },
    {
      id: "L150C04",
      type: "recall",
      prompt: "Gọi cho tôi nếu tình trạng trở nên tệ hơn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Call me if it gets worse."
    },
    {
      id: "L150C05",
      type: "read",
      prompt: "Let's schedule a follow-up.",
      hint: "Chúng ta hãy lên lịch hẹn tái khám.",
      answer: "Let's schedule a follow-up."
    },
    {
      id: "L150C06",
      type: "recall",
      prompt: "Chúng ta hãy lên lịch hẹn tái khám.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Let's schedule a follow-up."
    },
    {
      id: "L150C07",
      type: "fill",
      prompt: "Come back in two ___.",
      hint: "Hãy quay lại sau hai tuần.",
      answer: "weeks",
      answerHint: "Come back in two weeks."
    },
    {
      id: "L150C08",
      type: "fill",
      prompt: "Call me if it gets ___.",
      hint: "Gọi cho tôi nếu tình trạng trở nên tệ hơn.",
      answer: "worse",
      answerHint: "Call me if it gets worse."
    },
    {
      id: "L150C09",
      type: "fill",
      prompt: "Let's schedule a ___.",
      hint: "Chúng ta hãy lên lịch hẹn tái khám.",
      answer: "follow-up",
      answerHint: "Let's schedule a follow-up."
    },
    {
      id: "L150C10",
      type: "dialogue",
      prompt: "Worker: How are you feeling today?\nCustomer: I feel a little better.\nWorker: Great. Let's schedule a follow-up.",
      hint: "Thợ: Hôm nay bạn cảm thấy thế nào?\nKhách: Tôi cảm thấy tốt hơn một chút.\nThợ: Tuyệt vời. Chúng ta hãy lên lịch hẹn tái khám.",
      answer: "Worker: How are you feeling today?\nCustomer: I feel a little better.\nWorker: Great. Let's schedule a follow-up."
    }
  ]
},
  {
  id: "L151",
  title: "Medical Forms: Key Info",
  titleVi: "Điền Thông Tin Y Tế",
  level: "B1",
  context: "Sử dụng các cụm từ này khi điền vào mẫu đơn y tế hoặc nói chuyện với bác sĩ.",
  phrases: [
    {
      english: "Emergency contact person?",
      vietnamese: "Người liên lạc khẩn cấp là ai?",
      pronunciation: "ee-MER-jen-see KON-takt PER-son"
    },
    {
      english: "Are you taking any medications?",
      vietnamese: "Bạn có đang uống thuốc gì không?",
      pronunciation: "are yoo TAY-king EN-ee med-ih-KAY-shuns"
    },
    {
      english: "Do you have any allergies?",
      vietnamese: "Bạn có bị dị ứng gì không?",
      pronunciation: "doo yoo hav EN-ee AL-er-jees"
    }
  ],
  drill: [
    {
      id: "L151C01",
      type: "read",
      prompt: "Emergency contact person?",
      hint: "Người liên lạc khẩn cấp là ai?",
      answer: "Emergency contact person?"
    },
    {
      id: "L151C02",
      type: "recall",
      prompt: "Người liên lạc khẩn cấp là ai?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Emergency contact person?"
    },
    {
      id: "L151C03",
      type: "read",
      prompt: "Are you taking any medications?",
      hint: "Bạn có đang uống thuốc gì không?",
      answer: "Are you taking any medications?"
    },
    {
      id: "L151C04",
      type: "recall",
      prompt: "Bạn có đang uống thuốc gì không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Are you taking any medications?"
    },
    {
      id: "L151C05",
      type: "read",
      prompt: "Do you have any allergies?",
      hint: "Bạn có bị dị ứng gì không?",
      answer: "Do you have any allergies?"
    },
    {
      id: "L151C06",
      type: "recall",
      prompt: "Bạn có bị dị ứng gì không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Do you have any allergies?"
    },
    {
      id: "L151C07",
      type: "fill",
      prompt: "Emergency ___ person?",
      hint: "Người liên lạc khẩn cấp là ai?",
      answer: "contact",
      answerHint: "Emergency contact person?"
    },
    {
      id: "L151C08",
      type: "fill",
      prompt: "Are you taking any ___?",
      hint: "Bạn có đang uống thuốc gì không?",
      answer: "medications",
      answerHint: "Are you taking any medications?"
    },
    {
      id: "L151C09",
      type: "fill",
      prompt: "Do you have any ___?",
      hint: "Bạn có bị dị ứng gì không?",
      answer: "allergies",
      answerHint: "Do you have any allergies?"
    },
    {
      id: "L151C10",
      type: "dialogue",
      prompt: "Nurse: Emergency contact person?\nPatient: My son, John.\nNurse: What's his phone number?",
      hint: "Y tá: Người liên lạc khẩn cấp là ai?\nBệnh nhân: Con trai tôi, John.\nY tá: Số điện thoại của anh ấy là gì?",
      answer: "Nurse: Emergency contact person?\nPatient: My son, John.\nNurse: What's his phone number?"
    }
  ]
},
  {
  id: "L152",
  title: "Insurance Coverage Questions",
  titleVi: "Hỏi Về Bảo Hiểm",
  level: "B1",
  context: "Sử dụng các cụm từ này khi bạn muốn hỏi về bảo hiểm của mình, ví dụ như khi đi khám bệnh hoặc mua thuốc.",
  phrases: [
    {
      english: "Does my insurance cover this?",
      vietnamese: "Bảo hiểm của tôi có chi trả cho cái này không?",
      pronunciation: "duz mai in-shur-uhns kuh-ver this?"
    },
    {
      english: "How much will I owe?",
      vietnamese: "Tôi sẽ phải trả bao nhiêu?",
      pronunciation: "hau much wil ai oh?"
    },
    {
      english: "What is my copay?",
      vietnamese: "Tiền đồng chi trả của tôi là bao nhiêu?",
      pronunciation: "wuht iz mai koh-pay?"
    }
  ],
  drill: [
    {
      id: "L152C01",
      type: "read",
      prompt: "Does my insurance cover this?",
      hint: "Bảo hiểm của tôi có chi trả cho cái này không?",
      answer: "Does my insurance cover this?"
    },
    {
      id: "L152C02",
      type: "recall",
      prompt: "Bảo hiểm của tôi có chi trả cho cái này không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Does my insurance cover this?"
    },
    {
      id: "L152C03",
      type: "read",
      prompt: "How much will I owe?",
      hint: "Tôi sẽ phải trả bao nhiêu?",
      answer: "How much will I owe?"
    },
    {
      id: "L152C04",
      type: "recall",
      prompt: "Tôi sẽ phải trả bao nhiêu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How much will I owe?"
    },
    {
      id: "L152C05",
      type: "read",
      prompt: "What is my copay?",
      hint: "Tiền đồng chi trả của tôi là bao nhiêu?",
      answer: "What is my copay?"
    },
    {
      id: "L152C06",
      type: "recall",
      prompt: "Tiền đồng chi trả của tôi là bao nhiêu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What is my copay?"
    },
    {
      id: "L152C07",
      type: "fill",
      prompt: "Does my insurance ___ this?",
      hint: "Bảo hiểm của tôi có chi trả cho cái này không?",
      answer: "cover",
      answerHint: "Does my insurance cover this?"
    },
    {
      id: "L152C08",
      type: "fill",
      prompt: "How much will I ___?",
      hint: "Tôi sẽ phải trả bao nhiêu?",
      answer: "owe",
      answerHint: "How much will I owe?"
    },
    {
      id: "L152C09",
      type: "fill",
      prompt: "What is my ___?",
      hint: "Tiền đồng chi trả của tôi là bao nhiêu?",
      answer: "copay",
      answerHint: "What is my copay?"
    },
    {
      id: "L152C10",
      type: "dialogue",
      prompt: "Worker: Does my insurance cover this visit?\nCustomer: Let me check your insurance card. Yes, it does.\nWorker: Great. What is my copay?",
      hint: "Thợ: Bảo hiểm của tôi có chi trả cho lần khám này không?\nKhách: Để tôi kiểm tra thẻ bảo hiểm của bạn. Có, bảo hiểm có chi trả.\nThợ: Tuyệt vời. Tiền đồng chi trả của tôi là bao nhiêu?",
      answer: "Worker: Does my insurance cover this visit?\nCustomer: Let me check your insurance card. Yes, it does.\nWorker: Great. What is my copay?"
    }
  ]
}
  ]
};

export default data;
