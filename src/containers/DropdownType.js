import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function DropdownType({ setItemType, currentType }) {
    const [type, setType] = React.useState(currentType);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleState = (type) => {
        handleClose();
        setType(type);
        setItemType(type);
    }

    const typeTranslation = {
        'Main': '主食',
        'Dessert': '點心',
        'Beverage': '飲料'
    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <span>
                    種類：
                </span>
                <span style={{ color: 'red' }}>
                    {typeTranslation[type]}
                </span>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => handleState('Main')}>主食</MenuItem>
                {/* <MenuItem onClick={() => handleState('Dessert')}>甜點</MenuItem> */}
                <MenuItem onClick={() => handleState('Dessert')}>點心</MenuItem>
                <MenuItem onClick={() => handleState('Beverage')}>飲料</MenuItem>

                {/* <MenuItem onClick={()=>handleState('totalPrice')}>餐點數量</MenuItem> */}
            </Menu>
        </div>
    );
}
