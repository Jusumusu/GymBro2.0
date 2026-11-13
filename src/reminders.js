import {dueReminders} from './recurrence.js';
import {esc,button,field,options} from './ui.js';
export function permissionDescription(){
 if(!('Notification'in window)||!('serviceWorker'in navigator))return 'Browser notifications are unavailable here. In-app reminders can still work while Gym Bro is open.';
 return Notification.permission==='granted'?'Browser permission: Allowed.':Notification.permission==='denied'?'Browser permission: Blocked. You can change this in browser or device settings; in-app reminders still work.':'Browser permission: Not requested. Only the button below requests permission.';
}
export function notificationSettings(state){const n=state.upgrade.notifications;return `<section class="panel notification-settings"><h2>Notifications</h2><form id="notifications-form"><label class="toggle"><input type="checkbox" name="enabled" ${n.enabled?'checked':''} role="switch">Workout Notifications <strong data-notification-enabled>${n.enabled?'On':'Off'}</strong></label><p class="muted">Turning this off suppresses reminders and keeps every schedule and reminder preference.</p>${field('Default reminder timing',`<select name="defaultMinutes">${options({0:'At workout time',15:'15 minutes before',30:'30 minutes before',60:'1 hour before',1440:'1 day before'},String(n.defaultMinutes))}</select>`)}<p class="notification-status" id="notification-permission-status">${esc(permissionDescription())}</p>${button('Allow browser notifications','request-notification-permission','secondary')}<p class="notification-status">Reminders require this app to remain open and active. Closed or suspended apps cannot deliver reliable scheduled reminders on this static site. Reliable closed-app push needs a separate notification backend.</p><p class="muted">Uses your device’s local time. A clock time skipped by daylight saving has no reminder that day. Schedules remain on their chosen dates.</p></form></section>`;}
export function createReminders({getState,commit,go,onError}){
 let timer=null,last=Date.now(),enabled=false,started=false,busy=false;
 const status=()=>{const el=document.querySelector('#notification-permission-status');if(el)el.textContent=permissionDescription();};
 async function clear(){document.querySelector('#workout-reminder')?.remove();try{const base=new URL('./',document.baseURI).href,r=await navigator.serviceWorker?.getRegistration(base);if(r?.scope===base)for(const n of await r.getNotifications())if(n.tag.startsWith('gymbro-reminder:'))n.close();}catch{}}
 function sync(){const next=!!getState().upgrade?.notifications?.enabled;if(next!==enabled){enabled=next;last=Date.now();if(!enabled)clear();}const label=document.querySelector('[data-notification-enabled]');if(label)label.textContent=enabled?'On':'Off';status();}
 async function tick(now=Date.now()){
  if(busy||document.visibilityState==='hidden')return;sync();const since=last;last=now;if(!enabled)return;
  const due=dueReminders(getState(),since,now);if(!due.length)return;busy=true;
  try{
   await commit(s=>{if(!s.upgrade.notifications.enabled)return;const n=s.upgrade.notifications;for(const o of due)if(!n.delivered.some(x=>x.id===o.id))n.delivered.push({id:o.id,at:now});n.delivered=n.delivered.filter(x=>now-x.at<35*86400000).slice(-500);},{draw:false,award:false});
   if(!getState().upgrade.notifications.enabled)return;
   document.querySelector('#workout-reminder')?.remove();const panel=document.createElement('aside');panel.id='workout-reminder';panel.className='panel reminder-notice';panel.setAttribute('role','status');
   const title=document.createElement('strong');title.textContent='Your workout is coming up';const text=document.createElement('p');text.textContent=due.map(o=>(o.planName||'Workout')+' · '+o.time).join(' · ');const controls=document.createElement('div');controls.className='actions';
   const open=document.createElement('button');open.className='primary';open.textContent='Open calendar';open.onclick=()=>{panel.remove();go('calendar');};const dismiss=document.createElement('button');dismiss.className='secondary';dismiss.textContent='Dismiss';dismiss.onclick=()=>panel.remove();controls.append(open,dismiss);panel.append(title,text,controls);document.body.append(panel);
   if('Notification'in window&&Notification.permission==='granted'&&'serviceWorker'in navigator){const base=new URL('./',document.baseURI).href,r=await navigator.serviceWorker.getRegistration(base);if(r?.active&&r.scope===base)for(const o of due)await r.showNotification('Gym Bro',{body:`${o.planName||'Your scheduled workout'} · ${o.time}. ${o.reminderMinutes===0?'Time for your workout.':'Your scheduled workout starts soon.'}`,tag:'gymbro-reminder:'+base+o.id,icon:new URL('icon-192.png',base).href,data:{occurrenceId:o.id}});}
  }catch(error){onError('Reminder could not be delivered: '+error.message);}finally{busy=false;}
 }
 const visibility=()=>{if(document.visibilityState!=='hidden')tick();};
 function start(){if(started)return;started=true;enabled=!!getState().upgrade.notifications.enabled;last=Date.now();timer=setInterval(()=>tick(),15000);document.addEventListener('visibilitychange',visibility);window.addEventListener('focus',visibility);status();}
 function stop(){started=false;clearInterval(timer);document.removeEventListener('visibilitychange',visibility);window.removeEventListener('focus',visibility);}
 const actions={'request-notification-permission':async()=>{if(!('Notification'in window)){status();return;}if(Notification.permission==='default')await Notification.requestPermission();status();}};
 function change(el){if(el.form?.id!=='notifications-form')return;const name=el.name;if(!['enabled','defaultMinutes'].includes(name))return;const value=name==='enabled'?el.checked:Number(el.value);commit(s=>{s.upgrade.notifications[name]=value;},{draw:false,award:false}).then(sync).catch(error=>{if(el.isConnected){if(name==='enabled')el.checked=getState().upgrade.notifications.enabled;else el.value=String(getState().upgrade.notifications.defaultMinutes);}sync();onError(error.message);});}
 return {start,stop,sync,tick,actions,change};
}
