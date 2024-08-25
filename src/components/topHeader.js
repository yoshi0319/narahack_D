import styles from '@/styles/topHeader_css.module.css';
import { Button, MenuItem, TextField, InputAdornment } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

export default function topHeader() {

    const [search, setSearch] = useState({
        search_word: ''
    });

    const handleSearch = e => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    };

    const Show = () => {
        console.log(`search: ${search.search_word}`);
    }

    return(
        <>
            <div className={styles.overContainer}>
                <div className={styles.createButton}>
                    <Button
                        variant="contained"
                        color="grey"
                        onClick={Show}
                        sx={{
                            backgroundColor: '#B0B0B0', // 灰色に変更
                            color: '#000',
                            opacity: 0.9,
                            '&:hover': {
                                backgroundColor: '#A0A0A0', // ホバー時も灰色に変更
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
                        <form>
                            <TextField
                                id="search"
                                name="search_word"
                                value={search.search_word}
                                onChange={handleSearch}
                                label="検索"
                                multiline
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
                    <div menuContainer>
                        <div className={styles.menu}>
                            <p>メニュー</p>
                        </div>
                        <div>
                            <MenuIcon style={{ fontSize: 50, color: 'rgba(0, 0, 0, 0.5)' }}/>
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
    )
}