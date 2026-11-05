const ex=(id,name,muscle,pattern,equipment,secondary,compound,cues)=>({id,name,muscle,pattern,equipment,secondary,compound,difficulty:compound?'moderate':'accessible',unilateral:false,loadKind:equipment==='dumbbell'?'per dumbbell':equipment==='bodyweight'?'added load':'total load',cues});
export const EXERCISES=[
 ex('squat','Barbell squat','Quads','squat','barbell',['Glutes'],true,'Brace before each rep. Sit between your hips, keep your feet planted, and use a comfortable depth.'),
 ex('goblet','Goblet squat','Quads','squat','dumbbell',['Glutes'],true,'Hold the weight close to your chest. Keep your feet planted and stand tall.'),
 ex('body-squat','Bodyweight squat','Quads','squat','bodyweight',['Glutes'],true,'Use a comfortable stance and depth. Control the lowering phase.'),
 ex('leg-press','Leg press','Quads','squat','machine',['Glutes'],true,'Keep your hips against the pad. Lower within your comfortable range without locking out forcefully.'),
 ex('bench','Barbell bench press','Chest','horizontal push','barbell',['Triceps','Shoulders'],true,'Use a stable setup. Lower under control, keep wrists stacked, and use safeties or a spotter.'),
 ex('db-bench','Dumbbell bench press','Chest','horizontal push','dumbbell',['Triceps','Shoulders'],true,'Keep a stable shoulder position. Use a comfortable elbow angle. Log the load of one dumbbell.'),
 ex('pushup','Push-up','Chest','horizontal push','bodyweight',['Triceps','Shoulders'],true,'Keep your trunk braced. Use a raised surface if needed and lower with control.'),
 ex('chest-press','Machine chest press','Chest','horizontal push','machine',['Triceps','Shoulders'],true,'Adjust the seat so handles sit around mid-chest. Press through a comfortable range.'),
 ex('rdl','Romanian deadlift','Hamstrings','hinge','barbell',['Glutes','Back'],true,'Keep the load close. Hinge at the hips with soft knees; stop before your back position changes.'),
 ex('db-rdl','Dumbbell Romanian deadlift','Hamstrings','hinge','dumbbell',['Glutes','Back'],true,'Push your hips back with a braced trunk. Keep the dumbbells close to your legs.'),
 ex('bridge','Glute bridge','Glutes','hinge','bodyweight',['Hamstrings'],true,'Press through your feet, raise your hips, and avoid arching your lower back.'),
 ex('curl-leg','Leg curl','Hamstrings','knee flexion','machine',[],false,'Adjust the pad to your lower legs. Curl smoothly without lifting your hips.'),
 ex('row','Barbell row','Back','horizontal pull','barbell',['Biceps'],true,'Brace your trunk and hold a stable hinge. Pull toward the lower ribs without jerking.'),
 ex('db-row','Dumbbell row','Back','horizontal pull','dumbbell',['Biceps'],true,'Support your trunk. Pull toward your hip without rotating; log reps per side.'),
 ex('cable-row','Seated cable row','Back','horizontal pull','cable',['Biceps'],true,'Keep your torso stable. Pull toward your ribs and return under control.'),
 ex('floor-pull','Prone floor pull','Back','horizontal pull','bodyweight',[],false,'Lie face down, lift your arms gently and draw elbows toward your ribs. This has limited loading potential.'),
 ex('ohp','Overhead press','Shoulders','vertical push','barbell',['Triceps'],true,'Brace your trunk. Press overhead through a comfortable range without leaning back.'),
 ex('db-ohp','Dumbbell shoulder press','Shoulders','vertical push','dumbbell',['Triceps'],true,'Keep wrists above elbows. Use a comfortable range and a stable torso.'),
 ex('pike','Pike push-up','Shoulders','vertical push','bodyweight',['Triceps'],true,'Raise your hips and bend your elbows under control. Adjust hand position for comfort.'),
 ex('pulldown','Lat pulldown','Back','vertical pull','cable',['Biceps'],true,'Pull toward your upper chest, keeping your torso stable. Do not pull behind your neck.'),
 ex('pullup','Pull-up','Back','vertical pull','bodyweight',['Biceps'],true,'Start from a comfortable hang. Pull without swinging and lower under control. Log added load only.'),
 ex('lateral','Dumbbell lateral raise','Shoulders','abduction','dumbbell',[],false,'Raise to a comfortable height with soft elbows. Avoid swinging.'),
 ex('curl','Dumbbell curl','Biceps','elbow flexion','dumbbell',[],false,'Keep your elbows stable. Curl without swinging; record reps per side.'),
 ex('pushdown','Cable triceps pushdown','Triceps','elbow extension','cable',[],false,'Keep elbows close to your sides. Extend under control without moving your shoulders.'),
 ex('calf','Standing calf raise','Calves','plantar flexion','bodyweight',[],false,'Rise onto your toes, pause, and lower with control. Use support for balance.'),
 ex('crunch','Crunch','Core','trunk flexion','bodyweight',[],false,'Lift your shoulder blades gently and exhale. Avoid pulling on your neck.'),
 ex('incline-db','Incline dumbbell press','Chest','horizontal push','dumbbell',['Shoulders','Triceps'],true,'Use a low incline and stable feet. Lower to a comfortable depth; log one dumbbell.'),
 ex('cable-fly','Cable chest fly','Chest','horizontal adduction','cable',[],false,'Keep a soft elbow bend. Bring your hands together without rounding or forcing the shoulder range.'),
 ex('db-split-squat','Dumbbell split squat','Quads','squat','dumbbell',['Glutes'],true,'Keep both feet planted in a split stance. Lower under control and record repetitions per side.'),
 ex('hip-thrust','Barbell hip thrust','Glutes','hip extension','barbell',['Hamstrings'],true,'Use a stable bench and padded bar. Raise the hips while keeping your ribs controlled; avoid overextending.'),
 ex('leg-extension','Leg extension','Quads','knee extension','machine',[],false,'Align your knee with the machine pivot. Extend smoothly through a comfortable range.'),
 ex('seated-leg-curl','Seated leg curl','Hamstrings','knee flexion','machine',[],false,'Secure the thigh pad and align the knee pivot. Curl under control without lifting your hips.'),
 ex('chest-supported-row','Chest-supported dumbbell row','Back','horizontal pull','dumbbell',['Biceps'],true,'Support your chest on a stable incline bench. Pull without lifting your torso; log one dumbbell.'),
 ex('rear-delt-fly','Dumbbell rear delt fly','Shoulders','horizontal abduction','dumbbell',['Back'],false,'Hinge with a stable trunk or use chest support. Move through a comfortable arc without swinging.'),
 ex('face-pull','Cable face pull','Shoulders','horizontal pull','cable',['Back'],false,'Use a light load and stable stance. Pull toward the face with a comfortable elbow position.'),
 ex('hammer-curl','Dumbbell hammer curl','Biceps','elbow flexion','dumbbell',[],false,'Keep palms facing inward and elbows stable. Curl without rocking your torso; log one dumbbell.'),
 ex('overhead-cable-extension','Overhead cable triceps extension','Triceps','elbow extension','cable',[],false,'Use a stable stance with elbows in a comfortable position. Extend smoothly without arching your back.'),
 ex('seated-calf','Seated calf raise','Calves','plantar flexion','machine',[],false,'Place the pad securely above your knees. Raise and lower the heels with control and a comfortable stretch.'),
 ex('reverse-crunch','Reverse crunch','Core','trunk flexion','bodyweight',[],false,'Keep the movement small and controlled. Curl the pelvis gently rather than swinging your legs.'),
 ex('cable-crunch','Cable crunch','Core','trunk flexion','cable',[],false,'Keep the hips stable and curl your trunk gently. Avoid pulling only with your arms.')
];
export const MUSCLES=['Chest','Back','Quads','Hamstrings','Glutes','Shoulders','Biceps','Triceps','Calves','Core'];
export const GOALS={hypertrophy:'Build muscle',strength:'Get stronger',balanced:'Muscle & strength',recomposition:'Body recomposition',fatloss:'Preserve muscle in fat loss',endurance:'Muscular endurance',fitness:'General fitness'};
export const library=state=>[...EXERCISES,...state.customExercises];
export const findExercise=(state,id)=>library(state).find(e=>e.id===id);
export const substitutions=(state,id)=>{
 const e=findExercise(state,id);if(!e)return [];
 const used=new Set(state.sessions.slice(-12).flatMap(w=>w.exercises.map(x=>x.exerciseId)));
 return library(state).filter(x=>x.id!==id&&state.profile.equipment.includes(x.equipment)&&!state.profile.excluded.includes(x.id)&&(x.pattern===e.pattern||x.muscle===e.muscle)).map(x=>{
  const familiar=used.has(x.id),beginner=state.profile.experience==='beginner',supported=x.equipment==='machine'||x.equipment==='cable'||x.difficulty==='accessible';
  const goalFit=state.profile.goal==='strength'?x.compound&&x.loadKind===e.loadKind:state.profile.priorities.includes(x.muscle);
  const matchScore=(x.pattern===e.pattern?6:0)+(x.muscle===e.muscle?5:0)+(x.equipment===e.equipment?1:0)+(x.compound===e.compound?1:0)+(goalFit?1:0)+(beginner&&supported?1:0)+(familiar?1:0);
  const difference=(x.pattern===e.pattern?'Same movement pattern.':'Same primary muscle; different movement pattern.')+(goalFit?' Fits your recorded goal/priorities.':'')+(beginner&&supported?' Supported or accessible option.':'')+(familiar?' Used in your recent history.':'')+' Use this exercise’s own load baseline.';
  return {...x,matchScore,difference};
 }).sort((a,b)=>b.matchScore-a.matchScore||a.name.localeCompare(b.name));
};
