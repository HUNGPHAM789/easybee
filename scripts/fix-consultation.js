// Rewrite L49-L53 with clean Vietnamese text
// The original content had mojibake (double-encoded UTF-8)
const fs = require('fs');
const filePath = 'lib/content/permanent-makeup/consultation.ts';
const txt = fs.readFileSync(filePath, 'utf8');

// Find where L69 starts (clean section)
const l69Start = txt.indexOf('  id: "L69"');
// Go back to find the { before it
let braceIdx = l69Start;
while (braceIdx > 0 && txt[braceIdx] !== '{') braceIdx--;

// Keep everything from L69 onward
const cleanSuffix = txt.substring(braceIdx);

// Rewrite the header + L49-L53 from scratch
const cleanPrefix = `\uFEFFimport type { Class } from '../types';

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
    { id: "L49C10", type: "dialogue", prompt: "Worker: Hello! Welcome!\\nCustomer: Hello.\\nWorker: What service do you want?\\nCustomer: Microblading, please.", hint: "Thợ: Xin chào! Mừng bạn đến!\\nKhách: Xin chào.\\nThợ: Bạn muốn làm dịch vụ gì?\\nKhách: Làm điêu khắc chân mày.", answer: "Worker: Hello! Welcome!\\nCustomer: Hello.\\nWorker: What service do you want?\\nCustomer: Microblading, please." }
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
    { id: "L50C10", type: "dialogue", prompt: "Worker: What brow shape do you like?\\nCustomer: I want a natural arch.\\nWorker: Okay, and very soft and fluffy?", hint: "Thợ: Bạn thích dáng lông mày nào?\\nKhách: Tôi muốn dáng vòng cung tự nhiên.\\nThợ: Được rồi, và rất mềm mại và tự nhiên phải không?", answer: "Worker: What brow shape do you like?\\nCustomer: I want a natural arch.\\nWorker: Okay, and very soft and fluffy?" }
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
    { id: "L51C10", type: "dialogue", prompt: "Worker: What lip color do you want?\\nCustomer: Nude pink, please.\\nWorker: Coral is very natural too!", hint: "Thợ: Bạn muốn màu môi gì?\\nKhách: Màu hồng nude, làm ơn.\\nThợ: Màu san hô cũng rất tự nhiên!", answer: "Worker: What lip color do you want?\\nCustomer: Nude pink, please.\\nWorker: Coral is very natural too!" }
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
    { id: "L52C10", type: "dialogue", prompt: "Worker: Hello! Do you have allergies?\\nCustomer: No, I don't.\\nWorker: Do you take blood thinners?", hint: "Thợ: Xin chào! Bạn có bị dị ứng gì không?\\nKhách: Không, tôi không bị.\\nThợ: Bạn có uống thuốc làm loãng máu không?", answer: "Worker: Hello! Do you have allergies?\\nCustomer: No, I don't.\\nWorker: Do you take blood thinners?" }
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
    { id: "L53C10", type: "dialogue", prompt: "Worker: Your eyebrows look great! But it looks dark at first.\\nCustomer: Oh, really? Will it stay this dark?\\nWorker: No, the color will fade. You need a touch-up in a few weeks.", hint: "Thợ: Lông mày của bạn trông rất đẹp! Nhưng ban đầu nó trông đậm.\\nKhách: Ồ, thật sao? Nó sẽ đậm như thế này sao?\\nThợ: Không, màu sẽ nhạt đi. Bạn cần dặm lại sau vài tuần.", answer: "Worker: Your eyebrows look great! But it looks dark at first.\\nCustomer: Oh, really? Will it stay this dark?\\nWorker: No, the color will fade. You need a touch-up in a few weeks." }
  ]
},
`;

const result = cleanPrefix + cleanSuffix;
fs.writeFileSync(filePath, result, 'utf8');

// Verify
const allIds = [...result.matchAll(/id:\s*"(L\d+)"/g)].map(m => m[1]);
console.log('Total lessons:', allIds.length);
console.log('IDs:', allIds.join(', '));

// Check for remaining garbled chars
const garbled = result.match(/[\uFFFD]/g);
console.log('Remaining garbled chars:', garbled ? garbled.length : 0);

// Show all titleVi
const titleVis = [...result.matchAll(/titleVi:\s*"([^"]+)"/g)];
console.log('\nAll titleVi:');
titleVis.forEach(m => console.log('  ', m[1]));
