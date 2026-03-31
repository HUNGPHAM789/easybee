import type { Class } from '../types';

const consultation: Class = {
  id: "pmu-consultation",
  title: "Consultation",
  titleVi: "Tư Vấn Khách Hàng",
  lessons: [
  {
  id: "L49",
  title: "Greeting PMU Client",
  titleVi: "Chào Khách Hàng PMU",
  level: "A1",
  context: "Sử dụng những mẫu câu này để chào khách hàng PMU và hỏi họ muốn làm dịch vụ gì.",
  phrases: [
    {
      english: "Hello! Welcome!",
      vietnamese: "Xin chào! Mừng bạn đến!",
      pronunciation: "Heh-loh! Wel-kuhm!"
    },
    {
      english: "What service do you want?",
      vietnamese: "Bạn muốn làm dịch vụ gì?",
      pronunciation: "Wot sur-viss doo yoo wawnt?"
    },
    {
      english: "Microblading, lips, or eyeliner?",
      vietnamese: "Điêu khắc chân mày, môi, hay là mí mắt?",
      pronunciation: "Mai-kroh-blei-ding, lips, or ai-lai-ner?"
    }
  ],
  drill: [
    { id: "L49C01", type: "read", prompt: "Hello! Welcome!", hint: "Xin chào! Mừng bạn đến!", answer: "Hello! Welcome!" },
    { id: "L49C02", type: "recall", prompt: "Xin chào! Mừng bạn đến!", hint: "Nhớ lại câu tiếng Anh...", answer: "Hello! Welcome!" },
    { id: "L49C03", type: "read", prompt: "What service do you want?", hint: "Bạn muốn làm dịch vụ gì?", answer: "What service do you want?" },
    { id: "L49C04", type: "recall", prompt: "Bạn muốn làm dịch vụ gì?", hint: "Nhớ lại câu tiếng Anh...", answer: "What service do you want?" },
    { id: "L49C05", type: "read", prompt: "Microblading, lips, or eyeliner?", hint: "Điêu khắc chân mày, môi, hay là mí mắt?", answer: "Microblading, lips, or eyeliner?" },
    { id: "L49C06", type: "recall", prompt: "Điêu khắc chân mày, môi, hay là mí mắt?", hint: "Nhớ lại câu tiếng Anh...", answer: "Microblading, lips, or eyeliner?" },
    { id: "L49C07", type: "fill", prompt: "Hello! ___!", hint: "Xin chào! Mừng bạn đến!", answer: "Welcome", answerHint: "Hello! Welcome!" },
    { id: "L49C08", type: "fill", prompt: "What service do you ___?", hint: "Bạn muốn làm dịch vụ gì?", answer: "want", answerHint: "What service do you want?" },
    { id: "L49C09", type: "fill", prompt: "Microblading, lips, or ___?", hint: "Điêu khắc chân mày, môi, hay là mí mắt?", answer: "eyeliner", answerHint: "Microblading, lips, or eyeliner?" },
    { id: "L49C10", type: "dialogue", prompt: "Worker: Hello! Welcome!\nCustomer: Hello.\nWorker: What service do you want?\nCustomer: Microblading, please.", hint: "Thợ: Xin chào! Mừng bạn đến!\nKhách: Xin chào.\nThợ: Bạn muốn làm dịch vụ gì?\nKhách: Làm điêu khắc chân mày.", answer: "Worker: Hello! Welcome!\nCustomer: Hello.\nWorker: What service do you want?\nCustomer: Microblading, please." }
  ]
},
{
  id: "L50",
  title: "Brow Shapes",
  titleVi: "Các Dáng Lông Mày",
  level: "A1",
  context: "Sử dụng những mẫu câu này khi bạn tư vấn cho khách hàng về dáng lông mày.",
  phrases: [
    { english: "Natural arch.", vietnamese: "Dáng vòng cung tự nhiên.", pronunciation: "Na-chuh-ruhl arch." },
    { english: "Straight brows.", vietnamese: "Dáng lông mày ngang.", pronunciation: "Straight brauz." },
    { english: "Soft and fluffy.", vietnamese: "Mềm mại và tự nhiên.", pronunciation: "Soft and fla-fee." }
  ],
  drill: [
    { id: "L50C01", type: "read", prompt: "Natural arch.", hint: "Dáng vòng cung tự nhiên.", answer: "Natural arch." },
    { id: "L50C02", type: "recall", prompt: "Dáng vòng cung tự nhiên.", hint: "Nhớ lại câu tiếng Anh...", answer: "Natural arch." },
    { id: "L50C03", type: "read", prompt: "Straight brows.", hint: "Dáng lông mày ngang.", answer: "Straight brows." },
    { id: "L50C04", type: "recall", prompt: "Dáng lông mày ngang.", hint: "Nhớ lại câu tiếng Anh...", answer: "Straight brows." },
    { id: "L50C05", type: "read", prompt: "Soft and fluffy.", hint: "Mềm mại và tự nhiên.", answer: "Soft and fluffy." },
    { id: "L50C06", type: "recall", prompt: "Mềm mại và tự nhiên.", hint: "Nhớ lại câu tiếng Anh...", answer: "Soft and fluffy." },
    { id: "L50C07", type: "fill", prompt: "I like a ___ arch.", hint: "Tôi thích dáng vòng cung tự nhiên.", answer: "natural", answerHint: "I like a natural arch." },
    { id: "L50C08", type: "fill", prompt: "Do you want ___ brows?", hint: "Bạn có muốn dáng lông mày ngang không?", answer: "straight", answerHint: "Do you want straight brows?" },
    { id: "L50C09", type: "fill", prompt: "Make them ___ and fluffy.", hint: "Làm cho chúng mềm mại và tự nhiên.", answer: "soft", answerHint: "Make them soft and fluffy." },
    { id: "L50C10", type: "dialogue", prompt: "Worker: What brow shape do you like?\nCustomer: I want a natural arch.\nWorker: Okay, and very soft and fluffy?", hint: "Thợ: Bạn thích dáng lông mày nào?\nKhách: Tôi muốn dáng vòng cung tự nhiên.\nThợ: Được rồi, và rất mềm mại và tự nhiên phải không?", answer: "Worker: What brow shape do you like?\nCustomer: I want a natural arch.\nWorker: Okay, and very soft and fluffy?" }
  ]
},
{
  id: "L51",
  title: "Lip Colors",
  titleVi: "Màu Sắc Môi",
  level: "A1",
  context: "Học cách nói về các màu môi khác nhau khi khách hàng hỏi về phun xăm môi.",
  phrases: [
    { english: "Nude pink, please.", vietnamese: "Màu hồng nude, làm ơn.", pronunciation: "Nood pink, pleez." },
    { english: "Coral is very natural.", vietnamese: "Màu san hô rất tự nhiên.", pronunciation: "Kor-uhl iz veh-ree na-chur-uhl." },
    { english: "I like berry color.", vietnamese: "Tôi thích màu berry.", pronunciation: "Ai laik beh-ree kuh-ler." }
  ],
  drill: [
    { id: "L51C01", type: "read", prompt: "Nude pink, please.", hint: "Màu hồng nude, làm ơn.", answer: "Nude pink, please." },
    { id: "L51C02", type: "recall", prompt: "Màu hồng nude, làm ơn.", hint: "Nhớ lại câu tiếng Anh...", answer: "Nude pink, please." },
    { id: "L51C03", type: "read", prompt: "Coral is very natural.", hint: "Màu san hô rất tự nhiên.", answer: "Coral is very natural." },
    { id: "L51C04", type: "recall", prompt: "Màu san hô rất tự nhiên.", hint: "Nhớ lại câu tiếng Anh...", answer: "Coral is very natural." },
    { id: "L51C05", type: "read", prompt: "I like berry color.", hint: "Tôi thích màu berry.", answer: "I like berry color." },
    { id: "L51C06", type: "recall", prompt: "Tôi thích màu berry.", hint: "Nhớ lại câu tiếng Anh...", answer: "I like berry color." },
    { id: "L51C07", type: "fill", prompt: "___ pink, please.", hint: "Màu hồng nude, làm ơn.", answer: "Nude", answerHint: "Nude pink, please." },
    { id: "L51C08", type: "fill", prompt: "Coral is very ___.", hint: "Màu san hô rất tự nhiên.", answer: "natural", answerHint: "Coral is very natural." },
    { id: "L51C09", type: "fill", prompt: "I like ___ color.", hint: "Tôi thích màu berry.", answer: "berry", answerHint: "I like berry color." },
    { id: "L51C10", type: "dialogue", prompt: "Worker: What lip color do you want?\nCustomer: Nude pink, please.\nWorker: Coral is very natural too!", hint: "Thợ: Bạn muốn màu môi gì?\nKhách: Màu hồng nude, làm ơn.\nThợ: Màu san hô cũng rất tự nhiên!", answer: "Worker: What lip color do you want?\nCustomer: Nude pink, please.\nWorker: Coral is very natural too!" }
  ]
},
{
  id: "L52",
  title: "Allergies and Medical History",
  titleVi: "Hỏi về Dị Ứng và Tiền Sử Bệnh",
  level: "A2",
  context: "Sử dụng những mẫu câu này để hỏi khách hàng về dị ứng và tiền sử bệnh trước khi làm phun xăm thẩm mỹ.",
  phrases: [
    { english: "Are you pregnant?", vietnamese: "Bạn có đang mang thai không?", pronunciation: "Ar yoo preg-nant?" },
    { english: "Do you have allergies?", vietnamese: "Bạn có bị dị ứng gì không?", pronunciation: "Doo yoo hav al-er-jeez?" },
    { english: "Do you take blood thinners?", vietnamese: "Bạn có uống thuốc làm loãng máu không?", pronunciation: "Doo yoo tayk blud thin-ers?" }
  ],
  drill: [
    { id: "L52C01", type: "read", prompt: "Are you pregnant?", hint: "Bạn có đang mang thai không?", answer: "Are you pregnant?" },
    { id: "L52C02", type: "recall", prompt: "Bạn có đang mang thai không?", hint: "Nhớ lại câu tiếng Anh...", answer: "Are you pregnant?" },
    { id: "L52C03", type: "read", prompt: "Do you have allergies?", hint: "Bạn có bị dị ứng gì không?", answer: "Do you have allergies?" },
    { id: "L52C04", type: "recall", prompt: "Bạn có bị dị ứng gì không?", hint: "Nhớ lại câu tiếng Anh...", answer: "Do you have allergies?" },
    { id: "L52C05", type: "read", prompt: "Do you take blood thinners?", hint: "Bạn có uống thuốc làm loãng máu không?", answer: "Do you take blood thinners?" },
    { id: "L52C06", type: "recall", prompt: "Bạn có uống thuốc làm loãng máu không?", hint: "Nhớ lại câu tiếng Anh...", answer: "Do you take blood thinners?" },
    { id: "L52C07", type: "fill", prompt: "Are you ___?", hint: "Bạn có đang mang thai không?", answer: "pregnant", answerHint: "Are you pregnant?" },
    { id: "L52C08", type: "fill", prompt: "Do you have ___?", hint: "Bạn có bị dị ứng gì không?", answer: "allergies", answerHint: "Do you have allergies?" },
    { id: "L52C09", type: "fill", prompt: "Do you take blood ___?", hint: "Bạn có uống thuốc làm loãng máu không?", answer: "thinners", answerHint: "Do you take blood thinners?" },
    { id: "L52C10", type: "dialogue", prompt: "Worker: Hello! Do you have allergies?\nCustomer: No, I don't.\nWorker: Do you take blood thinners?", hint: "Thợ: Xin chào! Bạn có bị dị ứng gì không?\nKhách: Không, tôi không bị.\nThợ: Bạn có uống thuốc làm loãng máu không?", answer: "Worker: Hello! Do you have allergies?\nCustomer: No, I don't.\nWorker: Do you take blood thinners?" }
  ]
},
{
  id: "L53",
  title: "Permanent Makeup: Setting Expectations",
  titleVi: "Trang Điểm Vĩnh Viễn: Đặt Kỳ Vọng",
  level: "A2",
  context: "Sử dụng những câu này để giải thích cho khách hàng về quá trình hồi phục sau khi làm trang điểm vĩnh viễn.",
  phrases: [
    { english: "The color will fade.", vietnamese: "Màu sẽ nhạt đi.", pronunciation: "Thuh KUH-ler wil feyd." },
    { english: "You need a touch-up.", vietnamese: "Bạn cần dặm lại.", pronunciation: "Yoo need uh tuhch-uhp." },
    { english: "It looks dark at first.", vietnamese: "Ban đầu nó trông đậm.", pronunciation: "It luhks dark at furst." }
  ],
  drill: [
    { id: "L53C01", type: "read", prompt: "The color will fade.", hint: "Màu sẽ nhạt đi.", answer: "The color will fade." },
    { id: "L53C02", type: "recall", prompt: "Màu sẽ nhạt đi.", hint: "Nhớ lại câu tiếng Anh...", answer: "The color will fade." },
    { id: "L53C03", type: "read", prompt: "You need a touch-up.", hint: "Bạn cần dặm lại.", answer: "You need a touch-up." },
    { id: "L53C04", type: "recall", prompt: "Bạn cần dặm lại.", hint: "Nhớ lại câu tiếng Anh...", answer: "You need a touch-up." },
    { id: "L53C05", type: "read", prompt: "It looks dark at first.", hint: "Ban đầu nó trông đậm.", answer: "It looks dark at first." },
    { id: "L53C06", type: "recall", prompt: "Ban đầu nó trông đậm.", hint: "Nhớ lại câu tiếng Anh...", answer: "It looks dark at first." },
    { id: "L53C07", type: "fill", prompt: "The color will ___.", hint: "Màu sẽ nhạt đi.", answer: "fade", answerHint: "The color will fade." },
    { id: "L53C08", type: "fill", prompt: "You need a ___.", hint: "Bạn cần dặm lại.", answer: "touch-up", answerHint: "You need a touch-up." },
    { id: "L53C09", type: "fill", prompt: "It looks ___ at first.", hint: "Ban đầu nó trông đậm.", answer: "dark", answerHint: "It looks dark at first." },
    { id: "L53C10", type: "dialogue", prompt: "Worker: Your eyebrows look great! But it looks dark at first.\nCustomer: Oh, really? Will it stay this dark?\nWorker: No, the color will fade. You need a touch-up in a few weeks.", hint: "Thợ: Lông mày của bạn trông rất đẹp! Nhưng ban đầu nó trông đậm.\nKhách: Ồ, thật sao? Nó sẽ đậm như thế này sao?\nThợ: Không, màu sẽ nhạt đi. Bạn cần dặm lại sau vài tuần.", answer: "Worker: Your eyebrows look great! But it looks dark at first.\nCustomer: Oh, really? Will it stay this dark?\nWorker: No, the color will fade. You need a touch-up in a few weeks." }
  ]
},
{
  id: "L69",
  title: "Showing Your PMU Work",
  titleVi: "Giới Thiệu Ảnh Portfolio PMU",
  level: "A2",
  context: "Sử dụng những mẫu câu này khi bạn muốn cho khách hàng xem những tác phẩm PMU trước đây của bạn.",
  phrases: [
    {
      english: "Here is my work.",
      vietnamese: "Đây là tác phẩm của tôi.",
      pronunciation: "heer iz mai wurk"
    },
    {
      english: "This is an example.",
      vietnamese: "Đây là một ví dụ.",
      pronunciation: "this iz an eg-zam-pul"
    },
    {
      english: "What do you think?",
      vietnamese: "Bạn thấy thế nào?",
      pronunciation: "wuht doo yoo think"
    }
  ],
  drill: [
    {
      id: "L69C01",
      type: "read",
      prompt: "Here is my work.",
      hint: "Đây là tác phẩm của tôi.",
      answer: "Here is my work."
    },
    {
      id: "L69C02",
      type: "recall",
      prompt: "Đây là tác phẩm của tôi.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Here is my work."
    },
    {
      id: "L69C03",
      type: "read",
      prompt: "This is an example.",
      hint: "Đây là một ví dụ.",
      answer: "This is an example."
    },
    {
      id: "L69C04",
      type: "recall",
      prompt: "Đây là một ví dụ.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "This is an example."
    },
    {
      id: "L69C05",
      type: "read",
      prompt: "What do you think?",
      hint: "Bạn thấy thế nào?",
      answer: "What do you think?"
    },
    {
      id: "L69C06",
      type: "recall",
      prompt: "Bạn thấy thế nào?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What do you think?"
    },
    {
      id: "L69C07",
      type: "fill",
      prompt: "Here is my ___.",
      hint: "Đây là tác phẩm của tôi.",
      answer: "work",
      answerHint: "Here is my work."
    },
    {
      id: "L69C08",
      type: "fill",
      prompt: "This is an ___.",
      hint: "Đây là một ví dụ.",
      answer: "example",
      answerHint: "This is an example."
    },
    {
      id: "L69C09",
      type: "fill",
      prompt: "What do you ___?",
      hint: "Bạn thấy thế nào?",
      answer: "think",
      answerHint: "What do you think?"
    },
    {
      id: "L69C10",
      type: "dialogue",
      prompt: "Worker: Here is my work. This is an example.\nCustomer: It looks good!\nWorker: What do you think?",
      hint: "Thợ: Đây là tác phẩm của tôi. Đây là một ví dụ.\nKhách: Trông đẹp đó!\nThợ: Bạn thấy thế nào?",
      answer: "Worker: Here is my work. This is an example.\nCustomer: It looks good!\nWorker: What do you think?"
    }
  ]
},
  {
  id: "L70",
  title: "Natural or Bold Brows?",
  titleVi: "Lông mày tự nhiên hay đậm?",
  level: "B1",
  context: "Sử dụng những mẫu câu này để hiểu rõ hơn về mong muốn của khách hàng về kiểu dáng lông mày.",
  phrases: [
    {
      english: "Do you want them natural?",
      vietnamese: "Bạn muốn chúng trông tự nhiên không?",
      pronunciation: "doo yoo wont them na-chur-al"
    },
    {
      english: "How bold do you want them?",
      vietnamese: "Bạn muốn chúng đậm đến mức nào?",
      pronunciation: "how bold doo yoo wont them"
    },
    {
      english: "Like the Instagram brow?",
      vietnamese: "Giống kiểu lông mày trên Instagram không?",
      pronunciation: "like the in-sta-gram brow"
    }
  ],
  drill: [
    {
      id: "L70C01",
      type: "read",
      prompt: "Do you want them natural?",
      hint: "Bạn muốn chúng trông tự nhiên không?",
      answer: "Do you want them natural?"
    },
    {
      id: "L70C02",
      type: "recall",
      prompt: "Bạn muốn chúng trông tự nhiên không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Do you want them natural?"
    },
    {
      id: "L70C03",
      type: "read",
      prompt: "How bold do you want them?",
      hint: "Bạn muốn chúng đậm đến mức nào?",
      answer: "How bold do you want them?"
    },
    {
      id: "L70C04",
      type: "recall",
      prompt: "Bạn muốn chúng đậm đến mức nào?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "How bold do you want them?"
    },
    {
      id: "L70C05",
      type: "read",
      prompt: "Like the Instagram brow?",
      hint: "Giống kiểu lông mày trên Instagram không?",
      answer: "Like the Instagram brow?"
    },
    {
      id: "L70C06",
      type: "recall",
      prompt: "Giống kiểu lông mày trên Instagram không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Like the Instagram brow?"
    },
    {
      id: "L70C07",
      type: "fill",
      prompt: "Do you want them ___?",
      hint: "Bạn muốn chúng trông tự nhiên không?",
      answer: "natural",
      answerHint: "Do you want them natural?"
    },
    {
      id: "L70C08",
      type: "fill",
      prompt: "How ___ do you want them?",
      hint: "Bạn muốn chúng đậm đến mức nào?",
      answer: "bold",
      answerHint: "How bold do you want them?"
    },
    {
      id: "L70C09",
      type: "fill",
      prompt: "Like the ___ brow?",
      hint: "Giống kiểu lông mày trên Instagram không?",
      answer: "Instagram",
      answerHint: "Like the Instagram brow?"
    },
    {
      id: "L70C10",
      type: "dialogue",
      prompt: "Worker: Do you want them natural?\nCustomer: Yes, very natural.\nWorker: Okay, I understand.",
      hint: "Thợ: Bạn muốn chúng trông tự nhiên không?\nKhách: Vâng, rất tự nhiên.\nThợ: Được rồi, tôi hiểu.",
      answer: "Worker: Do you want them natural?\nCustomer: Yes, very natural.\nWorker: Okay, I understand."
    }
  ]
},
  {
  id: "L71",
  title: "Brow Shapes for Faces",
  titleVi: "Dáng lông mày cho khuôn mặt",
  level: "B1",
  context: "Sử dụng những mẫu câu này khi bạn muốn tư vấn cho khách hàng về dáng lông mày phù hợp với khuôn mặt của họ.",
  phrases: [
    {
      english: "Angled brows suit round faces.",
      vietnamese: "Lông mày góc cạnh hợp với khuôn mặt tròn.",
      pronunciation: "ang-guld browz soot rownd fay-sez"
    },
    {
      english: "Soft arches flatter oval faces.",
      vietnamese: "Dáng vòng cung nhẹ nhàng tôn lên khuôn mặt trái xoan.",
      pronunciation: "soft arch-ez flat-er oh-vul fay-sez"
    },
    {
      english: "Flat brows shorten long faces.",
      vietnamese: "Lông mày ngang giúp khuôn mặt dài trông ngắn hơn.",
      pronunciation: "flat browz short-en long fay-sez"
    }
  ],
  drill: [
    {
      id: "L71C01",
      type: "read",
      prompt: "Angled brows suit round faces.",
      hint: "Lông mày góc cạnh hợp với khuôn mặt tròn.",
      answer: "Angled brows suit round faces."
    },
    {
      id: "L71C02",
      type: "recall",
      prompt: "Lông mày góc cạnh hợp với khuôn mặt tròn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Angled brows suit round faces."
    },
    {
      id: "L71C03",
      type: "read",
      prompt: "Soft arches flatter oval faces.",
      hint: "Dáng vòng cung nhẹ nhàng tôn lên khuôn mặt trái xoan.",
      answer: "Soft arches flatter oval faces."
    },
    {
      id: "L71C04",
      type: "recall",
      prompt: "Dáng vòng cung nhẹ nhàng tôn lên khuôn mặt trái xoan.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Soft arches flatter oval faces."
    },
    {
      id: "L71C05",
      type: "read",
      prompt: "Flat brows shorten long faces.",
      hint: "Lông mày ngang giúp khuôn mặt dài trông ngắn hơn.",
      answer: "Flat brows shorten long faces."
    },
    {
      id: "L71C06",
      type: "recall",
      prompt: "Lông mày ngang giúp khuôn mặt dài trông ngắn hơn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Flat brows shorten long faces."
    },
    {
      id: "L71C07",
      type: "fill",
      prompt: "___ brows suit round faces.",
      hint: "Lông mày góc cạnh hợp với khuôn mặt tròn.",
      answer: "Angled",
      answerHint: "Angled brows suit round faces."
    },
    {
      id: "L71C08",
      type: "fill",
      prompt: "Soft arches flatter ___ faces.",
      hint: "Dáng vòng cung nhẹ nhàng tôn lên khuôn mặt trái xoan.",
      answer: "oval",
      answerHint: "Soft arches flatter oval faces."
    },
    {
      id: "L71C09",
      type: "fill",
      prompt: "Flat brows ___ long faces.",
      hint: "Lông mày ngang giúp khuôn mặt dài trông ngắn hơn.",
      answer: "shorten",
      answerHint: "Flat brows shorten long faces."
    },
    {
      id: "L71C10",
      type: "dialogue",
      prompt: "Worker: What shape is your face?\nCustomer: I think it's round.\nWorker: Angled brows would look great!",
      hint: "Thợ: Khuôn mặt của chị dáng gì ạ?\nKhách: Tôi nghĩ là mặt tròn.\nThợ: Dáng lông mày góc cạnh sẽ rất hợp với chị!",
      answer: "Worker: What shape is your face?\nCustomer: I think it's round.\nWorker: Angled brows would look great!"
    }
  ]
},
  {
  id: "L72",
  title: "Managing Client Expectations",
  titleVi: "Quản Lý Kỳ Vọng Khách Hàng",
  level: "B2",
  context: "Sử dụng các mẫu câu này khi khách hàng đưa hình ảnh và muốn có kiểu dáng y hệt, nhưng bạn biết điều đó có thể không thực hiện được.",
  phrases: [
    {
      english: "Let's see what's possible.",
      vietnamese: "Để tôi xem điều gì có thể thực hiện được.",
      pronunciation: "lets see wots pah-suh-bul"
    },
    {
      english: "That look might be difficult.",
      vietnamese: "Kiểu dáng đó có thể hơi khó.",
      pronunciation: "that look mite bee dih-fih-kult"
    },
    {
      english: "I can adapt it for you.",
      vietnamese: "Tôi có thể điều chỉnh nó cho bạn.",
      pronunciation: "ai kan uh-dapt it for yoo"
    }
  ],
  drill: [
    {
      id: "L72C01",
      type: "read",
      prompt: "Let's see what's possible.",
      hint: "Để tôi xem điều gì có thể thực hiện được.",
      answer: "Let's see what's possible."
    },
    {
      id: "L72C02",
      type: "recall",
      prompt: "Để tôi xem điều gì có thể thực hiện được.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Let's see what's possible."
    },
    {
      id: "L72C03",
      type: "read",
      prompt: "That look might be difficult.",
      hint: "Kiểu dáng đó có thể hơi khó.",
      answer: "That look might be difficult."
    },
    {
      id: "L72C04",
      type: "recall",
      prompt: "Kiểu dáng đó có thể hơi khó.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "That look might be difficult."
    },
    {
      id: "L72C05",
      type: "read",
      prompt: "I can adapt it for you.",
      hint: "Tôi có thể điều chỉnh nó cho bạn.",
      answer: "I can adapt it for you."
    },
    {
      id: "L72C06",
      type: "recall",
      prompt: "Tôi có thể điều chỉnh nó cho bạn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "I can adapt it for you."
    },
    {
      id: "L72C07",
      type: "fill",
      prompt: "Let's see what's ___.",
      hint: "Để tôi xem điều gì có thể thực hiện được.",
      answer: "possible",
      answerHint: "Let's see what's possible."
    },
    {
      id: "L72C08",
      type: "fill",
      prompt: "That look might be ___.",
      hint: "Kiểu dáng đó có thể hơi khó.",
      answer: "difficult",
      answerHint: "That look might be difficult."
    },
    {
      id: "L72C09",
      type: "fill",
      prompt: "I can ___ it for you.",
      hint: "Tôi có thể điều chỉnh nó cho bạn.",
      answer: "adapt",
      answerHint: "I can adapt it for you."
    },
    {
      id: "L72C10",
      type: "dialogue",
      prompt: "Worker: Can I see the photo?\nCustomer: I want exactly this.\nWorker: Let's see what's possible.",
      hint: "Thợ: Cho tôi xem ảnh được không?\nKhách: Tôi muốn y hệt như thế này.\nThợ: Để tôi xem điều gì có thể thực hiện được.",
      answer: "Worker: Can I see the photo?\nCustomer: I want exactly this.\nWorker: Let's see what's possible."
    }
  ]
},
  {
  id: "L103",
  title: "Greeting PMU Clients",
  titleVi: "Chào Khách Hàng PMU",
  level: "A1",
  context: "Sử dụng những mẫu câu này để chào khách hàng và hỏi về dịch vụ họ muốn làm đẹp.",
  phrases: [
    {
      english: "Hello, welcome! How can I help?",
      vietnamese: "Xin chào, mừng bạn đến! Tôi có thể giúp gì?",
      pronunciation: "he-LOW, WEL-kum! How kan ai HELP?"
    },
    {
      english: "What service are you interested in?",
      vietnamese: "Bạn quan tâm đến dịch vụ nào?",
      pronunciation: "Wot SER-vis ar yoo IN-treh-sted in?"
    },
    {
      english: "Microblading, lip blush, or eyeliner?",
      vietnamese: "Điêu khắc chân mày, phun môi, hay kẻ mắt nước?",
      pronunciation: "MAI-kroh-blay-ding, lip blush, or AI-lai-ner?"
    }
  ],
  drill: [
    {
      id: "L103C01",
      type: "read",
      prompt: "Hello, welcome! How can I help?",
      hint: "Xin chào, mừng bạn đến! Tôi có thể giúp gì?",
      answer: "Hello, welcome! How can I help?"
    },
    {
      id: "L103C02",
      type: "recall",
      prompt: "Xin chào, mừng bạn đến! Tôi có thể giúp gì?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Hello, welcome! How can I help?"
    },
    {
      id: "L103C03",
      type: "read",
      prompt: "What service are you interested in?",
      hint: "Bạn quan tâm đến dịch vụ nào?",
      answer: "What service are you interested in?"
    },
    {
      id: "L103C04",
      type: "recall",
      prompt: "Bạn quan tâm đến dịch vụ nào?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What service are you interested in?"
    },
    {
      id: "L103C05",
      type: "read",
      prompt: "Microblading, lip blush, or eyeliner?",
      hint: "Điêu khắc chân mày, phun môi, hay kẻ mắt nước?",
      answer: "Microblading, lip blush, or eyeliner?"
    },
    {
      id: "L103C06",
      type: "recall",
      prompt: "Điêu khắc chân mày, phun môi, hay kẻ mắt nước?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Microblading, lip blush, or eyeliner?"
    },
    {
      id: "L103C07",
      type: "fill",
      prompt: "Hello, welcome! How can I ___?",
      hint: "Xin chào, mừng bạn đến! Tôi có thể giúp gì?",
      answer: "help",
      answerHint: "Hello, welcome! How can I help?"
    },
    {
      id: "L103C08",
      type: "fill",
      prompt: "What ___ are you interested in?",
      hint: "Bạn quan tâm đến dịch vụ nào?",
      answer: "service",
      answerHint: "What service are you interested in?"
    },
    {
      id: "L103C09",
      type: "fill",
      prompt: "___, lip blush, or eyeliner?",
      hint: "Điêu khắc chân mày, phun môi, hay kẻ mắt nước?",
      answer: "Microblading",
      answerHint: "Microblading, lip blush, or eyeliner?"
    },
    {
      id: "L103C10",
      type: "dialogue",
      prompt: "Worker: Hello, welcome! How can I help?\nCustomer: I want lip blush.\nWorker: Okay, let's get started.",
      hint: "Thợ: Xin chào, mừng bạn đến! Tôi có thể giúp gì?\nKhách: Tôi muốn phun môi.\nThợ: Được rồi, chúng ta bắt đầu thôi.",
      answer: "Worker: Hello, welcome! How can I help?\nCustomer: I want lip blush.\nWorker: Okay, let's get started."
    }
  ]
},
  {
  id: "L104",
  title: "Lip Color Choices",
  titleVi: "Chọn Màu Môi",
  level: "A1",
  context: "Sử dụng những mẫu câu này khi bạn giúp khách hàng chọn màu xăm môi.",
  phrases: [
    {
      english: "Nude, pink, or coral?",
      vietnamese: "Màu nude, hồng, hay san hô?",
      pronunciation: "nood, pink, or ko-ral?"
    },
    {
      english: "What shade do you like?",
      vietnamese: "Bạn thích tông màu nào?",
      pronunciation: "wot shade doo yoo like?"
    },
    {
      english: "Berry is very popular.",
      vietnamese: "Màu berry rất được ưa chuộng.",
      pronunciation: "be-ree iz ve-ree pop-yoo-lar"
    }
  ],
  drill: [
    {
      id: "L104C01",
      type: "read",
      prompt: "Nude, pink, or coral?",
      hint: "Màu nude, hồng, hay san hô?",
      answer: "Nude, pink, or coral?"
    },
    {
      id: "L104C02",
      type: "recall",
      prompt: "Màu nude, hồng, hay san hô?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Nude, pink, or coral?"
    },
    {
      id: "L104C03",
      type: "read",
      prompt: "What shade do you like?",
      hint: "Bạn thích tông màu nào?",
      answer: "What shade do you like?"
    },
    {
      id: "L104C04",
      type: "recall",
      prompt: "Bạn thích tông màu nào?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What shade do you like?"
    },
    {
      id: "L104C05",
      type: "read",
      prompt: "Berry is very popular.",
      hint: "Màu berry rất được ưa chuộng.",
      answer: "Berry is very popular."
    },
    {
      id: "L104C06",
      type: "recall",
      prompt: "Màu berry rất được ưa chuộng.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Berry is very popular."
    },
    {
      id: "L104C07",
      type: "fill",
      prompt: "___, pink, or coral?",
      hint: "Màu nude, hồng, hay san hô?",
      answer: "Nude",
      answerHint: "Nude, pink, or coral?"
    },
    {
      id: "L104C08",
      type: "fill",
      prompt: "What ___ do you like?",
      hint: "Bạn thích tông màu nào?",
      answer: "shade",
      answerHint: "What shade do you like?"
    },
    {
      id: "L104C09",
      type: "fill",
      prompt: "Berry is very ___.",
      hint: "Màu berry rất được ưa chuộng.",
      answer: "popular",
      answerHint: "Berry is very popular."
    },
    {
      id: "L104C10",
      type: "dialogue",
      prompt: "Worker: What shade do you like?\nCustomer: I like pink.\nWorker: Nude pink, or bright pink?",
      hint: "Thợ: Bạn thích tông màu nào?\nKhách: Tôi thích màu hồng.\nThợ: Hồng nude, hay hồng tươi?",
      answer: "Worker: What shade do you like?\nCustomer: I like pink.\nWorker: Nude pink, or bright pink?"
    }
  ]
},
  {
  id: "L105",
  title: "Makeup: Allergies and Health",
  titleVi: "Trang điểm: Dị ứng và Sức khỏe",
  level: "A2",
  context: "Sử dụng những mẫu câu này để hỏi khách hàng về dị ứng và tiền sử bệnh trước khi làm trang điểm vĩnh viễn.",
  phrases: [
    {
      english: "Do you have allergies?",
      vietnamese: "Bạn có bị dị ứng gì không?",
      pronunciation: "doo yoo hav al-er-jeez?"
    },
    {
      english: "Are you taking blood thinners?",
      vietnamese: "Bạn có đang dùng thuốc làm loãng máu không?",
      pronunciation: "ar yoo tay-king blud thin-ers?"
    },
    {
      english: "Are you pregnant?",
      vietnamese: "Bạn có đang mang thai không?",
      pronunciation: "ar yoo preg-nant?"
    }
  ],
  drill: [
    {
      id: "L105C01",
      type: "read",
      prompt: "Do you have allergies?",
      hint: "Bạn có bị dị ứng gì không?",
      answer: "Do you have allergies?"
    },
    {
      id: "L105C02",
      type: "recall",
      prompt: "Bạn có bị dị ứng gì không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Do you have allergies?"
    },
    {
      id: "L105C03",
      type: "read",
      prompt: "Are you taking blood thinners?",
      hint: "Bạn có đang dùng thuốc làm loãng máu không?",
      answer: "Are you taking blood thinners?"
    },
    {
      id: "L105C04",
      type: "recall",
      prompt: "Bạn có đang dùng thuốc làm loãng máu không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Are you taking blood thinners?"
    },
    {
      id: "L105C05",
      type: "read",
      prompt: "Are you pregnant?",
      hint: "Bạn có đang mang thai không?",
      answer: "Are you pregnant?"
    },
    {
      id: "L105C06",
      type: "recall",
      prompt: "Bạn có đang mang thai không?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Are you pregnant?"
    },
    {
      id: "L105C07",
      type: "fill",
      prompt: "Do you have ___?",
      hint: "Bạn có bị dị ứng gì không?",
      answer: "allergies",
      answerHint: "Do you have allergies?"
    },
    {
      id: "L105C08",
      type: "fill",
      prompt: "Are you taking blood ___?",
      hint: "Bạn có đang dùng thuốc làm loãng máu không?",
      answer: "thinners",
      answerHint: "Are you taking blood thinners?"
    },
    {
      id: "L105C09",
      type: "fill",
      prompt: "Are you ___?",
      hint: "Bạn có đang mang thai không?",
      answer: "pregnant",
      answerHint: "Are you pregnant?"
    },
    {
      id: "L105C10",
      type: "dialogue",
      prompt: "Worker: Do you have allergies?\nCustomer: No, I don't.\nWorker: Are you taking blood thinners?",
      hint: "Thợ: Bạn có bị dị ứng gì không?\nKhách: Không, tôi không bị.\nThợ: Bạn có đang dùng thuốc làm loãng máu không?",
      answer: "Worker: Do you have allergies?\nCustomer: No, I don't.\nWorker: Are you taking blood thinners?"
    }
  ]
},
  {
  id: "L106",
  title: "Permanent Makeup: Expectations",
  titleVi: "Trang điểm vĩnh viễn: Những điều cần biết",
  level: "A2",
  context: "Sử dụng những mẫu câu này để giải thích cho khách hàng về việc trang điểm vĩnh viễn.",
  phrases: [
    {
      english: "It will fade 40 percent.",
      vietnamese: "Nó sẽ phai đi 40 phần trăm.",
      pronunciation: "it wil feyd for-tee per-sent"
    },
    {
      english: "Touch-up needed in six weeks.",
      vietnamese: "Cần dặm lại sau sáu tuần.",
      pronunciation: "tuhch-uhp nee-ded in siks weeks"
    },
    {
      english: "Healing takes two weeks.",
      vietnamese: "Quá trình hồi phục mất hai tuần.",
      pronunciation: "hee-ling teyks too weeks"
    }
  ],
  drill: [
    {
      id: "L106C01",
      type: "read",
      prompt: "It will fade 40 percent.",
      hint: "Nó sẽ phai đi 40 phần trăm.",
      answer: "It will fade 40 percent."
    },
    {
      id: "L106C02",
      type: "recall",
      prompt: "Nó sẽ phai đi 40 phần trăm.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "It will fade 40 percent."
    },
    {
      id: "L106C03",
      type: "read",
      prompt: "Touch-up needed in six weeks.",
      hint: "Cần dặm lại sau sáu tuần.",
      answer: "Touch-up needed in six weeks."
    },
    {
      id: "L106C04",
      type: "recall",
      prompt: "Cần dặm lại sau sáu tuần.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Touch-up needed in six weeks."
    },
    {
      id: "L106C05",
      type: "read",
      prompt: "Healing takes two weeks.",
      hint: "Quá trình hồi phục mất hai tuần.",
      answer: "Healing takes two weeks."
    },
    {
      id: "L106C06",
      type: "recall",
      prompt: "Quá trình hồi phục mất hai tuần.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Healing takes two weeks."
    },
    {
      id: "L106C07",
      type: "fill",
      prompt: "It will ___ 40 percent.",
      hint: "Nó sẽ phai đi 40 phần trăm.",
      answer: "fade",
      answerHint: "It will fade 40 percent."
    },
    {
      id: "L106C08",
      type: "fill",
      prompt: "Touch-up ___ in six weeks.",
      hint: "Cần dặm lại sau sáu tuần.",
      answer: "needed",
      answerHint: "Touch-up needed in six weeks."
    },
    {
      id: "L106C09",
      type: "fill",
      prompt: "Healing takes two ___.",
      hint: "Quá trình hồi phục mất hai tuần.",
      answer: "weeks",
      answerHint: "Healing takes two weeks."
    },
    {
      id: "L106C10",
      type: "dialogue",
      prompt: "Worker: It will fade a little. Is that okay?\nCustomer: Yes, that's okay.\nWorker: You need a touch-up in six weeks.",
      hint: "Thợ: Nó sẽ phai một chút. Chị/Anh thấy ổn không?\nKhách: Vâng, tôi thấy ổn.\nThợ: Chị/Anh cần dặm lại sau sáu tuần.",
      answer: "Worker: It will fade a little. Is that okay?\nCustomer: Yes, that's okay.\nWorker: You need a touch-up in six weeks."
    }
  ]
},
  {
  id: "L107",
  title: "Realistic PMU Expectations",
  titleVi: "Kỳ vọng thực tế về PMU",
  level: "B1",
  context: "Sử dụng những mẫu câu này để trao đổi với khách hàng về kỳ vọng thực tế khi làm PMU, giúp tránh những hiểu lầm không đáng có.",
  phrases: [
    {
      english: "What's your ideal outcome?",
      vietnamese: "Kết quả lý tưởng của bạn là gì?",
      pronunciation: "wot-s yor ai-dee-ul out-kum?"
    },
    {
      english: "Let's manage expectations.",
      vietnamese: "Hãy điều chỉnh kỳ vọng của bạn.",
      pronunciation: "let-s ma-nij eks-pek-tay-shuns."
    },
    {
      english: "Results vary by skin type.",
      vietnamese: "Kết quả khác nhau tùy thuộc vào loại da.",
      pronunciation: "re-zul-ts vair-ee bai skin taip."
    }
  ],
  drill: [
    {
      id: "L107C01",
      type: "read",
      prompt: "What's your ideal outcome?",
      hint: "Kết quả lý tưởng của bạn là gì?",
      answer: "What's your ideal outcome?"
    },
    {
      id: "L107C02",
      type: "recall",
      prompt: "Kết quả lý tưởng của bạn là gì?",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "What's your ideal outcome?"
    },
    {
      id: "L107C03",
      type: "read",
      prompt: "Let's manage expectations.",
      hint: "Hãy điều chỉnh kỳ vọng của bạn.",
      answer: "Let's manage expectations."
    },
    {
      id: "L107C04",
      type: "recall",
      prompt: "Hãy điều chỉnh kỳ vọng của bạn.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Let's manage expectations."
    },
    {
      id: "L107C05",
      type: "read",
      prompt: "Results vary by skin type.",
      hint: "Kết quả khác nhau tùy thuộc vào loại da.",
      answer: "Results vary by skin type."
    },
    {
      id: "L107C06",
      type: "recall",
      prompt: "Kết quả khác nhau tùy thuộc vào loại da.",
      hint: "Nhớ lại câu tiếng Anh...",
      answer: "Results vary by skin type."
    },
    {
      id: "L107C07",
      type: "fill",
      prompt: "What's your ideal ___?",
      hint: "Kết quả lý tưởng của bạn là gì?",
      answer: "outcome",
      answerHint: "What's your ideal outcome?"
    },
    {
      id: "L107C08",
      type: "fill",
      prompt: "Let's ___ expectations.",
      hint: "Hãy điều chỉnh kỳ vọng của bạn.",
      answer: "manage",
      answerHint: "Let's manage expectations."
    },
    {
      id: "L107C09",
      type: "fill",
      prompt: "Results vary by ___ type.",
      hint: "Kết quả khác nhau tùy thuộc vào loại da.",
      answer: "skin",
      answerHint: "Results vary by skin type."
    },
    {
      id: "L107C10",
      type: "dialogue",
      prompt: "Worker: What's your ideal outcome?\nCustomer: I want exactly what I saw on Instagram!\nWorker: Let's manage expectations. Results vary by skin type.",
      hint: "Thợ: Kết quả lý tưởng của bạn là gì?\nKhách: Tôi muốn chính xác những gì tôi thấy trên Instagram!\nThợ: Hãy điều chỉnh kỳ vọng của bạn. Kết quả khác nhau tùy thuộc vào loại da.",
      answer: "Worker: What's your ideal outcome?\nCustomer: I want exactly what I saw on Instagram!\nWorker: Let's manage expectations. Results vary by skin type."
    }
  ]
}
  ]
};

export default consultation;