import type { Class } from '../types';

const data: Class = {
  id: "grocery-store",
  title: "Grocery Store",
  titleVi: "Tiếng Anh Tại Siêu Thị",
  lessons: [
  {
  id: "L108",
  title: "Grocery Store Basics",
  titleVi: "Những Câu Cơ Bản Ở Siêu Thị",
  level: "A1",
  context: "Sử dụng những câu này khi bạn cần tìm đồ ở siêu thị.",
  phrases: [
    {
      english: "Where is the rice?",
      vietnamese: "Gạo ở đâu ạ?",
      pronunciation: "wer iz the rais?"
    },
    {
      english: "Where is the fish sauce?",
      vietnamese: "Nước mắm ở đâu ạ?",
      pronunciation: "wer iz the fish sos?"
    },
    {
      english: "Do you have fish sauce?",
      vietnamese: "Ở đây có nước mắm không ạ?",
      pronunciation: "du yu hav fish sos?"
    }
  ],
  drill: [
    {
      id: "L108C01",
      type: "read",
      prompt: "Where is the rice?",
      hint: "Gạo ở đâu ạ?",
      answer: "Where is the rice?"
    },
    {
      id: "L108C02",
      type: "recall",
      prompt: "Gạo ở đâu ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Where is the rice?"
    },
    {
      id: "L108C03",
      type: "read",
      prompt: "Where is the fish sauce?",
      hint: "Nước mắm ở đâu ạ?",
      answer: "Where is the fish sauce?"
    },
    {
      id: "L108C04",
      type: "recall",
      prompt: "Nước mắm ở đâu ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Where is the fish sauce?"
    },
    {
      id: "L108C05",
      type: "read",
      prompt: "Do you have fish sauce?",
      hint: "Ở đây có nước mắm không ạ?",
      answer: "Do you have fish sauce?"
    },
    {
      id: "L108C06",
      type: "recall",
      prompt: "Ở đây có nước mắm không ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Do you have fish sauce?"
    },
    {
      id: "L108C07",
      type: "fill",
      prompt: "Where is the ___?",
      hint: "Gạo ở đâu ạ?",
      answer: "rice",
      answerHint: "Where is the rice?"
    },
    {
      id: "L108C08",
      type: "fill",
      prompt: "Where is the ___ sauce?",
      hint: "Nước mắm ở đâu ạ?",
      answer: "fish",
      answerHint: "Where is the fish sauce?"
    },
    {
      id: "L108C09",
      type: "fill",
      prompt: "Do you have ___ sauce?",
      hint: "Ở đây có nước mắm không ạ?",
      answer: "fish",
      answerHint: "Do you have fish sauce?"
    },
    {
      id: "L108C10",
      type: "dialogue",
      prompt: "Worker: Hello, can I help you?\nCustomer: Yes, where is the rice?\nWorker: It's in aisle 5.",
      hint: "Thợ: Xin chào, tôi có thể giúp gì cho bạn?\nKhách: Vâng, gạo ở đâu?\nThợ: Nó ở lối đi số 5.",
      answer: "Worker: Hello, can I help you?\nCustomer: Yes, where is the rice?\nWorker: It's in aisle 5."
    }
  ]
},
  {
  id: "L109",
  title: "Ordering Ham at Deli",
  titleVi: "Gọi Món Giăm Bông Ở Quầy Bán Đồ Nguội",
  level: "A1",
  context: "Sử dụng những mẫu câu này khi bạn muốn mua giăm bông ở quầy bán đồ nguội trong siêu thị.",
  phrases: [
    {
      english: "Half a pound, please.",
      vietnamese: "Cho tôi nửa pound ạ.",
      pronunciation: "haf uh pownd, pleez."
    },
    {
      english: "Sliced thin, please.",
      vietnamese: "Làm ơn thái mỏng ạ.",
      pronunciation: "slyst thin, pleez."
    },
    {
      english: "Anything else?",
      vietnamese: "Còn gì nữa không ạ?",
      pronunciation: "en-ee-thing els?"
    }
  ],
  drill: [
    {
      id: "L109C01",
      type: "read",
      prompt: "Half a pound, please.",
      hint: "Cho tôi nửa pound ạ.",
      answer: "Half a pound, please."
    },
    {
      id: "L109C02",
      type: "recall",
      prompt: "Cho tôi nửa pound ạ.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Half a pound, please."
    },
    {
      id: "L109C03",
      type: "read",
      prompt: "Sliced thin, please.",
      hint: "Làm ơn thái mỏng ạ.",
      answer: "Sliced thin, please."
    },
    {
      id: "L109C04",
      type: "recall",
      prompt: "Làm ơn thái mỏng ạ.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Sliced thin, please."
    },
    {
      id: "L109C05",
      type: "read",
      prompt: "Anything else?",
      hint: "Còn gì nữa không ạ?",
      answer: "Anything else?"
    },
    {
      id: "L109C06",
      type: "recall",
      prompt: "Còn gì nữa không ạ?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Anything else?"
    },
    {
      id: "L109C07",
      type: "fill",
      prompt: "Half a ___, please.",
      hint: "Cho tôi nửa pound ạ.",
      answer: "pound",
      answerHint: "Half a pound, please."
    },
    {
      id: "L109C08",
      type: "fill",
      prompt: "___ thin, please.",
      hint: "Làm ơn thái mỏng ạ.",
      answer: "Sliced",
      answerHint: "Sliced thin, please."
    },
    {
      id: "L109C09",
      type: "fill",
      prompt: "___ else?",
      hint: "Còn gì nữa không ạ?",
      answer: "Anything",
      answerHint: "Anything else?"
    },
    {
      id: "L109C10",
      type: "dialogue",
      prompt: "Worker: Can I help you?\nCustomer: Half a pound of ham, sliced thin please.\nWorker: Anything else?",
      hint: "Thợ: Tôi có thể giúp gì cho bạn?\nKhách: Cho tôi nửa pound giăm bông, thái mỏng ạ.\nThợ: Còn gì nữa không ạ?",
      answer: "Worker: Can I help you?\nCustomer: Half a pound of ham, sliced thin please.\nWorker: Anything else?"
    }
  ]
},
  {
  id: "L110",
  title: "Sale Signs and Coupons",
  titleVi: "Đọc Bảng Giảm Giá và Phiếu Giảm Giá",
  level: "A2",
  context: "Bạn sẽ sử dụng những cụm từ này khi mua sắm để hiểu các chương trình khuyến mãi và giảm giá.",
  phrases: [
    {
      english: "Buy one, get one free.",
      vietnamese: "Mua một, tặng một.",
      pronunciation: "bye wun, get wun free"
    },
    {
      english: "20 percent off.",
      vietnamese: "Giảm giá 20 phần trăm.",
      pronunciation: "twen-tee per-sent off"
    },
    {
      english: "Half price.",
      vietnamese: "Nửa giá.",
      pronunciation: "haf pryce"
    }
  ],
  drill: [
    {
      id: "L110C01",
      type: "read",
      prompt: "Buy one, get one free.",
      hint: "Mua một, tặng một.",
      answer: "Buy one, get one free."
    },
    {
      id: "L110C02",
      type: "recall",
      prompt: "Mua một, tặng một.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Buy one, get one free."
    },
    {
      id: "L110C03",
      type: "read",
      prompt: "20 percent off.",
      hint: "Giảm giá 20 phần trăm.",
      answer: "20 percent off."
    },
    {
      id: "L110C04",
      type: "recall",
      prompt: "Giảm giá 20 phần trăm.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "20 percent off."
    },
    {
      id: "L110C05",
      type: "read",
      prompt: "Half price.",
      hint: "Nửa giá.",
      answer: "Half price."
    },
    {
      id: "L110C06",
      type: "recall",
      prompt: "Nửa giá.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Half price."
    },
    {
      id: "L110C07",
      type: "fill",
      prompt: "Buy one, get one ___.",
      hint: "Mua một, tặng một.",
      answer: "free",
      answerHint: "Buy one, get one free."
    },
    {
      id: "L110C08",
      type: "fill",
      prompt: "___ percent off.",
      hint: "Giảm giá 20 phần trăm.",
      answer: "20",
      answerHint: "20 percent off."
    },
    {
      id: "L110C09",
      type: "fill",
      prompt: "Half ___.",
      hint: "Nửa giá.",
      answer: "price",
      answerHint: "Half price."
    },
    {
      id: "L110C10",
      type: "dialogue",
      prompt: "Worker: Can I help you?\nCustomer: Yes, is this shirt on sale?\nWorker: Yes, it's half price today.",
      hint: "Thợ: Tôi có thể giúp gì cho bạn?\nKhách: Vâng, chiếc áo này có giảm giá không?\nThợ: Có, hôm nay nó được giảm nửa giá.",
      answer: "Worker: Can I help you?\nCustomer: Yes, is this shirt on sale?\nWorker: Yes, it's half price today."
    }
  ]
},
  {
  id: "L111",
  title: "Checking Out Basics",
  titleVi: "Thanh Toán Cơ Bản",
  level: "A1",
  context: "Sử dụng những cụm từ này khi bạn thanh toán tại quầy thu ngân ở siêu thị hoặc cửa hàng.",
  phrases: [
    {
      english: "Paper or plastic?",
      vietnamese: "Túi giấy hay túi ni lông?",
      pronunciation: "pay-per or plas-tik?"
    },
    {
      english: "Do you have a rewards card?",
      vietnamese: "Bạn có thẻ thành viên không?",
      pronunciation: "doo yoo hav a ree-wards card?"
    },
    {
      english: "That will be $10.",
      vietnamese: "Tổng cộng là 10 đô la.",
      pronunciation: "that wil bee ten dol-lars"
    }
  ],
  drill: [
    {
      id: "L111C01",
      type: "read",
      prompt: "Paper or plastic?",
      hint: "Túi giấy hay túi ni lông?",
      answer: "Paper or plastic?"
    },
    {
      id: "L111C02",
      type: "recall",
      prompt: "Túi giấy hay túi ni lông?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Paper or plastic?"
    },
    {
      id: "L111C03",
      type: "read",
      prompt: "Do you have a rewards card?",
      hint: "Bạn có thẻ thành viên không?",
      answer: "Do you have a rewards card?"
    },
    {
      id: "L111C04",
      type: "recall",
      prompt: "Bạn có thẻ thành viên không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Do you have a rewards card?"
    },
    {
      id: "L111C05",
      type: "read",
      prompt: "That will be $10.",
      hint: "Tổng cộng là 10 đô la.",
      answer: "That will be $10."
    },
    {
      id: "L111C06",
      type: "recall",
      prompt: "Tổng cộng là 10 đô la.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "That will be $10."
    },
    {
      id: "L111C07",
      type: "fill",
      prompt: "___ or plastic?",
      hint: "Túi giấy hay túi ni lông?",
      answer: "Paper",
      answerHint: "Paper or plastic?"
    },
    {
      id: "L111C08",
      type: "fill",
      prompt: "Do you have a ___ card?",
      hint: "Bạn có thẻ thành viên không?",
      answer: "rewards",
      answerHint: "Do you have a rewards card?"
    },
    {
      id: "L111C09",
      type: "fill",
      prompt: "That will be $___.",
      hint: "Tổng cộng là 10 đô la.",
      answer: "10",
      answerHint: "That will be $10."
    },
    {
      id: "L111C10",
      type: "dialogue",
      prompt: "Worker: Paper or plastic?\nCustomer: Plastic, please.\nWorker: That will be $10.",
      hint: "Thợ: Túi giấy hay túi ni lông?\nKhách: Túi ni lông, làm ơn.\nThợ: Tổng cộng là 10 đô la.",
      answer: "Worker: Paper or plastic?\nCustomer: Plastic, please.\nWorker: That will be $10."
    }
  ]
},
  {
  id: "L112",
  title: "Returning Milk Products",
  titleVi: "Trả lại sản phẩm sữa",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn muốn trả lại sữa hoặc các sản phẩm từ sữa đã bị hỏng hoặc mua nhầm.",
  phrases: [
    {
      english: "This milk is expired.",
      vietnamese: "Sữa này hết hạn rồi.",
      pronunciation: "this milk iz ek-spy-erd"
    },
    {
      english: "I bought the wrong one.",
      vietnamese: "Tôi mua nhầm loại rồi.",
      pronunciation: "ai bot the rong wun"
    },
    {
      english: "Can I return this, please?",
      vietnamese: "Tôi có thể trả lại cái này được không?",
      pronunciation: "kan ai ri-turn this, pleez?"
    }
  ],
  drill: [
    {
      id: "L112C01",
      type: "read",
      prompt: "This milk is expired.",
      hint: "Sữa này hết hạn rồi.",
      answer: "This milk is expired."
    },
    {
      id: "L112C02",
      type: "recall",
      prompt: "Sữa này hết hạn rồi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "This milk is expired."
    },
    {
      id: "L112C03",
      type: "read",
      prompt: "I bought the wrong one.",
      hint: "Tôi mua nhầm loại rồi.",
      answer: "I bought the wrong one."
    },
    {
      id: "L112C04",
      type: "recall",
      prompt: "Tôi mua nhầm loại rồi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I bought the wrong one."
    },
    {
      id: "L112C05",
      type: "read",
      prompt: "Can I return this, please?",
      hint: "Tôi có thể trả lại cái này được không?",
      answer: "Can I return this, please?"
    },
    {
      id: "L112C06",
      type: "recall",
      prompt: "Tôi có thể trả lại cái này được không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can I return this, please?"
    },
    {
      id: "L112C07",
      type: "fill",
      prompt: "This milk is ___.",
      hint: "Sữa này hết hạn rồi.",
      answer: "expired",
      answerHint: "This milk is expired."
    },
    {
      id: "L112C08",
      type: "fill",
      prompt: "I bought the ___ one.",
      hint: "Tôi mua nhầm loại rồi.",
      answer: "wrong",
      answerHint: "I bought the wrong one."
    },
    {
      id: "L112C09",
      type: "fill",
      prompt: "Can I ___ this, please?",
      hint: "Tôi có thể trả lại cái này được không?",
      answer: "return",
      answerHint: "Can I return this, please?"
    },
    {
      id: "L112C10",
      type: "dialogue",
      prompt: "Worker: Can I help you?\nCustomer: Yes, this milk is expired.\nWorker: I'm so sorry about that.",
      hint: "Thợ: Tôi có thể giúp gì cho bạn?\nKhách: Vâng, sữa này hết hạn rồi.\nThợ: Tôi rất tiếc về điều đó.",
      answer: "Worker: Can I help you?\nCustomer: Yes, this milk is expired.\nWorker: I'm so sorry about that."
    }
  ]
},
  {
  id: "L113",
  title: "Allergies and Ingredients",
  titleVi: "Hỏi về dị ứng và thành phần",
  level: "A2",
  context: "Sử dụng các cụm từ này khi bạn muốn hỏi về thành phần của một món ăn hoặc nếu bạn bị dị ứng.",
  phrases: [
    {
      english: "Does this contain peanuts?",
      vietnamese: "Cái này có đậu phộng không?",
      pronunciation: "duz this con-tain pee-nuts?"
    },
    {
      english: "Is this gluten free?",
      vietnamese: "Cái này không có gluten phải không?",
      pronunciation: "iz this glue-ten free?"
    },
    {
      english: "What are the ingredients?",
      vietnamese: "Thành phần là gì?",
      pronunciation: "wot are the in-greed-ee-ents?"
    }
  ],
  drill: [
    {
      id: "L113C01",
      type: "read",
      prompt: "Does this contain peanuts?",
      hint: "Cái này có đậu phộng không?",
      answer: "Does this contain peanuts?"
    },
    {
      id: "L113C02",
      type: "recall",
      prompt: "Cái này có đậu phộng không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Does this contain peanuts?"
    },
    {
      id: "L113C03",
      type: "read",
      prompt: "Is this gluten free?",
      hint: "Cái này không có gluten phải không?",
      answer: "Is this gluten free?"
    },
    {
      id: "L113C04",
      type: "recall",
      prompt: "Cái này không có gluten phải không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is this gluten free?"
    },
    {
      id: "L113C05",
      type: "read",
      prompt: "What are the ingredients?",
      hint: "Thành phần là gì?",
      answer: "What are the ingredients?"
    },
    {
      id: "L113C06",
      type: "recall",
      prompt: "Thành phần là gì?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What are the ingredients?"
    },
    {
      id: "L113C07",
      type: "fill",
      prompt: "Does this contain ___?",
      hint: "Cái này có đậu phộng không?",
      answer: "peanuts",
      answerHint: "Does this contain peanuts?"
    },
    {
      id: "L113C08",
      type: "fill",
      prompt: "Is this ___ free?",
      hint: "Cái này không có gluten phải không?",
      answer: "gluten",
      answerHint: "Is this gluten free?"
    },
    {
      id: "L113C09",
      type: "fill",
      prompt: "What are the ___?",
      hint: "Thành phần là gì?",
      answer: "ingredients",
      answerHint: "What are the ingredients?"
    },
    {
      id: "L113C10",
      type: "dialogue",
      prompt: "Worker: Does this contain peanuts?\nCustomer: Yes, it does.\nWorker: Okay, thank you.",
      hint: "Thợ: Cái này có đậu phộng không?\nKhách: Có, nó có.\nThợ: Được rồi, cảm ơn.",
      answer: "Worker: Does this contain peanuts?\nCustomer: Yes, it does.\nWorker: Okay, thank you."
    }
  ]
},
  {
  id: "L114",
  title: "Price and Size",
  titleVi: "So sánh giá và kích cỡ",
  level: "B1",
  context: "Sử dụng các cụm từ này khi bạn muốn so sánh giá cả và kích cỡ của các sản phẩm khác nhau để đưa ra quyết định mua hàng tốt nhất.",
  phrases: [
    {
      english: "Which one is cheaper?",
      vietnamese: "Cái nào rẻ hơn?",
      pronunciation: "wich wuhn iz chee-per?"
    },
    {
      english: "Is the bigger one cheaper per unit?",
      vietnamese: "Cái lớn hơn có rẻ hơn trên một đơn vị không?",
      pronunciation: "iz thuh big-er wuhn chee-per pur yoo-nit?"
    },
    {
      english: "What's the price per ounce?",
      vietnamese: "Giá mỗi ounce là bao nhiêu?",
      pronunciation: "wots thuh prais pur owns?"
    }
  ],
  drill: [
    {
      id: "L114C01",
      type: "read",
      prompt: "Which one is cheaper?",
      hint: "Cái nào rẻ hơn?",
      answer: "Which one is cheaper?"
    },
    {
      id: "L114C02",
      type: "recall",
      prompt: "Cái nào rẻ hơn?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Which one is cheaper?"
    },
    {
      id: "L114C03",
      type: "read",
      prompt: "Is the bigger one cheaper per unit?",
      hint: "Cái lớn hơn có rẻ hơn trên một đơn vị không?",
      answer: "Is the bigger one cheaper per unit?"
    },
    {
      id: "L114C04",
      type: "recall",
      prompt: "Cái lớn hơn có rẻ hơn trên một đơn vị không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is the bigger one cheaper per unit?"
    },
    {
      id: "L114C05",
      type: "read",
      prompt: "What's the price per ounce?",
      hint: "Giá mỗi ounce là bao nhiêu?",
      answer: "What's the price per ounce?"
    },
    {
      id: "L114C06",
      type: "recall",
      prompt: "Giá mỗi ounce là bao nhiêu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What's the price per ounce?"
    },
    {
      id: "L114C07",
      type: "fill",
      prompt: "Which one is ___?",
      hint: "Cái nào rẻ hơn?",
      answer: "cheaper",
      answerHint: "Which one is cheaper?"
    },
    {
      id: "L114C08",
      type: "fill",
      prompt: "Is the bigger one cheaper per ___?",
      hint: "Cái lớn hơn có rẻ hơn trên một đơn vị không?",
      answer: "unit",
      answerHint: "Is the bigger one cheaper per unit?"
    },
    {
      id: "L114C09",
      type: "fill",
      prompt: "What's the price per ___?",
      hint: "Giá mỗi ounce là bao nhiêu?",
      answer: "ounce",
      answerHint: "What's the price per ounce?"
    },
    {
      id: "L114C10",
      type: "dialogue",
      prompt: "Worker: Which one is cheaper, this one or that one?\nCustomer: I think that one is cheaper.\nWorker: Okay, great!",
      hint: "Thợ: Cái nào rẻ hơn, cái này hay cái kia?\nKhách: Tôi nghĩ cái kia rẻ hơn.\nThợ: Ok, tuyệt vời!",
      answer: "Worker: Which one is cheaper, this one or that one?\nCustomer: I think that one is cheaper.\nWorker: Okay, great!"
    }
  ]
},
  {
  id: "L115",
  title: "Self Checkout Basics",
  titleVi: "Sử dụng máy tự thanh toán",
  level: "A2",
  context: "Học cách sử dụng máy tự thanh toán ở siêu thị.",
  phrases: [
    {
      english: "Scan the barcode, please.",
      vietnamese: "Xin hãy quét mã vạch.",
      pronunciation: "skan the bar-kode, pleez"
    },
    {
      english: "Select your payment method.",
      vietnamese: "Chọn phương thức thanh toán của bạn.",
      pronunciation: "se-lekt yor pay-ment meth-od"
    },
    {
      english: "Unexpected item in the bagging area.",
      vietnamese: "Có vật phẩm không mong muốn trong khu vực đóng gói.",
      pronunciation: "un-ek-spek-ted ai-tem in the bag-ing air-ee-uh"
    }
  ],
  drill: [
    {
      id: "L115C01",
      type: "read",
      prompt: "Scan the barcode, please.",
      hint: "Xin hãy quét mã vạch.",
      answer: "Scan the barcode, please."
    },
    {
      id: "L115C02",
      type: "recall",
      prompt: "Xin hãy quét mã vạch.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Scan the barcode, please."
    },
    {
      id: "L115C03",
      type: "read",
      prompt: "Select your payment method.",
      hint: "Chọn phương thức thanh toán của bạn.",
      answer: "Select your payment method."
    },
    {
      id: "L115C04",
      type: "recall",
      prompt: "Chọn phương thức thanh toán của bạn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Select your payment method."
    },
    {
      id: "L115C05",
      type: "read",
      prompt: "Unexpected item in the bagging area.",
      hint: "Có vật phẩm không mong muốn trong khu vực đóng gói.",
      answer: "Unexpected item in the bagging area."
    },
    {
      id: "L115C06",
      type: "recall",
      prompt: "Có vật phẩm không mong muốn trong khu vực đóng gói.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Unexpected item in the bagging area."
    },
    {
      id: "L115C07",
      type: "fill",
      prompt: "Scan the ___, please.",
      hint: "Xin hãy quét mã vạch.",
      answer: "barcode",
      answerHint: "Scan the barcode, please."
    },
    {
      id: "L115C08",
      type: "fill",
      prompt: "Select your ___ method.",
      hint: "Chọn phương thức thanh toán của bạn.",
      answer: "payment",
      answerHint: "Select your payment method."
    },
    {
      id: "L115C09",
      type: "fill",
      prompt: "Unexpected ___ in the bagging area.",
      hint: "Có vật phẩm không mong muốn trong khu vực đóng gói.",
      answer: "item",
      answerHint: "Unexpected item in the bagging area."
    },
    {
      id: "L115C10",
      type: "dialogue",
      prompt: "Worker: Scan the barcode, please.\nCustomer: Okay, I scanned it.\nWorker: Select your payment method.",
      hint: "Thợ: Scan the barcode, please.\nKhách: Okay, I scanned it.\nThợ: Select your payment method.",
      answer: "Worker: Scan the barcode, please.\nCustomer: Okay, I scanned it.\nWorker: Select your payment method."
    }
  ]
},
  {
  id: "L116",
  title: "Talking in Line",
  titleVi: "Nói chuyện khi xếp hàng",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi bạn muốn hỏi người khác về hàng đợi ở siêu thị hoặc cửa hàng.",
  phrases: [
    {
      english: "Is this the express lane?",
      vietnamese: "Đây có phải là hàng thanh toán nhanh không?",
      pronunciation: "iz this the ek-spres lane?"
    },
    {
      english: "Are you in line?",
      vietnamese: "Bạn đang xếp hàng phải không?",
      pronunciation: "ar yoo in line?"
    },
    {
      english: "Is anyone in line behind me?",
      vietnamese: "Có ai xếp hàng sau tôi không?",
      pronunciation: "iz en-ee-wuhn in line bi-hind mee?"
    }
  ],
  drill: [
    {
      id: "L116C01",
      type: "read",
      prompt: "Is this the express lane?",
      hint: "Đây có phải là hàng thanh toán nhanh không?",
      answer: "Is this the express lane?"
    },
    {
      id: "L116C02",
      type: "recall",
      prompt: "Đây có phải là hàng thanh toán nhanh không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is this the express lane?"
    },
    {
      id: "L116C03",
      type: "read",
      prompt: "Are you in line?",
      hint: "Bạn đang xếp hàng phải không?",
      answer: "Are you in line?"
    },
    {
      id: "L116C04",
      type: "recall",
      prompt: "Bạn đang xếp hàng phải không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Are you in line?"
    },
    {
      id: "L116C05",
      type: "read",
      prompt: "Is anyone in line behind me?",
      hint: "Có ai xếp hàng sau tôi không?",
      answer: "Is anyone in line behind me?"
    },
    {
      id: "L116C06",
      type: "recall",
      prompt: "Có ai xếp hàng sau tôi không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is anyone in line behind me?"
    },
    {
      id: "L116C07",
      type: "fill",
      prompt: "Is this the ___ lane?",
      hint: "Đây có phải là hàng thanh toán nhanh không?",
      answer: "express",
      answerHint: "Is this the express lane?"
    },
    {
      id: "L116C08",
      type: "fill",
      prompt: "Are you in ___?",
      hint: "Bạn đang xếp hàng phải không?",
      answer: "line",
      answerHint: "Are you in line?"
    },
    {
      id: "L116C09",
      type: "fill",
      prompt: "Is anyone in line ___ me?",
      hint: "Có ai xếp hàng sau tôi không?",
      answer: "behind",
      answerHint: "Is anyone in line behind me?"
    },
    {
      id: "L116C10",
      type: "dialogue",
      prompt: "Worker: Are you in line?\nCustomer: Yes, I am.\nWorker: Is anyone in line behind me?",
      hint: "Thợ: Bạn đang xếp hàng phải không?\nKhách: Vâng, tôi đang xếp hàng.\nThợ: Có ai xếp hàng sau tôi không?",
      answer: "Worker: Are you in line?\nCustomer: Yes, I am.\nWorker: Is anyone in line behind me?"
    }
  ]
}
  ]
};

export default data;
