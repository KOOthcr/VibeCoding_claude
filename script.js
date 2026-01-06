// ==================== 전역 변수 및 데이터 ====================

// 거래 내역 데이터 배열 (입력값으로 받아올 데이터)
// 기본값: 날짜 = '0/0/0', 금액 = 0, 금액단위 = '원'
const transactions = [];

// 총 자산 설정 (입력값으로 받아올 데이터)
// 기본값: 금액 = 0, 금액단위 = '원'
const totalAsset = {
    amount: 0,           // 총 자산 금액
    currency: '원'       // 총 자산 통화 단위
};

// ==================== 설정 ====================

// 기본 거래 항목 설정
const DEFAULT_TRANSACTION = {
    date: '0/0/0',           // 기본 날짜
    description: '',          // 기본 설명
    amount: 0,               // 기본 금액
    currency: '원',          // 기본 금액 단위
    type: 'positive'         // 기본 타입 (positive/negative)
};

// ==================== DOM 요소 선택 ====================

// 총 자산 표시 요소
const totalAmountElement = document.getElementById('totalAmount');

// 거래 내역 리스트 요소
const transactionListElement = document.getElementById('transactionList');

// "최근 보기" 버튼
const viewAllBtn = document.getElementById('viewAllBtn');

// 모든 네비게이션 아이템
const navItems = document.querySelectorAll('.nav-item');

// ==================== 유틸리티 함수 ====================

/**
 * 숫자를 통화 형식으로 포맷팅
 * @param {number} amount - 포맷팅할 금액
 * @param {string} currency - 통화 단위 (기본값: '원')
 * @returns {string} - 포맷팅된 문자열 (예: "14,000,000원")
 */
function formatCurrency(amount, currency = '원') {
    return new Intl.NumberFormat('ko-KR').format(Math.abs(amount)) + currency;
}

/**
 * 총 자산 계산
 * @returns {number} - 모든 거래의 합계
 */
function calculateTotalAsset() {
    return transactions.reduce((total, transaction) => {
        return total + transaction.amount;
    }, 0);
}

/**
 * 총 자산 업데이트 및 표시
 * 설정된 총 자산 값을 화면에 표시합니다
 */
function updateTotalAsset() {
    totalAmountElement.textContent = formatCurrency(totalAsset.amount, totalAsset.currency);

    // 애니메이션 효과 추가
    totalAmountElement.style.transition = 'transform 0.2s ease';
    totalAmountElement.style.transform = 'scale(1.05)';
    setTimeout(() => {
        totalAmountElement.style.transform = 'scale(1)';
    }, 200);
}

// ==================== 거래 내역 렌더링 ====================

/**
 * 거래 내역 리스트를 화면에 렌더링
 */
function renderTransactions() {
    // 기존 리스트 초기화
    transactionListElement.innerHTML = '';

    // 거래 내역이 없을 경우 안내 메시지 표시
    if (transactions.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.className = 'transaction-item empty-message';
        emptyMessage.innerHTML = `
            <div class="transaction-info">
                <span class="transaction-desc" style="color: #999;">거래 내역이 없습니다</span>
            </div>
        `;
        transactionListElement.appendChild(emptyMessage);
        return;
    }

    // 각 거래 항목을 순회하며 HTML 생성
    transactions.forEach((transaction, index) => {
        const li = document.createElement('li');
        li.className = 'transaction-item';

        // 거래 항목 HTML 구조 생성 (통화 단위 포함)
        li.innerHTML = `
            <div class="transaction-info">
                <span class="transaction-date">${transaction.date}</span>
                <span class="transaction-desc">${transaction.description}</span>
            </div>
            <span class="transaction-amount ${transaction.type}">
                ${transaction.amount > 0 ? '' : '-'}${formatCurrency(transaction.amount, transaction.currency)}
            </span>
        `;

        // 클릭 이벤트 추가
        li.addEventListener('click', () => handleTransactionClick(index));

        // 리스트에 추가
        transactionListElement.appendChild(li);
    });
}

/**
 * 거래 항목 클릭 핸들러
 * @param {number} index - 클릭된 거래의 인덱스
 */
function handleTransactionClick(index) {
    const transaction = transactions[index];
    alert(`거래 상세 정보:\n날짜: ${transaction.date}\n내용: ${transaction.description}\n금액: ${transaction.amount > 0 ? '+' : ''}${formatCurrency(transaction.amount, transaction.currency)}`);
}

// ==================== 네비게이션 기능 ====================

/**
 * 네비게이션 아이템 클릭 핸들러
 * @param {Event} event - 클릭 이벤트
 */
function handleNavClick(event) {
    // 클릭된 버튼 요소 찾기
    const button = event.currentTarget;
    const category = button.dataset.category;

    // 모든 네비게이션 아이템에서 active 클래스 제거
    navItems.forEach(item => {
        item.style.opacity = '0.6';
    });

    // 클릭된 아이템 강조
    button.style.opacity = '1';

    // 카테고리 알림
    console.log(`선택된 카테고리: ${category}`);

    // 실제 앱에서는 여기서 해당 카테고리 페이지로 이동하거나
    // 필터링된 거래 내역을 표시할 수 있습니다

    // 0.5초 후 원래 상태로 복원
    setTimeout(() => {
        navItems.forEach(item => {
            item.style.opacity = '1';
        });
    }, 500);
}

/**
 * 모든 네비게이션 아이템에 이벤트 리스너 추가
 */
function initializeNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', handleNavClick);
    });
}

// ==================== "최근 보기" 버튼 기능 ====================

/**
 * "최근 보기" 버튼 클릭 핸들러
 */
function handleViewAllClick() {
    // 거래 내역을 날짜순으로 정렬 (토글)
    const isAscending = viewAllBtn.dataset.sorted === 'asc';

    if (isAscending) {
        // 내림차순 정렬
        transactions.sort((a, b) => {
            const dateA = a.date.split('/').reverse().join('');
            const dateB = b.date.split('/').reverse().join('');
            return dateB.localeCompare(dateA);
        });
        viewAllBtn.dataset.sorted = 'desc';
        viewAllBtn.textContent = '오래된순';
    } else {
        // 오름차순 정렬
        transactions.sort((a, b) => {
            const dateA = a.date.split('/').reverse().join('');
            const dateB = b.date.split('/').reverse().join('');
            return dateA.localeCompare(dateB);
        });
        viewAllBtn.dataset.sorted = 'asc';
        viewAllBtn.textContent = '최근순';
    }

    // 정렬 후 다시 렌더링
    renderTransactions();
}

// ==================== 새 거래 추가 기능 ====================

/**
 * 새로운 거래 내역 추가
 * @param {string} date - 거래 날짜 (기본값: '0/0/0')
 * @param {string} description - 거래 설명 (기본값: '')
 * @param {number} amount - 거래 금액 (기본값: 0)
 * @param {string} currency - 금액 단위 (기본값: '원')
 */
function addTransaction(
    date = DEFAULT_TRANSACTION.date,
    description = DEFAULT_TRANSACTION.description,
    amount = DEFAULT_TRANSACTION.amount,
    currency = DEFAULT_TRANSACTION.currency
) {
    const newTransaction = {
        date: date,
        description: description,
        amount: amount,
        currency: currency,
        type: amount > 0 ? 'positive' : 'negative'
    };

    // 배열 맨 앞에 추가 (최신 거래가 위로)
    transactions.unshift(newTransaction);

    // 화면 업데이트
    renderTransactions();
    updateTotalAsset();

    console.log('새 거래가 추가되었습니다:', newTransaction);
    return newTransaction;
}

// ==================== 초기화 함수 ====================

/**
 * 앱 초기화 - 페이지 로드 시 실행
 */
function initializeApp() {
    console.log('자산 관리 앱 초기화 중...');

    // 거래 내역 렌더링
    renderTransactions();

    // 총 자산 업데이트
    updateTotalAsset();

    // 네비게이션 초기화
    initializeNavigation();

    // "최근 보기" 버튼 이벤트 리스너
    viewAllBtn.addEventListener('click', handleViewAllClick);
    viewAllBtn.dataset.sorted = 'desc'; // 초기 상태는 내림차순

    console.log('초기화 완료!');
}

// ==================== 앱 시작 ====================

// DOM이 완전히 로드된 후 앱 초기화
document.addEventListener('DOMContentLoaded', initializeApp);

// ==================== 데이터 로딩 함수 ====================

/**
 * 외부에서 거래 데이터를 로드하는 함수
 * @param {Array} transactionData - 거래 데이터 배열
 * @example
 * loadTransactionData([
 *   { date: '13/12', description: '월급', amount: 3000000, currency: '원' },
 *   { date: '14/12', description: '커피', amount: -4500, currency: '원' }
 * ]);
 */
function loadTransactionData(transactionData) {
    // 기존 데이터 초기화
    transactions.length = 0;

    // 새 데이터 추가 (기본값 적용)
    transactionData.forEach(data => {
        const transaction = {
            date: data.date || DEFAULT_TRANSACTION.date,
            description: data.description || DEFAULT_TRANSACTION.description,
            amount: data.amount !== undefined ? data.amount : DEFAULT_TRANSACTION.amount,
            currency: data.currency || DEFAULT_TRANSACTION.currency,
            type: (data.amount !== undefined ? data.amount : DEFAULT_TRANSACTION.amount) >= 0 ? 'positive' : 'negative'
        };
        transactions.push(transaction);
    });

    // 화면 업데이트
    renderTransactions();
    updateTotalAsset();

    console.log(`${transactions.length}개의 거래 내역이 로드되었습니다.`);
}

/**
 * 총 자산 설정 함수
 * @param {number} amount - 총 자산 금액 (기본값: 0)
 * @param {string} currency - 통화 단위 (기본값: '원')
 * @example
 * setTotalAsset(14000000, '원');
 * setTotalAsset(1000, 'USD');
 */
function setTotalAsset(amount = 0, currency = '원') {
    totalAsset.amount = amount;
    totalAsset.currency = currency;

    // 화면 업데이트
    updateTotalAsset();

    console.log(`총 자산이 설정되었습니다: ${formatCurrency(amount, currency)}`);
    return totalAsset;
}

// 외부에서 접근 가능하도록 window 객체에 추가
window.loadTransactionData = loadTransactionData;
window.addTransaction = addTransaction;
window.setTotalAsset = setTotalAsset;

// ==================== 개발자 도구용 유틸리티 ====================

// 콘솔에서 거래 추가 테스트용 함수
// 사용 예: window.testAddTransaction()
window.testAddTransaction = function () {
    const today = new Date();
    const date = `${today.getDate()}/${today.getMonth() + 1}`;
    addTransaction(date, '테스트 거래', -10000, '원');
    alert('테스트 거래가 추가되었습니다!');
};

// 샘플 데이터 로드 함수
window.loadSampleData = function () {
    // 총 자산 설정
    setTotalAsset(14000000, '원');

    // 거래 내역 로드
    loadTransactionData([
        { date: '13/12', description: '최근 자산', amount: 14000000, currency: '원' },
        { date: '13/12', description: '가계 정보 역시', amount: -50000, currency: '원' },
        { date: '12/12', description: '가계 정제 계시', amount: -5000, currency: '원' },
        { date: '13/12', description: '최근 거래 발 계시', amount: -50000, currency: '원' }
    ]);

    alert('샘플 데이터가 로드되었습니다!');
};

// 콘솔 로그로 현재 상태 확인
console.log('💰 자산 관리 앱이 로드되었습니다.');
console.log('📝 개발자 도구 팁:');
console.log('  - window.testAddTransaction() : 테스트 거래 추가');
console.log('  - window.loadSampleData() : 샘플 데이터 로드');
console.log('  - window.setTotalAsset(금액, 통화단위) : 총 자산 설정');
console.log('  - window.addTransaction(날짜, 설명, 금액, 통화단위) : 거래 추가');
console.log('  - window.loadTransactionData([...]) : 여러 거래 한번에 로드');
