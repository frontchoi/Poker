import { createContext } from 'react';

export const UserSelectContext = createContext(null);
const UserSelectContextProvider = (props) => {
    return <UserSelectContext.Provider value={1} {...props} />;
};

export default UserSelectContextProvider;
