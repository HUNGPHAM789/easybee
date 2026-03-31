import type { Class } from '../types';

const pricingBusiness: Class = {
  id: "pmu-pricing-business",
  title: "Pricing & Business",
  titleVi: "Giá Cả Và Kinh Doanh",
  lessons: [
  {
  id: "L91",
  title: "Stating Prices",
  titleVi: "Nói Giá Dịch Vụ",
  level: "A1",
  context: "Dùng những mẫu câu này khi bạn muốn nói giá của các dịch vụ làm đẹp cho khách hàng.",
  phrases: [
    {
      english: "Microblading is 350 dollars.",
      vietnamese: "Điêu khắc chân mày là 350 đô la.",
      pronunciation: "mai-kroh-blay-ding iz three hun-dred fif-tee dol-urz"
    },
    {
      english: "Lip blush is 400 dollars.",
      vietnamese: "Phun môi là 400 đô la.",
      pronunciation: "lip blush iz for hun-dred dol-urz"
    },
    {
      english: "Touch-up is 150 dollars.",
      vietnamese: "Dặm lại là 150 đô la.",
      pronunciation: "tuhch-uhp iz wuhn hun-dred fif-tee dol-urz"
    }
  ],
  drill: [
    {
      id: "L91C01",
      type: "read",
      prompt: "Microblading is 350 dollars.",
      hint: "Điêu khắc chân mày là 350 đô la.",
      answer: "Microblading is 350 dollars."
    },
    {
      id: "L91C02",
      type: "recall",
      prompt: "Điêu khắc chân mày là 350 đô la.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Microblading is 350 dollars."
    },
    {
      id: "L91C03",
      type: "read",
      prompt: "Lip blush is 400 dollars.",
      hint: "Phun môi là 400 đô la.",
      answer: "Lip blush is 400 dollars."
    },
    {
      id: "L91C04",
      type: "recall",
      prompt: "Phun môi là 400 đô la.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Lip blush is 400 dollars."
    },
    {
      id: "L91C05",
      type: "read",
      prompt: "Touch-up is 150 dollars.",
      hint: "Dặm lại là 150 đô la.",
      answer: "Touch-up is 150 dollars."
    },
    {
      id: "L91C06",
      type: "recall",
      prompt: "Dặm lại là 150 đô la.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Touch-up is 150 dollars."
    },
    {
      id: "L91C07",
      type: "fill",
      prompt: "___ is 350 dollars.",
      hint: "Điêu khắc chân mày là 350 đô la.",
      answer: "Microblading",
      answerHint: "Microblading is 350 dollars."
    },
    {
      id: "L91C08",
      type: "fill",
      prompt: "Lip ___ is 400 dollars.",
      hint: "Phun môi là 400 đô la.",
      answer: "blush",
      answerHint: "Lip blush is 400 dollars."
    },
    {
      id: "L91C09",
      type: "fill",
      prompt: "Touch-___ is 150 dollars.",
      hint: "Dặm lại là 150 đô la.",
      answer: "up",
      answerHint: "Touch-up is 150 dollars."
    },
    {
      id: "L91C10",
      type: "dialogue",
      prompt: "Worker: Microblading is 350 dollars.\nCustomer: Okay, thank you.\nWorker: You're welcome.",
      hint: "Thợ: Điêu khắc chân mày là 350 đô la.\nKhách: Được rồi, cảm ơn bạn.\nThợ: Không có gì.",
      answer: "Worker: Microblading is 350 dollars.\nCustomer: Okay, thank you.\nWorker: You're welcome."
    }
  ]
},
  {
  id: "L92",
  title: "PMU: Deposit and Booking",
  titleVi: "Đặt cọc và Lịch hẹn PMU",
  level: "A1",
  context: "Sử dụng những mẫu câu này khi bạn cần đặt cọc để giữ lịch hẹn phun xăm thẩm mỹ (PMU).",
  phrases: [
    {
      english: "I need a deposit.",
      vietnamese: "Tôi cần tiền đặt cọc.",
      pronunciation: "ai need uh dee-pah-zit"
    },
    {
      english: "How much is the deposit?",
      vietnamese: "Tiền đặt cọc là bao nhiêu?",
      pronunciation: "hau much iz thuh dee-pah-zit"
    },
    {
      english: "It's 50 dollars to book.",
      vietnamese: "Để đặt lịch là 50 đô la.",
      pronunciation: "its fif-tee dah-lerz tuh buk"
    }
  ],
  drill: [
    {
      id: "L92C01",
      type: "read",
      prompt: "I need a deposit.",
      hint: "Tôi cần tiền đặt cọc.",
      answer: "I need a deposit."
    },
    {
      id: "L92C02",
      type: "recall",
      prompt: "Tôi cần tiền đặt cọc.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I need a deposit."
    },
    {
      id: "L92C03",
      type: "read",
      prompt: "How much is the deposit?",
      hint: "Tiền đặt cọc là bao nhiêu?",
      answer: "How much is the deposit?"
    },
    {
      id: "L92C04",
      type: "recall",
      prompt: "Tiền đặt cọc là bao nhiêu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How much is the deposit?"
    },
    {
      id: "L92C05",
      type: "read",
      prompt: "It's 50 dollars to book.",
      hint: "Để đặt lịch là 50 đô la.",
      answer: "It's 50 dollars to book."
    },
    {
      id: "L92C06",
      type: "recall",
      prompt: "Để đặt lịch là 50 đô la.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It's 50 dollars to book."
    },
    {
      id: "L92C07",
      type: "fill",
      prompt: "I need a ___.",
      hint: "Tôi cần tiền đặt cọc.",
      answer: "deposit",
      answerHint: "I need a deposit."
    },
    {
      id: "L92C08",
      type: "fill",
      prompt: "How much is the ___?",
      hint: "Tiền đặt cọc là bao nhiêu?",
      answer: "deposit",
      answerHint: "How much is the deposit?"
    },
    {
      id: "L92C09",
      type: "fill",
      prompt: "It's 50 dollars to ___.",
      hint: "Để đặt lịch là 50 đô la.",
      answer: "book",
      answerHint: "It's 50 dollars to book."
    },
    {
      id: "L92C10",
      type: "dialogue",
      prompt: "Worker: I need a deposit to book.\nCustomer: How much is the deposit?\nWorker: It's 50 dollars.",
      hint: "Thợ: Tôi cần tiền đặt cọc để đặt lịch.\nKhách: Tiền đặt cọc là bao nhiêu?\nThợ: Là 50 đô la.",
      answer: "Worker: I need a deposit to book.\nCustomer: How much is the deposit?\nWorker: It's 50 dollars."
    }
  ]
},
  {
  id: "L93",
  title: "Touch-up Pricing",
  titleVi: "Giá dặm lại",
  level: "A2",
  context: "Khi bạn cần giải thích giá cho khách hàng muốn dặm lại (touch-up) sau khi làm mày, môi, mí mắt vĩnh viễn.",
  phrases: [
    {
      english: "Touch-up is $100.",
      vietnamese: "Dặm lại là 100 đô.",
      pronunciation: "tuhch-uhp iz wuhn hun-dred dol-luhz"
    },
    {
      english: "Within eight weeks.",
      vietnamese: "Trong vòng tám tuần.",
      pronunciation: "wi-thin eyt weeks"
    },
    {
      english: "After eight weeks, it's full price.",
      vietnamese: "Sau tám tuần, giá đầy đủ.",
      pronunciation: "af-tuh eyt weeks, its fool prais"
    }
  ],
  drill: [
    {
      id: "L93C01",
      type: "read",
      prompt: "Touch-up is $100.",
      hint: "Dặm lại là 100 đô.",
      answer: "Touch-up is $100."
    },
    {
      id: "L93C02",
      type: "recall",
      prompt: "Dặm lại là 100 đô.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Touch-up is $100."
    },
    {
      id: "L93C03",
      type: "read",
      prompt: "Within eight weeks.",
      hint: "Trong vòng tám tuần.",
      answer: "Within eight weeks."
    },
    {
      id: "L93C04",
      type: "recall",
      prompt: "Trong vòng tám tuần.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Within eight weeks."
    },
    {
      id: "L93C05",
      type: "read",
      prompt: "After eight weeks, it's full price.",
      hint: "Sau tám tuần, giá đầy đủ.",
      answer: "After eight weeks, it's full price."
    },
    {
      id: "L93C06",
      type: "recall",
      prompt: "Sau tám tuần, giá đầy đủ.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "After eight weeks, it's full price."
    },
    {
      id: "L93C07",
      type: "fill",
      prompt: "Touch-up is $___.",
      hint: "Dặm lại là 100 đô.",
      answer: "100",
      answerHint: "Touch-up is $100."
    },
    {
      id: "L93C08",
      type: "fill",
      prompt: "___ eight weeks.",
      hint: "Trong vòng tám tuần.",
      answer: "Within",
      answerHint: "Within eight weeks."
    },
    {
      id: "L93C09",
      type: "fill",
      prompt: "After eight weeks, it's full ___.",
      hint: "Sau tám tuần, giá đầy đủ.",
      answer: "price",
      answerHint: "After eight weeks, it's full price."
    },
    {
      id: "L93C10",
      type: "dialogue",
      prompt: "Worker: The touch-up is $100.\nCustomer: Okay, how long is that for?\nWorker: Within eight weeks.",
      hint: "Thợ: Dặm lại là 100 đô.\nKhách: Được rồi, giá đó áp dụng trong bao lâu?\nThợ: Trong vòng tám tuần.",
      answer: "Worker: The touch-up is $100.\nCustomer: Okay, how long is that for?\nWorker: Within eight weeks."
    }
  ]
},
  {
  id: "L94",
  title: "Cancel Appointment: Makeup",
  titleVi: "Hủy Hẹn: Trang Điểm Vĩnh Viễn",
  level: "A2",
  context: "Sử dụng các cụm từ này khi bạn cần nói về việc hủy một cuộc hẹn trang điểm vĩnh viễn.",
  phrases: [
    {
      english: "I need to cancel.",
      vietnamese: "Tôi cần hủy hẹn.",
      pronunciation: "ai need too kan-sul"
    },
    {
      english: "48 hours notice, please.",
      vietnamese: "Xin báo trước 48 tiếng.",
      pronunciation: "for-tee ayt au-ers no-tis, pleez"
    },
    {
      english: "Is there a fee?",
      vietnamese: "Có mất phí không?",
      pronunciation: "iz ther a fee"
    }
  ],
  drill: [
    {
      id: "L94C01",
      type: "read",
      prompt: "I need to cancel.",
      hint: "Tôi cần hủy hẹn.",
      answer: "I need to cancel."
    },
    {
      id: "L94C02",
      type: "recall",
      prompt: "Tôi cần hủy hẹn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I need to cancel."
    },
    {
      id: "L94C03",
      type: "read",
      prompt: "48 hours notice, please.",
      hint: "Xin báo trước 48 tiếng.",
      answer: "48 hours notice, please."
    },
    {
      id: "L94C04",
      type: "recall",
      prompt: "Xin báo trước 48 tiếng.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "48 hours notice, please."
    },
    {
      id: "L94C05",
      type: "read",
      prompt: "Is there a fee?",
      hint: "Có mất phí không?",
      answer: "Is there a fee?"
    },
    {
      id: "L94C06",
      type: "recall",
      prompt: "Có mất phí không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is there a fee?"
    },
    {
      id: "L94C07",
      type: "fill",
      prompt: "I need to ___.",
      hint: "Tôi cần hủy hẹn.",
      answer: "cancel",
      answerHint: "I need to cancel."
    },
    {
      id: "L94C08",
      type: "fill",
      prompt: "48 ___ notice, please.",
      hint: "Xin báo trước 48 tiếng.",
      answer: "hours",
      answerHint: "48 hours notice, please."
    },
    {
      id: "L94C09",
      type: "fill",
      prompt: "Is there a ___?",
      hint: "Có mất phí không?",
      answer: "fee",
      answerHint: "Is there a fee?"
    },
    {
      id: "L94C10",
      type: "dialogue",
      prompt: "Worker: I need to cancel my appointment.\nCustomer: Okay. Is it 48 hours before your appointment?\nWorker: Yes, it is.",
      hint: "Thợ: Tôi cần hủy cuộc hẹn của tôi.\nKhách: Được rồi. Có phải là 48 tiếng trước cuộc hẹn của bạn không?\nThợ: Vâng, đúng vậy.",
      answer: "Worker: I need to cancel my appointment.\nCustomer: Okay. Is it 48 hours before your appointment?\nWorker: Yes, it is."
    }
  ]
},
  {
  id: "L95",
  title: "Price Negotiation: PMU",
  titleVi: "Thương Lượng Giá: Phun Xăm",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi khách hàng muốn bạn giảm giá dịch vụ phun xăm thẩm mỹ.",
  phrases: [
    {
      english: "My prices are firm.",
      vietnamese: "Giá của tôi là giá cố định.",
      pronunciation: "mai prai-sez ar furm"
    },
    {
      english: "I use high-quality products.",
      vietnamese: "Tôi sử dụng sản phẩm chất lượng cao.",
      pronunciation: "ai yooz hai kwol-i-tee prah-duhkts"
    },
    {
      english: "This price reflects my experience.",
      vietnamese: "Giá này phản ánh kinh nghiệm của tôi.",
      pronunciation: "this prais ri-flekts mai eks-peer-ee-uhns"
    }
  ],
  drill: [
    {
      id: "L95C01",
      type: "read",
      prompt: "My prices are firm.",
      hint: "Giá của tôi là giá cố định.",
      answer: "My prices are firm."
    },
    {
      id: "L95C02",
      type: "recall",
      prompt: "Giá của tôi là giá cố định.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "My prices are firm."
    },
    {
      id: "L95C03",
      type: "read",
      prompt: "I use high-quality products.",
      hint: "Tôi sử dụng sản phẩm chất lượng cao.",
      answer: "I use high-quality products."
    },
    {
      id: "L95C04",
      type: "recall",
      prompt: "Tôi sử dụng sản phẩm chất lượng cao.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I use high-quality products."
    },
    {
      id: "L95C05",
      type: "read",
      prompt: "This price reflects my experience.",
      hint: "Giá này phản ánh kinh nghiệm của tôi.",
      answer: "This price reflects my experience."
    },
    {
      id: "L95C06",
      type: "recall",
      prompt: "Giá này phản ánh kinh nghiệm của tôi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "This price reflects my experience."
    },
    {
      id: "L95C07",
      type: "fill",
      prompt: "My prices are ___.",
      hint: "Giá của tôi là giá cố định.",
      answer: "firm",
      answerHint: "My prices are firm."
    },
    {
      id: "L95C08",
      type: "fill",
      prompt: "I use high-quality ___.",
      hint: "Tôi sử dụng sản phẩm chất lượng cao.",
      answer: "products",
      answerHint: "I use high-quality products."
    },
    {
      id: "L95C09",
      type: "fill",
      prompt: "This price reflects my ___.",
      hint: "Giá này phản ánh kinh nghiệm của tôi.",
      answer: "experience",
      answerHint: "This price reflects my experience."
    },
    {
      id: "L95C10",
      type: "dialogue",
      prompt: "Worker: Is the price okay for you?\nCustomer: It's a little expensive. Can you lower it?\nWorker: I'm sorry, my prices are firm.",
      hint: "Thợ: Giá này có ổn không?\nKhách: Hơi đắt. Bạn có thể giảm giá không?\nThợ: Xin lỗi, giá của tôi là giá cố định.",
      answer: "Worker: Is the price okay for you?\nCustomer: It's a little expensive. Can you lower it?\nWorker: I'm sorry, my prices are firm."
    }
  ]
},
  {
  id: "L96",
  title: "Permanent Makeup Costs",
  titleVi: "Chi Phí Trang Điểm Vĩnh Viễn",
  level: "B1",
  context: "Sử dụng những cụm từ này khi giải thích chi phí và sự an toàn của trang điểm vĩnh viễn cho khách hàng.",
  phrases: [
    {
      english: "Quality costs more for safety.",
      vietnamese: "Chất lượng tốt tốn kém hơn vì sự an toàn.",
      pronunciation: "kwol-i-tee costs more for safe-tee"
    },
    {
      english: "We use certified, safe pigments.",
      vietnamese: "Chúng tôi sử dụng các loại mực được chứng nhận, an toàn.",
      pronunciation: "wee yoos ser-ti-fied, safe pig-ments"
    },
    {
      english: "This ensures long-lasting results.",
      vietnamese: "Điều này đảm bảo kết quả lâu dài.",
      pronunciation: "this en-shores long-last-ing ree-zul-ts"
    }
  ],
  drill: [
    {
      id: "L96C01",
      type: "read",
      prompt: "Quality costs more for safety.",
      hint: "Chất lượng tốt tốn kém hơn vì sự an toàn.",
      answer: "Quality costs more for safety."
    },
    {
      id: "L96C02",
      type: "recall",
      prompt: "Chất lượng tốt tốn kém hơn vì sự an toàn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Quality costs more for safety."
    },
    {
      id: "L96C03",
      type: "read",
      prompt: "We use certified, safe pigments.",
      hint: "Chúng tôi sử dụng các loại mực được chứng nhận, an toàn.",
      answer: "We use certified, safe pigments."
    },
    {
      id: "L96C04",
      type: "recall",
      prompt: "Chúng tôi sử dụng các loại mực được chứng nhận, an toàn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "We use certified, safe pigments."
    },
    {
      id: "L96C05",
      type: "read",
      prompt: "This ensures long-lasting results.",
      hint: "Điều này đảm bảo kết quả lâu dài.",
      answer: "This ensures long-lasting results."
    },
    {
      id: "L96C06",
      type: "recall",
      prompt: "Điều này đảm bảo kết quả lâu dài.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "This ensures long-lasting results."
    },
    {
      id: "L96C07",
      type: "fill",
      prompt: "Quality costs more for ___.",
      hint: "Chất lượng tốt tốn kém hơn vì sự an toàn.",
      answer: "safety",
      answerHint: "Quality costs more for safety."
    },
    {
      id: "L96C08",
      type: "fill",
      prompt: "We use ___, safe pigments.",
      hint: "Chúng tôi sử dụng các loại mực được chứng nhận, an toàn.",
      answer: "certified",
      answerHint: "We use certified, safe pigments."
    },
    {
      id: "L96C09",
      type: "fill",
      prompt: "This ensures long-lasting ___.",
      hint: "Điều này đảm bảo kết quả lâu dài.",
      answer: "results",
      answerHint: "This ensures long-lasting results."
    },
    {
      id: "L96C10",
      type: "dialogue",
      prompt: "Worker: Why is your price higher?\nCustomer: Other places are cheaper.\nWorker: Quality costs more for safety.",
      hint: "Thợ: Tại sao giá của bạn cao hơn?\nKhách: Những nơi khác rẻ hơn.\nThợ: Chất lượng tốt tốn kém hơn vì sự an toàn.",
      answer: "Worker: Why is your price higher?\nCustomer: Other places are cheaper.\nWorker: Quality costs more for safety."
    }
  ]
}
  ]
};

export default pricingBusiness;
