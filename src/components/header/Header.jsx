import { React, useContext, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "../../api";
import {
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    AppBar,
    Container,
    Button,
    MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context";

const pages = [];

const publicPages = [
    {
        name: "Вход",
        path: "/sign-in",
    },
    {
        name: "Регистрация",
        path: "/sign-up",
    },
];

const privatePages = [
    {
        name: "Расписание",
        path: "/",
    },
    {
        name: "Профиль",
        path: "/profile",
    },
];

export const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const { isAuth, setAuth } = useContext(AuthContext);

    const handleSignOut = () => {
        signOut(getAuth(firebaseApp));
        setAuth(false);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" className="header" sx={{ height: "57px" }}>
            <Container maxWidth="xl">
                <Toolbar
                    sx={{
                        minHeight: { xs: "57px", sm: "57px", md: "57px" },
                    }}
                >
                    {/* Меню таблет, мобайл */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        {/* Меню сендвич */}
                        <IconButton
                            size="large"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        {/* Меню в попапе */}
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.name}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography
                                        className="menu__link"
                                        textAlign="center"
                                    >
                                        <Link to={page.path}>{page.name}</Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                            {isAuth &&
                                privatePages.map((page) => (
                                    <MenuItem
                                        key={page.name}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography
                                            className="menu__link"
                                            textAlign="center"
                                        >
                                            <Link to={page.path}>
                                                {page.name}
                                            </Link>
                                        </Typography>
                                    </MenuItem>
                                ))}
                            {!isAuth &&
                                publicPages.map((page) => (
                                    <MenuItem
                                        key={page.name}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography
                                            className="menu__link"
                                            textAlign="center"
                                        >
                                            <Link to={page.path}>
                                                {page.name}
                                            </Link>
                                        </Typography>
                                    </MenuItem>
                                ))}
                        </Menu>
                    </Box>
                    {/* Меню на десктопе */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                color="primary"
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    color: "white",
                                    margin: 0,
                                    padding: 0,
                                }}
                            >
                                <Link className="menu__link" to={page.path}>
                                    {page.name}
                                </Link>
                            </Button>
                        ))}
                        {isAuth &&
                            privatePages.map((page) => (
                                <Button
                                    color="primary"
                                    key={page.name}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        color: "white",
                                        margin: 0,
                                        padding: 0,
                                    }}
                                >
                                    <Link className="menu__link" to={page.path}>
                                        {page.name}
                                    </Link>
                                </Button>
                            ))}
                        {!isAuth &&
                            publicPages.map((page) => (
                                <Button
                                    color="primary"
                                    key={page.name}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        color: "white",
                                        margin: 0,
                                        padding: 0,
                                    }}
                                >
                                    <Link className="menu__link" to={page.path}>
                                        {page.name}
                                    </Link>
                                </Button>
                            ))}
                    </Box>
                    {isAuth && (
                        <IconButton size="small" onClick={handleSignOut}>
                            Выйти
                        </IconButton>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
