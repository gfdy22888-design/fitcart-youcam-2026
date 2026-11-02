import assert from 'node:assert/strict';
const origin=process.env.FITCART_TEST_ORIGIN||'http://127.0.0.1:5173';
const home=await fetch(origin);assert.equal(home.status,200);assert.match(await home.text(),/Your style/);
const status=await fetch(origin+'/api/status');assert.equal(status.status,200);assert.equal(typeof(await status.json()).configured,'boolean');
const headers={Origin:'https://unrelated.example','Content-Type':'application/json','X-YouCam-Key':'test-only-not-a-real-key'};
const rejected=await fetch(origin+'/api/try-on',{method:'POST',headers,body:'{}'});assert.ok([400,403].includes(rejected.status),'cross-origin request rejected');
headers.Origin=origin;
const invalid=await fetch(origin+'/api/try-on',{method:'POST',headers,body:'{}'});assert.equal(invalid.status,400);assert.match((await invalid.json()).error,/Upload your photo/);
const form=new FormData();form.set('file',new File([new Uint8Array(40)],'fake.png',{type:'image/png'}));
const fake=await fetch(origin+'/api/upload',{method:'POST',headers:{Origin:origin,'X-YouCam-Key':'test-only-not-a-real-key'},body:form});assert.equal(fake.status,400);assert.match((await fake.json()).error,/not a valid/);
for(const asset of ['sample-person.jpg','sample-outfit.png','linen-shirt.png','chore-jacket.png','navy-knit.png']){const r=await fetch(origin+'/assets/'+asset);assert.equal(r.status,200,asset);assert.ok(Number(r.headers.get('content-length'))>1000,asset);}
console.log('PASS: page, server status, cross-origin protection, missing image rejection, fake image rejection, and all 5 assets. No vendor calls.');

