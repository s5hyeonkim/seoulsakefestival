
// Type definitions
export interface Brewery {
  id: string;
  name: string;
  city: string;
  description: string;
}

export type Section = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
export type Page = 'main' | 'section' | 'detail';

export interface BreweryData {
  [key: string]: Brewery[];
}

const listA: Brewery[] = [
    {
        id: "A02",
        name: "사카야코리아",
        city: "",
        description: "",
    },
    {
        id: "A04",
        name: "하마치도리",
        city: "",
        description: "",
    },
    {
        id: "A05",
        name: "사쿠라가오",
        city: "",
        description: "",
    },
    {
        id: "A06",
        name: "에이쿤",
        city: "",
        description: "",
    },
    {
        id: "A07",
        name: "초카이산",
        city: "",
        description: "",
    },
    {
        id: "A08",
        name: "히타카미",
        city: "",
        description: "",
    },
    {
        id: "A09",
        name: "겐콘이치",
        city: "",
        description: "",
    },
    {
        id: "A10",
        name: "야마토시즈큐",
        city: "",
        description: "",
    },
    {
        id: "A11",
        name: "기쿄",
        city: "",
        description: "",
    },
    {
        id: "A12",
        name: "미츠노츠카사",
        city: "",
        description: "",
    },
    {
        id: "A13",
        name: "무츠핫센",
        city: "",
        description: "",
    },
    {
        id: "A14",
        name: "츠키노나카",
        city: "",
        description: "",
    },
]
const listB = [
  {
    id: "B03",
    name: "쿠마가이주류",
    city: "",
    description: "",
  },
  {
    id: "B04",
    name: "토요비진",
    city: "",
    description: "",
  },
  {
    id: "B05",
    name: "유키노보우샤",
    city: "",
    description: "",
  },
  {
    id: "B06",
    name: "이나타히메",
    city: "",
    description: "",
  },
  {
    id: "B07",
    name: "카츠야마",
    city: "",
    description: "",
  },
  {
    id: "B08",
    name: "킨료",
    city: "",
    description: "",
  },
  {
    id: "B09",
    name: "호라이센",
    city: "",
    description: "",
  },
  {
    id: "B10",
    name: "본",
    city: "",
    description: "",
  },
]

const listC = [
  {
    id: "C01",
    name: "덴신잇본기",
    city: "",
    description: "",
  },
  {
    id: "C02",
    name: "다이나",
    city: "",
    description: "",
  },
  {
    id: "C03",
    name: "시메하리츠루",
    city: "",
    description: "",
  },
  {
    id: "C04",
    name: "야마탄마사무네",
    city: "",
    description: "",
  },
  {
    id: "C05",
    name: "하네야",
    city: "",
    description: "",
  },
  {
    id: "C06",
    name: "카모킨슈",
    city: "",
    description: "",
  },
  {
    id: "C07",
    name: "스가타",
    city: "",
    description: "",
  },
  {
    id: "C08",
    name: "마치다슈죠",
    city: "",
    description: "",
  },
  {
    id: "C09",
    name: "하기노츠루",
    city: "",
    description: "",
  },
  {
    id: "C10",
    name: "와카무스메",
    city: "",
    description: "",
  },
  {
    id: "C11",
    name: "야마고노토부키",
    city: "",
    description: "",
  },
  {
    id: "C12",
    name: "오제노",
    city: "",
    description: "",
  },
    {
    id: "C13",
    name: "반슈잇콘",
    city: "",
    description: "",
  },
  {
    id: "C14",
    name: "츄아이",
    city: "",
    description: "",
  },
  {
    id: "C15",
    name: "아베",
    city: "",
    description: "",
  },
    {
    id: "C16",
    name: "호라이",
    city: "",
    description: "",
  },
  {
    id: "C17",
    name: "보BO",
    city: "",
    description: "",
  },
  {
    id: "C18",
    name: "에헤지하쿠류",
    city: "",
    description: "",
  },  
  {
    id: "C19",
    name: "무기시루",
    city: "",
    description: "",
  },
  {
    id: "C20",
    name: "세키토바",
    city: "",
    description: "",
  },
]

const listD = [
  {
    id: "D01",
    name: "닷사이블루",
    city: "",
    description: "",
  },
  {
    id: "D02",
    name: "치요무스비",
    city: "",
    description: "",
  },
  {
    id: "D03",
    name: "쿠로우시",
    city: "",
    description: "",
  },
  {
    id: "D04",
    name: "키사키",
    city: "",
    description: "",
  },
  {
    id: "D05",
    name: "시치다",
    city: "",
    description: "",
  },
  {
    id: "D06",
    name: "사케노",
    city: "",
    description: "",
  },
  {
    id: "D07",
    name: "쿠로키혼텐",
    city: "",
    description: "",
  },
  {
    id: "D08",
    name: "비죠후",
    city: "",
    description: "",
  },
  {
    id: "D09",
    name: "카이운",
    city: "",
    description: "",
  },
  {
    id: "D10",
    name: "시라기쿠",
    city: "",
    description: "",
  },
  {
    id: "D11",
    name: "라이후쿠",
    city: "",
    description: "",
  },
  {
    id: "D12",
    name: "이요카기야",
    city: "",
    description: "",
  },
  {
    id: "D13",
    name: "보쵸즈루",
    city: "",
    description: "",
  },
  {
    id: "D14",
    name: "카쿠레이",
    city: "",
    description: "",
  },
  {
    id: "D15",
    name: "사케노카마쿠라",
    city: "",
    description: "",
  },
  {
    id: "D16",
    name: "에시칼 스피리츠",
    city: "",
    description: "",
  },
  {
    id: "D17",
    name: "긴자노 스즈메",
    city: "",
    description: "",
  },
  {
    id: "D18",
    name: "신자토 위스키",
    city: "",
    description: "",
  },
  {
    id: "D19",
    name: "사츠마무소 모구라",
    city: "",
    description: "",
  },
  {
    id: "D20",
    name: "글로우",
    city: "",
    description: "",
  },
]

const listE = [
  {
    id: "E01",
    name: "후쿠쵸",
    city: "",
    description: "",
  },
  {
    id: "E02",
    name: "타카",
    city: "",
    description: "",
  },
  {
    id: "E03",
    name: "미치사카리",
    city: "",
    description: "",
  },
  {
    id: "E04",
    name: "하쿠쥬로",
    city: "",
    description: "",
  },
  {
    id: "E05",
    name: "츠루우메킷도",
    city: "",
    description: "",
  },
  {
    id: "E06",
    name: "야마카타마사무네",
    city: "",
    description: "",
  },
  {
    id: "E07",
    name: "벤텐",
    city: "",
    description: "",
  },
  {
    id: "E08",
    name: "슈호",
    city: "",
    description: "",
  },
  {
    id: "E09",
    name: "가산류",
    city: "",
    description: "",
  },
  {
    id: "E10",
    name: "토우코우",
    city: "",
    description: "",
  },
  {
    id: "E11",
    name: "스이게이",
    city: "",
    description: "",
  },
  {
    id: "E12",
    name: "우타시로 미무로스기",
    city: "",
    description: "",
  },
  {
    id: "E13",
    name: "이소지만 우고노츠키",
    city: "",
    description: "",
  },
  {
    id: "E14",
    name: "토카이자카리 아즈마이치 하츠카메",
    city: "",
    description: "",
  },
  {
    id: "E15",
    name: "카네하치 요코하마 치토세츠루",
    city: "",
    description: "",
  },
  {
    id: "E16",
    name: "잔파",
    city: "",
    description: "",
  },
  {
    id: "E17",
    name: "나나쿠보",
    city: "",
    description: "",
  },
  {
    id: "E18",
    name: "호우잔텐부",
    city: "",
    description: "",
  },
  {
    id: "E19",
    name: "키타야고쿠",
    city: "",
    description: "",
  },
  {
    id: "E20",
    name: "핫카이산",
    city: "",
    description: "",
  },
]

const listF = [
  {
    id: "F01",
    name: "자쿠",
    city: "",
    description: "",
  },
  {
    id: "F02",
    name: "아키토라",
    city: "",
    description: "",
  },
  {
    id: "F03",
    name: "야마니쿠모가",
    city: "",
    description: "",
  },
  {
    id: "F04",
    name: "토요노우메",
    city: "",
    description: "",
  },
  {
    id: "F05",
    name: "간기",
    city: "",
    description: "",
  },
  {
    id: "F06",
    name: "겐비시",
    city: "",
    description: "",
  },
  {
    id: "F07",
    name: "키노에네",
    city: "",
    description: "",
  },
  {
    id: "F08",
    name: "죠잔",
    city: "",
    description: "",
  },
  {
    id: "F09",
    name: "타츠리키",
    city: "",
    description: "",
  },
  {
    id: "F10",
    name: "에미시키",
    city: "",
    description: "",
  },
  {
    id: "F11",
    name: "야마모토",
    city: "",
    description: "",
  },
  {
    id: "F12",
    name: "하루가스미",
    city: "",
    description: "",
  },
  {
    id: "F13",
    name: "유키노비진",
    city: "",
    description: "",
  },
  {
    id: "F14",
    name: "소텐덴",
    city: "",
    description: "",
  },
  {
    id: "F15",
    name: "아카부",
    city: "",
    description: "",
  },
  {
    id: "F16",
    name: "하쿠시카",
    city: "",
    description: "",
  },
  {
    id: "F17",
    name: "쵸요후쿠무스메",
    city: "",
    description: "",
  },
  {
    id: "F18",
    name: "갓산",
    city: "",
    description: "",
  },
  {
    id: "F19",
    name: "니카이도",
    city: "",
    description: "",
  },
  {
    id: "F20",
    name: "베니오토메",
    city: "",
    description: "",
  },
]

const listG = [
  {
    id: "G01",
    name: "니혼사케",
    city: "",
    description: "",
  },
  {
    id: "G04",
    name: "하나노마이",
    city: "",
    description: "",
  },
  {
    id: "G05",
    name: "즈이요",
    city: "",
    description: "",
  },
  {
    id: "G06",
    name: "치에비진",
    city: "",
    description: "",
  },
]

const listK = [
  {
    id: "K03",
    name: "하쿠라쿠세이",
    city: "",
    description: "",
  },
  {
    id: "K04",
    name: "미이노고토부키",
    city: "",
    description: "",
  },
  {
    id: "K05",
    name: "칸코바이",
    city: "",
    description: "",
  },
  {
    id: "K06",
    name: "사라",
    city: "",
    description: "",
  },
  {
    id: "K07",
    name: "지자케 CY 코리아",
    city: "",
    description: "",
  },
]

const listL = [
  {
    id: "L01",
    name: "니혼슈코리아",
    city: "",
    description: "",
  },
  {
    id: "L03",
    name: "NK시음",
    city: "",
    description: "",
  },
  {
    id: "L05",
    name: "명문주회",
    city: "",
    description: "",
  },
  {
    id: "L06",
    name: "오야마",
    city: "",
    description: "",
  },
  {
    id: "L07",
    name: "츠카사보탄",
    city: "",
    description: "",
  },
  {
    id: "L08",
    name: "카구라",
    city: "",
    description: "",
  },

]

const listM = [
  {
    id: "M01",
    name: "하루시카",
    city: "",
    description: "",
  },
  {
    id: "M02",
    name: "와카다케",
    city: "",
    description: "",
  },
  {
    id: "M03",
    name: "고쿄",
    city: "",
    description: "",
  },
  {
    id: "M04",
    name: "와카에비스",
    city: "",
    description: "",
  },
  {
    id: "M05",
    name: "이치노쿠라",
    city: "",
    description: "",
  },
  {
    id: "M06",
    name: "무라가스미",
    city: "",
    description: "",
  },
  {
    id: "M07",
    name: "나나와라이",
    city: "",
    description: "",
  },
  {
    id: "M08",
    name: "기쿠히메",
    city: "",
    description: "",
  },
  {
    id: "M09",
    name: "니와노우구이스",
    city: "",
    description: "",
  },
  {
    id: "M10",
    name: "리브롬",
    city: "",
    description: "",
  },
  {
    id: "M11",
    name: "아즈마쵸",
    city: "",
    description: "",
  },
  {
    id: "M12",
    name: "아즈마츠루",
    city: "",
    description: "",
  },
  {
    id: "M13",
    name: "와카나미",
    city: "",
    description: "",
  },
  {
    id: "M14",
    name: "키쿠비진",
    city: "",
    description: "",
  },
  {
    id: "M15",
    name: "시게마스",
    city: "",
    description: "",
  },
  {
    id: "M16",
    name: "츠쿠시",
    city: "",
    description: "",
  },
]

const listN = [
  {
    id: "N01",
    name: "호오비덴",
    city: "",
    description: "",
  },
  {
    id: "N02",
    name: "카메노우미",
    city: "",
    description: "",
  },
  {
    id: "N03",
    name: "타이쇼노츠루",
    city: "",
    description: "",
  },
  {
    id: "N04",
    name: "고젠슈",
    city: "",
    description: "",
  },
  {
    id: "N05",
    name: "미도리카와",
    city: "",
    description: "",
  },
  {
    id: "N06",
    name: "무소무",
    city: "",
    description: "",
  },
  {
    id: "N07",
    name: "라군",
    city: "",
    description: "",
  },
  {
    id: "N08",
    name: "기린잔",
    city: "",
    description: "",
  },
  {
    id: "N09",
    name: "코가네사와",
    city: "",
    description: "",
  },
  {
    id: "N10",
    name: "쿠라모토",
    city: "",
    description: "",
  },
  {
    id: "N11",
    name: "카제노모리",
    city: "",
    description: "",
  },
  {
    id: "N12",
    name: "아카루이노우손",
    city: "",
    description: "",
  },
  {
    id: "N13",
    name: "코츠즈미",
    city: "",
    description: "",
  },
  {
    id: "N14",
    name: "사와노츠루",
    city: "",
    description: "",
  },
  {
    id: "N15",
    name: "미요키쿠",
    city: "",
    description: "",
  },
  {
    id: "N16",
    name: "사와야 마츠모토",
    city: "",
    description: "",
  },

]

const listR = [
  {
    id: "R01",
    name: "닷사이",
    city: "",
    description: "",
  },
  {
    id: "R02",
    name: "킹동아",
    city: "",
    description: "",
  },
  {
    id: "R03",
    name: "쿠보타",
    city: "",
    description: "",
  },
  {
    id: "R08",
    name: "일로사케",
    city: "",
    description: "",
  },
  {
    id: "R12",
    name: "쿠메지마노 쿠메센",
    city: "",
    description: "",
  },
  {
    id: "R13",
    name: "에비스",
    city: "",
    description: "",
  },
]

export const breweryData: BreweryData = {
  A : listA,
  B : listB,
  C : listC,
  D : listD,
  E : listE,
  F : listF,
  G : listG,
  K : listK,
  L : listL,
  M : listM,
  N : listN,
  R : listR,
}