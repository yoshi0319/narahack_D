import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import styles from '../styles/createPost_css.module.css';
import Header from './header';
import Hooter from './Hooter';


// import defaultImage from '../images/defaultImage.png';

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
    const [mainImage, setMainImage] = useState(null);
    const [imageSelectedMain, setImageSelectedMain] = useState(false);

    const [subImage1, setSubImage1] = useState(null);
    const [imageSelectedSub1, setImageSelectedSub1] = useState(false);

    const [subImage2, setSubImage2] = useState(null);
    const [imageSelectedSub2, setImageSelectedSub2] = useState(false);


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
            setImageSelectedMain(false);
            return;
        }
        const fileObject = e.target.files[0];
        setMainImage(URL.createObjectURL(fileObject));
        setImageSelectedMain(true);
    };

    const onFileInputChangeSub1 = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSubImage1(defaultImage);
            setImageSelectedSub1(false);
            return;
        }
        const fileObject = e.target.files[0];
        setSubImage1(URL.createObjectURL(fileObject));
        setImageSelectedSub1(true);
    };

    const onFileInputChangeSub2 = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSubImage2(defaultImage);
            setImageSelectedSub2(false);
            return;
        }
        const fileObject = e.target.files[0];
        setSubImage2(URL.createObjectURL(fileObject));
        setImageSelectedSub2(true);
    };

    const Show = () => {
        console.log(`postTitle: ${title.title_name}`);
        console.log(`category: ${category.category_name}`);
        console.log(`explanation: ${explanation.explanation_name}`);
        console.log(`mainImage: ${mainImage}`);
        console.log(`mainImage: ${subImage1}`);
        console.log(`mainImage: ${subImage2}`);
    };

    return (
        <>
            <Header />
            <br></br>
            <br></br>
            <br></br>
            <div>
                {!imageSelectedMain ? (
                    <div className={styles.default}>
                        <div className={styles.inputImageContainer}>
                            <p className={styles.labelText}>画像ファイルを選択してください</p>
                            <input type="file" accept="image/*" onChange={onFileInputChange} className="pl-4" />
                        </div>
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
            <hr className={styles.line}></hr>
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
            <div className={styles.slideContainer}>
                <div>
                    {!imageSelectedSub1 ? (
                        <div className={styles.default}>
                            <div className={styles.inputImageContainer}>
                                <p className={styles.labelText}>画像ファイルを選択してください</p>
                                <input type="file" accept="image/*" onChange={onFileInputChangeSub1} className="pl-4" />
                            </div>
                        </div>
                    ) : (
                        <div className={`${styles.imageDisplayContainer} ${styles.imageWrapper}`}>
                            <img
                                src={subImage1}
                                alt="選択された画像"
                                className={styles.selectedImage}
                            />
                        </div>
                    )}
                </div>
                <div>
                {!imageSelectedMain ? (
                    <div className={styles.default}>
                        <div className={styles.inputImageContainer}>
                            <p className={styles.labelText}>画像ファイルを選択してください</p>
                            <input type="file" accept="image/*" onChange={onFileInputChange} className="pl-4" />
                        </div>
                    </div>
                ) : (
                    <div className={`${styles.imageDisplayContainer} ${styles.imageWrapper}`}>
                        <img
                            src={mainImage}
                            alt="選択された画像"
                            className={styles.selectedImage}
                        />
                    </div>
                )}
            </div>
                <div>
                    {!imageSelectedSub2 ? (
                        <div className={styles.default}>
                            <div className={styles.inputImageContainer}>
                                <p className={styles.labelText}>画像ファイルを選択してください</p>
                                <input type="file" accept="image/*" onChange={onFileInputChangeSub2} className="pl-4" />
                            </div>
                        </div>
                    ) : (
                        <div className={`${styles.imageDisplayContainer} ${styles.imageWrapper}`}>
                            <img
                                src={subImage2}
                                alt="選択された画像"
                                className={styles.selectedImage}
                            />
                        </div>
                    )}
                </div>
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
            <br></br>
            <Hooter />
        </>
    );
}
