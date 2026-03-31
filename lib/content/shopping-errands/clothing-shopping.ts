import type { Class } from '../types';

const data: Class = {
  id: "clothing-shopping",
  title: "Clothing & Shopping",
  titleVi: "Mua Sắm Quần Áo",
  lessons: [
  {
  id: "L126",
  title: "Asking About Sizes",
  titleVi: "Hỏi Về Kích Cỡ",
  level: "A1",
  context: "Sử dụng các cụm từ này khi bạn muốn hỏi về kích cỡ quần áo hoặc giày dép trong cửa hàng.",
  phrases: [
    {
      english: "Do you have medium?",
      vietnamese: "Bạn có cỡ vừa không?",
      pronunciation: "doo yoo hav mee-dee-um?"
    },
    {
      english: "Do you have a smaller size?",
      vietnamese: "Bạn có cỡ nhỏ hơn không?",
      pronunciation: "doo yoo hav uh smo-ler size?"
    },
    {
      english: "Do you have a bigger size?",
      vietnamese: "Bạn có cỡ lớn hơn không?",
      pronunciation: "doo yoo hav uh bi-ger size?"
    }
  ],
  drill: [
    {
      id: "L126C01",
      type: "read",
      prompt: "Do you have medium?",
      hint: "Bạn có cỡ vừa không?",
      answer: "Do you have medium?"
    },
    {
      id: "L126C02",
      type: "recall",
      prompt: "Bạn có cỡ vừa không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Do you have medium?"
    },
    {
      id: "L126C03",
      type: "read",
      prompt: "Do you have a smaller size?",
      hint: "Bạn có cỡ nhỏ hơn không?",
      answer: "Do you have a smaller size?"
    },
    {
      id: "L126C04",
      type: "recall",
      prompt: "Bạn có cỡ nhỏ hơn không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Do you have a smaller size?"
    },
    {
      id: "L126C05",
      type: "read",
      prompt: "Do you have a bigger size?",
      hint: "Bạn có cỡ lớn hơn không?",
      answer: "Do you have a bigger size?"
    },
    {
      id: "L126C06",
      type: "recall",
      prompt: "Bạn có cỡ lớn hơn không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Do you have a bigger size?"
    },
    {
      id: "L126C07",
      type: "fill",
      prompt: "Do you have ___?",
      hint: "Bạn có cỡ vừa không?",
      answer: "medium",
      answerHint: "Do you have medium?"
    },
    {
      id: "L126C08",
      type: "fill",
      prompt: "Do you have a ___ size?",
      hint: "Bạn có cỡ nhỏ hơn không?",
      answer: "smaller",
      answerHint: "Do you have a smaller size?"
    },
    {
      id: "L126C09",
      type: "fill",
      prompt: "Do you have a ___ size?",
      hint: "Bạn có cỡ lớn hơn không?",
      answer: "bigger",
      answerHint: "Do you have a bigger size?"
    },
    {
      id: "L126C10",
      type: "dialogue",
      prompt: "Worker: Do you have medium?\nCustomer: Yes, we do. Here you go.\nWorker: Thank you!",
      hint: "Thợ: Bạn có cỡ vừa không?\nKhách: Có, chúng tôi có. Của bạn đây.\nThợ: Cảm ơn!",
      answer: "Worker: Do you have medium?\nCustomer: Yes, we do. Here you go.\nWorker: Thank you!"
    }
  ]
},
  {
  id: "L127",
  title: "Trying on Clothes",
  titleVi: "Thử Quần Áo",
  level: "A1",
  context: "Bạn có thể sử dụng những câu này khi bạn muốn thử quần áo trong một cửa hàng.",
  phrases: [
    {
      english: "Where is the fitting room?",
      vietnamese: "Phòng thử đồ ở đâu?",
      pronunciation: "wer iz thuh fit-ting room?"
    },
    {
      english: "Can I try this on?",
      vietnamese: "Tôi có thể thử cái này được không?",
      pronunciation: "kan ai trai this on?"
    },
    {
      english: "It doesn't fit.",
      vietnamese: "Nó không vừa.",
      pronunciation: "it duh-zent fit."
    }
  ],
  drill: [
    {
      id: "L127C01",
      type: "read",
      prompt: "Where is the fitting room?",
      hint: "Phòng thử đồ ở đâu?",
      answer: "Where is the fitting room?"
    },
    {
      id: "L127C02",
      type: "recall",
      prompt: "Phòng thử đồ ở đâu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Where is the fitting room?"
    },
    {
      id: "L127C03",
      type: "read",
      prompt: "Can I try this on?",
      hint: "Tôi có thể thử cái này được không?",
      answer: "Can I try this on?"
    },
    {
      id: "L127C04",
      type: "recall",
      prompt: "Tôi có thể thử cái này được không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can I try this on?"
    },
    {
      id: "L127C05",
      type: "read",
      prompt: "It doesn't fit.",
      hint: "Nó không vừa.",
      answer: "It doesn't fit."
    },
    {
      id: "L127C06",
      type: "recall",
      prompt: "Nó không vừa.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It doesn't fit."
    },
    {
      id: "L127C07",
      type: "fill",
      prompt: "Where is the fitting ___?",
      hint: "Phòng thử đồ ở đâu?",
      answer: "room",
      answerHint: "Where is the fitting room?"
    },
    {
      id: "L127C08",
      type: "fill",
      prompt: "Can I try ___ on?",
      hint: "Tôi có thể thử cái này được không?",
      answer: "this",
      answerHint: "Can I try this on?"
    },
    {
      id: "L127C09",
      type: "fill",
      prompt: "It doesn't ___.",
      hint: "Nó không vừa.",
      answer: "fit",
      answerHint: "It doesn't fit."
    },
    {
      id: "L127C10",
      type: "dialogue",
      prompt: "Worker: Can I help you?\nCustomer: Where is the fitting room?\nWorker: It's over there.",
      hint: "Thợ: Tôi có thể giúp gì cho bạn?\nKhách: Phòng thử đồ ở đâu?\nThợ: Nó ở đằng kia.",
      answer: "Worker: Can I help you?\nCustomer: Where is the fitting room?\nWorker: It's over there."
    }
  ]
},
  {
  id: "L128",
  title: "Colors and Styles",
  titleVi: "Màu Sắc và Kiểu Dáng",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn muốn hỏi về màu sắc và kiểu dáng của quần áo hoặc đồ vật trong cửa hàng.",
  phrases: [
    {
      english: "Do you have this in black?",
      vietnamese: "Bạn có cái này màu đen không?",
      pronunciation: "doo yoo hav this in blak?"
    },
    {
      english: "Something more casual?",
      vietnamese: "Có kiểu nào thoải mái hơn không?",
      pronunciation: "sum-thing mor ka-zhu-al?"
    },
    {
      english: "What colors do you have?",
      vietnamese: "Bạn có những màu gì?",
      pronunciation: "wot kul-ers doo yoo hav?"
    }
  ],
  drill: [
    {
      id: "L128C01",
      type: "read",
      prompt: "Do you have this in black?",
      hint: "Bạn có cái này màu đen không?",
      answer: "Do you have this in black?"
    },
    {
      id: "L128C02",
      type: "recall",
      prompt: "Bạn có cái này màu đen không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Do you have this in black?"
    },
    {
      id: "L128C03",
      type: "read",
      prompt: "Something more casual?",
      hint: "Có kiểu nào thoải mái hơn không?",
      answer: "Something more casual?"
    },
    {
      id: "L128C04",
      type: "recall",
      prompt: "Có kiểu nào thoải mái hơn không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Something more casual?"
    },
    {
      id: "L128C05",
      type: "read",
      prompt: "What colors do you have?",
      hint: "Bạn có những màu gì?",
      answer: "What colors do you have?"
    },
    {
      id: "L128C06",
      type: "recall",
      prompt: "Bạn có những màu gì?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What colors do you have?"
    },
    {
      id: "L128C07",
      type: "fill",
      prompt: "Do you have this in ___?",
      hint: "Bạn có cái này màu đen không?",
      answer: "black",
      answerHint: "Do you have this in black?"
    },
    {
      id: "L128C08",
      type: "fill",
      prompt: "Something more ___?",
      hint: "Có kiểu nào thoải mái hơn không?",
      answer: "casual",
      answerHint: "Something more casual?"
    },
    {
      id: "L128C09",
      type: "fill",
      prompt: "What ___ do you have?",
      hint: "Bạn có những màu gì?",
      answer: "colors",
      answerHint: "What colors do you have?"
    },
    {
      id: "L128C10",
      type: "dialogue",
      prompt: "Worker: What colors do you have?\nCustomer: Do you have this in black?\nWorker: Yes, we do.",
      hint: "Thợ: Bạn có những màu gì?\nKhách: Bạn có cái này màu đen không?\nThợ: Có, chúng tôi có.",
      answer: "Worker: What colors do you have?\nCustomer: Do you have this in black?\nWorker: Yes, we do."
    }
  ]
},
  {
  id: "L129",
  title: "Returns and Exchanges",
  titleVi: "Đổi và Trả Hàng",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn muốn trả lại hoặc đổi một món hàng đã mua.",
  phrases: [
    {
      english: "I want to return this.",
      vietnamese: "Tôi muốn trả lại cái này.",
      pronunciation: "ai wont too ri-turn this"
    },
    {
      english: "Do you have the receipt?",
      vietnamese: "Bạn có hóa đơn không?",
      pronunciation: "doo yoo hav thuh ri-seet"
    },
    {
      english: "Can I exchange this?",
      vietnamese: "Tôi có thể đổi cái này được không?",
      pronunciation: "kan ai eks-chenj this"
    }
  ],
  drill: [
    {
      id: "L129C01",
      type: "read",
      prompt: "I want to return this.",
      hint: "Tôi muốn trả lại cái này.",
      answer: "I want to return this."
    },
    {
      id: "L129C02",
      type: "recall",
      prompt: "Tôi muốn trả lại cái này.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I want to return this."
    },
    {
      id: "L129C03",
      type: "read",
      prompt: "Do you have the receipt?",
      hint: "Bạn có hóa đơn không?",
      answer: "Do you have the receipt?"
    },
    {
      id: "L129C04",
      type: "recall",
      prompt: "Bạn có hóa đơn không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Do you have the receipt?"
    },
    {
      id: "L129C05",
      type: "read",
      prompt: "Can I exchange this?",
      hint: "Tôi có thể đổi cái này được không?",
      answer: "Can I exchange this?"
    },
    {
      id: "L129C06",
      type: "recall",
      prompt: "Tôi có thể đổi cái này được không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can I exchange this?"
    },
    {
      id: "L129C07",
      type: "fill",
      prompt: "I want to ___ this.",
      hint: "Tôi muốn trả lại cái này.",
      answer: "return",
      answerHint: "I want to return this."
    },
    {
      id: "L129C08",
      type: "fill",
      prompt: "Do you have the ___?",
      hint: "Bạn có hóa đơn không?",
      answer: "receipt",
      answerHint: "Do you have the receipt?"
    },
    {
      id: "L129C09",
      type: "fill",
      prompt: "Can I ___ this?",
      hint: "Tôi có thể đổi cái này được không?",
      answer: "exchange",
      answerHint: "Can I exchange this?"
    },
    {
      id: "L129C10",
      type: "dialogue",
      prompt: "Worker: Do you have the receipt?\nCustomer: Yes, here it is.\nWorker: Okay, one moment please.",
      hint: "Thợ: Bạn có hóa đơn không?\nKhách: Có, đây ạ.\nThợ: Vâng, xin chờ một lát.",
      answer: "Worker: Do you have the receipt?\nCustomer: Yes, here it is.\nWorker: Okay, one moment please."
    }
  ]
},
  {
  id: "L130",
  title: "Asking About Discounts",
  titleVi: "Hỏi Về Giảm Giá",
  level: "A2",
  context: "Sử dụng những câu này khi bạn muốn hỏi về giảm giá hoặc chương trình khuyến mãi ở cửa hàng.",
  phrases: [
    {
      english: "When is the next sale?",
      vietnamese: "Khi nào có đợt giảm giá tiếp theo?",
      pronunciation: "wen iz the nekst seil?"
    },
    {
      english: "Is there a student discount?",
      vietnamese: "Có giảm giá cho học sinh, sinh viên không?",
      pronunciation: "iz ther uh stoo-dent dis-count?"
    },
    {
      english: "Are there any sales today?",
      vietnamese: "Hôm nay có chương trình giảm giá nào không?",
      pronunciation: "are ther en-ee seils tuh-day?"
    }
  ],
  drill: [
    {
      id: "L130C01",
      type: "read",
      prompt: "When is the next sale?",
      hint: "Khi nào có đợt giảm giá tiếp theo?",
      answer: "When is the next sale?"
    },
    {
      id: "L130C02",
      type: "recall",
      prompt: "Khi nào có đợt giảm giá tiếp theo?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "When is the next sale?"
    },
    {
      id: "L130C03",
      type: "read",
      prompt: "Is there a student discount?",
      hint: "Có giảm giá cho học sinh, sinh viên không?",
      answer: "Is there a student discount?"
    },
    {
      id: "L130C04",
      type: "recall",
      prompt: "Có giảm giá cho học sinh, sinh viên không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is there a student discount?"
    },
    {
      id: "L130C05",
      type: "read",
      prompt: "Are there any sales today?",
      hint: "Hôm nay có chương trình giảm giá nào không?",
      answer: "Are there any sales today?"
    },
    {
      id: "L130C06",
      type: "recall",
      prompt: "Hôm nay có chương trình giảm giá nào không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Are there any sales today?"
    },
    {
      id: "L130C07",
      type: "fill",
      prompt: "When is the next ___?",
      hint: "Khi nào có đợt giảm giá tiếp theo?",
      answer: "sale",
      answerHint: "When is the next sale?"
    },
    {
      id: "L130C08",
      type: "fill",
      prompt: "Is there a ___ discount?",
      hint: "Có giảm giá cho học sinh, sinh viên không?",
      answer: "student",
      answerHint: "Is there a student discount?"
    },
    {
      id: "L130C09",
      type: "fill",
      prompt: "Are there any ___ today?",
      hint: "Hôm nay có chương trình giảm giá nào không?",
      answer: "sales",
      answerHint: "Are there any sales today?"
    },
    {
      id: "L130C10",
      type: "dialogue",
      prompt: "Worker: Are there any sales today?\nCustomer: Yes, all shirts are 20% off.\nWorker: Great, thank you!",
      hint: "Thợ: Hôm nay có chương trình giảm giá nào không?\nKhách: Có, tất cả áo sơ mi đều giảm 20%.\nThợ: Tuyệt vời, cảm ơn bạn!",
      answer: "Worker: Are there any sales today?\nCustomer: Yes, all shirts are 20% off.\nWorker: Great, thank you!"
    }
  ]
},
  {
  id: "L131",
  title: "Asking for Recommendations",
  titleVi: "Hỏi xin lời khuyên",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi bạn muốn xin lời khuyên về một sản phẩm hoặc dịch vụ nào đó.",
  phrases: [
    {
      english: "What goes well with this?",
      vietnamese: "Cái gì hợp với cái này ạ?",
      pronunciation: "wot gohz wel with this"
    },
    {
      english: "What do you recommend?",
      vietnamese: "Bạn gợi ý gì ạ?",
      pronunciation: "wot doo yoo rek-uh-mend"
    },
    {
      english: "Any suggestions for a wedding?",
      vietnamese: "Có gợi ý gì cho đám cưới không ạ?",
      pronunciation: "en-ee suh-jes-chuhnz for uh wed-ing"
    }
  ],
  drill: [
    {
      id: "L131C01",
      type: "read",
      prompt: "What goes well with this?",
      hint: "Cái gì hợp với cái này ạ?",
      answer: "What goes well with this?"
    },
    {
      id: "L131C02",
      type: "recall",
      prompt: "Cái gì hợp với cái này ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What goes well with this?"
    },
    {
      id: "L131C03",
      type: "read",
      prompt: "What do you recommend?",
      hint: "Bạn gợi ý gì ạ?",
      answer: "What do you recommend?"
    },
    {
      id: "L131C04",
      type: "recall",
      prompt: "Bạn gợi ý gì ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What do you recommend?"
    },
    {
      id: "L131C05",
      type: "read",
      prompt: "Any suggestions for a wedding?",
      hint: "Có gợi ý gì cho đám cưới không ạ?",
      answer: "Any suggestions for a wedding?"
    },
    {
      id: "L131C06",
      type: "recall",
      prompt: "Có gợi ý gì cho đám cưới không ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Any suggestions for a wedding?"
    },
    {
      id: "L131C07",
      type: "fill",
      prompt: "What goes well with ___?",
      hint: "Cái gì hợp với cái này ạ?",
      answer: "this",
      answerHint: "What goes well with this?"
    },
    {
      id: "L131C08",
      type: "fill",
      prompt: "What do you ___?",
      hint: "Bạn gợi ý gì ạ?",
      answer: "recommend",
      answerHint: "What do you recommend?"
    },
    {
      id: "L131C09",
      type: "fill",
      prompt: "Any ___ for a wedding?",
      hint: "Có gợi ý gì cho đám cưới không ạ?",
      answer: "suggestions",
      answerHint: "Any suggestions for a wedding?"
    },
    {
      id: "L131C10",
      type: "dialogue",
      prompt: "Worker: What do you recommend?\nCustomer: I recommend the roast chicken. It's delicious.\nWorker: What goes well with that?",
      hint: "Thợ: Bạn gợi ý gì ạ?\nKhách: Tôi gợi ý món gà nướng. Nó rất ngon.\nThợ: Cái gì hợp với món đó ạ?",
      answer: "Worker: What do you recommend?\nCustomer: I recommend the roast chicken. It's delicious.\nWorker: What goes well with that?"
    }
  ]
},
  {
  id: "L132",
  title: "Defective Items: Complaints",
  titleVi: "Phàn nàn về hàng lỗi",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi bạn muốn phàn nàn về một sản phẩm bị lỗi mà bạn vừa mua.",
  phrases: [
    {
      english: "This zipper is broken.",
      vietnamese: "Cái khóa kéo này bị hỏng rồi.",
      pronunciation: "this zip-per iz bro-ken"
    },
    {
      english: "It has a hole.",
      vietnamese: "Nó bị thủng một lỗ.",
      pronunciation: "it haz a hole"
    },
    {
      english: "I just bought it.",
      vietnamese: "Tôi vừa mới mua nó.",
      pronunciation: "ai just bot it"
    }
  ],
  drill: [
    {
      id: "L132C01",
      type: "read",
      prompt: "This zipper is broken.",
      hint: "Cái khóa kéo này bị hỏng rồi.",
      answer: "This zipper is broken."
    },
    {
      id: "L132C02",
      type: "recall",
      prompt: "Cái khóa kéo này bị hỏng rồi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "This zipper is broken."
    },
    {
      id: "L132C03",
      type: "read",
      prompt: "It has a hole.",
      hint: "Nó bị thủng một lỗ.",
      answer: "It has a hole."
    },
    {
      id: "L132C04",
      type: "recall",
      prompt: "Nó bị thủng một lỗ.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It has a hole."
    },
    {
      id: "L132C05",
      type: "read",
      prompt: "I just bought it.",
      hint: "Tôi vừa mới mua nó.",
      answer: "I just bought it."
    },
    {
      id: "L132C06",
      type: "recall",
      prompt: "Tôi vừa mới mua nó.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I just bought it."
    },
    {
      id: "L132C07",
      type: "fill",
      prompt: "This zipper is ___.",
      hint: "Cái khóa kéo này bị hỏng rồi.",
      answer: "broken",
      answerHint: "This zipper is broken."
    },
    {
      id: "L132C08",
      type: "fill",
      prompt: "It has a ___.",
      hint: "Nó bị thủng một lỗ.",
      answer: "hole",
      answerHint: "It has a hole."
    },
    {
      id: "L132C09",
      type: "fill",
      prompt: "I just ___ it.",
      hint: "Tôi vừa mới mua nó.",
      answer: "bought",
      answerHint: "I just bought it."
    },
    {
      id: "L132C10",
      type: "dialogue",
      prompt: "Worker: How can I help you?\nCustomer: This shirt has a hole. I just bought it.\nWorker: I'm so sorry. I can offer you a refund.",
      hint: "Thợ: Tôi có thể giúp gì cho bạn?\nKhách: Cái áo này bị thủng một lỗ. Tôi vừa mới mua nó.\nThợ: Tôi rất xin lỗi. Tôi có thể hoàn tiền lại cho bạn.",
      answer: "Worker: How can I help you?\nCustomer: This shirt has a hole. I just bought it.\nWorker: I'm so sorry. I can offer you a refund."
    }
  ]
},
  {
  id: "L133",
  title: "Wrong Order Pickup",
  titleVi: "Nhận đơn hàng sai",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn nhận đơn hàng trực tuyến bị sai và muốn được hoàn tiền.",
  phrases: [
    {
      english: "My order is wrong.",
      vietnamese: "Đơn hàng của tôi bị sai.",
      pronunciation: "mai or-der iz rong"
    },
    {
      english: "I want a refund, please.",
      vietnamese: "Tôi muốn được hoàn tiền.",
      pronunciation: "ai wont uh ree-fund pleez"
    },
    {
      english: "Can I see the manager?",
      vietnamese: "Tôi có thể gặp quản lý được không?",
      pronunciation: "kan ai see thuh ma-nuh-jer"
    }
  ],
  drill: [
    {
      id: "L133C01",
      type: "read",
      prompt: "My order is wrong.",
      hint: "Đơn hàng của tôi bị sai.",
      answer: "My order is wrong."
    },
    {
      id: "L133C02",
      type: "recall",
      prompt: "Đơn hàng của tôi bị sai.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "My order is wrong."
    },
    {
      id: "L133C03",
      type: "read",
      prompt: "I want a refund, please.",
      hint: "Tôi muốn được hoàn tiền.",
      answer: "I want a refund, please."
    },
    {
      id: "L133C04",
      type: "recall",
      prompt: "Tôi muốn được hoàn tiền.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I want a refund, please."
    },
    {
      id: "L133C05",
      type: "read",
      prompt: "Can I see the manager?",
      hint: "Tôi có thể gặp quản lý được không?",
      answer: "Can I see the manager?"
    },
    {
      id: "L133C06",
      type: "recall",
      prompt: "Tôi có thể gặp quản lý được không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can I see the manager?"
    },
    {
      id: "L133C07",
      type: "fill",
      prompt: "My ___ is wrong.",
      hint: "Đơn hàng của tôi bị sai.",
      answer: "order",
      answerHint: "My order is wrong."
    },
    {
      id: "L133C08",
      type: "fill",
      prompt: "I want a ___, please.",
      hint: "Tôi muốn được hoàn tiền.",
      answer: "refund",
      answerHint: "I want a refund, please."
    },
    {
      id: "L133C09",
      type: "fill",
      prompt: "Can I see the ___?",
      hint: "Tôi có thể gặp quản lý được không?",
      answer: "manager",
      answerHint: "Can I see the manager?"
    },
    {
      id: "L133C10",
      type: "dialogue",
      prompt: "Worker: What's the problem?\nCustomer: My order is wrong.\nWorker: I'm sorry about that.",
      hint: "Thợ: Có vấn đề gì vậy?\nKhách: Đơn hàng của tôi bị sai.\nThợ: Tôi xin lỗi về điều đó.",
      answer: "Worker: What's the problem?\nCustomer: My order is wrong.\nWorker: I'm sorry about that."
    }
  ]
},
  {
  id: "L134",
  title: "Flea Market Bargaining",
  titleVi: "Mặc cả ở chợ trời",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi bạn muốn mặc cả giá ở chợ trời hoặc các buổi bán đồ cũ để có được giá tốt hơn.",
  phrases: [
    {
      english: "Can you do five dollars?",
      vietnamese: "Bạn có thể bán năm đô la không?",
      pronunciation: "kan yoo doo faiv dol-ers?"
    },
    {
      english: "What's your best price?",
      vietnamese: "Giá tốt nhất của bạn là bao nhiêu?",
      pronunciation: "wots yor best prais?"
    },
    {
      english: "I'll give you eight.",
      vietnamese: "Tôi trả bạn tám đô.",
      pronunciation: "ail giv yoo ait."
    }
  ],
  drill: [
    {
      id: "L134C01",
      type: "read",
      prompt: "Can you do five dollars?",
      hint: "Bạn có thể bán năm đô la không?",
      answer: "Can you do five dollars?"
    },
    {
      id: "L134C02",
      type: "recall",
      prompt: "Bạn có thể bán năm đô la không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can you do five dollars?"
    },
    {
      id: "L134C03",
      type: "read",
      prompt: "What's your best price?",
      hint: "Giá tốt nhất của bạn là bao nhiêu?",
      answer: "What's your best price?"
    },
    {
      id: "L134C04",
      type: "recall",
      prompt: "Giá tốt nhất của bạn là bao nhiêu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What's your best price?"
    },
    {
      id: "L134C05",
      type: "read",
      prompt: "I'll give you eight.",
      hint: "Tôi trả bạn tám đô.",
      answer: "I'll give you eight."
    },
    {
      id: "L134C06",
      type: "recall",
      prompt: "Tôi trả bạn tám đô.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I'll give you eight."
    },
    {
      id: "L134C07",
      type: "fill",
      prompt: "Can you do five ___?",
      hint: "Bạn có thể bán năm đô la không?",
      answer: "dollars",
      answerHint: "Can you do five dollars?"
    },
    {
      id: "L134C08",
      type: "fill",
      prompt: "What's your best ___?",
      hint: "Giá tốt nhất của bạn là bao nhiêu?",
      answer: "price",
      answerHint: "What's your best price?"
    },
    {
      id: "L134C09",
      type: "fill",
      prompt: "I'll give you ___.",
      hint: "Tôi trả bạn tám đô.",
      answer: "eight",
      answerHint: "I'll give you eight."
    },
    {
      id: "L134C10",
      type: "dialogue",
      prompt: "Worker: What's your best price?\nCustomer: I can do fifteen dollars.\nWorker: I'll give you twelve.",
      hint: "Thợ: Giá tốt nhất của bạn là bao nhiêu?\nKhách: Tôi có thể bán mười lăm đô la.\nThợ: Tôi trả bạn mười hai.",
      answer: "Worker: What's your best price?\nCustomer: I can do fifteen dollars.\nWorker: I'll give you twelve."
    }
  ]
}
  ]
};

export default data;
