// Original Gym Bro artwork, sharing a proportionate 240 × 520 coordinate grid.
const pair=(id,muscle,path,label=muscle)=>[{id:id+'-left',muscle,path,label},{id:id+'-right',muscle,path,label,mirror:true}];
const shoulders=pair('deltoid','Shoulders','M88 83Q76 79 69 96L65 111Q76 119 86 110Z');
const forearms=pair('forearm','Forearms','M58 163Q65 164 69 172L54 221Q46 229 42 222Z');
const calves=pair('calf','Calves','M91 368Q101 363 106 383L102 427L94 445Q87 420 88 395Z');
export const ANATOMY={front:[...shoulders,...forearms,
 ...pair('pectoral','Chest','M117 94Q105 86 92 94L90 114Q102 128 117 119Z'),
 ...pair('biceps','Biceps','M72 115Q81 112 83 125L73 160Q67 168 61 160Z'),
 ...pair('abdominal','Core','M109 131L117 131L117 182L111 197L106 181Z'),
 ...pair('oblique','Obliques','M94 132L103 140L103 181L108 200L96 191L90 160Z'),
 ...pair('quadriceps','Quads','M96 265Q104 259 110 273L110 330Q108 349 100 359Q90 344 90 300Z'),
 ...pair('adductor','Adductors','M113 251L118 257L118 300L113 321L112 279Z'),...calves],
 back:[...shoulders,...forearms,
 {id:'trapezius',muscle:'Back',label:'Trapezius · Back',path:'M108 79L119 87L132 79L143 91L127 110L113 110L97 91Z'},
 ...pair('upper-back','Back','M94 102L107 113L117 118L117 144L103 139L91 120Z','Upper back · Back'),
 ...pair('lat','Back','M91 127L103 146L116 152L111 183L100 188L94 162Z','Latissimus dorsi · Back'),
 ...pair('triceps','Triceps','M73 116Q82 114 83 125L73 162Q67 170 61 160Z'),
 ...pair('erector','Spinal erectors','M111 151L117 154L117 211L108 211L106 188Z'),
 ...pair('gluteal','Glutes','M99 216Q110 213 117 222L117 249Q108 268 94 258L92 239Z'),
 ...pair('hamstring','Hamstrings','M95 270Q104 273 111 264L111 327Q108 350 101 359Q91 342 90 302Z'),...calves]};
export const BODY_OUTLINE='M108 64L108 74Q91 73 76 84Q65 91 61 112L49 165L36 216L30 245Q27 258 37 262Q46 262 51 248L66 207L78 164L86 133L94 178Q101 201 94 225L87 259L84 329L87 389L86 470L78 491Q77 503 89 499L110 487L111 450L115 384L120 329L125 384L129 450L130 487L151 499Q163 503 162 491L154 470L153 389L156 329L153 259L146 225Q139 201 146 178L154 133L162 164L174 207L189 248Q194 262 203 262Q213 258 210 245L204 216L191 165L179 112Q175 91 164 84Q149 73 132 74L132 64Z';
