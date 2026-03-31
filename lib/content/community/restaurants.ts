import type { Class } from '../types';

const data: Class = {
  id: "restaurants",
  title: "Restaurants",
  titleVi: "Nhà Hàng",
  lessons: [
  {
  id: "L189",
  title: "Ordering at a Restaurant",
  titleVi: "Gọi món tại nhà hàng",
  level: "A1",
  context: "Bạn có thể sử dụng những câu này khi bạn muốn gọi món ăn tại một nhà hàng ở Mỹ.",
  phrases: [
    {
      english: "Table for two, please.",
      vietnamese: "Cho tôi một bàn cho hai người.",
      pronunciation: "tay-bl for too, pleez."
    },
    {
      english: "I'll have the chicken.",
      vietnamese: "Tôi sẽ dùng món gà.",
      pronunciation: "ail hav thuh chi-ken."
    },
    {
      english: "What do you recommend?",
      vietnamese: "Bạn gợi ý món gì?",
      pronunciation: "wot doo yoo re-kuh-mend?"
    }
  ],
  drill: [
    {
      id: "L189C01",
      type: "read",
      prompt: "Table for two, please.",
      hint: "Cho tôi một bàn cho hai người.",
      answer: "Table for two, please."
    },
    {
      id: "L189C02",
      type: "recall",
      prompt: "Cho tôi một bàn cho hai người.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Table for two, please."
    },
    {
      id: "L189C03",
      type: "read",
      prompt: "I'll have the chicken.",
      hint: "Tôi sẽ dùng món gà.",
      answer: "I'll have the chicken."
    },
    {
      id: "L189C04",
      type: "recall",
      prompt: "Tôi sẽ dùng món gà.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I'll have the chicken."
    },
    {
      id: "L189C05",
      type: "read",
      prompt: "What do you recommend?",
      hint: "Bạn gợi ý món gì?",
      answer: "What do you recommend?"
    },
    {
      id: "L189C06",
      type: "recall",
      prompt: "Bạn gợi ý món gì?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What do you recommend?"
    },
    {
      id: "L189C07",
      type: "fill",
      prompt: "Table for ___, please.",
      hint: "Cho tôi một bàn cho hai người.",
      answer: "two",
      answerHint: "Table for two, please."
    },
    {
      id: "L189C08",
      type: "fill",
      prompt: "I'll have the ___.",
      hint: "Tôi sẽ dùng món gà.",
      answer: "chicken",
      answerHint: "I'll have the chicken."
    },
    {
      id: "L189C09",
      type: "fill",
      prompt: "What do you ___?",
      hint: "Bạn gợi ý món gì?",
      answer: "recommend",
      answerHint: "What do you recommend?"
    },
    {
      id: "L189C10",
      type: "dialogue",
      prompt: "Worker: Table for how many?\nCustomer: Table for two, please.\nWorker: Right this way.",
      hint: "Thợ: Bàn cho mấy người?\nKhách: Cho tôi một bàn cho hai người.\nThợ: Đi lối này.",
      answer: "Worker: Table for how many?\nCustomer: Table for two, please.\nWorker: Right this way."
    }
  ]
},
  {
  id: "L190",
  title: "Asking About Food",
  titleVi: "Hỏi Về Món Ăn",
  level: "A1",
  context: "Sử dụng những mẫu câu này khi bạn muốn hỏi về thực đơn ở nhà hàng.",
  phrases: [
    {
      english: "What is this dish?",
      vietnamese: "Món này là món gì?",
      pronunciation: "wot iz this dish"
    },
    {
      english: "Is it spicy?",
      vietnamese: "Món này có cay không?",
      pronunciation: "iz it spai-see"
    },
    {
      english: "Does it have seafood?",
      vietnamese: "Món này có hải sản không?",
      pronunciation: "duz it hav see-food"
    }
  ],
  drill: [
    {
      id: "L190C01",
      type: "read",
      prompt: "What is this dish?",
      hint: "Món này là món gì?",
      answer: "What is this dish?"
    },
    {
      id: "L190C02",
      type: "recall",
      prompt: "Món này là món gì?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What is this dish?"
    },
    {
      id: "L190C03",
      type: "read",
      prompt: "Is it spicy?",
      hint: "Món này có cay không?",
      answer: "Is it spicy?"
    },
    {
      id: "L190C04",
      type: "recall",
      prompt: "Món này có cay không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is it spicy?"
    },
    {
      id: "L190C05",
      type: "read",
      prompt: "Does it have seafood?",
      hint: "Món này có hải sản không?",
      answer: "Does it have seafood?"
    },
    {
      id: "L190C06",
      type: "recall",
      prompt: "Món này có hải sản không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Does it have seafood?"
    },
    {
      id: "L190C07",
      type: "fill",
      prompt: "What is this ___?",
      hint: "Món này là món gì?",
      answer: "dish",
      answerHint: "What is this dish?"
    },
    {
      id: "L190C08",
      type: "fill",
      prompt: "Is it ___?",
      hint: "Món này có cay không?",
      answer: "spicy",
      answerHint: "Is it spicy?"
    },
    {
      id: "L190C09",
      type: "fill",
      prompt: "Does it have ___?",
      hint: "Món này có hải sản không?",
      answer: "seafood",
      answerHint: "Does it have seafood?"
    },
    {
      id: "L190C10",
      type: "dialogue",
      prompt: "Worker: What is this dish?\nCustomer: It's chicken and rice.\nWorker: Does it have seafood?",
      hint: "Thợ: Món này là món gì?\nKhách: Đó là cơm gà.\nThợ: Món này có hải sản không?",
      answer: "Worker: What is this dish?\nCustomer: It's chicken and rice.\nWorker: Does it have seafood?"
    }
  ]
},
  {
  id: "L191",
  title: "Dietary Requests",
  titleVi: "Yêu Cầu Đặc Biệt",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn muốn yêu cầu món ăn không có một số thành phần hoặc điều chỉnh độ cay.",
  phrases: [
    {
      english: "No onion, please.",
      vietnamese: "Không hành, làm ơn.",
      pronunciation: "noh uhn-yun, pleez"
    },
    {
      english: "I'm allergic to shellfish.",
      vietnamese: "Tôi bị dị ứng hải sản.",
      pronunciation: "aym uh-lur-jik too shel-fish"
    },
    {
      english: "Less spicy, please.",
      vietnamese: "Ít cay thôi, làm ơn.",
      pronunciation: "less spy-see, pleez"
    }
  ],
  drill: [
    {
      id: "L191C01",
      type: "read",
      prompt: "No onion, please.",
      hint: "Không hành, làm ơn.",
      answer: "No onion, please."
    },
    {
      id: "L191C02",
      type: "recall",
      prompt: "Không hành, làm ơn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "No onion, please."
    },
    {
      id: "L191C03",
      type: "read",
      prompt: "I'm allergic to shellfish.",
      hint: "Tôi bị dị ứng hải sản.",
      answer: "I'm allergic to shellfish."
    },
    {
      id: "L191C04",
      type: "recall",
      prompt: "Tôi bị dị ứng hải sản.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I'm allergic to shellfish."
    },
    {
      id: "L191C05",
      type: "read",
      prompt: "Less spicy, please.",
      hint: "Ít cay thôi, làm ơn.",
      answer: "Less spicy, please."
    },
    {
      id: "L191C06",
      type: "recall",
      prompt: "Ít cay thôi, làm ơn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Less spicy, please."
    },
    {
      id: "L191C07",
      type: "fill",
      prompt: "No ___, please.",
      hint: "Không hành, làm ơn.",
      answer: "onion",
      answerHint: "No onion, please."
    },
    {
      id: "L191C08",
      type: "fill",
      prompt: "I'm allergic to ___.",
      hint: "Tôi bị dị ứng hải sản.",
      answer: "shellfish",
      answerHint: "I'm allergic to shellfish."
    },
    {
      id: "L191C09",
      type: "fill",
      prompt: "___ spicy, please.",
      hint: "Ít cay thôi, làm ơn.",
      answer: "Less",
      answerHint: "Less spicy, please."
    },
    {
      id: "L191C10",
      type: "dialogue",
      prompt: "Worker: Can I help you?\nCustomer: Yes, no onion, please.\nWorker: Okay, no onion.",
      hint: "Thợ: Tôi có thể giúp gì cho bạn?\nKhách: Vâng, không hành, làm ơn.\nThợ: Được rồi, không hành.",
      answer: "Worker: Can I help you?\nCustomer: Yes, no onion, please.\nWorker: Okay, no onion."
    }
  ]
},
  {
  id: "L192",
  title: "Food Complaints",
  titleVi: "Phàn nàn về đồ ăn",
  level: "A2",
  context: "Học cách lịch sự nói khi đồ ăn không đúng ý bạn ở nhà hàng. (Learn how to politely speak when the food isn't what you expected in a restaurant.)",
  phrases: [
    {
      english: "This is cold.",
      vietnamese: "Món này nguội rồi.",
      pronunciation: "this iz kold"
    },
    {
      english: "I ordered medium-rare.",
      vietnamese: "Tôi gọi tái.",
      pronunciation: "ai or-derd mee-dee-um-rare"
    },
    {
      english: "This isn't what I ordered.",
      vietnamese: "Đây không phải món tôi đã gọi.",
      pronunciation: "this iz-nt wot ai or-derd"
    }
  ],
  drill: [
    {
      id: "L192C01",
      type: "read",
      prompt: "This is cold.",
      hint: "Món này nguội rồi.",
      answer: "This is cold."
    },
    {
      id: "L192C02",
      type: "recall",
      prompt: "Món này nguội rồi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "This is cold."
    },
    {
      id: "L192C03",
      type: "read",
      prompt: "I ordered medium-rare.",
      hint: "Tôi gọi tái.",
      answer: "I ordered medium-rare."
    },
    {
      id: "L192C04",
      type: "recall",
      prompt: "Tôi gọi tái.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I ordered medium-rare."
    },
    {
      id: "L192C05",
      type: "read",
      prompt: "This isn't what I ordered.",
      hint: "Đây không phải món tôi đã gọi.",
      answer: "This isn't what I ordered."
    },
    {
      id: "L192C06",
      type: "recall",
      prompt: "Đây không phải món tôi đã gọi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "This isn't what I ordered."
    },
    {
      id: "L192C07",
      type: "fill",
      prompt: "This is ___.",
      hint: "Món này nguội rồi.",
      answer: "cold",
      answerHint: "This is cold."
    },
    {
      id: "L192C08",
      type: "fill",
      prompt: "I ___ medium-rare.",
      hint: "Tôi gọi tái.",
      answer: "ordered",
      answerHint: "I ordered medium-rare."
    },
    {
      id: "L192C09",
      type: "fill",
      prompt: "This isn't what I ___.",
      hint: "Đây không phải món tôi đã gọi.",
      answer: "ordered",
      answerHint: "This isn't what I ordered."
    },
    {
      id: "L192C10",
      type: "dialogue",
      prompt: "Worker: Is everything okay?\nCustomer: This is cold.\nWorker: I'm very sorry. I'll get you a new one.",
      hint: "Thợ: Mọi thứ ổn chứ?\nKhách: Món này nguội rồi.\nThợ: Tôi rất xin lỗi. Tôi sẽ mang cho bạn một món mới.",
      answer: "Worker: Is everything okay?\nCustomer: This is cold.\nWorker: I'm very sorry. I'll get you a new one."
    }
  ]
},
  {
  id: "L193",
  title: "Paying the Bill",
  titleVi: "Thanh Toán Hóa Đơn",
  level: "A1",
  context: "Những câu này giúp bạn thanh toán hóa đơn ở nhà hàng hoặc quán ăn.",
  phrases: [
    {
      english: "Can I get the check?",
      vietnamese: "Tôi có thể lấy hóa đơn được không?",
      pronunciation: "kan ai get the chek?"
    },
    {
      english: "Can we split the bill?",
      vietnamese: "Chúng tôi có thể chia hóa đơn được không?",
      pronunciation: "kan wee split the bil?"
    },
    {
      english: "Do you accept cash?",
      vietnamese: "Quý vị có chấp nhận tiền mặt không?",
      pronunciation: "doo yoo ak-sept kash?"
    }
  ],
  drill: [
    {
      id: "L193C01",
      type: "read",
      prompt: "Can I get the check?",
      hint: "Tôi có thể lấy hóa đơn được không?",
      answer: "Can I get the check?"
    },
    {
      id: "L193C02",
      type: "recall",
      prompt: "Tôi có thể lấy hóa đơn được không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can I get the check?"
    },
    {
      id: "L193C03",
      type: "read",
      prompt: "Can we split the bill?",
      hint: "Chúng tôi có thể chia hóa đơn được không?",
      answer: "Can we split the bill?"
    },
    {
      id: "L193C04",
      type: "recall",
      prompt: "Chúng tôi có thể chia hóa đơn được không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can we split the bill?"
    },
    {
      id: "L193C05",
      type: "read",
      prompt: "Do you accept cash?",
      hint: "Quý vị có chấp nhận tiền mặt không?",
      answer: "Do you accept cash?"
    },
    {
      id: "L193C06",
      type: "recall",
      prompt: "Quý vị có chấp nhận tiền mặt không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Do you accept cash?"
    },
    {
      id: "L193C07",
      type: "fill",
      prompt: "Can I get the ___?",
      hint: "Tôi có thể lấy hóa đơn được không?",
      answer: "check",
      answerHint: "Can I get the check?"
    },
    {
      id: "L193C08",
      type: "fill",
      prompt: "Can we ___ the bill?",
      hint: "Chúng tôi có thể chia hóa đơn được không?",
      answer: "split",
      answerHint: "Can we split the bill?"
    },
    {
      id: "L193C09",
      type: "fill",
      prompt: "Do you accept ___?",
      hint: "Quý vị có chấp nhận tiền mặt không?",
      answer: "cash",
      answerHint: "Do you accept cash?"
    },
    {
      id: "L193C10",
      type: "dialogue",
      prompt: "Worker: Can I get the check?\nCustomer: Yes, here is my card.\nWorker: Thank you.",
      hint: "Thợ: Cho tôi xin hóa đơn được không?\nKhách: Vâng, đây là thẻ của tôi.\nThợ: Cảm ơn.",
      answer: "Worker: Can I get the check?\nCustomer: Yes, here is my card.\nWorker: Thank you."
    }
  ]
},
  {
  id: "L194",
  title: "Making a Reservation",
  titleVi: "Đặt Chỗ",
  level: "A2",
  context: "Sử dụng các cụm từ này khi bạn muốn đặt bàn tại một nhà hàng.",
  phrases: [
    {
      english: "I'd like a reservation.",
      vietnamese: "Tôi muốn đặt chỗ trước.",
      pronunciation: "ai-d laik uh rez-er-vey-shun"
    },
    {
      english: "Party of six, please.",
      vietnamese: "Cho sáu người, làm ơn.",
      pronunciation: "par-tee uv siks, pleez"
    },
    {
      english: "Any outdoor seating?",
      vietnamese: "Có chỗ ngồi ngoài trời không?",
      pronunciation: "en-ee out-door see-ting"
    }
  ],
  drill: [
    {
      id: "L194C01",
      type: "read",
      prompt: "I'd like a reservation.",
      hint: "Tôi muốn đặt chỗ trước.",
      answer: "I'd like a reservation."
    },
    {
      id: "L194C02",
      type: "recall",
      prompt: "Tôi muốn đặt chỗ trước.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I'd like a reservation."
    },
    {
      id: "L194C03",
      type: "read",
      prompt: "Party of six, please.",
      hint: "Cho sáu người, làm ơn.",
      answer: "Party of six, please."
    },
    {
      id: "L194C04",
      type: "recall",
      prompt: "Cho sáu người, làm ơn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Party of six, please."
    },
    {
      id: "L194C05",
      type: "read",
      prompt: "Any outdoor seating?",
      hint: "Có chỗ ngồi ngoài trời không?",
      answer: "Any outdoor seating?"
    },
    {
      id: "L194C06",
      type: "recall",
      prompt: "Có chỗ ngồi ngoài trời không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Any outdoor seating?"
    },
    {
      id: "L194C07",
      type: "fill",
      prompt: "I'd like a ___.",
      hint: "Tôi muốn đặt chỗ trước.",
      answer: "reservation",
      answerHint: "I'd like a reservation."
    },
    {
      id: "L194C08",
      type: "fill",
      prompt: "___ of six, please.",
      hint: "Cho sáu người, làm ơn.",
      answer: "Party",
      answerHint: "Party of six, please."
    },
    {
      id: "L194C09",
      type: "fill",
      prompt: "Any ___ seating?",
      hint: "Có chỗ ngồi ngoài trời không?",
      answer: "outdoor",
      answerHint: "Any outdoor seating?"
    },
    {
      id: "L194C10",
      type: "dialogue",
      prompt: "Worker: Hello, how can I help you?\nCustomer: I'd like a reservation for Saturday at 7.\nWorker: How many people?",
      hint: "Thợ: Xin chào, tôi có thể giúp gì cho bạn?\nKhách: Tôi muốn đặt chỗ vào thứ Bảy lúc 7 giờ.\nThợ: Bao nhiêu người?",
      answer: "Worker: Hello, how can I help you?\nCustomer: I'd like a reservation for Saturday at 7.\nWorker: How many people?"
    }
  ]
},
  {
  id: "L195",
  title: "Ordering Takeout & Delivery",
  titleVi: "Gọi Món Mang Đi & Giao Hàng",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn muốn gọi đồ ăn mang đi hoặc giao đến nhà.",
  phrases: [
    {
      english: "I want to place a takeout order.",
      vietnamese: "Tôi muốn đặt món mang đi.",
      pronunciation: "ai wont too প্লেিস এ টেক-আউট অর্-ডার"
    },
    {
      english: "How long will it take?",
      vietnamese: "Sẽ mất bao lâu?",
      pronunciation: "হাউ লং উইল ইট টেক?"
    },
    {
      english: "Is there a delivery fee?",
      vietnamese: "Có phí giao hàng không?",
      pronunciation: "ইজ দেয়ার এ ডেলিভারি ফি?"
    }
  ],
  drill: [
    {
      id: "L195C01",
      type: "read",
      prompt: "I want to place a takeout order.",
      hint: "Tôi muốn đặt món mang đi.",
      answer: "I want to place a takeout order."
    },
    {
      id: "L195C02",
      type: "recall",
      prompt: "Tôi muốn đặt món mang đi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I want to place a takeout order."
    },
    {
      id: "L195C03",
      type: "read",
      prompt: "How long will it take?",
      hint: "Sẽ mất bao lâu?",
      answer: "How long will it take?"
    },
    {
      id: "L195C04",
      type: "recall",
      prompt: "Sẽ mất bao lâu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How long will it take?"
    },
    {
      id: "L195C05",
      type: "read",
      prompt: "Is there a delivery fee?",
      hint: "Có phí giao hàng không?",
      answer: "Is there a delivery fee?"
    },
    {
      id: "L195C06",
      type: "recall",
      prompt: "Có phí giao hàng không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is there a delivery fee?"
    },
    {
      id: "L195C07",
      type: "fill",
      prompt: "I want to place a ___ order.",
      hint: "Tôi muốn đặt món mang đi.",
      answer: "takeout",
      answerHint: "I want to place a takeout order."
    },
    {
      id: "L195C08",
      type: "fill",
      prompt: "How long will ___ take?",
      hint: "Sẽ mất bao lâu?",
      answer: "it",
      answerHint: "How long will it take?"
    },
    {
      id: "L195C09",
      type: "fill",
      prompt: "Is there a delivery ___?",
      hint: "Có phí giao hàng không?",
      answer: "fee",
      answerHint: "Is there a delivery fee?"
    },
    {
      id: "L195C10",
      type: "dialogue",
      prompt: "Worker: Can I help you?\nCustomer: I want to place a takeout order.\nWorker: How long will it take?",
      hint: "Nhân viên: Tôi có thể giúp gì cho bạn?\nKhách hàng: Tôi muốn đặt món mang đi.\nNhân viên: Sẽ mất bao lâu?",
      answer: "Worker: Can I help you?\nCustomer: I want to place a takeout order.\nWorker: How long will it take?"
    }
  ]
},
  {
  id: "L196",
  title: "Restaurant Tipping",
  titleVi: "Tiền boa ở nhà hàng",
  level: "B1",
  context: "Sử dụng các cụm từ này khi bạn muốn hỏi về tiền boa hoặc đưa tiền boa tại nhà hàng ở Mỹ.",
  phrases: [
    {
      english: "Is the tip included?",
      vietnamese: "Tiền boa đã bao gồm chưa?",
      pronunciation: "iz the tip in-kloo-ded?"
    },
    {
      english: "How much should I tip?",
      vietnamese: "Tôi nên boa bao nhiêu?",
      pronunciation: "hau much shood ai tip?"
    },
    {
      english: "The service was great!",
      vietnamese: "Dịch vụ rất tốt!",
      pronunciation: "the sur-vis woz greit!"
    }
  ],
  drill: [
    {
      id: "L196C01",
      type: "read",
      prompt: "Is the tip included?",
      hint: "Tiền boa đã bao gồm chưa?",
      answer: "Is the tip included?"
    },
    {
      id: "L196C02",
      type: "recall",
      prompt: "Tiền boa đã bao gồm chưa?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is the tip included?"
    },
    {
      id: "L196C03",
      type: "read",
      prompt: "How much should I tip?",
      hint: "Tôi nên boa bao nhiêu?",
      answer: "How much should I tip?"
    },
    {
      id: "L196C04",
      type: "recall",
      prompt: "Tôi nên boa bao nhiêu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How much should I tip?"
    },
    {
      id: "L196C05",
      type: "read",
      prompt: "The service was great!",
      hint: "Dịch vụ rất tốt!",
      answer: "The service was great!"
    },
    {
      id: "L196C06",
      type: "recall",
      prompt: "Dịch vụ rất tốt!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "The service was great!"
    },
    {
      id: "L196C07",
      type: "fill",
      prompt: "Is the ___ included?",
      hint: "Tiền boa đã bao gồm chưa?",
      answer: "tip",
      answerHint: "Is the tip included?"
    },
    {
      id: "L196C08",
      type: "fill",
      prompt: "How much should I ___?",
      hint: "Tôi nên boa bao nhiêu?",
      answer: "tip",
      answerHint: "How much should I tip?"
    },
    {
      id: "L196C09",
      type: "fill",
      prompt: "The ___ was great!",
      hint: "Dịch vụ rất tốt!",
      answer: "service",
      answerHint: "The service was great!"
    },
    {
      id: "L196C10",
      type: "dialogue",
      prompt: "Worker: Is the tip included?\nCustomer: No, it is not.\nWorker: How much should I tip?",
      hint: "Thợ: Tiền boa đã bao gồm chưa?\nKhách: Chưa.\nThợ: Tôi nên boa bao nhiêu?",
      answer: "Worker: Is the tip included?\nCustomer: No, it is not.\nWorker: How much should I tip?"
    }
  ]
},
  {
  id: "L197",
  title: "Delicious Food and Recipes",
  titleVi: "Khen Ngợi Món Ăn và Hỏi Công Thức",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi bạn muốn khen ngợi món ăn và xin công thức.",
  phrases: [
    {
      english: "This is really delicious!",
      vietnamese: "Món này ngon quá!",
      pronunciation: "this iz ree-lee dee-li-shus"
    },
    {
      english: "What spice is in this?",
      vietnamese: "Món này có gia vị gì vậy?",
      pronunciation: "wot spice iz in this"
    },
    {
      english: "Can I get the recipe?",
      vietnamese: "Tôi có thể xin công thức được không?",
      pronunciation: "kan ai get the re-suh-pee"
    }
  ],
  drill: [
    {
      id: "L197C01",
      type: "read",
      prompt: "This is really delicious!",
      hint: "Món này ngon quá!",
      answer: "This is really delicious!"
    },
    {
      id: "L197C02",
      type: "recall",
      prompt: "Món này ngon quá!",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "This is really delicious!"
    },
    {
      id: "L197C03",
      type: "read",
      prompt: "What spice is in this?",
      hint: "Món này có gia vị gì vậy?",
      answer: "What spice is in this?"
    },
    {
      id: "L197C04",
      type: "recall",
      prompt: "Món này có gia vị gì vậy?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What spice is in this?"
    },
    {
      id: "L197C05",
      type: "read",
      prompt: "Can I get the recipe?",
      hint: "Tôi có thể xin công thức được không?",
      answer: "Can I get the recipe?"
    },
    {
      id: "L197C06",
      type: "recall",
      prompt: "Tôi có thể xin công thức được không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can I get the recipe?"
    },
    {
      id: "L197C07",
      type: "fill",
      prompt: "This is really ___!",
      hint: "Món này ngon quá!",
      answer: "delicious",
      answerHint: "This is really delicious!"
    },
    {
      id: "L197C08",
      type: "fill",
      prompt: "What ___ is in this?",
      hint: "Món này có gia vị gì vậy?",
      answer: "spice",
      answerHint: "What spice is in this?"
    },
    {
      id: "L197C09",
      type: "fill",
      prompt: "Can I get the ___?",
      hint: "Tôi có thể xin công thức được không?",
      answer: "recipe",
      answerHint: "Can I get the recipe?"
    },
    {
      id: "L197C10",
      type: "dialogue",
      prompt: "Worker: This is really delicious!\nCustomer: Thank you, I'm glad you like it.\nWorker: What spice is in this?",
      hint: "Thợ: Món này ngon quá!\nKhách: Cảm ơn bạn, tôi rất vui vì bạn thích nó.\nThợ: Món này có gia vị gì vậy?",
      answer: "Worker: This is really delicious!\nCustomer: Thank you, I'm glad you like it.\nWorker: What spice is in this?"
    }
  ]
}
  ]
};

export default data;
