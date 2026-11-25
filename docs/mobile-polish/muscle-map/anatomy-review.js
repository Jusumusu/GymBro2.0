// Original Gym Bro review artwork. No app storage or production rendering imports.
// All concepts share one balanced anatomical coordinate scaffold; the visible
// regions, segmentation, contour treatment and shading are individually drawn.
export const conceptInfo={
 A:{name:'Essential anatomy',label:'Minimal anatomical',tag:'Quiet and precise',description:'Broad, uninterrupted muscle regions and a fine outer contour. The lowest visual density, with generous negative space between selectable muscles.',strength:'The easiest silhouette to scan. Very light SVG and restrained in both themes.',tradeoff:'Less detail around the shoulder, thigh and lower leg.',complexity:'Low · 22 front / 24 back regions'},
 B:{name:'Clinical detail',label:'Premium medical illustration',tag:'Anatomy, in focus',description:'A more descriptive superficial-muscle study: separate deltoid heads, quadriceps contours, abdominal segments and calf bellies, plus fine tendon landmarks.',strength:'Makes major muscle boundaries particularly recognizable without a flat photographic asset.',tradeoff:'More small visual regions; the name picker remains important on compact phones.',complexity:'Medium · fine compound regions and linework'},
 C:{name:'Athletic atlas',label:'Modern athletic anatomy',tag:'Recommended',description:'A balanced athletic figure with flowing chest, shoulder and thigh contours. Essential surface anatomy is paired with larger, legible selectable regions.',strength:'The strongest balance of credible anatomy, phone readability and clear training/selection states.',tradeoff:'Purposefully simplifies deeper anatomy and individual muscle heads.',complexity:'Low to medium · larger flowing targets'},
 D:{name:'Sculpted form',label:'Layered dimensional vector',tag:'Subtle dimension',description:'Softly modeled muscle volumes sit on a shaded body scaffold. Layered gradient surfaces add depth while remaining individually selectable SVG paths.',strength:'The most dimensional presentation; highlights explain the curvature of the torso and limbs.',tradeoff:'More gradient definitions and a stronger visual presence than the quieter approaches.',complexity:'Medium · SVG gradients, no 3D runtime'}
};
export const muscles=['Chest','Back','Shoulders','Biceps','Triceps','Forearms','Core','Obliques','Glutes','Quads','Adductors','Hamstrings','Calves','Spinal erectors'];
export const muscleNames={Core:'Abdominals',Quads:'Quadriceps','Spinal erectors':'Spinal erectors'};
export const fictionalWork={Chest:{direct:6,secondary:0},Back:{direct:9,secondary:2},Shoulders:{direct:3,secondary:4},Biceps:{direct:2,secondary:4},Triceps:{direct:2,secondary:3},Forearms:{direct:0,secondary:1},Core:{direct:3,secondary:0},Obliques:{direct:0,secondary:1},Glutes:{direct:4,secondary:3},Quads:{direct:8,secondary:0},Adductors:{direct:0,secondary:2},Hamstrings:{direct:4,secondary:2},Calves:{direct:0,secondary:0},'Spinal erectors':{direct:0,secondary:1}};
const outline='M145 101L145 118Q125 119 109 130Q94 137 88 153Q83 169 79 188L68 225Q64 243 61 258L46 326L41 349Q34 360 36 375L39 391Q40 398 44 397L47 378L47 397Q49 402 52 397L55 378L55 394Q58 398 61 392L64 374L65 385Q69 390 72 382L77 361Q78 355 73 346L71 335L85 286L91 263L98 241L106 211Q110 231 116 250L124 282Q129 301 120 321Q110 340 110 364L112 416L122 479Q118 499 119 527L126 607L125 625L114 643Q110 653 121 654L145 646Q152 643 152 635L151 609L155 543L158 496L160 412L162 496L165 543L169 609L168 635Q168 643 175 646L199 654Q210 653 206 643L195 625L194 607L201 527Q202 499 198 479L208 416L210 364Q210 340 200 321Q191 301 196 282L204 250Q210 231 214 211L222 241L229 263L235 286L249 335L247 346Q242 355 243 361L248 382Q251 390 255 385L256 374L259 392Q262 398 265 394L265 378L268 397Q271 402 273 397L273 378L276 397Q280 398 281 391L284 375Q286 360 279 349L274 326L259 258Q256 243 252 225L241 188Q237 169 232 153Q226 137 211 130Q195 119 175 118L175 101Z';
const head='M133 54C133 31 141 15 160 15C179 15 187 31 187 54L185 75Q182 88 170 99L150 99Q138 88 135 75Z';
const region=(id,muscle,d,label=muscle,extra={})=>({id,muscle,d,label,...extra});
const pair=(id,muscle,d,label=muscle,extra={})=>[region(id+'-l',muscle,d,label,extra),region(id+'-r',muscle,d,label,{...extra,mirror:true})];
const shared={
 forearms:pair('forearm','Forearms','M70 261Q80 257 84 268L75 292L63 329Q59 341 52 341L54 324L62 289Z','Forearm flexors / extensors'),
 upperTraps:pair('upper-trapezius','Back','M146 115Q128 119 113 132L124 141Q138 135 156 127L156 112Z','Upper trapezius · Back'),
 anteriorShoulders:pair('deltoid','Shoulders','M111 139Q96 138 91 153L87 175Q98 181 109 163L115 146Z','Anterior / lateral deltoid'),
 posteriorShoulders:pair('rear-deltoid','Shoulders','M111 138Q97 137 91 151L87 176Q96 183 105 168L116 149Z','Posterior / lateral deltoid'),
 biceps:pair('biceps','Biceps','M87 184Q97 184 99 198Q99 216 85 241Q79 251 73 245L76 226Z','Biceps brachii'),
 tricepsFront:pair('triceps-edge','Triceps','M80 185L77 203L69 229Q67 242 70 249L72 246L75 225L80 204Z','Visible lateral triceps'),
 tricepsBack:pair('triceps','Triceps','M88 182Q100 182 100 198L91 227Q86 246 76 250L71 243L77 216Z','Triceps brachii'),
 obliques:pair('oblique','Obliques','M117 215L131 226L138 265L143 292L131 286Q124 268 121 248Z','External oblique'),
 adductors:pair('adductor','Adductors','M148 354L156 365L156 409L150 444L143 420Q147 393 148 354Z','Medial thigh · Adductors'),
 calves:pair('calf','Calves','M126 494Q137 485 145 500Q149 520 140 553L135 584L131 599L125 565L122 530Z','Calf · Gastrocnemius / soleus'),
 spinal:pair('erector','Spinal erectors','M150 241L156 245L156 303L145 312L140 303Q145 279 146 258Z','Spinal erectors'),
 glutes:pair('glute','Glutes','M126 313Q140 305 155 315L155 350Q143 366 125 358Q116 352 119 337Z','Gluteus maximus'),
 hamstrings:pair('hamstring','Hamstrings','M120 365Q135 371 149 360L147 414L140 465Q135 484 127 473L118 423Z','Hamstrings'),
 lats:pair('lat','Back','M111 188C122 185 133 198 140 209Q149 220 150 231L142 265Q136 275 128 275C119 252 112 222 111 201Z','Latissimus dorsi · Back'),
 middleTraps:pair('middle-trapezius','Back','M155 136Q143 142 134 150Q130 159 132 172Q142 180 155 181Z','Middle trapezius · Back'),
 lowerTraps:pair('lower-trapezius','Back','M155 187Q147 187 140 189Q145 211 155 232Z','Lower trapezius · Back'),
 scapula:pair('scapular','Back','M117 158Q123 156 127 160L128 174Q120 181 114 181Q110 170 117 158Z','Infraspinatus / scapular region · Back')
};
function essential(side){return side==='front'?[
 ...shared.upperTraps,...shared.anteriorShoulders,...shared.biceps,...shared.tricepsFront,...shared.forearms,
 ...pair('pectoral','Chest','M155 148Q136 141 117 151L114 182Q130 206 155 201Z','Pectoralis major'),
 ...pair('abdominal','Core','M143 215L155 215L155 284L145 294L139 270Z','Rectus abdominis'),...shared.obliques,
 ...pair('quadriceps','Quads','M124 354Q132 348 144 353L140 419L137 460Q132 477 125 470L116 422L115 379Z','Quadriceps'),...shared.adductors,...pair('front-calf','Calves','M124 495Q119 507 122 535L127 565L128 545Q126 520 130 502Z','Lateral calf visible from front')
 ]:[...shared.upperTraps,...shared.posteriorShoulders,...shared.tricepsBack,...shared.forearms,...shared.middleTraps,...shared.lowerTraps,...shared.scapula,...shared.lats,...shared.spinal,...shared.glutes,...shared.hamstrings,...shared.calves];}
function clinical(side){const base=essential(side);const remove=side==='front'?['pectoral','abdominal','quadriceps','deltoid','calf']:['hamstring','calf','rear-deltoid'];const rows=base.filter(r=>!remove.some(prefix=>r.id.startsWith(prefix)));
 if(side==='front')rows.push(
 ...pair('clavicular-pectoral','Chest','M155 148Q137 142 119 151L117 162Q136 166 155 155Z','Pectoralis major · Clavicular region'),
 ...pair('sternal-pectoral','Chest','M116 167Q132 170 155 160L155 201Q131 207 115 181Z','Pectoralis major · Sternal region'),
 ...pair('front-deltoid','Shoulders','M110 139L114 146Q110 160 102 168L99 153Z','Anterior deltoid'),
 ...pair('side-deltoid','Shoulders','M103 139Q94 142 91 154L87 174L95 176L101 164L97 153Z','Lateral deltoid'),
 ...[0,1,2].flatMap((n)=>pair('abdominal-'+n,'Core',`M143 ${215+n*22}L155 ${215+n*22}L155 ${233+n*22}L143 ${235+n*22}L141 ${226+n*22}Z`,'Rectus abdominis')),
 ...pair('abdominal-low','Core','M143 281L155 279L155 287L146 295Z','Lower rectus abdominis'),
 ...pair('vastus-lateral','Quads','M121 353Q128 348 133 353L130 397L125 442L126 465L121 459L115 421L115 379Z','Vastus lateralis · Quadriceps'),
 ...pair('rectus-femoris','Quads','M137 354L144 354L139 412L135 447L129 439L133 394Z','Rectus femoris · Quadriceps'),
 ...pair('vastus-medial','Quads','M139 421L145 443L139 468Q131 480 129 467L130 448Z','Vastus medialis · Quadriceps')
 );else rows.push(
 ...pair('rear-deltoid-medical','Shoulders','M111 139L116 148L105 166L98 172L100 151Z','Posterior deltoid'),
 ...pair('lateral-deltoid-medical','Shoulders','M103 139Q94 143 91 155L88 175L96 177L101 165L97 153Z','Lateral deltoid'),
 ...pair('biceps-femoris','Hamstrings','M120 365L132 368L133 412L130 462L125 468L119 421Z','Biceps femoris · Hamstrings'),
 ...pair('medial-hamstring','Hamstrings','M137 367L149 359L145 415L139 467L133 473L135 418Z','Semitendinosus / semimembranosus · Hamstrings')
 );
 if(side==='back')rows.push(...pair('lateral-calf','Calves','M126 496Q133 490 134 501L132 539L127 553L123 533L122 517Z','Lateral gastrocnemius'),...pair('medial-calf','Calves','M138 497Q147 497 146 513L140 547L135 560L134 538L136 512Z','Medial gastrocnemius'),...pair('soleus','Calves','M126 554L132 563L137 560L134 586L130 600Z','Soleus / Achilles region'));
 return rows;
}
function athletic(side){const base=essential(side);const remove=side==='front'?['pectoral','abdominal','quadriceps','deltoid']:['rear-deltoid','hamstring','glute'];const rows=base.filter(r=>!remove.some(prefix=>r.id.startsWith(prefix)));
 if(side==='front')rows.push(
 ...pair('athletic-chest','Chest','M155 147C140 140 125 145 116 153L114 179C122 193 140 206 155 197Z','Pectoralis major'),
 ...pair('athletic-shoulder','Shoulders','M112 138C99 136 91 147 89 160L87 174C99 177 108 163 115 147Z','Deltoid'),
 ...pair('athletic-core','Core','M142 215Q149 212 155 215L155 278L145 294Q139 281 140 266Z','Rectus abdominis'),
 ...pair('athletic-thigh','Quads','M123 353C132 347 142 349 145 356L139 410L134 444C132 459 132 473 127 470L119 441C115 421 113 389 118 368Z','Quadriceps'),
 ...pair('athletic-medial','Quads','M142 431Q146 439 144 449Q142 466 136 472L134 464Q138 449 142 431Z','Medial quadriceps')
 );else rows.push(
 ...pair('athletic-rear-deltoid','Shoulders','M112 138C98 136 91 147 89 160L87 174C96 180 107 163 116 147Z','Posterior / lateral deltoid'),
 ...pair('athletic-glute','Glutes','M127 314C136 306 146 309 155 315L155 349C144 363 129 363 121 354C115 345 121 323 127 314Z','Gluteus maximus'),
 ...pair('athletic-hamstring','Hamstrings','M121 365C132 371 144 366 149 359L147 411L142 456C139 475 132 483 126 470L120 435C117 415 115 386 121 365Z','Hamstrings')
 );return rows;
}
function sculpted(side){const base=clinical(side);return base.map(r=>({...r,volume:true}));}
export const regionsFor=(concept='A',side='front')=>({A:essential,B:clinical,C:athletic,D:sculpted}[String(concept).toUpperCase()]||essential)(side==='back'?'back':'front');
let serial=0;
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function activity(muscle,state){if(state==='exercise')return muscle==='Back'?'primary':['Biceps','Shoulders'].includes(muscle)?'secondary':muscle==='Forearms'||muscle==='Spinal erectors'||muscle==='Core'?'stabilizer':'none';if(state!=='trained')return 'none';const c=fictionalWork[muscle];return c.direct>=6?'high':c.direct>0||c.secondary>=2?'moderate':c.secondary?'low':'none';}
const landmarkFront='M133 504L140 503L136 558L133 592M187 504L180 503L184 558L187 592M145 113Q160 121 175 113M156 143L160 205L164 143M145 209L175 209M144 238L176 238M143 259L177 259M125 287Q134 300 151 306M195 287Q186 300 169 306M160 213L160 298M151 301L160 309L169 301M124 479Q132 487 141 479M179 479Q188 487 196 479';
const landmarkBack='M160 117L160 308M130 157Q124 171 132 184M190 157Q196 171 188 184M143 305Q160 297 177 305M160 315L160 349M126 480Q133 486 141 479M179 479Q188 486 194 480';
export function renderAnatomy({concept='A',side='front',state='neutral',selected=null,theme='light',interactive=true}={}){
 concept=String(concept).toUpperCase();if(!conceptInfo[concept])concept='A';side=side==='back'?'back':'front';if(!muscles.includes(selected))selected=null;const id='anatomy-'+concept+'-'+side+'-'+(++serial),rows=regionsFor(concept,side),volume=concept==='D';
 const defs=`<defs><linearGradient id="${id}-body" x1="0" x2="1"><stop offset="0" stop-color="var(--body-shadow)"/><stop offset=".34" stop-color="var(--body-fill)"/><stop offset=".54" stop-color="var(--body-light)"/><stop offset="1" stop-color="var(--body-shadow)"/></linearGradient><linearGradient id="${id}-muscle" x1="0" x2="1" y2=".5"><stop offset="0" stop-color="var(--volume-low)"/><stop offset=".32" stop-color="var(--volume-high)"/><stop offset=".55" stop-color="var(--volume-high)"/><stop offset="1" stop-color="var(--volume-low)"/></linearGradient><linearGradient id="${id}-trained" x1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--training-high)"/><stop offset=".48" stop-color="var(--training-mid)"/><stop offset="1" stop-color="var(--training-low)"/></linearGradient><pattern id="${id}-secondary" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(25)"><rect width="7" height="7" fill="var(--secondary-fill)"/><path d="M0 0V7" stroke="var(--secondary-line)" stroke-width="1.2"/></pattern></defs>`;
 const bodyPaint=volume?`url(#${id}-body)`:"var(--body-fill)";
 const body=`<g class="anatomy-scaffold" aria-hidden="true"><path d="${head}" fill="${bodyPaint}"/><path d="${outline}" fill="${bodyPaint}"/><path class="ear" d="M134 54Q127 48 129 65L135 73M186 54Q193 48 191 65L185 73"/><path class="body-line" d="M43 350L54 359L64 352M277 350L266 359L256 352M130 610L141 611M179 611L190 610"/></g>`;
 const zones=rows.map(r=>{const trained=activity(r.muscle,state),chosen=selected===r.muscle,fill=['primary','high'].includes(trained)?(volume?`url(#${id}-trained)`:'var(--primary-fill)'):trained==='secondary'?`url(#${id}-secondary)`:trained==='moderate'?'var(--trained-moderate)':trained==='stabilizer'||trained==='low'?'var(--stabilizer-fill)':volume?`url(#${id}-muscle)`:'var(--muscle-fill)';const label=`${r.label}. ${trained==='none'?'No highlighted work':['high','moderate','low'].includes(trained)?'Recorded weekly activity: '+trained:trained==='primary'?'Primary work highlighted':trained==='secondary'?'Secondary work highlighted':'Stabilizing work highlighted'}. ${chosen?'Selected. Activate to clear selection.':'Activate to select '+(muscleNames[r.muscle]||r.muscle)+'.'}`;return `<path d="${r.d}" ${r.mirror?'transform="translate(320 0) scale(-1 1)"':''} class="anatomy-region ${chosen?'is-selected':''}" data-region="${r.id}" data-muscle="${r.muscle}" data-contribution="${trained}" data-muscle-label="${escape(r.label)}" fill="${fill}" ${interactive?`role="button" tabindex="0" aria-pressed="${chosen}" aria-label="${escape(label)}"`:'aria-hidden="true"'}><title>${escape(label)}</title></path>`;}).join('');
 const guides=concept!=='A'?`<path class="anatomy-landmarks" aria-hidden="true" d="${side==='front'?landmarkFront:landmarkBack}"/>`:'';
 const silhouette=concept==='A'?'essential':concept==='B'?'clinical':concept==='C'?'athletic':'sculpted';
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 680" class="anatomy-figure concept-${concept} ${silhouette}" data-anatomy-concept="${concept}" data-side="${side}" data-theme="${theme}" role="group" aria-label="${escape(conceptInfo[concept].name)}, ${side} view. Original conceptual muscle map; all figures use the same fictional training data.">${defs}<ellipse class="anatomy-ground" cx="160" cy="663" rx="69" ry="4" aria-hidden="true"/>${body}${zones}${guides}</svg>`;
}
