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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`search_word: ${search.search_word}`);
    };

    return(
        <>
            <div className={styles.overContainer}>
                <div className={styles.createButton}>
                    <Button
                        variant="contained"
                        color="grey"
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