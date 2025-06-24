# BIGS 게시판 Frontend 과제전형

안녕하세요.
이 프로젝트는 BIGS의 프론트엔드 개발자 과제 전형으로 제작한 게시판 웹 사이트입니다.
제공된 API 문서를 활용하여 **회원가입 / 로그인 / 게시글 CRUD 기능을 구현하였습니다.

---

## 기술 스택
- **React**
- **React Router**
- **Axios**
- **Styled-components**
- **CSS-module**

---

## 프로젝트 실행 방법
```bash
# 1. 프로젝트 설치
npm install

# 2. 서버 실행
npm run dev
```


## 구현 기능
- 회원
    회원가입(유효성 검사 포함)
    로그인 및 JWT 기반 인증
    로그인 상태 유지 (Contest API 사용)
    사용자 이름,이메일 표시 (jwt-decode 사용)

- 게시판
    글 작성 (카테고리, 이미지 첨부 가능)
    글 목록 조회 (페이지네이션 처리, )
    게시글 상세 보기
    게시글 수정 (기존이미지 삭제 및 변경, 프리뷰이미지 설정)
    게시글 삭제

---

## 개발 중 트러블 슈팅
- CORS 에러
    개발 초기에는 Vite를 사용하였으며,
Vite의 장점인 빠른 초기 빌드 속도와 핫 리로드로 인해 개발 중 빠른 피드백이 가능하다는 점에서 선택했습니다.

하지만 회원가입 API 호출 시 401 Unauthorized 에러가 발생했고,
에러 메시지의 상세 내용을 받아오기 위해 catch 블록에서 err.response.data.username 값을 확인하려 했지만,
CORS 정책으로 인해 응답조차 받아올 수 없는 상황이 발생했습니다.

이를 해결하기 위해 테스트 API 서버(https://front-mission.bigs.or.kr)의 CORS 정책을 확인해본 결과,
허용된 origin이 http://localhost:3000만 등록되어 있는 것으로 판단하였고,
이에 따라 Vite 개발 서버의 포트를 3000으로 직접 지정하여 문제를 해결했습니다.






## 다운 받은거

npm create vite@latest

npm install styled-components

npm install react-router-dom

npm install axios  

npm install jwt-decode

npm install react-spinners --save





💡 개발 환경 및 CORS 이슈 해결 과정
