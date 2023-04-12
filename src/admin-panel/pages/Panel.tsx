import React from 'react';
import Nav from '../components/Nav/Nav';
import Box from "@mui/material/Box";
import {Outlet} from "react-router-dom";
import {DrawerHeader} from "../components/Header/Header";


function Panel() {
    return (
        <Box sx={{display: 'flex'}}>
            <Nav/>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <DrawerHeader/>
                <Outlet />
            </Box>
        </Box>
    );
}

export default Panel;