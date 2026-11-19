// Local lexical ranking. Favoriting never moves a result across a relevance tier.
export const normalizeSearch=value=>String(value||'').normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
export function searchDocument(name,aliases,text){const title=normalizeSearch(name),names=[title,...aliases.map(normalizeSearch)].filter(Boolean);return {title,names,tokens:[...new Set(names.join(' ').split(' '))],metadataTokens:normalizeSearch(text).split(' '),text:normalizeSearch(text)};}
// Optimal string alignment includes adjacent transpositions, with an early length bound.
export function editDistance(a,b,limit){if(Math.abs(a.length-b.length)>limit)return limit+1;let prevprev=null,prev=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){const row=[i];for(let j=1;j<=b.length;j++){row[j]=Math.min(row[j-1]+1,prev[j]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])row[j]=Math.min(row[j],prevprev[j-2]+1);}prevprev=prev;prev=row;}return prev[b.length];}
export function rankSearch(index,query,{favorites=new Set(),recentIds=[]}={}){
 const q=normalizeSearch(query);if(!q)return index;if(q.length>160)return [];const words=q.split(' '),memo=new Map(),recent=new Map([...recentIds].map((id,i)=>[id,i]));
 const fuzzy=(a,b)=>{if(a.length<4||b.length<4)return Infinity;const limit=a.length<=5?1:2,key=a+'|'+b;if(!memo.has(key))memo.set(key,editDistance(a,b,limit));const d=memo.get(key);return d<=limit&&d/Math.max(a.length,b.length)<=.34?d:Infinity;};
 const known=new Set(index.flatMap(x=>x.search.metadataTokens));
 return index.flatMap((x,order)=>{const d=x.search;let tier=0,cost=0;
  if(d.title===q)tier=6;else if(d.names.slice(1).includes(q))tier=5;else if(d.names.some(n=>n.startsWith(q)))tier=4;
  else if(words.every(w=>d.tokens.some(t=>t===w||t.startsWith(w))))tier=3;
  else if(words.every(w=>d.text.includes(w)))tier=2;
  else {for(const w of words){if(d.metadataTokens.some(t=>t===w||t.startsWith(w)))continue;/* Known words must retain their meaning (e.g. biceps vs triceps). */if(known.has(w))return [];const distance=Math.min(...d.tokens.map(t=>fuzzy(w,t)));if(!Number.isFinite(distance))return [];cost+=distance;}tier=1;}
  const phrase=tier===1&&d.names.some(n=>editDistance(n,q,2)<=2)?1:0;
  return [{x,tier,cost,phrase,order,favorite:favorites.has(x.exercise.id)?1:0,recent:recent.get(x.exercise.id)??Infinity}];
 }).sort((a,b)=>b.tier-a.tier||a.cost-b.cost||b.phrase-a.phrase||b.favorite-a.favorite||a.recent-b.recent||a.order-b.order).map(r=>r.x);
}
