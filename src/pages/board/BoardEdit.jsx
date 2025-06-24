import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import BoardInput from "../../components/board/BoardInput";
import BoardTextArea from "../../components/board/BoardTextArea";
import BoardSelect from "../../components/board/BoardSelect";
import Button from "../../components/common/Button";

import styles from "./BoardEdit.module.css";
import instance from "../../api/axiosInstance";

export default function BoardEdit() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [categoryOpt, setCategoryOpt] = useState([]);

  const [previewImg, setPreviewImg] = useState("");

  const fileRef = useRef();// 파일 접근용 ref

  const navigate = useNavigate();


  // 게시글 내용 불러오기
  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await instance.get(`/boards/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setCategory(res.data.boardCategory);

        // 기존 imageUrl 있을시 이미지 미리보기 세팅
        if (res.data.imageUrl && !res.data.imageUrl.includes("empty.jpg")) {
          setPreviewImg(`${import.meta.env.VITE_API_URL}${res.data.imageUrl}`);
        } else {
          setPreviewImg("")
        }
      } catch (err) {
        console.log(err);
        alert("해당 글을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."); 
      }
    };

    getBoard();
  }, [id]);

  // 카테고리 옵션 불러오기
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await instance.get("/boards/categories");
        const categories = Object.entries(res.data).map(([value, label]) => ({
          value,
          label,
        }));
        setCategoryOpt(categories);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  // 수정 제출 핸들러
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !category) {
      alert("모든 항목을 입력해주세요!");
      return;
    }

    const formData = new FormData();
    const request = { title, content, category };

    formData.append(
      "request",
      new Blob([JSON.stringify(request)], { type: "application/json" })
    );

    if (file) {
      formData.append("file", file);
    }

    try {
      const res = await instance.patch(`/boards/${id}`, formData);

      alert("글 수정이 완료되었습니다.");
      navigate("/boards", { replace: true });
      navigate(`/boards/${id}`);
    } catch (err) {
      alert("알 수 없는 오류로 글 작성에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  // 이미지 제거 핸들러
  const deleteImg = () => {
    setFile(new File([], "empty.jpg")); // 빈 파일로 대체
    setPreviewImg(""); // 미리보기 제거

    if (fileRef.current) {
      fileRef.current.value = ""; //기존 파일 있을 시 초기화
    }
  };

  return (
    <div className={styles.editContainer}>
      <form onSubmit={onSubmit} className={styles.editForm}>
        <BoardInput
          label="제목"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <BoardTextArea
          label="내용"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <BoardSelect
          label="카테고리"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={categoryOpt}
        />

        {/* 이미지 제거 버튼 */}
        <button type="button" onClick={deleteImg}>
          이미지 지우기
        </button>

        {/* 파일 업로드 */}
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => {
            const newFile = e.target.files[0];
            if (newFile) {
              setFile(newFile);
              setPreviewImg(URL.createObjectURL(newFile));
            }
          }}
        />

        {/* 이미지 미리보기 */}
        {previewImg && (
          <img
            className={styles.image}
            onError={(e) => (e.target.style.display = "none")}
            src={previewImg}
          />
        )}
        <Button type="submit">수정하기</Button>
      </form>
    </div>
  );
}
