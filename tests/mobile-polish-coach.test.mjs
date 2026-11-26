import {test} from 'node:test';
import assert from 'node:assert/strict';
import {coachView,legacyCoachView} from '../src/upgrade-ui.js';
import {refinementFixture} from './fixtures/refinement.mjs';
test('Coach development placeholder retains every saved field and exposes no unfinished controls',()=>{
 const s=refinementFixture('2026-11-25');s.upgrade.coach.messages=[{id:'saved',role:'user',text:'Synthetic saved coaching note',at:1,mode:'local'}];s.upgrade.coach.memory=[{id:'saved-memory',text:'Synthetic preference',source:'explicit'}];const before=structuredClone(s),html=coachView(s);
 assert.match(html,/Gym Bro Coach/);assert.match(html,/in development/i);assert.ok(!/coach-form|coach-messages|data-action=|<button|<form/.test(html));assert.deepEqual(s,before);assert.equal(typeof legacyCoachView,'function');
});
