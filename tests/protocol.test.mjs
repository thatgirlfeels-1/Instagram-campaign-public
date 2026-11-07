import test from 'node:test';
import assert from 'node:assert/strict';
import {PROTOCOL, ALLOWED_PARENTS, isAllowedParent, validHello, readyPacket} from '../pages/protocol.mjs';
const parent={};
const message=(origin='https://www.instagram.com',source=parent,challenge='a'.repeat(32))=>({origin,source,data:{protocol:PROTOCOL,type:'hello',challenge}});
test('accept exact Instagram host origins only',()=>{
  assert.equal(isAllowedParent('https://www.instagram.com'),true);
  assert.equal(isAllowedParent('https://instagram.com'),true);
  for(const origin of ['http://www.instagram.com','https://www.instagram.com.attacker.test','https://evil.test','null','https://m.instagram.com'])assert.equal(isAllowedParent(origin),false);
  assert.equal(ALLOWED_PARENTS.length,2);
});
test('handshake requires source and valid challenge',()=>{
  assert.equal(validHello(message(),parent),true);
  assert.equal(validHello(message('https://instagram.com'),parent),true);
  assert.equal(validHello(message('https://evil.test'),parent),false);
  assert.equal(validHello(message('https://www.instagram.com',{}),parent),false);
  assert.equal(validHello(message('https://www.instagram.com',parent,'bad'),parent),false);
  const other=message();other.data.type='private-data';assert.equal(validHello(other,parent),false);
});
test('response contains no private data or note contents',()=>{
  const x=readyPacket('f'.repeat(32),{localSyntheticStorage:true});
  assert.deepEqual(x,{protocol:PROTOCOL,type:'ready',challenge:'f'.repeat(32),capabilities:{separateOrigin:true,localSyntheticStorage:true}});
  assert.equal(JSON.stringify(x).includes('token'),false);
});
