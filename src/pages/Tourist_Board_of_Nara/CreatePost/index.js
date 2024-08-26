import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from '@/styles/createPost_css.module.css';

const temples = 'temples';
const shrines = 'shrines';
const restaurants = 'restaurants';
const souvenirs = 'souvenirs';
const museums = 'museums';
const others = 'others';

import Cookies from "js-cookie";
import Auth from "@/components/auth";

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
    const [place, setPlace] = useState({
        place_name: '住所'
    })
    const [mainImage, setMainImage] = useState(null);
    const [imageSelectedMain, setImageSelectedMain] = useState(false);

    const [subImage1, setSubImage1] = useState(null);
    const [imageSelectedSub1, setImageSelectedSub1] = useState(false);

    const [subImage2, setSubImage2] = useState(null);
    const [imageSelectedSub2, setImageSelectedSub2] = useState(false);

    const [mainImage_post, setMainImage_post] = useState(null);
    const [sub1Image_post, setsub1Image_post] = useState(null);
    const [sub2Image_post, setsub2Image_post] = useState(null);

    // const signedIn = Cookies.get("signedIn"); // クッキーからsignedInの値を取得
    // console.log("Signed In Status:", signedIn);

    ///////////////
    const postData = async () => {
        try {
            const formData = new FormData();
            // formData.append('link_User_id', '1');
            formData.append('title', title.title_name);
            formData.append('category', category.category_name);
            formData.append('explanation', explanation.explanation_name);
            formData.append('place', place.place_name);

            // if (mainImage_post) formData.append('mainImage_post', mainImage_post);
            // if (sub1Image_post) formData.append('sub1Image_post', sub1Image_post);
            // if (sub2Image_post) formData.append('sub2Image_post', sub2Image_post);

            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            
            const response = await fetch('/api/create-post', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };


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

    const handlePlace = e => {
        setPlace({
            ...place,
            [e.target.name]: e.target.value
        });
    };

    const onFileInputChange = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setMainImage(defaultImage);
            setMainImage_post(null); //仮追加
            setImageSelectedMain(false);
            return;
        }
        const fileObject = e.target.files[0];
        setMainImage(URL.createObjectURL(fileObject));
        setMainImage_post(fileObject); //仮追加
        setImageSelectedMain(true);
    };

    const onFileInputChangeSub1 = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSubImage1(defaultImage);
            setsub1Image_post(null); //仮追加
            setImageSelectedSub1(false);
            return;
        }
        const fileObject = e.target.files[0];
        setSubImage1(URL.createObjectURL(fileObject));
        setsub1Image_post(fileObject); //仮追加
        setImageSelectedSub1(true);
    };

    const onFileInputChangeSub2 = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSubImage2(defaultImage);
            setsub2Image_post(null); //仮追加
            setImageSelectedSub2(false);
            return;
        }
        const fileObject = e.target.files[0];
        setSubImage2(URL.createObjectURL(fileObject));
        setsub2Image_post(fileObject); //仮追加
        setImageSelectedSub2(true);
    };

    const Show = () => {
        console.log(`postTitle: ${title.title_name}`);
        console.log(`category: ${category.category_name}`);
        console.log(`explanation: ${explanation.explanation_name}`);
        console.log(`mainImage: ${mainImage}`);
        console.log(`subImage1: ${subImage1}`);
        console.log(`subImage2: ${subImage2}`);
        console.log('--------------------');
        console.log(`mainImage_post: ${mainImage_post}`); //仮追加
        console.log(`sub1Image_post: ${sub1Image_post}`); //仮追加
        console.log(`sub2Image_post: ${sub2Image_post}`); //仮追加
        console.log(`place: ${place.place_name}`);

        postData(); //仮追加
    };

    return (
        // <Auth>
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
                                <input type="file"
                                    accept="image/*"
                                    id="mainImage"
                                    name="mainImage"
                                    onChange={onFileInputChange}
                                    className="pl-4" />
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
                    <FormControl
                        sx={{ m: 1, minWidth: 120 }}
                        className={styles.categoryField}>
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
                                    <input type="file"
                                        accept="image/*"
                                        id="subImage1"
                                        name="subImage1"
                                        onChange={onFileInputChangeSub1}
                                        className="pl-4" />
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
                                <input type="file"
                                    accept="image/*"
                                    id="mainImage2"
                                    name="mainImage2"
                                    onChange={onFileInputChange}
                                    className="pl-4" />
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
                                    <input type="file"
                                        accept="image/*"
                                        id="subImage2"
                                        name="subImage2"
                                        onChange={onFileInputChangeSub2}
                                        className="pl-4" />
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
                <div className={styles.placeContainer}>
                    <LocationOnIcon sx={{ fontSize: 50}}/>
                    <div>
                    <form>
                        <TextField
                            id="place"
                            name="place_name"
                            value={place.place_name}
                            onChange={handlePlace}
                            label="住所を入力してください"
                            multiline
                            rows={1}
                            className={styles.placeField}
                        />
                    </form>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={Show}
                            sx={{
                                backgroundColor: '#9CD8AB',
                                color: '#000',
                                opacity: 0.9,
                                '&:hover': {
                                    backgroundColor: '#86C499',
                                }
                            }}>
                        確定へ
                    </Button>
                </div>
                <br></br>
                <Footer />
            </>
        // </Auth>
    );
}