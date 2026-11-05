// Only UI choices and token presence live here. Never store credentials in state/backups.
export const coachSession={mode:'local',exerciseId:'',tokenPresent:false,message:'',pending:false};
export function coachConnection(coach){
 if(!coach.endpoint)return {ready:false,title:'AI is not connected',detail:'You are using offline training tools. Connect a hosted AI backend for open-ended conversation.'};
 if(!coach.consent)return {ready:false,title:'Cloud AI needs your consent',detail:'Review what training context you want to share before enabling cloud AI.'};
 if(!coachSession.tokenPresent)return {ready:false,title:'Enter your backend access token',detail:'Your token stays in this tab and is cleared on reload. Offline tools remain available.'};
 return {ready:true,title:coachSession.mode==='cloud'?'Cloud AI selected':'Offline tools selected',detail:coachSession.mode==='cloud'?'Your next question will be sent to your configured AI backend.':'Choose Cloud AI below when you want a conversational answer.'};
}
