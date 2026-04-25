# GitHub Pages 개발자 포트폴리오

정적 HTML/CSS/JavaScript로 구성한 원페이지 개발자 포트폴리오입니다. 빌드 도구 없이 바로 GitHub Pages에 배포할 수 있고, 실제 내용 수정은 `content.js` 중심으로 관리할 수 있게 구성했습니다.

## 파일 구조

```text
.
|-- assets/
|   `-- hero-grid.svg
|-- content.js
|-- index.html
|-- script.js
`-- styles.css
```

## 커스터마이징

실제 포트폴리오 내용은 `content.js`에서 수정합니다.

- `profile`: 이름, 소개 문구, CTA 버튼
- `skills`: 기술 카테고리와 태그
- `projects`: 프로젝트 제목, 설명, 역할, 기술, 결과, 링크
- `contacts`: 메일, GitHub, 노션, 링크드인 등 연락 채널

상대 경로만 사용하고 있어 저장소 이름이 바뀌어도 GitHub Pages 프로젝트 페이지에서 그대로 동작합니다.

## 로컬 확인

브라우저에서 `index.html`을 직접 열어도 기본 구조를 확인할 수 있습니다. 더 안정적으로 확인하려면 간단한 정적 서버로 실행하는 편이 좋습니다.

예시:

```powershell
python -m http.server 8000
```

그다음 브라우저에서 `http://localhost:8000`으로 접속합니다.

## GitHub Pages 배포

1. GitHub에 새 저장소를 만듭니다.
2. 이 폴더를 `main` 브랜치 기준으로 push 합니다.
3. GitHub 저장소의 `Settings > Pages`로 이동합니다.
4. `Build and deployment`에서 `Deploy from a branch`를 선택합니다.
5. Branch를 `main`, 폴더를 `/ (root)`로 설정하고 저장합니다.
6. 배포가 완료되면 `https://username.github.io/repository-name/` 또는 사용자 사이트 주소에서 확인합니다.

## 후속 확장 아이디어

- 실제 프로젝트별 상세 페이지 추가
- 이력서 PDF 다운로드 버튼 연결
- 커스텀 도메인 연결
- 블로그 또는 회고 아카이브 섹션 확장
