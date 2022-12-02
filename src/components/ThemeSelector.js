import { useTheme } from '../hooks/useTheme';
import modeIcon from '../assets/color-mode.svg';

function ThemeSelector() {
    const { changeMode, mode } = useTheme()

    const toggleMode = () => {
        changeMode(mode === 'dark' ? 'light' : 'dark')
    }

    console.log(mode)
    return (
        <div className='theme-selector'>
            <div className='mode-toggle'>
                <img
                    onClick={toggleMode}
                    src={modeIcon}
                    alt='dark/light icon'
                    style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
                />
            </div>
        </div>
    );
}

export default ThemeSelector;