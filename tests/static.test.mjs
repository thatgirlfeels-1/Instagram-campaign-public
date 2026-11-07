import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const parent=readFileSync(new URL('../bookmarklet/overlay-source.js',import.meta.url),'utf8');
const child=readFileSync(new URL('../pages/app.mjs',import.meta.url),'utf8');
const html=readFileSync(new URL('../pages/index.html',import.meta.url),'utf8');
test('parent bookmarklet loads only fixed public iframe',()=>{
  assert.match(parent,/https:\/\/thatgirlfeels-1\.github\.io/);
  assert.match(parent,/Instagram-campaign-public/);
  assert.doesNotMatch(parent,/api\.github\.com|authorization|github_pat_|ghp_|<script/i);
});
test('no GitHub token or outgoing fetch in child',()=>{
  assert.doesNotMatch(child,/fetch\s*\(|XMLHttpRequest|github_pat_|api\.github\.com/);
  assert.match(html,/connect-src 'none'/);
  assert.match(html,/No account connection/);
});
test('messages check both origin and source',()=>{
  assert.match(parent,/event\.source!==frame\.contentWindow\|\|event\.origin!==origin/);
  assert.match(child,/validHello\(event, window\.parent\)/);
});
test('child captures note before asynchronous storage',()=>{
  assert.match(child,/const invented = \$\('fakeNote'\)\.value/);
  assert.match(child,/await storeSynthetic\('write', invented\)/);
});
test('generated bookmarklet compiles as one javascript URL',()=>{
  const compact=readFileSync(new URL('../bookmarklet/bookmarklet.txt',import.meta.url),'utf8').trim();
  assert.ok(compact.startsWith('javascript:'));
  assert.doesNotThrow(()=>new Function(compact.slice('javascript:'.length)));
});
