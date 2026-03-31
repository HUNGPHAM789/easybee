import type { Class } from '../types';

const aftercare: Class = {
  id: "pmu-aftercare",
  title: "Aftercare Instructions",
  titleVi: "Hướng Dẫn Chăm Sóc Sau Phun",
  lessons: [
  {
  id: "L82",
  title: "PMU Aftercare: Basic Rules",
  titleVi: "Chăm Sóc Sau PMU: Quy Tắc Cơ Bản",
  level: "A1",
  context: "Những câu này giúp bạn hướng dẫn khách hàng cách chăm sóc sau khi làm PMU (phun xăm thẩm mỹ).",
  phrases: [
    {
      english: "Don't touch it.",
      vietnamese: "Đừng chạm vào.",
      pronunciation: "dont tuch it"
    },
    {
      english: "Don't get it wet.",
      vietnamese: "Đừng để nó bị ướt.",
      pronunciation: "dont get it wet"
    },
    {
      english: "Don't pick at scabs.",
      vietnamese: "Đừng cạy vảy.",
      pronunciation: "dont pik at skabs"
    }
  ],
  drill: [
    {
      id: "L82C01",
      type: "read",
      prompt: "Don't touch it.",
      hint: "Đừng chạm vào.",
      answer: "Don't touch it."
    },
    {
      id: "L82C02",
      type: "recall",
      prompt: "Đừng chạm vào.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Don't touch it."
    },
    {
      id: "L82C03",
      type: "read",
      prompt: "Don't get it wet.",
      hint: "Đừng để nó bị ướt.",
      answer: "Don't get it wet."
    },
    {
      id: "L82C04",
      type: "recall",
      prompt: "Đừng để nó bị ướt.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Don't get it wet."
    },
    {
      id: "L82C05",
      type: "read",
      prompt: "Don't pick at scabs.",
      hint: "Đừng cạy vảy.",
      answer: "Don't pick at scabs."
    },
    {
      id: "L82C06",
      type: "recall",
      prompt: "Đừng cạy vảy.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Don't pick at scabs."
    },
    {
      id: "L82C07",
      type: "fill",
      prompt: "Don't ___ it.",
      hint: "Đừng chạm vào.",
      answer: "touch",
      answerHint: "Don't touch it."
    },
    {
      id: "L82C08",
      type: "fill",
      prompt: "Don't get it ___.",
      hint: "Đừng để nó bị ướt.",
      answer: "wet",
      answerHint: "Don't get it wet."
    },
    {
      id: "L82C09",
      type: "fill",
      prompt: "Don't pick at ___.",
      hint: "Đừng cạy vảy.",
      answer: "scabs",
      answerHint: "Don't pick at scabs."
    },
    {
      id: "L82C10",
      type: "dialogue",
      prompt: "Worker: Remember, don't touch it.\nCustomer: Okay.\nWorker: And don't pick at scabs.",
      hint: "Thợ: Nhớ là đừng chạm vào.\nKhách: Vâng.\nThợ: Và đừng cạy vảy.",
      answer: "Worker: Remember, don't touch it.\nCustomer: Okay.\nWorker: And don't pick at scabs."
    }
  ]
},
  {
  id: "L83",
  title: "Permanent Makeup: Color",
  titleVi: "Trang điểm vĩnh viễn: Màu sắc",
  level: "A1",
  context: "Sử dụng những mẫu câu này để giải thích cho khách hàng về sự thay đổi màu sắc sau khi làm trang điểm vĩnh viễn.",
  phrases: [
    {
      english: "It looks dark at first.",
      vietnamese: "Lúc đầu nó trông đậm.",
      pronunciation: "it luks dark at furst"
    },
    {
      english: "The color will fade.",
      vietnamese: "Màu sẽ nhạt đi.",
      pronunciation: "thuh kuh-ler wil fayd"
    },
    {
      english: "It fades about forty percent.",
      vietnamese: "Nó nhạt đi khoảng bốn mươi phần trăm.",
      pronunciation: "it fayds uh-bout for-tee per-sent"
    }
  ],
  drill: [
    {
      id: "L83C01",
      type: "read",
      prompt: "It looks dark at first.",
      hint: "Lúc đầu nó trông đậm.",
      answer: "It looks dark at first."
    },
    {
      id: "L83C02",
      type: "recall",
      prompt: "Lúc đầu nó trông đậm.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It looks dark at first."
    },
    {
      id: "L83C03",
      type: "read",
      prompt: "The color will fade.",
      hint: "Màu sẽ nhạt đi.",
      answer: "The color will fade."
    },
    {
      id: "L83C04",
      type: "recall",
      prompt: "Màu sẽ nhạt đi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "The color will fade."
    },
    {
      id: "L83C05",
      type: "read",
      prompt: "It fades about forty percent.",
      hint: "Nó nhạt đi khoảng bốn mươi phần trăm.",
      answer: "It fades about forty percent."
    },
    {
      id: "L83C06",
      type: "recall",
      prompt: "Nó nhạt đi khoảng bốn mươi phần trăm.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It fades about forty percent."
    },
    {
      id: "L83C07",
      type: "fill",
      prompt: "It looks ___ at first.",
      hint: "Lúc đầu nó trông đậm.",
      answer: "dark",
      answerHint: "It looks dark at first."
    },
    {
      id: "L83C08",
      type: "fill",
      prompt: "The color will ___.",
      hint: "Màu sẽ nhạt đi.",
      answer: "fade",
      answerHint: "The color will fade."
    },
    {
      id: "L83C09",
      type: "fill",
      prompt: "It fades about forty ___.",
      hint: "Nó nhạt đi khoảng bốn mươi phần trăm.",
      answer: "percent",
      answerHint: "It fades about forty percent."
    },
    {
      id: "L83C10",
      type: "dialogue",
      prompt: "Worker: It looks dark at first.\nCustomer: Oh, really?\nWorker: Yes, the color will fade.",
      hint: "Thợ: Lúc đầu nó trông đậm.\nKhách: Ồ, vậy hả?\nThợ: Vâng, màu sẽ nhạt đi.",
      answer: "Worker: It looks dark at first.\nCustomer: Oh, really?\nWorker: Yes, the color will fade."
    }
  ]
},
  {
  id: "L84",
  title: "Permanent Makeup: Healing",
  titleVi: "Phục hồi sau phun xăm thẩm mỹ",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi nói về quá trình phục hồi sau khi làm phun xăm thẩm mỹ.",
  phrases: [
    {
      english: "Peeling is normal.",
      vietnamese: "Da bong tróc là bình thường.",
      pronunciation: "pee-ling iz nor-muhl"
    },
    {
      english: "It heals in two weeks.",
      vietnamese: "Nó lành trong hai tuần.",
      pronunciation: "it heelz in too weeks"
    },
    {
      english: "Keep it clean and dry.",
      vietnamese: "Giữ cho nó sạch và khô.",
      pronunciation: "keep it kleen and dry"
    }
  ],
  drill: [
    {
      id: "L84C01",
      type: "read",
      prompt: "Peeling is normal.",
      hint: "Da bong tróc là bình thường.",
      answer: "Peeling is normal."
    },
    {
      id: "L84C02",
      type: "recall",
      prompt: "Da bong tróc là bình thường.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Peeling is normal."
    },
    {
      id: "L84C03",
      type: "read",
      prompt: "It heals in two weeks.",
      hint: "Nó lành trong hai tuần.",
      answer: "It heals in two weeks."
    },
    {
      id: "L84C04",
      type: "recall",
      prompt: "Nó lành trong hai tuần.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It heals in two weeks."
    },
    {
      id: "L84C05",
      type: "read",
      prompt: "Keep it clean and dry.",
      hint: "Giữ cho nó sạch và khô.",
      answer: "Keep it clean and dry."
    },
    {
      id: "L84C06",
      type: "recall",
      prompt: "Giữ cho nó sạch và khô.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Keep it clean and dry."
    },
    {
      id: "L84C07",
      type: "fill",
      prompt: "___ is normal.",
      hint: "Da bong tróc là bình thường.",
      answer: "Peeling",
      answerHint: "Peeling is normal."
    },
    {
      id: "L84C08",
      type: "fill",
      prompt: "It heals in two ___.",
      hint: "Nó lành trong hai tuần.",
      answer: "weeks",
      answerHint: "It heals in two weeks."
    },
    {
      id: "L84C09",
      type: "fill",
      prompt: "Keep it ___ and dry.",
      hint: "Giữ cho nó sạch và khô.",
      answer: "clean",
      answerHint: "Keep it clean and dry."
    },
    {
      id: "L84C10",
      type: "dialogue",
      prompt: "Worker: Is it itchy?\nCustomer: Yes, it is very itchy.\nWorker: Peeling is normal.",
      hint: "Thợ: Có ngứa không?\nKhách: Có, rất ngứa.\nThợ: Da bong tróc là bình thường.",
      answer: "Worker: Is it itchy?\nCustomer: Yes, it is very itchy.\nWorker: Peeling is normal."
    }
  ]
},
  {
  id: "L85",
  title: "After Permanent Makeup Care",
  titleVi: "Chăm sóc sau khi phun xăm",
  level: "A2",
  context: "Những điều cần tránh sau khi bạn làm phun xăm thẩm mỹ. (Things to avoid after you get permanent makeup done.)",
  phrases: [
    {
      english: "Avoid direct sun.",
      vietnamese: "Tránh ánh nắng trực tiếp.",
      pronunciation: "uh-VOID dih-REKT sun"
    },
    {
      english: "No swimming for two weeks.",
      vietnamese: "Không bơi trong hai tuần.",
      pronunciation: "NO swim-ing for TOO weeks"
    },
    {
      english: "No makeup on the area.",
      vietnamese: "Không trang điểm lên vùng đó.",
      pronunciation: "NO mayk-up on thuh AIR-ee-uh"
    }
  ],
  drill: [
    {
      id: "L85C01",
      type: "read",
      prompt: "Avoid direct sun.",
      hint: "Tránh ánh nắng trực tiếp.",
      answer: "Avoid direct sun."
    },
    {
      id: "L85C02",
      type: "recall",
      prompt: "Tránh ánh nắng trực tiếp.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Avoid direct sun."
    },
    {
      id: "L85C03",
      type: "read",
      prompt: "No swimming for two weeks.",
      hint: "Không bơi trong hai tuần.",
      answer: "No swimming for two weeks."
    },
    {
      id: "L85C04",
      type: "recall",
      prompt: "Không bơi trong hai tuần.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "No swimming for two weeks."
    },
    {
      id: "L85C05",
      type: "read",
      prompt: "No makeup on the area.",
      hint: "Không trang điểm lên vùng đó.",
      answer: "No makeup on the area."
    },
    {
      id: "L85C06",
      type: "recall",
      prompt: "Không trang điểm lên vùng đó.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "No makeup on the area."
    },
    {
      id: "L85C07",
      type: "fill",
      prompt: "Avoid ___ sun.",
      hint: "Tránh ánh nắng trực tiếp.",
      answer: "direct",
      answerHint: "Avoid direct sun."
    },
    {
      id: "L85C08",
      type: "fill",
      prompt: "No ___ for two weeks.",
      hint: "Không bơi trong hai tuần.",
      answer: "swimming",
      answerHint: "No swimming for two weeks."
    },
    {
      id: "L85C09",
      type: "fill",
      prompt: "No makeup on the ___.",
      hint: "Không trang điểm lên vùng đó.",
      answer: "area",
      answerHint: "No makeup on the area."
    },
    {
      id: "L85C10",
      type: "dialogue",
      prompt: "Worker: Can you avoid the sun?\nCustomer: Yes, I can.\nWorker: Good. And no swimming.",
      hint: "Thợ: Bạn có thể tránh nắng được không?\nKhách: Dạ được.\nThợ: Tốt. Và không bơi lội.",
      answer: "Worker: Can you avoid the sun?\nCustomer: Yes, I can.\nWorker: Good. And no swimming."
    }
  ]
},
  {
  id: "L86",
  title: "After PMU Care",
  titleVi: "Chăm sóc sau PMU",
  level: "A2",
  context: "Sử dụng những mẫu câu này để hướng dẫn khách hàng về các sản phẩm cần dùng sau khi làm PMU.",
  phrases: [
    {
      english: "Use healing balm daily.",
      vietnamese: "Sử dụng sáp dưỡng ẩm hàng ngày.",
      pronunciation: "yooz hee-ling balm day-lee"
    },
    {
      english: "Apply SPF when healed.",
      vietnamese: "Thoa kem chống nắng khi đã lành.",
      pronunciation: "uh-ply ess-pee-eff wen heeld"
    },
    {
      english: "Keep it clean and dry.",
      vietnamese: "Giữ cho nó sạch và khô.",
      pronunciation: "keep it kleen and dry"
    }
  ],
  drill: [
    {
      id: "L86C01",
      type: "read",
      prompt: "Use healing balm daily.",
      hint: "Sử dụng sáp dưỡng ẩm hàng ngày.",
      answer: "Use healing balm daily."
    },
    {
      id: "L86C02",
      type: "recall",
      prompt: "Sử dụng sáp dưỡng ẩm hàng ngày.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Use healing balm daily."
    },
    {
      id: "L86C03",
      type: "read",
      prompt: "Apply SPF when healed.",
      hint: "Thoa kem chống nắng khi đã lành.",
      answer: "Apply SPF when healed."
    },
    {
      id: "L86C04",
      type: "recall",
      prompt: "Thoa kem chống nắng khi đã lành.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Apply SPF when healed."
    },
    {
      id: "L86C05",
      type: "read",
      prompt: "Keep it clean and dry.",
      hint: "Giữ cho nó sạch và khô.",
      answer: "Keep it clean and dry."
    },
    {
      id: "L86C06",
      type: "recall",
      prompt: "Giữ cho nó sạch và khô.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Keep it clean and dry."
    },
    {
      id: "L86C07",
      type: "fill",
      prompt: "Use ___ balm daily.",
      hint: "Sử dụng sáp dưỡng ẩm hàng ngày.",
      answer: "healing",
      answerHint: "Use healing balm daily."
    },
    {
      id: "L86C08",
      type: "fill",
      prompt: "Apply ___ when healed.",
      hint: "Thoa kem chống nắng khi đã lành.",
      answer: "SPF",
      answerHint: "Apply SPF when healed."
    },
    {
      id: "L86C09",
      type: "fill",
      prompt: "Keep it clean and ___.",
      hint: "Giữ cho nó sạch và khô.",
      answer: "dry",
      answerHint: "Keep it clean and dry."
    },
    {
      id: "L86C10",
      type: "dialogue",
      prompt: "Worker: Do you have healing balm?\nCustomer: No, I don't.\nWorker: I recommend this one.",
      hint: "Thợ: Bạn có sáp dưỡng ẩm không?\nKhách: Không, tôi không có.\nThợ: Tôi giới thiệu loại này.",
      answer: "Worker: Do you have healing balm?\nCustomer: No, I don't.\nWorker: I recommend this one."
    }
  ]
},
  {
  id: "L87",
  title: "Touch-Up Appointment",
  titleVi: "Hẹn Dặm Lại",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi giải thích về cuộc hẹn dặm lại cho khách hàng.",
  phrases: [
    {
      english: "Come back in six weeks.",
      vietnamese: "Hãy quay lại sau sáu tuần.",
      pronunciation: "kuhm bak in siks weeks"
    },
    {
      english: "We need a touch-up.",
      vietnamese: "Chúng ta cần dặm lại.",
      pronunciation: "wee need uh tuhch-uhp"
    },
    {
      english: "It helps with the color.",
      vietnamese: "Nó giúp giữ màu tốt hơn.",
      pronunciation: "it helps with thuh kuh-ler"
    }
  ],
  drill: [
    {
      id: "L87C01",
      type: "read",
      prompt: "Come back in six weeks.",
      hint: "Hãy quay lại sau sáu tuần.",
      answer: "Come back in six weeks."
    },
    {
      id: "L87C02",
      type: "recall",
      prompt: "Hãy quay lại sau sáu tuần.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Come back in six weeks."
    },
    {
      id: "L87C03",
      type: "read",
      prompt: "We need a touch-up.",
      hint: "Chúng ta cần dặm lại.",
      answer: "We need a touch-up."
    },
    {
      id: "L87C04",
      type: "recall",
      prompt: "Chúng ta cần dặm lại.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "We need a touch-up."
    },
    {
      id: "L87C05",
      type: "read",
      prompt: "It helps with the color.",
      hint: "Nó giúp giữ màu tốt hơn.",
      answer: "It helps with the color."
    },
    {
      id: "L87C06",
      type: "recall",
      prompt: "Nó giúp giữ màu tốt hơn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It helps with the color."
    },
    {
      id: "L87C07",
      type: "fill",
      prompt: "Come back in six ___.",
      hint: "Hãy quay lại sau sáu tuần.",
      answer: "weeks",
      answerHint: "Come back in six weeks."
    },
    {
      id: "L87C08",
      type: "fill",
      prompt: "We need a ___.",
      hint: "Chúng ta cần dặm lại.",
      answer: "touch-up",
      answerHint: "We need a touch-up."
    },
    {
      id: "L87C09",
      type: "fill",
      prompt: "It helps with the ___.",
      hint: "Nó giúp giữ màu tốt hơn.",
      answer: "color",
      answerHint: "It helps with the color."
    },
    {
      id: "L87C10",
      type: "dialogue",
      prompt: "Worker: When can you come back?\nCustomer: I'm free in seven weeks.\nWorker: Perfect, see you then!",
      hint: "Thợ: Khi nào bạn có thể quay lại?\nKhách: Tôi rảnh vào bảy tuần nữa.\nThợ: Tuyệt vời, hẹn gặp lại bạn sau!",
      answer: "Worker: When can you come back?\nCustomer: I'm free in seven weeks.\nWorker: Perfect, see you then!"
    }
  ]
},
  {
  id: "L88",
  title: "PMU: Healing or Problem?",
  titleVi: "PMU: Lành hay Có Vấn Đề?",
  level: "B1",
  context: "Những câu này giúp bạn phân biệt quá trình lành bình thường sau khi làm phun xăm thẩm mỹ và khi nào cần lo lắng.",
  phrases: [
    {
      english: "It's normal to itch.",
      vietnamese: "Bị ngứa là bình thường.",
      pronunciation: "its nor-muhl too itch"
    },
    {
      english: "Is there a lot of swelling?",
      vietnamese: "Có bị sưng nhiều không?",
      pronunciation: "iz thair uh lot uv sweh-ling"
    },
    {
      english: "That looks infected to me.",
      vietnamese: "Tôi thấy có vẻ bị nhiễm trùng.",
      pronunciation: "that looks in-fek-ted too mee"
    }
  ],
  drill: [
    {
      id: "L88C01",
      type: "read",
      prompt: "It's normal to itch.",
      hint: "Bị ngứa là bình thường.",
      answer: "It's normal to itch."
    },
    {
      id: "L88C02",
      type: "recall",
      prompt: "Bị ngứa là bình thường.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It's normal to itch."
    },
    {
      id: "L88C03",
      type: "read",
      prompt: "Is there a lot of swelling?",
      hint: "Có bị sưng nhiều không?",
      answer: "Is there a lot of swelling?"
    },
    {
      id: "L88C04",
      type: "recall",
      prompt: "Có bị sưng nhiều không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Is there a lot of swelling?"
    },
    {
      id: "L88C05",
      type: "read",
      prompt: "That looks infected to me.",
      hint: "Tôi thấy có vẻ bị nhiễm trùng.",
      answer: "That looks infected to me."
    },
    {
      id: "L88C06",
      type: "recall",
      prompt: "Tôi thấy có vẻ bị nhiễm trùng.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "That looks infected to me."
    },
    {
      id: "L88C07",
      type: "fill",
      prompt: "It's normal to ___.",
      hint: "Bị ngứa là bình thường.",
      answer: "itch",
      answerHint: "It's normal to itch."
    },
    {
      id: "L88C08",
      type: "fill",
      prompt: "Is there a lot of ___?",
      hint: "Có bị sưng nhiều không?",
      answer: "swelling",
      answerHint: "Is there a lot of swelling?"
    },
    {
      id: "L88C09",
      type: "fill",
      prompt: "That looks ___ to me.",
      hint: "Tôi thấy có vẻ bị nhiễm trùng.",
      answer: "infected",
      answerHint: "That looks infected to me."
    },
    {
      id: "L88C10",
      type: "dialogue",
      prompt: "Worker: How does it feel?\nCustomer: It's very itchy.\nWorker: It's normal to itch.",
      hint: "Thợ: Cảm thấy thế nào?\nKhách: Rất ngứa.\nThợ: Bị ngứa là bình thường.",
      answer: "Worker: How does it feel?\nCustomer: It's very itchy.\nWorker: It's normal to itch."
    }
  ]
},
  {
  id: "L89",
  title: "It's Part of Healing",
  titleVi: "Đó là một phần của quá trình lành",
  level: "B1",
  context: "Sử dụng những cụm từ này khi khách hàng lo lắng về quá trình hồi phục sau khi làm đẹp.",
  phrases: [
    {
      english: "It's completely normal.",
      vietnamese: "Điều đó hoàn toàn bình thường.",
      pronunciation: "its com-pleet-lee nor-mal"
    },
    {
      english: "Don't worry, it's healing.",
      vietnamese: "Đừng lo lắng, nó đang lành lại.",
      pronunciation: "dont wur-ee, its hee-ling"
    },
    {
      english: "This is just temporary.",
      vietnamese: "Đây chỉ là tạm thời thôi.",
      pronunciation: "this is just tem-puh-rer-ee"
    }
  ],
  drill: [
    {
      id: "L89C01",
      type: "read",
      prompt: "It's completely normal.",
      hint: "Điều đó hoàn toàn bình thường.",
      answer: "It's completely normal."
    },
    {
      id: "L89C02",
      type: "recall",
      prompt: "Điều đó hoàn toàn bình thường.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It's completely normal."
    },
    {
      id: "L89C03",
      type: "read",
      prompt: "Don't worry, it's healing.",
      hint: "Đừng lo lắng, nó đang lành lại.",
      answer: "Don't worry, it's healing."
    },
    {
      id: "L89C04",
      type: "recall",
      prompt: "Đừng lo lắng, nó đang lành lại.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Don't worry, it's healing."
    },
    {
      id: "L89C05",
      type: "read",
      prompt: "This is just temporary.",
      hint: "Đây chỉ là tạm thời thôi.",
      answer: "This is just temporary."
    },
    {
      id: "L89C06",
      type: "recall",
      prompt: "Đây chỉ là tạm thời thôi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "This is just temporary."
    },
    {
      id: "L89C07",
      type: "fill",
      prompt: "It's completely ___.",
      hint: "Điều đó hoàn toàn bình thường.",
      answer: "normal",
      answerHint: "It's completely normal."
    },
    {
      id: "L89C08",
      type: "fill",
      prompt: "Don't worry, it's ___.",
      hint: "Đừng lo lắng, nó đang lành lại.",
      answer: "healing",
      answerHint: "Don't worry, it's healing."
    },
    {
      id: "L89C09",
      type: "fill",
      prompt: "This is just ___.",
      hint: "Đây chỉ là tạm thời thôi.",
      answer: "temporary",
      answerHint: "This is just temporary."
    },
    {
      id: "L89C10",
      type: "dialogue",
      prompt: "Worker: Are you experiencing any swelling?\nCustomer: Yes, it's very swollen.\nWorker: It's completely normal. Don't worry.",
      hint: "Thợ: Bạn có bị sưng không?\nKhách: Có, nó sưng rất nhiều.\nThợ: Điều đó hoàn toàn bình thường. Đừng lo lắng.",
      answer: "Worker: Are you experiencing any swelling?\nCustomer: Yes, it's very swollen.\nWorker: It's completely normal. Don't worry."
    }
  ]
},
  {
  id: "L90",
  title: "Permanent Makeup: Touch-ups",
  titleVi: "Chăm sóc hình xăm thẩm mỹ: Dặm lại",
  level: "B2",
  context: "Sử dụng các cụm từ này khi nói chuyện với khách hàng về việc bảo trì hình xăm thẩm mỹ lâu dài.",
  phrases: [
    {
      english: "Annual touch-ups are recommended.",
      vietnamese: "Nên dặm lại mỗi năm.",
      pronunciation: "an-yu-al touch-ups ar rek-o-men-ded"
    },
    {
      english: "Color refreshing maintains vibrancy.",
      vietnamese: "Dặm màu giúp duy trì độ tươi.",
      pronunciation: "kul-er ree-fresh-ing main-tainz vai-bran-see"
    },
    {
      english: "Fading occurs over several years.",
      vietnamese: "Màu sẽ phai dần theo thời gian.",
      pronunciation: "fade-ing uh-kurz o-ver sev-er-al yeerz"
    }
  ],
  drill: [
    {
      id: "L90C01",
      type: "read",
      prompt: "Annual touch-ups are recommended.",
      hint: "Nên dặm lại mỗi năm.",
      answer: "Annual touch-ups are recommended."
    },
    {
      id: "L90C02",
      type: "recall",
      prompt: "Nên dặm lại mỗi năm.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Annual touch-ups are recommended."
    },
    {
      id: "L90C03",
      type: "read",
      prompt: "Color refreshing maintains vibrancy.",
      hint: "Dặm màu giúp duy trì độ tươi.",
      answer: "Color refreshing maintains vibrancy."
    },
    {
      id: "L90C04",
      type: "recall",
      prompt: "Dặm màu giúp duy trì độ tươi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Color refreshing maintains vibrancy."
    },
    {
      id: "L90C05",
      type: "read",
      prompt: "Fading occurs over several years.",
      hint: "Màu sẽ phai dần theo thời gian.",
      answer: "Fading occurs over several years."
    },
    {
      id: "L90C06",
      type: "recall",
      prompt: "Màu sẽ phai dần theo thời gian.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Fading occurs over several years."
    },
    {
      id: "L90C07",
      type: "fill",
      prompt: "Annual ___ are recommended.",
      hint: "Nên dặm lại mỗi năm.",
      answer: "touch-ups",
      answerHint: "Annual touch-ups are recommended."
    },
    {
      id: "L90C08",
      type: "fill",
      prompt: "Color refreshing maintains ___.",
      hint: "Dặm màu giúp duy trì độ tươi.",
      answer: "vibrancy",
      answerHint: "Color refreshing maintains vibrancy."
    },
    {
      id: "L90C09",
      type: "fill",
      prompt: "Fading occurs over several ___.",
      hint: "Màu sẽ phai dần theo thời gian.",
      answer: "years",
      answerHint: "Fading occurs over several years."
    },
    {
      id: "L90C10",
      type: "dialogue",
      prompt: "Worker: When was your last touch-up?\nCustomer: About two years ago.\nWorker: Then it's time for refreshing!",
      hint: "Thợ: Lần dặm lại cuối cùng của chị là khi nào?\nKhách: Khoảng hai năm trước.\nThợ: Vậy đã đến lúc dặm lại rồi!",
      answer: "Worker: When was your last touch-up?\nCustomer: About two years ago.\nWorker: Then it's time for refreshing!"
    }
  ]
}
  ]
};

export default aftercare;
