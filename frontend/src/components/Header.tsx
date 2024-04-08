import { AppBar, Toolbar } from "@mui/material";

function Header() {
    return <AppBar sx={{bgcolor: "transparent",position: "static", boxShadow: 'none'}}>
        <Toolbar sx={{display: 'flex'}}>
            
        </Toolbar>
    </AppBar>;
}

export default Header