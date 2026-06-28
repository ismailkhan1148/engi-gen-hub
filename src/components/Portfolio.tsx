import { useEffect, useState, useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion";
import {
  Wrench, Zap, Sun, Code2, Cog, ShieldCheck, Cpu, Database, Globe,
  Briefcase, GraduationCap, Award, Mail, Phone, MapPin, Download,
  ArrowUp, Menu, X, Moon, Sun as SunIcon, Github, Linkedin, Facebook,
  Instagram, MessageCircle, ExternalLink, Sparkles, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import p480Avif from "@/assets/ismail_480.avif.asset.json";
import p800Avif from "@/assets/ismail_800.avif.asset.json";
import p1200Avif from "@/assets/ismail_1200.avif.asset.json";
import p480Webp from "@/assets/ismail_480.webp.asset.json";
import p800Webp from "@/assets/ismail_800.webp.asset.json";
import p1200Webp from "@/assets/ismail_1200.webp.asset.json";
import p480Jpg from "@/assets/ismail_480.jpg.asset.json";
import p800Jpg from "@/assets/ismail_800.jpg.asset.json";
import p1200Jpg from "@/assets/ismail_1200.jpg.asset.json";
const avifSrcSet = `${p480Avif.url} 480w, ${p800Avif.url} 800w, ${p1200Avif.url} 1200w`;
const webpSrcSet = `${p480Webp.url} 480w, ${p800Webp.url} 800w, ${p1200Webp.url} 1200w`;
const jpgSrcSet  = `${p480Jpg.url} 480w, ${p800Jpg.url} 800w, ${p1200Jpg.url} 1200w`;
const profileImg = p800Jpg.url;
import cncImg from "@/assets/proj-cnc.jpg";
import elecImg from "@/assets/proj-electrical.jpg";
import solarImg from "@/assets/proj-solar.jpg";
import softwareImg from "@/assets/proj-software.jpg";

/* ---------------- Data ---------------- */

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

const SKILL_GROUPS = [
  {
    title: "Mechanical Engineering",
    icon: Cog,
    skills: [
      { name: "Mechanical Maintenance", level: 90 },
      { name: "Fabrication", level: 85 },
      { name: "Machine Operation", level: 92 },
      { name: "CNC 5 Axis Milling", level: 88 },
      { name: "Troubleshooting", level: 90 },
      { name: "Industrial Safety", level: 95 },
    ],
  },
  {
    title: "Electrical Skills",
    icon: Zap,
    skills: [
      { name: "Residential Wiring", level: 93 },
      { name: "Industrial Installation", level: 88 },
      { name: "Panel Board Installation", level: 90 },
      { name: "Circuit Troubleshooting", level: 92 },
      { name: "Electrical Safety", level: 95 },
      { name: "Load Calculation", level: 85 },
    ],
  },
  {
    title: "Solar Energy",
    icon: Sun,
    skills: [
      { name: "Solar Panel Installation", level: 92 },
      { name: "Inverter Installation", level: 90 },
      { name: "Battery Bank Setup", level: 88 },
      { name: "Net Metering Basics", level: 80 },
      { name: "System Maintenance", level: 90 },
      { name: "System Troubleshooting", level: 88 },
    ],
  },
  {
    title: "Programming",
    icon: Code2,
    skills: [
      { name: "C++", level: 80 },
      { name: "C#", level: 75 },
      { name: "Java", level: 75 },
      { name: "JavaScript / React", level: 85 },
      { name: "Node.js / Express", level: 80 },
      { name: "MongoDB", level: 78 },
    ],
  },
  {
    title: "Computer Skills",
    icon: Cpu,
    skills: [
      { name: "MS Office", level: 90 },
      { name: "Computer Operating", level: 95 },
      { name: "Database Management", level: 82 },
      { name: "Web Development", level: 85 },
      { name: "Software Troubleshooting", level: 88 },
    ],
  },
];

const EDUCATION = [
  { title: "BS Computer Science", meta: "7th Semester — In Progress", detail: "Currently pursuing" },
  { title: "DAE Mechanical Technology", meta: "Diploma of Associate Engineering", detail: "2382 / 3450" },
  { title: "Matric (Computer Science)", meta: "Secondary School Certificate", detail: "603 / 1100" },
];

const EXPERIENCE = [
  {
    role: "Apprentice Machinist",
    org: "AMF PAC Kamra",
    period: "23 May 2023 – 22 Nov 2023",
    points: [
      "Operated CNC 5 Axis Milling Machine",
      "Machine setup and operation",
      "Precision manufacturing",
      "Industrial safety compliance",
    ],
  },
  {
    role: "Professional Electrician",
    org: "Independent",
    period: "Ongoing",
    points: [
      "Residential and commercial wiring",
      "Electrical fault diagnosis",
      "Panel installation",
      "Power distribution work",
    ],
  },
  {
    role: "Solar System Installer",
    org: "Independent",
    period: "Ongoing",
    points: [
      "Solar panel mounting and installation",
      "Inverter configuration",
      "Battery connection and testing",
      "System performance checks",
    ],
  },
];

const PROJECTS = [
  {
    title: "CNC 5-Axis Machining",
    cat: "Engineering",
    img: cncImg,
    tags: ["CNC", "Milling", "Precision"],
    desc: "Operated 5-axis CNC milling for precision-manufactured industrial components at AMF PAC Kamra.",
  },
  {
    title: "Industrial Maintenance",
    cat: "Engineering",
    img: cncImg,
    tags: ["Maintenance", "Diagnostics"],
    desc: "Routine and preventive maintenance for industrial machinery and tooling.",
  },
  {
    title: "Distribution Panel Installation",
    cat: "Electrical",
    img: elecImg,
    tags: ["Panel", "Wiring", "Safety"],
    desc: "Designed and installed distribution panels for residential and small commercial sites.",
  },
  {
    title: "Residential Electrical Wiring",
    cat: "Electrical",
    img: elecImg,
    tags: ["Wiring", "Residential"],
    desc: "Complete house wiring with load calculation and safety compliance.",
  },
  {
    title: "5kW Solar Installation",
    cat: "Solar",
    img: solarImg,
    tags: ["Solar", "Inverter", "Battery"],
    desc: "End-to-end 5kW hybrid solar setup with battery backup and grid integration.",
  },
  {
    title: "Hybrid Inverter Setup",
    cat: "Solar",
    img: solarImg,
    tags: ["Hybrid", "Inverter"],
    desc: "Configured hybrid inverter with smart switching between grid, solar, and battery.",
  },
  {
    title: "Hospital Management System",
    cat: "Software",
    img: softwareImg,
    tags: ["MERN", "React", "Node.js", "MongoDB"],
    desc: "Full-stack hospital management system with patient records, appointments, and billing.",
  },
  {
    title: "Personal Portfolio Website",
    cat: "Software",
    img: softwareImg,
    tags: ["React", "Tailwind", "Framer Motion"],
    desc: "This very portfolio — designed and built from scratch with modern web stack.",
  },
];

const SERVICES = [
  { icon: Cog, title: "Mechanical Maintenance", desc: "Industrial machinery diagnostics, repair, and preventive maintenance." },
  { icon: Zap, title: "Electrical Installation", desc: "Residential and commercial wiring, panels, and safety compliance." },
  { icon: Sun, title: "Solar System Installation", desc: "End-to-end solar, inverter, and battery system installation." },
  { icon: Globe, title: "Web Development", desc: "Modern MERN-stack websites and web applications." },
  { icon: Wrench, title: "CNC Machining Support", desc: "Setup, operation, and troubleshooting of CNC milling machines." },
  { icon: ShieldCheck, title: "Technical Consultation", desc: "Cross-domain consulting across engineering and software." },
];

const STATS = [
  { value: 4, suffix: "+", label: "Professional Domains" },
  { value: 20, suffix: "+", label: "Technical Skills" },
  { value: 7, suffix: "th", label: "Semester BSCS" },
  { value: 100, suffix: "%", label: "Dedication" },
];

const CERTIFICATIONS = [
  "DAE Mechanical Technology",
  "Apprenticeship Certificate — AMF PAC Kamra",
  "Electrical Installation Experience",
  "Solar System Installation Experience",
  "Future Professional Certifications",
];

/* ---------------- Hooks & helpers ---------------- */

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as "light" | "dark" | null;
    const initial = stored ?? "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };
  return { theme, toggle };
}

function TypingText({ words, className }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(word.slice(0, text.length + 1));
          if (text.length + 1 === word.length) setTimeout(() => setDeleting(true), 1400);
        } else {
          setText(word.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setDeleting(false);
            setI((v) => v + 1);
          }
        }
      },
      deleting ? 40 : 80,
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, i, words]);
  return (
    <span className={className}>
      {text}
      <span className="ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-primary align-middle" />
    </span>
  );
}

function Counter({ to, suffix }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function Section({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative scroll-mt-20 py-20 md:py-28 ${className}`}>
      <div className="container mx-auto max-w-7xl px-4 md:px-6">{children}</div>
    </section>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-12 text-center"
    >
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
        <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
      </div>
      <h2 className="text-3xl font-bold md:text-5xl">
        <span className="gradient-text">{title}</span>
      </h2>
      {sub && <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{sub}</p>}
    </motion.div>
  );
}

/* ---------------- Particles ---------------- */
function Particles() {
  const dots = Array.from({ length: 28 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const size = 2 + Math.random() * 4;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-primary/40"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 4 }}
          />
        );
      })}
    </div>
  );
}

/* ---------------- Main ---------------- */

export default function Portfolio() {
  const { theme, toggle } = useTheme();
  const [navOpen, setNavOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeCat, setActiveCat] = useState<string>("All");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setNavOpen(false);
  };

  const cats = ["All", "Engineering", "Electrical", "Solar", "Software"];
  const filtered = activeCat === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === activeCat);

  const handleContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    if (!name || !email || !message) return toast.error("Please fill out all fields.");
    if (name.length > 100 || email.length > 255 || message.length > 1000)
      return toast.error("Inputs exceed maximum length.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error("Please enter a valid email.");
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
    window.location.href = `mailto:ismkhan1148@gmail.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
    e.currentTarget.reset();
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Toaster richColors position="top-right" />

      {/* scroll progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-[var(--gradient-primary)]"
        style={{ scaleX: progress }}
      />

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="glass-card mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 md:px-6">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]">
              MI
            </span>
            <span className="hidden sm:inline">Muhammad Ismail</span>
          </button>
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
              >
                {n.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/50 transition-colors hover:bg-primary/10"
            >
              {theme === "dark" ? <SunIcon className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setNavOpen((v) => !v)}
              aria-label="Menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/50 lg:hidden"
            >
              {navOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-card mx-auto mt-2 max-w-6xl rounded-2xl p-2 lg:hidden"
            >
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => scrollTo(n.id)}
                  className="block w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium hover:bg-primary/10"
                >
                  {n.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative flex min-h-screen items-center pt-28"
        style={{ background: "var(--gradient-hero)" }}
      >
        <Particles />
        <div className="absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-accent/30 blur-[120px]" />

        <div className="container relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:px-6 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Available for opportunities
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Muhammad <span className="gradient-text">Ismail</span>
            </h1>
            <p className="mt-4 text-lg font-medium text-muted-foreground md:text-xl">
              <TypingText
                words={[
                  "Mechanical Engineer",
                  "Professional Electrician",
                  "Solar System Installer",
                  "Computer Science Student",
                ]}
                className="text-foreground"
              />
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Bridging Mechanical Engineering, Electrical Systems, Solar Energy, and Software Technology to
              build efficient and innovative solutions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="btn-gradient rounded-full px-6">
                <a href="/cv-muhammad-ismail.pdf" download>
                  <Download className="mr-2 h-4 w-4" /> Download CV
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("contact")}
                className="rounded-full border-primary/40 px-6 hover:bg-primary/10"
              >
                <Mail className="mr-2 h-4 w-4" /> Contact Me
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => scrollTo("projects")}
                className="rounded-full px-6 hover:bg-primary/10"
              >
                View Projects <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto"
          >
            <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-[var(--gradient-primary)] opacity-30 blur-3xl" />
            <div className="relative h-72 w-72 overflow-hidden rounded-full border-4 border-primary/30 shadow-[var(--shadow-glow)] md:h-96 md:w-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-12px] rounded-full border-2 border-dashed border-primary/40"
              />
              <picture>
                <source type="image/avif" srcSet={avifSrcSet} sizes="(min-width: 768px) 384px, 288px" />
                <source type="image/webp" srcSet={webpSrcSet} sizes="(min-width: 768px) 384px, 288px" />
                <img
                  src={p800Jpg.url}
                  srcSet={jpgSrcSet}
                  sizes="(min-width: 768px) 384px, 288px"
                  alt="Muhammad Ismail portrait"
                  width={384}
                  height={384}
                  decoding="async"
                  fetchPriority="high"
                  className="h-full w-full object-cover"
                />
              </picture>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about">
        <SectionHead eyebrow="About me" title="A multi-skilled engineering professional" />
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-6"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Cog, label: "Mechanical" },
                { icon: Zap, label: "Electrical" },
                { icon: Sun, label: "Solar Energy" },
                { icon: Code2, label: "Computer Science" },
              ].map((d) => (
                <div
                  key={d.label}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/40 p-5 text-center"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground">
                    <d.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold">{d.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8"
          >
            <p className="text-base leading-relaxed text-foreground/90 md:text-lg">
              I am a multi-skilled engineering professional with expertise in Mechanical Engineering, Electrical
              Installation, Solar Energy Systems, and Computer Science. I hold a Diploma of Associate Engineering
              (DAE) in Mechanical Technology, have professional experience as an Electrician and Solar System
              Installer, and I am currently pursuing BS Computer Science (7th Semester). My strengths include CNC
              machining, industrial maintenance, electrical wiring, solar panel installation, troubleshooting, and
              software development. I am passionate about combining engineering and technology to solve real-world
              problems efficiently.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-card/40 p-4 text-center">
                  <div className="gradient-text text-3xl font-extrabold md:text-4xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-xs font-medium text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" className="bg-secondary/30">
        <SectionHead
          eyebrow="Skills"
          title="Cross-domain expertise"
          sub="Engineering, electrical, solar, and software — built through education, training, and hands-on work."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SKILL_GROUPS.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass-card rounded-3xl p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground">
                  <g.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">{g.title}</h3>
              </div>
              <div className="space-y-3">
                {g.skills.map((s) => (
                  <div key={s.name}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-medium">{s.name}</span>
                      <span className="text-muted-foreground">{s.level}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full bg-[var(--gradient-primary)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* EDUCATION */}
      <Section id="education">
        <SectionHead eyebrow="Education" title="Academic background" />
        <div className="grid gap-6 md:grid-cols-3">
          {EDUCATION.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card group rounded-3xl p-6 transition-transform hover:-translate-y-1"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">{e.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{e.meta}</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                {e.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" className="bg-secondary/30">
        <SectionHead eyebrow="Experience" title="Professional journey" />
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-1/2" />
          <div className="space-y-10">
            {EXPERIENCE.map((x, i) => (
              <motion.div
                key={x.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`relative grid grid-cols-[2rem_1fr] gap-4 md:grid-cols-2 md:gap-12 ${
                  i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className={i % 2 === 0 ? "md:text-right" : ""}>
                  <div className="absolute left-4 top-2 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full bg-[var(--gradient-primary)] shadow-[var(--shadow-glow)] md:left-1/2" />
                  <div className="glass-card rounded-2xl p-5">
                    <div className="text-xs font-semibold uppercase tracking-widest text-primary">{x.period}</div>
                    <h3 className="mt-1 text-lg font-bold">{x.role}</h3>
                    <p className="text-sm text-muted-foreground">{x.org}</p>
                  </div>
                </div>
                <div className="glass-card rounded-2xl p-5">
                  <ul className="space-y-2">
                    {x.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects">
        <SectionHead eyebrow="Projects" title="Selected work" sub="Engineering, electrical, solar and software." />
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                activeCat === c
                  ? "border-transparent bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]"
                  : "border-border bg-card/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="glass-card group overflow-hidden rounded-3xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    width={1024}
                    height={640}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur">
                    {p.cat}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-0.5 text-[11px] font-medium text-primary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </Section>

      {/* SERVICES */}
      <Section id="services" className="bg-secondary/30">
        <SectionHead eyebrow="Services" title="What I offer" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass-card group rounded-3xl p-6 transition-transform hover:-translate-y-1"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground transition-transform group-hover:rotate-6">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CERTIFICATIONS */}
      <Section id="certifications">
        <SectionHead eyebrow="Certifications" title="Credentials & recognition" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-card flex items-center gap-4 rounded-2xl p-5"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground">
                <Award className="h-5 w-5" />
              </div>
              <span className="text-sm font-semibold">{c}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="bg-secondary/30">
        <SectionHead eyebrow="Contact" title="Let's build something together" sub="Available for engineering, electrical, solar and software opportunities." />
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {[
              { icon: Phone, label: "Phone", value: "0304 5143538", href: "tel:+923045143538" },
              { icon: Mail, label: "Email", value: "ismkhan1148@gmail.com", href: "mailto:ismkhan1148@gmail.com" },
              { icon: MapPin, label: "Location", value: "Nowshera Kalan, District Nowshera, Pakistan" },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="glass-card flex items-center gap-4 rounded-2xl p-4 transition-transform hover:-translate-y-0.5"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground">
                  <c.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</div>
                  <div className="truncate text-sm font-medium">{c.value}</div>
                </div>
              </a>
            ))}
            <div className="glass-card overflow-hidden rounded-2xl">
              <iframe
                title="Location map"
                src="https://www.google.com/maps?q=Nowshera+Kalan,+District+Nowshera,+Pakistan&output=embed"
                width="100%"
                height="220"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: MessageCircle, href: "https://wa.me/923045143538", label: "WhatsApp", brand: true },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`grid h-11 w-11 place-items-center rounded-xl border border-border transition-all hover:-translate-y-0.5 hover:bg-primary/10 ${
                    s.brand ? "bg-[var(--gradient-primary)] text-primary-foreground" : "bg-card/40"
                  }`}
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleContact}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card space-y-4 rounded-3xl p-6 md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Name</label>
                <Input name="name" maxLength={100} required placeholder="Your name" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Email</label>
                <Input name="email" type="email" maxLength={255} required placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Subject</label>
              <Input name="subject" maxLength={150} placeholder="Project, role, collaboration…" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Message</label>
              <Textarea name="message" maxLength={1000} required rows={6} placeholder="Tell me about your project…" />
            </div>
            <Button type="submit" size="lg" className="btn-gradient w-full rounded-full">
              <Mail className="mr-2 h-4 w-4" /> Send Message
            </Button>
          </motion.form>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-background/80 py-10">
        <div className="container mx-auto max-w-7xl px-4 text-center md:px-6">
          <div className="flex items-center justify-center gap-2 font-display text-lg font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground">
              MI
            </span>
            Muhammad Ismail
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Muhammad Ismail · Engineering & Technology Portfolio
          </p>
          <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Briefcase className="h-3 w-3" /> Mechanical · Electrical · Solar · Software
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Muhammad Ismail",
            jobTitle: "Mechanical Engineer, Electrician, Solar Installer, Computer Science Student",
            email: "mailto:ismkhan1148@gmail.com",
            telephone: "+92-304-5143538",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Nowshera Kalan",
              addressRegion: "Khyber Pakhtunkhwa",
              addressCountry: "PK",
            },
          }),
        }}
      />
    </div>
  );
}