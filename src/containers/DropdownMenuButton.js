import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function DropdownMenuButton({ setSortingArg }) {
    const [sorting, setSorting] = React.useState('顧客抵達時間');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleState = (state) => {
        handleClose();
        setSorting(stateToChinese[state]);
        setSortingArg(state);
    }

    const stateToChinese = {
        'arrivedTime': '顧客抵達時間',
        'tableNo': '桌號',
        'totalPrice': '訂單總價'
    };

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
                    排序方式：
                </span>
                <span style={{ color: 'red' }}>
                    {sorting}
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
                <MenuItem onClick={() => handleState('arrivedTime')}>顧客抵達時間</MenuItem>
                <MenuItem onClick={() => handleState('tableNo')}>桌號</MenuItem>
                <MenuItem onClick={() => handleState('totalPrice')}>訂單總價</MenuItem>
                {/* <MenuItem onClick={()=>handleState('totalPrice')}>餐點數量</MenuItem> */}
            </Menu>
        </div>
    );
}
