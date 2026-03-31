import type { Class } from "../types";

const nailCareTechniques: Class = {
  id: "nail-care-techniques",
  title: "Nail Care Techniques",
  titleVi: "Kỹ Thuật Chăm Sóc Móng",
  lessons: [
    {
      id: "L37",
      title: "Nail Prep & Cuticle Care",
      titleVi: "Chuẩn Bị Móng & Chăm Sóc Da Cuticle",
      level: "A1",
      context: "Sử dụng những câu này khi bạn chuẩn bị móng và chăm sóc da cuticle cho khách.",
      phrases: [
        {
          english: "Let me prep your nails first.",
          vietnamese: "Để tôi chuẩn bị móng cho bạn trước.",
          pronunciation: "Let mi prep djo neils fơrst",
        },
        {
          english: "I'll push back your cuticles.",
          vietnamese: "Tôi sẽ đẩy da cuticle của bạn ra.",
          pronunciation: "Ai wil pút bek djo kiu-ti-kồl",
        },
        {
          english: "Your nails are ready now.",
          vietnamese: "Móng của bạn đã sẵn sàng rồi.",
          pronunciation: "Djo neils ar rê-đi nao",
        },
      ],
      drill: [
        {
          id: "L37C01",
          type: "read",
          prompt: "Let me prep your nails first.",
          hint: "Để tôi chuẩn bị móng cho bạn trước.",
          answer: "Let me prep your nails first.",
        },
        {
          id: "L37C02",
          type: "recall",
          prompt: "Để tôi chuẩn bị móng cho bạn trước.",
          hint: "Nhớ lại câu tiếng Anh...",
          answer: "Let me prep your nails first.",
        },
        {
          id: "L37C03",
          type: "read",
          prompt: "I'll push back your cuticles.",
          hint: "Tôi sẽ đẩy da cuticle của bạn ra.",
          answer: "I'll push back your cuticles.",
        },
        {
          id: "L37C04",
          type: "recall",
          prompt: "Tôi sẽ đẩy da cuticle của bạn ra.",
          hint: "Nhớ lại câu tiếng Anh...",
          answer: "I'll push back your cuticles.",
        },
        {
          id: "L37C05",
          type: "read",
          prompt: "Your nails are ready now.",
          hint: "Móng của bạn đã sẵn sàng rồi.",
          answer: "Your nails are ready now.",
        },
        {
          id: "L37C06",
          type: "recall",
          prompt: "Móng của bạn đã sẵn sàng rồi.",
          hint: "Nhớ lại câu tiếng Anh...",
          answer: "Your nails are ready now.",
        },
        {
          id: "L37C07",
          type: "fill",
          prompt: "Let me prep your nails ___.",
          hint: "Để tôi chuẩn bị móng cho bạn trước.",
          answer: "first",
          answerHint: "Let me prep your nails first.",
        },
        {
          id: "L37C08",
          type: "fill",
          prompt: "I'll push back your ___.",
          hint: "Tôi sẽ đẩy da cuticle của bạn ra.",
          answer: "cuticles",
          answerHint: "I'll push back your cuticles.",
        },
        {
          id: "L37C09",
          type: "fill",
          prompt: "Your nails are ___ now.",
          hint: "Móng của bạn đã sẵn sàng rồi.",
          answer: "ready",
          answerHint: "Your nails are ready now.",
        },
        {
          id: "L37C10",
          type: "dialogue",
          prompt:
            "Worker: Let me prep your nails first.\nCustomer: Okay.\nWorker: I'll push back your cuticles.\nCustomer: Thank you!\nWorker: Your nails are ready now.",
          hint: "Thợ: Để tôi chuẩn bị móng cho bạn trước.\nKhách: Được thôi.\nThợ: Tôi sẽ đẩy da cuticle của bạn ra.\nKhách: Cảm ơn!\nThợ: Móng của bạn đã sẵn sàng rồi.",
          answer:
            "Worker: Let me prep your nails first.\nCustomer: Okay.\nWorker: I'll push back your cuticles.\nCustomer: Thank you!\nWorker: Your nails are ready now.",
        },
      ],
    },
    {
      id: "L38",
      title: "Applying Nail Polish",
      titleVi: "Thoa Sơn Móng",
      level: "A1",
      context: "Sử dụng những câu này khi bạn thoa sơn móng cho khách hàng.",
      phrases: [
        {
          english: "Which color do you want?",
          vietnamese: "Bạn muốn màu nào?",
          pronunciation: "Oích cơ-lơ đu dju uônt",
        },
        {
          english: "I'll put on two coats.",
          vietnamese: "Tôi sẽ thoa hai lớp.",
          pronunciation: "Ai wil pút on tu côts",
        },
        {
          english: "Let it dry for a minute.",
          vietnamese: "Để khô một phút nhé.",
          pronunciation: "Let it đrai pho ơ mi-nịt",
        },
      ],
      drill: [
        {
          id: "L38C01",
          type: "read",
          prompt: "Which color do you want?",
          hint: "Bạn muốn màu nào?",
          answer: "Which color do you want?",
        },
        {
          id: "L38C02",
          type: "recall",
          prompt: "Bạn muốn màu nào?",
          hint: "Nhớ lại câu tiếng Anh...",
          answer: "Which color do you want?",
        },
        {
          id: "L38C03",
          type: "read",
          prompt: "I'll put on two coats.",
          hint: "Tôi sẽ thoa hai lớp.",
          answer: "I'll put on two coats.",
        },
        {
          id: "L38C04",
          type: "recall",
          prompt: "Tôi sẽ thoa hai lớp.",
          hint: "Nhớ lại câu tiếng Anh...",
          answer: "I'll put on two coats.",
        },
        {
          id: "L38C05",
          type: "read",
          prompt: "Let it dry for a minute.",
          hint: "Để khô một phút nhé.",
          answer: "Let it dry for a minute.",
        },
        {
          id: "L38C06",
          type: "recall",
          prompt: "Để khô một phút nhé.",
          hint: "Nhớ lại câu tiếng Anh...",
          answer: "Let it dry for a minute.",
        },
        {
          id: "L38C07",
          type: "fill",
          prompt: "Which color do you ___?",
          hint: "Bạn muốn màu nào?",
          answer: "want",
          answerHint: "Which color do you want?",
        },
        {
          id: "L38C08",
          type: "fill",
          prompt: "I'll put on two ___.",
          hint: "Tôi sẽ thoa hai lớp.",
          answer: "coats",
          answerHint: "I'll put on two coats.",
        },
        {
          id: "L38C09",
          type: "fill",
          prompt: "Let it dry for a ___.",
          hint: "Để khô một phút nhé.",
          answer: "minute",
          answerHint: "Let it dry for a minute.",
        },
        {
          id: "L38C10",
          type: "dialogue",
          prompt:
            "Worker: Which color do you want?\nCustomer: The pink one, please.\nWorker: I'll put on two coats.\nCustomer: Sounds good!\nWorker: Let it dry for a minute.",
          hint: "Thợ: Bạn muốn màu nào?\nKhách: Màu hồng đó, làm ơn.\nThợ: Tôi sẽ thoa hai lớp.\nKhách: Tốt quá!\nThợ: Để khô một phút nhé.",
          answer:
            "Worker: Which color do you want?\nCustomer: The pink one, please.\nWorker: I'll put on two coats.\nCustomer: Sounds good!\nWorker: Let it dry for a minute.",
        },
      ],
    },
    {
      id: "L39",
      title: "Gel & Acrylic Nails",
      titleVi: "Móng Gel & Acrylic",
      level: "A1",
      context: "Sử dụng những câu này khi tư vấn và làm móng gel hoặc acrylic cho khách.",
      phrases: [
        {
          english: "Do you want gel or acrylic?",
          vietnamese: "Bạn muốn gel hay acrylic?",
          pronunciation: "Đu dju uônt gel or ơ-cri-lic",
        },
        {
          english: "Gel lasts about two weeks.",
          vietnamese: "Gel bền khoảng hai tuần.",
          pronunciation: "Gel lasts ơ-bao tu uiks",
        },
        {
          english: "I'll cure it under the lamp.",
          vietnamese: "Tôi sẽ sấy dưới đèn.",
          pronunciation: "Ai wil kiua it ơn-đơ đơ læmp",
        },
      ],
      drill: [
        {
          id: "L39C01",
          type: "read",
          prompt: "Do you want gel or acrylic?",
          hint: "Bạn muốn gel hay acrylic?",
          answer: "Do you want gel or acrylic?",
        },
        {
          id: "L39C02",
          type: "recall",
          prompt: "Bạn muốn gel hay acrylic?",
          hint: "Nhớ lại câu tiếng Anh...",
          answer: "Do you want gel or acrylic?",
        },
        {
          id: "L39C03",
          type: "read",
          prompt: "Gel lasts about two weeks.",
          hint: "Gel bền khoảng hai tuần.",
          answer: "Gel lasts about two weeks.",
        },
        {
          id: "L39C04",
          type: "recall",
          prompt: "Gel bền khoảng hai tuần.",
          hint: "Nhớ lại câu tiếng Anh...",
          answer: "Gel lasts about two weeks.",
        },
        {
          id: "L39C05",
          type: "read",
          prompt: "I'll cure it under the lamp.",
          hint: "Tôi sẽ sấy dưới đèn.",
          answer: "I'll cure it under the lamp.",
        },
        {
          id: "L39C06",
          type: "recall",
          prompt: "Tôi sẽ sấy dưới đèn.",
          hint: "Nhớ lại câu tiếng Anh...",
          answer: "I'll cure it under the lamp.",
        },
        {
          id: "L39C07",
          type: "fill",
          prompt: "Do you want gel or ___?",
          hint: "Bạn muốn gel hay acrylic?",
          answer: "acrylic",
          answerHint: "Do you want gel or acrylic?",
        },
        {
          id: "L39C08",
          type: "fill",
          prompt: "Gel lasts about two ___.",
          hint: "Gel bền khoảng hai tuần.",
          answer: "weeks",
          answerHint: "Gel lasts about two weeks.",
        },
        {
          id: "L39C09",
          type: "fill",
          prompt: "I'll cure it under the ___.",
          hint: "Tôi sẽ sấy dưới đèn.",
          answer: "lamp",
          answerHint: "I'll cure it under the lamp.",
        },
        {
          id: "L39C10",
          type: "dialogue",
          prompt:
            "Worker: Do you want gel or acrylic?\nCustomer: Gel, please.\nWorker: Gel lasts about two weeks.\nCustomer: Perfect!\nWorker: I'll cure it under the lamp.",
          hint: "Thợ: Bạn muốn gel hay acrylic?\nKhách: Gel, làm ơn.\nThợ: Gel bền khoảng hai tuần.\nKhách: Tuyệt vời!\nThợ: Tôi sẽ sấy dưới đèn.",
          answer:
            "Worker: Do you want gel or acrylic?\nCustomer: Gel, please.\nWorker: Gel lasts about two weeks.\nCustomer: Perfect!\nWorker: I'll cure it under the lamp.",
        },
      ],
    },
    {
      id: "L40",
      title: "Avoid Water and Chemicals",
      titleVi: "Tránh Nước và Hóa Chất",
      level: "A2",
      context: "Dùng những câu này để khuyên khách hàng tránh nước và hóa chất sau khi làm móng.",
      phrases: [
        {
          english: "Avoid water for two hours.",
          vietnamese: "Tránh nước trong hai tiếng.",
          pronunciation: "uh-void waw-ter for too ow-ers",
        },
        {
          english: "Don't wash dishes.",
          vietnamese: "Đừng rửa chén.",
          pronunciation: "dont wash dish-es",
        },
        {
          english: "Wear gloves, please.",
          vietnamese: "Xin hãy đeo găng tay.",
          pronunciation: "wear gloves, pleez",
        },
      ],
      drill: [
        {
          id: "L40C01",
          type: "read",
          prompt: "Avoid water for two hours.",
          hint: "Tránh nước trong hai tiếng.",
          answer: "Avoid water for two hours.",
        },
        {
          id: "L40C02",
          type: "recall",
          prompt: "Tránh nước trong hai tiếng.",
          hint: "Nhớ lại câu tiếng Anh...",
          answer: "Avoid water for two hours.",
        },
        {
          id: "L40C03",
          type: "read",
          prompt: "Don't wash dishes.",
          hint: "Đừng rửa chén.",
          answer: "Don't wash dishes.",
        },
        {
          id: "L40C04",
          type: "recall",
          prompt: "Đừng rửa chén.",
          hint: "Nhớ lại câu tiếng Anh...",
          answer: "Don't wash dishes.",
        },
        {
          id: "L40C05",
          type: "read",
          prompt: "Wear gloves, please.",
          hint: "Xin hãy đeo găng tay.",
          answer: "Wear gloves, please.",
        },
        {
          id: "L40C06",
          type: "recall",
          prompt: "Xin hãy đeo găng tay.",
          hint: "Nhớ lại câu tiếng Anh...",
          answer: "Wear gloves, please.",
        },
        {
          id: "L40C07",
          type: "fill",
          prompt: "Avoid water for ___ hours.",
          hint: "Tránh nước trong hai tiếng.",
          answer: "two",
          answerHint: "Avoid water for two hours.",
        },
        {
          id: "L40C08",
          type: "fill",
          prompt: "Don't wash ___.",
          hint: "Đừng rửa chén.",
          answer: "dishes",
          answerHint: "Don't wash dishes.",
        },
        {
          id: "L40C09",
          type: "fill",
          prompt: "___ gloves, please.",
          hint: "Xin hãy đeo găng tay.",
          answer: "Wear",
          answerHint: "Wear gloves, please.",
        },
        {
          id: "L40C10",
          type: "dialogue",
          prompt:
            "Worker: Your nails look beautiful!\nCustomer: Thank you!\nWorker: Please avoid water for two hours. And don't wash dishes. Wear gloves, please.",
          hint: "Thợ: Móng tay của bạn rất đẹp!\nKhách: Cảm ơn!\nThợ: Xin tránh nước trong hai tiếng. Và đừng rửa chén. Xin hãy đeo găng tay.",
          answer:
            "Worker: Your nails look beautiful!\nCustomer: Thank you!\nWorker: Please avoid water for two hours. And don't wash dishes. Wear gloves, please.",
        },
      ],
    },
    {
      id: "L41",
      title: "Explaining Nail Problems",
      titleVi: "Giải thích các vấn đề về móng",
      level: "B1",
      context: "Sử dụng những mẫu câu này để giải thích cho khách hàng lý do tại sao móng tay của họ bị bong tróc hoặc hư hỏng.",
      phrases: [
        {
          english: "Too much water can cause lifting.",
          vietnamese: "Quá nhiều nước có thể gây ra bong tróc.",
          pronunciation: "too much wawt-er kuhn kawz lift-ing",
        },
        {
          english: "Picking at your nails damages them.",
          vietnamese: "Cậy móng tay sẽ làm hỏng chúng.",
          pronunciation: "pik-ing at yor naylz dam-ij-ez them",
        },
        {
          english: "It could be the natural oils.",
          vietnamese: "Có thể là do dầu tự nhiên.",
          pronunciation: "it cood bee thuh nach-uh-ruhl oils",
        },
      ],
      drill: [
        {
          id: "L41C01",
          type: "read",
          prompt: "Too much water can cause lifting.",
          hint: "Quá nhiều nước có thể gây ra bong tróc.",
          answer: "Too much water can cause lifting.",
        },
        {
          id: "L41C02",
          type: "recall",
          prompt: "Quá nhiều nước có thể gây ra bong tróc.",
          hint: "Nhớ lại câu tiếng Anh...",
          answer: "Too much water can cause lifting.",
        },
        {
          id: "L41C03",
          type: "read",
          prompt: "Picking at your nails damages them.",
          hint: "Cậy móng tay sẽ làm hỏng chúng.",
          answer: "Picking at your nails damages them.",
        },
        {
          id: "L41C04",
          type: "recall",
          prompt: "Cậy móng tay sẽ làm hỏng chúng.",
          hint: "Nhớ lại câu tiếng Anh...",
          answer: "Picking at your nails damages them.",
        },
        {
          id: "L41C05",
          type: "read",
          prompt: "It could be the natural oils.",
          hint: "Có thể là do dầu tự nhiên.",
          answer: "It could be the natural oils.",
        },
        {
          id: "L41C06",
          type: "recall",
          prompt: "Có thể là do dầu tự nhiên.",
          hint: "Nhớ lại câu tiếng Anh...",
          answer: "It could be the natural oils.",
        },
        {
          id: "L41C07",
          type: "fill",
          prompt: "Too much water can cause ___.",
          hint: "Quá nhiều nước có thể gây ra bong tróc.",
          answer: "lifting",
          answerHint: "Too much water can cause lifting.",
        },
        {
          id: "L41C08",
          type: "fill",
          prompt: "Picking at your nails ___ them.",
          hint: "Cậy móng tay sẽ làm hỏng chúng.",
          answer: "damages",
          answerHint: "Picking at your nails damages them.",
        },
        {
          id: "L41C09",
          type: "fill",
          prompt: "It could be the ___ oils.",
          hint: "Có thể là do dầu tự nhiên.",
          answer: "natural",
          answerHint: "It could be the natural oils.",
        },
        {
          id: "L41C10",
          type: "dialogue",
          prompt:
            "Worker: I see some lifting here.\nCustomer: Oh no! Why?\nWorker: Too much water can cause lifting. Also, picking at your nails damages them. It could be the natural oils too.",
          hint: "Thợ: Tôi thấy có một vài chỗ bị bong tróc ở đây.\nKhách: Ồ không! Tại sao?\nThợ: Quá nhiều nước có thể gây ra bong tróc. Ngoài ra, cậy móng tay sẽ làm hỏng chúng. Cũng có thể là do dầu tự nhiên nữa.",
          answer:
            "Worker: I see some lifting here.\nCustomer: Oh no! Why?\nWorker: Too much water can cause lifting. Also, picking at your nails damages them. It could be the natural oils too.",
        },
      ],
    },
    {
      id: "L42",
      title: "Recommend Cuticle Oil and Hand Cream",
      titleVi: "Gợi ý Dầu biểu bì và Kem dưỡng da tay",
      level: "A2",
      context: "Sử dụng những mẫu câu này để gợi ý khách hàng dùng dầu biểu bì và kem dưỡng da tay tại nhà để giữ cho móng tay khỏe mạnh.",
      phrases: [
        {
          english: "Use cuticle oil every night.",
          vietnamese: "Sử dụng dầu biểu bì mỗi tối.",
          pronunciation: "yoo kyoo-ti-kl oil ev-ree nait",
        },
        {
          english: "Hand cream keeps hands soft.",
          vietnamese: "Kem dưỡng da tay giữ cho tay mềm mại.",
          pronunciation: "hand kreem keeps hands soft",
        },
        {
          english: "Healthy nails need daily care.",
          vietnamese: "Móng tay khỏe mạnh cần được chăm sóc hàng ngày.",
          pronunciation: "hel-thee nails need dei-lee care",
        },
      ],
      drill: [
        {
          id: "L42C01",
          type: "read",
          prompt: "Use cuticle oil every night.",
          hint: "Sử dụng dầu biểu bì mỗi tối.",
          answer: "Use cuticle oil every night.",
        },
        {
          id: "L42C02",
          type: "recall",
          prompt: "Sử dụng dầu biểu bì mỗi tối.",
          hint: "Nhớ lại câu tiếng Anh...",
          answer: "Use cuticle oil every night.",
        },
        {
          id: "L42C03",
          type: "read",
          prompt: "Hand cream keeps hands soft.",
          hint: "Kem dưỡng da tay giữ cho tay mềm mại.",
          answer: "Hand cream keeps hands soft.",
        },
        {
          id: "L42C04",
          type: "recall",
          prompt: "Kem dưỡng da tay giữ cho tay mềm mại.",
          hint: "Nhớ lại câu tiếng Anh...",
          answer: "Hand cream keeps hands soft.",
        },
        {
          id: "L42C05",
          type: "read",
          prompt: "Healthy nails need daily care.",
          hint: "Móng tay khỏe mạnh cần được chăm sóc hàng ngày.",
          answer: "Healthy nails need daily care.",
        },
        {
          id: "L42C06",
          type: "recall",
          prompt: "Móng tay khỏe mạnh cần được chăm sóc hàng ngày.",
          hint: "Nhớ lại câu tiếng Anh...",
          answer: "Healthy nails need daily care.",
        },
        {
          id: "L42C07",
          type: "fill",
          prompt: "Use cuticle oil ___ night.",
          hint: "Sử dụng dầu biểu bì mỗi tối.",
          answer: "every",
          answerHint: "Use cuticle oil every night.",
        },
        {
          id: "L42C08",
          type: "fill",
          prompt: "Hand cream keeps hands ___.",
          hint: "Kem dưỡng da tay giữ cho tay mềm mại.",
          answer: "soft",
          answerHint: "Hand cream keeps hands soft.",
        },
        {
          id: "L42C09",
          type: "fill",
          prompt: "Healthy nails need ___ care.",
          hint: "Móng tay khỏe mạnh cần được chăm sóc hàng ngày.",
          answer: "daily",
          answerHint: "Healthy nails need daily care.",
        },
        {
          id: "L42C10",
          type: "dialogue",
          prompt:
            "Worker: Your nails look great!\nCustomer: Thank you!\nWorker: Remember, use cuticle oil every night. Healthy nails need daily care.",
          hint: "Thợ: Móng tay của chị rất đẹp!\nKhách: Cảm ơn!\nThợ: Chị nhớ sử dụng dầu biểu bì mỗi tối nhé. Móng tay khỏe mạnh cần được chăm sóc hàng ngày.",
          answer:
            "Worker: Your nails look great!\nCustomer: Thank you!\nWorker: Remember, use cuticle oil every night. Healthy nails need daily care.",
        },
      ],
    },
  {
  id: "L54",
  title: "Gel Nails Safety",
  titleVi: "An Toàn Khi Làm Móng Gel",
  level: "B1",
  context: "Sử dụng những mẫu câu này để cảnh báo khách hàng về tác hại của đèn UV khi làm móng gel và cách bảo vệ da tay của họ.",
  phrases: [
    {
      english: "UV lamps can damage skin.",
      vietnamese: "Đèn UV có thể làm hại da.",
      pronunciation: "yoo-vee lamps kan da-mij skin"
    },
    {
      english: "Use sunscreen before the UV lamp.",
      vietnamese: "Hãy dùng kem chống nắng trước khi dùng đèn UV.",
      pronunciation: "yooz sun-skreen bee-for thuh yoo-vee lamp"
    },
    {
      english: "Moisturize your hands afterwards.",
      vietnamese: "Hãy dưỡng ẩm tay của bạn sau đó.",
      pronunciation: "mois-chuh-raiz yor hands af-ter-werdz"
    }
  ],
  drill: [
    {
      id: "L54C01",
      type: "read",
      prompt: "UV lamps can damage skin.",
      hint: "Đèn UV có thể làm hại da.",
      answer: "UV lamps can damage skin."
    },
    {
      id: "L54C02",
      type: "recall",
      prompt: "Đèn UV có thể làm hại da.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "UV lamps can damage skin."
    },
    {
      id: "L54C03",
      type: "read",
      prompt: "Use sunscreen before the UV lamp.",
      hint: "Hãy dùng kem chống nắng trước khi dùng đèn UV.",
      answer: "Use sunscreen before the UV lamp."
    },
    {
      id: "L54C04",
      type: "recall",
      prompt: "Hãy dùng kem chống nắng trước khi dùng đèn UV.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Use sunscreen before the UV lamp."
    },
    {
      id: "L54C05",
      type: "read",
      prompt: "Moisturize your hands afterwards.",
      hint: "Hãy dưỡng ẩm tay của bạn sau đó.",
      answer: "Moisturize your hands afterwards."
    },
    {
      id: "L54C06",
      type: "recall",
      prompt: "Hãy dưỡng ẩm tay của bạn sau đó.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Moisturize your hands afterwards."
    },
    {
      id: "L54C07",
      type: "fill",
      prompt: "UV lamps can ___ skin.",
      hint: "Đèn UV có thể làm hại da.",
      answer: "damage",
      answerHint: "UV lamps can damage skin."
    },
    {
      id: "L54C08",
      type: "fill",
      prompt: "Use ___ before the UV lamp.",
      hint: "Hãy dùng kem chống nắng trước khi dùng đèn UV.",
      answer: "sunscreen",
      answerHint: "Use sunscreen before the UV lamp."
    },
    {
      id: "L54C09",
      type: "fill",
      prompt: "___ your hands afterwards.",
      hint: "Hãy dưỡng ẩm tay của bạn sau đó.",
      answer: "Moisturize",
      answerHint: "Moisturize your hands afterwards."
    },
    {
      id: "L54C10",
      type: "dialogue",
      prompt: "Worker: Did you know UV lamps can damage skin?\nCustomer: No, I didn't.\nWorker: You should use sunscreen.",
      hint: "Thợ: Bạn có biết đèn UV có thể làm hại da không?\nKhách: Không, tôi không biết.\nThợ: Bạn nên dùng kem chống nắng.",
      answer: "Worker: Did you know UV lamps can damage skin?\nCustomer: No, I didn't.\nWorker: You should use sunscreen."
    }
  ]
},
  {
  id: "L55",
  title: "Safe Nail Removal",
  titleVi: "Tẩy Sơn Móng An Toàn",
  level: "B1",
  context: "Sử dụng những cụm từ này khi hướng dẫn khách hàng cách tẩy sơn gel hoặc acrylic tại nhà một cách an toàn.",
  phrases: [
    {
      english: "Don't peel them off.",
      vietnamese: "Đừng tự bóc chúng ra.",
      pronunciation: "dont peel them awf"
    },
    {
      english: "Soak your nails in acetone.",
      vietnamese: "Ngâm móng tay của bạn trong axeton.",
      pronunciation: "soak yor naylz in a-se-tone"
    },
    {
      english: "It prevents nail damage.",
      vietnamese: "Nó ngăn ngừa tổn thương móng.",
      pronunciation: "it pre-vents nayl da-mij"
    }
  ],
  drill: [
    {
      id: "L55C01",
      type: "read",
      prompt: "Don't peel them off.",
      hint: "Đừng tự bóc chúng ra.",
      answer: "Don't peel them off."
    },
    {
      id: "L55C02",
      type: "recall",
      prompt: "Đừng tự bóc chúng ra.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Don't peel them off."
    },
    {
      id: "L55C03",
      type: "read",
      prompt: "Soak your nails in acetone.",
      hint: "Ngâm móng tay của bạn trong axeton.",
      answer: "Soak your nails in acetone."
    },
    {
      id: "L55C04",
      type: "recall",
      prompt: "Ngâm móng tay của bạn trong axeton.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Soak your nails in acetone."
    },
    {
      id: "L55C05",
      type: "read",
      prompt: "It prevents nail damage.",
      hint: "Nó ngăn ngừa tổn thương móng.",
      answer: "It prevents nail damage."
    },
    {
      id: "L55C06",
      type: "recall",
      prompt: "Nó ngăn ngừa tổn thương móng.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It prevents nail damage."
    },
    {
      id: "L55C07",
      type: "fill",
      prompt: "Don't ___ them off.",
      hint: "Đừng tự bóc chúng ra.",
      answer: "peel",
      answerHint: "Don't peel them off."
    },
    {
      id: "L55C08",
      type: "fill",
      prompt: "Soak your nails in ___.",
      hint: "Ngâm móng tay của bạn trong axeton.",
      answer: "acetone",
      answerHint: "Soak your nails in acetone."
    },
    {
      id: "L55C09",
      type: "fill",
      prompt: "It prevents nail ___.",
      hint: "Nó ngăn ngừa tổn thương móng.",
      answer: "damage",
      answerHint: "It prevents nail damage."
    },
    {
      id: "L55C10",
      type: "dialogue",
      prompt: "Worker: How do you remove your gel?\nCustomer: I usually peel it off.\nWorker: Don't peel them off. It prevents nail damage.",
      hint: "Thợ: Bạn thường tẩy sơn gel như thế nào?\nKhách: Tôi thường tự bóc nó ra.\nThợ: Đừng tự bóc chúng ra. Nó ngăn ngừa tổn thương móng.",
      answer: "Worker: How do you remove your gel?\nCustomer: I usually peel it off.\nWorker: Don't peel them off. It prevents nail damage."
    }
  ]
},
  {
  id: "L56",
  title: "Nail Health Signs",
  titleVi: "Dấu Hiệu Móng Tay Khỏe Mạnh",
  level: "B1",
  context: "Sử dụng các cụm từ này khi bạn muốn nói về sức khỏe móng tay của mình hoặc của khách hàng.",
  phrases: [
    {
      english: "Discolored nails need attention.",
      vietnamese: "Móng tay đổi màu cần được chú ý.",
      pronunciation: "dis-kul-erd neylz need uh-ten-shun"
    },
    {
      english: "That could be a fungus.",
      vietnamese: "Cái đó có thể là nấm.",
      pronunciation: "that kud bee uh fung-gus"
    },
    {
      english: "See a doctor soon.",
      vietnamese: "Hãy đi khám bác sĩ sớm.",
      pronunciation: "see uh dok-tur soon"
    }
  ],
  drill: [
    {
      id: "L56C01",
      type: "read",
      prompt: "Discolored nails need attention.",
      hint: "Móng tay đổi màu cần được chú ý.",
      answer: "Discolored nails need attention."
    },
    {
      id: "L56C02",
      type: "recall",
      prompt: "Móng tay đổi màu cần được chú ý.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Discolored nails need attention."
    },
    {
      id: "L56C03",
      type: "read",
      prompt: "That could be a fungus.",
      hint: "Cái đó có thể là nấm.",
      answer: "That could be a fungus."
    },
    {
      id: "L56C04",
      type: "recall",
      prompt: "Cái đó có thể là nấm.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "That could be a fungus."
    },
    {
      id: "L56C05",
      type: "read",
      prompt: "See a doctor soon.",
      hint: "Hãy đi khám bác sĩ sớm.",
      answer: "See a doctor soon."
    },
    {
      id: "L56C06",
      type: "recall",
      prompt: "Hãy đi khám bác sĩ sớm.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "See a doctor soon."
    },
    {
      id: "L56C07",
      type: "fill",
      prompt: "___ nails need attention.",
      hint: "Móng tay đổi màu cần được chú ý.",
      answer: "Discolored",
      answerHint: "Discolored nails need attention."
    },
    {
      id: "L56C08",
      type: "fill",
      prompt: "That could be a ___.",
      hint: "Cái đó có thể là nấm.",
      answer: "fungus",
      answerHint: "That could be a fungus."
    },
    {
      id: "L56C09",
      type: "fill",
      prompt: "See a ___ soon.",
      hint: "Hãy đi khám bác sĩ sớm.",
      answer: "doctor",
      answerHint: "See a doctor soon."
    },
    {
      id: "L56C10",
      type: "dialogue",
      prompt: "Worker: Your nails look discolored.\nCustomer: Oh, really?\nWorker: You should see a doctor soon.",
      hint: "Thợ: Móng tay của bạn trông bị đổi màu.\nKhách: Ồ, vậy à?\nThợ: Bạn nên đi khám bác sĩ sớm.",
      answer: "Worker: Your nails look discolored.\nCustomer: Oh, really?\nWorker: You should see a doctor soon."
    }
  ]
}
  ],
};

export default nailCareTechniques;
