# 个人网站作品集

> 🕯️ 烛墨的个人作品集网站 —— 用代码构建有温度的产品

一个用 React + TypeScript + Vite + Tailwind CSS 构建的个人作品集网站，集中展示 AI 网站视觉复刻工程、UI/UX 设计项目与商业接单交付。

🔗 **在线预览**：<https://09zixi.github.io/personal-website-portfolio/>

## ✨ 项目亮点

- **液态玻璃设计语言** —— `backdrop-filter: blur()` + `mask-composite: xor` 制造渐变发光边框
- **滚动驱动动画** —— 视频帧预抽帧 + 滚动百分比驱动帧切换
- **光标聚光灯揭示** —— Canvas 径向渐变 mask + rAF 惯性跟随
- **站内嵌入了 3 个跑通的 AI 网站** —— Bloom / Lithos / Veldara 完整可访问

## 🛠️ 技术栈

- **前端框架**：React 18 + TypeScript 5
- **构建工具**：Vite 5
- **样式方案**：Tailwind CSS 3.4（自定义液态玻璃类）
- **动画方案**：motion 12（原 Framer Motion）+ 自定义 BlurText 组件
- **图标库**：lucide-react
- **视频流**：hls.js（Mux HLS）

## 📂 项目结构

```
portfolio-website/
├── public/
│   ├── projects/              # 站内嵌入的 3 个 AI 网站
│   │   ├── bloom.html         # Bloom（赛博植物学）
│   │   ├── veldara.html       # Veldara（沉浸式落地页）
│   │   └── lithos/            # Lithos（光标聚光灯）
│   │       ├── index.html
│   │       └── assets/
│   ├── thumb-bloom.png        # 作品缩略图
│   ├── thumb-lithos.png
│   └── thumb-flower.png
├── src/
│   ├── App.tsx                # 4 个核心 section
│   │                          # - Navbar（顶部固定）
│   │                          # - Hero（视频背景 + BlurText）
│   │                          # - AIProjects（3 个作品 + 银灰流苏装饰）
│   │                          # - ContactFooter（100vh 居中 CTA）
│   ├── main.tsx
│   └── index.css              # 液态玻璃 + 字体导入
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts             # base: './' 让 build 产物用相对路径
└── tsconfig.json
```

## 🚀 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 5180 端口）
npm run dev

# 生产构建
npm run build

# 预览生产产物
npm run preview
```

## 📦 部署

### GitHub Pages 部署步骤

1. **构建产物**：`npm run build` 生成 `dist/` 目录
2. **推送 dist 内容**到 `gh-pages` 分支（或配置 GitHub Actions 自动部署）
3. **GitHub 仓库设置**：Settings → Pages → Source 选 `gh-pages` / `root`
4. **等待 1-2 分钟**即可通过 `https://<username>.github.io/<repo-name>/` 访问

> **关键配置**：`vite.config.ts` 中 `base: './'` 让 build 产物用相对路径，能在 GitHub Pages 子路径下正确加载资源。

## 🎨 设计参考

3 个核心作品的视觉还原参考了 [xuanxuan321/xuanxuan-prompts](https://github.com/xuanxuan321/xuanxuan-prompts) 仓库的 4 个 AI 复刻 prompt。

## 📝 License

MIT
