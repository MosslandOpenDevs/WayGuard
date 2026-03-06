# 🛡️ 안전 지킴이 (WayGuard)

> **"우리 동네, 안전할까?"**
> 
> 안전 지킴이는 시민이 직접 참여하여 동네의 안전 정보를 확인하고, **유아와 여성의 안전**을 지키기 위한 데이터 기반 안전 정보 웹 플랫폼입니다.

---

## 📖 소개 (About)

안전 지킴이(WayGuard)는 13개의 공공 API 데이터를 카카오맵 위에 시각화하여, 내가 사는 동네의 안전도를 한눈에 파악할 수 있게 해주는 서비스입니다. 어두운 골목, CCTV 사각지대, 아동 범죄 주의 구간 등을 지도에서 쉽게 확인하고, 위험 상황 시 지인에게 실시간으로 위치를 공유할 수 있습니다.

### 🌟 핵심 가치
- **데이터 기반 안전:** 공공데이터(CCTV, 비상벨, 가로등 등)를 활용한 객관적 지표 제공
- **시민 참여:** 사용자가 직접 동네 위험 요소를 신고하고 공유
- **실시간 알림:** 안심 귀가 모드, 아이 안심 모드를 통한 실시간 위치 전송 및 알림

---

## ✨ 주요 기능 (Features)

### 1. 🗺️ 동네 안전 지도
전국 CCTV, 가로등, 방범용 비상벨, 아동안전지킴이집, 스쿨존, 어린이 범죄 주의 구간 등 다양한 안전 데이터를 레이어 형태로 지도 위에 표시합니다.

### 2. 📊 동네 안전 등급
사용자가 주소를 검색하면 CCTV 밀도, 범죄 발생률, 시민 신고 건수 등을 종합하여 **S등급(매우 안전)** 부터 **D등급(위험)** 까지 우리 동네 안전 점수를 직관적으로 안내합니다.

### 3. 🚨 위험 신고 (시민 참여)
가로등 고장, CCTV 사각지대, 위험 시설물 등을 발견하면 사진과 함께 GPS 기반으로 신고하여, 이웃들과 실시간으로 안전 정보를 공유합니다.

### 4. 🌙 안심 귀가 모드 & 👶 아이 안전 모드
- **안심 귀가:** 늦은 밤 귀가 시 원터치로 지인에게 실시간 위치를 공유하고, 도착 및 미도착 시 자동 푸시 알림을 발송합니다.
- **아이 안전:** 아이의 등하원 경로 상에 있는 위험 요소를 사전에 체크하고, 스쿨존 및 범죄 주의 구간 진입 시 보호자에게 알려줍니다.

---

## 🛠 기술 스택 (Tech Stack)

### Frontend
- **Framework:** React (Vite)
- **Styling:** Vanilla CSS (커스텀 디자인 시스템)
- **Map:** 카카오맵 JavaScript SDK API

### Backend & Auth
- **BaaS:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (소셜 로그인 지원)
- **Push Notification:** Firebase Cloud Messaging (FCM)

### Deployment
- **Hosting:** Vercel

---

## 🚀 시작하기 (Getting Started)

### 사전 요구사항
* Node.js (v18 이상 권장)
* npm 또는 yarn
* 카카오맵 API 키 (발급: [Kakao Developers](https://developers.kakao.com/))
* Supabase 프로젝트 URL 및 Anon Key

### 설치 및 실행

1. 저장소 클론
```bash
git clone https://github.com/MosslandOpenDevs/WayGuard.git
cd WayGuard
```

2. 패키지 설치
```bash
npm install
# 또는
yarn install
```

3. 환경 변수 설정
루트 디렉토리에 `.env` 파일을 생성하고 다음 값을 채워주세요.
```env
VITE_KAKAO_MAP_API_KEY=당신의_카카오맵_앱_키
VITE_SUPABASE_URL=당신의_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=당신의_SUPABASE_ANON_KEY
```

4. 개발 서버 실행
```bash
npm run dev
# 또는
yarn dev
```

---

## 🤝 기여 (Contributing)
안전 지킴이 프로젝트에 기여하고 싶으신가요? 버그 리포팅, 기능 제안, PR(Pull Request) 모두 환영합니다!

## 📄 라이선스 (License)
이 프로젝트는 MIT License를 따릅니다.
