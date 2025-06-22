import { useEffect, useState } from "react";

import styles from "./Boards.module.css";
import instance from "../../api/axiosInstance";
import Title from "../../components/common/Title";
import { formatDateTime } from "../../utils/formatDateTime";
import { Link } from "react-router-dom";
import Loading from "../../components/common/Loading";

export default function Boards() {
  const [boardList, setBoardList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [sortedOption, setSortedOption] = useState("");
  const [sortedStatus, setSortedStatus] = useState(false);


  // 글 작성시간에 따른 분류
  const sortedSwitch = () => {
    setSortedStatus((prev)=> (!prev));

  }

  useEffect(()=>{
    setSortedOption(sortedStatus ? "&sort=createdAt,desc" : "");
    setPage(0);
  },[sortedStatus]);
  // 글 작성시간에 따른 분류 end



  // 카테고리 별 span 클래스네임 설정
  const categoryColor = (category) => {
    switch(category) {
        case "NOTICE": return styles.notice;
        case "FREE": return styles.free;
        case "QNA": return styles.qna;
        case "ETC": return styles.etc;
    }
  }



  // 보드데이터 불러오기
  useEffect(() => {
    const getBoardsList = async () => {
      try {
        const res = await instance.get(`/boards?page=${page}&size=10${sortedOption}`);
        setBoardList(res.data.content);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.log(err);
      }
    };
    getBoardsList();
  }, [page,sortedOption]);
  // 보드데이터 불러오기 end


  // 페이지 이동
  const prevHandler = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const nextHandler = () => {
    if ( page < totalPages -1 )setPage((prev) => prev + 1);
  };
  // 페이지 이동


  return (
    <div className={styles.boardContainer}>
      <Title>Bigs Board</Title>
      <button className={styles.sortButton} onClick={sortedSwitch}>{sortedStatus ? "오래된 순으로 정렬" : "최신 순으로 정렬"}</button>
      <div className={`${styles.header} ${styles.row}`}>
        <span className={styles.cell}>No</span>
        <span className={styles.cell}>제목</span>
        <span className={styles.cell}>카테고리</span>
        <span className={styles.cell}>작성일</span>
      </div>
      {boardList.length === 0 ? (
        <Loading />
      ) : (
        boardList.map((item) => {
          return (
            <Link to={`/boards/${item.id}`} key={item.id} className={styles.row}>
              <span className={styles.cell}>{item.id}</span>
              <span className={styles.cell}>{item.title}</span>
              <span className={`${styles.cell} ${categoryColor(item.category)}`}>{item.category}</span>
              <span className={styles.cell}>{formatDateTime(item.createdAt)}</span>
            </Link>
          );
        })
      )}
      <div className={styles.page}>
        <button onClick={prevHandler} className={styles.btn} disabled={page === 0}>이전</button>
        <span>{page+1}/{totalPages}</span>
        <button onClick={nextHandler} className={styles.btn} disabled={page >= totalPages - 1}>다음</button>
      </div>
    </div>
  );
}
