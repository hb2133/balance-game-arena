# 밸런스 게임 아레나

회의 참가자들이 같은 화면에서 차례로 A/B 선택을 하고 팀의 취향 결과를 확인하는 캐주얼 밸런스 게임입니다.

## 실행 환경

- Node.js 20 이상
- npm

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

## 배포 전 검증

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## 주요 기능

- 2~8명 참가자 등록
- 기본 밸런스 질문 7개
- 참가자별 순차 A/B 투표
- 질문별 라운드 결과
- 만장일치와 가장 팽팽한 질문 통계
- 같은 멤버로 다시 시작
- 브라우저 `localStorage` 기반 게임 상태 유지
