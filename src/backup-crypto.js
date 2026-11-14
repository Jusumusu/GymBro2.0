// Portable authenticated envelopes. The complete JSON backup (including metadata) is encrypted.
// UI integration is gated by the advanced-training design review.
const FORMAT='gymbro-encrypted-backup';
const ITERATIONS=600000;
const MAX_BYTES=100*1024*1024;
const encode=bytes=>{let s='';for(let i=0;i<bytes.length;i+=16384)s+=String.fromCharCode(...bytes.subarray(i,i+16384));return btoa(s);};
function decode(value,max){if(typeof value!=='string'||value.length>Math.ceil(max/3)*4||value.length%4!==0||!/^[A-Za-z0-9+/]*={0,2}$/.test(value))throw Error('Invalid encrypted backup encoding.');return Uint8Array.from(atob(value),c=>c.charCodeAt(0));}
function passwordBytes(password){if(typeof password!=='string'||password.length<10||password.length>1024)throw Error('Use a password between 10 and 1024 characters. Losing it makes the backup unrecoverable.');return new TextEncoder().encode(password);}
async function key(password,salt,usage){const material=await crypto.subtle.importKey('raw',passwordBytes(password),'PBKDF2',false,['deriveKey']);return crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:ITERATIONS,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,[usage]);}
const aad=new TextEncoder().encode(FORMAT+':1:PBKDF2-SHA256:600000:AES-256-GCM');
export async function encryptBackup(plaintext,password){
 if(typeof plaintext!=='string')throw Error('Backup content must be text.');
 const bytes=new TextEncoder().encode(plaintext);if(bytes.length>MAX_BYTES)throw Error('Backup exceeds 100 MB.');
 const salt=crypto.getRandomValues(new Uint8Array(16)),iv=crypto.getRandomValues(new Uint8Array(12));
 const ciphertext=await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:aad,tagLength:128},await key(password,salt,'encrypt'),bytes);
 return JSON.stringify({format:FORMAT,version:1,kdf:'PBKDF2-SHA256',iterations:ITERATIONS,cipher:'AES-256-GCM',salt:encode(salt),iv:encode(iv),ciphertext:encode(new Uint8Array(ciphertext))});
}
export async function decryptBackup(text,password){
 if(typeof text!=='string'||text.length>Math.ceil((MAX_BYTES+16)/3)*4+1024)throw Error('Encrypted backup exceeds the size limit.');
 let envelope;try{envelope=JSON.parse(text);}catch{throw Error('This encrypted backup is not valid JSON.');}
 if(!envelope||envelope.format!==FORMAT||envelope.version!==1||envelope.kdf!=='PBKDF2-SHA256'||envelope.iterations!==ITERATIONS||envelope.cipher!=='AES-256-GCM')throw Error('Unsupported encrypted backup format.');
 const salt=decode(envelope.salt,16),iv=decode(envelope.iv,12),ciphertext=decode(envelope.ciphertext,MAX_BYTES+16);
 if(salt.length!==16||iv.length!==12||ciphertext.length<16||ciphertext.length>MAX_BYTES+16)throw Error('Invalid encrypted backup parameters.');
 const derived=await key(password,salt,'decrypt');
 try{const bytes=await crypto.subtle.decrypt({name:'AES-GCM',iv,additionalData:aad,tagLength:128},derived,ciphertext);return new TextDecoder('utf-8',{fatal:true}).decode(bytes);}catch{throw Error('Cannot unlock this backup. The password is incorrect or the file is damaged.');}
}
