import fs from 'node:fs';
const text=fs.readFileSync('.dev.vars','utf8').replace(/^\uFEFF/,'');
const match=text.match(/^\s*YOUCAM_API_KEY\s*=\s*(.*)$/m);
let key=(match?.[1]||'').trim();
if((key.charCodeAt(0)===34&&key.charCodeAt(key.length-1)===34)||(key.charCodeAt(0)===39&&key.charCodeAt(key.length-1)===39))key=key.slice(1,-1);
console.log(JSON.stringify({keyConfigured:!!key,containsSpaces:/\s/.test(key),hasUnexpectedAssignment:key.includes('YOUCAM_API_KEY=')}));
