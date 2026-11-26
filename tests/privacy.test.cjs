const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const {KEY,VERSION,MAX_AGE,parse}=require('../js/privacy.js');
const source=fs.readFileSync(path.join(__dirname,'../js/privacy.js'),'utf8');
function visit({saved,blocked=false}={}){
  const local=new Map([['blackstack.language','ru'],['bs.lang','ru']]);
  if(saved)local.set(KEY,JSON.stringify(saved));
  const session=new Map([['bs_instagram_attribution_v1','old']]);
  const events=[];
  const storage=map=>({getItem(k){if(blocked)throw Error('blocked');return map.get(k)??null;},setItem(k,v){if(blocked)throw Error('blocked');map.set(k,v);},removeItem(k){if(blocked)throw Error('blocked');map.delete(k);}});
  const window={document:{documentElement:{lang:'en'},addEventListener(){}},localStorage:storage(local),sessionStorage:storage(session),CustomEvent:class{constructor(name,options){this.type=name;this.detail=options.detail;}},dispatchEvent(event){events.push(event);}};
  vm.runInNewContext(source,{window,Date,JSON});
  return {api:window.BlackStackPrivacy,local,session,events};
}
test('new visitors have no optional storage and no implied permission',()=>{
  const page=visit();
  for(const key of ['preferences','attribution','externalMedia'])assert.equal(page.api.allows(key),false);
  assert.equal(page.local.has(KEY),false);
  assert.equal(page.local.has('blackstack.language'),false);
  assert.equal(page.local.has('bs.lang'),false);
  assert.equal(page.session.size,0);
});
test('choices are separate and withdrawal clears optional data',()=>{
  const page=visit();page.api.setConsent({preferences:true,attribution:true,externalMedia:false});
  assert.equal(page.api.allows('preferences'),true);
  assert.equal(page.api.allows('externalMedia'),false);
  assert.equal(page.local.get('blackstack.language'),'en');
  page.session.set('bs_instagram_attribution_v1','label');
  page.api.setConsent({preferences:false,attribution:false,externalMedia:false});
  assert.equal(page.local.has('blackstack.language'),false);assert.equal(page.session.size,0);
  const record=JSON.parse(page.local.get(KEY));
  assert.equal(record.expires-record.at,MAX_AGE);
  assert.equal(page.events.length,2);
});
test('external media grant does not opt into other purposes',()=>{
  const page=visit();page.api.grant('externalMedia');
  assert.equal(page.api.allows('externalMedia'),true);
  assert.equal(page.api.allows('preferences'),false);
  assert.equal(page.api.allows('attribution'),false);
  page.api.grant('unknown');assert.equal(page.events.length,1);
});
test('expired, future, malformed and incompatible records fail closed',()=>{
  const now=Date.now();const valid={version:VERSION,at:now-1000,expires:now+1000,preferences:true,attribution:false,externalMedia:false};
  assert.ok(parse(JSON.stringify(valid),now));
  for(const record of [{...valid,expires:now},{...valid,at:now+1},{...valid,version:VERSION+1},{...valid,preferences:'true'},{...valid,expires:valid.at+MAX_AGE+1}])assert.equal(parse(JSON.stringify(record),now),null);
  assert.equal(parse('{broken',now),null);
});
test('blocked storage cannot prevent an explicit choice on this page',()=>{
  const page=visit({blocked:true});
  assert.doesNotThrow(()=>page.api.setConsent({externalMedia:true}));
  assert.equal(page.api.allows('externalMedia'),true);
  assert.equal(page.api.allows('preferences'),false);
});
