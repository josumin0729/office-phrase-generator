// GA4 + Amplitude 이벤트 트래킹
function trackEvent(eventName, eventParams = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventParams);
    }
    if (typeof amplitude !== 'undefined') {
        amplitude.track(eventName, eventParams);
    }
}

// UTM 파라미터 추출
function getUtmParams() {
    const params = new URLSearchParams(window.location.search);
    const utm = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(key => {
        const val = params.get(key);
        if (val) utm[key] = val;
    });
    return utm;
}

// 전역 변수
let currentType = null;
let currentPhrase = null;
let workplaceData = null;
let maknaeData = null;
let utmParams = {};

// JSON 데이터 로드
async function loadData() {
    try {
        const [workRes, maknaeRes] = await Promise.all([
            fetch('./data/workplace.json'),
            fetch('./data/maknae.json')
        ]);
        
        workplaceData = await workRes.json();
        maknaeData = await maknaeRes.json();
        
        console.log('데이터 로드 완료');
    } catch (error) {
        console.error('데이터 로드 실패:', error);
        alert('데이터를 불러오는데 실패했습니다. 페이지를 새로고침 해주세요.');
    }
}

// 랜덤 문구 가져오기
function getRandomPhrase(data) {
    const allPhrases = [];
    
    data.sections.forEach(section => {
        section.items.forEach(item => {
            allPhrases.push({
                text: item,
                emoji: section.emoji,
                category: section.title
            });
        });
    });
    
    const randomIndex = Math.floor(Math.random() * allPhrases.length);
    return allPhrases[randomIndex];
}

// 카드 표시
function showCard(type) {
    currentType = type;
    const data = type === 'workplace' ? workplaceData : maknaeData;
    currentPhrase = getRandomPhrase(data);
    
    const cardText = document.getElementById('cardText');
    const phraseCard = document.getElementById('phraseCard');
    
    cardText.textContent = currentPhrase.text;
    
    if (type === 'workplace') {
        phraseCard.className = 'phrase-card type-workplace';
    } else {
        phraseCard.className = 'phrase-card type-maknae';
    }
    
    const cardSection = document.getElementById('cardSection');
    cardSection.style.display = 'block';
    
    setTimeout(() => {
        cardSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 100);
    
    // 퍼널 3단계: 결과 보기
    trackEvent('result_viewed', {
        phrase_type: type,
        category: currentPhrase.category,
        ...utmParams
    });
}

// 이미지 다운로드
async function downloadImage() {
    try {
        const card = document.getElementById('phraseCard');
        const canvas = await html2canvas(card, {
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false
        });
        
        const link = document.createElement('a');
        const timestamp = Date.now();
        link.download = '직장인문구_' + timestamp + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        // 퍼널 4단계: 저장
        trackEvent('saved', {
            phrase_type: currentType,
            ...utmParams
        });
        
        showToast('이미지가 저장되었습니다!');
    } catch (error) {
        console.error('이미지 저장 실패:', error);
        alert('이미지 저장에 실패했습니다.');
    }
}

// 공유하기
async function shareContent() {
    if (!currentPhrase) {
        alert('먼저 문구를 뽑아주세요!');
        return;
    }
    
    const text = currentPhrase.text;
    const shareData = {
        title: '직장인 문구 생성기',
        text: text + '\n\n',
        url: window.location.href
    };
    
    try {
        if (navigator.share) {
            await navigator.share(shareData);
            // 퍼널 4단계: 공유
            trackEvent('shared', {
                method: 'native',
                phrase_type: currentType,
                ...utmParams
            });
            showToast('공유했습니다!');
        } else {
            const copyText = text + '\n\n' + window.location.href;
            await navigator.clipboard.writeText(copyText);
            // 퍼널 4단계: 공유 (클립보드)
            trackEvent('shared', {
                method: 'clipboard',
                phrase_type: currentType,
                ...utmParams
            });
            showToast('링크가 복사되었습니다!');
        }
    } catch (error) {
        console.error('공유 실패:', error);
    }
}

// 토스트 메시지
function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) {
        existing.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = 'position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: white; padding: 12px 24px; border-radius: 100px; font-size: 14px; z-index: 9999;';
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    loadData();

    // UTM 캡처 + 퍼널 1단계: 페이지 진입
    utmParams = getUtmParams();
    trackEvent('page_viewed', { page: 'landing', ...utmParams });

    // 직장인 버튼
    document.getElementById('btnWorkplace').addEventListener('click', () => {
        // 퍼널 2단계: CTA 클릭
        trackEvent('cta_clicked', { phrase_type: 'workplace', ...utmParams });
        showCard('workplace');
    });

    // 막내 버튼
    document.getElementById('btnMaknae').addEventListener('click', () => {
        // 퍼널 2단계: CTA 클릭
        trackEvent('cta_clicked', { phrase_type: 'maknae', ...utmParams });
        showCard('maknae');
    });
    
   // 새로고침 버튼
    document.getElementById('btnRefresh').addEventListener('click', () => {
        if (currentType) {
            // 다시 뽑기 이벤트 트래킹
            trackEvent('phrase_refreshed', {
                phrase_type: currentType,
                ...utmParams
            });
            showCard(currentType);
        }
    });
    
    // 다운로드 버튼
    document.getElementById('btnDownload').addEventListener('click', downloadImage);
    
    // 공유 버튼
    document.getElementById('btnShare').addEventListener('click', shareContent);
    
    // 피드백 버튼
    document.getElementById('feedbackToggle').addEventListener('click', () => {
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSdtndkAyHAOxu8W3596eG4YEr4GFajUZuvhyv2q_2FsJ-OBRg/viewform', '_blank');
        trackEvent('feedback_opened');
    });
});
