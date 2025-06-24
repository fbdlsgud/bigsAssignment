# BIGS 게시판 Frontend 과제전형

안녕하세요.
이 프로젝트는 BIGS의 프론트엔드 개발자 과제 전형으로 제작한 게시판 웹 사이트입니다.
제공된 API 문서를 활용하여 **회원가입 / 로그인 / 게시글 CRUD** 기능을 구현하였습니다.

---

## 👨🏻‍🔧기술 스택

- **React (Vite 기반)**
- **React Router**
- **Axios**
- **Styled-components**
- **CSS module**

---

## 🔧프로젝트 실행 방법

### 1. 프로젝트 클론
```bash
git clone https://github.com/fbdlsgud/bigsAssignment.git
```

### 2. 폴더 이동
```bash
cd bigsAssignment
```

### 3. 프로젝트 설치
```bash
npm install
```

### 4. .env 파일 생성
- 루트 경로에 아래와 같이 .env 파일을 생성해주세요. (.env.example 파일 참조)
```bash
VITE_API_URL=https://front-mission.bigs.or.kr
```

### 5. 서버 실행 ( 포트 : 3000 )
```bash
npm run dev
```

---

## 🗂️폴더 구조
<pre><code>
src/
├── api/              # Axios 인스턴스 
├── components/       # 공통 및 페이지 별 UI 컴포넌트들 (Button, Input 등)
├── context/          # 전역 상태관리 (AuthContext)
├── layout/          # 전체 레이아웃 컴포넌트(Header / Footer 포함)
├── pages/            # 라우팅되는 주요 페이지 컴포넌트
├── routes/            # 라우팅 처리 컴포넌트
├── utils/            # 날짜 포맷 유틸 함수
├── App.jsx
└── main.jsx
</code></pre>


## 🔖구현 기능

- 회원
  - 회원가입(유효성 검사 포함)
  - 로그인 (JWT 발급 및 저장)
  - 로그인 상태 유지 (Contest API 사용)
  - 사용자 이름,이메일 표시 (jwt-decode 사용해 토큰 디코딩)

* 게시판
  - 글 작성 (카테고리, 이미지 첨부 가능)
  - 글 목록 조회 (페이지네이션 처리, 정렬 기능 포함)
  - 게시글 상세 보기
  - 게시글 수정 (기존이미지 삭제 및 변경, 미리보기 처리)
  - 게시글 삭제

---




## 🔖기타 구현 참고 사항

- 글 수정 중 이미지 삭제 처리

  - 게시글 수정 시 기존 이미지를 제거하는 기능은 API 문서에 별도로 명시되어 있지 않아,
    `empty.jpg` 이름의 빈 File 객체를 생성해 서버로 전송하는 방식으로 구현하였습니다.

- 정렬 기능
  - 게시글 목록을 최신순으로 정렬할 때는 Spring에서 기본 제공하는 정렬 쿼리 `?sort=createdAt,desc` 를 활용하였습니다.




## 💫개발 중 트러블 슈팅

- CORS 에러


  - 발단 : 개발 초기에는 Vite를 사용하였으며,
    Vite의 장점인 빠른 초기 빌드 속도와 핫 리로드로 인해 개발 중 빠른 피드백이 가능하다는 점에서 선택했습니다.


  - 문제 : 하지만 회원가입 API 호출 시 401 Unauthorized 에러가 발생했고,
    에러 메시지의 상세 내용을 받아오기 위해 catch 블록에서 err.response.data.username 값을 확인하려 했지만,
    CORS 정책으로 인해 응답조차 받아올 수 없는 상황이 발생했습니다.


  - 원인 및 해결 : 이를 해결하기 위해 테스트 API 서버(https://front-mission.bigs.or.kr) 에서
    허용된 origin이 http://localhost:3000 만 등록되어 있는 것으로 판단하였고,
    이에 따라 Vite 개발 서버의 포트를 3000으로 직접 지정하여 문제를 해결했습니다.




## 💻 설치한 주요 라이브러리

```bash
npm create vite@latest #vite 기반 React 프로젝트 생성

npm install styled-components # 스타일 컴포넌트

npm install react-router-dom # 라우팅

npm install axios # API 호출

npm install jwt-decode # JWT 디코딩용

npm install react-spinners --save # 로딩 스피너
```





## 과제를 진행하며 느낀 점
- 해당 과제를 진행하며, JWT 기반 인증 처리, Axios 인터셉터 설정 등 실무에서 자주 쓰이는 기능들을 직접 구현해볼 수 있는 좋은 경험이었습니다. 특히 Axios의 `interceptors` 기능을 통해, 매 요청마다 토큰을 자동으로 삽입하거나, 에러 발생 시 토큰을 재발급받는 로직을 구현한 과정은 처음 접하는 개념이라 어려웠지만, 여러 기술 블로그와 공식 문서를 참고하며 구현하면서 스스로의 부족함을 느끼는 동시에 많은 성장을 할 수 있는 기회가 되었습니다.

- React에서 폴더 구조를 어떻게 나눌지, 어떤 역할을 각 컴포넌트에 부여해야 할지 고민하며 프로젝트 구조화에 대한 감각을 키울 수 있었습니다.

- 국비 교육 과정에선 API 명세서나 Postman 을 활용하여 개발을 해본 적이 없어, 이번 과제를 통해 실제 API 문서를 바탕으로 기능을 구현하고, Postman으로 요청을 테스트하며 클라이언트와 서버 간의 연결을 다뤄보는 경험은 프론트엔드 개발자를 꿈꾸는 저에게 더 넓은 시야를 갖게 해주었고, 실무에 한 걸음 더 다가갈 수 있었던 의미있는 경험이었습니다.
