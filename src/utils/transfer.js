const nextStatus = (currentStatus, sequential) => {
    const statusList = ['unready', 'preparing', 'ready'];
    var index;
    if (sequential) {
        index = statusList.indexOf(currentStatus) + 1;
    } else {
        index = statusList.indexOf(currentStatus) - 1;
    }
    if (index < 0) return currentStatus;
    if (index >= statusList.length) return currentStatus;

    return statusList[index];
}

const statusToColor = {
    'unready': '#EA0000',
    'preparing': '#FFDC35',
    'ready': '#00BB00'
};


export { nextStatus, statusToColor };