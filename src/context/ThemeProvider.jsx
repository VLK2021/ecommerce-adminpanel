import React from 'react';

import { ThemeContext } from './ThemeContext';
import useTheme from '../hooks/useTheme';

export const ThemeProvider = ({ children }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
