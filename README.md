# Suowu's Garden

一个会慢慢生长的个人数字花园。基于 Next.js (App Router) + Tailwind CSS 构建,部署在 Cloudflare Pages。

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发
npm run dev
# 访问 http://localhost:3000

# 构建静态站点
npm run build
# 产物在 out/ 目录
```

## 发布新内容

发布内容 = 在 `content/` 目录下新建一个 `.md` 文件,然后 `git push`。无需修改任何组件代码。

### 发一篇思考（长文）

在 `content/thoughts/` 下新建 `.md` 文件：

```markdown
---
title: 文章标题
date: "2025-03-15"
type: long
tags: [标签1, 标签2]
excerpt: 一句话摘要,会显示在列表页
---

正文内容,支持 Markdown 语法。
```

### 发一条短想法

同样在 `content/thoughts/` 下,把 `type` 改为 `short`：

```markdown
---
title: 短想法标题
date: "2025-03-15"
type: short
tags: [随想]
excerpt: 这条短想法的完整内容会直接显示在列表里
---

可选的正文补充。
```

### 添加照片

在 `content/photos/` 下新建 `.md` 文件：

```markdown
---
r2_url: https://你的R2域名/photos/文件名.jpg
tags: [摄影]
date: "2025-03-15"
caption: 照片说明文字
---
```

图片需要先上传到 Cloudflare R2,然后把公开访问 URL 填入 `r2_url`。

### 添加视频

在 `content/videos/` 下新建 `.md` 文件：

```markdown
---
youtube_id: YouTube视频ID
title: 视频标题
tags: [标签]
date: "2025-03-15"
---
```

`youtube_id` 是 YouTube 链接中 `v=` 后面的那串字符,比如 `https://youtube.com/watch?v=dQw4w9WgXcQ` 中的 `dQw4w9WgXcQ`。

### 添加书籍

在 `content/reading/books/` 下新建 `.md` 文件：

```markdown
---
title: 书名
author: 作者
date: "2025-03-15"
rating: 5
tags: [读书]
---

读后感（可选）。
```

### 添加电影

在 `content/reading/movies/` 下新建 `.md` 文件：

```markdown
---
title: 电影名
director: 导演
date: "2025-03-15"
rating: 4
tags: [电影]
---

观后感（可选）。
```

### 更新 Now 页面

直接编辑 `content/now.md`：

```markdown
---
lastUpdated: "2025-03-15"
---

你现在在做什么...
```

### 更新关于页面

直接编辑 `content/about.md`。

## 目录结构

```
content/              ← 所有内容（Markdown）
  thoughts/           ← 思考（长文 + 短想法）
  photos/             ← 照片
  videos/             ← 视频
  reading/books/      ← 书
  reading/movies/     ← 电影
  now.md              ← Now 页面
  about.md            ← 关于页面
src/
  app/                ← 页面路由
  components/         ← 共享组件
  lib/content.ts      ← 内容读取层
public/
  robots.txt          ← 搜索引擎爬虫规则
  sitemap.xml         ← 站点地图（新增文章后需手动更新）
```

## 部署到 Cloudflare Pages

1. 在 Cloudflare Dashboard 创建 Pages 项目,连接 GitHub 仓库
2. 构建设置：
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Node.js version**: 18+
3. 绑定自定义域名 `suowu.org`

每次 `git push` 到 master 分支会自动触发部署。

## 标签系统

标签在各内容的 frontmatter `tags` 字段中定义。首页标签云是硬编码的（在 `src/app/page.tsx` 中），如果新增了标签类别想在首页展示,需要手动添加到那个数组里。

标签聚合页 `/tag/[标签名]` 会自动混合展示所有包含该标签的内容（思考 + 照片 + 视频）。

## 暗黑模式

页脚有切换按钮。会记住用户选择（localStorage），首次访问跟随系统偏好。

## 注意事项

- `sitemap.xml` 是静态文件,新增文章后需要手动更新
- 图片存储在 Cloudflare R2,需要自行上传并获取公开 URL
- `rating` 字段范围 1-5,用星号显示
- 文件名即 slug（URL 路径），建议用英文短横线命名,如 `my-first-post.md`
