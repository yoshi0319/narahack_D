import styles from '@/styles/topHeader_css.module.css';
import { Button, TextField, InputAdornment, ListItemButton, ListItemIcon, ListItemText, ListItem, Drawer, Box, List, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function TopHeader() {
    const router = useRouter();

    // Define the logout handler
    const handleLogout = () => {
        Cookies.remove("signedIn");
        router.push('/Tourist_Board_of_Nara');
    };

    // Check the signed-in status from the cookies
    const signedIn = Cookies.get("signedIn") === 'true'; 
    console.log("Signed In Status:", signedIn);

    const [openLoginPrompt, setOpenLoginPrompt] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`search_word: ${search.search_word}`);
    };

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

    // Define the menu items based on the sign-in status
    const menu = [
        {title: 'ホーム', href: '/Tourist_Board_of_Nara', icon: HomeIcon},
        {title: 'ページ制作', href: '/Tourist_Board_of_Nara/CreatePost', icon: CreateIcon, onClick: handleCreatePageClick}, // Updated this line
        signedIn
            ? {title: 'ログアウト', href: '#', icon: LogoutIcon, onClick: handleLogout}
            : {title: 'ログイン', href: '/Tourist_Board_of_Nara/login', icon: LoginIcon},
    ];

    const [show, setShow] = useState(false);

    const handleDraw = () => setShow(!show);

    const [search, setSearch] = useState({
        search_word: ''
    });

    const handleSearch = e => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    };


    return (
        <>
        <Dialog open={openLoginPrompt} onClose={handleCloseLoginPrompt} sx={{ '& .MuiPaper-root': { borderRadius: '16px' } }}>
            <DialogContent className={styles.popuplist}>ページを作成するにはログインが必要です。<br/>ログインページに移動しますか？</DialogContent>
            <DialogActions className={styles.dialogActionsCentered}>
                <Button className={styles.popupbutton_cancel} onClick={handleCloseLoginPrompt}>キャンセル</Button>
                <Button className={styles.popupbutton_next} onClick={handleLoginRedirect} color="primary">ログイン</Button>
            </DialogActions>
        </Dialog>

        <div className={styles.drawerMenu}>
            <Drawer anchor="left" open={show}>
                <Box sx={{ height: '100vh' }} onClick={handleDraw}>                        <List>
                        {menu.map((obj) => {
                            const Icon = obj.icon;
                            return (
                                <ListItem key={obj.title}>
                                    <ListItemButton
                                            href={obj.href}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (obj.onClick) {
                                                    obj.onClick(e); // This now handles the Create Page click inside the drawer
                                                } else {
                                                    router.push(obj.href);
                                                }
                                            }}
                                        >
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

            <div className={styles.overContainer}>
                <div className={styles.createButton}>
                    <Button
                        variant="contained"
                        color="grey"
                        onClick={handleCreatePageClick}
                        sx={{
                            backgroundColor: '#B0B0B0', 
                            color: '#000',
                            opacity: 0.9,
                            fontFamily: "'Klee One', sans-serif",
                            '&:hover': {
                                backgroundColor: '#A0A0A0',
                            },
                        }}>
                        ページ作成
                    </Button>
                </div>
                <div className={styles.appTitle}>
                    <h1>Tourist Board of Nara</h1>
                </div>
                <div className={styles.searchFieldContainer}>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                id="search"
                                name="search_word"
                                value={search.search_word}
                                onChange={handleSearch}
                                label="検索"
                                rows={1}
                                className={styles.searchField}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </form>
                    </div>
                </div>
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
                                
            <div className={styles.underContainer}>
                <nav className={styles.navMenu}>
                    <ul className={styles.hover}>寺院</ul>
                    <ul>|</ul>
                    <ul className={styles.hover}>神社</ul>
                    <ul>|</ul>
                    <ul className={styles.hover}>飲食店</ul>
                    <ul>|</ul>
                    <ul className={styles.hover}>お土産</ul>
                    <ul>|</ul>
                    <ul className={styles.hover}>資料館</ul>
                    <ul>|</ul>
                    <ul className={styles.hover}>その他</ul>
                </nav>     
            </div>

        </>
    );
}
