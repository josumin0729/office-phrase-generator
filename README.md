
# 직장인 문구 생성기 💼💕

> 오늘도 출근한 당신을 위한 **현실 공감 vs 귀여운 막내** 문구 400개

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://josumin0729.github.io/office-phrase-generator/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

<br>

## 🎯 프로젝트 소개

직장인이라면 누구나 공감할 현실 푸념부터, 막내의 귀여운 애교까지!
랜덤으로 뽑는 **400개의 직장인 문구 생성기**입니다.

### ✨ 주요 기능

- 🏢 **직장인 현실 공감** - 회의, 야근, 월요병... 찐 공감 문구
- 💖 **귀여운 막내 애교** - 선배~커피 사주세요 ㅎㅎ
- 📸 **이미지 저장** - 문구 카드를 이미지로 다운로드
- 📤 **간편한 공유** - 카톡, SNS 공유 기능
- 📊 **A/B 테스트** - GA4를 통한 카테고리별 데이터 분석

<br>

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Analytics**: Google Analytics 4, Meta Pixel
- **Deployment**: GitHub Pages
- **Tools**: html2canvas (이미지 저장)

<br>

## 📂 프로젝트 구조

```
office-phrase-generator/
├── index.html          # 메인 페이지
├── app.js              # 메인 로직 & GA4 이벤트 추적
├── style.css           # 스타일시트
├── data/
│   ├── workplace.json  # 직장인 문구 데이터 (200개)
│   └── maknae.json     # 막내 문구 데이터 (200개)
└── README.md
```

<br>

## 📊 데이터 분석

### GA4 이벤트 추적

| 이벤트 | 설명 |
|--------|------|
| `phrase_generated_office` | 직장인 문구 생성 |
| `phrase_generated_maknae` | 막내 문구 생성 |
| `image_downloaded_office` | 직장인 이미지 저장 |
| `image_downloaded_maknae` | 막내 이미지 저장 |
| `shared_office` | 직장인 문구 공유 |
| `shared_maknae` | 막내 문구 공유 |
| `feedback_opened` | 피드백 폼 열람 |

### 주요 분석 지표
- 📈 카테고리별 클릭률 (직장인 vs 막내)
- 💾 전환율 (생성 → 저장)
- 📤 공유율 (바이럴 가능성)

<br>

## 🚀 로컬 실행 방법

```bash
# 1. 저장소 클론
git clone https://github.com/josumin0729/office-phrase-generator.git

# 2. 디렉토리 이동
cd office-phrase-generator

# 3. 로컬 서버 실행 (Python)
python -m http.server 8000

# 4. 브라우저에서 접속
# http://localhost:8000
```

<br>

## 📱 사용 방법

1. **카테고리 선택** - 직장인 또는 막내 버튼 클릭
2. **문구 확인** - 랜덤으로 생성된 문구 확인
3. **저장 & 공유** - 마음에 드는 문구를 이미지로 저장하거나 공유

<br>

## 📈 마케팅 캠페인

### Meta 광고 (Instagram)
- **기간**: 2025.02.11 ~ 02.14 (4일)
- **예산**: 일 25,000원
- **타겟**: 25~40세 직장인
- **소재**: A/B/C 테스트 (3종)

### 성과 목표
- 페이지 유입: 150~500명
- 이미지 저장 전환율: 20~30%
- 공유율: 10~15%

<br>

## 🔧 개선 계획

### 1차 캠페인 후 개선사항
- [ ] 데이터 분석 기반 타겟팅 최적화
- [ ] 인기 문구 TOP 10 기능
- [ ] 카테고리 추가 (팀장, 인턴 등)
- [ ] 다크모드 지원

### 2차 캠페인
- [ ] 1차 데이터 기반 광고 소재 개선
- [ ] 예산 스케일업 테스트
- [ ] 리타겟팅 캠페인

<br>

## 💬 피드백

개선 아이디어나 추가하고 싶은 문구가 있으신가요?

👉 [피드백 남기기](https://docs.google.com/forms/d/e/1FAIpQLSdtndkAyHAOxu8W3596eG4YEr4GFajUZuvhyv2q_2FsJ-OBRg/viewform)

<br>

## 📄 라이선스

MIT License - 자유롭게 사용 및 수정 가능합니다.

<br>

## 👤 제작자

**조수민**
- GitHub: [@josumin0729](https://github.com/josumin0729)
- Linkedin : https://www.linkedin.com/in/jsm0729
- 포트폴리오: 그로스 마케터 / PM 준비 중

<br>

## 🙏 감사의 말

이 프로젝트는 Claude (Anthropic)의 도움으로 제작되었습니다.

---

<div align="center">

**Made with 💚 for 직장인**

[🔗 Live Demo](https://josumin0729.github.io/office-phrase-generator/) | [📝 Feedback](https://docs.google.com/forms/d/e/1FAIpQLSdtndkAyHAOxu8W3596eG4YEr4GFajUZuvhyv2q_2FsJ-OBRg/viewform)

</div>


