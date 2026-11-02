import {spawnSync} from 'node:child_process';
const mode=process.argv[2]||'check';
const auth=spawnSync('git',['credential','fill'],{input:'protocol=https\nhost=github.com\n\n',encoding:'utf8',timeout:15000,env:{...process.env,GCM_INTERACTIVE:'Never',GIT_TERMINAL_PROMPT:'0'},windowsHide:true});
const fields=Object.fromEntries((auth.stdout||'').split(/\r?\n/).filter(l=>l.includes('=')).map(l=>[l.slice(0,l.indexOf('=')),l.slice(l.indexOf('=')+1)]));
if(!fields.password){console.log(JSON.stringify({authenticated:false,reason:'No existing GitHub credential. Sign in to GitHub using normal user login.'}));process.exit(2);}
const headers={Authorization:'Bearer '+fields.password,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','User-Agent':'FitCart-publisher'};
async function api(path,body){const r=await fetch('https://api.github.com'+path,{method:body?'POST':'GET',headers:{...headers,...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});const data=await r.json();return {r,data};}
const user=await api('/user');if(!user.r.ok){console.log(JSON.stringify({authenticated:false,status:user.r.status}));process.exit(2);}
if(mode==='check'){console.log(JSON.stringify({authenticated:true,login:user.data.login}));process.exit(0);}
if(mode!=='publish'){console.log('Use check or publish.');process.exit(2);}
const name='fitcart-youcam-2026';let repo=await api('/repos/'+user.data.login+'/'+name);
if(repo.r.status===404)repo=await api('/user/repos',{name,description:'FitCart: YouCam virtual try-on, considered shopping, comparison and budget-aware shortlists.',private:false,auto_init:false});
if(!repo.r.ok||repo.data.private){console.log(JSON.stringify({published:false,status:repo.r.status,reason:'Repository unavailable or private; no access settings were changed.'}));process.exit(1);}
const branch=spawnSync('git',['symbolic-ref','--short','HEAD'],{encoding:'utf8',windowsHide:true}).stdout.trim();
const push=spawnSync('git',['push',repo.data.clone_url,'HEAD:refs/heads/'+branch],{encoding:'utf8',timeout:120000,windowsHide:true,env:{...process.env,GCM_INTERACTIVE:'Never',GIT_TERMINAL_PROMPT:'0'}});
if(push.status!==0){console.log(JSON.stringify({published:false,repository:repo.data.html_url,reason:'Git push failed; local source retained.'}));process.exit(1);}
console.log(JSON.stringify({published:true,repository:repo.data.html_url,branch}));
