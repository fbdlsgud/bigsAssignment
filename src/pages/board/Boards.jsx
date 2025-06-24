import { useEffect, useState } from "react";

import styles from "./Boards.module.css";
import instance from "../../api/axiosInstance";
import Title from "../../components/common/Title";
import { formatDateTime } from "../../utils/formatDateTime";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/common/Loading";

export default function Boards() {
  const [boardList, setBoardList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  const [sortedOption, setSortedOption] = useState("");
  const [sortedStatus, setSortedStatus] = useState(false);

  const navigate = useNavigate();

  // 정렬 상태 토글
  const sortedSwitch = () => {
    setSortedStatus((prev) => !prev);
  };

  // 정렬 옵션 변경 시 페이지를 0으로 초기화
  useEffect(() => {
    setSortedOption(sortedStatus ? "&sort=createdAt,desc" : "");
    setPage(0);
  }, [sortedStatus]);

  // 카테고리 스타일 클래스명 반환
  const categoryColor = (category) => {
    switch (category) {
      case "NOTICE":
        return styles.notice;
      case "FREE":
        return styles.free;
      case "QNA":
        return styles.qna;
      case "ETC":
        return styles.etc;
    }
  };

  // 카테고리 한글로 변환
  const categoryToKorean = (category) => {
    switch (category) {
      case "NOTICE":
        return "공지";
      case "FREE":
        return "자유";
      case "QNA":
        return "Q&A";
      case "ETC":
        return "기타";
    }
  };

  // 보드 데이터 불러오기
  useEffect(() => {
    const getBoardsList = async () => {
      setLoading(true);
      try {
        const res = await instance.get(
          `/boards?page=${page}&size=10${sortedOption}`
        );
        setBoardList(res.data.content);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.log(err);
        alert("목록을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."); 
      } finally {
        setLoading(false);
      }
    };
    getBoardsList();
  }, [page, sortedOption]);
 


  const prevHandler = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const nextHandler = () => {
    if (page < totalPages - 1) setPage((prev) => prev + 1);
  };


  return (
    <div className={styles.boardContainer}>
      {/* 데이터 로딩 중일 시 로딩 스피너 표시 */}
      {loading && <Loading />}

      {/* 게시판 제목 */}
      <Title>Bigs Board</Title>

      {/* 정렬 버튼 & 글쓰기 버튼 */}
      <div className={styles.topBtnGrb}>
        <button className={styles.sortButton} onClick={sortedSwitch}>
          {sortedStatus ? "오래된 순으로 정렬" : "최신 순으로 정렬"}
        </button>
        <button
          className={styles.writeButton}
          onClick={() => {
            navigate("/write");
          }}
        >
          글 쓰기 ✏️
        </button>
      </div>

      {/* 보드 목록 헤더 */}
      <div className={`${styles.header} ${styles.row}`}>
        <span className={styles.cell}>No</span>
        <span className={styles.cell}>제목</span>
        <span className={styles.cell}>카테고리</span>
        <span className={styles.cell}>작성일</span>
      </div>

      {/* 게시글이 없는 경우 */}
      {boardList.length === 0 ? (
        <div className={styles.empty}>
          <p>아직 작성된 글이 없습니다.</p>
        </div>
      ) : (
        // 게시글 목록
        boardList.map((item) => {
          return (
            <Link
              to={`/boards/${item.id}`}
              key={item.id}
              className={styles.row}
            >
              <span className={styles.cell}>{item.id}</span>
              <span className={styles.cell}>{item.title}</span>
              <span
                className={`${styles.cell} ${categoryColor(item.category)}`}
              >
                {categoryToKorean(item.category)}
              </span>
              <span className={styles.cell}>
                {formatDateTime(item.createdAt)}
              </span>
            </Link>
          );
        })
      )}

      {/* 페이지 버튼 */}
      <div className={styles.page}>
        <button
          onClick={prevHandler}
          className={styles.btn}
          disabled={page === 0} // 첫 페이지면 비활성화
        >
          이전
        </button>
        <span>
          {page + 1}/{totalPages}
        </span>
        <button
          onClick={nextHandler}
          className={styles.btn}
          disabled={page >= totalPages - 1} // 마지막 페이지면 비활성화
        >
          다음
        </button>
      </div>
    </div>
  );
}
