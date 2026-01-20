---
title: Vibe 시작하기
date: 2025-01-10
tags:
  - intro
  - vibe
excerpt: 더 가벼운 블로그 워크플로우를 위한 첫 인사와 방향성.
---

환영합니다. 이 블로그는 Markdown과 React로 구성된 정적 사이트입니다. 작성 흐름은 단순합니다.

- `/src/content/YYYY/slug.md` 파일을 하나 추가합니다.
- Frontmatter에 `title`, `date`, `tags`, `excerpt`, `cover`를 적어둡니다.
- 커밋 후 GitHub Pages로 배포하면 끝입니다.

콘텐츠는 빌드 시 매니페스트, RSS, 사이트맵으로 변환됩니다. 라이트/다크 모드를 지원하며, 모바일에서도 읽기 쉽도록 설계했습니다.

```bash
npm run content
npm run build
```

이후 `dist`를 GitHub Pages에 올리면 게시글이 반영됩니다. 앞으로 올라올 글들을 기대해 주세요!
