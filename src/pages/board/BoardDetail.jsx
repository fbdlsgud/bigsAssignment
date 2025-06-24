import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../api/axiosInstance";
import Loading from "../../components/common/Loading";

import styles from "./BoardDetail.module.css";
import { formatDateTime } from "../../utils/formatDateTime";
import Button from "../../components/common/Button";
import ConfirmModal from "../../components/common/ConfirmModal";

export default function BoardDetail() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const navigate = useNavigate();

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

  // 글 삭제 요청 후 boards 이동
  const delteHandler = async () => {
    try {
      await instance.delete(`/boards/${id}`);
      alert("삭제되었습니다");
      setModalVisible(false);
      navigate("/boards");
    } catch (err) {
      console.log(err);
    }
  };

  // 수정페이지 이동 핸들러
  const editNavHandler = () => {
    navigate(`/boards/${id}/edit`);
  };

  // 글 상제 정보 불러오기
  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await instance.get(`/boards/${id}`);
        setBoard(res.data);
      } catch (err) {
        console.log(err);
        alert("해당 글을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."); 
        navigate('/boards',{replace: true});
      }
    };

    getBoard();
  }, [id]);

  // 데이터 로딩 중일 때 로딩 컴포넌트 
  if (!board) return <Loading />;

  return (
    <>
      <div className={styles.detailContainer}>
        {/* 제목 */}
        <div className={styles.title}>{board.title}</div>

        {/* 카테고리 + 작성일 */}
        <div className={styles.infoBar}>
          <span className={categoryColor(board.boardCategory)}>
            {categoryToKorean(board.boardCategory)}
          </span>
          <span>{formatDateTime(board.createdAt)}</span>
        </div>

        {/* imageUrl 이 있거나, empty.jpg 일 경우 이미지 표시, 에러 발생 시 숨김 */}
        {board.imageUrl && !board.imageUrl.includes("empty.jpg") && (
          <img
            className={styles.image}
            src={`${import.meta.env.VITE_API_URL}${board.imageUrl}`}
            alt="이미지"
            onError={(e)=>e.target.style.display = "none"}
          />
        )}

        {/* 본문 내용 */}
        <div className={styles.content}>{board.content}</div>

        {/* 수정, 삭제 버튼 */}
        <div className={styles.btnGrb}>
          <Button $bg="#9ACD32" $hoverBg="#6B8E23" onClick={editNavHandler}>
            수정
          </Button>
          <Button
            $bg="#808080"
            $hoverBg="#696969"
            onClick={() => setModalVisible(true)}
          >
            삭제
          </Button>
        </div>

        {/* 삭제 확인 모달 */}
      </div>
      {modalVisible && (
        <ConfirmModal
          onClick={delteHandler}
          onClose={() => {
            setModalVisible(false);
          }}
        >
          해당 글을 삭제할까요?
        </ConfirmModal>
      )}
    </>
  );
}
