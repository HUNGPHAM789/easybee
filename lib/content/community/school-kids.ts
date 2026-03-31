import type { Class } from '../types';

const data: Class = {
  id: "school-kids",
  title: "School & Kids",
  titleVi: "Trường Học Và Con Cái",
  lessons: [
  {
  id: "L171",
  title: "School Pick-Up",
  titleVi: "Đón Trẻ Ở Trường",
  level: "A1",
  context: "Sử dụng những mẫu câu này khi bạn đưa hoặc đón con ở trường.",
  phrases: [
    {
      english: "I'm here to pick up my son.",
      vietnamese: "Tôi đến để đón con trai tôi.",
      pronunciation: "ai-m heer too pik up mai sun"
    },
    {
      english: "Which line do I go to?",
      vietnamese: "Tôi phải xếp hàng nào?",
      pronunciation: "wich lain doo ai go too"
    },
    {
      english: "He is in the first grade.",
      vietnamese: "Con tôi học lớp một.",
      pronunciation: "hee iz in thuh furst grayd"
    }
  ],
  drill: [
    {
      id: "L171C01",
      type: "read",
      prompt: "I'm here to pick up my son.",
      hint: "Tôi đến để đón con trai tôi.",
      answer: "I'm here to pick up my son."
    },
    {
      id: "L171C02",
      type: "recall",
      prompt: "Tôi đến để đón con trai tôi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I'm here to pick up my son."
    },
    {
      id: "L171C03",
      type: "read",
      prompt: "Which line do I go to?",
      hint: "Tôi phải xếp hàng nào?",
      answer: "Which line do I go to?"
    },
    {
      id: "L171C04",
      type: "recall",
      prompt: "Tôi phải xếp hàng nào?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Which line do I go to?"
    },
    {
      id: "L171C05",
      type: "read",
      prompt: "He is in the first grade.",
      hint: "Con tôi học lớp một.",
      answer: "He is in the first grade."
    },
    {
      id: "L171C06",
      type: "recall",
      prompt: "Con tôi học lớp một.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "He is in the first grade."
    },
    {
      id: "L171C07",
      type: "fill",
      prompt: "I'm here to pick up my ___.",
      hint: "Tôi đến để đón con trai tôi.",
      answer: "son",
      answerHint: "I'm here to pick up my son."
    },
    {
      id: "L171C08",
      type: "fill",
      prompt: "Which ___ do I go to?",
      hint: "Tôi phải xếp hàng nào?",
      answer: "line",
      answerHint: "Which line do I go to?"
    },
    {
      id: "L171C09",
      type: "fill",
      prompt: "He is in the first ___.",
      hint: "Con tôi học lớp một.",
      answer: "grade",
      answerHint: "He is in the first grade."
    },
    {
      id: "L171C10",
      type: "dialogue",
      prompt: "Worker: Good afternoon. Which line are you in?\nCustomer: I'm here to pick up my son.\nWorker: He is in the first grade. Go to line 3.",
      hint: "Nhân viên: Chào buổi chiều. Anh/Chị đang ở hàng nào?\nKhách: Tôi đến để đón con trai tôi.\nNhân viên: Con anh/chị học lớp một. Đi đến hàng số 3.",
      answer: "Worker: Good afternoon. Which line are you in?\nCustomer: I'm here to pick up my son.\nWorker: He is in the first grade. Go to line 3."
    }
  ]
},
  {
  id: "L172",
  title: "Talking to the Teacher",
  titleVi: "Nói chuyện với giáo viên",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn muốn hỏi thăm về tình hình học tập và hạnh kiểm của con bạn ở trường.",
  phrases: [
    {
      english: "How is my child doing?",
      vietnamese: "Con tôi học hành thế nào ạ?",
      pronunciation: "hau iz mai chaild doo-ing?"
    },
    {
      english: "Is she behaving well?",
      vietnamese: "Con bé có ngoan không ạ?",
      pronunciation: "iz shee bee-hay-ving wel?"
    },
    {
      english: "Does she have homework?",
      vietnamese: "Con bé có bài tập về nhà không ạ?",
      pronunciation: "duz shee hav hoam-wurk?"
    }
  ],
  drill: [
    {
      id: "L172C01",
      type: "read",
      prompt: "How is my child doing?",
      hint: "Con tôi học hành thế nào ạ?",
      answer: "How is my child doing?"
    },
    {
      id: "L172C02",
      type: "recall",
      prompt: "Con tôi học hành thế nào ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How is my child doing?"
    },
    {
      id: "L172C03",
      type: "read",
      prompt: "Is she behaving well?",
      hint: "Con bé có ngoan không ạ?",
      answer: "Is she behaving well?"
    },
    {
      id: "L172C04",
      type: "recall",
      prompt: "Con bé có ngoan không ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is she behaving well?"
    },
    {
      id: "L172C05",
      type: "read",
      prompt: "Does she have homework?",
      hint: "Con bé có bài tập về nhà không ạ?",
      answer: "Does she have homework?"
    },
    {
      id: "L172C06",
      type: "recall",
      prompt: "Con bé có bài tập về nhà không ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Does she have homework?"
    },
    {
      id: "L172C07",
      type: "fill",
      prompt: "How is my ___ doing?",
      hint: "Con tôi học hành thế nào ạ?",
      answer: "child",
      answerHint: "How is my child doing?"
    },
    {
      id: "L172C08",
      type: "fill",
      prompt: "Is she behaving ___?",
      hint: "Con bé có ngoan không ạ?",
      answer: "well",
      answerHint: "Is she behaving well?"
    },
    {
      id: "L172C09",
      type: "fill",
      prompt: "Does she have ___?",
      hint: "Con bé có bài tập về nhà không ạ?",
      answer: "homework",
      answerHint: "Does she have homework?"
    },
    {
      id: "L172C10",
      type: "dialogue",
      prompt: "Worker: How is my child doing in class?\nTeacher: She is doing very well. She participates a lot.\nWorker: Does she have homework tonight?",
      hint: "Phụ huynh: Con tôi học ở lớp thế nào ạ?\nGiáo viên: Cháu học rất tốt. Cháu tham gia phát biểu nhiều.\nPhụ huynh: Tối nay cháu có bài tập về nhà không ạ?",
      answer: "Worker: How is my child doing in class?\nTeacher: She is doing very well. She participates a lot.\nWorker: Does she have homework tonight?"
    }
  ]
},
  {
  id: "L173",
  title: "Parent Teacher Conference",
  titleVi: "Họp Phụ Huynh",
  level: "A2",
  context: "Những câu này dùng khi bạn đi họp phụ huynh cho con ở trường.",
  phrases: [
    {
      english: "What are his grades?",
      vietnamese: "Điểm số của con tôi thế nào?",
      pronunciation: "wot ar hiz grayds?"
    },
    {
      english: "How can I help at home?",
      vietnamese: "Tôi có thể giúp gì ở nhà?",
      pronunciation: "hau kan ai help at hom?"
    },
    {
      english: "She needs to read more.",
      vietnamese: "Cô bé cần đọc nhiều hơn.",
      pronunciation: "shee needz too reed mor."
    }
  ],
  drill: [
    {
      id: "L173C01",
      type: "read",
      prompt: "What are his grades?",
      hint: "Điểm số của con tôi thế nào?",
      answer: "What are his grades?"
    },
    {
      id: "L173C02",
      type: "recall",
      prompt: "Điểm số của con tôi thế nào?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What are his grades?"
    },
    {
      id: "L173C03",
      type: "read",
      prompt: "How can I help at home?",
      hint: "Tôi có thể giúp gì ở nhà?",
      answer: "How can I help at home?"
    },
    {
      id: "L173C04",
      type: "recall",
      prompt: "Tôi có thể giúp gì ở nhà?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How can I help at home?"
    },
    {
      id: "L173C05",
      type: "read",
      prompt: "She needs to read more.",
      hint: "Cô bé cần đọc nhiều hơn.",
      answer: "She needs to read more."
    },
    {
      id: "L173C06",
      type: "recall",
      prompt: "Cô bé cần đọc nhiều hơn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "She needs to read more."
    },
    {
      id: "L173C07",
      type: "fill",
      prompt: "What are his ___?",
      hint: "Điểm số của con tôi thế nào?",
      answer: "grades",
      answerHint: "What are his grades?"
    },
    {
      id: "L173C08",
      type: "fill",
      prompt: "How can I ___ at home?",
      hint: "Tôi có thể giúp gì ở nhà?",
      answer: "help",
      answerHint: "How can I help at home?"
    },
    {
      id: "L173C09",
      type: "fill",
      prompt: "She needs to read ___.",
      hint: "Cô bé cần đọc nhiều hơn.",
      answer: "more",
      answerHint: "She needs to read more."
    },
    {
      id: "L173C10",
      type: "dialogue",
      prompt: "Parent: What are his grades?\nTeacher: He is doing okay in math.\nParent: How can I help at home?",
      hint: "Phụ huynh: Điểm số của con tôi thế nào?\nGiáo viên: Con bạn làm tốt môn toán.\nPhụ huynh: Tôi có thể giúp gì ở nhà?",
      answer: "Parent: What are his grades?\nTeacher: He is doing okay in math.\nParent: How can I help at home?"
    }
  ]
},
  {
  id: "L174",
  title: "School Forms: Signing Up",
  titleVi: "Mẫu Đơn Trường Học: Đăng Ký",
  level: "A2",
  context: "Sử dụng các cụm từ này khi bạn cần điền và ký các mẫu đơn cho con bạn ở trường.",
  phrases: [
    {
      english: "I need to sign this.",
      vietnamese: "Tôi cần ký cái này.",
      pronunciation: "ai need too sain this"
    },
    {
      english: "Where do I sign?",
      vietnamese: "Tôi ký ở đâu?",
      pronunciation: "wair doo ai sain"
    },
    {
      english: "What is this form for?",
      vietnamese: "Mẫu đơn này dùng để làm gì?",
      pronunciation: "wot iz this form for"
    }
  ],
  drill: [
    {
      id: "L174C01",
      type: "read",
      prompt: "I need to sign this.",
      hint: "Tôi cần ký cái này.",
      answer: "I need to sign this."
    },
    {
      id: "L174C02",
      type: "recall",
      prompt: "Tôi cần ký cái này.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I need to sign this."
    },
    {
      id: "L174C03",
      type: "read",
      prompt: "Where do I sign?",
      hint: "Tôi ký ở đâu?",
      answer: "Where do I sign?"
    },
    {
      id: "L174C04",
      type: "recall",
      prompt: "Tôi ký ở đâu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Where do I sign?"
    },
    {
      id: "L174C05",
      type: "read",
      prompt: "What is this form for?",
      hint: "Mẫu đơn này dùng để làm gì?",
      answer: "What is this form for?"
    },
    {
      id: "L174C06",
      type: "recall",
      prompt: "Mẫu đơn này dùng để làm gì?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What is this form for?"
    },
    {
      id: "L174C07",
      type: "fill",
      prompt: "I need to ___ this.",
      hint: "Tôi cần ký cái này.",
      answer: "sign",
      answerHint: "I need to sign this."
    },
    {
      id: "L174C08",
      type: "fill",
      prompt: "Where do I ___?",
      hint: "Tôi ký ở đâu?",
      answer: "sign",
      answerHint: "Where do I sign?"
    },
    {
      id: "L174C09",
      type: "fill",
      prompt: "What is this ___ for?",
      hint: "Mẫu đơn này dùng để làm gì?",
      answer: "form",
      answerHint: "What is this form for?"
    },
    {
      id: "L174C10",
      type: "dialogue",
      prompt: "Worker: Do you need help with this form?\nCustomer: Yes, what is this form for?\nWorker: It's for the field trip.",
      hint: "Thợ: Bạn có cần giúp đỡ với mẫu đơn này không?\nKhách: Có, mẫu đơn này dùng để làm gì?\nThợ: Nó dành cho chuyến đi thực tế.",
      answer: "Worker: Do you need help with this form?\nCustomer: Yes, what is this form for?\nWorker: It's for the field trip."
    }
  ]
},
  {
  id: "L175",
  title: "Calling the School",
  titleVi: "Gọi Điện Cho Trường Học",
  level: "A1",
  context: "Sử dụng những mẫu câu này khi bạn cần gọi điện cho trường học của con bạn vì con bạn bị ốm.",
  phrases: [
    {
      english: "Hello, this is [Your Name].",
      vietnamese: "Xin chào, tôi là [Tên của bạn].",
      pronunciation: "he-LO, this iz [Your Name]."
    },
    {
      english: "My daughter is sick today.",
      vietnamese: "Hôm nay con gái tôi bị ốm.",
      pronunciation: "my DAW-ter iz SICK tuh-DAY."
    },
    {
      english: "She won't be in school.",
      vietnamese: "Con bé sẽ không đến trường.",
      pronunciation: "she WONT bee in SKOOL."
    }
  ],
  drill: [
    {
      id: "L175C01",
      type: "read",
      prompt: "Hello, this is [Your Name].",
      hint: "Xin chào, tôi là [Tên của bạn].",
      answer: "Hello, this is [Your Name]."
    },
    {
      id: "L175C02",
      type: "recall",
      prompt: "Xin chào, tôi là [Tên của bạn].",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Hello, this is [Your Name]."
    },
    {
      id: "L175C03",
      type: "read",
      prompt: "My daughter is sick today.",
      hint: "Hôm nay con gái tôi bị ốm.",
      answer: "My daughter is sick today."
    },
    {
      id: "L175C04",
      type: "recall",
      prompt: "Hôm nay con gái tôi bị ốm.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "My daughter is sick today."
    },
    {
      id: "L175C05",
      type: "read",
      prompt: "She won't be in school.",
      hint: "Con bé sẽ không đến trường.",
      answer: "She won't be in school."
    },
    {
      id: "L175C06",
      type: "recall",
      prompt: "Con bé sẽ không đến trường.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "She won't be in school."
    },
    {
      id: "L175C07",
      type: "fill",
      prompt: "Hello, this is [Your ___].",
      hint: "Xin chào, tôi là [Tên của bạn].",
      answer: "Name",
      answerHint: "Hello, this is [Your Name]."
    },
    {
      id: "L175C08",
      type: "fill",
      prompt: "My daughter is ___ today.",
      hint: "Hôm nay con gái tôi bị ốm.",
      answer: "sick",
      answerHint: "My daughter is sick today."
    },
    {
      id: "L175C09",
      type: "fill",
      prompt: "She won't be in ___.",
      hint: "Con bé sẽ không đến trường.",
      answer: "school",
      answerHint: "She won't be in school."
    },
    {
      id: "L175C10",
      type: "dialogue",
      prompt: "Worker: Hello, this is Maria.\nSchool: Hello Maria, how can I help you?\nWorker: My daughter is sick today. She won't be in school.",
      hint: "Thợ: Xin chào, tôi là Maria.\nKhách: Chào Maria, tôi có thể giúp gì cho bạn?\nThợ: Hôm nay con gái tôi bị ốm. Con bé sẽ không đến trường.",
      answer: "Worker: Hello, this is Maria.\nSchool: Hello Maria, how can I help you?\nWorker: My daughter is sick today. She won't be in school."
    }
  ]
},
  {
  id: "L176",
  title: "Understanding Grades",
  titleVi: "Hiểu về điểm số",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi bạn muốn hiểu về điểm số của con bạn ở trường.",
  phrases: [
    {
      english: "What does this grade mean?",
      vietnamese: "Điểm này có nghĩa là gì?",
      pronunciation: "wut duhz this grayd meen?"
    },
    {
      english: "Is she passing the class?",
      vietnamese: "Con bé có đậu môn này không?",
      pronunciation: "iz shee pa-sing thuh klas?"
    },
    {
      english: "He needs improvement in math.",
      vietnamese: "Con trai cần cải thiện môn toán.",
      pronunciation: "hee needz im-proov-ment in math"
    }
  ],
  drill: [
    {
      id: "L176C01",
      type: "read",
      prompt: "What does this grade mean?",
      hint: "Điểm này có nghĩa là gì?",
      answer: "What does this grade mean?"
    },
    {
      id: "L176C02",
      type: "recall",
      prompt: "Điểm này có nghĩa là gì?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What does this grade mean?"
    },
    {
      id: "L176C03",
      type: "read",
      prompt: "Is she passing the class?",
      hint: "Con bé có đậu môn này không?",
      answer: "Is she passing the class?"
    },
    {
      id: "L176C04",
      type: "recall",
      prompt: "Con bé có đậu môn này không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is she passing the class?"
    },
    {
      id: "L176C05",
      type: "read",
      prompt: "He needs improvement in math.",
      hint: "Con trai cần cải thiện môn toán.",
      answer: "He needs improvement in math."
    },
    {
      id: "L176C06",
      type: "recall",
      prompt: "Con trai cần cải thiện môn toán.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "He needs improvement in math."
    },
    {
      id: "L176C07",
      type: "fill",
      prompt: "What does this ___ mean?",
      hint: "Điểm này có nghĩa là gì?",
      answer: "grade",
      answerHint: "What does this grade mean?"
    },
    {
      id: "L176C08",
      type: "fill",
      prompt: "Is she passing the ___?",
      hint: "Con bé có đậu môn này không?",
      answer: "class",
      answerHint: "Is she passing the class?"
    },
    {
      id: "L176C09",
      type: "fill",
      prompt: "He needs ___ in math.",
      hint: "Con trai cần cải thiện môn toán.",
      answer: "improvement",
      answerHint: "He needs improvement in math."
    },
    {
      id: "L176C10",
      type: "dialogue",
      prompt: "Worker: What does this grade mean?\nTeacher: It means she is doing okay.\nWorker: Does she need extra help?",
      hint: "Thợ: Điểm này có nghĩa là gì?\nGiáo viên: Nó có nghĩa là con bé đang làm tốt.\nThợ: Con bé có cần giúp đỡ thêm không?",
      answer: "Worker: What does this grade mean?\nTeacher: It means she is doing okay.\nWorker: Does she need extra help?"
    }
  ]
},
  {
  id: "L177",
  title: "After School Activities",
  titleVi: "Các hoạt động sau giờ học",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi ghi danh cho con bạn tham gia các hoạt động ngoại khóa ở trường.",
  phrases: [
    {
      english: "Sign up for soccer.",
      vietnamese: "Đăng ký cho môn bóng đá.",
      pronunciation: "sine up for sok-er"
    },
    {
      english: "How much does it cost?",
      vietnamese: "Giá bao nhiêu?",
      pronunciation: "how much duz it cost"
    },
    {
      english: "Is there an art class?",
      vietnamese: "Có lớp học vẽ không?",
      pronunciation: "iz thair an art class"
    }
  ],
  drill: [
    {
      id: "L177C01",
      type: "read",
      prompt: "Sign up for soccer.",
      hint: "Đăng ký cho môn bóng đá.",
      answer: "Sign up for soccer."
    },
    {
      id: "L177C02",
      type: "recall",
      prompt: "Đăng ký cho môn bóng đá.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Sign up for soccer."
    },
    {
      id: "L177C03",
      type: "read",
      prompt: "How much does it cost?",
      hint: "Giá bao nhiêu?",
      answer: "How much does it cost?"
    },
    {
      id: "L177C04",
      type: "recall",
      prompt: "Giá bao nhiêu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How much does it cost?"
    },
    {
      id: "L177C05",
      type: "read",
      prompt: "Is there an art class?",
      hint: "Có lớp học vẽ không?",
      answer: "Is there an art class?"
    },
    {
      id: "L177C06",
      type: "recall",
      prompt: "Có lớp học vẽ không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is there an art class?"
    },
    {
      id: "L177C07",
      type: "fill",
      prompt: "Sign up for ___.",
      hint: "Đăng ký cho môn bóng đá.",
      answer: "soccer",
      answerHint: "Sign up for soccer."
    },
    {
      id: "L177C08",
      type: "fill",
      prompt: "How much does it ___?",
      hint: "Giá bao nhiêu?",
      answer: "cost",
      answerHint: "How much does it cost?"
    },
    {
      id: "L177C09",
      type: "fill",
      prompt: "Is there an ___ class?",
      hint: "Có lớp học vẽ không?",
      answer: "art",
      answerHint: "Is there an art class?"
    },
    {
      id: "L177C10",
      type: "dialogue",
      prompt: "Worker: Can I help you?\nCustomer: Yes, I want to sign up my son for an activity.\nWorker: Great! Is there an art class?",
      hint: "Nhân viên: Tôi có thể giúp gì cho bạn?\nKhách hàng: Vâng, tôi muốn đăng ký cho con trai tôi một hoạt động.\nNhân viên: Tuyệt vời! Có lớp học vẽ không?",
      answer: "Worker: Can I help you?\nCustomer: Yes, I want to sign up my son for an activity.\nWorker: Great! Is there an art class?"
    }
  ]
},
  {
  id: "L178",
  title: "School Event Small Talk",
  titleVi: "Nói Chuyện Tại Sự Kiện Trường",
  level: "B1",
  context: "Sử dụng những mẫu câu này để bắt chuyện với phụ huynh khác tại các sự kiện ở trường của con bạn.",
  phrases: [
    {
      english: "Which class is your child in?",
      vietnamese: "Con của bạn học lớp nào?",
      pronunciation: "wich class iz yor chaild in"
    },
    {
      english: "Do you live nearby?",
      vietnamese: "Bạn có sống gần đây không?",
      pronunciation: "doo yoo liv neer-by"
    },
    {
      english: "Nice to meet you!",
      vietnamese: "Rất vui được gặp bạn!",
      pronunciation: "nais too meet yoo"
    }
  ],
  drill: [
    {
      id: "L178C01",
      type: "read",
      prompt: "Which class is your child in?",
      hint: "Con của bạn học lớp nào?",
      answer: "Which class is your child in?"
    },
    {
      id: "L178C02",
      type: "recall",
      prompt: "Con của bạn học lớp nào?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Which class is your child in?"
    },
    {
      id: "L178C03",
      type: "read",
      prompt: "Do you live nearby?",
      hint: "Bạn có sống gần đây không?",
      answer: "Do you live nearby?"
    },
    {
      id: "L178C04",
      type: "recall",
      prompt: "Bạn có sống gần đây không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Do you live nearby?"
    },
    {
      id: "L178C05",
      type: "read",
      prompt: "Nice to meet you!",
      hint: "Rất vui được gặp bạn!",
      answer: "Nice to meet you!"
    },
    {
      id: "L178C06",
      type: "recall",
      prompt: "Rất vui được gặp bạn!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Nice to meet you!"
    },
    {
      id: "L178C07",
      type: "fill",
      prompt: "Which ___ is your child in?",
      hint: "Con của bạn học lớp nào?",
      answer: "class",
      answerHint: "Which class is your child in?"
    },
    {
      id: "L178C08",
      type: "fill",
      prompt: "Do you live ___?",
      hint: "Bạn có sống gần đây không?",
      answer: "nearby",
      answerHint: "Do you live nearby?"
    },
    {
      id: "L178C09",
      type: "fill",
      prompt: "___ to meet you!",
      hint: "Rất vui được gặp bạn!",
      answer: "Nice",
      answerHint: "Nice to meet you!"
    },
    {
      id: "L178C10",
      type: "dialogue",
      prompt: "Worker: Which class is your child in?\nCustomer: He's in Mrs. Lee's class.\nWorker: Do you live nearby?",
      hint: "Thợ: Con của bạn học lớp nào?\nKhách: Cháu học lớp cô Lee.\nThợ: Bạn có sống gần đây không?",
      answer: "Worker: Which class is your child in?\nCustomer: He's in Mrs. Lee's class.\nWorker: Do you live nearby?"
    }
  ]
},
  {
  id: "L179",
  title: "Homework Help: Math",
  titleVi: "Giúp Con Làm Bài Tập Về Nhà: Môn Toán",
  level: "B1",
  context: "Sử dụng những câu này khi bạn muốn giúp con bạn làm bài tập toán nhưng bạn không chắc chắn về tiếng Anh của mình.",
  phrases: [
    {
      english: "Can you show me?",
      vietnamese: "Con có thể chỉ cho ba/mẹ được không?",
      pronunciation: "kan yoo show mee?"
    },
    {
      english: "What does this mean?",
      vietnamese: "Cái này có nghĩa là gì?",
      pronunciation: "wot duz this meen?"
    },
    {
      english: "Give me an example.",
      vietnamese: "Cho ba/mẹ một ví dụ đi.",
      pronunciation: "giv mee an eg-zam-pul"
    }
  ],
  drill: [
    {
      id: "L179C01",
      type: "read",
      prompt: "Can you show me?",
      hint: "Con có thể chỉ cho ba/mẹ được không?",
      answer: "Can you show me?"
    },
    {
      id: "L179C02",
      type: "recall",
      prompt: "Con có thể chỉ cho ba/mẹ được không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can you show me?"
    },
    {
      id: "L179C03",
      type: "read",
      prompt: "What does this mean?",
      hint: "Cái này có nghĩa là gì?",
      answer: "What does this mean?"
    },
    {
      id: "L179C04",
      type: "recall",
      prompt: "Cái này có nghĩa là gì?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What does this mean?"
    },
    {
      id: "L179C05",
      type: "read",
      prompt: "Give me an example.",
      hint: "Cho ba/mẹ một ví dụ đi.",
      answer: "Give me an example."
    },
    {
      id: "L179C06",
      type: "recall",
      prompt: "Cho ba/mẹ một ví dụ đi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Give me an example."
    },
    {
      id: "L179C07",
      type: "fill",
      prompt: "Can you ___ me?",
      hint: "Con có thể chỉ cho ba/mẹ được không?",
      answer: "show",
      answerHint: "Can you show me?"
    },
    {
      id: "L179C08",
      type: "fill",
      prompt: "What does this ___?",
      hint: "Cái này có nghĩa là gì?",
      answer: "mean",
      answerHint: "What does this mean?"
    },
    {
      id: "L179C09",
      type: "fill",
      prompt: "Give me an ___.",
      hint: "Cho ba/mẹ một ví dụ đi.",
      answer: "example",
      answerHint: "Give me an example."
    },
    {
      id: "L179C10",
      type: "dialogue",
      prompt: "Worker: I don't understand this math. Can you show me?\nCustomer: Okay, Dad. It's about fractions.\nWorker: Give me an example.",
      hint: "Thợ: Tôi không hiểu bài toán này. Con có thể chỉ cho ba/mẹ được không?\nKhách: Vâng ba. Nó về phân số.\nThợ: Cho ba/mẹ một ví dụ đi.",
      answer: "Worker: I don't understand this math. Can you show me?\nCustomer: Okay, Dad. It's about fractions.\nWorker: Give me an example."
    }
  ]
}
  ]
};

export default data;
