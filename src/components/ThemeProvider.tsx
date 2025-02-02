/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, {useEffect, useMemo} from 'react';
import useThemePreferenceWithStaticOverride from '@hooks/useThemePreferenceWithStaticOverride';
import DomUtils from '@libs/DomUtils';
// eslint-disable-next-line no-restricted-imports
import themes from '@styles/theme';
import ThemeContext from '@styles/theme/context/ThemeContext';
import type {ThemePreferenceWithoutSystem} from '@styles/theme/types';

const propTypes = {
    /** Rendered child component */
    children: PropTypes.node.isRequired,
};

type ThemeProviderProps = React.PropsWithChildren & {
    theme?: ThemePreferenceWithoutSystem;
};

function ThemeProvider({children, theme: staticThemePreference}: ThemeProviderProps) {
    const themePreference = useThemePreferenceWithStaticOverride(staticThemePreference);

    const theme = useMemo(() => themes[themePreference], [themePreference]);

    useEffect(() => {
        DomUtils.addCSS(DomUtils.getAutofilledInputStyle(theme.text), 'autofill-input');
    }, [theme.text]);

    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

ThemeProvider.propTypes = propTypes;
ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider;
