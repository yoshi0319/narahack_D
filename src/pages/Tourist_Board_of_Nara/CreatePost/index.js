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

const postData_user = async (title, category, explanation, place) => {
  const postData = {
    data: {
      title,
      category,
      explanation,
      place,
    },
  };
    try {
      const response = await fetch('/api/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      console.log('Post data:', postData);

      if (response.ok) {
        const result = await response.json();
        console.log('Post created successfully:', result);
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(temples);
  const [explanation, setExplanation] = useState('');
  const [place, setPlace] = useState('');
  
  const [mainImage, setMainImage] = useState(null);  
  const [imageSelectedMain, setImageSelectedMain] = useState(false);  
  const [subImage1, setSubImage1] = useState(null);  
  const [imageSelectedSub1, setImageSelectedSub1] = useState(false);  
  const [subImage2, setSubImage2] = useState(null);  
  const [imageSelectedSub2, setImageSelectedSub2] = useState(false);  

  const [errors, setErrors] = useState({
    title: '',
    category: '',
    explanation: '',
    place: '',
    mainImage: '',
    subImage1: '',
    subImage2: ''
  });

  const validateForm = () => {
    let hasErrors = false;
    const newErrors = {
      title: '',
      category: '',
      explanation: '',
      place: '',
      mainImage: '',
      subImage1: '',
      subImage2: ''
    };

    if (!title) {
      newErrors.title = 'タイトルは必須です';
      hasErrors = true;
    }
    if (!category) {
      newErrors.category = 'カテゴリーは必須です';
      hasErrors = true;
    }
    if (!explanation) {
      newErrors.explanation = '説明は必須です';
      hasErrors = true;
    }
    if (!place) {
      newErrors.place = '住所は必須です';
      hasErrors = true;
    }
    if (!imageSelectedMain) {
      newErrors.mainImage = 'メイン画像は必須です';
      hasErrors = true;
    }
    if (!imageSelectedSub1) {
      newErrors.subImage1 = 'サブ画像1は必須です';
      hasErrors = true;
    }
    if (!imageSelectedSub2) {
      newErrors.subImage2 = 'サブ画像2は必須です';
      hasErrors = true;
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleTitle = e => setTitle(e.target.value);
  const handleCategory = e => setCategory(e.target.value);
  const handleExplanation = e => setExplanation(e.target.value);
  const handlePlace = e => setPlace(e.target.value);

  const onFileInputChange = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setMainImage(null);
      setImageSelectedMain(false);
      return;
    }
    const fileObject = e.target.files[0];
    setMainImage(URL.createObjectURL(fileObject));
    setImageSelectedMain(true);
  };

  const onFileInputChangeSub1 = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSubImage1(null);
      setImageSelectedSub1(false);
      return;
    }
    const fileObject = e.target.files[0];
    setSubImage1(URL.createObjectURL(fileObject));
    setImageSelectedSub1(true);
  };

  const onFileInputChangeSub2 = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSubImage2(null);
      setImageSelectedSub2(false);
      return;
    }
    const fileObject = e.target.files[0];
    setSubImage2(URL.createObjectURL(fileObject));
    setImageSelectedSub2(true);
  };

  const submitPost = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;

    } else {
      postData_user(title, category, explanation, place);
      console.log("submitted");
    };
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
                            <input type="file"
                                accept="image/*"
                                id="mainImage"
                                name="mainImage"
                                onChange={onFileInputChange}
                                className="pl-4" />
                        </div>
                        {errors.mainImage && <p className={styles.errorText}>{errors.mainImage}</p>}
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
                        value={title}
                        onChange={handleTitle}
                        label="タイトルを入力してください"
                        multiline
                        rows={1}
                        className={styles.titleField}
                    />
                    {errors.title && <p className={styles.errorText}>{errors.title}</p>}
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
                        value={category}
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
                    {errors.category && <p className={styles.errorText}>{errors.category}</p>}
                </FormControl>
            </div>
            <hr className={styles.line}></hr>
            <div className={styles.explanationContainer}>
                <TextField
                    id="explanation"
                    name="explanation_name"
                    value={explanation}
                    onChange={handleExplanation}
                    label="説明欄"
                    multiline
                    className={styles.explanationField}
                    rows={10}
                />
                {errors.explanation && <p className={styles.errorText}>{errors.explanation}</p>}
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
                            {errors.subImage1 && <p className={styles.errorText}>{errors.subImage1}</p>}
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
                            {errors.mainImage && <p className={styles.errorText}>{errors.mainImage}</p>}
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
                            {errors.subImage2 && <p className={styles.errorText}>{errors.subImage2}</p>}
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
                        value={place}
                        onChange={handlePlace}
                        label="住所を入力してください"
                        multiline
                        rows={1}
                        className={styles.placeField}
                    />
                    {errors.place && <p className={styles.errorText}>{errors.place}</p>}
                </form>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={submitPost}
                    sx={{
                        backgroundColor: '#9CD8AB',
                        color: '#000',
                        opacity: 0.9,
                        '&:hover': {
                            backgroundColor: '#86C499',
                        }
                    }}>
                    確認へ
                </Button>
            </div>
            <br></br>
            <Footer />
        </>
    );
}
