import { ChatPanel } from "@/components/chat/ChatPanel";
import { BoltIcon, PaintBrushIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const featureSquares = [
  {
    title: "استراتيجية محتوى شاملة",
    description:
      "خطط إطلاق، جداول محتوى، وCTA قوية مصممة خصيصاً للجمهور والمنصات المستهدفة.",
    icon: BoltIcon
  },
  {
    title: "تصميم لوجوهات وهوية كاملة",
    description:
      "بناء شخصية العلامة من الشعار إلى دليل الهوية، مع تطبيقات جاهزة لكل اللمسات.",
    icon: PaintBrushIcon
  },
  {
    title: "تصوّر فيديو احترافي",
    description:
      "سكريبت، ستوري بورد، عناصر موشن، وقوالب ريلز جذابة قابلة للتنفيذ فوراً.",
    icon: VideoCameraIcon
  }
];

export default function HomePage() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-16 px-6 py-16 lg:px-12">
      <section className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-white/60">
            Aura — Creative Agent
          </span>
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            منصة ذكية تبني لك محتوى السوشيال، اللوجوهات، الهوية، والفيديوهات خلال دقائق.
          </h1>
          <p className="text-lg leading-8 text-slate-200">
            Aura هي شريكتك الإبداعية المدعومة بالذكاء الاصطناعي. صممت خصيصاً لمصممات السوشيال
            ومالكات المشاريع لتوليد أفكار متكاملة، مخرجات جاهزة، ونقاش مباشر بالعربية.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-200">
            <div className="rounded-3xl border border-primary-500/60 bg-primary-500/10 px-4 py-3 text-primary-100">
              توليد ستايل بورد + خطة محتوى + شعار خلال جلسة واحدة.
            </div>
            <Link
              href="#chat"
              className="gradient-border rounded-full px-[1px] py-[1px] text-white transition hover:opacity-80"
            >
              <span className="block rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white">
                ابدئي الجلسة الآن
              </span>
            </Link>
          </div>
          <dl className="grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <dt className="text-xs uppercase tracking-[0.2em] text-white/60">حملات جاهزة</dt>
              <dd className="mt-2 text-2xl font-semibold text-white">+150 قالب</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <dt className="text-xs uppercase tracking-[0.2em] text-white/60">ستايلات لوجو</dt>
              <dd className="mt-2 text-2xl font-semibold text-white">12 اتجاه مميز</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <dt className="text-xs uppercase tracking-[0.2em] text-white/60">تصورات فيديو</dt>
              <dd className="mt-2 text-2xl font-semibold text-white">موشن + ستوري بورد</dd>
            </div>
          </dl>
        </div>
        <div className="glass gradient-border hidden flex-col justify-between rounded-[32px] border border-white/5 p-6 text-white lg:flex">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">LIVE WORKFLOW</p>
            <h2 className="text-2xl font-semibold">جلسة كاملة في ٣ مراحل</h2>
            <ul className="space-y-4 text-sm text-slate-200">
              <li className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
                1. تحليل العلامة والجمهور لاستخلاص نبرة الصوت.
              </li>
              <li className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
                2. إنشاء Moodboard مكوّن من ألوان، خطوط، ومرجع بصري.
              </li>
              <li className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
                3. تسليم مخرجات قابلة للتنفيذ: حملة، لوجو، فيديو، أو هوية كاملة.
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-primary-500/40 bg-primary-500/10 px-4 py-4 text-sm text-primary-100">
            نظام ذكاء اصطناعي يدعم العربية بالكامل ويترجم متطلباتك إلى خطوات عملية.
          </div>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featureSquares.map((feature) => (
          <div
            key={feature.title}
            className="glass gradient-border rounded-[28px] border border-white/10 p-6 text-white"
          >
            <feature.icon className="h-10 w-10 text-accent" />
            <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm text-slate-200">{feature.description}</p>
            <div className="mt-4 text-xs uppercase tracking-[0.3em] text-white/40">
              جاهز للتحميل والتخصيص
            </div>
          </div>
        ))}
      </section>

      <section id="chat">
        <ChatPanel />
      </section>
    </main>
  );
}
