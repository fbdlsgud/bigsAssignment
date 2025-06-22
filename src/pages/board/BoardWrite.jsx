import { useEffect, useState } from "react";
import instance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

import styles from "./BoardWrite.module.css";

import BoardInput from "../../components/board/BoardInput";
import BoardTextArea from "../../components/board/BoardTextArea";
import BoardSelect from "../../components/board/BoardSelect";
import Button from "../../components/common/Button";

export default function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState("");
  const [categoryOpt, setCategoryOpt] = useState([]);

  const [previewImg, setPreviewImg] = useState("");

  const navigate = useNavigate();

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
      const res = await instance.post("/boards", formData);

      alert("글 작성이 완료되었습니다.");
      navigate("/boards");
    } catch (err) {
      alert("알 수 없는 오류로 글 작성에 실패하였습니다. 다시 시도해주세요");
    }
  };

  return (
    <div className={styles.writeContainer}>
      <form onSubmit={onSubmit} className={styles.writeForm}>
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
        <input
          type="file"
          onChange={(e) => {
            const pickFile = e.target.files[0];
            setFile(pickFile);
            if (pickFile) {
              setPreviewImg(URL.createObjectURL(pickFile));
            } else {
              setPreviewImg("");
            }
          }}
        />
        {previewImg && <img className={styles.image} src={previewImg} />}
        <Button type="submit">작성하기</Button>
      </form>
    </div>
  );
}
