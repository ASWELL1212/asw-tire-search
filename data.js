const TIRE_DATA = [
  {
    "name": "内海",
    "vehicle": "タフト",
    "number": "4082",
    "column": 1,
    "position": 1
  },
  {
    "name": "内藤",
    "vehicle": "ファンクロス",
    "number": "7350",
    "column": 2,
    "position": 1
  },
  {
    "name": "遠藤",
    "vehicle": "スペーシア",
    "number": "8155",
    "column": 3,
    "position": 1
  },
  {
    "name": "吉元",
    "vehicle": "タント",
    "number": "3218",
    "column": 4,
    "position": 1
  },
  {
    "name": "高元",
    "vehicle": "ワゴンR",
    "number": "6475",
    "column": 5,
    "position": 1
  },
  {
    "name": "畝本",
    "vehicle": "タント",
    "number": "222",
    "column": 6,
    "position": 1
  },
  {
    "name": "豊福",
    "vehicle": "フィット",
    "number": "358",
    "column": 1,
    "position": 2
  },
  {
    "name": "内藤",
    "vehicle": "フィット",
    "number": "1040",
    "column": 2,
    "position": 2
  },
  {
    "name": "延原",
    "vehicle": "ポルテ",
    "number": "226",
    "column": 3,
    "position": 2
  },
  {
    "name": "無関",
    "vehicle": "アクア",
    "number": "5572",
    "column": 4,
    "position": 2
  },
  {
    "name": "鈴木\n管工",
    "vehicle": "サクシード",
    "number": "3",
    "column": 5,
    "position": 2
  },
  {
    "name": "中井",
    "vehicle": "エルグラ",
    "number": "1220",
    "column": 1,
    "position": 3
  },
  {
    "name": "平井",
    "vehicle": "CR-V",
    "number": "756",
    "column": 2,
    "position": 3
  },
  {
    "name": "内藤",
    "vehicle": "ジムニー",
    "number": "6512",
    "column": 3,
    "position": 3
  },
  {
    "name": "岡部",
    "vehicle": "エスティマ",
    "number": "6347",
    "column": 4,
    "position": 3
  },
  {
    "name": "佐桑",
    "vehicle": "アトレー",
    "number": "1002",
    "column": 1,
    "position": 4
  },
  {
    "name": "松田",
    "vehicle": "キャンバス",
    "number": "517",
    "column": 2,
    "position": 4
  },
  {
    "name": "柴田",
    "vehicle": "キャンバス",
    "number": "1185",
    "column": 3,
    "position": 4
  },
  {
    "name": "野々上",
    "vehicle": "キャンバス",
    "number": "1031",
    "column": 4,
    "position": 4
  },
  {
    "name": "水島",
    "vehicle": "アクア",
    "number": "2606",
    "column": 1,
    "position": 5
  },
  {
    "name": "内藤",
    "vehicle": "ラクティス",
    "number": "3737",
    "column": 2,
    "position": 5
  },
  {
    "name": "中井",
    "vehicle": "シエンタ",
    "number": "5592",
    "column": 3,
    "position": 5
  },
  {
    "name": "中下",
    "vehicle": "プリウス",
    "number": "8888",
    "column": 4,
    "position": 5
  },
  {
    "name": "大内",
    "vehicle": "ポルテ",
    "number": "2211",
    "column": 5,
    "position": 5
  },
  {
    "name": "皆木",
    "vehicle": "ハリアー",
    "number": "556",
    "column": 1,
    "position": 6
  },
  {
    "name": "畝本",
    "vehicle": "ステップW",
    "number": "222",
    "column": 2,
    "position": 6
  },
  {
    "name": "安藤",
    "vehicle": "クロストレク",
    "number": "1516",
    "column": 3,
    "position": 6
  },
  {
    "name": "鈴木\n管工",
    "vehicle": "アルファード",
    "number": "1027",
    "column": 6,
    "position": 6
  },
  {
    "name": "川端",
    "vehicle": "ソニカ",
    "number": "9999",
    "column": 1,
    "position": 7
  },
  {
    "name": "寺坂",
    "vehicle": "ムーブ",
    "number": "3753",
    "column": 2,
    "position": 7
  },
  {
    "name": "豊岡",
    "vehicle": "キャンバス",
    "number": "9316",
    "column": 3,
    "position": 7
  },
  {
    "name": "見土路",
    "vehicle": "キャンバス",
    "number": "1977",
    "column": 4,
    "position": 7
  },
  {
    "name": "皆木",
    "vehicle": "N-box",
    "number": "579",
    "column": 5,
    "position": 7
  },
  {
    "name": "芦田",
    "vehicle": "N-box",
    "number": "4950",
    "column": 6,
    "position": 7
  },
  {
    "name": "宮田",
    "vehicle": "タフト",
    "number": "8865",
    "column": 1,
    "position": 8
  },
  {
    "name": "竹内",
    "vehicle": "アクア",
    "number": "5115",
    "column": 2,
    "position": 8
  },
  {
    "name": "染谷",
    "vehicle": "ヤリス",
    "number": "3770",
    "column": 3,
    "position": 8
  },
  {
    "name": "高木",
    "vehicle": "アクア",
    "number": "179",
    "column": 4,
    "position": 8
  },
  {
    "name": "前原",
    "vehicle": "VOXY",
    "number": "104",
    "column": 5,
    "position": 8
  },
  {
    "name": "内藤",
    "vehicle": "デリカD5",
    "number": "4754",
    "column": 1,
    "position": 9
  },
  {
    "name": "井戸",
    "vehicle": "スカイラ",
    "number": "312",
    "column": 2,
    "position": 9
  },
  {
    "name": "豊岡",
    "vehicle": "ヤリクロ",
    "number": "529",
    "column": 3,
    "position": 9
  },
  {
    "name": "大内",
    "vehicle": "ハリアー",
    "number": "900",
    "column": 4,
    "position": 9
  },
  {
    "name": "上原",
    "vehicle": "タント",
    "number": "8778",
    "column": 1,
    "position": 10
  },
  {
    "name": "杉丸",
    "vehicle": "スマイル",
    "number": "3433",
    "column": 2,
    "position": 10
  },
  {
    "name": "岡本",
    "vehicle": "ekスペース",
    "number": "7632",
    "column": 3,
    "position": 10
  },
  {
    "name": "長尾",
    "vehicle": "ココア",
    "number": "393",
    "column": 4,
    "position": 10
  },
  {
    "name": "森藤",
    "vehicle": "キャンバス",
    "number": "5523",
    "column": 5,
    "position": 10
  },
  {
    "name": "畑中",
    "vehicle": "タント車イスクルマ",
    "number": "",
    "column": 6,
    "position": 10
  },
  {
    "name": "岡部",
    "vehicle": "ヴィッツ",
    "number": "4323",
    "column": 1,
    "position": 11
  },
  {
    "name": "魚清",
    "vehicle": "カローラ",
    "number": "2360",
    "column": 2,
    "position": 11
  },
  {
    "name": "岡部",
    "vehicle": "ポロ",
    "number": "345",
    "column": 3,
    "position": 11
  },
  {
    "name": "黒川",
    "vehicle": "CX-5",
    "number": "27",
    "column": 1,
    "position": 12
  },
  {
    "name": "長尾",
    "vehicle": "CX-8",
    "number": "8080",
    "column": 2,
    "position": 12
  },
  {
    "name": "中力",
    "vehicle": "デリカD5",
    "number": "1129",
    "column": 3,
    "position": 12
  },
  {
    "name": "坂元",
    "vehicle": "ハリアー",
    "number": "86",
    "column": 4,
    "position": 12
  },
  {
    "name": "大内\n商店",
    "vehicle": "N-va",
    "number": "241",
    "column": 1,
    "position": 13
  },
  {
    "name": "松崎",
    "vehicle": "モコ",
    "number": "3313",
    "column": 2,
    "position": 13
  },
  {
    "name": "吉元",
    "vehicle": "タント",
    "number": "6228",
    "column": 3,
    "position": 13
  },
  {
    "name": "厨子",
    "vehicle": "タント",
    "number": "45",
    "column": 4,
    "position": 13
  },
  {
    "name": "植月",
    "vehicle": "キャンバス",
    "number": "6781",
    "column": 5,
    "position": 13
  },
  {
    "name": "江原",
    "vehicle": "モコ",
    "number": "1207",
    "column": 1,
    "position": 14
  },
  {
    "name": "出口",
    "vehicle": "スペーシア",
    "number": "9740",
    "column": 2,
    "position": 14
  },
  {
    "name": "国石",
    "vehicle": "タント",
    "number": "9437",
    "column": 3,
    "position": 14
  },
  {
    "name": "元番",
    "vehicle": "キャンバス",
    "number": "2017",
    "column": 4,
    "position": 14
  },
  {
    "name": "黒川",
    "vehicle": "キャンバス",
    "number": "717",
    "column": 5,
    "position": 14
  },
  {
    "name": "江見",
    "vehicle": "スマイル",
    "number": "25",
    "column": 6,
    "position": 14
  },
  {
    "name": "影山",
    "vehicle": "アルファド",
    "number": "1643",
    "column": 1,
    "position": 15
  },
  {
    "name": "久永",
    "vehicle": "ハイエース",
    "number": "2210",
    "column": 2,
    "position": 15
  },
  {
    "name": "岡本",
    "vehicle": "デリカD5",
    "number": "626",
    "column": 3,
    "position": 15
  },
  {
    "name": "川本",
    "vehicle": "キャンバス",
    "number": "1001",
    "column": 1,
    "position": 16
  },
  {
    "name": "横山",
    "vehicle": "ワゴンR",
    "number": "4220",
    "column": 2,
    "position": 16
  },
  {
    "name": "廣野",
    "vehicle": "タント",
    "number": "23",
    "column": 3,
    "position": 16
  },
  {
    "name": "皆木",
    "vehicle": "キャンバス",
    "number": "223",
    "column": 4,
    "position": 16
  },
  {
    "name": "中井",
    "vehicle": "ワゴンR",
    "number": "6636",
    "column": 5,
    "position": 16
  },
  {
    "name": "畑中",
    "vehicle": "タント",
    "number": "ね 8318",
    "column": 1,
    "position": 17
  },
  {
    "name": "松崎",
    "vehicle": "キャンバス",
    "number": "8377",
    "column": 2,
    "position": 17
  },
  {
    "name": "高橋",
    "vehicle": "N-box",
    "number": "1491",
    "column": 3,
    "position": 17
  },
  {
    "name": "小田\nまゆみ",
    "vehicle": "キャンバス",
    "number": "628",
    "column": 4,
    "position": 17
  },
  {
    "name": "松田",
    "vehicle": "N-BOX",
    "number": "1117",
    "column": 5,
    "position": 17
  },
  {
    "name": "松田",
    "vehicle": "プリウス",
    "number": "8585",
    "column": 1,
    "position": 18
  },
  {
    "name": "元番",
    "vehicle": "ヤリクロ",
    "number": "18",
    "column": 2,
    "position": 18
  },
  {
    "name": "佐桑",
    "vehicle": "VOXY",
    "number": "923",
    "column": 3,
    "position": 18
  },
  {
    "name": "",
    "vehicle": "ハリアー",
    "number": "2000",
    "column": 4,
    "position": 18
  },
  {
    "name": "池田",
    "vehicle": "ジムニー",
    "number": "7840",
    "column": 5,
    "position": 18
  },
  {
    "name": "大内",
    "vehicle": "ジムニー",
    "number": "863",
    "column": 6,
    "position": 18
  },
  {
    "name": "吉田",
    "vehicle": "ウェイク",
    "number": "1113",
    "column": 1,
    "position": 19
  },
  {
    "name": "中島",
    "vehicle": "タント",
    "number": "1517",
    "column": 2,
    "position": 19
  },
  {
    "name": "高森",
    "vehicle": "タント",
    "number": "7166",
    "column": 3,
    "position": 19
  },
  {
    "name": "吉田",
    "vehicle": "タント",
    "number": "624",
    "column": 4,
    "position": 19
  },
  {
    "name": "野口",
    "vehicle": "ハスラー",
    "number": "722",
    "column": 5,
    "position": 19
  },
  {
    "name": "無関",
    "vehicle": "キャンバス",
    "number": "2020",
    "column": 6,
    "position": 19
  },
  {
    "name": "有元",
    "vehicle": "タント",
    "number": "7123",
    "column": 1,
    "position": 20
  },
  {
    "name": "黒川",
    "vehicle": "アルト",
    "number": "7117",
    "column": 2,
    "position": 20
  },
  {
    "name": "貞森",
    "vehicle": "ハスラー",
    "number": "727",
    "column": 3,
    "position": 20
  },
  {
    "name": "安藤",
    "vehicle": "ハスラー",
    "number": "963",
    "column": 4,
    "position": 20
  },
  {
    "name": "内藤",
    "vehicle": "タント",
    "number": "763",
    "column": 5,
    "position": 20
  },
  {
    "name": "小田\nまみこ",
    "vehicle": "ムーブ",
    "number": "2550",
    "column": 6,
    "position": 20
  },
  {
    "name": "高橋",
    "vehicle": "ウィッシュ",
    "number": "88",
    "column": 1,
    "position": 21
  },
  {
    "name": "箕原",
    "vehicle": "セレナ",
    "number": "2436",
    "column": 2,
    "position": 21
  },
  {
    "name": "大橋",
    "vehicle": "VOXY",
    "number": "84",
    "column": 3,
    "position": 21
  },
  {
    "name": "岡田",
    "vehicle": "エクスワイ",
    "number": "801",
    "column": 4,
    "position": 21
  },
  {
    "name": "内藤",
    "vehicle": "クラウン",
    "number": "1015",
    "column": 5,
    "position": 21
  },
  {
    "name": "遠藤",
    "vehicle": "ハリアー",
    "number": "8155",
    "column": 6,
    "position": 21
  },
  {
    "name": "岡田",
    "vehicle": "アトレー",
    "number": "816",
    "column": 1,
    "position": 22
  },
  {
    "name": "池田",
    "vehicle": "ハイゼト",
    "number": "3687",
    "column": 2,
    "position": 22
  },
  {
    "name": "尾島",
    "vehicle": "アトレー",
    "number": "328",
    "column": 3,
    "position": 22
  },
  {
    "name": "内藤",
    "vehicle": "キャリー",
    "number": "",
    "column": 4,
    "position": 22
  },
  {
    "name": "大内\n商店",
    "vehicle": "ハイゼト",
    "number": "241",
    "column": 5,
    "position": 22
  },
  {
    "name": "松崎",
    "vehicle": "ハスラー",
    "number": "202",
    "column": 1,
    "position": 23
  },
  {
    "name": "坂元",
    "vehicle": "タント",
    "number": "86",
    "column": 2,
    "position": 23
  },
  {
    "name": "皆木",
    "vehicle": "キャンバス",
    "number": "721",
    "column": 3,
    "position": 23
  },
  {
    "name": "皆木",
    "vehicle": "キャンバス",
    "number": "1616",
    "column": 4,
    "position": 23
  },
  {
    "name": "有元",
    "vehicle": "クリッパ",
    "number": "2381",
    "column": 5,
    "position": 23
  },
  {
    "name": "影山",
    "vehicle": "プリウス",
    "number": "666",
    "column": 1,
    "position": 24
  },
  {
    "name": "尾島",
    "vehicle": "ハリアー",
    "number": "328",
    "column": 2,
    "position": 24
  },
  {
    "name": "柴田",
    "vehicle": "プリウス",
    "number": "360",
    "column": 3,
    "position": 24
  },
  {
    "name": "遠藤",
    "vehicle": "ヤリクロ",
    "number": "801",
    "column": 4,
    "position": 24
  },
  {
    "name": "柴田",
    "vehicle": "ハリアー",
    "number": "360",
    "column": 6,
    "position": 24
  },
  {
    "name": "アルファド\n123",
    "vehicle": "",
    "number": "",
    "column": 9,
    "position": 24
  },
  {
    "name": "西山",
    "vehicle": "N-one",
    "number": "2580",
    "column": 1,
    "position": 25
  },
  {
    "name": "柴田",
    "vehicle": "ハイゼット",
    "number": "99",
    "column": 2,
    "position": 25
  },
  {
    "name": "安藤",
    "vehicle": "アルト",
    "number": "2120",
    "column": 3,
    "position": 25
  },
  {
    "name": "箕原",
    "vehicle": "N-box",
    "number": "2456",
    "column": 1,
    "position": 26
  },
  {
    "name": "箕原",
    "vehicle": "ラパン",
    "number": "2456",
    "column": 2,
    "position": 26
  },
  {
    "name": "江見",
    "vehicle": "キャンバス",
    "number": "25",
    "column": 3,
    "position": 26
  },
  {
    "name": "皆木",
    "vehicle": "シエラ",
    "number": "19-22間クカカン",
    "column": 6,
    "position": 26
  },
  {
    "name": "スペーシアG\n1429",
    "vehicle": "",
    "number": "",
    "column": 9,
    "position": 26
  },
  {
    "name": "大橋",
    "vehicle": "ステップW",
    "number": "3",
    "column": 1,
    "position": 27
  },
  {
    "name": "上原",
    "vehicle": "VOXY",
    "number": "9674",
    "column": 2,
    "position": 27
  },
  {
    "name": "上原",
    "vehicle": "カローラS",
    "number": "9",
    "column": 3,
    "position": 27
  },
  {
    "name": "植月",
    "vehicle": "ステップW",
    "number": "634",
    "column": 4,
    "position": 27
  },
  {
    "name": "中力",
    "vehicle": "ジムニー",
    "number": "1129",
    "column": 5,
    "position": 27
  },
  {
    "name": "石井",
    "vehicle": "W-RV",
    "number": "5275",
    "column": 6,
    "position": 27
  },
  {
    "name": "元夢屋",
    "vehicle": "ワゴンR",
    "number": "",
    "column": 1,
    "position": 28
  },
  {
    "name": "",
    "vehicle": "タント",
    "number": "8889",
    "column": 2,
    "position": 28
  },
  {
    "name": "尾島",
    "vehicle": "キャンバス",
    "number": "7327",
    "column": 1,
    "position": 29
  },
  {
    "name": "松永",
    "vehicle": "ワゴンR",
    "number": "3723",
    "column": 2,
    "position": 29
  },
  {
    "name": "寺坂",
    "vehicle": "カローラ",
    "number": "3",
    "column": 1,
    "position": 30
  },
  {
    "name": "菅田",
    "vehicle": "GS",
    "number": "24",
    "column": 2,
    "position": 30
  },
  {
    "name": "青井",
    "vehicle": "プラド",
    "number": "8232",
    "column": 3,
    "position": 30
  },
  {
    "name": "瀧川",
    "vehicle": "プリウス6045",
    "number": "",
    "column": 4,
    "position": 30
  }
];
