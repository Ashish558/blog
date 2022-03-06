
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded'
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'

export const NavbarData= [
    {
        name: 'Home',
        icon: HomeRoundedIcon,
        linkTo: '/',
    },
    {
        name: 'Dashboard',
        icon: GridViewRoundedIcon,
        linkTo: '/dashboard',
    },
    {
        name: 'Create',
        icon: CreateNewFolderRoundedIcon,
        linkTo: '/create',
    },
    {
        name: 'Bookmarks',
        icon: BookmarksRoundedIcon,
        linkTo: '/bookmarks',
    },
    {
        name: 'Profile',
        icon: AccountCircleRoundedIcon,
        linkTo: '/profile',
    },
]