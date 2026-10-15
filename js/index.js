let currentUser = {
    name: "Hành khách ẩn danh",
    isAnonymous: true
};

function handleStartJourney() {
    goToAuthScreen();
}

function goToAuthScreen() {
    document.getElementById('welcome-screen').classList.remove('active');
    document.getElementById('auth-screen').classList.add('active');
}

function loginAnonymous() {
    localStorage.setItem('userName', 'Ẩn danh');
    goToMap();
}

function handleAuthSubmit(event) {
    event.preventDefault();
    const nickname = document.getElementById('nickname-input').value;
    if (nickname) {
        localStorage.setItem('userName', nickname);
        goToMap();
    }
}

function goToMap() {
    window.location.href = 'map.html';
}

// Tự động load tên người dùng và load bài đăng khi chuyển trang
window.addEventListener('DOMContentLoaded', () => {
    const savedName = localStorage.getItem('userName');
    const nameSpan = document.getElementById('welcome-user-name');
    const greetingTitle = document.getElementById('dynamic-greeting-title');

    if (savedName && nameSpan) {
        nameSpan.innerText = `Xin chào, ${savedName}`;
        if (greetingTitle) {
            greetingTitle.innerText = `Chào buổi sáng, ${savedName}!`;
        }
    }

    // Gọi hàm load danh sách bài đăng Trạm 4
    loadCommunityFeed();
});

// Điều hướng mở các trạm từ bản đồ
function openStationModal(stationId) {
    if (stationId === 1) {
        window.location.href = 'station1.html';
    } else if (stationId === 2) {
        window.location.href = 'station2.html';
    } else if (stationId === 3) {
        window.location.href = 'station3.html';
    } else if (stationId === 4) {
        window.location.href = 'station4.html';
    } else {
        alert(`Đang mở không gian chi tiết cho Trạm số ${stationId}...`);
    }
}

// ================= TRẠM 1: NHẬN DIỆN CẢM XÚC =================
function selectEmotion(element, emotionName, customQuote) {
    document.querySelectorAll('.emotion-card').forEach(card => {
        card.classList.remove('active');
    });

    element.classList.add('active');

    const emoSpan = document.getElementById('current-selected-emo');
    if (emoSpan) emoSpan.innerText = emotionName;

    const quoteEl = document.getElementById('dynamic-advice-quote');
    if (quoteEl) quoteEl.innerText = `“${customQuote}”`;

    const stationTitleEl = document.getElementById('recommended-station-title');
    const stationDescEl = document.getElementById('recommended-station-desc');

    if (emotionName === 'Buồn bã' || emotionName === 'Cô đơn') {
        if (stationTitleEl) stationTitleEl.innerText = 'Trạm Sạc cảm xúc tiêu cực';
        if (stationDescEl) stationDescEl.innerText = 'Trò chuyện và xoa dịu những nỗi buồn thầm kín.';
    } else if (emotionName === 'Tức giận' || emotionName === 'Căng thẳng/Áp lực') {
        if (stationTitleEl) stationTitleEl.innerText = 'Trạm Tích năng lượng';
        if (stationDescEl) stationDescEl.innerText = 'Thực hiện bài tập hít thở sâu để giải tỏa căng thẳng cơ thể.';
    } else {
        if (stationTitleEl) stationTitleEl.innerText = 'Trạm Tích năng lượng';
        if (stationDescEl) stationDescEl.innerText = 'Thực hiện bài tập hít thở giúp làm dịu hệ thần kinh.';
    }
}

function selectIntensity(labelElement, levelValue) {
    document.querySelectorAll('.intensity-item').forEach(item => {
        item.classList.remove('active-level');
    });
    labelElement.classList.add('active-level');
    const radioInput = labelElement.querySelector('input[type="radio"]');
    if (radioInput) radioInput.checked = true;
}

function goToNextStation() {
    alert('Đang ghi nhận cảm xúc của bạn! Đang chuyển hướng đến trạm tiếp theo...');
    window.location.href = 'station2.html';
}

// ================= TRẠM 2: TRẠM SẠC CẢM XÚC =================
function shredEmotionText() {
    const textarea = document.getElementById('emotion-dump-input');
    if (textarea) {
        if (textarea.value.trim() === '') {
            alert('Ô nội dung đang trống mà!');
            return;
        }
        if (confirm('Bạn có chắc muốn xé bỏ và xóa sạch những điều vừa viết để trút bỏ gánh nặng không?')) {
            textarea.value = '';
            alert('Đã xóa sạch! Cảm giác nhẹ nhõm hơn chưa bạn?');
        }
    }
}

function saveToJournal() {
    const textarea = document.getElementById('emotion-dump-input');
    if (textarea && textarea.value.trim() !== '') {
        localStorage.setItem('savedJournalEntry', textarea.value);
        alert('Đã lưu tâm sự của bạn vào Nhật ký cảm xúc thành công! 📖');
    } else {
        alert('Hãy viết vài dòng tâm sự trước khi lưu nhé.');
    }
}

function goToNextStationFrom2() {
    alert('Đang chuyển đến Trạm Tích năng lượng...');
    window.location.href = 'station3.html';
}

// ================= TRẠM 3: NẠP NĂNG LƯỢNG & NHỊP THỞ =================
let breathInterval = null;
let isBreathingActive = false;

function toggleBreathingGuide() {
    const circle = document.getElementById('breath-circle');
    const statusText = document.getElementById('breath-status-text');
    const btn = document.getElementById('btn-toggle-breath');

    if (!isBreathingActive) {
        isBreathingActive = true;
        if (btn) btn.innerText = "Tắt nhịp thở";
        runBreathCycle();
        breathInterval = setInterval(runBreathCycle, 8000);
    } else {
        isBreathingActive = false;
        clearInterval(breathInterval);
        if (circle) circle.classList.remove('inhale');
        if (statusText) statusText.innerText = "Đã dừng";
        if (btn) btn.innerText = "Bật/ Tắt nhịp thở";
    }
}

function runBreathCycle() {
    const circle = document.getElementById('breath-circle');
    const statusText = document.getElementById('breath-status-text');
    if (!circle || !statusText) return;

    statusText.innerText = "Hít vào...";
    circle.classList.add('inhale');

    setTimeout(() => {
        if (isBreathingActive) {
            statusText.innerText = "Thở ra...";
            circle.classList.remove('inhale');
        }
    }, 4000);
}

function selectBreathingExercise(type) {
    document.querySelectorAll('.energy-card').forEach(card => card.classList.remove('active-card'));

    const titleEl = document.getElementById('breath-title');
    const instEl = document.getElementById('breath-instruction');
    const tipEl = document.getElementById('breath-footer-tip');
    const breathContainer = document.querySelector('.circle-breath-container');
    const toggleBtn = document.getElementById('btn-toggle-breath');
    const otherContentBox = document.getElementById('other-exercise-content');

    if (breathContainer) breathContainer.style.display = 'flex';
    if (toggleBtn) toggleBtn.style.display = 'inline-block';
    if (otherContentBox) otherContentBox.style.display = 'none';

    if (type === 'box') {
        document.getElementById('card-box').classList.add('active-card');
        if (titleEl) titleEl.innerText = "Thở hộp – Box breathing";
        if (instEl) instEl.innerText = "Hít vào 4s → Giữ hơi 4s → Thở ra 4s → Giữ hơi 4s.";
        if (tipEl) tipEl.innerText = "Giúp lấy lại bình tĩnh nhanh chóng trong các tình huống áp lực cao.";
    } else {
        document.getElementById('card-478').classList.add('active-card');
        if (titleEl) titleEl.innerText = "Thở 4 – 7 – 8";
        if (instEl) instEl.innerText = "Hít vào: 4 giây → Giữ hơi thở: 7 giây → Thở ra chậm: 8 giây.";
        if (tipEl) tipEl.innerText = "Lặp lại 4 lần, giúp làm chậm nhịp tim và giảm lo âu tức thời.";
    }
}

function selectSimpleExercise(exerciseName, duration, description, event) {
    document.querySelectorAll('.energy-card').forEach(card => card.classList.remove('active-card'));
    if (event && event.currentTarget) event.currentTarget.classList.add('active-card');

    const breathingInteractiveBox = document.querySelector('.breathing-interactive-box');
    if (breathingInteractiveBox) {
        let otherContentBox = document.getElementById('other-exercise-content');
        if (!otherContentBox) {
            otherContentBox = document.createElement('div');
            otherContentBox.id = 'other-exercise-content';
            otherContentBox.style.cssText = "margin-top: 20px; padding: 25px; background: rgba(255,255,255,0.95); border-radius: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.08); text-align: left;";
            breathingInteractiveBox.parentNode.insertBefore(otherContentBox, breathingInteractiveBox.nextSibling);
        }
        breathingInteractiveBox.style.display = 'none';
        otherContentBox.style.display = 'block';
        otherContentBox.innerHTML = `
            <h3 style="color: #14532d; font-size: 1.4rem; font-weight: 700; margin-bottom: 8px;">${exerciseName}</h3>
            <p style="color: #166534; font-size: 0.95rem; font-weight: 600; margin-bottom: 12px;">⏱️ Thời gian: ${duration}</p>
            <p style="color: #334155; font-size: 1rem; line-height: 1.6;">${description}</p>
        `;
    }

    if (isBreathingActive) toggleBreathingGuide();
}

function goToNextStationFrom3() {
    alert('Đang chuyển đến Trạm 4: Góc chia sẻ...');
    window.location.href = 'station4.html';
}

// ================= TRẠM 4: GÓC CHIA SẺ CỘNG ĐỒNG =================
const defaultPosts = [
    {
        id: 1,
        author: "Sinh viên ẩn danh 1",
        time: "1 giờ trước",
        content: "Tuần này nhiều deadline quá, mình cảm thấy như bị ngộp thở. Dù đã cố gắng list ra giấy nhưng nhìn vào list chỉ thấy nản hơn. Có ai từng bị như vậy không?",
        hugs: 12,
        isHugged: false,
        replies: [
            { author: "Sinh viên ẩn danh 5", content: "Cố lên bạn ơi, mình cũng hay bị vậy, cứ chia nhỏ deadline ra làm từng chút một nhé!" }
        ]
    },
    {
        id: 2,
        author: "Sinh viên ẩn danh 356",
        time: "2 ngày trước",
        content: "Hôm qua mình bị điểm kém môn chuyên ngành. Cảm giác bao nhiêu công sức đổ sông đổ biển. Rất muốn gọi về cho mẹ nhưng sợ mẹ buồn.",
        hugs: 112,
        isHugged: false,
        replies: [
            { author: "Hành khách ẩn danh", content: "Ôm bạn một cái thật chặt, điểm số không định nghĩa được giá trị con người bạn đâu." }
        ]
    },
    {
        id: 3,
        author: "Sinh viên ẩn danh 99",
        time: "3 ngày trước",
        content: "Có ai cảm thấy lạc lõng giữa thành phố này không? Đi học về chỉ có một mình trong phòng trọ bốn bức tường...",
        hugs: 45,
        isHugged: false,
        replies: []
    }
];

let currentVisiblePosts = 2; // Số bài hiển thị ban đầu, bấm "Xem thêm" sẽ hiện thêm

function loadCommunityFeed() {
    const feedContainer = document.getElementById('community-feed-list');
    const loadMoreBox = document.getElementById('load-more-box');
    if (!feedContainer) return;

    let posts = JSON.parse(localStorage.getItem('tramCamXuc_posts')) || defaultPosts;
    feedContainer.innerHTML = '';

    const postsToShow = posts.slice(0, currentVisiblePosts);

    postsToShow.forEach((post, index) => {
        const postCard = document.createElement('div');
        postCard.className = 'feed-card';

        let repliesHTML = '';
        if (post.replies && post.replies.length > 0) {
            post.replies.forEach(reply => {
                repliesHTML += `
    <div style="background: #f1f5f9; padding: 10px 14px; border-radius: 10px; margin-top: 8px; font-size: 0.85rem; border-left: 3px solid #3b82f6; color: #1e293b;">
        <strong style="color: #1e3a8a;">${reply.author}:</strong> <span style="color: #334155;">${reply.content}</span>
    </div>
`;
            });
        }

        postCard.innerHTML = `
            <div class="feed-header" style="justify-content: space-between; display: flex; align-items: center;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div class="feed-author-avatar">👤</div>
                    <div class="feed-author-info">
                        <h4>${post.author}</h4>
                        <span>${post.time}</span>
                    </div>
                </div>
                <button onclick="deletePost(${index})" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 0.8rem; font-weight: 600;">🗑️ Xóa</button>
            </div>
            <p class="feed-content">${post.content}</p>
            
            <div class="feed-footer">
                <button class="btn-interact ${post.isHugged ? 'active-hug' : ''}" onclick="toggleHug(${index})">
    ❤️ ${post.isHugged ? 'Đã gửi cái ôm' : 'Gửi một cái ôm'} (${post.hugs || 0})
</button>
                <button class="btn-interact" onclick="toggleReplyBox(${index})">
                    💬 Phản hồi (${post.replies ? post.replies.length : 0})
                </button>
            </div>

            <div id="reply-section-${index}" style="display: none; margin-top: 12px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
                <div class="reply-list">${repliesHTML}</div>
                <div style="display: flex; gap: 8px; margin-top: 10px;">
                    <input type="text" id="reply-input-${index}" placeholder="Viết phản hồi ẩn danh..." style="flex: 1; padding: 8px 12px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 0.85rem; outline: none;">
                    <button onclick="submitReply(${index})" style="background: #1e3a8a; color: white; border: none; padding: 8px 14px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 0.85rem;">Gửi</button>
                </div>
            </div>
        `;
        feedContainer.appendChild(postCard);
    });

    if (loadMoreBox) {
        if (currentVisiblePosts >= posts.length) {
            loadMoreBox.style.display = 'none';
        } else {
            loadMoreBox.style.display = 'block';
        }
    }
}

function loadMorePosts() {
    currentVisiblePosts += 2; // Bấm xem thêm hiện thêm 2 bài nữa
    loadCommunityFeed();
}

function submitAnonymousShare() {
    const textarea = document.getElementById('user-share-input');
    const noticeBox = document.getElementById('success-notice');

    if (textarea && textarea.value.trim() !== '') {
        let posts = JSON.parse(localStorage.getItem('tramCamXuc_posts')) || defaultPosts;

        const newPost = {
            id: Date.now(),
            author: "Hành khách ẩn danh (Bạn)",
            time: "Vừa xong",
            content: textarea.value.trim(),
            hugs: 0,
            isHugged: false,
            replies: []
        };

        posts.unshift(newPost);
        localStorage.setItem('tramCamXuc_posts', JSON.stringify(posts));

        loadCommunityFeed();

        if (noticeBox) noticeBox.style.display = 'block';
        textarea.value = '';
    } else {
        alert('Vui lòng viết vài dòng chia sẻ trước khi gửi nhé.');
    }
}

function toggleHug(index) {
    let posts = JSON.parse(localStorage.getItem('tramCamXuc_posts')) || defaultPosts;
    if (!posts[index].isHugged) {
        posts[index].hugs += 1;
        posts[index].isHugged = true;
    } else {
        posts[index].hugs -= 1;
        posts[index].isHugged = false;
    }
    localStorage.setItem('tramCamXuc_posts', JSON.stringify(posts));
    loadCommunityFeed();
}

function toggleReplyBox(index) {
    const replySection = document.getElementById(`reply-section-${index}`);
    if (replySection) {
        replySection.style.display = replySection.style.display === 'none' ? 'block' : 'none';
    }
}

function submitReply(index) {
    const inputEl = document.getElementById(`reply-input-${index}`);
    if (inputEl && inputEl.value.trim() !== '') {
        let posts = JSON.parse(localStorage.getItem('tramCamXuc_posts')) || defaultPosts;
        if (!posts[index].replies) posts[index].replies = [];

        posts[index].replies.push({
            author: "Hành khách ẩn danh",
            content: inputEl.value.trim()
        });

        localStorage.setItem('tramCamXuc_posts', JSON.stringify(posts));
        loadCommunityFeed();
        document.getElementById(`reply-section-${index}`).style.display = 'block';
    } else {
        alert('Vui lòng nhập nội dung phản hồi.');
    }
}

function deletePost(index) {
    if (confirm('Bạn có chắc muốn xóa bài viết này không?')) {
        let posts = JSON.parse(localStorage.getItem('tramCamXuc_posts')) || defaultPosts;
        posts.splice(index, 1);
        localStorage.setItem('tramCamXuc_posts', JSON.stringify(posts));
        loadCommunityFeed();
    }
}
// Hàm chuyển từ Trạm 4 sang Trạm 5
function goToNextStationFrom4() {
    alert('Đang chuyển đến Trạm 5: Góc xoa dịu & Thư viện kiến thức...');
    window.location.href = 'station5.html';
}

// Hàm chuyển từ Trạm 5 sang Trạm 6
function goToNextStationFrom5() {
    alert('Đang chuyển đến Trạm 6: Nhật ký cảm xúc...');
    window.location.href = 'station6.html';
}

// Cập nhật lại hàm mở trạm từ bản đồ (hỗ trợ thêm Trạm 6)
function openStationModal(stationId) {
    if (stationId === 1) window.location.href = 'station1.html';
    else if (stationId === 2) window.location.href = 'station2.html';
    else if (stationId === 3) window.location.href = 'station3.html';
    else if (stationId === 4) window.location.href = 'station4.html';
    else if (stationId === 5) window.location.href = 'station5.html';
    else if (stationId === 6) window.location.href = 'station6.html';
    else if (stationId === 7) window.location.href = 'station7.html';
    else alert(`Đang mở không gian chi tiết cho Trạm số ${stationId}...`);
}

// Dữ liệu nội dung chi tiết bài viết Trạm 5
const articlesData = {
    1: {
        title: "Cảm xúc tiêu cực là gì và vì sao chúng xuất hiện?",
        content: "Cảm xúc tiêu cực (buồn, lo âu, tức giận, căng thẳng...) không phải là \"kẻ thù\" cần loại bỏ mà là tín hiệu tự nhiên của cơ thể, cho biết có điều gì đó cần được chú ý – một nhu cầu chưa được đáp ứng, một ranh giới bị xâm phạm, hoặc một mối đe dọa (thực hoặc cảm nhận)."
    },
    2: {
        title: "Mô hình điều tiết cảm xúc 5 bước (Gross)",
        content: "Nhà tâm lý học James Gross đề xuất mô hình gồm 5 bước để điều tiết cảm xúc:\n\n(1) Lựa chọn tình huống – chủ động tránh hoặc tìm đến hoàn cảnh phù hợp;\n(2) Thay đổi tình huống – điều chỉnh yếu tố gây cảm xúc trong khả năng của mình;\n(3) Hướng chú ý – chuyển sự tập trung sang khía cạnh khác;\n(4) Thay đổi nhận thức (reappraisal) – nhìn nhận lại tình huống theo góc độ khác;\n(5) Điều chỉnh phản ứng – kiểm soát biểu hiện ra bên ngoài (hơi thở, hành vi).\n\nCác trạm trong web app này được xây dựng dựa trên từng bước của mô hình: từ nhận diện, giải tỏa, đến thay đổi góc nhìn và phục hồi năng lượng."
    },
    3: {
        title: "Kỹ thuật tái cấu trúc nhận thức – mô hình ABC",
        content: "Mô hình ABC trong liệu pháp nhận thức – hành vi (CBT) chỉ ra rằng:\nA (Activating event – sự kiện) không trực tiếp gây ra C (Consequence – cảm xúc/hành vi), mà thông qua B (Belief – suy nghĩ / niềm tin) của chúng ta về sự kiện đó.\n\nThay vì cố gắng thay đổi sự kiện A, chúng ta có thể nhận diện và thay đổi B để xoa dịu cảm xúc C."
    },
    4: {
        title: "Vì sao giấc ngủ ảnh hưởng trực tiếp đến cảm xúc?",
        content: "Thiếu ngủ làm giảm hoạt động của vỏ não trước trán (vùng kiểm soát lý trí, ra quyết định) trong khi lại tăng phản ứng của hạnh nhân (amygdala - trung tâm cảm xúc), khiến sinh viên dễ cáu gắt, lo âu và phản ứng thái quá hơn bình thường."
    },
    5: {
        title: "Quản lý thời gian để giảm áp lực deadline",
        content: "Áp lực deadline thường không đến từ khối lượng công việc mà từ cảm giác mất kiểm soát về thời gian. Kỹ thuật Pomodoro (làm việc 25 phút, nghỉ 5 phút) giúp giảm cảm giác quá tải bằng cách chia nhỏ nhiệm vụ."
    },
    6: {
        title: "Khi nào cảm xúc tiêu cực cần được hỗ trợ chuyên nghiệp?",
        content: "Cảm xúc tiêu cực là bình thường, nhưng cần tìm hỗ trợ chuyên nghiệp nếu cảm giác buồn lo kéo dài trên 2 tuần liên tục; ảnh hưởng nghiêm trọng đến ăn uống, giấc ngủ, học tập; có suy nghĩ muốn làm hại bản thân; hoặc cảm thấy hoàn toàn mất kiểm soát."
    }
};

// Hàm mở chi tiết bài viết
function openArticleDetail(id) {
    const grid = document.getElementById('article-grid');
    const detailBox = document.getElementById('article-detail-box');
    const titleEl = document.getElementById('detail-title');
    const contentEl = document.getElementById('detail-content');

    if (articlesData[id] && detailBox) {
        grid.style.display = 'none';
        detailBox.style.display = 'block';
        titleEl.innerText = articlesData[id].title;
        contentEl.innerText = articlesData[id].content;
        detailBox.scrollIntoView({ behavior: 'smooth' });
    }
}

// Hàm đóng chi tiết quay lại danh sách
function closeArticleDetail() {
    const grid = document.getElementById('article-grid');
    const detailBox = document.getElementById('article-detail-box');
    if (grid && detailBox) {
        grid.style.display = 'grid';
        detailBox.style.display = 'none';
    }
}

// Hàm tìm kiếm bài viết
function filterArticles() {
    const input = document.getElementById('library-search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.article-card');

    cards.forEach(card => {
        const title = card.querySelector('.article-title').innerText.toLowerCase();
        const snippet = card.querySelector('.article-snippet').innerText.toLowerCase();

        if (title.includes(input) || snippet.includes(input)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}
let selectedJournalEmotions = [];

// Hàm chọn/bỏ chọn nút cảm xúc Trạm 6
function toggleJournalEmotion(btnEl, emoName) {
    btnEl.classList.toggle('active-emo');
    if (selectedJournalEmotions.includes(emoName)) {
        selectedJournalEmotions = selectedJournalEmotions.filter(e => e !== emoName);
    } else {
        selectedJournalEmotions.push(emoName);
    }
}

// Hàm lưu Nhật ký cảm xúc
function saveJournalEntry() {
    const intensity = document.getElementById('journal-intensity-range').value;
    const reason = document.getElementById('journal-reason-input').value;
    const action = document.getElementById('journal-action-select').value;
    const gratitude = document.getElementById('journal-gratitude-input').value;
    const tomorrow = document.getElementById('journal-tomorrow-input').value;

    const journalData = {
        date: new Date().toLocaleDateString('vi-VN'),
        emotions: selectedJournalEmotions,
        intensity: intensity,
        reason: reason,
        action: action,
        gratitude: gratitude,
        tomorrow: tomorrow
    };

    localStorage.setItem('tramCamXuc_journal', JSON.stringify(journalData));

    // Hiện phần hoàn thành & biểu đồ thống kê
    const finishBox = document.getElementById('journal-finish-box');
    if (finishBox) {
        finishBox.style.display = 'block';
        finishBox.scrollIntoView({ behavior: 'smooth' });
    }
}

// Hàm chuyển sang Trạm 7
function goToNextStationFrom6() {
    alert('Đang chuyển đến Trạm 7: Trạm Đồng hành & Hỗ trợ...');
    window.location.href = 'station7.html';
}