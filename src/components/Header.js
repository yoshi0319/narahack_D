import Head from 'next/head';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import styles from '@/styles/header_css.module.css';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Dialog, DialogContent, DialogActions, ListItemButton, ListItemIcon, ListItemText, ListItem, Drawer, Box, List } from '@mui/material';

export default function Header() {
    const router = useRouter();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const showLogoutSuccess = Cookies.get("showLogoutSuccess");

        if (showLogoutSuccess === 'true') {
            setSnackbarMessage('ログアウトしました');
            setOpenSnackbar(true);
            Cookies.remove("showLogoutSuccess");
        }
    }, []);

    const signedIn = Cookies.get("signedIn") === 'true'; 
    console.log("Signed In Status:", signedIn);

    const handleGoBack = () => {
        router.back();
    };

    const handleLogout = () => {
        console.log("Logging out...");
        Cookies.remove("signedIn");
        Cookies.remove("userId");
        Cookies.set("showLogoutSuccess", 'true');
        router.push('/Tourist_Board_of_Nara');
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const [openLoginPrompt, setOpenLoginPrompt] = useState(false);

    const handleCreatePageClick = (e) => {
        e.preventDefault();
        if (!signedIn) {
            setOpenLoginPrompt(true);
        } else {
            router.push('/Tourist_Board_of_Nara/CreatePost');
        }
    };

    const handleCloseLoginPrompt = () => {
        setOpenLoginPrompt(false);
    };

    const handleLoginRedirect = () => {
        router.push('/Tourist_Board_of_Nara/login');
        handleCloseLoginPrompt();
    };

    const menu = [
        {title: 'ホーム', href: '/Tourist_Board_of_Nara', icon: HomeIcon},
        {title: 'ページ制作', href: '/Tourist_Board_of_Nara/CreatePost', icon: CreateIcon, onClick: handleCreatePageClick},
        signedIn
            ? {title: 'ログアウト', href: '#', icon: LogoutIcon, onClick: handleLogout}
            : {title: 'ログイン', href: '/Tourist_Board_of_Nara/login', icon: LoginIcon},
    ];

    const [show, setShow] = useState(false);

    const handleDraw = () => setShow(!show);
    
    return (
        <>
        <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <MuiAlert 
                    onClose={handleCloseSnackbar} 
                    severity="success" 
                    sx={{ width: '100%', borderRadius: '16px', backgroundColor: '#fff', color: '#000', fontFamily: "'Klee One', sans-serif", fontSize: '1.5rem', fontWeight: 'bold', border: '2px solid #000' }}
                >
                    {snackbarMessage}
                </MuiAlert>
        </Snackbar>

        <Dialog open={openLoginPrompt} onClose={handleCloseLoginPrompt} sx={{ '& .MuiPaper-root': { borderRadius: '16px' } }}>
            <DialogContent className={styles.popuplist}>ページを作成するにはログインが必要です。<br/>ログインページに移動しますか？</DialogContent>
            <DialogActions className={styles.dialogActionsCentered}>
                <Button className={styles.popupbutton_cancel} onClick={handleCloseLoginPrompt}>キャンセル</Button>
                <Button className={styles.popupbutton_next} onClick={handleLoginRedirect} color="primary">ログイン</Button>
            </DialogActions>
        </Dialog>

        <div className={styles.drawerMenu}>
            <Drawer anchor="left" open={show} onClose={handleDraw}>
                <Box sx={{ height: '100vh'}} onClick={handleDraw}>
                    <List>
                        {menu.map(obj => {
                            const Icon = obj.icon;
                            return (
                                <ListItem key={obj.title} onClick={obj.onClick || (() => router.push(obj.href))} button>
                                    <ListItemButton>
                                        <ListItemIcon><Icon /></ListItemIcon>
                                        <ListItemText primary={obj.title} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                        <div className={styles.parentContainer}>
                            <Button className={styles.backButton}>
                                <ArrowBackIcon />
                                <a className={styles.backButtonLink}>戻る</a>
                            </Button>
                        </div>
                    </List>
                </Box>
            </Drawer>
        </div>
        <div className={styles.headerContainer}>
            {/* 戻るボタン */}
            <Button onClick={handleGoBack}>
                <div className={styles.backButton}>
                    <ArrowBackIcon />
                    <a className={styles.backButtonLink}>戻る</a>
                </div>
            </Button>
            
            {/* タイトル */}
            <div className={styles.appTitle}>
                <h1>Tourist Board of Nara</h1>
            </div>

            {/* メニューボタン */}
            <div className={styles.menuContainer}>
                <div className={styles.menu}>
                    <p>メニュー</p>
                </div>
                <div>
                    <Button onClick={handleDraw}>
                        <MenuIcon style={{ fontSize: 50, color: 'rgba(0, 0, 0, 0.5)' }}/>
                    </Button>
                </div>
            </div>
        </div>
        </>
    );
}
