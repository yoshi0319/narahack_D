import Head from 'next/head';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import styles from '@/styles/header_css.module.css';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import LoginIcon from '@mui/icons-material/Login';
import { useRouter } from 'next/router';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';


export default function Header() {
    const router = useRouter();

    const handleGoBack = () => {
        router.back(); // 前のページに戻る
    };

    const menu = [
        {title: 'ホーム', href: 'home', icon: HomeIcon},
        {title: 'ページ制作', href: 'pegeCreate', icon: CreateIcon},
        {title: 'ログイン', href: 'login', icon: LoginIcon},
        // ユーザー状態に応じてログアウトボタンに変化
        //{title: 'ログアウト', href: 'logout', icon: LogoutIcon},
    ];

    const [show, setShow] = useState(false);

    const handleDraw = () => setShow(!show);

    return (
        <>
            <div className={styles.drawerMenu}>
                <Drawer acchor="left" open={show}>
                    <Box sx={{ height: '100vh'}} onClick={handleDraw}>
                        <List>
                            {menu.map(obj => {
                                const Icon = obj.icon;
                                return (
                                    <ListItem key={obj.title}>
                                        <ListItemButton href={obj.href}>
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
                    <div>
                        <Button onClick={handleDraw}>
                            <MenuIcon style={{ fontSize: 50, color: 'rgba(0, 0, 0, 0.5)' }}/>                            </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
