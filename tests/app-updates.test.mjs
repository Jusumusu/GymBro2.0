import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validRelease} from '../src/app-updates.js';
test('release checks distinguish build identities at the same app version and reject other environments',()=>{
 const release={schema:1,build:'123456abcdef',version:'0.2.3',environment:'production'};
 assert.ok(validRelease(release,'production'));assert.ok(validRelease({...release,build:'abcdef123456'},'production'));
 assert.equal(validRelease(release,'preview'),false);
 for(const value of [null,{}, {...release,schema:2},{...release,build:'../preview/'},{...release,version:'<script>'},{...release,version:23}])assert.equal(validRelease(value,'production'),false);
});
