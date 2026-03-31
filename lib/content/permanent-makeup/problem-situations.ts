import type { Class } from '../types';

const problemSituations: Class = {
  id: "pmu-problem-situations",
  title: "Problem Situations",
  titleVi: "Tình Huống Có Vấn Đề",
  lessons: [
  {
  id: "L97",
  title: "Unhappy with Results",
  titleVi: "Không hài lòng với kết quả",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi khách hàng không hài lòng với kết quả phun xăm thẩm mỹ sau khi đã lành.",
  phrases: [
    {
      english: "I understand your concern.",
      vietnamese: "Tôi hiểu sự lo lắng của bạn.",
      pronunciation: "ai un-der-stand yor con-sern"
    },
    {
      english: "Let's see what we can do.",
      vietnamese: "Chúng ta xem có thể làm gì nhé.",
      pronunciation: "lets see wot wee can doo"
    },
    {
      english: "How long has it been?",
      vietnamese: "Đã bao lâu rồi ạ?",
      pronunciation: "how long haz it been"
    }
  ],
  drill: [
    {
      id: "L97C01",
      type: "read",
      prompt: "I understand your concern.",
      hint: "Tôi hiểu sự lo lắng của bạn.",
      answer: "I understand your concern."
    },
    {
      id: "L97C02",
      type: "recall",
      prompt: "Tôi hiểu sự lo lắng của bạn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I understand your concern."
    },
    {
      id: "L97C03",
      type: "read",
      prompt: "Let's see what we can do.",
      hint: "Chúng ta xem có thể làm gì nhé.",
      answer: "Let's see what we can do."
    },
    {
      id: "L97C04",
      type: "recall",
      prompt: "Chúng ta xem có thể làm gì nhé.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Let's see what we can do."
    },
    {
      id: "L97C05",
      type: "read",
      prompt: "How long has it been?",
      hint: "Đã bao lâu rồi ạ?",
      answer: "How long has it been?"
    },
    {
      id: "L97C06",
      type: "recall",
      prompt: "Đã bao lâu rồi ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How long has it been?"
    },
    {
      id: "L97C07",
      type: "fill",
      prompt: "I understand your ___.",
      hint: "Tôi hiểu sự lo lắng của bạn.",
      answer: "concern",
      answerHint: "I understand your concern."
    },
    {
      id: "L97C08",
      type: "fill",
      prompt: "Let's see what we can ___.",
      hint: "Chúng ta xem có thể làm gì nhé.",
      answer: "do",
      answerHint: "Let's see what we can do."
    },
    {
      id: "L97C09",
      type: "fill",
      prompt: "How ___ has it been?",
      hint: "Đã bao lâu rồi ạ?",
      answer: "long",
      answerHint: "How long has it been?"
    },
    {
      id: "L97C10",
      type: "dialogue",
      prompt: "Worker: How long has it been?\nCustomer: About two months.\nWorker: I understand your concern. Let's see what we can do.",
      hint: "Thợ: Đã bao lâu rồi ạ?\nKhách: Khoảng hai tháng.\nThợ: Tôi hiểu sự lo lắng của bạn. Chúng ta xem có thể làm gì nhé.",
      answer: "Worker: How long has it been?\nCustomer: About two months.\nWorker: I understand your concern. Let's see what we can do."
    }
  ]
},
  {
  id: "L98",
  title: "Allergic Reaction: See Doctor",
  titleVi: "Dị ứng: Gặp bác sĩ ngay",
  level: "A2",
  context: "Những mẫu câu này dùng khi bạn nghi ngờ bị dị ứng sau khi làm đẹp và cần đi khám bác sĩ.",
  phrases: [
    {
      english: "I have an allergic reaction.",
      vietnamese: "Tôi bị dị ứng.",
      pronunciation: "ai hav an uh-lur-jik ree-ak-shun"
    },
    {
      english: "I need to see a doctor.",
      vietnamese: "Tôi cần đi khám bác sĩ.",
      pronunciation: "ai need too see uh dok-tur"
    },
    {
      english: "It's getting worse quickly.",
      vietnamese: "Nó đang trở nên tệ hơn nhanh chóng.",
      pronunciation: "its get-ing wurss kwik-lee"
    }
  ],
  drill: [
    {
      id: "L98C01",
      type: "read",
      prompt: "I have an allergic reaction.",
      hint: "Tôi bị dị ứng.",
      answer: "I have an allergic reaction."
    },
    {
      id: "L98C02",
      type: "recall",
      prompt: "Tôi bị dị ứng.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I have an allergic reaction."
    },
    {
      id: "L98C03",
      type: "read",
      prompt: "I need to see a doctor.",
      hint: "Tôi cần đi khám bác sĩ.",
      answer: "I need to see a doctor."
    },
    {
      id: "L98C04",
      type: "recall",
      prompt: "Tôi cần đi khám bác sĩ.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I need to see a doctor."
    },
    {
      id: "L98C05",
      type: "read",
      prompt: "It's getting worse quickly.",
      hint: "Nó đang trở nên tệ hơn nhanh chóng.",
      answer: "It's getting worse quickly."
    },
    {
      id: "L98C06",
      type: "recall",
      prompt: "Nó đang trở nên tệ hơn nhanh chóng.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It's getting worse quickly."
    },
    {
      id: "L98C07",
      type: "fill",
      prompt: "I have an ___ reaction.",
      hint: "Tôi bị dị ứng.",
      answer: "allergic",
      answerHint: "I have an allergic reaction."
    },
    {
      id: "L98C08",
      type: "fill",
      prompt: "I need to see a ___.",
      hint: "Tôi cần đi khám bác sĩ.",
      answer: "doctor",
      answerHint: "I need to see a doctor."
    },
    {
      id: "L98C09",
      type: "fill",
      prompt: "It's getting ___ quickly.",
      hint: "Nó đang trở nên tệ hơn nhanh chóng.",
      answer: "worse",
      answerHint: "It's getting worse quickly."
    },
    {
      id: "L98C10",
      type: "dialogue",
      prompt: "Worker: What happened?\nCustomer: I have an allergic reaction.\nWorker: You need to see a doctor.",
      hint: "Thợ: Chuyện gì đã xảy ra?\nKhách: Tôi bị dị ứng.\nThợ: Bạn cần đi khám bác sĩ.",
      answer: "Worker: What happened?\nCustomer: I have an allergic reaction.\nWorker: You need to see a doctor."
    }
  ]
},
  {
  id: "L99",
  title: "Handling Refund Requests",
  titleVi: "Xử Lý Yêu Cầu Hoàn Tiền",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi khách hàng PMU muốn được hoàn tiền.",
  phrases: [
    {
      english: "I understand your frustration.",
      vietnamese: "Tôi hiểu sự thất vọng của bạn.",
      pronunciation: "ai un-der-stand yor frus-tray-shun"
    },
    {
      english: "Let me look into this.",
      vietnamese: "Để tôi xem xét việc này.",
      pronunciation: "let mee luk in-too this"
    },
    {
      english: "How can I help you?",
      vietnamese: "Tôi có thể giúp gì cho bạn?",
      pronunciation: "hau kan ai help yoo"
    }
  ],
  drill: [
    {
      id: "L99C01",
      type: "read",
      prompt: "I understand your frustration.",
      hint: "Tôi hiểu sự thất vọng của bạn.",
      answer: "I understand your frustration."
    },
    {
      id: "L99C02",
      type: "recall",
      prompt: "Tôi hiểu sự thất vọng của bạn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I understand your frustration."
    },
    {
      id: "L99C03",
      type: "read",
      prompt: "Let me look into this.",
      hint: "Để tôi xem xét việc này.",
      answer: "Let me look into this."
    },
    {
      id: "L99C04",
      type: "recall",
      prompt: "Để tôi xem xét việc này.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Let me look into this."
    },
    {
      id: "L99C05",
      type: "read",
      prompt: "How can I help you?",
      hint: "Tôi có thể giúp gì cho bạn?",
      answer: "How can I help you?"
    },
    {
      id: "L99C06",
      type: "recall",
      prompt: "Tôi có thể giúp gì cho bạn?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How can I help you?"
    },
    {
      id: "L99C07",
      type: "fill",
      prompt: "I understand your ___.",
      hint: "Tôi hiểu sự thất vọng của bạn.",
      answer: "frustration",
      answerHint: "I understand your frustration."
    },
    {
      id: "L99C08",
      type: "fill",
      prompt: "Let me look ___ this.",
      hint: "Để tôi xem xét việc này.",
      answer: "into",
      answerHint: "Let me look into this."
    },
    {
      id: "L99C09",
      type: "fill",
      prompt: "How can I ___ you?",
      hint: "Tôi có thể giúp gì cho bạn?",
      answer: "help",
      answerHint: "How can I help you?"
    },
    {
      id: "L99C10",
      type: "dialogue",
      prompt: "Worker: I understand your frustration. How can I help you?\nCustomer: I want a refund. I'm not happy with the result.\nWorker: Let me look into this for you.",
      hint: "Thợ: Tôi hiểu sự thất vọng của bạn. Tôi có thể giúp gì cho bạn?\nKhách: Tôi muốn được hoàn tiền. Tôi không hài lòng với kết quả.\nThợ: Để tôi xem xét việc này cho bạn.",
      answer: "Worker: I understand your frustration. How can I help you?\nCustomer: I want a refund. I'm not happy with the result.\nWorker: Let me look into this for you."
    }
  ]
},
  {
  id: "L100",
  title: "Fixable vs. Not Fixable",
  titleVi: "Sửa Được và Không Sửa Được",
  level: "B1",
  context: "Sử dụng các cụm từ này để giải thích cho khách hàng về những gì có thể sửa được và không thể sửa được trong quá trình làm đẹp vĩnh viễn.",
  phrases: [
    {
      english: "Color correction is possible.",
      vietnamese: "Chỉnh sửa màu sắc là có thể.",
      pronunciation: "KUH-ler kuh-REK-shun iz PAH-suh-bul"
    },
    {
      english: "Shape changes are difficult.",
      vietnamese: "Thay đổi hình dạng thì khó.",
      pronunciation: "SHAPE CHAYN-jez ar DIH-fih-kult"
    },
    {
      english: "Complete removal isn't always possible.",
      vietnamese: "Loại bỏ hoàn toàn không phải lúc nào cũng có thể.",
      pronunciation: "kuhm-PLEET rih-MOO-vul IZ-unt AWL-wayz PAH-suh-bul"
    }
  ],
  drill: [
    {
      id: "L100C01",
      type: "read",
      prompt: "Color correction is possible.",
      hint: "Chỉnh sửa màu sắc là có thể.",
      answer: "Color correction is possible."
    },
    {
      id: "L100C02",
      type: "recall",
      prompt: "Chỉnh sửa màu sắc là có thể.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Color correction is possible."
    },
    {
      id: "L100C03",
      type: "read",
      prompt: "Shape changes are difficult.",
      hint: "Thay đổi hình dạng thì khó.",
      answer: "Shape changes are difficult."
    },
    {
      id: "L100C04",
      type: "recall",
      prompt: "Thay đổi hình dạng thì khó.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Shape changes are difficult."
    },
    {
      id: "L100C05",
      type: "read",
      prompt: "Complete removal isn't always possible.",
      hint: "Loại bỏ hoàn toàn không phải lúc nào cũng có thể.",
      answer: "Complete removal isn't always possible."
    },
    {
      id: "L100C06",
      type: "recall",
      prompt: "Loại bỏ hoàn toàn không phải lúc nào cũng có thể.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Complete removal isn't always possible."
    },
    {
      id: "L100C07",
      type: "fill",
      prompt: "___ correction is possible.",
      hint: "Chỉnh sửa màu sắc là có thể.",
      answer: "Color",
      answerHint: "Color correction is possible."
    },
    {
      id: "L100C08",
      type: "fill",
      prompt: "Shape changes are ___.",
      hint: "Thay đổi hình dạng thì khó.",
      answer: "difficult",
      answerHint: "Shape changes are difficult."
    },
    {
      id: "L100C09",
      type: "fill",
      prompt: "Complete ___ isn't always possible.",
      hint: "Loại bỏ hoàn toàn không phải lúc nào cũng có thể.",
      answer: "removal",
      answerHint: "Complete removal isn't always possible."
    },
    {
      id: "L100C10",
      type: "dialogue",
      prompt: "Worker: What do you want to fix?\nCustomer: The color is wrong.\nWorker: Color correction is possible.",
      hint: "Thợ: Bạn muốn sửa gì?\nKhách: Màu sắc bị sai.\nThợ: Chỉnh sửa màu sắc là có thể.",
      answer: "Worker: What do you want to fix?\nCustomer: The color is wrong.\nWorker: Color correction is possible."
    }
  ]
},
  {
  id: "L101",
  title: "Responding to Bad Reviews",
  titleVi: "Trả lời đánh giá xấu",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi bạn muốn trả lời những đánh giá tiêu cực về dịch vụ làm đẹp của bạn một cách chuyên nghiệp.",
  phrases: [
    {
      english: "Thank you for your feedback.",
      vietnamese: "Cảm ơn bạn đã phản hồi.",
      pronunciation: "thank yoo for yor feed-bak"
    },
    {
      english: "I'm sorry you had a bad experience.",
      vietnamese: "Tôi rất tiếc vì bạn đã có một trải nghiệm không tốt.",
      pronunciation: "ime sor-ee yoo had a bad ek-speer-ee-ens"
    },
    {
      english: "How can I make it right?",
      vietnamese: "Tôi có thể làm gì để khắc phục?",
      pronunciation: "how kan ai make it rait"
    }
  ],
  drill: [
    {
      id: "L101C01",
      type: "read",
      prompt: "Thank you for your feedback.",
      hint: "Cảm ơn bạn đã phản hồi.",
      answer: "Thank you for your feedback."
    },
    {
      id: "L101C02",
      type: "recall",
      prompt: "Cảm ơn bạn đã phản hồi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Thank you for your feedback."
    },
    {
      id: "L101C03",
      type: "read",
      prompt: "I'm sorry you had a bad experience.",
      hint: "Tôi rất tiếc vì bạn đã có một trải nghiệm không tốt.",
      answer: "I'm sorry you had a bad experience."
    },
    {
      id: "L101C04",
      type: "recall",
      prompt: "Tôi rất tiếc vì bạn đã có một trải nghiệm không tốt.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I'm sorry you had a bad experience."
    },
    {
      id: "L101C05",
      type: "read",
      prompt: "How can I make it right?",
      hint: "Tôi có thể làm gì để khắc phục?",
      answer: "How can I make it right?"
    },
    {
      id: "L101C06",
      type: "recall",
      prompt: "Tôi có thể làm gì để khắc phục?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How can I make it right?"
    },
    {
      id: "L101C07",
      type: "fill",
      prompt: "Thank you for your ___.",
      hint: "Cảm ơn bạn đã phản hồi.",
      answer: "feedback",
      answerHint: "Thank you for your feedback."
    },
    {
      id: "L101C08",
      type: "fill",
      prompt: "I'm sorry you had a bad ___.",
      hint: "Tôi rất tiếc vì bạn đã có một trải nghiệm không tốt.",
      answer: "experience",
      answerHint: "I'm sorry you had a bad experience."
    },
    {
      id: "L101C09",
      type: "fill",
      prompt: "How can I make it ___?",
      hint: "Tôi có thể làm gì để khắc phục?",
      answer: "right",
      answerHint: "How can I make it right?"
    },
    {
      id: "L101C10",
      type: "dialogue",
      prompt: "Worker: Thank you for your feedback. Can you tell me more?\nCustomer: I didn't like the color.\nWorker: I'm sorry you had a bad experience. How can I make it right?",
      hint: "Thợ: Cảm ơn bạn đã phản hồi. Bạn có thể cho tôi biết thêm không?\nKhách: Tôi không thích màu này.\nThợ: Tôi rất tiếc vì bạn đã có một trải nghiệm không tốt. Tôi có thể làm gì để khắc phục?",
      answer: "Worker: Thank you for your feedback. Can you tell me more?\nCustomer: I didn't like the color.\nWorker: I'm sorry you had a bad experience. How can I make it right?"
    }
  ]
},
  {
  id: "L102",
  title: "Consent and Waiver Forms",
  titleVi: "Mẫu chấp thuận và miễn trừ trách nhiệm",
  level: "B2",
  context: "Sử dụng những mẫu câu này khi giải thích các mẫu đơn chấp thuận và miễn trừ trách nhiệm cho khách hàng.",
  phrases: [
    {
      english: "I need your consent.",
      vietnamese: "Tôi cần sự chấp thuận của bạn.",
      pronunciation: "ai need yor con-sent"
    },
    {
      english: "This waives our liability.",
      vietnamese: "Điều này miễn trừ trách nhiệm của chúng tôi.",
      pronunciation: "this wayvz our lai-uh-bi-li-tee"
    },
    {
      english: "Do you understand everything?",
      vietnamese: "Bạn có hiểu mọi thứ không?",
      pronunciation: "doo yoo un-der-stand ev-ree-thing"
    }
  ],
  drill: [
    {
      id: "L102C01",
      type: "read",
      prompt: "I need your consent.",
      hint: "Tôi cần sự chấp thuận của bạn.",
      answer: "I need your consent."
    },
    {
      id: "L102C02",
      type: "recall",
      prompt: "Tôi cần sự chấp thuận của bạn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I need your consent."
    },
    {
      id: "L102C03",
      type: "read",
      prompt: "This waives our liability.",
      hint: "Điều này miễn trừ trách nhiệm của chúng tôi.",
      answer: "This waives our liability."
    },
    {
      id: "L102C04",
      type: "recall",
      prompt: "Điều này miễn trừ trách nhiệm của chúng tôi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "This waives our liability."
    },
    {
      id: "L102C05",
      type: "read",
      prompt: "Do you understand everything?",
      hint: "Bạn có hiểu mọi thứ không?",
      answer: "Do you understand everything?"
    },
    {
      id: "L102C06",
      type: "recall",
      prompt: "Bạn có hiểu mọi thứ không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Do you understand everything?"
    },
    {
      id: "L102C07",
      type: "fill",
      prompt: "I need your ___.",
      hint: "Tôi cần sự chấp thuận của bạn.",
      answer: "consent",
      answerHint: "I need your consent."
    },
    {
      id: "L102C08",
      type: "fill",
      prompt: "This waives our ___.",
      hint: "Điều này miễn trừ trách nhiệm của chúng tôi.",
      answer: "liability",
      answerHint: "This waives our liability."
    },
    {
      id: "L102C09",
      type: "fill",
      prompt: "Do you ___ everything?",
      hint: "Bạn có hiểu mọi thứ không?",
      answer: "understand",
      answerHint: "Do you understand everything?"
    },
    {
      id: "L102C10",
      type: "dialogue",
      prompt: "Worker: I need your consent to proceed.\nCustomer: What does that mean?\nWorker: It means you agree to the procedure.",
      hint: "Thợ: Tôi cần sự chấp thuận của bạn để tiếp tục.\nKhách: Điều đó có nghĩa là gì?\nThợ: Điều đó có nghĩa là bạn đồng ý với quy trình.",
      answer: "Worker: I need your consent to proceed.\nCustomer: What does that mean?\nWorker: It means you agree to the procedure."
    }
  ]
}
  ]
};

export default problemSituations;
