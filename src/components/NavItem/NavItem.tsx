import React from 'react';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import {NavType} from "../../types/NavTypes";
import {Link} from "react-router-dom";

export default function NavItem({link, open, text, icon}: NavType) {

    return (
        <ListItem key={text} disablePadding sx={{display: 'block'}}>
            <Link to={`${link}`}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                >

                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{opacity: open ? 1 : 0}}/>
                </ListItemButton>
            </Link>

        </ListItem>
    );
}