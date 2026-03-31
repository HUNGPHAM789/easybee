import type { Class } from '../types';

const data: Class = {
  id: "bank-post-office",
  title: "Bank & Post Office",
  titleVi: "Ngân Hàng Và Bưu Điện",
  lessons: [
  {
  id: "L135",
  title: "Open a Checking Account",
  titleVi: "Mở tài khoản ngân hàng",
  level: "A2",
  context: "Sử dụng các mẫu câu này khi bạn muốn mở một tài khoản ngân hàng.",
  phrases: [
    {
      english: "I want to open a checking account.",
      vietnamese: "Tôi muốn mở một tài khoản séc.",
      pronunciation: "ai wawnt too oh-pun uh chek-ing uh-kownt"
    },
    {
      english: "What documents do I need?",
      vietnamese: "Tôi cần những giấy tờ gì?",
      pronunciation: "wot dok-yuh-ments doo ai need"
    },
    {
      english: "I have my ID and address.",
      vietnamese: "Tôi có chứng minh thư và địa chỉ.",
      pronunciation: "ai hav mai ai-dee and uh-dress"
    }
  ],
  drill: [
    {
      id: "L135C01",
      type: "read",
      prompt: "I want to open a checking account.",
      hint: "Tôi muốn mở một tài khoản séc.",
      answer: "I want to open a checking account."
    },
    {
      id: "L135C02",
      type: "recall",
      prompt: "Tôi muốn mở một tài khoản séc.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I want to open a checking account."
    },
    {
      id: "L135C03",
      type: "read",
      prompt: "What documents do I need?",
      hint: "Tôi cần những giấy tờ gì?",
      answer: "What documents do I need?"
    },
    {
      id: "L135C04",
      type: "recall",
      prompt: "Tôi cần những giấy tờ gì?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What documents do I need?"
    },
    {
      id: "L135C05",
      type: "read",
      prompt: "I have my ID and address.",
      hint: "Tôi có chứng minh thư và địa chỉ.",
      answer: "I have my ID and address."
    },
    {
      id: "L135C06",
      type: "recall",
      prompt: "Tôi có chứng minh thư và địa chỉ.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I have my ID and address."
    },
    {
      id: "L135C07",
      type: "fill",
      prompt: "I want to open a ___ account.",
      hint: "Tôi muốn mở một tài khoản séc.",
      answer: "checking",
      answerHint: "I want to open a checking account."
    },
    {
      id: "L135C08",
      type: "fill",
      prompt: "What ___ do I need?",
      hint: "Tôi cần những giấy tờ gì?",
      answer: "documents",
      answerHint: "What documents do I need?"
    },
    {
      id: "L135C09",
      type: "fill",
      prompt: "I have my ID and ___.",
      hint: "Tôi có chứng minh thư và địa chỉ.",
      answer: "address",
      answerHint: "I have my ID and address."
    },
    {
      id: "L135C10",
      type: "dialogue",
      prompt: "Worker: I can help you open an account. What kind?\nCustomer: I want to open a checking account.\nWorker: What documents do I need?",
      hint: "Nhân viên: Tôi có thể giúp bạn mở một tài khoản. Loại nào?\nKhách hàng: Tôi muốn mở một tài khoản séc.\nNhân viên: Tôi cần những giấy tờ gì?",
      answer: "Worker: I can help you open an account. What kind?\nCustomer: I want to open a checking account.\nWorker: What documents do I need?"
    }
  ]
},
  {
  id: "L136",
  title: "Bank: Deposit & Withdraw",
  titleVi: "Ngân hàng: Gửi và Rút tiền",
  level: "A1",
  context: "Sử dụng các cụm từ này khi bạn muốn gửi hoặc rút tiền tại ngân hàng.",
  phrases: [
    {
      english: "I want to deposit this check.",
      vietnamese: "Tôi muốn gửi cái séc này.",
      pronunciation: "ai wawnt too dee-pah-zit this chek"
    },
    {
      english: "I need to withdraw $200.",
      vietnamese: "Tôi cần rút 200 đô la.",
      pronunciation: "ai need too with-draw too hun-dred dah-lars"
    },
    {
      english: "Can I have a deposit slip?",
      vietnamese: "Cho tôi xin một phiếu gửi tiền được không?",
      pronunciation: "kan ai hav uh dee-pah-zit slip"
    }
  ],
  drill: [
    {
      id: "L136C01",
      type: "read",
      prompt: "I want to deposit this check.",
      hint: "Tôi muốn gửi cái séc này.",
      answer: "I want to deposit this check."
    },
    {
      id: "L136C02",
      type: "recall",
      prompt: "Tôi muốn gửi cái séc này.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I want to deposit this check."
    },
    {
      id: "L136C03",
      type: "read",
      prompt: "I need to withdraw $200.",
      hint: "Tôi cần rút 200 đô la.",
      answer: "I need to withdraw $200."
    },
    {
      id: "L136C04",
      type: "recall",
      prompt: "Tôi cần rút 200 đô la.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I need to withdraw $200."
    },
    {
      id: "L136C05",
      type: "read",
      prompt: "Can I have a deposit slip?",
      hint: "Cho tôi xin một phiếu gửi tiền được không?",
      answer: "Can I have a deposit slip?"
    },
    {
      id: "L136C06",
      type: "recall",
      prompt: "Cho tôi xin một phiếu gửi tiền được không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can I have a deposit slip?"
    },
    {
      id: "L136C07",
      type: "fill",
      prompt: "I want to ___ this check.",
      hint: "Tôi muốn gửi cái séc này.",
      answer: "deposit",
      answerHint: "I want to deposit this check."
    },
    {
      id: "L136C08",
      type: "fill",
      prompt: "I need to ___ $200.",
      hint: "Tôi cần rút 200 đô la.",
      answer: "withdraw",
      answerHint: "I need to withdraw $200."
    },
    {
      id: "L136C09",
      type: "fill",
      prompt: "Can I have a ___ slip?",
      hint: "Cho tôi xin một phiếu gửi tiền được không?",
      answer: "deposit",
      answerHint: "Can I have a deposit slip?"
    },
    {
      id: "L136C10",
      type: "dialogue",
      prompt: "Worker: Can I help you?\nCustomer: I want to deposit this check.\nWorker: Okay, do you have an account here?",
      hint: "Nhân viên: Tôi có thể giúp gì cho bạn?\nKhách hàng: Tôi muốn gửi cái séc này.\nNhân viên: Được rồi, bạn có tài khoản ở đây không?",
      answer: "Worker: Can I help you?\nCustomer: I want to deposit this check.\nWorker: Okay, do you have an account here?"
    }
  ]
},
  {
  id: "L137",
  title: "Fees and Interest",
  titleVi: "Phí và Lãi Suất",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn muốn hỏi về phí và lãi suất khi mua hàng trả góp hoặc vay tiền.",
  phrases: [
    {
      english: "Is there a monthly fee?",
      vietnamese: "Có phí hàng tháng không?",
      pronunciation: "iz ther uh munth-lee fee?"
    },
    {
      english: "What is the interest rate?",
      vietnamese: "Lãi suất là bao nhiêu?",
      pronunciation: "wot iz thuh in-trist rayt?"
    },
    {
      english: "Are there any extra fees?",
      vietnamese: "Có thêm phí nào không?",
      pronunciation: "ar ther eh-nee eks-truh feez?"
    }
  ],
  drill: [
    {
      id: "L137C01",
      type: "read",
      prompt: "Is there a monthly fee?",
      hint: "Có phí hàng tháng không?",
      answer: "Is there a monthly fee?"
    },
    {
      id: "L137C02",
      type: "recall",
      prompt: "Có phí hàng tháng không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is there a monthly fee?"
    },
    {
      id: "L137C03",
      type: "read",
      prompt: "What is the interest rate?",
      hint: "Lãi suất là bao nhiêu?",
      answer: "What is the interest rate?"
    },
    {
      id: "L137C04",
      type: "recall",
      prompt: "Lãi suất là bao nhiêu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What is the interest rate?"
    },
    {
      id: "L137C05",
      type: "read",
      prompt: "Are there any extra fees?",
      hint: "Có thêm phí nào không?",
      answer: "Are there any extra fees?"
    },
    {
      id: "L137C06",
      type: "recall",
      prompt: "Có thêm phí nào không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Are there any extra fees?"
    },
    {
      id: "L137C07",
      type: "fill",
      prompt: "Is there a ___ fee?",
      hint: "Có phí hàng tháng không?",
      answer: "monthly",
      answerHint: "Is there a monthly fee?"
    },
    {
      id: "L137C08",
      type: "fill",
      prompt: "What is the ___ rate?",
      hint: "Lãi suất là bao nhiêu?",
      answer: "interest",
      answerHint: "What is the interest rate?"
    },
    {
      id: "L137C09",
      type: "fill",
      prompt: "Are there any ___ fees?",
      hint: "Có thêm phí nào không?",
      answer: "extra",
      answerHint: "Are there any extra fees?"
    },
    {
      id: "L137C10",
      type: "dialogue",
      prompt: "Worker: What is the interest rate?\nCustomer: It's five percent.\nWorker: Are there any extra fees?",
      hint: "Thợ: Lãi suất là bao nhiêu?\nKhách: Là năm phần trăm.\nThợ: Có thêm phí nào không?",
      answer: "Worker: What is the interest rate?\nCustomer: It's five percent.\nWorker: Are there any extra fees?"
    }
  ]
},
  {
  id: "L138",
  title: "Report a Stolen Card",
  titleVi: "Báo Mất Thẻ",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn cần báo cáo thẻ tín dụng hoặc thẻ ngân hàng bị mất hoặc bị đánh cắp.",
  phrases: [
    {
      english: "My card was stolen.",
      vietnamese: "Thẻ của tôi bị đánh cắp.",
      pronunciation: "mai card wuhz sto-luhn"
    },
    {
      english: "I need to cancel it.",
      vietnamese: "Tôi cần hủy nó.",
      pronunciation: "ai need too kan-suhl it"
    },
    {
      english: "Please block my card.",
      vietnamese: "Làm ơn khóa thẻ của tôi.",
      pronunciation: "pleez blok mai card"
    }
  ],
  drill: [
    {
      id: "L138C01",
      type: "read",
      prompt: "My card was stolen.",
      hint: "Thẻ của tôi bị đánh cắp.",
      answer: "My card was stolen."
    },
    {
      id: "L138C02",
      type: "recall",
      prompt: "Thẻ của tôi bị đánh cắp.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "My card was stolen."
    },
    {
      id: "L138C03",
      type: "read",
      prompt: "I need to cancel it.",
      hint: "Tôi cần hủy nó.",
      answer: "I need to cancel it."
    },
    {
      id: "L138C04",
      type: "recall",
      prompt: "Tôi cần hủy nó.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I need to cancel it."
    },
    {
      id: "L138C05",
      type: "read",
      prompt: "Please block my card.",
      hint: "Làm ơn khóa thẻ của tôi.",
      answer: "Please block my card."
    },
    {
      id: "L138C06",
      type: "recall",
      prompt: "Làm ơn khóa thẻ của tôi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Please block my card."
    },
    {
      id: "L138C07",
      type: "fill",
      prompt: "My card was ___.",
      hint: "Thẻ của tôi bị đánh cắp.",
      answer: "stolen",
      answerHint: "My card was stolen."
    },
    {
      id: "L138C08",
      type: "fill",
      prompt: "I need to ___ it.",
      hint: "Tôi cần hủy nó.",
      answer: "cancel",
      answerHint: "I need to cancel it."
    },
    {
      id: "L138C09",
      type: "fill",
      prompt: "Please ___ my card.",
      hint: "Làm ơn khóa thẻ của tôi.",
      answer: "block",
      answerHint: "Please block my card."
    },
    {
      id: "L138C10",
      type: "dialogue",
      prompt: "Worker: What happened?\nCustomer: My card was stolen.\nWorker: Okay, I will block it.",
      hint: "Thợ: Chuyện gì đã xảy ra vậy?\nKhách: Thẻ của tôi bị đánh cắp.\nThợ: Được rồi, tôi sẽ khóa nó.",
      answer: "Worker: What happened?\nCustomer: My card was stolen.\nWorker: Okay, I will block it."
    }
  ]
},
  {
  id: "L139",
  title: "International Money Transfer Fees",
  titleVi: "Phí Chuyển Tiền Quốc Tế",
  level: "B1",
  context: "Sử dụng các cụm từ này khi bạn muốn hỏi về phí chuyển tiền quốc tế, đặc biệt là về Việt Nam.",
  phrases: [
    {
      english: "What are the transfer fees?",
      vietnamese: "Phí chuyển tiền là bao nhiêu?",
      pronunciation: "wot ar thuh trans-fur feez?"
    },
    {
      english: "Are there any hidden fees?",
      vietnamese: "Có phí ẩn nào không?",
      pronunciation: "ar ther en-ee hi-den feez?"
    },
    {
      english: "How much to wire Vietnam?",
      vietnamese: "Chuyển tiền về Việt Nam mất bao nhiêu?",
      pronunciation: "how much too wai-er vee-et-nam?"
    }
  ],
  drill: [
    {
      id: "L139C01",
      type: "read",
      prompt: "What are the transfer fees?",
      hint: "Phí chuyển tiền là bao nhiêu?",
      answer: "What are the transfer fees?"
    },
    {
      id: "L139C02",
      type: "recall",
      prompt: "Phí chuyển tiền là bao nhiêu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What are the transfer fees?"
    },
    {
      id: "L139C03",
      type: "read",
      prompt: "Are there any hidden fees?",
      hint: "Có phí ẩn nào không?",
      answer: "Are there any hidden fees?"
    },
    {
      id: "L139C04",
      type: "recall",
      prompt: "Có phí ẩn nào không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Are there any hidden fees?"
    },
    {
      id: "L139C05",
      type: "read",
      prompt: "How much to wire Vietnam?",
      hint: "Chuyển tiền về Việt Nam mất bao nhiêu?",
      answer: "How much to wire Vietnam?"
    },
    {
      id: "L139C06",
      type: "recall",
      prompt: "Chuyển tiền về Việt Nam mất bao nhiêu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How much to wire Vietnam?"
    },
    {
      id: "L139C07",
      type: "fill",
      prompt: "What are the ___ fees?",
      hint: "Phí chuyển tiền là bao nhiêu?",
      answer: "transfer",
      answerHint: "What are the transfer fees?"
    },
    {
      id: "L139C08",
      type: "fill",
      prompt: "Are there any ___ fees?",
      hint: "Có phí ẩn nào không?",
      answer: "hidden",
      answerHint: "Are there any hidden fees?"
    },
    {
      id: "L139C09",
      type: "fill",
      prompt: "How much to wire ___?",
      hint: "Chuyển tiền về Việt Nam mất bao nhiêu?",
      answer: "Vietnam",
      answerHint: "How much to wire Vietnam?"
    },
    {
      id: "L139C10",
      type: "dialogue",
      prompt: "Worker: What are the transfer fees to Vietnam?\nCustomer: I want to send $500.\nWorker: The fee is $20.",
      hint: "Thợ: Phí chuyển tiền về Việt Nam là bao nhiêu?\nKhách: Tôi muốn gửi 500 đô.\nThợ: Phí là 20 đô.",
      answer: "Worker: What are the transfer fees to Vietnam?\nCustomer: I want to send $500.\nWorker: The fee is $20."
    }
  ]
},
  {
  id: "L140",
  title: "Mailing a Package",
  titleVi: "Gửi một kiện hàng",
  level: "A1",
  context: "Sử dụng những mẫu câu này khi bạn muốn gửi một kiện hàng đến Việt Nam tại bưu điện.",
  phrases: [
    {
      english: "I want to send this.",
      vietnamese: "Tôi muốn gửi cái này.",
      pronunciation: "ai wont too send this"
    },
    {
      english: "To Vietnam, please.",
      vietnamese: "Đến Việt Nam, làm ơn.",
      pronunciation: "too vee-et-nam pleez"
    },
    {
      english: "How much for priority?",
      vietnamese: "Gửi nhanh thì bao nhiêu tiền?",
      pronunciation: "hao much for prai-or-i-tee"
    }
  ],
  drill: [
    {
      id: "L140C01",
      type: "read",
      prompt: "I want to send this.",
      hint: "Tôi muốn gửi cái này.",
      answer: "I want to send this."
    },
    {
      id: "L140C02",
      type: "recall",
      prompt: "Tôi muốn gửi cái này.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I want to send this."
    },
    {
      id: "L140C03",
      type: "read",
      prompt: "To Vietnam, please.",
      hint: "Đến Việt Nam, làm ơn.",
      answer: "To Vietnam, please."
    },
    {
      id: "L140C04",
      type: "recall",
      prompt: "Đến Việt Nam, làm ơn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "To Vietnam, please."
    },
    {
      id: "L140C05",
      type: "read",
      prompt: "How much for priority?",
      hint: "Gửi nhanh thì bao nhiêu tiền?",
      answer: "How much for priority?"
    },
    {
      id: "L140C06",
      type: "recall",
      prompt: "Gửi nhanh thì bao nhiêu tiền?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How much for priority?"
    },
    {
      id: "L140C07",
      type: "fill",
      prompt: "I want to send ___.",
      hint: "Tôi muốn gửi cái này.",
      answer: "this",
      answerHint: "I want to send this."
    },
    {
      id: "L140C08",
      type: "fill",
      prompt: "To ___, please.",
      hint: "Đến Việt Nam, làm ơn.",
      answer: "Vietnam",
      answerHint: "To Vietnam, please."
    },
    {
      id: "L140C09",
      type: "fill",
      prompt: "How much for ___?",
      hint: "Gửi nhanh thì bao nhiêu tiền?",
      answer: "priority",
      answerHint: "How much for priority?"
    },
    {
      id: "L140C10",
      type: "dialogue",
      prompt: "Worker: I want to send this.\nCustomer: To Vietnam, please.\nWorker: How much for priority?",
      hint: "Thợ: Tôi muốn gửi cái này.\nKhách: Đến Việt Nam, làm ơn.\nThợ: Gửi nhanh thì bao nhiêu tiền?",
      answer: "Worker: I want to send this.\nCustomer: To Vietnam, please.\nWorker: How much for priority?"
    }
  ]
},
  {
  id: "L141",
  title: "Buying Stamps & Mailing",
  titleVi: "Mua Tem và Gửi Thư",
  level: "A1",
  context: "Sử dụng những mẫu câu này khi bạn cần mua tem và gửi thư ở bưu điện.",
  phrases: [
    {
      english: "I need ten stamps, please.",
      vietnamese: "Tôi cần mười con tem, làm ơn.",
      pronunciation: "ai need ten stamps pleez"
    },
    {
      english: "Where is the mailbox?",
      vietnamese: "Hộp thư ở đâu?",
      pronunciation: "wer iz the mail-boks"
    },
    {
      english: "How much to mail this?",
      vietnamese: "Gửi cái này hết bao nhiêu?",
      pronunciation: "hau much too mail this"
    }
  ],
  drill: [
    {
      id: "L141C01",
      type: "read",
      prompt: "I need ten stamps, please.",
      hint: "Tôi cần mười con tem, làm ơn.",
      answer: "I need ten stamps, please."
    },
    {
      id: "L141C02",
      type: "recall",
      prompt: "Tôi cần mười con tem, làm ơn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I need ten stamps, please."
    },
    {
      id: "L141C03",
      type: "read",
      prompt: "Where is the mailbox?",
      hint: "Hộp thư ở đâu?",
      answer: "Where is the mailbox?"
    },
    {
      id: "L141C04",
      type: "recall",
      prompt: "Hộp thư ở đâu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Where is the mailbox?"
    },
    {
      id: "L141C05",
      type: "read",
      prompt: "How much to mail this?",
      hint: "Gửi cái này hết bao nhiêu?",
      answer: "How much to mail this?"
    },
    {
      id: "L141C06",
      type: "recall",
      prompt: "Gửi cái này hết bao nhiêu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How much to mail this?"
    },
    {
      id: "L141C07",
      type: "fill",
      prompt: "I need ten ___, please.",
      hint: "Tôi cần mười con tem, làm ơn.",
      answer: "stamps",
      answerHint: "I need ten stamps, please."
    },
    {
      id: "L141C08",
      type: "fill",
      prompt: "Where is the ___?",
      hint: "Hộp thư ở đâu?",
      answer: "mailbox",
      answerHint: "Where is the mailbox?"
    },
    {
      id: "L141C09",
      type: "fill",
      prompt: "How much to ___ this?",
      hint: "Gửi cái này hết bao nhiêu?",
      answer: "mail",
      answerHint: "How much to mail this?"
    },
    {
      id: "L141C10",
      type: "dialogue",
      prompt: "Worker: How can I help you?\nCustomer: I need ten stamps, please.\nWorker: Okay, here you go.",
      hint: "Thợ: Tôi có thể giúp gì cho bạn?\nKhách: Tôi cần mười con tem, làm ơn.\nThợ: Được rồi, của bạn đây.",
      answer: "Worker: How can I help you?\nCustomer: I need ten stamps, please.\nWorker: Okay, here you go."
    }
  ]
},
  {
  id: "L142",
  title: "Where is my package?",
  titleVi: "Kiện hàng của tôi đâu?",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn muốn hỏi về kiện hàng của mình, đặc biệt khi nó báo là đã giao nhưng bạn không nhận được.",
  phrases: [
    {
      english: "Where is my package?",
      vietnamese: "Kiện hàng của tôi ở đâu?",
      pronunciation: "wer iz mai pa-kij?"
    },
    {
      english: "It says 'delivered,' but I didn't get it.",
      vietnamese: "Nó báo 'đã giao' nhưng tôi không nhận được.",
      pronunciation: "it sez di-li-verd, but ai di-dent get it."
    },
    {
      english: "Can you check the tracking?",
      vietnamese: "Bạn có thể kiểm tra mã vận chuyển được không?",
      pronunciation: "kan yoo chek the tra-king?"
    }
  ],
  drill: [
    {
      id: "L142C01",
      type: "read",
      prompt: "Where is my package?",
      hint: "Kiện hàng của tôi ở đâu?",
      answer: "Where is my package?"
    },
    {
      id: "L142C02",
      type: "recall",
      prompt: "Kiện hàng của tôi ở đâu?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Where is my package?"
    },
    {
      id: "L142C03",
      type: "read",
      prompt: "It says 'delivered,' but I didn't get it.",
      hint: "Nó báo 'đã giao' nhưng tôi không nhận được.",
      answer: "It says 'delivered,' but I didn't get it."
    },
    {
      id: "L142C04",
      type: "recall",
      prompt: "Nó báo 'đã giao' nhưng tôi không nhận được.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It says 'delivered,' but I didn't get it."
    },
    {
      id: "L142C05",
      type: "read",
      prompt: "Can you check the tracking?",
      hint: "Bạn có thể kiểm tra mã vận chuyển được không?",
      answer: "Can you check the tracking?"
    },
    {
      id: "L142C06",
      type: "recall",
      prompt: "Bạn có thể kiểm tra mã vận chuyển được không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can you check the tracking?"
    },
    {
      id: "L142C07",
      type: "fill",
      prompt: "Where is my ___?",
      hint: "Kiện hàng của tôi ở đâu?",
      answer: "package",
      answerHint: "Where is my package?"
    },
    {
      id: "L142C08",
      type: "fill",
      prompt: "It says 'delivered,' but I didn't ___ it.",
      hint: "Nó báo 'đã giao' nhưng tôi không nhận được.",
      answer: "get",
      answerHint: "It says 'delivered,' but I didn't get it."
    },
    {
      id: "L142C09",
      type: "fill",
      prompt: "Can you check the ___?",
      hint: "Bạn có thể kiểm tra mã vận chuyển được không?",
      answer: "tracking",
      answerHint: "Can you check the tracking?"
    },
    {
      id: "L142C10",
      type: "dialogue",
      prompt: "Worker: Where is my package?\nCustomer: Let me check. What's your tracking number?\nWorker: It's 1234567890.",
      hint: "Thợ: Kiện hàng của tôi ở đâu?\nKhách: Để tôi kiểm tra. Số vận chuyển của bạn là gì?\nThợ: Là 1234567890.",
      answer: "Worker: Where is my package?\nCustomer: Let me check. What's your tracking number?\nWorker: It's 1234567890."
    }
  ]
},
  {
  id: "L143",
  title: "Bank Statement Questions",
  titleVi: "Hỏi về sao kê ngân hàng",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi bạn thấy một khoản phí lạ trên sao kê ngân hàng của mình và muốn hỏi ngân hàng.",
  phrases: [
    {
      english: "What is this charge?",
      vietnamese: "Khoản phí này là gì?",
      pronunciation: "wuht iz this chahrj?"
    },
    {
      english: "I didn't authorize this.",
      vietnamese: "Tôi không cho phép khoản này.",
      pronunciation: "ai di-dent aw-thuh-raiz this."
    },
    {
      english: "Can you investigate this?",
      vietnamese: "Bạn có thể điều tra việc này không?",
      pronunciation: "kan yoo in-ves-tuh-gate this?"
    }
  ],
  drill: [
    {
      id: "L143C01",
      type: "read",
      prompt: "What is this charge?",
      hint: "Khoản phí này là gì?",
      answer: "What is this charge?"
    },
    {
      id: "L143C02",
      type: "recall",
      prompt: "Khoản phí này là gì?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What is this charge?"
    },
    {
      id: "L143C03",
      type: "read",
      prompt: "I didn't authorize this.",
      hint: "Tôi không cho phép khoản này.",
      answer: "I didn't authorize this."
    },
    {
      id: "L143C04",
      type: "recall",
      prompt: "Tôi không cho phép khoản này.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I didn't authorize this."
    },
    {
      id: "L143C05",
      type: "read",
      prompt: "Can you investigate this?",
      hint: "Bạn có thể điều tra việc này không?",
      answer: "Can you investigate this?"
    },
    {
      id: "L143C06",
      type: "recall",
      prompt: "Bạn có thể điều tra việc này không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Can you investigate this?"
    },
    {
      id: "L143C07",
      type: "fill",
      prompt: "What is this ___?",
      hint: "Khoản phí này là gì?",
      answer: "charge",
      answerHint: "What is this charge?"
    },
    {
      id: "L143C08",
      type: "fill",
      prompt: "I didn't ___ this.",
      hint: "Tôi không cho phép khoản này.",
      answer: "authorize",
      answerHint: "I didn't authorize this."
    },
    {
      id: "L143C09",
      type: "fill",
      prompt: "Can you ___ this?",
      hint: "Bạn có thể điều tra việc này không?",
      answer: "investigate",
      answerHint: "Can you investigate this?"
    },
    {
      id: "L143C10",
      type: "dialogue",
      prompt: "Worker: What is this charge?\nCustomer: It's for $50 to \"Online Games\".\nWorker: I didn't authorize this.",
      hint: "Thợ: Khoản phí này là gì?\nKhách: Nó là 50 đô la cho \"Trò chơi trực tuyến\".\nThợ: Tôi không cho phép khoản này.",
      answer: "Worker: What is this charge?\nCustomer: It's for $50 to \"Online Games\".\nWorker: I didn't authorize this."
    }
  ]
}
  ]
};

export default data;
