#vite 사용
npm run dev

#axios 사용








## 다운 받은거

npm create vite@latest

npm install styled-components

npm install react-router-dom

npm install axios  

npm install jwt-decode





💡 개발 환경 및 CORS 이슈 해결 과정
개발 초기에는 Vite를 사용하였으며,
Vite의 장점인 빠른 초기 빌드 속도와 핫 리로드로 인해 개발 중 빠른 피드백이 가능하다는 점에서 선택했습니다.

하지만 회원가입 API 호출 시 401 Unauthorized 에러가 발생했고,
에러 메시지의 상세 내용을 받아오기 위해 catch 블록에서 err.response.data.username 값을 확인하려 했지만,
CORS 정책으로 인해 응답조차 받아올 수 없는 상황이 발생했습니다.

이를 해결하기 위해 테스트 API 서버(https://front-mission.bigs.or.kr)의 CORS 정책을 확인해본 결과,
허용된 origin이 http://localhost:3000만 등록되어 있는 것으로 판단하였고,
이에 따라 Vite 개발 서버의 포트를 3000으로 직접 지정하여 문제를 해결했습니다.