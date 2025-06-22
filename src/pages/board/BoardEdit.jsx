import { useEffect, useState } from "react";
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
  const [file, setFile] = useState("");
  const [categoryOpt, setCategoryOpt] = useState([]);
  
  const [previewImg, setPreviewImg] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await instance.get(`/boards/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setCategory(res.data.boardCategory);

        if(res.data.imageUrl) {
            setPreviewImg(`${import.meta.env.VITE_API_URL}${res.data.imageUrl}`);
        }

      } catch (err) {
        console.log(err);
      }
    };

    getBoard();
  }, [id]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await instance.get("/boards/categories");
        const categories = Object.entries(res.data).map(([value, label]) => ({value,label}));
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
      const res = await instance.patch(`/boards/${id}`, formData);

      alert("글 수정이 완료되었습니다.");
      navigate(`/boards/${id}`);
    } catch (err) {
      alert("알 수 없는 오류로 글 작성에 실패하였습니다. 다시 시도해주세요");
    }
  };


  return (
    <div className={styles.editContainer}>
      <form onSubmit={onSubmit}  className={styles.editForm}>
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
        <input type="file" onChange={(e) => {const newFile = e.target.files[0]; if (newFile) { setFile(newFile); setPreviewImg(URL.createObjectURL(newFile));}}} />
        {previewImg && <img className={styles.image} src={previewImg}/>}
        <Button type="submit">수정하기</Button>
      </form>
    </div>
  );
}
