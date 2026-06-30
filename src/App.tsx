import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import Hls from 'hls.js'
import { ArrowUpRight, Play, Mail, Github } from 'lucide-react'

// ===== Asset URLs =====
// 视频背景沿用 Liquid Glass Agency 素材（可后续替换为自录项目视频）
const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4'
const CTA_VIDEO = 'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8'

// 3 个 AI 网站的首页截图（来自 preview 目录）
const FLOWER_THUMB = './thumb-flower.png'
const BLOOM_THUMB = './thumb-bloom.png'
const LITHOS_THUMB = './thumb-lithos.png'

// ===== BlurText Component =====
function BlurText({ text, className, delay = 200 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const words = text.split(' ')

  return (
    <h1 ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={isInView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
          transition={{
            delay: (i * delay) / 1000,
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1]
          }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  )
}

// ===== HLS Video Component =====
function HLSVideo({ src, className, style }: { src: string; className?: string; style?: React.CSSProperties }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  if (typeof window !== 'undefined' && videoRef.current) {
    const video = videoRef.current
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
    }
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className={className}
      style={style}
    />
  )
}

// ===== Navbar =====
function Navbar() {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-3">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xl font-body">
          烛
        </div>
      </div>
      <div className="hidden md:flex liquid-glass rounded-full px-1.5 py-1 items-center gap-1">
        <button className="px-3 py-2 text-sm font-medium text-white">首页</button>
        <button className="px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 rounded-full transition-colors">作品</button>
        <button className="px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 rounded-full transition-colors">关于</button>
        <a href="#contact" className="bg-white text-black rounded-full px-3.5 py-1.5 text-sm font-medium flex items-center gap-1 ml-1">
          联系我 <ArrowUpRight size={14} />
        </a>
      </div>
    </nav>
  )
}

// ===== Hero =====
function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ height: '100vh', minHeight: '720px' }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute left-0 w-full h-full object-cover z-0"
        src={HERO_VIDEO}
      />
      <div className="absolute inset-0 bg-black/30 z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-[280px] bg-gradient-to-b from-transparent to-black z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-b from-transparent to-black z-[1] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-end text-center px-6 pb-10" style={{ paddingTop: '120px', height: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="liquid-glass rounded-full px-1 py-1 flex items-center gap-2 mb-5 whitespace-nowrap"
        >
          <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold">应届毕业生</span>
          <span className="text-sm text-white px-2">Python · 前端 · AI 工程化</span>
        </motion.div>

        <BlurText
          text="用代码构建有温度的产品"
          className="text-3xl md:text-5xl lg:text-[3.5rem] font-heading text-white leading-[1.1] max-w-5xl tracking-tight whitespace-nowrap"
        />

        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex items-center gap-4 mt-6 mb-6"
        >
          <a href="#projects" className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium flex items-center gap-2 text-white">
            看作品 <ArrowUpRight size={16} />
          </a>
          <a href="#contact" className="text-base font-medium flex items-center gap-2 text-white">
            <Play size={16} fill="currentColor" /> 联系我
          </a>
        </motion.div>

        <div className="w-full">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {['Python', 'React', 'TypeScript', 'Tailwind', 'Git'].map((name) => (
              <span key={name} className="text-base md:text-xl font-heading italic text-white">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== AI Projects =====
function AIProjects() {
  const projects = [
    {
      name: 'Bloom · 赛博植物学',
      tag: '单文件 HTML · 滚动驱动',
      desc: '3 段视频预抽帧缓存 + 玻璃拟态主卡片 + 3 段超大 serif 使命宣言 + 紫色订阅表单。一次跑通。',
      thumb: BLOOM_THUMB,
      href: './projects/bloom.html'
    },
    {
      name: 'Lithos · 光标聚光灯',
      tag: 'React + TS + Vite + Tailwind',
      desc: 'Canvas 径向渐变 + toDataURL 转 mask 揭示第二张图，rAF lerp 平滑跟随，移动端汉堡响应式。',
      thumb: LITHOS_THUMB,
      href: './projects/lithos/index.html'
    },
    {
      name: 'Veldara · 沉浸式落地页',
      tag: '单文件 HTML · 滚动驱动',
      desc: '1 段花朵视频帧 + 漂浮粒子 + 横向 mask 擦除卡片 + 末段 IntersectionObserver 揭幕。',
      thumb: FLOWER_THUMB,
      href: './projects/veldara.html'
    }
  ]

  return (
    <section id="projects" className="relative py-24 md:py-32 px-6 bg-black overflow-hidden">
      {/* 暗淡银灰色流苏装饰背景（中间值） */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* 大块径向光晕 - 暖灰 */}
        <div
          className="absolute -top-1/4 -left-1/4 w-[80%] h-[80%] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(190,190,210,0.55) 0%, rgba(140,140,160,0.25) 35%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[70%] h-[70%] rounded-full opacity-35"
          style={{
            background: 'radial-gradient(circle, rgba(210,210,230,0.5) 0%, rgba(160,160,180,0.22) 35%, transparent 70%)',
            filter: 'blur(70px)'
          }}
        />
        {/* 流苏条带 - 从顶部垂下来 */}
        <div
          className="absolute top-0 left-[10%] w-px h-full opacity-55"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(210,210,230,0.75), transparent)' }}
        />
        <div
          className="absolute top-0 left-[28%] w-px h-full opacity-45"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(190,190,210,0.68), transparent)' }}
        />
        <div
          className="absolute top-0 right-[20%] w-px h-full opacity-50"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(210,210,230,0.72), transparent)' }}
        />
        <div
          className="absolute top-0 right-[8%] w-px h-full opacity-40"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(190,190,210,0.65), transparent)' }}
        />
        {/* 横向流苏 */}
        <div
          className="absolute top-[30%] left-0 w-full h-px opacity-45"
          style={{ background: 'linear-gradient(to right, transparent, rgba(210,210,230,0.6), transparent)' }}
        />
        <div
          className="absolute bottom-[20%] left-0 w-full h-px opacity-40"
          style={{ background: 'linear-gradient(to right, transparent, rgba(190,190,210,0.55), transparent)' }}
        />
        {/* 微小颗粒装饰 */}
        <div className="absolute top-[15%] left-[40%] w-1 h-1 rounded-full bg-slate-200/45 shadow-[0_0_6px_rgba(220,220,240,0.3)]" />
        <div className="absolute top-[60%] left-[70%] w-1 h-1 rounded-full bg-slate-100/50 shadow-[0_0_6px_rgba(220,220,240,0.4)]" />
        <div className="absolute top-[80%] left-[25%] w-1 h-1 rounded-full bg-slate-200/40 shadow-[0_0_6px_rgba(220,220,240,0.25)]" />
        <div className="absolute top-[40%] right-[35%] w-1 h-1 rounded-full bg-slate-100/45 shadow-[0_0_6px_rgba(220,220,240,0.35)]" />
        <div className="absolute top-[25%] right-[15%] w-1 h-1 rounded-full bg-slate-200/42 shadow-[0_0_6px_rgba(220,220,240,0.3)]" />
        <div className="absolute top-[70%] left-[55%] w-1 h-1 rounded-full bg-slate-100/45 shadow-[0_0_6px_rgba(220,220,240,0.35)]" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <BlurText
            text="我是烛墨，一个喜欢折腾的设计师。"
            className="text-2xl md:text-3xl lg:text-4xl font-heading text-white tracking-tight leading-[1.2] mb-6 max-w-3xl mx-auto"
          />
          <p className="text-white font-body font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            目前主要专注在网站设计、UI/UX 设计上，自我定位方向是 UI Engineer，在这里了解我的部分作品。
          </p>
          <p className="text-white/70 font-body font-light text-sm mt-4 italic">
            开始探索....
          </p>
        </div>

        <div className="space-y-8 md:space-y-10">
          {projects.map((p, idx) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 group`}
            >
              <div className="flex-1 liquid-glass rounded-2xl overflow-hidden aspect-video w-full">
                <img
                  src={p.thumb}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1">
                <div className="liquid-glass rounded-full px-3 py-1 inline-block mb-3">
                  <span className="text-xs font-medium text-white">{p.tag}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-heading text-white mb-3 group-hover:text-white/90 transition-colors">
                  {p.name}
                </h3>
                <p className="text-white font-body font-light text-base leading-relaxed">
                  {p.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-white text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                  查看作品 <ArrowUpRight size={14} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
      {/* 渐变蒙版：让 AI Projects 段底部的暗银流苏自然过渡到 ContactFooter 顶部 */}
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-b from-transparent to-black pointer-events-none z-[1]" />
    </section>
  )
}

// ===== ContactFooter =====
function ContactFooter() {
  return (
    <section id="contact" className="relative w-full bg-black overflow-hidden flex items-center justify-center" style={{ minHeight: '100vh' }}>
      {/* 顶部渐变蒙版：让 AI Projects 段底部过渡进来 */}
      <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-transparent to-black pointer-events-none z-[1]" />
      {/* 暗银流苏装饰，跟 AI Projects 段呼应 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(190,190,210,0.5) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
        <div
          className="absolute top-0 left-[15%] w-px h-full opacity-30"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(200,200,220,0.5), transparent)' }}
        />
        <div
          className="absolute top-0 right-[25%] w-px h-full opacity-25"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(190,190,210,0.45), transparent)' }}
        />
        <div
          className="absolute top-[20%] left-0 w-full h-px opacity-20"
          style={{ background: 'linear-gradient(to right, transparent, rgba(200,200,220,0.4), transparent)' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <BlurText
          text="一起做点有意思的事"
          className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white leading-[0.85] mb-6"
        />
        <p className="text-white font-body font-light text-base md:text-lg max-w-xl mb-10 leading-relaxed">
          闲鱼接单、应届求职、技术合作都欢迎。把你的需求告诉我，我们一起把它变成产品。
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="mailto:placeholder@example.com" className="liquid-glass-strong rounded-full px-6 py-3 text-base font-medium flex items-center gap-2 text-white">
            <Mail size={16} /> 发邮件
          </a>
          <a href="#" className="bg-white text-black rounded-full px-6 py-3 text-base font-medium flex items-center gap-2">
            <Github size={16} /> GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

// ===== App =====
export default function App() {
  return (
    <div className="bg-black">
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <div className="bg-black">
          <AIProjects />
          <ContactFooter />
        </div>
      </div>
    </div>
  )
}
