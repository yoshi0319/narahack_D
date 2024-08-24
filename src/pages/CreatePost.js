import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import styles from '../styles/createPost_css.module.css';
import defaultImage from '../images/defaultImage.png';

const temples = 'temples';
const shrines = 'shrines';
const restaurants = 'restaurants';
const souvenirs = 'souvenirs';
const museums = 'museums';
const others = 'others';

export default function CreatePost() {
    const [title, setTitle] = useState({
        title_name: 'タイトル'
    });
    const [category, setCategory] = useState({
        category_name: temples
    });
    const [explanation, setExplanation] = useState({
        explanation_name: '説明(５００文字以内）'
    });
    const [mainImage, setMainImage] = useState(defaultImage); // 初期値をdefaultImageに設定
    const [imageSelected, setImageSelected] = useState(false); // 画像選択の状態管理

    const handleTitle = e => {
        setTitle({
            ...title,
            [e.target.name]: e.target.value
        });
    };

    const handleCategory = e => {
        setCategory({
            ...category,
            category_name: e.target.value
        });
    };

    const handleExplanation = e => {
        setExplanation({
            ...explanation,
            explanation_name: e.target.value
        });
    };

    const onFileInputChange = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setMainImage(defaultImage);
            setImageSelected(false);
            return;
        }
        const fileObject = e.target.files[0];
        setMainImage(URL.createObjectURL(fileObject));
        setImageSelected(true);
    };

    const Show = () => {
        console.log(`postTitle: ${title.title_name}`);
        console.log(`category: ${category.category_name}`);
        console.log(`explanation: ${explanation.explanation_name}`);
        console.log(`mainImage: ${mainImage}`);
    };

    return (
        <>
            <br></br>
            <br></br>
            <br></br>
            <div className={styles.default}>
                {!imageSelected ? (
                    <div className={styles.inputImageContainer}>
                        <p className={styles.labelText}>画像ファイルを選択してください</p>
                        <input type="file" accept="image/*" onChange={onFileInputChange} className="pl-4" />
                    </div>
                ) : (
                    <div className={styles.imageDisplayContainer}>
                        <img
                            src={mainImage}
                            alt="選択された画像"
                            className={styles.selectedImage}
                        />
                    </div>
                )}
            </div>
            <div className={styles.titleFieldContainer}>
                <form>
                    <TextField
                        id="title"
                        name="title_name"
                        value={title.title_name}
                        onChange={handleTitle}
                        label="タイトルを入力してください"
                        multiline
                        rows={1}
                        className={styles.titleField}
                    />
                </form>
            </div>

            <div className={styles.categoryContainer}>
                <FormControl sx={{ m: 1, minWidth: 120 }} className={styles.categoryField}>
                    <InputLabel id="category-label">カテゴリー</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        name="category_name"
                        value={category.category_name}
                        label="カテゴリー"
                        onChange={handleCategory}
                    >
                        <MenuItem value="">
                            <em>選択してください</em>
                        </MenuItem>
                        <MenuItem value={temples}>寺院</MenuItem>
                        <MenuItem value={shrines}>神社</MenuItem>
                        <MenuItem value={restaurants}>飲食店</MenuItem>
                        <MenuItem value={souvenirs}>お土産</MenuItem>
                        <MenuItem value={museums}>資料館</MenuItem>
                        <MenuItem value={others}>その他</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className={styles.explanationContainer}>
                <TextField
                    id="explanation"
                    name="explanation_name"
                    value={explanation.explanation_name}
                    onChange={handleExplanation}
                    label="説明欄"
                    multiline
                    className={styles.explanationField}
                    rows={10}
                />
            </div>
            <div className={styles.sendButtonContainer}>
                <Button
                    variant="contained"
                    onClick={Show}
                    endIcon={<SendIcon />}
                    sx={{
                        backgroundColor: '#B1FFDA',
                        '&:hover': {
                            backgroundColor: '#9FEFCC',
                        }
                    }}
                >
                    送信
                </Button>
            </div>
        </>
    );
}
