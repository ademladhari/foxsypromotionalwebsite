/* eslint-disable react/prop-types, react/no-unescaped-entities */
import { useRef, useState } from "react";
import { motion, useInView, MotionConfig } from "framer-motion";
import heroImg from "../assets/hero.png";
import inappImg from "../assets/inapp.png";
import friendapprovalImg from "../assets/friendapproval.png";

const OR = "#F07B4A";
const OR2 = "#F59A72";
const OR3 = "#E6A480";
const OR4 = "#F7DBC8";
const OR5 = "#FFF7F1";
const S1  = "#FFFAF6";
const S2  = "#FFF4EA";

const EASE_OUT = [0.22, 1, 0.36, 1];
const SPRING_SMOOTH = { type: "spring", stiffness: 115, damping: 20, mass: 0.75 };
const SPRING_SOFT = { type: "spring", stiffness: 95, damping: 18, mass: 0.8 };

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ ...SPRING_SOFT, delay }}>
      {children}
    </motion.div>
  );
}

function Tag({ children }) {
  return (
    <div style={{
      display:"inline-flex",alignItems:"center",gap:7,
      background:"rgba(255,107,53,.13)",border:"1px solid rgba(255,107,53,.3)",
      color:OR,fontSize:11,fontWeight:600,padding:"5px 13px",borderRadius:100,
      letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:18,
    }}>{children}</div>
  );
}

function Img({ src, label="Image", h=480, r=20, fit="cover" }) {
  const wrapper = {
    width:"100%",height:h,borderRadius:r,
    border:src?"none":"2px dashed "+OR4,
    background:src?"transparent":OR5,
    display:"flex",flexDirection:"column",
    alignItems:"center",justifyContent:"center",gap:10,flexShrink:0,
    overflow:"hidden",boxShadow:"none",
  };
  if (src) return <div style={wrapper}><img src={src} alt={label} style={{width:"100%",height:"100%",objectFit:fit}}/></div>;
  return <div style={wrapper}><span style={{fontSize:13,fontWeight:500,color:OR3}}>{label}</span></div>;
}

function Ring({ px, py, size, op=0.26, delay=0, dur=5 }) {
  return (
    <motion.div animate={{y:["0px","14px","0px"]}}
      transition={{duration:dur,repeat:Infinity,ease:"easeInOut",delay}}
      style={{position:"absolute",left:px,top:py,width:size,height:size,
        borderRadius:"50%",border:`2px solid rgba(240,123,74,.72)`,opacity:op,pointerEvents:"none",zIndex:1}}/>
  );
}
function Dot({ px, py, size=8, op=0.30, delay=0 }) {
  return (
    <motion.div animate={{scale:[1,1.8,1],opacity:[op,op*0.2,op]}}
      transition={{duration:3.2,repeat:Infinity,ease:"easeInOut",delay}}
      style={{position:"absolute",left:px,top:py,width:size,height:size,
        borderRadius:"50%",background:"rgba(240,123,74,.88)",boxShadow:"0 0 0 4px rgba(240,123,74,.12)",opacity:op,pointerEvents:"none",zIndex:1}}/>
  );
}
function Spin({ px, py, size, op=0.22, cw=true, dur=20 }) {
  return (
    <div style={{position:"absolute",left:px,top:py,width:size,height:size,
      borderRadius:"50%",border:"2px dashed rgba(240,123,74,.5)",opacity:op,
      pointerEvents:"none",zIndex:1,animation:`${cw?"rCW":"rCCW"} ${dur}s linear infinite`}}/>
  );
}
function Dots({ corner }) {
  const pos = corner==="tl"?{left:0,top:0}:corner==="tr"?{right:0,top:0}:corner==="bl"?{left:0,bottom:0}:{right:0,bottom:0};
  return (
    <svg style={{position:"absolute",zIndex:1,pointerEvents:"none",opacity:0.28,...pos}} width="144" height="144" viewBox="0 0 144 144">
      {Array.from({length:6},(_,r)=>Array.from({length:6},(_,c)=>(
        <circle key={`${r}-${c}`} cx={c*24+12} cy={r*24+12} r="3" fill="rgba(240,123,74,.85)"/>
      )))}
    </svg>
  );
}
function Diamond({ px, py, size=22, op=0.32, delay=0, dur=9 }) {
  return (
    <motion.div
      animate={{ rotate: [45, 225, 405], scale: [1, 1.12, 1] }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
      style={{
        position:"absolute",left:px,top:py,width:size,height:size,
        border:`2px solid rgba(240,123,74,.68)`,boxShadow:"0 0 0 6px rgba(240,123,74,.08)",borderRadius:6,
        opacity:op,pointerEvents:"none",zIndex:1,transform:"rotate(45deg)"
      }}
    />
  );
}
function OrbitalLine({ px, py, width=140, delay=0, dur=10, op=0.28, rotate=0 }) {
  return (
    <motion.div
      animate={{ x: [0, 16, 0], opacity: [op, op * 1.2, op] }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
      style={{
        position:"absolute",left:px,top:py,width,height:2,
        background:"linear-gradient(90deg, rgba(240,123,74,0), rgba(240,123,74,.78), rgba(240,123,74,0))",
        opacity:op,pointerEvents:"none",zIndex:1,transform:`rotate(${rotate}deg)`
      }}
    />
  );
}
function Arc({ d, op=0.18, delay=0.3, dur=2 }) {
  return (
    <motion.svg style={{position:"absolute",inset:0,width:"100%",height:"100%",overflow:"visible",pointerEvents:"none",zIndex:1}}>
      <motion.path
        d={d}
        fill="none"
        stroke={OR}
        strokeWidth="1.8"
        opacity={op}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: op }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: dur, delay, ease: EASE_OUT }}
      />
    </motion.svg>
  );
}
function Glow({ px, py, size=400, op=0.07 }) {
  return (
    <div style={{position:"absolute",left:px,top:py,width:size,height:size,borderRadius:"50%",
      background:`radial-gradient(circle,rgba(240,123,74,${op*2.2}) 0%,transparent 65%)`,
      pointerEvents:"none",zIndex:1,transform:"translate(-50%,-50%)"}}/>
  );
}

const benefits=[
  {icon:"🚫",accent:"Block Distractions",title:"Set limits, stop scrolling",desc:"Set daily time limits for any app or website. When your limit hits, Focsy blocks access automatically — no willpower required."},
  {icon:"✂️",accent:"In-App Blocking",title:"Kill the feed, keep the app",desc:"Block Instagram Reels, YouTube Shorts, or TikTok feeds without losing access to the rest of the app."},
  {icon:"📊",accent:"Screen Time",title:"See exactly where time goes",desc:"Detailed daily usage stats show which apps are eating your day. Honest numbers, no sugarcoating."},
  {icon:"🔑",accent:"Friend Approval",title:"Your friend holds the key",desc:"Once enabled, Focsy blocks the app immediately. Your friend gets the only unlock code — you never see it."},
  {icon:"🔒",accent:"Strict Mode",title:"Zero escape hatches",desc:"Uninstall blocked. Settings frozen. No way out until tomorrow. For when you genuinely can't trust yourself."},
  {icon:"⚡",accent:"Accessibility",title:"Blocks from inside apps",desc:"Uses Android's AccessibilityService to detect and close distracting screens the moment they open."},
];
const steps=[
  {num:"01",title:"Choose what to block",text:`Pick the apps, websites, or in-app features you want gone — Instagram Reels, YouTube Shorts, TikTok, or entire apps. The block takes effect immediately the moment you save. No grace period, no "start tomorrow", no gentle warnings. It's on.`},
  {num:"02",title:"Your friend gets the only code",text:`Focsy generates a one-time unlock code and emails it directly to a trusted friend you choose. You never receive it — you never even see it. Your friend becomes the sole gatekeeper. Not a timer. Not an algorithm. A real person who knows you and knows why you set this up.`},
  {num:"03",title:"Blocked. Full stop.",text:`The app stays blocked until your friend chooses to share the code with you. No bypass. No override. No emergency unlock. No "one more minute" button. If you want back in, you have to ask them — out loud — and explain yourself. That friction is the entire mechanism. It works because it's real.`},
];
const strictPoints=[
  {title:"Paragraph required",desc:"To unrestrict apps, you must write a paragraph. Without that paragraph, unrestricting is blocked."},
  {title:"Limits only get stricter",desc:"While Strict Mode is active, you can only add more limits. You cannot remove existing restrictions."},
  {title:"No direct disable",desc:"There is no direct way to remove Strict Mode without submitting that paragraph."},
  {title:"Applies when logged in",desc:"If you're logged in, Strict Mode stays active until the paragraph requirement is completed."},
];
const testimonials=[
  {initials:"MR",name:"Marcus R.",role:"Software engineer",quote:"I've tried every blocker app. The difference with Focsy is the friend code — I literally cannot cheat. Cut my phone time from 5 hours to under 90 minutes in a week."},
  {initials:"JK",name:"Jess K.",role:"Designer & mom of two",quote:"My partner holds the code. The first week was hard. Now I don't even miss the scrolling — I've read four books this month."},
  {initials:"AT",name:"Alex T.",role:"Freelance photographer",quote:"The in-app blocking is genius. I still use Instagram for work DMs but Reels is gone. Saves me 45 minutes every single day."},
];
const plans=[
  {id:"free",name:"Free",price:"€0",period:"forever",desc:"Everything you need to get started and test if it works for you.",features:["Block unlimited apps & sites","In-app blocking (Reels, Shorts)","Daily screen time stats","Friend Approval (1 friend)"],cta:"Download Free",highlight:false},
  {id:"pro",name:"Pro",price:"€4.99",period:"per month",monthlyPrice:"€4.99",yearlyPrice:"€29.99",desc:"For people who are serious about getting their focus back.",features:["Unlimited app & site blocking","Unlimited in-app blocking","Full usage history & trends","Multiple friends / guardians","Strict Mode","Priority support"],cta:"Get Pro",highlight:false},
];
const PLAY="https://play.google.com/store/apps/details?id=com.focsy";

export default function FocsyLanding() {
  const [billing,setBilling]=useState("yearly");
  const renderedPlans=plans.map(plan=>{
    if(plan.id!=="pro")return plan;
    const isYearly=billing==="yearly";
    return{...plan,price:isYearly?plan.yearlyPrice:plan.monthlyPrice,period:isYearly?"per year":"per month",cta:isYearly?"Get Yearly":"Get Monthly",highlight:isYearly};
  });
  const scrollTo=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return (
    <MotionConfig transition={{ duration: 0.65, ease: EASE_OUT }} reducedMotion="user">
    <div style={{fontFamily:"'DM Sans',sans-serif",background:S1,color:"#1A1A1A",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{-webkit-font-smoothing:antialiased;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-thumb{background:${OR4};border-radius:3px;}
        @keyframes rCW{to{transform:rotate(360deg);}}
        @keyframes rCCW{to{transform:rotate(-360deg);}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.12}}
        .split{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
        @media(max-width:820px){
          .split{grid-template-columns:1fr;gap:48px;}
          .rev>*:first-child{order:2;}
          .rev>*:last-child{order:1;}
          .nav-links-c{display:none!important;}
        }
        .bp{background:${OR};color:#fff;font-family:'DM Sans',sans-serif;font-weight:600;font-size:15px;padding:14px 30px;border:none;border-radius:100px;cursor:pointer;transition:transform .2s,box-shadow .2s;box-shadow:0 4px 18px rgba(255,107,53,.35);}
        .bp:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(255,107,53,.45);}
        .bg{background:rgba(255,255,255,0.5);color:#6B3A1F;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;border:1.5px solid rgba(255,107,53,.3);padding:13px 28px;border-radius:100px;cursor:pointer;transition:all .2s;backdrop-filter:blur(8px);}
        .bg:hover{color:#1A1A1A;border-color:${OR};background:rgba(255,255,255,0.8);}
        .bc{background:transparent;color:${OR};font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;border:1.5px solid ${OR};padding:13px 28px;border-radius:100px;cursor:pointer;transition:background .2s,color .2s;}
        .bc:hover{background:${OR};color:#fff;}
        .bcard{transition:box-shadow .2s,transform .2s;cursor:default;}
        .bcard:hover{box-shadow:0 10px 36px rgba(255,107,53,.15);transform:translateY(-3px);}
        .tcard{transition:border-color .25s,box-shadow .25s;}
        .tcard:hover{border-color:rgba(255,107,53,.45)!important;box-shadow:0 4px 20px rgba(255,107,53,.12);}
        .nav-link-btn{background:none;border:none;padding:0;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:400;color:#7A3D1A;cursor:pointer;transition:color .2s;}
        .nav-link-btn:hover{color:#1A1A1A;}
        .nav-link-btn.active{color:#1A1A1A;font-weight:500;text-decoration:underline;text-underline-offset:4px;}
        .nav-ghost{background:rgba(255,255,255,0.55);color:#1A1A1A;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;border:1.5px solid rgba(255,255,255,0.85);padding:10px 22px;border-radius:100px;cursor:pointer;backdrop-filter:blur(8px);transition:background .2s,transform .2s;}
        .nav-ghost:hover{background:rgba(255,255,255,0.9);transform:translateY(-1px);}
      `}</style>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 10%",background:"rgba(255,236,219,.88)",backdropFilter:"blur(18px)",borderBottom:"1px solid rgba(240,123,74,.15)"}}>
        <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22,letterSpacing:-0.5,color:"#1A1A1A"}}>
          Foc<span style={{color:OR}}>sy</span>
        </span>
        <div className="nav-links-c" style={{display:"flex",gap:36,alignItems:"center"}}>
          <button className="nav-link-btn active" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>Home</button>
          <button className="nav-link-btn" onClick={()=>scrollTo("how")}>How it works</button>
          <button className="nav-link-btn" onClick={()=>scrollTo("features")}>Features</button>
          <button className="nav-link-btn" onClick={()=>scrollTo("pricing")}>Pricing</button>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <button className="nav-ghost">Log in</button>
          <button className="bp" style={{fontSize:14,padding:"10px 22px"}} onClick={()=>window.open(PLAY,"_blank")}>Get Focsy — Free</button>
        </div>
      </nav>

      {/* HERO — warm orange gradient background like OnePay's blue but in orange */}
      <section style={{
        padding:"140px 10% 100px",position:"relative",overflow:"hidden",
        display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"center",
        background:`
          radial-gradient(ellipse at 80% 10%, rgba(255,196,135,0.35) 0%, transparent 52%),
          radial-gradient(ellipse at 0% 80%, rgba(255,175,108,0.22) 0%, transparent 54%),
          radial-gradient(ellipse at 50% 50%, rgba(255,230,197,0.35) 0%, transparent 62%),
          linear-gradient(155deg, #FFF2E4 0%, #FFF7EE 35%, #FFFCF8 68%, #FFF3E6 100%)
        `,
      }}>
          <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 1px 1px,rgba(180,70,0,.014) 1px,transparent 0)",backgroundSize:"38px 38px",zIndex:1,pointerEvents:"none"}}/>
        <Glow px="72%" py="30%" size={500} op={0.08}/>
        <Glow px="8%"  py="85%" size={280} op={0.06}/>
        <Ring px="calc(78% - 130px)" py="calc(38% - 130px)" size={260} op={0.22} delay={0}   dur={22}/>
        <Spin px="calc(78% - 130px)" py="calc(38% - 130px)" size={260} op={0.9}  cw={true}  dur={22}/>
        <Spin px="calc(78% - 80px)"  py="calc(38% - 80px)"  size={160} op={0.7}  cw={false} dur={15}/>
        <Ring px="calc(53% - 18px)"  py="calc(14% - 18px)"  size={36}  op={0.22} delay={0}   dur={4.5}/>
        <Ring px="calc(91% - 10px)"  py="calc(60% - 10px)"  size={20}  op={0.28} delay={1.2} dur={3.8}/>
        <Ring px="calc(5% - 30px)"   py="calc(78% - 30px)"  size={60}  op={0.14} delay={0.7} dur={5.5}/>
        <Dot  px="calc(59% - 4px)"   py="calc(82% - 4px)"   size={8}   op={0.32} delay={0}/>
        <Dot  px="calc(93% - 3px)"   py="calc(26% - 3px)"   size={6}   op={0.28} delay={0.7}/>
        <Dot  px="calc(4% - 3px)"    py="calc(44% - 3px)"   size={6}   op={0.22} delay={1.1}/>
        <Dots corner="tl"/><Dots corner="br"/>
        <Diamond px="calc(18% - 12px)" py="calc(18% - 12px)" size={24} op={0.24} delay={0.3} dur={10}/>
        <Diamond px="calc(88% - 10px)" py="calc(74% - 10px)" size={20} op={0.18} delay={1.1} dur={8}/>
        <Diamond px="calc(34% - 14px)" py="calc(86% - 14px)" size={28} op={0.3} delay={0.9} dur={12}/>
        <Diamond px="calc(82% - 14px)" py="calc(12% - 14px)" size={28} op={0.26} delay={1.6} dur={11}/>
        <OrbitalLine px="8%" py="18%" width={180} rotate={18} op={0.16} delay={0.2} dur={12}/>
        <OrbitalLine px="72%" py="84%" width={150} rotate={-18} op={0.14} delay={1.1} dur={9}/>
        <OrbitalLine px="18%" py="70%" width={220} rotate={32} op={0.24} delay={0.7} dur={13}/>
        <OrbitalLine px="62%" py="24%" width={200} rotate={-26} op={0.22} delay={1.3} dur={10}/>
        <Dots corner="tr"/>
        <Arc d="M -80 700 Q 350 150 900 420 T 2000 180"  op={0.08} dur={2.2} delay={0.9}/>
        <Arc d="M 2000 60 Q 1300 380 750 180 T -80 480"  op={0.06} dur={2.5} delay={1.3}/>
        <Arc d="M 100 120 Q 540 320 940 120 T 1800 360" op={0.16} dur={2.4} delay={0.6}/>

        <div style={{position:"relative",zIndex:2}}>
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{...SPRING_SMOOTH,delay:0.1}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,107,53,.12)",border:"1px solid rgba(255,107,53,.28)",color:OR,fontSize:12,fontWeight:600,padding:"6px 14px",borderRadius:100,letterSpacing:"0.04em",marginBottom:36}}>
              <span style={{width:6,height:6,background:OR,borderRadius:"50%",animation:"blink 1.4s ease-in-out infinite"}}/>
              Android · Updated Mar 2026
            </div>
          </motion.div>
          <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(40px,4.8vw,68px)",lineHeight:1.07,letterSpacing:"-0.035em",marginBottom:28,color:"#1A1A1A"}}>
            <div style={{display:"flex",flexWrap:"wrap",gap:"0 14px",marginBottom:4}}>
              {["Your","phone","won't","stop."].map((w,i)=>(
                <motion.span key={w} initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{...SPRING_SMOOTH,delay:0.25+i*0.08}} style={{display:"inline-block"}}>{w}</motion.span>
              ))}
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"0 14px"}}>
              {["Now","it","has","to."].map((w,i)=>(
                <motion.span key={w} initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{...SPRING_SMOOTH,delay:0.57+i*0.08}} style={{display:"inline-block",color:OR}}>{w}</motion.span>
              ))}
            </div>
          </h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.95,ease:EASE_OUT}}
            style={{fontSize:17,color:"#6B3A1F",fontWeight:300,lineHeight:1.75,maxWidth:460,marginBottom:44}}>
            Focsy blocks distracting apps, kills addictive feeds like Reels and Shorts, tracks your real usage, and puts your friend in charge of the unlock code — so you can't cheat your way back in.
          </motion.p>
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{...SPRING_SMOOTH,delay:1.1}} style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            <button className="bp" onClick={()=>window.open(PLAY,"_blank")}>Download on Google Play</button>
            <button className="bg" onClick={()=>scrollTo("how")}>How it works</button>
          </motion.div>
        </div>

        <motion.div initial={{opacity:0,scale:0.96,y:24}} animate={{opacity:1,scale:1,y:0}} transition={{...SPRING_SOFT,delay:0.5}} style={{position:"relative",zIndex:2}}>
          <Img src={heroImg} label="Focsy app screenshot" h={520} r={24} fit="contain"/>
        </motion.div>
      </section>

      {/* WHAT IT DOES */}
      <Reveal>
        <section id="features" style={{padding:"120px 10%",position:"relative",overflow:"hidden",background:S2}}>
          <Dots corner="tl"/><Dots corner="br"/>
          <Dots corner="tr"/>
          <Diamond px="calc(10% - 16px)" py="calc(18% - 16px)" size={32} op={0.3} delay={0.4} dur={10}/>
          <Diamond px="calc(88% - 14px)" py="calc(30% - 14px)" size={28} op={0.28} delay={1.1} dur={9}/>
          <OrbitalLine px="6%" py="82%" width={200} rotate={14} op={0.24} delay={0.3} dur={11}/>
          <OrbitalLine px="70%" py="12%" width={170} rotate={-22} op={0.22} delay={1.2} dur={9}/>
          <Glow px="98%" py="5%"  size={320} op={0.08}/>
          <Glow px="-2%" py="55%" size={300} op={0.06}/>
          <Ring px="calc(96% - 150px)" py="calc(6% - 150px)"  size={300} op={0.1}  delay={0.4} dur={8}/>
          <Spin px="calc(96% - 150px)" py="calc(6% - 150px)"  size={300} op={0.55} cw={true}  dur={30}/>
          <Spin px="calc(96% - 95px)"  py="calc(6% - 95px)"   size={190} op={0.40} cw={false} dur={20}/>
          <Ring px="calc(4% - 25px)"   py="calc(32% - 25px)"  size={50}  op={0.18} delay={1}   dur={5}/>
          <Ring px="calc(50% - 12px)"  py="calc(91% - 12px)"  size={24}  op={0.22} delay={0.6} dur={4}/>
          <Dot  px="calc(97% - 4px)"   py="calc(56% - 4px)"   size={8}   op={0.3}  delay={0.3}/>
          <Dot  px="calc(3% - 3px)"    py="calc(73% - 3px)"   size={6}   op={0.22} delay={0.9}/>
          <Arc d="M 0 900 Q 400 300 850 620 T 1900 100" op={0.08} dur={2} delay={0.5}/>
          <Arc d="M 1900 800 Q 1200 200 600 500 T 0 300" op={0.05} dur={2.3} delay={0.9}/>

          <div className="split" style={{alignItems:"start",position:"relative",zIndex:2}}>
            <div style={{position:"sticky",top:120}}>
              <Tag>What Focsy does</Tag>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(28px,3.5vw,44px)",fontWeight:800,letterSpacing:"-0.03em",lineHeight:1.1,color:"#1A1A1A",marginBottom:20}}>
                Six tools that replace<br/>willpower with structure
              </h2>
              <p style={{fontSize:16,color:"#7A3D1A",fontWeight:300,lineHeight:1.75,maxWidth:360}}>
                Built for Android using Accessibility Services — Focsy works inside apps, not just around them.
              </p>
              <div style={{marginTop:36,display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:36,height:2,background:OR,borderRadius:1}}/>
                <div style={{width:8,height:8,border:`1.5px solid ${OR}`,borderRadius:"50%",opacity:0.5}}/>
                <div style={{width:18,height:2,background:OR4,borderRadius:1}}/>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              {benefits.map((b,i)=>(
                <motion.div key={b.title} className="bcard"
                  initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
                  viewport={{once:false,amount:0.2}} transition={{...SPRING_SMOOTH,delay:i*0.07}}
                  style={{padding:"28px 24px",background:S1,border:"1px solid rgba(255,107,53,.22)",borderRadius:18}}>
                  <div style={{fontSize:24,marginBottom:14}}>{b.icon}</div>
                  <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:"0.12em",color:OR,fontWeight:600,marginBottom:8}}>{b.accent}</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:700,letterSpacing:"-0.02em",marginBottom:8,color:"#1A1A1A",lineHeight:1.25}}>{b.title}</div>
                  <div style={{fontSize:13,color:"#7A3D1A",lineHeight:1.68,fontWeight:300}}>{b.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* IN-APP BLOCKING */}
      <Reveal delay={0.05}>
        <section style={{padding:"120px 10%",background:S1,borderTop:`1px solid ${OR4}`,position:"relative",overflow:"hidden"}}>
          <Dots corner="br"/>
          <Dots corner="tl"/>
          <Diamond px="calc(14% - 15px)" py="calc(22% - 15px)" size={30} op={0.28} delay={0.4} dur={9}/>
          <Diamond px="calc(84% - 12px)" py="calc(76% - 12px)" size={24} op={0.24} delay={1.1} dur={8}/>
          <OrbitalLine px="12%" py="16%" width={170} rotate={18} op={0.24} delay={0.2} dur={10}/>
          <OrbitalLine px="72%" py="86%" width={200} rotate={-16} op={0.22} delay={1} dur={12}/>
          <Glow px="100%" py="50%" size={380} op={0.08}/>
          <Ring px="calc(-2% - 100px)" py="calc(65% - 100px)" size={200} op={0.1}  delay={0.5} dur={7}/>
          <Spin px="calc(-2% - 120px)" py="calc(50% - 120px)" size={240} op={0.55} cw={false} dur={22}/>
          <Ring px="calc(95% - 24px)"  py="calc(8% - 24px)"   size={48}  op={0.18} delay={1.2} dur={4.5}/>
          <Ring px="calc(48% - 10px)"  py="calc(92% - 10px)"  size={20}  op={0.22} delay={0.8} dur={3.8}/>
          <Dot  px="calc(97% - 4px)"   py="calc(50% - 4px)"   size={8}   op={0.28} delay={0.4}/>
          <Dot  px="calc(5% - 3px)"    py="calc(20% - 3px)"   size={6}   op={0.22} delay={1.1}/>
          <div style={{position:"absolute",top:"10%",left:"49.5%",height:"80%",width:1,background:`linear-gradient(180deg,transparent,rgba(255,107,53,.12) 30%,rgba(255,107,53,.12) 70%,transparent)`,zIndex:1,pointerEvents:"none"}}/>
          <Arc d="M 1900 200 Q 1200 600 800 300 T 0 700" op={0.08} dur={2.2} delay={0.4}/>

          <div className="split rev" style={{position:"relative",zIndex:2}}>
            <Img src={inappImg} label="In-app blocking screenshot" h={480} r={20} fit="contain"/>
            <div>
              <Tag>In-App Blocking</Tag>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,3.2vw,42px)",fontWeight:800,letterSpacing:"-0.03em",lineHeight:1.1,marginBottom:24,color:"#1A1A1A"}}>
                Block Reels,<br/>not Instagram.<br/>Block Shorts,<br/>not YouTube.
              </h2>
              <p style={{fontSize:16,color:"#7A3D1A",fontWeight:300,lineHeight:1.78,marginBottom:20}}>
                Most blockers force an all-or-nothing choice. Focsy uses Android's AccessibilityService to detect when you open a distracting section and closes it instantly — while leaving the rest of the app untouched.
              </p>
              <p style={{fontSize:16,color:"#7A3D1A",fontWeight:300,lineHeight:1.78}}>
                Check Instagram DMs. Search YouTube. Browse normally. Just no infinite scroll.
              </p>
              <div style={{marginTop:28,display:"flex",gap:8,flexWrap:"wrap"}}>
                {["Instagram Reels","YouTube Shorts","TikTok Feed","Facebook Video"].map(t=>(
                  <span key={t} style={{fontSize:12,padding:"5px 12px",background:"rgba(255,107,53,.1)",border:"1px solid rgba(255,107,53,.25)",borderRadius:100,color:OR,fontWeight:500}}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* HOW IT WORKS */}
      <Reveal delay={0.05}>
        <section id="how" style={{padding:"120px 10%",background:S2,position:"relative",overflow:"hidden"}}>
          <Dots corner="tl"/><Dots corner="br"/>
          <Dots corner="bl"/>
          <Diamond px="calc(12% - 15px)" py="calc(16% - 15px)" size={30} op={0.28} delay={0.5} dur={11}/>
          <Diamond px="calc(86% - 14px)" py="calc(68% - 14px)" size={28} op={0.26} delay={1.2} dur={10}/>
          <OrbitalLine px="8%" py="72%" width={220} rotate={12} op={0.22} delay={0.4} dur={12}/>
          <OrbitalLine px="64%" py="18%" width={180} rotate={-20} op={0.24} delay={1.1} dur={9}/>
          <Glow px="50%"  py="-2%" size={400} op={0.06}/>
          <Ring px="calc(97% - 110px)" py="calc(14% - 110px)" size={220} op={0.1}  delay={0.3} dur={8}/>
          <Spin px="calc(97% - 130px)" py="calc(14% - 130px)" size={260} op={0.55} cw={true}  dur={26}/>
          <Spin px="calc(97% - 80px)"  py="calc(14% - 80px)"  size={160} op={0.40} cw={false} dur={17}/>
          <Spin px="calc(3% - 70px)"   py="calc(80% - 70px)"  size={140} op={0.45} cw={false} dur={18}/>
          <Ring px="calc(3% - 25px)"   py="calc(28% - 25px)"  size={50}  op={0.18} delay={1}   dur={4}/>
          <Ring px="calc(80% - 6px)"   py="calc(75% - 6px)"   size={12}  op={0.22} delay={1.4} dur={4.2}/>
          <Dot  px="calc(97% - 4px)"   py="calc(80% - 4px)"   size={8}   op={0.28} delay={0.5}/>
          <Dot  px="calc(5% - 3px)"    py="calc(65% - 3px)"   size={6}   op={0.22} delay={1.3}/>
          <div style={{position:"absolute",top:"50%",left:0,right:0,height:1,background:`linear-gradient(90deg,transparent 5%,rgba(255,107,53,.1) 35%,rgba(255,107,53,.1) 65%,transparent 95%)`,zIndex:1,pointerEvents:"none"}}/>
          <Arc d="M 0 300 Q 600 750 1100 350 T 1900 620" op={0.08} dur={2.1} delay={0.5}/>

          <div className="split" style={{alignItems:"start",position:"relative",zIndex:2}}>
            <div style={{position:"sticky",top:120}}>
              <Tag>How it works</Tag>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(28px,3.5vw,44px)",fontWeight:800,letterSpacing:"-0.03em",lineHeight:1.1,marginBottom:20,color:"#1A1A1A"}}>
                Set up in 2 minutes.<br/>Works all day.
              </h2>
              <p style={{fontSize:16,color:"#7A3D1A",fontWeight:300,lineHeight:1.75,maxWidth:360}}>
                The friend code removes the escape hatch you'd otherwise use on yourself. Three steps. No complicated setup.
              </p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:20,position:"relative",zIndex:1}}>
              <div style={{position:"absolute",left:31,top:64,bottom:64,width:1,background:`linear-gradient(180deg,${OR},rgba(255,107,53,.05))`}}/>
              {steps.map((s,i)=>(
                <div key={s.num} style={{padding:"36px 32px",background:S1,border:"1px solid rgba(255,107,53,.22)",borderRadius:20,position:"relative"}}>
                  <div style={{position:"absolute",left:-1,top:"50%",transform:"translateY(-50%)",width:3,height:44,background:OR,borderRadius:"0 3px 3px 0",opacity:i===0?1:0.3}}/>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:52,fontWeight:800,color:"rgba(255,107,53,.3)",lineHeight:1,marginBottom:16,letterSpacing:"-0.04em"}}>{s.num}</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700,letterSpacing:"-0.02em",marginBottom:12,color:"#1A1A1A"}}>{s.title}</div>
                  <div style={{fontSize:15,color:"#7A3D1A",lineHeight:1.82,fontWeight:300}}>{s.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* FRIEND APPROVAL */}
      <Reveal delay={0.05}>
        <section style={{padding:"120px 10%",background:S1,borderTop:`1px solid ${OR4}`,position:"relative",overflow:"hidden"}}>
          <Dots corner="tr"/><Dots corner="bl"/>
          <Dots corner="tl"/>
          <Diamond px="calc(16% - 15px)" py="calc(84% - 15px)" size={30} op={0.3} delay={0.6} dur={10}/>
          <Diamond px="calc(82% - 13px)" py="calc(20% - 13px)" size={26} op={0.24} delay={1.3} dur={9}/>
          <OrbitalLine px="8%" py="24%" width={180} rotate={24} op={0.22} delay={0.2} dur={11}/>
          <OrbitalLine px="74%" py="74%" width={210} rotate={-18} op={0.24} delay={1} dur={10}/>
          <Glow px="-2%" py="50%" size={380} op={0.07}/>
          <Ring px="calc(103% - 140px)" py="calc(90% - 140px)" size={280} op={0.1}  delay={0.5} dur={8}/>
          <Spin px="calc(103% - 165px)" py="calc(90% - 165px)" size={330} op={0.50} cw={false} dur={28}/>
          <Spin px="calc(103% - 105px)" py="calc(90% - 105px)" size={210} op={0.40} cw={true}  dur={19}/>
          <Ring px="calc(4% - 22px)"    py="calc(10% - 22px)"  size={44}  op={0.18} delay={1.2} dur={5}/>
          <Ring px="calc(52% - 10px)"   py="calc(5% - 10px)"   size={20}  op={0.22} delay={0.3} dur={4}/>
          <Ring px="calc(26% - 7px)"    py="calc(65% - 7px)"   size={14}  op={0.18} delay={1.7} dur={3.8}/>
          <Dot  px="calc(97% - 4px)"    py="calc(40% - 4px)"   size={8}   op={0.28} delay={0.6}/>
          <Dot  px="calc(5% - 3px)"     py="calc(82% - 3px)"   size={6}   op={0.22} delay={1.5}/>
          <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,rgba(255,107,53,.25),transparent 50%)`,zIndex:1,pointerEvents:"none"}}/>
          <Arc d="M 1900 800 Q 1200 200 750 500 T 0 100" op={0.08} dur={2.3} delay={0.6}/>

          <div className="split" style={{position:"relative",zIndex:2}}>
            <div>
              <Tag>Friend Approval</Tag>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,3.2vw,42px)",fontWeight:800,letterSpacing:"-0.03em",lineHeight:1.1,marginBottom:24,color:"#1A1A1A"}}>
                You can't unlock<br/>it yourself.<br/>That's the point.
              </h2>
              <p style={{fontSize:16,color:"#7A3D1A",fontWeight:300,lineHeight:1.78,marginBottom:20}}>
                When you enable Friend Approval, Focsy blocks the app immediately. Your friend receives the only unlock code — you never see it.
              </p>
              <p style={{fontSize:16,color:"#7A3D1A",fontWeight:300,lineHeight:1.78}}>
                There's no timer, no bypass, no second chance. Blocked means blocked — until your friend decides otherwise.
              </p>
            </div>
            <Img src={friendapprovalImg} label="Friend approval flow screenshot" h={480} r={20} fit="contain"/>
          </div>
        </section>
      </Reveal>

      {/* STRICT MODE */}
      <Reveal delay={0.05}>
        <section style={{padding:"120px 10%",background:S2,position:"relative",overflow:"hidden"}}>
          <Dots corner="tl"/><Dots corner="tr"/>
          <Diamond px="calc(15% - 16px)" py="calc(14% - 16px)" size={32} op={0.2} delay={0.5} dur={11}/>
          <Diamond px="calc(88% - 12px)" py="calc(82% - 12px)" size={24} op={0.24} delay={1.1} dur={9}/>
          <Diamond px="calc(56% - 12px)" py="calc(8% - 12px)" size={24} op={0.3} delay={0.8} dur={10}/>
          <Diamond px="calc(8% - 14px)" py="calc(64% - 14px)" size={28} op={0.26} delay={1.4} dur={12}/>
          <OrbitalLine px="12%" py="78%" width={190} rotate={10} op={0.16} delay={0.4} dur={11}/>
          <OrbitalLine px="66%" py="22%" width={160} rotate={-12} op={0.14} delay={1.2} dur={10}/>
          <OrbitalLine px="20%" py="42%" width={240} rotate={16} op={0.26} delay={0.5} dur={12}/>
          <OrbitalLine px="70%" py="86%" width={180} rotate={-24} op={0.22} delay={1.5} dur={9}/>
          <Glow px="100%" py="50%" size={420} op={0.08}/>
          <Glow px="50%"  py="105%" size={300} op={0.05}/>
          <Ring px="calc(-2% - 120px)" py="calc(50% - 120px)" size={240} op={0.1}  delay={0.4} dur={8}/>
          <Spin px="calc(-2% - 145px)" py="calc(50% - 145px)" size={290} op={0.55} cw={true}  dur={28}/>
          <Spin px="calc(-2% - 90px)"  py="calc(50% - 90px)"  size={180} op={0.40} cw={false} dur={18}/>
          <Spin px="calc(98% - 65px)"  py="calc(15% - 65px)"  size={130} op={0.45} cw={true}  dur={16}/>
          <Ring px="calc(98% - 25px)"  py="calc(15% - 25px)"  size={50}  op={0.18} delay={0.8} dur={5}/>
          <Ring px="calc(50% - 12px)"  py="calc(-2% - 12px)"  size={24}  op={0.22} delay={1.3} dur={4}/>
          <Ring px="calc(75% - 8px)"   py="calc(88% - 8px)"   size={16}  op={0.2}  delay={1.7} dur={3.5}/>
          <Dot  px="calc(97% - 4px)"   py="calc(55% - 4px)"   size={8}   op={0.28} delay={0.3}/>
          <Dot  px="calc(50% - 3px)"   py="calc(97% - 3px)"   size={6}   op={0.22} delay={1.1}/>
          <Dot  px="calc(4% - 3px)"    py="calc(20% - 3px)"   size={6}   op={0.24} delay={0.8}/>
          <div style={{position:"absolute",top:"50%",left:0,right:0,height:1,background:`linear-gradient(90deg,transparent 5%,rgba(255,107,53,.1) 35%,rgba(255,107,53,.1) 65%,transparent 95%)`,zIndex:1,pointerEvents:"none"}}/>
          <Arc d="M 0 200 Q 500 700 1000 350 T 1900 600" op={0.08}  dur={2.2} delay={0.5}/>
          <Arc d="M 1900 300 Q 1400 700 900 400 T 0 700" op={0.05} dur={2.5} delay={0.9}/>

          <div className="split rev" style={{alignItems:"start",position:"relative",zIndex:2}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              {strictPoints.map((p,i)=>(
                <motion.div key={p.title}
                  initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
                  viewport={{once:false,amount:0.2}} transition={{...SPRING_SMOOTH,delay:i*0.08}}
                  style={{padding:"28px 24px",background:S1,border:"1px solid rgba(255,107,53,.22)",borderRadius:18}}>
                  <div style={{width:32,height:32,borderRadius:10,background:"rgba(255,107,53,.12)",border:"1px solid rgba(255,107,53,.22)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:OR}}/>
                  </div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,letterSpacing:"-0.02em",marginBottom:8,color:"#1A1A1A"}}>{p.title}</div>
                  <div style={{fontSize:13,color:"#7A3D1A",lineHeight:1.65,fontWeight:300}}>{p.desc}</div>
                </motion.div>
              ))}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:20}}>
              <Tag>Strict Mode</Tag>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,3.2vw,42px)",fontWeight:800,letterSpacing:"-0.03em",lineHeight:1.1,marginBottom:24,color:"#1A1A1A"}}>
                For when you<br/>genuinely can't<br/>trust yourself.
              </h2>
              <p style={{fontSize:16,color:"#7A3D1A",fontWeight:300,lineHeight:1.78,marginBottom:20}}>
                Strict Mode is the hard-lock option. Once enabled, restrictions stay in place and cannot be casually undone.
              </p>
              <p style={{fontSize:16,color:"#7A3D1A",fontWeight:300,lineHeight:1.78,marginBottom:28}}>
                To remove Strict Mode, the user must submit a required paragraph. While it is active, limits can only be increased, not removed.
              </p>
              <div style={{display:"inline-flex",alignItems:"center",gap:10,padding:"14px 20px",background:"rgba(255,107,53,.08)",border:"1px solid rgba(255,107,53,.22)",borderRadius:14}}>
                <span style={{fontSize:18}}>🔒</span>
                <span style={{fontSize:14,fontWeight:500,color:"#6B3A1F"}}>Available on the Pro plan</span>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* TESTIMONIALS */}
      <Reveal delay={0.05}>
        <section style={{padding:"120px 10%",background:S1,borderTop:`1px solid ${OR4}`,position:"relative",overflow:"hidden"}}>
          <Dots corner="tr"/><Dots corner="bl"/>
          <Dots corner="br"/>
          <Diamond px="calc(12% - 15px)" py="calc(22% - 15px)" size={30} op={0.3} delay={0.5} dur={10}/>
          <Diamond px="calc(90% - 12px)" py="calc(82% - 12px)" size={24} op={0.24} delay={1.3} dur={8}/>
          <OrbitalLine px="10%" py="78%" width={190} rotate={10} op={0.24} delay={0.4} dur={10}/>
          <OrbitalLine px="72%" py="20%" width={180} rotate={-18} op={0.22} delay={1.1} dur={11}/>
          <Glow px="100%" py="60%" size={360} op={0.07}/>
          <Ring px="calc(-3% - 110px)" py="calc(90% - 110px)" size={220} op={0.1}  delay={0.4} dur={7}/>
          <Spin px="calc(-3% - 130px)" py="calc(90% - 130px)" size={260} op={0.50} cw={true}  dur={24}/>
          <Spin px="calc(100% - 130px)" py="calc(-3% - 130px)" size={260} op={0.45} cw={false} dur={20}/>
          <Ring px="calc(96% - 20px)"  py="calc(12% - 20px)"  size={40}  op={0.18} delay={1.1} dur={4.5}/>
          <Ring px="calc(50% - 9px)"   py="calc(8% - 9px)"    size={18}  op={0.22} delay={0.7} dur={3.8}/>
          <Ring px="calc(25% - 6px)"   py="calc(50% - 6px)"   size={12}  op={0.2}  delay={1.5} dur={4}/>
          <Dot  px="calc(3% - 4px)"    py="calc(15% - 4px)"   size={8}   op={0.3}  delay={0.3}/>
          <Dot  px="calc(97% - 3px)"   py="calc(70% - 3px)"   size={6}   op={0.24} delay={1}/>
          <div style={{position:"absolute",bottom:0,left:"10%",right:"10%",height:1,background:`linear-gradient(90deg,transparent,rgba(255,107,53,.15),transparent)`,zIndex:1,pointerEvents:"none"}}/>
          <Arc d="M 0 150 Q 600 600 1100 250 T 1900 450" op={0.08} dur={2.1} delay={0.5}/>

          <div className="split" style={{alignItems:"start",position:"relative",zIndex:2}}>
            <div style={{position:"sticky",top:120}}>
              <Tag>What people say</Tag>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(28px,3.5vw,44px)",fontWeight:800,letterSpacing:"-0.03em",lineHeight:1.1,marginBottom:20,color:"#1A1A1A"}}>
                Real results<br/>from real users
              </h2>
              <p style={{fontSize:16,color:"#7A3D1A",fontWeight:300,lineHeight:1.75,maxWidth:320}}>
                People who actually needed to stop doomscrolling — and did.
              </p>
              <div style={{marginTop:36,display:"flex",gap:8}}>
                {[0,1,2].map(i=>(
                  <div key={i} style={{width:i===0?28:8,height:8,borderRadius:4,background:i===0?OR:OR4}}/>
                ))}
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:18}}>
              {testimonials.map((t,i)=>(
                <motion.div key={t.name} className="tcard"
                  initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}}
                  viewport={{once:false,amount:0.2}} transition={{...SPRING_SMOOTH,delay:i*0.1}}
                  style={{padding:"30px 28px",background:S2,border:`1px solid ${OR4}`,borderRadius:18}}>
                  <div style={{color:OR,fontSize:14,marginBottom:14,letterSpacing:2}}>★★★★★</div>
                  <div style={{fontSize:15,lineHeight:1.72,color:"#6B3A1F",fontWeight:300,marginBottom:22,fontStyle:"italic"}}>"{t.quote}"</div>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,107,53,.12)",border:"1px solid rgba(255,107,53,.28)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:OR,flexShrink:0}}>{t.initials}</div>
                    <div>
                      <div style={{fontSize:14,fontWeight:500,color:"#1A1A1A"}}>{t.name}</div>
                      <div style={{fontSize:12,color:OR3,marginTop:2}}>{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* PRICING */}
      <Reveal delay={0.05}>
        <section id="pricing" style={{padding:"120px 10%",background:S2,borderTop:`1px solid ${OR4}`,position:"relative",overflow:"hidden"}}>
          <Dots corner="tl"/><Dots corner="br"/>
          <Dots corner="tr"/>
          <Diamond px="calc(14% - 15px)" py="calc(18% - 15px)" size={30} op={0.3} delay={0.4} dur={10}/>
          <Diamond px="calc(86% - 14px)" py="calc(80% - 14px)" size={28} op={0.28} delay={1.2} dur={9}/>
          <OrbitalLine px="8%" py="68%" width={210} rotate={14} op={0.24} delay={0.3} dur={12}/>
          <OrbitalLine px="68%" py="14%" width={180} rotate={-16} op={0.22} delay={1.1} dur={10}/>
          <Glow px="50%" py="50%" size={600} op={0.05}/>
          <Ring px="calc(-2% - 100px)" py="calc(30% - 100px)" size={200} op={0.1}  delay={0.5} dur={7}/>
          <Spin px="calc(-2% - 125px)" py="calc(30% - 125px)" size={250} op={0.50} cw={true}  dur={26}/>
          <Ring px="calc(102% - 90px)" py="calc(70% - 90px)"  size={180} op={0.1}  delay={0.8} dur={7}/>
          <Spin px="calc(102% - 115px)" py="calc(70% - 115px)" size={230} op={0.45} cw={false} dur={21}/>
          <Ring px="calc(50% - 12px)"  py="calc(-2% - 12px)"  size={24}  op={0.2}  delay={1}   dur={4}/>
          <Dot  px="calc(5% - 4px)"    py="calc(70% - 4px)"   size={8}   op={0.24} delay={0.4}/>
          <Dot  px="calc(96% - 4px)"   py="calc(20% - 4px)"   size={8}   op={0.24} delay={1.2}/>
          <Arc d="M 0 400 Q 500 0 1000 300 T 1900 100"  op={0.08} dur={2.2} delay={0.5}/>
          <Arc d="M 1900 600 Q 1400 200 900 500 T 0 300" op={0.05} dur={2.5} delay={0.9}/>

          <div style={{textAlign:"center",marginBottom:24,position:"relative",zIndex:2}}>
            <Tag>Pricing</Tag>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(28px,3.5vw,44px)",fontWeight:800,letterSpacing:"-0.03em",lineHeight:1.1,color:"#1A1A1A",marginBottom:16}}>
              Simple, honest pricing
            </h2>
            <p style={{fontSize:16,color:"#7A3D1A",fontWeight:300,lineHeight:1.75,maxWidth:420,margin:"0 auto"}}>
              Start free. Upgrade when you're ready to go all-in on focus.
            </p>
          </div>

          <div style={{display:"flex",justifyContent:"center",marginBottom:36,position:"relative",zIndex:2}}>
            <div onClick={()=>setBilling(billing==="yearly"?"monthly":"yearly")}
              style={{display:"inline-flex",alignItems:"center",gap:10,background:S1,border:`1px solid ${OR4}`,borderRadius:999,padding:"8px 12px",cursor:"pointer",boxShadow:`0 6px 20px rgba(255,107,53,.12)`}}>
              <span style={{fontSize:13,color:billing==="monthly"?"#1A1A1A":"#7A3D1A",fontWeight:500}}>Monthly</span>
              <div style={{position:"relative",width:46,height:24,background:"rgba(255,107,53,.18)",borderRadius:12,padding:4}}>
                <div style={{position:"absolute",top:4,left:billing==="yearly"?24:4,width:16,height:16,borderRadius:"50%",background:OR,transition:"left .2s ease"}}/>
              </div>
              <span style={{fontSize:13,color:billing==="yearly"?"#1A1A1A":"#7A3D1A",fontWeight:600}}>Yearly</span>
              <span style={{fontSize:11,color:OR,fontWeight:700,letterSpacing:"0.05em",textTransform:"uppercase"}}>Save 37%</span>
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24,maxWidth:760,margin:"0 auto",position:"relative",zIndex:2}}>
            {renderedPlans.map(plan=>(
              <motion.div key={plan.name}
                initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
                viewport={{once:false,amount:0.2}} transition={{...SPRING_SOFT}}
                style={{
                  padding:"40px 36px",borderRadius:24,position:"relative",
                  background:plan.id==="pro"?OR:S1,
                  border:plan.id==="pro"?"none":`1px solid ${OR4}`,
                  boxShadow:plan.id==="pro"?`0 20px 60px rgba(255,107,53,.35)`:"none",
                }}>
                {plan.id==="pro"&&plan.highlight&&(
                  <div style={{position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",background:"#1A1A1A",color:"#fff",fontSize:11,fontWeight:600,padding:"5px 14px",borderRadius:100,letterSpacing:"0.08em",textTransform:"uppercase",whiteSpace:"nowrap"}}>
                    Most popular
                  </div>
                )}
                <div style={{fontSize:13,fontWeight:600,color:plan.id==="pro"?"rgba(255,255,255,.75)":OR2,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:12}}>{plan.name}</div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:4,marginBottom:10}}>
                  <span style={{fontFamily:"'Syne',sans-serif",fontSize:52,fontWeight:800,letterSpacing:"-0.04em",color:plan.id==="pro"?"#fff":"#1A1A1A",lineHeight:1}}>{plan.price}</span>
                  <span style={{fontSize:14,color:plan.id==="pro"?"rgba(255,255,255,.8)":OR2,fontWeight:500}}>{plan.period}</span>
                </div>
                <p style={{fontSize:14,color:plan.id==="pro"?"rgba(255,255,255,.85)":"#7A3D1A",marginBottom:28,lineHeight:1.55,fontWeight:300}}>{plan.desc}</p>
                <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:36}}>
                  {plan.features.map(f=>(
                    <div key={f} style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:18,height:18,borderRadius:"50%",background:plan.id==="pro"?"rgba(255,255,255,.2)":"rgba(255,107,53,.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke={plan.id==="pro"?"#fff":OR} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span style={{fontSize:14,color:plan.id==="pro"?"rgba(255,255,255,.92)":"#6B3A1F",fontWeight:300}}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={()=>window.open(PLAY,"_blank")}
                  style={{width:"100%",padding:"14px 0",borderRadius:100,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:15,cursor:"pointer",transition:"all .2s",background:plan.id==="pro"?"#fff":"transparent",color:OR,border:plan.id==="pro"?"none":`1.5px solid ${OR}`}}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      </Reveal>

    </div>
    </MotionConfig>
  );
}