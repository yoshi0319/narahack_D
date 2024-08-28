import styles from '@/styles/topHeader_css.module.css';
import { Button, TextField, InputAdornment, ListItemButton, ListItemIcon, ListItemText, ListItem, Drawer, Box, List, Dialog, DialogContent, DialogActions } from '@mui/material';
import { useState, useEffect, use } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function TopHeader() {
    const router = useRouter();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const showLoginSuccess = Cookies.get("showLoginSuccess");
        const showLogoutSuccess = Cookies.get("showLogoutSuccess");
        
        if (showLoginSuccess === 'true') {
            setSnackbarMessage('ログインに成功しました');
            setOpenSnackbar(true);
            Cookies.remove("showLoginSuccess");
        } else if (showLogoutSuccess === 'true') {
            setSnackbarMessage('ログアウトしました');
            setOpenSnackbar(true);
            Cookies.remove("showLogoutSuccess");
        }
    }, []);
    
    const handleLogout = () => {
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

    const signedIn = Cookies.get("signedIn") === 'true'; 
    console.log("Signed In Status:", signedIn);

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

    const [search, setSearch] = useState({
        search_word: ''
    });

    const handleSearch = e => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`search_word: ${search.search_word}`);
    };

    const navigateToCategory = (category) => {
        // カテゴリをクエリパラメータとしてトップページに遷移
        // router.push(`/Tourist_Board_of_Nara?category=${category}`);
        router.replace(`/Tourist_Board_of_Nara/${category}`).then(() => {
            window.location.reload();
        });
    };
    

    useEffect(() => {
        const menuList = document.querySelector(`.${styles.menuList}`);
        const navbar = document.querySelector(`.${styles.navbar}`);
        
        if (!menuList || !navbar) {
            console.error("MenuList または Navbar 要素が見つかりませんでした");
            return;
        }
    
        let lastScrollTop = 0;
    
        const handleScroll = () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
            if (scrollTop > lastScrollTop) {
                navbar.classList.add(styles.sticky);
                navbar.style.transform = 'translateY(-6%)';
            } else {
                navbar.classList.remove(styles.sticky);
                navbar.style.transform = 'translateY(0)';
            }
    
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

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
                    <button className={styles.dummy_button}>テスト</button>
                    <button className={styles.popupbutton_cancel} onClick={handleCloseLoginPrompt}>キャンセル</button>
                    <button className={styles.dummy_button}>テスト</button>
                    <button className={styles.popupbutton_next} onClick={handleLoginRedirect}>ログイン</button>
                    <button className={styles.dummy_button}>テスト</button>
                </DialogActions>
            </Dialog>  
            <div className={styles.all}>
            <div className={styles.header}>
                <div className={styles.drawerMenu}>
                <Drawer anchor="left" open={show}>
                    <Box sx={{ height: '100vh'}} onClick={handleDraw}>
                        <List>
                            {menu.map(obj => {
                                const Icon = obj.icon;
                                return (
                                    <ListItem key={obj.title}>
                                        <ListItemButton href={obj.href}
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
                <div className={styles.topHeaderContainer}>
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
                                    }
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
                                        rows={1}
                                        placeholder="検索"
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
                                    <MenuIcon style={{ fontSize: 50, color: 'rgba(0, 0, 0, 0.5)' }} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.navbar}>
                <div className={styles.underContainer}>
                    <nav className={`${styles.navMenu} ${styles.menuList}`}>
                        <ul className={styles.hover} onClick={() => navigateToCategory('temples')}>寺院</ul>
                        <ul>|</ul>
                        <ul className={styles.hover} onClick={() => navigateToCategory('shrines')}>神社</ul>
                        <ul>|</ul>
                        <ul className={styles.hover} onClick={() => navigateToCategory('restaurants')}>飲食店</ul>
                        <ul>|</ul>
                        <ul className={styles.hover} onClick={() => navigateToCategory('souvenirs')}>お土産</ul>
                        <ul>|</ul>
                        <ul className={styles.hover} onClick={() => navigateToCategory('museums')}>資料館</ul>
                        <ul>|</ul>
                        <ul className={styles.hover} onClick={() => navigateToCategory('others')}>その他</ul>
                    </nav>
                </div>
            </div>
            </div>
            </div>
        </>
    );
}
