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


  const editNavHandler = () => {
    navigate(`/boards/${id}/edit`);
  }

  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await instance.get(`/boards/${id}`);
        setBoard(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getBoard();
  }, [id]);

  if (!board) return <Loading />;

  return (
    <>
      <div className={styles.detailContainer}>
        <div className={styles.title}>{board.title}</div>

        <div className={styles.infoBar}>
          <span className={categoryColor(board.boardCategory)}>
            {board.boardCategory}
          </span>
          <span>{formatDateTime(board.createdAt)}</span>
        </div>

        {board.imageUrl && (
          <img
            className={styles.image}
            src={`${import.meta.env.VITE_API_URL}${board.imageUrl}`}
            alt="이미지"
          />
        )}

        <div className={styles.content}>{board.content}</div>

        <div className={styles.btnGrb}>
          <Button $bg="#9ACD32" $hoverBg="#6B8E23" onClick={editNavHandler}>수정</Button>
          <Button $bg="#808080" $hoverBg="#696969" onClick={() => setModalVisible(true)}>삭제</Button>
        </div>
      </div>
      {modalVisible && (
        <ConfirmModal
          onClick={delteHandler}
          onClose={() => {
            setModalVisible(false);
          }}
        >해당 글을 삭제할까요?</ConfirmModal>
      )}
    </>
  );
}
