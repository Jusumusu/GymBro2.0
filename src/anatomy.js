// Approved C — Athletic Atlas, November 25, 2026. Original Gym Bro SVG artwork.
// Copied from the reviewed concept; production never imports review/demo code.
// Canonical muscle identities and recorded contribution totals are unchanged.
export const ANATOMY_BOUNDS=Object.freeze({width:320,height:680,mirror:320});
export const HEAD_OUTLINE="M133 54C133 31 141 15 160 15C179 15 187 31 187 54L185 75Q182 88 170 99L150 99Q138 88 135 75Z";
export const BODY_OUTLINE="M145 101L145 118Q125 119 109 130Q94 137 88 153Q83 169 79 188L68 225Q64 243 61 258L46 326L41 349Q34 360 36 375L39 391Q40 398 44 397L47 378L47 397Q49 402 52 397L55 378L55 394Q58 398 61 392L64 374L65 385Q69 390 72 382L77 361Q78 355 73 346L71 335L85 286L91 263L98 241L106 211Q110 231 116 250L124 282Q129 301 120 321Q110 340 110 364L112 416L122 479Q118 499 119 527L126 607L125 625L114 643Q110 653 121 654L145 646Q152 643 152 635L151 609L155 543L158 496L160 412L162 496L165 543L169 609L168 635Q168 643 175 646L199 654Q210 653 206 643L195 625L194 607L201 527Q202 499 198 479L208 416L210 364Q210 340 200 321Q191 301 196 282L204 250Q210 231 214 211L222 241L229 263L235 286L249 335L247 346Q242 355 243 361L248 382Q251 390 255 385L256 374L259 392Q262 398 265 394L265 378L268 397Q271 402 273 397L273 378L276 397Q280 398 281 391L284 375Q286 360 279 349L274 326L259 258Q256 243 252 225L241 188Q237 169 232 153Q226 137 211 130Q195 119 175 118L175 101Z";
export const ATLAS_LANDMARKS=Object.freeze({front:"M133 504L140 503L136 558L133 592M187 504L180 503L184 558L187 592M145 113Q160 121 175 113M156 143L160 205L164 143M145 209L175 209M144 238L176 238M143 259L177 259M125 287Q134 300 151 306M195 287Q186 300 169 306M160 213L160 298M151 301L160 309L169 301M124 479Q132 487 141 479M179 479Q188 487 196 479",back:"M160 117L160 308M130 157Q124 171 132 184M190 157Q196 171 188 184M143 305Q160 297 177 305M160 315L160 349M126 480Q133 486 141 479M179 479Q188 486 194 480"});
export const ANATOMY={
 "front": [
  {
   "id": "upper-trapezius-l",
   "muscle": "Back",
   "path": "M146 115Q128 119 113 132L124 141Q138 135 156 127L156 112Z",
   "label": "Upper trapezius · Back"
  },
  {
   "id": "upper-trapezius-r",
   "muscle": "Back",
   "path": "M146 115Q128 119 113 132L124 141Q138 135 156 127L156 112Z",
   "label": "Upper trapezius · Back",
   "mirror": true
  },
  {
   "id": "biceps-l",
   "muscle": "Biceps",
   "path": "M87 184Q97 184 99 198Q99 216 85 241Q79 251 73 245L76 226Z",
   "label": "Biceps brachii"
  },
  {
   "id": "biceps-r",
   "muscle": "Biceps",
   "path": "M87 184Q97 184 99 198Q99 216 85 241Q79 251 73 245L76 226Z",
   "label": "Biceps brachii",
   "mirror": true
  },
  {
   "id": "triceps-edge-l",
   "muscle": "Triceps",
   "path": "M80 185L77 203L69 229Q67 242 70 249L72 246L75 225L80 204Z",
   "label": "Visible lateral triceps"
  },
  {
   "id": "triceps-edge-r",
   "muscle": "Triceps",
   "path": "M80 185L77 203L69 229Q67 242 70 249L72 246L75 225L80 204Z",
   "label": "Visible lateral triceps",
   "mirror": true
  },
  {
   "id": "forearm-l",
   "muscle": "Forearms",
   "path": "M70 261Q80 257 84 268L75 292L63 329Q59 341 52 341L54 324L62 289Z",
   "label": "Forearm flexors / extensors"
  },
  {
   "id": "forearm-r",
   "muscle": "Forearms",
   "path": "M70 261Q80 257 84 268L75 292L63 329Q59 341 52 341L54 324L62 289Z",
   "label": "Forearm flexors / extensors",
   "mirror": true
  },
  {
   "id": "oblique-l",
   "muscle": "Obliques",
   "path": "M117 215L131 226L138 265L143 292L131 286Q124 268 121 248Z",
   "label": "External oblique"
  },
  {
   "id": "oblique-r",
   "muscle": "Obliques",
   "path": "M117 215L131 226L138 265L143 292L131 286Q124 268 121 248Z",
   "label": "External oblique",
   "mirror": true
  },
  {
   "id": "adductor-l",
   "muscle": "Adductors",
   "path": "M148 354L156 365L156 409L150 444L143 420Q147 393 148 354Z",
   "label": "Medial thigh · Adductors"
  },
  {
   "id": "adductor-r",
   "muscle": "Adductors",
   "path": "M148 354L156 365L156 409L150 444L143 420Q147 393 148 354Z",
   "label": "Medial thigh · Adductors",
   "mirror": true
  },
  {
   "id": "front-calf-l",
   "muscle": "Calves",
   "path": "M124 495Q119 507 122 535L127 565L128 545Q126 520 130 502Z",
   "label": "Lateral calf visible from front"
  },
  {
   "id": "front-calf-r",
   "muscle": "Calves",
   "path": "M124 495Q119 507 122 535L127 565L128 545Q126 520 130 502Z",
   "label": "Lateral calf visible from front",
   "mirror": true
  },
  {
   "id": "athletic-chest-l",
   "muscle": "Chest",
   "path": "M155 147C140 140 125 145 116 153L114 179C122 193 140 206 155 197Z",
   "label": "Pectoralis major"
  },
  {
   "id": "athletic-chest-r",
   "muscle": "Chest",
   "path": "M155 147C140 140 125 145 116 153L114 179C122 193 140 206 155 197Z",
   "label": "Pectoralis major",
   "mirror": true
  },
  {
   "id": "athletic-shoulder-l",
   "muscle": "Shoulders",
   "path": "M112 138C99 136 91 147 89 160L87 174C99 177 108 163 115 147Z",
   "label": "Deltoid"
  },
  {
   "id": "athletic-shoulder-r",
   "muscle": "Shoulders",
   "path": "M112 138C99 136 91 147 89 160L87 174C99 177 108 163 115 147Z",
   "label": "Deltoid",
   "mirror": true
  },
  {
   "id": "athletic-core-l",
   "muscle": "Core",
   "path": "M142 215Q149 212 155 215L155 278L145 294Q139 281 140 266Z",
   "label": "Rectus abdominis"
  },
  {
   "id": "athletic-core-r",
   "muscle": "Core",
   "path": "M142 215Q149 212 155 215L155 278L145 294Q139 281 140 266Z",
   "label": "Rectus abdominis",
   "mirror": true
  },
  {
   "id": "athletic-thigh-l",
   "muscle": "Quads",
   "path": "M123 353C132 347 142 349 145 356L139 410L134 444C132 459 132 473 127 470L119 441C115 421 113 389 118 368Z",
   "label": "Quadriceps"
  },
  {
   "id": "athletic-thigh-r",
   "muscle": "Quads",
   "path": "M123 353C132 347 142 349 145 356L139 410L134 444C132 459 132 473 127 470L119 441C115 421 113 389 118 368Z",
   "label": "Quadriceps",
   "mirror": true
  },
  {
   "id": "athletic-medial-l",
   "muscle": "Quads",
   "path": "M142 431Q146 439 144 449Q142 466 136 472L134 464Q138 449 142 431Z",
   "label": "Medial quadriceps"
  },
  {
   "id": "athletic-medial-r",
   "muscle": "Quads",
   "path": "M142 431Q146 439 144 449Q142 466 136 472L134 464Q138 449 142 431Z",
   "label": "Medial quadriceps",
   "mirror": true
  }
 ],
 "back": [
  {
   "id": "upper-trapezius-l",
   "muscle": "Back",
   "path": "M146 115Q128 119 113 132L124 141Q138 135 156 127L156 112Z",
   "label": "Upper trapezius · Back"
  },
  {
   "id": "upper-trapezius-r",
   "muscle": "Back",
   "path": "M146 115Q128 119 113 132L124 141Q138 135 156 127L156 112Z",
   "label": "Upper trapezius · Back",
   "mirror": true
  },
  {
   "id": "triceps-l",
   "muscle": "Triceps",
   "path": "M88 182Q100 182 100 198L91 227Q86 246 76 250L71 243L77 216Z",
   "label": "Triceps brachii"
  },
  {
   "id": "triceps-r",
   "muscle": "Triceps",
   "path": "M88 182Q100 182 100 198L91 227Q86 246 76 250L71 243L77 216Z",
   "label": "Triceps brachii",
   "mirror": true
  },
  {
   "id": "forearm-l",
   "muscle": "Forearms",
   "path": "M70 261Q80 257 84 268L75 292L63 329Q59 341 52 341L54 324L62 289Z",
   "label": "Forearm flexors / extensors"
  },
  {
   "id": "forearm-r",
   "muscle": "Forearms",
   "path": "M70 261Q80 257 84 268L75 292L63 329Q59 341 52 341L54 324L62 289Z",
   "label": "Forearm flexors / extensors",
   "mirror": true
  },
  {
   "id": "middle-trapezius-l",
   "muscle": "Back",
   "path": "M155 136Q143 142 134 150Q130 159 132 172Q142 180 155 181Z",
   "label": "Middle trapezius · Back"
  },
  {
   "id": "middle-trapezius-r",
   "muscle": "Back",
   "path": "M155 136Q143 142 134 150Q130 159 132 172Q142 180 155 181Z",
   "label": "Middle trapezius · Back",
   "mirror": true
  },
  {
   "id": "lower-trapezius-l",
   "muscle": "Back",
   "path": "M155 187Q147 187 140 189Q145 211 155 232Z",
   "label": "Lower trapezius · Back"
  },
  {
   "id": "lower-trapezius-r",
   "muscle": "Back",
   "path": "M155 187Q147 187 140 189Q145 211 155 232Z",
   "label": "Lower trapezius · Back",
   "mirror": true
  },
  {
   "id": "scapular-l",
   "muscle": "Back",
   "path": "M117 158Q123 156 127 160L128 174Q120 181 114 181Q110 170 117 158Z",
   "label": "Infraspinatus / scapular region · Back"
  },
  {
   "id": "scapular-r",
   "muscle": "Back",
   "path": "M117 158Q123 156 127 160L128 174Q120 181 114 181Q110 170 117 158Z",
   "label": "Infraspinatus / scapular region · Back",
   "mirror": true
  },
  {
   "id": "lat-l",
   "muscle": "Back",
   "path": "M111 188C122 185 133 198 140 209Q149 220 150 231L142 265Q136 275 128 275C119 252 112 222 111 201Z",
   "label": "Latissimus dorsi · Back"
  },
  {
   "id": "lat-r",
   "muscle": "Back",
   "path": "M111 188C122 185 133 198 140 209Q149 220 150 231L142 265Q136 275 128 275C119 252 112 222 111 201Z",
   "label": "Latissimus dorsi · Back",
   "mirror": true
  },
  {
   "id": "erector-l",
   "muscle": "Spinal erectors",
   "path": "M150 241L156 245L156 303L145 312L140 303Q145 279 146 258Z",
   "label": "Spinal erectors"
  },
  {
   "id": "erector-r",
   "muscle": "Spinal erectors",
   "path": "M150 241L156 245L156 303L145 312L140 303Q145 279 146 258Z",
   "label": "Spinal erectors",
   "mirror": true
  },
  {
   "id": "calf-l",
   "muscle": "Calves",
   "path": "M126 494Q137 485 145 500Q149 520 140 553L135 584L131 599L125 565L122 530Z",
   "label": "Calf · Gastrocnemius / soleus"
  },
  {
   "id": "calf-r",
   "muscle": "Calves",
   "path": "M126 494Q137 485 145 500Q149 520 140 553L135 584L131 599L125 565L122 530Z",
   "label": "Calf · Gastrocnemius / soleus",
   "mirror": true
  },
  {
   "id": "athletic-rear-deltoid-l",
   "muscle": "Shoulders",
   "path": "M112 138C98 136 91 147 89 160L87 174C96 180 107 163 116 147Z",
   "label": "Posterior / lateral deltoid"
  },
  {
   "id": "athletic-rear-deltoid-r",
   "muscle": "Shoulders",
   "path": "M112 138C98 136 91 147 89 160L87 174C96 180 107 163 116 147Z",
   "label": "Posterior / lateral deltoid",
   "mirror": true
  },
  {
   "id": "athletic-glute-l",
   "muscle": "Glutes",
   "path": "M127 314C136 306 146 309 155 315L155 349C144 363 129 363 121 354C115 345 121 323 127 314Z",
   "label": "Gluteus maximus"
  },
  {
   "id": "athletic-glute-r",
   "muscle": "Glutes",
   "path": "M127 314C136 306 146 309 155 315L155 349C144 363 129 363 121 354C115 345 121 323 127 314Z",
   "label": "Gluteus maximus",
   "mirror": true
  },
  {
   "id": "athletic-hamstring-l",
   "muscle": "Hamstrings",
   "path": "M121 365C132 371 144 366 149 359L147 411L142 456C139 475 132 483 126 470L120 435C117 415 115 386 121 365Z",
   "label": "Hamstrings"
  },
  {
   "id": "athletic-hamstring-r",
   "muscle": "Hamstrings",
   "path": "M121 365C132 371 144 366 149 359L147 411L142 456C139 475 132 483 126 470L120 435C117 415 115 386 121 365Z",
   "label": "Hamstrings",
   "mirror": true
  }
 ]
};
