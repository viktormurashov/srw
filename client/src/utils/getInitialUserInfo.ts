const getUserInfoFromLocalStorage = () => {
    const userExists = localStorage.key(0);

    if (userExists) {
        return JSON.parse(localStorage.getItem('user') || 'null');
    }

    return null;
};

export default getUserInfoFromLocalStorage;
