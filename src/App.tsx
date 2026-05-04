import { useState, useEffect, useRef } from "react";
const DARK = { bg:"#0a0806",bg2:"#0f0d0a",bg3:"#141210",muted:"#2e2a22",mut2:"#4a4538",text:"
const LIGHT = { bg:"#f5efe0",bg2:"#ede5d0",bg3:"#e5dcc8",muted:"#c8bca0",mut2:"#a89878",text:
const STARTERS = [
{ id:"IGNITE", el:"Fire", col:"#C97A35", colL:"#A05010", glow:"#ff8c20", scent:"Sumatra O
{ id:"CURRENT",el:"Water", col:"#3A7AAA", colL:"#1A5A8A", glow:"#50aaee", scent:"Sparkling
{ id:"GROUND", el:"Earth", col:"#7A5A2A", colL:"#5A3A0A", glow:"#c09040", scent:"Cedar & L
{ id:"CLARITY",el:"Air", col:"#5A8A5A", colL:"#2A6A2A", glow:"#80d080", scent:"White Flo
{ id:"RESTORE",el:"Spirit", col:"#7A5A9A", colL:"#5A3A7A", glow:"#b090e0", scent:"Zen Relax
];
const sc = (st, T) => T.mode === "light" ? st.colL : st.col;
const WISDOM = [
"He leads me beside still waters. He restores my soul.",
"The interval between two notes is where music lives.",
"What you do with 252 seconds shapes every hour that follows.",
"82 degrees. 252 seconds. The precision of devotion.",
"Noise is not the problem. Presence is the answer.",
"The still waters are not a metaphor. They are a biochemical reality.",
"Candor only arrives after presence. Presence only arrives after stillness.",
"To nourish deeply is to protect what matters most.",
"Sovereignty is not taken. It is cultivated, 252 seconds at a time.",
"L-theanine flows where intention leads.",
];
const TRANSMISSIONS = [
"The 82/252 extraction was precise. Your RMSSD improved by +XX ms, confirming the parasympa
"A vision without a ledger is a daydream. A ledger without a vision is a prison. Today you
"Thy tribulation is the furnace of the Great Alchemist. Yield not to the heat; it is the he
"The 10% Protocol is non-negotiable. Retain the seed. Protect the estate. Your biology now
"RMSSD confirms what your mind already knows: the down-regulation sequence is complete. The
"82°C for exactly 252 seconds optimised the extraction. +XX ms RMSSD proves the shift. Patr
"Discipline is the bridge between the ritual and the result. Your RMSSD delta is the receip
"The tannin spike was arrested at 253 seconds. The L-Theanine advantage is yours. Steward,
"Every 252-second interval compounds. +XX ms today compounds into sovereign presence tomorr
"The furnace has done its work. Your RMSSD improvement is the proof of refinement. The stee
"The 82/252 Protocol is not suggestion — it is law. You obeyed the law. The law delivered +
"Momentum is built one precise interval at a time. Today you added another. The ledger show
"You did not merely drink tea. You executed a measured down-regulation. +XX ms RMSSD is the
"Character is forged in the 252-second interval. Your RMSSD confirms the forging is underwa
"The seed of calm was planted at 82°C. +XX ms RMSSD is the first green shoot. Protect it. E
"Precision beats volume. One perfect 252 seconds beats a thousand vague minutes. The ledger
"The parasympathetic system has been paid its due. +XX ms RMSSD is the receipt of payment.
"You have completed the ritual. The ritual has completed you. The numbers do not lie. Go be
"82°C. 252 seconds. +XX ms RMSSD. Three facts. One truth: the Steward has reclaimed the thr
"The synthesis is complete. Chemical, sensory, and digital forces aligned. Your biology now
"Every ritual is a deposit into the sovereign account. +XX ms RMSSD is today's interest. Co
"The 252-second interval is the minimum viable dose of sovereignty. You took it. The RMSSD
"Discipline is freedom. You chose the protocol. The protocol chose you. +XX ms RMSSD is the
"The furnace does not ask permission. It only asks obedience. You obeyed. The steel is stro
"RMSSD does not negotiate. It measures. Today it measured victory. Steward, the victory is
"The 82/252 window is narrow. You hit it. The L-Theanine advantage is now yours. Go be you.
"One precise ritual compounds faster than a thousand vague intentions. +XX ms RMSSD proves
"The ledger never forgets. Today it recorded +XX ms RMSSD and a sovereign act. The balance
"You have synchronised the 82°C extraction with the 252-second interval. Biology has answer
"The Patron has spoken. The RMSSD has listened. The calm is now law. Go be you.",
];
const genTX = (delta, state) => {
let t = TRANSMISSIONS[Math.floor(Math.random() * TRANSMISSIONS.length)];
t = t.replace(/\+XX ms/g, `+${delta} ms`);
if (Math.random() > 0.6) t = t.replace("Steward", `${state} Steward`);
return t;
};
const SCIENCE_CARDS = [
{ ico:" ", title:"82°C Protocol", { ico:" { ico:" body:"L-theanine extraction from Camellia sinensis
", title:"Olfactory Anchoring", body:"Over 6–8 weeks of daily exposure, a consist
", title:"Functional Honey", body:"Raw functional honey delivers polyphenols t
{ ico:"✍", title:"The Write Protocol", body:"Post-session synthesis within 90 seconds cap
];
const TOTAL = 252;
const BREATH_CYCLE = [
{ phase:"inhale", label:"BREATHE IN · 7", dur:7000 },
{ phase:"hold", label:"HOLD · 5", dur:5000 },
{ phase:"exhale", label:"BREATHE OUT · 7", dur:7000 },
];
/* ── SVG MARKS ─────────────────────────────────────────────────────────── */
const ZUMark = ({ size=90, T=DARK }) => {
const d = T.mode==="dark";
return (
<svg width={size} height={size} viewBox="0 0 320 320" fill="none"
style={{filter:`drop-shadow(0 0 ${size*.18}px ${d?"#C9A84C55":"#8B651030"})`,animation:
<defs>
<radialGradient id={`zb${T.mode}`} cx="60%" cy="40%" r="55%">
<stop offset="0%" stopColor={d?"#1e1808":"#ede5cc"}/><stop offset="100%" stopColor=
</radialGradient>
<linearGradient id={`zg${T.mode}`} x1="10%" y1="0%" x2="90%" y2="100%">
<stop offset="0%" stopColor={d?"#f5e090":"#8a6010"}/><stop offset="40%" stopColor="
</linearGradient>
</defs>
<circle cx="160" cy="160" r="158" fill={`url(#zb${T.mode})`}/>
{[132,111,92].map((r,i)=>(
<circle key={i} cx="160" cy="160" r={r} stroke={`url(#zg${T.mode})`} strokeWidth={[2.
))}
{[[160,16,160,4],[160,304,160,316],[16,160,4,160],[304,160,316,160]].map(([x1,y1,x2,y2]
<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={`url(#zg${T.mode})`} strokeWidt
))}
{[[160,28,160,52],[160,292,160,268],[28,160,52,160],[292,160,268,160]].map(([x1,y1,x2,y
<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={`url(#zg${T.mode})`} strokeWidt
))}
{[[160,4],[160,316],[4,160],[316,160]].map(([cx,cy],i)=>(
<circle key={i} cx={cx} cy={cy} r="4.5" fill={`url(#zg${T.mode})`}/>
))}
<text x="160" y="188" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="92" fontW
</svg>
);
};
const MerakilusMark = ({ size=80, T=DARK }) => {
const d = T.mode==="dark";
const mid = `mh${T.mode}`;
const core = `mc${T.mode}`;
return (
<svg width={size} height={size*1.15} viewBox="0 0 200 230" fill="none"
style={{animation:"heartGlow 2.8s ease infinite"}}>
<defs>
<radialGradient id={mid} cx="50%" cy="52%" r="52%">
<stop offset="0%" stopColor="#fff8e0" stopOpacity={d?".95":".7"}/><stop offset="22%
<stop offset="50%" stopColor="#C9A84C"/><stop offset="78%" stopColor="#C97A35"/>
<stop offset="100%" stopColor="#6a3000" stopOpacity=".4"/>
</radialGradient>
<radialGradient id={core} cx="50%" cy="45%" r="35%">
<stop offset="0%" stopColor="#fffde8" stopOpacity={d?".85":".5"}/><stop offset="100
</radialGradient>
<filter id="hblur"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode
</defs>
<path d="M158 2 C156 2 154 8 152 16 C150 24 146 34 138 44 C132 52 124 60 118 68" stroke
<path d="M164 2 C162 4 160 12 158 22 C156 32 150 44 142 54 C136 62 128 70 122 76" strok
<path d="M100 192 C70 170 30 146 20 112 C10 80 28 56 52 52 C66 50 82 60 100 80 C118 60
<path d="M100 180 C76 162 44 142 36 114 C28 88 44 68 64 64 C76 62 88 72 100 88 C112 72
{[[72,68,.4,3],[128,72,.5,2.5],[90,56,.35,2],[112,60,.45,2.2]].map(([cx,cy,op,r],i)=>(
<circle key={i} cx={cx} cy={cy} r={r} fill="#fff8c0" opacity={op} style={{animation:`
))}
<path d="M48 94 C42 80 38 66 44 52 C40 62 42 76 50 84 C44 74 44 60 50 50 C44 62 46 78 5
<path d="M152 94 C158 80 162 66 156 52 C160 62 158 76 150 84 C156 74 156 60 150 50 C156
<ellipse cx="100" cy="200" rx="3.5" ry="6" fill="#C9A84C" opacity={d?".75":".55"}/>
<circle cx="100" cy="212" r="2" fill="#C9A84C" opacity={d?".45":".3"}/>
</svg>
);
};
const CoCMark = ({ size=56, T=DARK }) => {
const d = T.mode==="dark";
return (
<svg width={size} height={size} viewBox="0 0 120 120" fill="none"
style={{filter:`drop-shadow(0 0 ${size*.1}px ${d?"#C9A84C40":"#8B651028"})`}}>
<defs>
<linearGradient id={`cg${T.mode}`} x1="5%" y1="5%" x2="95%" y2="95%">
<stop offset="0%" stopColor={d?"#f5e090":"#9a7018"}/><stop offset="35%" stopColor="
<stop offset="70%" stopColor={d?"#d4a030":"#8B6510"}/><stop offset="100%" stopColor
</linearGradient>
<radialGradient id={`cgl${T.mode}`} cx="32%" cy="28%" r="48%">
<stop offset="0%" stopColor="#C9A84C" stopOpacity={d?".22":".1"}/><stop offset="100
</radialGradient>
</defs>
<ellipse cx="52" cy="60" rx="46" ry="50" fill={`url(#cgl${T.mode})`}/>
<path d="M98 22 C84 10 62 6 42 10 C18 16 6 36 6 58 C6 80 20 100 44 108 C62 114 82 110 9
<path d="M98 22 C100 18 102 12 100 8 C98 4 94 5 94 9 C94 13 98 22 98 22Z" fill={`url(#c
<path d="M44 84 C40 73 36 62 40 50 C36 57 34 67 38 76 C32 68 32 56 37 47 C29 58 31 73 3
<path d="M57 80 C53 66 48 52 54 38 C48 47 46 59 50 70 C44 61 44 48 50 38 C42 51 44 67 5
<path d="M70 82 C66 71 62 60 66 50 C62 57 60 67 64 76 C58 68 58 56 63 47 C55 58 57 73 6
</svg>
);
};
/* ── SHARED COMPONENTS ──────────────────────────────────────────────────── */
const GoldRule = ({ T=DARK }) => (
<div style={{width:52,height:1,background:`linear-gradient(90deg,transparent,${T.gold},tran
);
const Btn = ({ onClick, children, style={}, variant="outline", col, T=DARK, disabled=false })
const c = col||T.gold;
const fillBg = T.mode==="light" ? `${c}2a` : `${c}1e`;
return (
<button disabled={disabled} onClick={disabled?undefined:onClick}
style={{background:variant==="fill"?fillBg:"transparent",border:`1px solid ${c}${varian
onMouseEnter={e=>{if(!disabled){e.currentTarget.style.background=`${c}2e`;e.currentTarg
onMouseLeave={e=>{if(!disabled){e.currentTarget.style.background=variant==="fill"?fillB
>{children}</button>
);
};
const EntrainDot = ({ active, col }) => {
const [on,setOn]=useState(false);
useEffect(()=>{if(!active){setOn(false);return;}const t=setInterval(()=>setOn(v=>!v),500);r
return <div style={{width:9,height:9,borderRadius:"50%",background:active&&on?col:`${col}20
};
const BreathOrb = ({ phase, col, secsLeft, total, T=DARK }) => {
const R=108, C=2*Math.PI*R, prog=1-secsLeft/total;
const anim={inhale:"breathIn .5s ease forwards",hold:"breathHold .1s ease forwards",exhale:
const d=T.mode==="dark";
return (
<div style={{position:"relative",width:260,height:260,display:"flex",alignItems:"center",
{[150,138,125].map((r,i)=>(
<div key={i} style={{position:"absolute",width:r*2,height:r*2,borderRadius:"50%",
border:`1px solid ${col}${d?["18","28","38"][i]:["28","38","50"][i]}`,
animation:`ringBreath${i} ${[3.8,3.2,2.6][i]}s ease-in-out infinite`,
animationDelay:`${[0,.4,.8][i]}s`,
boxShadow:d?`0 0 ${[8,12,16][i]}px ${col}${["08","12","18"][i]}`:"none"
}}/>
))}
<svg width="260" height="260" style={{position:"absolute",top:0,left:0,transform:"rotat
<circle cx="130" cy="130" r={R} fill="none" stroke={d?T.muted:`${col}22`} strokeWidth
<circle cx="130" cy="130" r={R} fill="none" stroke={col} strokeWidth="2.5" strokeDash
</svg>
<div style={{position:"absolute",width:178,height:178,borderRadius:"50%",border:`1px so
<div style={{width:158,height:158,borderRadius:"50%",background:d?`radial-gradient(circ
animation:`${anim[phase]||"none"}, orbGlow 2.8s ease-in-out infinite`}}>
<div className="cin" style={{fontSize:8,color:col,letterSpacing:3.5,opacity:.88,margi
<div className="cgm" style={{fontSize:44,color:d?col:T.text,fontWeight:300,lineHeight
<div className="cgm" style={{fontSize:10,color:T.tex2,letterSpacing:2,marginTop:3}}>s
</div>
</div>
);
};
const SimBadge = ({ T=DARK }) => (
<div style={{display:"inline-flex",alignItems:"center",gap:5,background:`${T.amber}18`,bord
<div style={{width:5,height:5,borderRadius:"50%",background:T.amber,animation:"gp 2s ease
<span className="cin" style={{fontSize:7,color:T.amber,letterSpacing:3}}>SIMULATED · DEMO
</div>
);
const HRVPanel = ({ pre=70, post=90, col, T=DARK }) => {
const d=T.mode==="dark";
return (
<div style={{border:`1px solid ${col}35`,padding:"18px",background:d?`linear-gradient(150
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marg
<div className="cin" style={{fontSize:8,color:col,letterSpacing:4}}>HRV MONITORING</d
<SimBadge T={T}/>
</div>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBo
<div style={{textAlign:"center"}}>
<div className="cin" style={{fontSize:7,color:T.tex2,letterSpacing:3,marginBottom:4
<div className="cgm" style={{fontSize:38,color:d?T.tex2:T.text,fontWeight:300}}>{pr
<div className="cin" style={{fontSize:7,color:T.tex2,letterSpacing:2}}>MS RMSSD</di
</div>
<div style={{textAlign:"center"}}>
<div className="cgm" style={{fontSize:30,color:col,marginBottom:5}}>+{post-pre}</di
<div style={{background:`${col}22`,border:`1px solid ${col}55`,padding:"3px 12px"}}
</div>
<div style={{textAlign:"center"}}>
<div className="cin" style={{fontSize:7,color:col,letterSpacing:3,marginBottom:4}}>
<div className="cgm" style={{fontSize:38,color:col,fontWeight:300}}>{post}</div>
<div className="cin" style={{fontSize:7,color:col,letterSpacing:2}}>MS RMSSD</div>
</div>
</div>
<div style={{height:2,background:T.muted,borderRadius:1,marginBottom:12}}>
<div style={{height:"100%",width:`${(post/120)*100}%`,background:`linear-gradient(90d
</div>
<div className="cgm" style={{fontSize:11,color:T.tex2,fontStyle:"italic",lineHeight:1.7
<div className="cgm" style={{fontSize:10,color:T.mut2,fontStyle:"italic",marginTop:4,li
</div>
);
};
const ProductCard = ({ st, T=DARK, tier="paid" }) => {
const col=sc(st,T), d=T.mode==="dark";
return (
<div style={{border:`1px solid ${T.gold}30`,padding:"18px 16px",background:d?`${T.gold}07
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
<CoCMark size={34} T={T}/>
<div>
<div className="cin" style={{fontSize:8,color:T.gold,letterSpacing:4}}>CULTURE OF C
<div className="cgm" style={{fontSize:11,color:T.tex2}}>Enhance the atmosphere</div
</div>
</div>
<div className="cgm" style={{fontSize:17,color:T.text,lineHeight:1.75,marginBottom:6}}>
<div className="cgm" style={{fontSize:12,color:T.tex2,fontStyle:"italic",marginBottom:1
<div style={{border:`1px solid ${T.gold}35`,padding:"7px 14px",display:"inline-block"}}
{tier==="free"&&(
<div style={{marginTop:10,padding:"10px 12px",background:d?`${T.gold}0a`:`${T.gold}18
<span className="cgm" style={{fontSize:12,color:T.tex2,fontStyle:"italic"}}>Upgrade
</div>
)}
</div>
);
};
const UpgradeCard = ({ T=DARK }) => (
<div style={{border:`1px solid ${T.gold}42`,padding:"16px",background:T.mode==="light"?`${T
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBott
<div className="cin" style={{fontSize:8,color:T.gold,letterSpacing:4}}>ZENULTIM8 · PAID
<div style={{background:T.gold,padding:"2px 8px"}}><span className="cin" style={{fontSi
</div>
{[["Live HRV tracking","Before/after RMSSD — your parasympathetic proof"],["Personalised
<div key={title} style={{display:"flex",gap:9,alignItems:"flex-start",marginBottom:7}}>
<div style={{width:5,height:5,borderRadius:"50%",background:T.gold,marginTop:5,flexSh
<div><span className="cin" style={{fontSize:8,color:T.gold,letterSpacing:2}}>{title}<
</div>
))}
</div>
);
const ConversionWall = ({ T=DARK }) => {
const col = T.gold;
const d = T.mode === "dark";
const preview = "The 82/252 extraction was precise. Your RMSSD improved, confirming the par
return (
<div style={{border:`1px solid ${col}40`,background:d?`${col}08`:`${col}12`,overflow:"hid
{/* Blurred preview of Apex Ledger */}
<div style={{padding:"18px 16px",filter:"blur(3.5px)",userSelect:"none",pointerEvents:"
<div className="cin" style={{fontSize:8,color:col,letterSpacing:4,marginBottom:10}}>A
<div className="cgm" style={{fontSize:15,color:d?"#ede0c4":"#1c180e",lineHeight:1.9,f
"{preview}"
</div>
<div style={{display:"flex",gap:8,marginTop:12}}>
<div style={{padding:"8px 16px",border:`1px solid ${col}50`,color:col,fontFamily:"C
<div style={{padding:"8px 16px",border:`1px solid ${col}30`,color:d?"#9a8868":"#5c4
</div>
</div>
{/* Overlay */}
<div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignIte
<div className="cin" style={{fontSize:9,color:col,letterSpacing:4,textAlign:"center"}
<div className="cgm" style={{fontSize:14,color:d?"#9a8868":"#5c4e30",fontStyle:"itali
Your Apex Ledger sovereign decree and live HRV delta are Paid features.
</div>
<div style={{background:col,padding:"11px 28px",cursor:"pointer"}} onClick={()=>{}}>
<span className="cin" style={{fontSize:8,color:d?"#0a0806":"#1c180e",letterSpacing:
</div>
</div>
</div>
<div className="cgm" style={{fontSize:12,color:d?"#4a4538":"#a89878",fontStyle:"itali
);
};
const ApexLedger = ({ delta, state, T=DARK, onSave, isSaved }) => {
const [msg]=useState(()=>genTX(delta,state));
const [visible,setVisible]=useState(false);
const [speaking,setSpeaking]=useState(false);
const d=T.mode==="dark";
useEffect(()=>{const t=setTimeout(()=>setVisible(true),380);return()=>clearTimeout(t);},[])
const speak=()=>{
if(!("speechSynthesis"in window))return;
const u=new SpeechSynthesisUtterance(msg);
u.pitch=0.88;u.rate=0.92;
u.onstart=()=>setSpeaking(true);
u.onend=()=>setSpeaking(false);
u.onerror=()=>setSpeaking(false);
speechSynthesis.cancel();
speechSynthesis.speak(u);
};
return (
<div style={{border:`1px solid ${T.amber}45`,padding:"20px",background:d?`linear-gradient
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBo
<div className="cin" style={{fontSize:8,color:T.amber,letterSpacing:4}}>APEX LEDGER</
<div className="cin" style={{fontSize:7,color:T.mut2,letterSpacing:3}}>82°C · 252s ·
</div>
{visible&&<div className="cgm" style={{fontSize:16,color:T.text,lineHeight:1.9,fontStyl
<div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
<Btn onClick={()=>onSave(msg)} T={T} col={T.amber} disabled={isSaved} style={{fontSiz
<Btn onClick={speak} T={T} col={speaking?T.amber:T.tex2} style={{fontSize:8,padding:"
</div>
</div>
);
};
const AboutModal = ({ onClose, T=DARK }) => {
const d = T.mode==="dark";
const col = T.gold;
const body = {fontSize:15,color:d?"#ede0c4":"#1c180e",lineHeight:1.95};
const muted = {fontSize:14,color:d?"#9a8868":"#5c4e30",lineHeight:1.9,fontStyle:"italic"};
const section = {border:`1px solid ${col}25`,padding:"16px 14px",background:d?`${col}07`:`$
const label = {fontSize:8,color:col,letterSpacing:5,marginBottom:10,fontFamily:"Cinzel,seri
return (
<div style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"flex-end",jus
onClick={onClose}>
<div onClick={e=>e.stopPropagation()}
style={{width:"100%",maxWidth:520,maxHeight:"92vh",overflowY:"auto",background:d?"#0f
{/* Handle */}
<div style={{width:36,height:3,borderRadius:2,background:`${col}38`,margin:"0 auto"}}
{/* Header */}
<div style={{textAlign:"center",paddingBottom:4}}>
<div className="cin" style={{fontSize:9,color:col,letterSpacing:7,marginBottom:8}}>
<div className="cgm" style={{fontSize:26,color:d?"#ede0c4":"#1c180e",fontStyle:"ita
<div className="cgm" style={{fontSize:14,color:d?"#9a8868":"#5c4e30",fontStyle:"ita
<div style={{width:52,height:1,background:`linear-gradient(90deg,transparent,${col}
</div>
{/* Opening */}
<div className="cgm" style={{...body,fontStyle:"italic",textAlign:"center",padding:"0
Ma-23 is not a wellness trend. It is a precise, repeatable space where noise dissol
</div>
{/* Ma — Japanese root */}
<div style={section}>
<div style={label}>MA (間) — THE JAPANESE ROOT</div>
<div className="cgm" style={body}>
In Japanese philosophy, <span style={{color:col}}>Ma (間)</span> is the charged p
</div>
<div style={{height:10}}/>
<div className="cgm" style={muted}>
Ma is not emptiness. It is potential made visible — the moment when the bow is dr
</div>
</div>
— the
{/* 23 — Western anchor */}
<div style={section}>
<div style={label}>23 — THE WESTERN ANCHOR</div>
<div className="cgm" style={body}>
The number 23 points directly to <span style={{color:col}}>Psalm 23</span> </div>
<div style={{margin:"12px 0",padding:"12px 14px",borderLeft:`2px solid ${col}`,back
<div className="cgm" style={{...muted,fontStyle:"normal",fontSize:15,color:d?"#C9
"He makes me lie down in green pastures. He leads me beside still waters. He re
</div>
</div>
<div className="cgm" style={muted}>
Green pastures become the nourishing power of Merakilus green teas. Still waters
</div>
</div>
{/* The synthesis */}
<div>
<div style={label}>THE LIVING SYNTHESIS</div>
<div className="cgm" style={body}>
Ma-23 is the deliberate marriage of Japanese precision — the charged pause, the e
</div>
</div>
{/* Protocol */}
<div style={section}>
<div style={label}>THE 82/252 PROTOCOL</div>
{[
to tri
that m
["82°C","The exact temperature at which L-theanine from Merakilus green tea reach
["252 seconds","Exactly 4 minutes and 12 seconds — the minimum dose proven ["7-5-7 + 2Hz","Breath pacer and visual entrainment — a neurological reset ].map(([term,desc])=>(
<div key={term} style={{display:"flex",gap:12,alignItems:"flex-start",marginBotto
<div className="cin" style={{fontSize:9,color:col,letterSpacing:2,flexShrink:0,
<div className="cgm" style={{...muted,fontStyle:"normal",fontSize:14}}>{desc}</
</div>
))}
</div>
{/* Progression */}
<div style={{textAlign:"center",padding:"8px 0"}}>
<div style={label}>THE NATURAL PROGRESSION</div>
<div className="cgm" style={{fontSize:22,color:col,letterSpacing:2,marginBottom:12}
{[
["Noise","The default state: mental chatter, notifications, tension, reactivity."
["Presence","The engineered interval: 252 seconds where the body and mind are del
["Candor","The natural outcome: clear thought, honest self-knowledge, decisive ac
].map(([word,desc])=>(
<div key={word} style={{marginBottom:8,textAlign:"left"}}>
<span className="cin" style={{fontSize:9,color:col,letterSpacing:3}}>{word} </s
<span className="cgm" style={{...muted,fontStyle:"normal",fontSize:14}}>{desc}<
</div>
))}
</div>
<div className="cgm" style={{...muted,marginTop:10,textAlign:"center"}}>Candor does
{/* Motto */}
<div style={{...section,textAlign:"center"}}>
<div style={label}>THE MOTTO</div>
<div className="cin" style={{fontSize:13,color:col,letterSpacing:6,marginBottom:8}}
{[["Measure","the interval — 252 seconds."],["Nourish","the body and mind — 82°C Me
<div key={w} className="cgm" style={{fontSize:14,color:d?"#9a8868":"#5c4e30",marg
<span style={{color:col,fontStyle:"normal"}}>{w} </span><span style={{fontStyle
</div>
))}
</div>
{/* Closing */}
<div className="cgm" style={{...muted,textAlign:"center",padding:"4px 8px"}}>
One precise interval at a time, we reclaim the space between things — and in </div>
that s
{/* Patent */}
<div className="cin" style={{fontSize:7,color:d?"#2e2a22":"#c8bca0",letterSpacing:3,t
{/* Close */}
<button onClick={onClose} style={{background:"transparent",border:`1px solid ${col}40
</div>
</div>
);
};
const RotatingWisdom = ({ running, T=DARK }) => {
const [idx,setIdx]=useState(()=>Math.floor(Math.random()*WISDOM.length));
const [vis,setVis]=useState(true);
useEffect(()=>{
if(!running)return;
const cycle=()=>{setVis(false);setTimeout(()=>{setIdx(i=>(i+1)%WISDOM.length);setVis(true
const iv=setInterval(cycle,8000);
return()=>clearInterval(iv);
},[running]);
return (
<div style={{marginTop:20,padding:"12px 16px",border:`1px solid ${T.gold}18`,background:T
<div className="cgm" style={{fontSize:14,color:T.tex2,fontStyle:"italic",lineHeight:1.8
</div>
);
};
/* ── BREATH HOOK ─────────────────────────────────────────────────────────── */
function useBreath(running) {
const [phase,setPhase]=useState("inhale");
const [count,setCount]=useState(0);
const ref=useRef();
useEffect(()=>{
if(!running){clearTimeout(ref.current);return;}
let i=0;
run();
return()=>clearTimeout(ref.current);
},[running]);
return{phase,count};
const run=()=>{const c=BREATH_CYCLE[i%3];setPhase(c.phase);if(c.phase==="exhale")setCount
}
/* ════════════════════════════════════════════════════════════════════════════
ZEN8 FREE — LIGHT LUMINESCENCE
════════════════════════════════════════════════════════════════════════════ */
function Zen8Free() {
const T=LIGHT;
const [scr,setScr]=useState("intro");
const [si,setSi]=useState(0);
const [secs,setSecs]=useState(TOTAL);
const [settle,setSettle]=useState(8);
const [wis,setWis]=useState(()=>Math.floor(Math.random()*WISDOM.length));
const [pulse,setPulse]=useState(false);
const [aboutOpen,setAboutOpen]=useState(false);
const [firstVisit]=useState(()=>{
try{return !localStorage.getItem("z8visited");}catch{return true;}
});
const st=STARTERS[si], col=sc(st,T);
const {phase}=useBreath(scr==="session");
const tmr=useRef(), stl=useRef();
useEffect(()=>{
if(scr!=="session"){setPulse(false);return;}
setPulse(true);
tmr.current=setInterval(()=>{setSecs(s=>{if(s<=1){clearInterval(tmr.current);setPulse(fal
return()=>{clearInterval(tmr.current);setPulse(false);};
},[scr]);
useEffect(()=>{
if(scr!=="settle")return;setSettle(8);
stl.current=setInterval(()=>{setSettle(s=>{if(s<=1){clearInterval(stl.current);setScr("se
return()=>clearInterval(stl.current);
},[scr]);
const reset=()=>{setSecs(TOTAL);setWis(Math.floor(Math.random()*WISDOM.length));setScr("int
const W=(c)=><div style={{background:T.bg,minHeight:"100vh",maxWidth:520,margin:"0 auto",ov
const shim="shimL";
if(scr==="intro") return W(
<div style={{minHeight:"100vh",background:`radial-gradient(ellipse at 50% 62%,#e8d494,${T
<div style={{position:"absolute",width:"100%",height:"1px",background:`linear-gradient(
<div className="fu" style={{textAlign:"center",display:"flex",flexDirection:"column",al
<ZUMark size={90} T={T}/>
<div className={`cin ${shim}`} style={{fontSize:34,letterSpacing:9}}>ZENULTIM8</div>
<div className="cin" style={{fontSize:8,color:T.tex2,letterSpacing:7}}>ZEN8 · FREE</d
<GoldRule T={T}/>
<div className="cgm" style={{fontSize:16,color:T.tex2,fontStyle:"italic",lineHeight:1
<Btn onClick={()=>setScr("select")} variant="fill" T={T}>Begin</Btn>
<button onClick={()=>setAboutOpen(true)} style={{background:"transparent",border:`1px
onMouseEnter={e=>e.currentTarget.style.background=`${T.gold}15`}
onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
LEARN THE INTERVAL
</button>
<UpgradeCard T={T}/>
{aboutOpen&&<AboutModal onClose={()=>setAboutOpen(false)} T={T}/>}
<div className="cin" style={{fontSize:7,color:T.mut2,letterSpacing:4}}>PATENT APPLICA
</div>
</div>
);
if(scr==="select") return W(
<div style={{minHeight:"100vh",background:T.bg2,padding:"34px 20px"}}>
<div className="fu" style={{textAlign:"center",marginBottom:22}}>
<div className="cin" style={{fontSize:8,color:T.tex2,letterSpacing:6,marginBottom:8}}
<div className="cgm" style={{fontSize:21,color:T.text,fontStyle:"italic"}}>What does
</div>
<div style={{display:"flex",flexDirection:"column",gap:9,maxWidth:480,margin:"0 auto"}}
{STARTERS.map((s,i)=>{const c=sc(s,T);return(
<button key={s.id} onClick={()=>{setSi(i);setScr("settle");}} style={{background:si
onMouseEnter={e=>e.currentTarget.style.background=`${c}2a`} onMouseLeave={e=>e.cu
<div style={{width:36,height:36,borderRadius:"50%",flexShrink:0,background:`${c}2
<div style={{flex:1}}>
<div style={{display:"flex",gap:8,marginBottom:2,alignItems:"baseline"}}><span
<div className="cgm" style={{fontSize:17,color:T.text}}>{s.name}</div>
<div className="cgm" style={{fontSize:12,color:T.tex2,fontStyle:"italic"}}>{s.d
</div>
<span style={{color:`${c}65`,fontSize:18}}>›</span>
</button>
);})}
</div>
<div style={{textAlign:"center",marginTop:20}}><Btn onClick={()=>setScr("intro")} style
</div>
);
if(scr==="settle") return W(
<div style={{minHeight:"100vh",background:T.bg,display:"flex",flexDirection:"column",alig
<div className="fi" style={{textAlign:"center"}}>
<div className="cin" style={{fontSize:8,color:col,letterSpacing:6,marginBottom:14}}>S
<div style={{width:72,height:72,borderRadius:"50%",border:`2px solid ${col}50`,displa
<div className="cgm" style={{fontSize:17,color:T.tex2,fontStyle:"italic",lineHeight:1
<div style={{marginTop:24,display:"flex",alignItems:"center",gap:10,justifyContent:"c
<div style={{width:6,height:6,borderRadius:"50%",background:`${col}40`,border:`1px
<div className="cin" style={{fontSize:8,color:T.muted,letterSpacing:4}}>7 · 5 · 7 B
<div style={{width:6,height:6,borderRadius:"50%",background:`${col}40`,border:`1px
</div>
</div>
</div>
);
if(scr==="session") return W(
<div style={{minHeight:"100vh",background:`radial-gradient(ellipse at 50% 55%,${col}18,${
<div style={{display:"flex",alignItems:"center",gap:11,marginBottom:24}}><div style={{w
<BreathOrb phase={phase} col={col} secsLeft={secs} total={TOTAL} T={T}/>
<div style={{marginTop:20,textAlign:"center"}}>
<div className="cin" style={{fontSize:9,color:col,letterSpacing:5}}>{BREATH_CYCLE.fin
<div style={{marginTop:10,width:240,height:2,background:T.muted,borderRadius:1,margin
<div style={{height:"100%",width:`${Math.round((1-secs/TOTAL)*100)}%`,background:`l
</div>
<div className="cin" style={{fontSize:7,color:T.tex2,letterSpacing:3,marginTop:5}}>{M
</div>
<RotatingWisdom running={scr==="session"} T={T}/>
<div style={{marginTop:12,border:`1px solid ${col}22`,padding:"8px 16px",textAlign:"cen
</div>
);
if(scr==="arrive") return W(
<div style={{minHeight:"100vh",background:T.bg,display:"flex",flexDirection:"column",alig
<div className="fu" style={{textAlign:"center",display:"flex",flexDirection:"column",al
<MerakilusMark size={80} T={T}/>
<div className={`cin ${shim}`} style={{fontSize:26,letterSpacing:8}}>PRESENT</div>
<div className="cgm" style={{fontSize:17,color:T.tex2,fontStyle:"italic",lineHeight:1
<GoldRule T={T}/>
<Btn onClick={()=>setScr("complete")} variant="fill" T={T}>Complete →</Btn>
</div>
</div>
);
if(scr==="complete") return W(
<div style={{minHeight:"100vh",background:`radial-gradient(ellipse at 50% 18%,${T.gold}18
<div className="fu" style={{textAlign:"center",marginBottom:6}}>
<div className={`cin ${shim}`} style={{fontSize:20,letterSpacing:6,marginBottom:3}}>R
<div className="cgm" style={{fontSize:13,color:T.tex2,fontStyle:"italic"}}>{st.name}
</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
{[["TEMP","82°C"],["TIME","252s"],["BREATH","7·5·7"],["TEA",st.tea]].map(([l,v])=>(
<div key={l} style={{border:`1px solid ${T.muted}`,padding:"12px",textAlign:"center
))}
</div>
<div style={{border:`1px solid ${T.gold}28`,padding:"18px",background:T.bg2}}>
<div className="cin" style={{fontSize:7,color:T.gold,letterSpacing:5,marginBottom:8}}
<div className="cgm" style={{fontSize:16,color:T.text,fontStyle:"italic",lineHeight:1
</div>
<ConversionWall T={T}/>
<ProductCard st={st} T={T} tier="free"/>
<div style={{textAlign:"center"}}>
<div className="cin" style={{fontSize:7,color:T.tex2,letterSpacing:5,marginBottom:10}
<div style={{display:"flex",justifyContent:"center",gap:12}}>{[" "," "," "," ","
</div>
<div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:18,padding:
<Btn onClick={reset} style={{width:"100%",padding:"11px",fontSize:7,letterSpacing:5}} v
<div style={{textAlign:"center"}}><div className="cin" style={{fontSize:6,color:T.mut2,
</div>
);
return W(<div/>);
}
/* ════════════════════════════════════════════════════════════════════════════
ZENULTIM8 PAID — DARK LUXURY
════════════════════════════════════════════════════════════════════════════ */
function ZenUltim8() {
const T=DARK;
const [scr,setScr]=useState(()=>{
try{return localStorage.getItem("z8visited")?"intro":"onboard";}catch{return "intro";}
});
const [si,setSi]=useState(0);
const [ci,setCi]=useState(0);
const [secs,setSecs]=useState(TOTAL);
const [settle,setSettle]=useState(8);
const [pulse,setPulse]=useState(false);
const [ledOpen,setLedOpen]=useState(false);
const [ledTxt,setLedTxt]=useState("");
const [ledger,setLedger]=useState(()=>{
try{const s=localStorage.getItem("z8ledger");return s?JSON.parse(s):[];}catch{return [];}
});
const [ledgerView,setLedgerView]=useState(false);
const [deepOpen,setDeepOpen]=useState(false);
const [intention,setIntention]=useState("");
const [intentionSet,setIntentionSet]=useState(false);
const [apexSaved,setApexSaved]=useState(false);
const [rmssdDelta,setRmssdDelta]=useState(20);
const [aboutOpen,setAboutOpen]=useState(false);
const [sessionCount,setSessionCount]=useState(()=>{
try{return parseInt(localStorage.getItem("z8sessions")||"0",10);}catch{return 0;}
});
const [firstVisit]=useState(()=>{
try{return !localStorage.getItem("z8visited");}catch{return true;}
});
const st=STARTERS[si], col=sc(st,T);
const {phase,count}=useBreath(scr==="session");
const tmr=useRef(), stl=useRef();
useEffect(()=>{
if(scr!=="session"){setPulse(false);return;}
setPulse(true);
tmr.current=setInterval(()=>{setSecs(s=>{if(s<=1){clearInterval(tmr.current);setPulse(fal
return()=>{clearInterval(tmr.current);setPulse(false);};
},[scr]);
useEffect(()=>{
if(scr!=="settle")return;setSettle(8);
stl.current=setInterval(()=>{setSettle(s=>{if(s<=1){clearInterval(stl.current);setScr("se
return()=>clearInterval(stl.current);
},[scr]);
const reset=()=>{if("speechSynthesis"in window)speechSynthesis.cancel();setSecs(TOTAL);setC
const saveLedger=(msg)=>{
setLedger(e=>{
const next=[...e,{msg,state:st.id,col,date:new Date().toLocaleDateString(),delta:rmssdD
try{localStorage.setItem("z8ledger",JSON.stringify(next));}catch{}
return next;
});
setApexSaved(true);
};
const saveManual=()=>{
if(!ledTxt.trim())return;
setLedger(e=>{
const next=[...e,{msg:ledTxt,state:st.id,col,date:new Date().toLocaleDateString(),delta
try{localStorage.setItem("z8ledger",JSON.stringify(next));}catch{}
return next;
});
setLedTxt("");setLedOpen(false);
};
const W=(c)=><div style={{background:T.bg,minHeight:"100vh",maxWidth:520,margin:"0 auto",ov
if(scr==="onboard") return W(
<div style={{minHeight:"100vh",background:`radial-gradient(ellipse at 50% 60%,#1a1408,${T
<div className="fu" style={{textAlign:"center",display:"flex",flexDirection:"column",al
<ZUMark size={80} T={T}/>
<div className="cgm" style={{fontSize:22,color:T.gold,fontStyle:"italic",lineHeight:1
The space between noise and clarity has a name.
</div>
<div style={{width:52,height:1,background:`linear-gradient(90deg,transparent,${T.gold
<div className="cgm" style={{fontSize:16,color:T.tex2,fontStyle:"italic",lineHeight:2
In the next 252 seconds, your nervous system will shift.<br/>
<span style={{color:T.gold}}>82°C. One breath. One interval.</span>
</div>
<div className="cgm" style={{fontSize:14,color:T.mut2,fontStyle:"italic",textAlign:"c
Select a Sovereign State. Steep your Merakilus tea.<br/>Light your Culture of Candl
</div>
<Btn onClick={()=>{try{localStorage.setItem("z8visited","1");}catch{}setScr("intro");
ENTER
</Btn>
<button onClick={()=>{try{localStorage.setItem("z8visited","1");}catch{}setScr("intro
skip
</button>
</div>
</div>
);
if(ledgerView) return W(
<div style={{minHeight:"100vh",background:T.bg,padding:"40px 24px 60px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBo
<div className="cin shimD" style={{fontSize:14,letterSpacing:5}}>APEX LEDGER</div>
<Btn onClick={()=>setLedgerView(false)} style={{fontSize:8,padding:"6px 12px"}} T={T}
</div>
{ledger.length===0
?<div className="cgm" style={{color:T.tex2,fontStyle:"italic",fontSize:16,textAlign:"
:<div style={{display:"flex",flexDirection:"column",gap:12}}>
{[...ledger].reverse().map((e,i)=>(
<div key={i} style={{border:`1px solid ${e.col}30`,padding:"14px 16px",background
<div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><sp
<div className="cgm" style={{fontSize:15,color:T.text,fontStyle:"italic",lineHe
</div>
))}
</div>
}
</div>
);
if(scr==="intro") return W(
<div style={{minHeight:"100vh",background:`radial-gradient(ellipse at 50% 72%,#1a1408,${T
<div style={{position:"absolute",width:"100%",height:"1px",background:`linear-gradient(
<div className="fu" style={{textAlign:"center",display:"flex",flexDirection:"column",al
<ZUMark size={106} T={T}/>
<div className="cin shimD" style={{fontSize:34,letterSpacing:7}}>ZENULTIM8</div>
<div className="cin" style={{fontSize:8,color:T.tex2,letterSpacing:6}}>THE ENGINEERED
<GoldRule T={T}/>
<div className="cgm" style={{fontSize:17,color:T.tex2,fontStyle:"italic",lineHeight:1
<Btn onClick={()=>setScr("select")} variant="fill" T={T}>Begin</Btn>
<button onClick={()=>setAboutOpen(true)} style={{background:"transparent",border:`1px
onMouseEnter={e=>e.currentTarget.style.background=`${T.gold}12`}
onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
LEARN THE INTERVAL
</button>
{aboutOpen&&<AboutModal onClose={()=>setAboutOpen(false)} T={T}/>}
{ledger.length>0&&<button onClick={()=>setLedgerView(true)} style={{background:"trans
{sessionCount>0&&<div className="cgm" style={{fontSize:13,color:T.tex2,fontStyle:"ita
<div className="cin" style={{fontSize:7,color:T.muted,letterSpacing:4}}>PATENT APPLIC
</div>
</div>
);
auto"}
if(scr==="select") return W(
<div style={{minHeight:"100vh",background:T.bg2,padding:"34px 20px"}}>
<div className="fu" style={{textAlign:"center",marginBottom:24}}>
<div className="cin" style={{fontSize:8,color:T.tex2,letterSpacing:6,marginBottom:8}}
<div className="cgm" style={{fontSize:22,color:T.text,fontStyle:"italic"}}>What does
</div>
<div style={{display:"flex",flexDirection:"column",gap:10,maxWidth:480,margin:"0 {STARTERS.map((s,i)=>{const c=sc(s,T);return(
<button key={s.id} onClick={()=>{setSi(i);setScr("prepare");}} style={{background:s
onMouseEnter={e=>e.currentTarget.style.background=`${c}1e`} onMouseLeave={e=>e.cu
<div style={{width:42,height:42,borderRadius:"50%",flexShrink:0,background:`${c}1
<div style={{flex:1}}>
<div style={{display:"flex",gap:9,marginBottom:3,alignItems:"baseline"}}><span
<div className="cgm" style={{fontSize:18,color:T.text,marginBottom:2}}>{s.name}
<div className="cgm" style={{fontSize:12,color:T.tex2,fontStyle:"italic"}}>{s.d
<div className="cin" style={{fontSize:8,color:T.tex2,letterSpacing:2,marginTop:
</div>
<span style={{color:`${c}55`,fontSize:18}}>›</span>
</button>
);})}
</div>
<div style={{textAlign:"center",marginTop:22}}><Btn onClick={()=>setScr("intro")} style
</div>
);
if(scr==="prepare") return W(
<div style={{minHeight:"100vh",background:`radial-gradient(ellipse at 50% 12%,${col}18,${
<div className="fu" style={{textAlign:"center",marginBottom:4}}>
<div className="cin" style={{fontSize:8,color:col,letterSpacing:6,marginBottom:4}}>PR
<div className="cin" style={{fontSize:14,color:col,letterSpacing:4}}>{st.id} · {st.el
<div className="cgm" style={{fontSize:12,color:T.tex2,fontStyle:"italic",marginTop:2}
</div>
<div style={{display:"flex",justifyContent:"center",gap:7}}>
{SCIENCE_CARDS.map((_,i)=><div key={i} style={{width:i===ci?26:8,height:3,borderRadiu
</div>
<div className="fu" key={ci} style={{border:`1px solid ${col}28`,padding:"22px 20px",ba
<div style={{fontSize:32,marginBottom:12,textAlign:"center"}}>{SCIENCE_CARDS[ci].ico}
<div className="cin" style={{fontSize:11,color:col,letterSpacing:3,marginBottom:10,te
<div className="cgm" style={{fontSize:16,color:T.text,lineHeight:1.9,marginBottom:14}
<div style={{borderTop:`1px solid ${col}20`,paddingTop:12}}>
<div className="cgm" style={{fontSize:13,color:col,fontStyle:"italic",marginBottom:
<div className="cin" style={{fontSize:8,color:T.tex2,letterSpacing:2}}>{SCIENCE_CAR
</div>
</div>
{ci===SCIENCE_CARDS.length-1&&(
<div style={{border:`1px solid ${col}28`,padding:"16px",background:`${col}07`}}>
<div className="cin" style={{fontSize:8,color:col,letterSpacing:4,marginBottom:8}}>
<textarea value={intention} onChange={e=>setIntention(e.target.value.slice(0,120))}
<div className="cin" style={{fontSize:7,color:T.mut2,letterSpacing:2,textAlign:"rig
</div>
)}
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<Btn onClick={()=>ci>0?setCi(c=>c-1):setScr("select")} style={{fontSize:8,padding:"9p
{ci<SCIENCE_CARDS.length-1?<Btn onClick={()=>setCi(c=>c+1)} T={T}>Next →</Btn>:<Btn o
</div>
</div>
);
if(scr==="settle") return W(
<div style={{minHeight:"100vh",background:T.bg,display:"flex",flexDirection:"column",alig
<div className="fi" style={{textAlign:"center"}}>
<div className="cin" style={{fontSize:8,color:col,letterSpacing:6,marginBottom:14}}>S
<div style={{width:76,height:76,borderRadius:"50%",border:`2px solid ${col}42`,displa
<div className="cgm" style={{fontSize:18,color:T.tex2,fontStyle:"italic",lineHeight:1
{intentionSet&&intention&&<div style={{marginTop:18,border:`1px solid ${col}20`,paddi
<div style={{marginTop:26,display:"flex",alignItems:"center",gap:12,justifyContent:"c
</div>
</div>
);
if(scr==="session") return W(
<div style={{minHeight:"100vh",background:`radial-gradient(ellipse at 50% 56%,${col}15,${
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:26}}><div style={{w
<BreathOrb phase={phase} col={col} secsLeft={secs} total={TOTAL} T={T}/>
<div style={{marginTop:22,textAlign:"center"}}>
<div className="cin" style={{fontSize:9,color:col,letterSpacing:5,marginBottom:4}}>{B
<div className="cgm" style={{fontSize:13,color:T.tex2,fontStyle:"italic"}}>Cycle {cou
<div style={{marginTop:8,width:220,height:2,background:T.muted,borderRadius:1,margin:
<div style={{height:"100%",width:`${Math.round((1-secs/TOTAL)*100)}%`,background:`l
</div>
<div className="cin" style={{fontSize:7,color:T.tex2,letterSpacing:3,marginTop:5}}>{M
</div>
<div style={{display:"flex",gap:28,marginTop:22}}>
{[["Protocol","82/252"],["State",st.id],["Pacer","7-5-7"]].map(([l,v])=>(
<div key={l} style={{textAlign:"center"}}><div className="cin" style={{fontSize:7,c
))}
</div>
{intentionSet&&intention&&<div style={{marginTop:20,border:`1px solid ${col}18`,padding
<RotatingWisdom running={scr==="session"} T={T}/>
<div style={{marginTop:12,border:`1px solid ${col}18`,padding:"7px 16px",textAlign:"cen
</div>
);
if(scr==="arrive") return W(
<div style={{minHeight:"100vh",background:T.bg,display:"flex",flexDirection:"column",alig
<div className="fu" style={{textAlign:"center",display:"flex",flexDirection:"column",al
<MerakilusMark size={84} T={T}/>
<div className="cin shimD" style={{fontSize:30,letterSpacing:8}}>PRESENT</div>
<div className="cgm" style={{fontSize:18,color:T.tex2,fontStyle:"italic",lineHeight:1
<GoldRule T={T}/>
<Btn onClick={()=>setScr("complete")} variant="fill" T={T}>Complete →</Btn>
</div>
</div>
);
if(scr==="sovereign") return W(
<div style={{minHeight:"100vh",background:"#050403",display:"flex",flexDirection:"column"
{/* Starfield */}
{Array.from({length:40}).map((_,i)=>(
<div key={i} style={{position:"absolute",width:i%3===0?2:1,height:i%3===0?2:1,borderR
background:"#C9A84C",opacity:(i%7+2)/14,
left:`${(i*37+13)%100}%`,top:`${(i*53+7)%100}%`,
animation:`gp ${1.5+(i%4)*.5}s ease infinite`,animationDelay:`${(i%5)*.4}s`}}/>
))}
<div className="fu" style={{textAlign:"center",display:"flex",flexDirection:"column",al
<ZUMark size={140} T={T}/>
<div style={{height:8}}/>
<div className="cin shimD" style={{fontSize:14,letterSpacing:8}}>METIRI · ALERE · TUE
<div className="cgm" style={{fontSize:20,color:"#9a8868",fontStyle:"italic",letterSpa
<div style={{width:80,height:1,background:`linear-gradient(90deg,transparent,#C9A84C,
<div className="cgm" style={{fontSize:17,color:"#C9A84C",fontStyle:"italic",lineHeigh
Precision in presence.<br/>
<span style={{color:"#9a8868",fontSize:14}}>Patent Application GB2607131.6</span>
</div>
</div>
</div>
<Btn onClick={reset} variant="fill" T={T} style={{marginTop:12,letterSpacing:6,fontSi
);
if(scr==="complete") return W(
<div style={{minHeight:"100vh",background:`radial-gradient(ellipse at 50% 22%,${T.gold}0e
<div className="fu" style={{textAlign:"center",marginBottom:4}}>
<div className="cin shimD" style={{fontSize:21,letterSpacing:6,marginBottom:4}}>RITUA
<div className="cgm" style={{fontSize:14,color:T.tex2,fontStyle:"italic"}}>Well done.
</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
{[["TEMP","82°C"],["TIME","252s"],["BREATH","7·5·7"],["TEA",st.tea]].map(([l,v])=>(
<div key={l} style={{border:`1px solid ${T.muted}`,padding:"12px",textAlign:"center
))}
</div>
<HRVPanel pre={70} post={70+rmssdDelta} col={col} T={T}/>
<ApexLedger delta={rmssdDelta} state={st.id} T={T} onSave={saveLedger} isSaved={apexSav
{intentionSet&&intention&&<div style={{border:`1px solid ${col}25`,padding:"14px",backg
<ProductCard st={st} T={T} tier="paid"/>
<div style={{textAlign:"center"}}>
<div className="cin" style={{fontSize:7,color:T.tex2,letterSpacing:5,marginBottom:10}
<div style={{display:"flex",justifyContent:"center",gap:12}}>{[" "," "," "," ","
</div>
<button onClick={()=>setLedOpen(l=>!l)} style={{width:"100%",background:ledOpen?`${T.go
<span className="cin" style={{fontSize:8,color:T.gold,letterSpacing:4}}>ADD TO <span style={{color:T.gold,fontSize:17}}>{ledOpen?"−":"+"}</span>
LEDGER
</button>
{ledOpen&&<div style={{border:`1px solid ${T.gold}18`,borderTop:"none",padding:"14px",a
<div className="cgm" style={{fontSize:13,color:T.tex2,fontStyle:"italic",marginBottom
<textarea value={ledTxt} onChange={e=>setLedTxt(e.target.value)} placeholder="What ar
<div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:9}}>
<button onClick={()=>setLedOpen(false)} style={{background:"transparent",border:`1p
<button onClick={saveManual} style={{background:`${T.gold}18`,border:`1px solid ${T
</div>
</div>}
<button onClick={()=>setDeepOpen(d=>!d)} style={{width:"100%",background:"transparent",
<span className="cin" style={{fontSize:8,color:col,letterSpacing:4}}>GO DEEPER</span>
<span style={{color:col,fontSize:17}}>{deepOpen?"−":"+"}</span>
</button>
{deepOpen&&<div style={{border:`1px solid ${col}18`,borderTop:"none",padding:"16px",ani
<div className="cgm" style={{fontSize:16,color:T.text,lineHeight:2}}>
<div className="cin" style={{fontSize:9,color:col,letterSpacing:4,marginBottom:10}}
Ma-23 is the engineered interval of stillness. <span style={{color:T.gold}}>82°C</s
<br/><br/>Noise → Presence → Candor.
</div>
</div>}
<div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:20,padding:
<Btn onClick={()=>setScr("sovereign")} style={{width:"100%",padding:"11px",fontSize:7,l
<div style={{textAlign:"center",marginTop:6,paddingBottom:10}}><div className="cin" sty
</div>
);
return W(<div/>);
}
/* ════════════════════════════════════════════════════════════════════════════
APP WRAPPER
════════════════════════════════════════════════════════════════════════════ */
export default function App() {
const [mode,setMode]=useState("paid");
const T=mode==="paid"?DARK:LIGHT;
return (
<div style={{background:T.bg,minHeight:"100vh",transition:"background .4s ease"}}>
<style>{`
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,
*{box-sizing:border-box;margin:0;padding:0;}
::-webkit-scrollbar{width:2px;}::-webkit-scrollbar-thumb{background:#3a3020;}
@keyframes shimmer{0%{background-position:-300% center}100%{background-position:300%
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:tr
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform
@keyframes flicker{0%,100%{opacity:1}40%{opacity:.55}70%{opacity:.85}}
@keyframes heartbeat{0%,100%{transform:scale(1)}15%{transform:scale(1.08)}30%{transfo
@keyframes heartGlow{0%,100%{filter:drop-shadow(0 0 10px #C9A84C90)}50%{filter:drop-s
@keyframes breathIn{from{transform:scale(.78);opacity:.3}to{transform:scale(1.14);opa
@keyframes breathHold{0%,100%{transform:scale(1.14);opacity:1}}
@keyframes breathOut{from{transform:scale(1.14);opacity:1}to{transform:scale(.78);opa
@keyframes ringPulse{0%,100%{opacity:.85}50%{opacity:1}}
@keyframes ringBreath0{0%,100%{transform:scale(1);opacity:.55}50%{transform:scale(1.0
@keyframes ringBreath1{0%,100%{transform:scale(1);opacity:.35}50%{transform:scale(1.0
@keyframes ringBreath2{0%,100%{transform:scale(1);opacity:.2}50%{transform:scale(1.09
@keyframes orbGlow{0%,100%{box-shadow:0 0 28px rgba(201,168,76,.12),inset 0 0 18px rg
@keyframes gp{0%,100%{opacity:.6}50%{opacity:1}}
@keyframes txFade{0%{opacity:0;transform:translateY(8px)}100%{opacity:1;transform:tra
@keyframes amberPulse{0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,0)}50%{box-shadow:0
.fu{animation:fadeUp .6s ease both}.fi{animation:fadeIn .4s ease both}
.shimD{background:linear-gradient(90deg,#C9A84C 0%,#f0d890 30%,#C9A84C 52%,#C97A35 10
.shimL{background:linear-gradient(90deg,#6a4808 0%,#C9A84C 30%,#8B6510 52%,#4a2800 10
.cin{font-family:'Cinzel',serif}.cgm{font-family:'Cormorant Garamond',serif}
button,textarea{font-family:inherit;outline:none;border:none;}
`}</style>
<div style={{display:"flex",justifyContent:"center",padding:"10px 0",background:T.mode=
{[["paid","ZENULTIM8 · PAID"],["free","ZEN8 · FREE"]].map(([k,lbl])=>(
<button key={k} onClick={()=>{if("speechSynthesis"in window)speechSynthesis.cancel(
))}
</div>
<div style={{display:mode==="paid"?"block":"none"}}><ZenUltim8/></div>
<div style={{display:mode==="free"?"block":"none"}}><Zen8Free/></div>
</div>
);
}
