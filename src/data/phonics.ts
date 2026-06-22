// 48 个国际音标 (IPA) - 英式发音 (RP)
// 涵盖元音、辅音、爆破音、摩擦音、破擦音、鼻音等
export interface Phoneme {
  symbol: string;
  type: 'vowel_short' | 'vowel_long' | 'vowel_diphthong' | 'consonant';
  example: string;
  exampleCn: string;
  tip: string;
}

export const phonemes: Phoneme[] = [
  // 短元音
  { symbol: 'ɪ', type: 'vowel_short', example: 'bit', exampleCn: '短促的 "衣"', tip: '舌头放松，嘴微张，比汉语"衣"更短促。' },
  { symbol: 'e', type: 'vowel_short', example: 'bed', exampleCn: '短 "挨"', tip: '嘴微张，舌前部略抬起。' },
  { symbol: 'æ', type: 'vowel_short', example: 'cat', exampleCn: '大嘴 "哎"', tip: '嘴张得最大，舌头向前。' },
  { symbol: 'ɒ', type: 'vowel_short', example: 'hot', exampleCn: '圆 "哦"', tip: '嘴圆，舌后。' },
  { symbol: 'ʌ', type: 'vowel_short', example: 'cup', exampleCn: '短 "啊"', tip: '嘴微张，喉咙放松。' },
  { symbol: 'ʊ', type: 'vowel_short', example: 'book', exampleCn: '短 "乌"', tip: '嘴圆，舌后，短促。' },
  { symbol: 'ə', type: 'vowel_short', example: 'about', exampleCn: '轻声 "呃"', tip: '中性元音，发音短轻。' },
  { symbol: 'ɛ', type: 'vowel_short', example: 'cat (美式)', exampleCn: '开 "哎"', tip: '美式发音，嘴更大。' },
  // 长元音
  { symbol: 'iː', type: 'vowel_long', example: 'see', exampleCn: '长 "衣"', tip: '嘴角向两边拉，发音长。' },
  { symbol: 'ɑː', type: 'vowel_long', example: 'car', exampleCn: '大 "啊"', tip: '嘴张大，舌后。' },
  { symbol: 'ɔː', type: 'vowel_long', example: 'door', exampleCn: '长 "哦"', tip: '嘴圆，发音长。' },
  { symbol: 'uː', type: 'vowel_long', example: 'blue', exampleCn: '长 "乌"', tip: '嘴圆，向前突出，发音长。' },
  { symbol: 'ɜː', type: 'vowel_long', example: 'bird', exampleCn: '卷舌 "厄"', tip: '舌头卷起，嘴略开。' },
  // 双元音
  { symbol: 'eɪ', type: 'vowel_diphthong', example: 'day', exampleCn: '"诶一"', tip: '从"挨"滑向"衣"。' },
  { symbol: 'aɪ', type: 'vowel_diphthong', example: 'my', exampleCn: '"啊一"', tip: '从"啊"滑向"衣"。' },
  { symbol: 'ɔɪ', type: 'vowel_diphthong', example: 'boy', exampleCn: '"哦一"', tip: '从"哦"滑向"衣"。' },
  { symbol: 'aʊ', type: 'vowel_diphthong', example: 'now', exampleCn: '"啊乌"', tip: '从"啊"滑向"乌"。' },
  { symbol: 'əʊ', type: 'vowel_diphthong', example: 'go', exampleCn: '"哦乌"', tip: '从"哦"滑向"乌"。' },
  { symbol: 'ɪə', type: 'vowel_diphthong', example: 'near', exampleCn: '"衣厄"', tip: '从"衣"滑向"厄"。' },
  { symbol: 'eə', type: 'vowel_diphthong', example: 'air', exampleCn: '"哎厄"', tip: '从"挨"滑向"厄"。' },
  { symbol: 'ʊə', type: 'vowel_diphthong', example: 'tour', exampleCn: '"乌厄"', tip: '从"乌"滑向"厄"。' },
  // 爆破音
  { symbol: 'p', type: 'consonant', example: 'pen', exampleCn: '"拍"', tip: '双唇紧闭，气流冲出，无声。' },
  { symbol: 'b', type: 'consonant', example: 'book', exampleCn: '"波"', tip: '双唇紧闭，气流冲出，有声。' },
  { symbol: 't', type: 'consonant', example: 'tea', exampleCn: '"特"', tip: '舌尖顶住上齿龈。' },
  { symbol: 'd', type: 'consonant', example: 'dog', exampleCn: '"得"', tip: '舌尖顶住上齿龈，有声。' },
  { symbol: 'k', type: 'consonant', example: 'cat', exampleCn: '"克"', tip: '舌后抵软腭。' },
  { symbol: 'g', type: 'consonant', example: 'go', exampleCn: '"哥"', tip: '舌后抵软腭，有声。' },
  // 摩擦音
  { symbol: 'f', type: 'consonant', example: 'fish', exampleCn: '"夫"', tip: '上齿触下唇，气流摩擦。' },
  { symbol: 'v', type: 'consonant', example: 'van', exampleCn: '"屋"', tip: '上齿触下唇，有声。' },
  { symbol: 'θ', type: 'consonant', example: 'think', exampleCn: '咬舌 "思"', tip: '舌尖咬在上下齿间。' },
  { symbol: 'ð', type: 'consonant', example: 'this', exampleCn: '咬舌 "兹"', tip: '舌尖咬在上下齿间，有声。' },
  { symbol: 's', type: 'consonant', example: 'sun', exampleCn: '"思"', tip: '舌前靠近上齿龈，气流摩擦。' },
  { symbol: 'z', type: 'consonant', example: 'zoo', exampleCn: '"兹"', tip: '同 s，振动声带。' },
  { symbol: 'ʃ', type: 'consonant', example: 'ship', exampleCn: '"西"', tip: '双唇微圆，舌后抬高。' },
  { symbol: 'ʒ', type: 'consonant', example: 'measure', exampleCn: '"日"', tip: '同 ʃ，振动声带。' },
  { symbol: 'h', type: 'consonant', example: 'hat', exampleCn: '"喝"', tip: '气流从喉咙冲出。' },
  { symbol: 'r', type: 'consonant', example: 'red', exampleCn: '"日"', tip: '舌头卷起后抬，舌后振动。' },
  { symbol: 'l', type: 'consonant', example: 'leg', exampleCn: '"勒"', tip: '舌尖顶上齿龈。' },
  { symbol: 'm', type: 'consonant', example: 'moon', exampleCn: '"木"', tip: '双唇紧闭，鼻音。' },
  { symbol: 'n', type: 'consonant', example: 'no', exampleCn: '"呢"', tip: '舌尖顶上齿龈，鼻音。' },
  { symbol: 'ŋ', type: 'consonant', example: 'sing', exampleCn: '"嗯"', tip: '舌后抵软腭，鼻音。' },
  { symbol: 'w', type: 'consonant', example: 'we', exampleCn: '"沃"', tip: '双唇圆收，半元音。' },
  { symbol: 'j', type: 'consonant', example: 'yes', exampleCn: '"椰"', tip: '舌前抬高，半元音。' },
  // 破擦音
  { symbol: 'tʃ', type: 'consonant', example: 'chair', exampleCn: '"起"', tip: '从 t 滑向 ʃ。' },
  { symbol: 'dʒ', type: 'consonant', example: 'jam', exampleCn: '"及"', tip: '从 d 滑向 ʒ。' },
  { symbol: 'ts', type: 'consonant', example: 'cats', exampleCn: '"次"', tip: '从 t 滑向 s。' },
  { symbol: 'dz', type: 'consonant', example: 'beds', exampleCn: '"兹"', tip: '从 d 滑向 z。' },
  { symbol: 'tr', type: 'consonant', example: 'tree', exampleCn: '"出"', tip: '从 t 滑向 r。' },
  { symbol: 'dr', type: 'consonant', example: 'drink', exampleCn: '"主"', tip: '从 d 滑向 r。' },
];

export const phonemeTypes = {
  vowel_short: '短元音',
  vowel_long: '长元音',
  vowel_diphthong: '双元音',
  consonant: '辅音',
};
