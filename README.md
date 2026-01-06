# 자산 관리 웹사이트 - 사용 가이드

## 📋 개요
이 웹사이트는 거래 내역을 동적으로 관리할 수 있는 자산 관리 앱입니다.

## 🚀 사용 방법

### 1. 기본 실행
`index.html` 파일을 브라우저에서 열면 빈 거래 내역 화면이 표시됩니다.

### 2. 거래 데이터 입력 방법

#### 방법 1: 총 자산 설정
브라우저 개발자 도구(F12)의 콘솔에서 총 자산을 설정:

```javascript
// 총 자산 설정 (금액, 통화 단위)
window.setTotalAsset(14000000, '원');

// 기본값 사용 (금액: 0, 통화: 원)
window.setTotalAsset();

// 다른 통화 단위 사용
window.setTotalAsset(1000, 'USD');
```

#### 방법 2: 개별 거래 추가
브라우저 개발자 도구(F12)의 콘솔에서 다음과 같이 입력:

```javascript
// 기본 사용 (모든 매개변수 지정)
window.addTransaction('6/1', '월급', 3000000, '원');

// 기본값 사용 (날짜: 0/0/0, 금액: 0, 통화: 원)
window.addTransaction();

// 일부만 지정 (나머지는 기본값)
window.addTransaction('7/1', '커피', -4500);
```

#### 방법 3: 여러 거래 한번에 로드
```javascript
window.loadTransactionData([
    { date: '13/12', description: '월급', amount: 3000000, currency: '원' },
    { date: '14/12', description: '커피', amount: -4500, currency: '원' },
    { date: '15/12', description: '점심', amount: -12000, currency: '원' },
    { date: '16/12', description: '용돈', amount: 100000, currency: '원' }
]);
```

#### 방법 4: 샘플 데이터 로드
```javascript
window.loadSampleData();
```

### 3. 기본값 설정

#### 총 자산 기본값:
- **금액**: `0`
- **통화 단위**: `원`

#### 거래 내역 기본값:
- **날짜**: `0/0/0`
- **금액**: `0`
- **통화 단위**: `원`

### 4. 데이터 구조
각 거래 항목은 다음과 같은 형식을 가집니다:

```javascript
{
    date: '13/12',           // 날짜 (문자열)
    description: '월급',      // 거래 설명 (문자열)
    amount: 3000000,         // 금액 (숫자, 음수는 출금)
    currency: '원'           // 통화 단위 (문자열)
}
```

## 💡 예제

### 예제 1: 다양한 통화 단위 사용
```javascript
window.loadTransactionData([
    { date: '1/1', description: '달러 환전', amount: -1000, currency: 'USD' },
    { date: '2/1', description: '엔화 환전', amount: -50000, currency: 'JPY' },
    { date: '3/1', description: '월급', amount: 3000000, currency: '원' }
]);
```

### 예제 2: 기본값 활용
```javascript
// 날짜와 금액만 지정 (설명은 빈 문자열, 통화는 '원')
window.addTransaction('10/1', '', 50000);

// 완전히 기본값만 사용
window.addTransaction();  // 날짜: 0/0/0, 금액: 0원
```

## 🎯 주요 기능

### JavaScript 함수들

#### `setTotalAsset(amount, currency)`
- 총 자산을 설정합니다
- 매개변수:
  - `amount`: 총 자산 금액 (기본값: 0)
  - `currency`: 통화 단위 (기본값: '원')
- 반환값: 설정된 총 자산 객체

#### `addTransaction(date, description, amount, currency)`
- 새로운 거래를 추가합니다
- 모든 매개변수는 선택적이며 기본값이 있습니다
- 반환값: 추가된 거래 객체

#### `loadTransactionData(transactionData)`
- 여러 거래를 한번에 로드합니다
- 기존 데이터는 모두 삭제됩니다
- 매개변수: 거래 객체 배열

#### `window.testAddTransaction()`
- 테스트용 거래를 추가합니다

#### `window.loadSampleData()`
- 샘플 데이터를 로드합니다

## 📱 반응형 디자인
- 모바일, 태블릿, 데스크톱 모두 지원
- 브라우저 창 크기를 조절하여 확인 가능

## 🔧 개발자 도구 팁
브라우저 콘솔에서 다음 명령어들을 사용할 수 있습니다:
- `window.testAddTransaction()` - 테스트 거래 추가
- `window.loadSampleData()` - 샘플 데이터 로드
- `window.setTotalAsset(금액, 통화단위)` - 총 자산 설정
- `window.addTransaction(날짜, 설명, 금액, 통화단위)` - 거래 추가
- `window.loadTransactionData([...])` - 여러 거래 한번에 로드

## 📂 파일 구조
```
claude/
├── index.html      # 메인 HTML 파일
├── style.css       # 스타일시트
├── script.js       # JavaScript 로직
└── README.md       # 이 파일
```

## ✨ 추가 개선 가능 사항
- 로컬 스토리지를 통한 데이터 영구 저장
- 거래 수정/삭제 기능
- 카테고리별 필터링
- 차트 시각화
- 검색 기능
