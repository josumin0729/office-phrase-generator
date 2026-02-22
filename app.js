// GA4 + Amplitude 이벤트 트래킹
function trackEvent(eventName, eventParams = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventParams);
    }
    if (typeof amplitude !== 'undefined') {
        amplitude.track(eventName, eventParams);
    }
}

// 카카오 SDK 초기화
function initKakao() {
    if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
        Kakao.init('YOUR_KAKAO_JAVASCRIPT_KEY');
        console.log('Kakao SDK 초기화 완료');
    }
}

// 전역 변수
let currentType = null;
let currentPhrase = null;
let workplaceData = null;
let maknaeData = null;

// 이모티콘 배열
const workplaceEmoticons = ['ㅠㅠ', '(╥﹏╥)'];
const maknaeEmoticon = '૮ ˶ᵔ ᵕ ᵔ˶ ა';

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
    const allSections = data.sections;
    const randomSection = allSections[Math.floor(Math.random() * allSections.length)];
    const randomItem = randomSection.items[Math.floor(Math.random() * randomSection.items.length)];
    
    return {
        text: randomItem,
        emoji: randomSection.emoji,
        category: randomSection.title
    };
}

// 카드 표시
function showCard(type) {
    currentType = type;
    const data = type === 'workplace' ? workplaceData : maknaeData;
    currentPhrase = getRandomPhrase(data);
    
    const cardText = document.getElementById('cardText');
    const cardEmoticon = document.getElementById('cardEmoticon');
    const phraseCard = document.getElementById('phraseCard');
    
    cardText.textContent = currentPhrase.text;
    
    if (type === 'workplace') {
        phraseCard.className = 'phrase-card type-workplace';
        const randomEmoticon = workplaceEmoticons[Math.floor(Math.random() * workplaceEmoticons.length)];
        cardEmoticon.textContent = randomEmoticon;
    } else {
        phraseCard.className = 'phrase-card type-maknae';
        cardEmoticon.textContent = maknaeEmoticon;
    }
    
    const cardSection = document.getElementById('cardSection');
    cardSection.style.display = 'block';
    
    setTimeout(() => {
        cardSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 100);
    
    trackEvent('phrase_generated', {
        phrase_type: type,
        category: currentPhrase.category
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
        
        trackEvent('image_downloaded', { 
            phrase_type: currentType 
        });
        
        showToast('이미지가 저장되었습니다!');
    } catch (error) {
        console.error('이미지 저장 실패:', error);
        alert('이미지 저장에 실패했습니다.');
    }
}

// 카카오톡 공유하기
function shareKakao() {
    if (!currentPhrase) {
        alert('먼저 문구를 뽑아주세요!');
        return;
    }
    
    try {
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: '직장인 문구 생성기',
                description: currentPhrase.text,
                imageUrl: 'https://josumin0729.github.io/office-phrase/og-image.png',
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
            },
            buttons: [
                {
                    title: '나도 뽑아보기',
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                    },
                },
            ],
        });
        
        trackEvent('shared', { 
            method: 'kakao', 
            phrase_type: currentType 
        });
        
        showToast('카카오톡으로 공유했어요!');
    } catch (error) {
        console.error('카카오톡 공유 실패:', error);
        alert('카카오톡 공유에 실패했습니다.');
    }
}

// X 공유하기
async function shareX() {
    if (!currentPhrase) {
        alert('먼저 문구를 뽑아주세요!');
        return;
    }
    
    try {
        const card = document.getElementById('phraseCard');
        const canvas = await html2canvas(card, {
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false
        });
        
        const blob = await new Promise(resolve => {
            canvas.toBlob(resolve, 'image/png');
        });
        
        const file = new File([blob], '직장인문구.png', { type: 'image/png' });
        
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            const shareText = currentPhrase.text + '\n\n직장인 문구 생성기에서 뽑았어요\n' + window.location.href;
            await navigator.share({
                text: shareText,
                files: [file]
            });
            
            trackEvent('shared', { 
                method: 'x_with_image', 
                phrase_type: currentType 
            });
            
            showToast('이미지와 함께 공유했어요!');
        } else {
            const text = currentPhrase.text + '\n\n직장인 문구 생성기에서 뽑았어요';
            const url = window.location.href;
            const xUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url);
            
            window.open(xUrl, '_blank', 'width=550,height=420');
            
            trackEvent('shared', { 
                method: 'x_text_only', 
                phrase_type: currentType 
            });
            
            showToast('X로 공유했어요!');
        }
    } catch (error) {
        console.error('X 공유 실패:', error);
        
        const text = currentPhrase.text + '\n\n직장인 문구 생성기에서 뽑았어요';
        const url = window.location.href;
        const xUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url);
        
        window.open(xUrl, '_blank', 'width=550,height=420');
        showToast('텍스트로 공유되었습니다');
    }
}

// 기본 공유하기
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
            trackEvent('shared', { 
                method: 'native', 
                phrase_type: currentType 
            });
            showToast('공유했습니다!');
        } else {
            const copyText = text + '\n\n' + window.location.href;
            await navigator.clipboard.writeText(copyText);
            trackEvent('shared', { 
                method: 'clipboard', 
                phrase_type: currentType 
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
    toast.style.cssText = 'position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: white; padding: 12px 24px; border-radius: 100px; font-size: 14px; font-weight: 600; z-index: 9999;';
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// 피드백 전송
function submitFeedback() {
    const feedback = document.getElementById('feedbackText').value.trim();
    
    if (!feedback) {
        alert('피드백 내용을 입력해주세요.');
        return;
    }
    
    const formUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
    const entryId = 'entry.123456789';
    
    const formData = new FormData();
    formData.append(entryId, feedback);
    
    fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    }).then(() => {
        showToast('소중한 피드백 감사합니다!');
        document.getElementById('feedbackText').value = '';
        document.getElementById('feedbackForm').style.display = 'none';
        trackEvent('feedback_submitted');
    }).catch(error => {
        console.error('피드백 전송 실패:', error);
        alert('전송에 실패했습니다.');
    });
}

// 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initKakao();
    
    document.getElementById('btnWorkplace').addEventListener('click', () => {
        showCard('workplace');
        trackEvent('button_clicked', { button_type: 'workplace' });
    });
    
    document.getElementById('btnMaknae').addEventListener('click', () => {
        showCard('maknae');
        trackEvent('button_clicked', { button_type: 'maknae' });
    });
    
    document.getElementById('btnRefresh').addEventListener('click', () => {
        if (currentType) {
            showCard(currentType);
        }
    });
    
    document.getElementById('btnDownload').addEventListener('click', downloadImage);
    
    document.getElementById('btnKakao').addEventListener('click', shareKakao);
    document.getElementById('btnX').addEventListener('click', shareX);
    document.getElementById('btnShare').addEventListener('click', shareContent);
    
    document.getElementById('feedbackToggle').addEventListener('click', () => {
        const form = document.getElementById('feedbackForm');
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    });
    
    document.getElementById('btnSubmit').addEventListener('click', submitFeedback);
    document.getElementById('btnCancel').addEventListener('click', () => {
        document.getElementById('feedbackForm').style.display = 'none';
        document.getElementById('feedbackText').value = '';
    });
});
