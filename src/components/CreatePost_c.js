  import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
  import CloseIcon from '@mui/icons-material/Close';
  import { styled } from '@mui/material/styles';
  import { useState } from "react";
  import LocationOnIcon from '@mui/icons-material/LocationOn';
  import styles from '@/styles/createPost_css.module.css';
  import { useRouter } from "next/router";

  const temples = 'temples';
  const shrines = 'shrines';
  const restaurants = 'restaurants';
  const souvenirs = 'souvenirs';
  const museums = 'museums';
  const others = 'others';

  const StyledDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: "16px", // 角を丸くするためのスタイル
    },
  }));


  // const postData_user = async (title, category, explanation, place) => { // ユーザーが入力したデータを受け取る
  //   const postData = {
  //     data: {
  //       title,
  //       category,
  //       explanation,
  //       place,
  //     },
  //   };
  //     try {
  //       const response = await fetch('/api/createPost', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(postData),
  //       });      
        
  //       console.log('Post data:', postData);

  //       if (response.ok) {
  //         const result = await response.json();
  //         console.log('Post created successfully:', result);
  //       } else {
  //         const errorData = await response.json(); // エラーメッセージを取得
  //         console.error('Failed to create post:', errorData.error); // エラーメッセージを出力
  //       }      
  //     } catch (error) {
  //       console.error('Error submitting post:', error);
  //     }
  //   };

  export default function CreatePost() {
    const router = useRouter();

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

    const [openPopup, setOpenPopup] = useState(true);

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

    // const submitPost = (e) => {      // この関数は、フォームの送信ボタンがクリックされたときに呼び出される
    //   e.preventDefault();

    //   if (!validateForm()) {
    //     return;

    //   } else {
    //     postData_user(title, category, explanation, place);
    //     console.log("submitted");
    //   };
    // };

  const submitPost = () => {
    if (!validateForm()) {
      return;
    } else {
    // テキストデータと画像データをlocalStorageに保存
    localStorage.setItem('postTitle', title); // title_nameではなく、titleをそのまま保存
    localStorage.setItem('postCategory', category); // category_nameではなく、categoryをそのまま保存
    localStorage.setItem('postExplanation', explanation); // explanation_nameではなく、explanationをそのまま保存
    localStorage.setItem('postPlace', place); // place_nameではなく、placeをそのまま保存
    localStorage.setItem('mainImage', mainImage);
    localStorage.setItem('subImage1', subImage1);
    localStorage.setItem('subImage2', subImage2);

    // ページ遷移
    router.push("/Tourist_Board_of_Nara/CreatePost/checkPost");
    }
  };


      return (
          <>
          <StyledDialog open={openPopup} onClose={() => setOpenPopup(false)}>
            <DialogTitle>ホームページ作成上の注意事項
              <IconButton
                aria-label="close"
                onClick={() => setOpenPopup(false)}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
          <DialogContent className={styles.popuplist}>
            <p>以下の注意事項をよく読んで、御投稿ください。</p>
            <ul>
              <li>投稿は、投稿者自身の責任において行ってください。</li>
              <li>投稿内容に係る苦情・異議申し立て、並びに、トラブルや損失、損害があった場合は、すべて投稿者の責任において対応してください。</li>
              <li>人物が明確に映っている写真を投稿する場合は、事前にその方の了承を得てください。人物が明確に写っている場合は、被写体の了解が得られているものとみなします。</li>
              <li>投稿にあたっては、次の事項を遵守してください。
              <p>  -他人が不快になる内容でないこと。</p>
              <p>  -他人の財産、プライバシー等を侵害するものでないこと。</p>
              <p>  -犯罪に結びつく、または助長させるものでないこと。</p>
              <p>  -暴言、卑猥な表現等、公序良俗に反するものでないこと。</p>
              <p>  -他人の名誉を毀損し、または他人を誹謗中傷するものでないこと。</p>
              <p>  -著作権など知的財産権を侵害しないこと。</p>
              <p>  -法令等に反するものでないこと。</p>
              </li>
              <li>投稿内容を管理者が確認するため、掲載されるまでに時間がかかる場合があります。</li>
              <li>投稿された情報は、奈良県内の観光魅力の広報活動に活用させていただくため、二次利用（複製・編集・上映・頒布）させていただく場合があります。</li>
              <li>投稿時に記載された個人情報は、本システム処理においてのみ利用し、本人の同意なくその他の目的で利用し、開示・公表することはありません。</li>
              <li>投稿者は、上記注意事項を承諾のうえ、投稿いただいたものとみなします。</li>
              <li>管理者は、上記注意事項に反していると判断したときは、投稿を掲載しない、又は投稿を削除する場合があります。</li>
            </ul>
          </DialogContent>
        </StyledDialog>
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
          </>
      );
  }