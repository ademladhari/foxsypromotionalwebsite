import { LuBan, LuScissors, LuBarChart3, LuKeyRound, LuLock, LuZap } from "react-icons/lu";

export const PLAY = "https://play.google.com/store/apps/details?id=com.focsy";

export const NAV = [
  { id: "features", label: "Features" },
  { id: "how", label: "How It Works" },
  { id: "faq", label: "FAQ" },
];

export const BLOCKED_FEEDS = ["Instagram Reels", "YouTube Shorts", "TikTok Feed", "Facebook Video"];

export const features = [
  {
    id: "friend",
    icon: LuKeyRound,
    kicker: "Friend Approval",
    title: "Your Friend Holds the Key",
    desc: "Turn it on and the app locks immediately. A 6‑digit unlock code goes to a friend you trust — never to you.",
  },
  {
    id: "inapp",
    icon: LuScissors,
    kicker: "In‑App Blocking",
    title: "Kill the Feed, Keep the App",
    desc: "Block Reels, Shorts or the TikTok feed without losing DMs, search or anything else you actually need.",
  },
  {
    id: "limits",
    icon: LuBan,
    kicker: "Usage Limits",
    title: "Set Limits, Stop Scrolling",
    desc: "Daily time limits for any app or website. When the limit hits, Focsy blocks access automatically.",
  },
  {
    id: "stats",
    icon: LuBarChart3,
    kicker: "Screen Time",
    title: "See Exactly Where Time Goes",
    desc: "Honest daily usage stats show which apps are eating your day. No sugarcoating.",
  },
  {
    id: "strict",
    icon: LuLock,
    kicker: "Strict Mode",
    title: "Zero Easy Exits",
    desc: "Limits can only get stricter. Turning it off means completing the Strict Mode challenge — no shortcuts.",
  },
  {
    id: "a11y",
    icon: LuZap,
    kicker: "Accessibility Service",
    title: "Blocks From Inside Apps",
    desc: "Uses Android’s AccessibilityService to spot distracting screens and close them the moment they open.",
  },
];

export const steps = [
  {
    num: "01",
    title: "Choose What to Block",
    text: "Pick apps, websites or in‑app features — Reels, Shorts, TikTok, or entire apps. The block starts the moment you save. No grace period, no “start tomorrow.”",
  },
  {
    num: "02",
    title: "Your Friend Gets the Code",
    text: "Focsy sends a one‑time unlock code to a friend you choose. You never see it. Not a timer, not an algorithm — a real person who knows why you set this up.",
  },
  {
    num: "03",
    title: "Blocked Until They Say Yes",
    text: "Want back in? Tap Ask and your friend gets the request. In a real emergency you can remove the block yourself — but only after finishing an unblocking challenge. Either way, there’s no impulse unlock.",
  },
];

export const strictPoints = [
  { title: "Can’t Turn Off Blocked Apps", desc: "Once Strict Mode is on, blocked apps stay blocked." },
  { title: "Can’t Remove Apps or Sites", desc: "Your block list can grow. It can’t shrink." },
  { title: "In‑App Blocks Stay On", desc: "Reels and Shorts blocks can’t be switched back off." },
  { title: "One Wrong Letter Resets", desc: "Disabling it means typing the full challenge paragraph perfectly." },
];

export const testimonials = [
  {
    initials: "MR",
    name: "Marcus R.",
    role: "Software engineer",
    quote: "I’ve tried every blocker app. The difference with Focsy is the friend code — I literally cannot cheat. Cut my phone time from 5 hours to under 90 minutes in a week.",
  },
  {
    initials: "JK",
    name: "Jess K.",
    role: "Designer & mom of two",
    quote: "My partner holds the code. The first week was hard. Now I don’t even miss the scrolling — I’ve read four books this month.",
  },
  {
    initials: "AT",
    name: "Alex T.",
    role: "Freelance photographer",
    quote: "The in‑app blocking is genius. I still use Instagram for work DMs but Reels is gone. Saves me 45 minutes every single day.",
  },
];

export const PRICES = { monthly: 4.99, yearly: 29.99 };

export const plans = [
  {
    id: "free",
    name: "Free",
    desc: "Everything you need to start — and to find out if it works for you.",
    features: [
      "Block apps & websites",
      "In‑app blocking (Reels, Shorts)",
      "Daily screen‑time stats",
      "Friend Approval with 1 friend",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    desc: "For people who are serious about getting their focus back.",
    features: [
      "Unlimited app & site blocking",
      "Unlimited in‑app blocking",
      "Full usage history & trends",
      "Multiple friends as guardians",
      "Strict Mode",
      "Priority support",
    ],
  },
];

export const faqs = [
  {
    q: "Does Focsy work on iPhone?",
    a: "Not right now. Focsy is built for Android — it relies on Android’s AccessibilityService to detect and close distracting screens inside apps, which iOS doesn’t allow.",
  },
  {
    q: "Why does Focsy need Accessibility permission?",
    a: "That’s how in‑app blocking works. The AccessibilityService lets Focsy notice when you open a section like Reels or Shorts and close it instantly, while the rest of the app keeps working.",
  },
  {
    q: "What happens when I open a blocked app?",
    a: "Focsy closes it — and if you’ve picked a redirect app for that rule, it opens that instead. Send yourself to a book, a language app or your notes, so the reflex to scroll lands somewhere useful.",
  },
  {
    q: "Can I still use Instagram or YouTube if I block Reels or Shorts?",
    a: "Yes. DMs, search and normal browsing keep working — only the infinite‑scroll feed you chose to block gets closed.",
  },
  {
    q: "What if my friend isn’t around to give me the code?",
    a: "Use Emergency Remove Blocking. It works without your friend, but not instantly: you first complete an unblocking challenge, like the Strict Mode one, typing a long paragraph exactly. It’s there for real emergencies and too slow to use on impulse.",
  },
  {
    q: "How do I turn off Strict Mode?",
    a: "You complete the Strict Mode challenge: type the full paragraph exactly. One wrong letter resets your progress. Until then, limits can only get stricter.",
  },
];

export const blockModes = [
  { title: "Always Block", desc: "Block the app completely, at all times." },
  { title: "Daily Limit", desc: "Block after a set amount of use each day." },
  { title: "Schedule", desc: "Block during specific hours of the day." },
  { title: "Sessions", desc: "Use it in short sessions, each followed by a break twice as long." },
  { title: "Friend Approval", desc: "A friend must approve before you can unlock it." },
];
