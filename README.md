# office-phrase-generator
직장인 문구 생성기

# 직장인 문구 생성기 📊

GitHub Pages: `https://yourusername.github.io/repo-name`

## 설정 필요사항

1. **GA4 설정**
   - index.html의 `G-XXXXXXXXXX`를 실제 GA4 ID로 변경

2. **피드백 폼**
   - Google Form 생성 후 app.js의 formUrl 및 entryId 변경
   - 또는 EmailJS 등 다른 서비스 사용

3. **JSON 데이터**
   - data/workplace.json
   - data/maknae.json
   - 실제 900개 데이터로 교체

## 배포
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

GitHub Settings > Pages > Source: main branch
