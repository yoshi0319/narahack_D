import { useEffect, useState } from 'react';
import styles from '@/styles/checkPost_css.module.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function CheckPost() {
    const router = useRouter();
    const [postTitle, setPostTitle] = useState('');
    const [postCategory, setPostCategory] = useState('');
    const [postCategory_Eng, setPostCategory_Eng] = useState('');
    const [postExplanation, setPostExplanation] = useState('');
    const [postPlace, setPostPlace] = useState('');
    const [mainImage, setMainImage] = useState(null);
    const [subImage1, setSubImage1] = useState(null);
    const [subImage2, setSubImage2] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const conversionCategory = (category) => {
        switch (category) {
            case 'temples':
                setPostCategory('寺院');
                setPostCategory_Eng('temples');
                break;
            case 'shrines':
                setPostCategory('神社');
                setPostCategory_Eng('shrines');
                break;
            case 'restaurants':
                setPostCategory('飲食店');
                setPostCategory_Eng('restaurants');
                break;
            case 'souvenirs':
                setPostCategory('お土産');
                setPostCategory_Eng('souvenirs');
                break;
            case 'museums':
                setPostCategory('資料館');
                setPostCategory_Eng('museums');
                break;
            case 'others':
                setPostCategory('その他');
                setPostCategory_Eng('others');
                break;
        }
    };

    const Ok_create = async () => {
        try {
            const formData = new FormData();

            console.log({ postTitle });
            console.log({ postCategory });
            console.log({ postExplanation });
            console.log({ postPlace });

            if (mainImage) {
                const imageBlob = await fetch(mainImage).then(r => r.blob());
                console.log('Image Blob:', imageBlob);
            }

            const userId = Cookies.get("userId");
            console.log("userId:", userId);

            formData.append('title', postTitle);
            formData.append('category', postCategory);
            formData.append('explanation', postExplanation);
            formData.append('place', postPlace);
            formData.append('userId', userId);

            if (mainImage) formData.append('mainImage_post', await fetch(mainImage).then(r => r.blob()));
            if (subImage1) formData.append('sub1Image_post', await fetch(subImage1).then(r => r.blob()));
            if (subImage2) formData.append('sub2Image_post', await fetch(subImage2).then(r => r.blob()));

            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            const response = await fetch('/api/create-post', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            console.log(result);
            router.push(`/Tourist_Board_of_Nara/${postCategory_Eng}`);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        setPostTitle(sessionStorage.getItem('postTitle'));
        setPostCategory(sessionStorage.getItem('postCategory'));
        setPostExplanation(sessionStorage.getItem('postExplanation'));
        setPostPlace(sessionStorage.getItem('postPlace'));
        setMainImage(sessionStorage.getItem('mainImage'));
        setSubImage1(sessionStorage.getItem('subImage1'));
        setSubImage2(sessionStorage.getItem('subImage2'));
    }, []);

    useEffect(() => {
        conversionCategory(postCategory);
    }, [postCategory]);

    const handleCreatePage = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = (confirm) => {
        setOpenDialog(false);
        if (confirm) {
            Ok_create();
        }
    };

    const submitPost = () => {
        router.push("/Tourist_Board_of_Nara/CreatePost");
    };

    return (
        <>
            <div className={styles.mainImage}>
                <img src={mainImage} alt="メイン画像" />
            </div>
            <div>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>
                        <h1>{postTitle}</h1>
                    </div>
                    <div className={styles.category}>
                        <p>カテゴリ：{postCategory}</p>
                    </div>
                </div>
                <hr className={styles.line}></hr>
                <div className={styles.explanation}>
                    <p>{postExplanation}</p>
                </div>
            </div>
            <div className={styles.slideContainer}>
                <div className={styles.imageWrapper}><img src={subImage1} alt="サブ画像１" /></div>
                <div className={styles.imageWrapper}><img src={mainImage} alt="メイン画像" /></div>
                <div className={styles.imageWrapper}><img src={subImage2} alt="サブ画像２" /></div>
            </div>
            <div>
                <div className={styles.placeContainer}>
                    <LocationOnIcon />
                    <p>{postPlace}</p>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.backButton}>
                        <Button
                            onClick={submitPost}
                            variant="contained"
                            color="grey"
                            sx={{
                                backgroundColor: '#B0B0B0',
                                color: '#000',
                                opacity: 0.9,
                                fontFamily: "'Klee One', sans-serif",
                                padding: '10px 6px',
                                fontSize: '1.5rem',
                                width: '10rem',
                                height: '3rem',
                                '&:hover': {
                                    backgroundColor: '#A0A0A0',
                                }
                            }}>
                            編集に戻る
                        </Button>
                    </div>
                    <div className={styles.createButton}>
                        <Button
                            variant="contained"
                            color="grey"
                            onClick={handleCreatePage}
                            sx={{
                                backgroundColor: '#9CD8AB',
                                color: '#000',
                                opacity: 0.9,
                                fontFamily: "'Klee One', sans-serif",
                                padding: '10px 6px',
                                fontSize: '1.5rem',
                                width: '10rem',
                                height: '3rem',
                                '&:hover': {
                                    backgroundColor: '#A0A0A0',
                                }
                            }}>
                            確定
                        </Button>
                    </div>
                </div>
            </div>

            {/* カスタムダイアログ */}
            <Dialog
                open={openDialog}
                onClose={() => handleDialogClose(false)}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
                PaperProps={{
                    style: { borderRadius: 16, padding: '20px' }  // ダイアログの角を丸くしてパディングを追加
                }}
            >
                <DialogTitle className={styles.popuplist} id="confirm-dialog-title" sx={{
                    marginRight: 10,
                    marginLeft: 10,
                    marginTop: 10,
                    marginBottom: 5,
                    fontSize: 25,
                    fontFamily: "'Klee One', sans-serif",
                }}>この内容で投稿しますか？</DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}> {/* ボタンを中央に配置 */}
                <Button
                            onClick={() => handleDialogClose(false)}
                            className={styles.popup_button}
                            variant="contained"
                            color="grey"
                            sx={{
                                backgroundColor: '#B0B0B0',
                                color: '#000',
                                opacity: 0.9,
                                fontFamily: "'Klee One', sans-serif",
                                marginRight: 5,
                                '&:hover': {
                                    backgroundColor: '#A0A0A0',
                                }
                            }}>
                            キャンセル
                        </Button>
                        <Button
                            variant="contained"
                            color="grey"
                            onClick={() => handleDialogClose(true)}
                            className={styles.popup_button}
                            sx={{
                                backgroundColor: '#9CD8AB',
                                color: '#000',
                                opacity: 0.9,
                                fontFamily: "'Klee One', sans-serif",
                                marginLeft: 5,
                                padding: '6px 25px',
                                '&:hover': {
                                    backgroundColor: '#A0A0A0',
                                }
                            }}>
                            投稿する
                        </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
