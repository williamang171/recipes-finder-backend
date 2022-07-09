
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';
import Toolbar from '@mui/material/Toolbar';
import {
    NavLink,
} from "react-router-dom";

const links = [
    {
        name: "Finder",
        key: "finder",
        to: "/finder",
        icon: <SearchIcon />
    },
    {
        name: "Saved",
        key: "saved",
        to: "/saved-recipes",
        icon: <BookmarksIcon />
    },
    // {
    //     name: "Debug Auth",
    //     key: "debug-auth",
    //     to: "/debug-auth",
    //     icon: <LockIcon />
    // }
    {
        name: "Settings",
        key: "settings",
        to: "/settings",
        icon: <SettingsIcon />
    }
]

export default function SideNav() {

    return (
        <div>
            <Toolbar />
            <List  >
                {links.map((l) => {
                    return (
                        <NavLink
                            end={l.to === "/" ? true : false}
                            className={(props) => {
                                return `${props.isActive ? 'sidebar-nav-item-active' : 'sidebar-nav-item'}`;
                            }}
                            to={l.to}
                            key={l.key}
                        >
                            <ListItem button key={l.key}>
                                <ListItemIcon>
                                    {l.icon}
                                </ListItemIcon>
                                <ListItemText primary={l.name} />
                            </ListItem>
                        </NavLink>

                    )
                })}
            </List>
        </div>
    );
}