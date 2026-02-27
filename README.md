# 직장인 문구 생성기 💼

> AI 기반 콘텐츠 생성 + A/B테스트 실험 프로젝트

[![Live Demo](https://img.shields.io/badge/🌐_Live-Demo-4A90E2?style=for-the-badge)](https://josumin0729.github.io/office-phrase-generator/)
[![Blog Series](https://img.shields.io/badge/📝_Velog-Series-20C997?style=for-the-badge)](https://velog.io/@josumin0729)

<br>

## 📌 프로젝트 개요

직장인 타겟 콘텐츠 서비스를 **기획-개발-광고집행-분석**까지 경험한 사이드 프로젝트입니다.

Claude AI로 400개 문구를 생성하고, 실제 광고비 18만원을 집행해 데이터를 수집했습니다.

<br>

## 🎯 핵심 목표

**"공감형 vs 응원형, 직장인에게 어떤 톤이 더 효과적일까?"**

- A안 (직장인 공감): "회의가 회의를 낳는다" - 현실 푸념형
- B안 (막내 응원): "오늘도 화이팅!" - 긍정 격려형

→ Meta 광고 A/B 테스트로 검증

<br>

## ✨ 주요 기능

- 🏢 **카테고리별 문구 생성** - 직장인 공감 200개 / 막내 응원 200개
- 📸 **이미지 저장** - html2canvas로 문구 카드 다운로드
- 📤 **간편 공유** - 카톡, SNS 공유 기능
- 📊 **데이터 트래킹** - Amplitude, Meta Pixel 연동

<br>

## 📊 마케팅 성과

### Meta 광고 캠페인 (Instagram)
- **기간**: 2025.02.23 ~ 02.27 (5일)
- **예산**: 총 182,800원 (A안 73800원 / B안 109000원)
- **타겟**: 22~38세 직장인

### 주요 지표

| 지표 | A안 (공감형) | B안 (응원형) |
|------|-------------|-------------|
| **노출수** | 46,194 | 54,555 |
| **CTR** | **1.95%** ⬆️ | 1.65% |
| **LPV** | 334원 | 319원 |
| **랜딩 수** | 255 | 308 |

**인사이트**: A안(공감형)이 **CTR 18% 더 높음** → 직장인 타겟엔 공감/푸념 콘텐츠가 더 효과적


<br>

## 🛠️ 기술 스택

| 영역 | 기술 |
|------|------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **AI Content** | Claude 3.5 Sonnet |
| **Analytics** | GA4, Amplitude, Meta Pixel |
| **Deployment** | GitHub Pages |
| **Tools** | html2canvas |

<br>

## 📂 프로젝트 구조
```
office-phrase-generator/
├── index.html          # 메인 랜딩 페이지
├── app.js              # 이벤트 트래킹 + 문구 생성 로직
├── style.css           # 스타일시트
├── data/
│   ├── workplace.json  # 직장인 공감 문구 200개
│   └── maknae.json     # 막내 응원 문구 200개
└── README.md
```

<br>

## 📈 데이터 트래킹 설계

### Amplitude 이벤트

| 이벤트 | 설명 |
|--------|------|
| `page_viewed` | 랜딩 페이지 진입 |
| `cta_clicked` | 카테고리 버튼 클릭 |
| `result_viewed` | 문구 생성 결과 조회 |
| `result_saved` / `result_shared` | 저장 또는 공유 액션 |

### UTM 파라미터
```
utm_source=meta
utm_medium=paid_social
utm_campaign=office-phrase-generator
utm_content=workplace (A안) / maknae (B안)
```

<br>

## 🚀 로컬 실행 방법
```bash
# 1. 저장소 클론
git clone https://github.com/josumin0729/office-phrase-generator.git

# 2. 디렉토리 이동
cd office-phrase-generator

# 3. 로컬 서버 실행
python -m http.server 8000

# 4. 브라우저 접속
open http://localhost:8000
```

<br>

## 💡 배운 점

- Meta Ads A/B 테스트 설계 및 소재별 성과 분석
- Amplitude 트래킹 구현 경험
- 예산 대비 데이터 수집 가능성 판단 (ROI 분석)

<br>

## 🔧 향후 개선 계획

### 2차 캠페인
- [ ] A안(공감형) 집중 투자 - 1차 데이터 기반
- [ ] 저장/공유 전환율 개선 (UI 테스트)
- [ ] 리타겟팅 캠페인 설계

### 기능 추가
- [ ] 인기 문구 TOP 10 (데이터 기반)
- [ ] 카테고리 확장 (팀장, 인턴 등)
- [ ] 다크모드 지원

<br>

## 📱 사용 방법

1. 카테고리 선택 (직장인 공감 / 막내 응원)
2. 랜덤 문구 확인
3. 마음에 드는 문구 저장 또는 공유

<br>

## 📂 관련 링크

- 🌐 **Live Demo**: [직장인 문구 생성기](https://josumin0729.github.io/office-phrase-generator/)
- 📝 **노션 포트폴리오**: (https://pmjsm.notion.site/0729portfolio) - 전체 프로세스 문서화
- 💬 **피드백**: [Google Form](https://docs.google.com/forms/d/e/1FAIpQLSdtndkAyHAOxu8W3596eG4YEr4GFajUZuvhyv2q_2FsJ-OBRg/viewform)

<br>

## 👤 제작자

**조수민**
- GitHub: [@josumin0729](https://github.com/josumin0729)
- LinkedIn: https://www.linkedin.com/in/jsm0729
- 노션: https://pmjsm.notion.site/0729portfolio
<br>

## 📄 License

MIT License - 자유롭게 사용 및 수정 가능합니다.

<br>

---

<div align="center">

**💚 Made with Claude AI**

이 프로젝트가 도움이 되셨다면 ⭐️ Star를 눌러주세요!

</div>
