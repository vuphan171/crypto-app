import { useContext } from 'react';
import {
    useNavigate
} from "react-router-dom";
import { AppContext, LanguageCodes } from '../../App';
import { languages } from '../../config';
import { ReactComponent as DarkLogo } from '../../images/dark-logo.svg';
import { ReactComponent as LightLogo } from '../../images/light-logo.svg';
import { ReactComponent as MobileDarkLogo } from '../../images/mobile-dark-logo.svg';
import { ReactComponent as MobileLightLogo } from '../../images/mobile-light-logo.svg';

const Header = () => {

    const navigate = useNavigate();

    const { setDarkMode, setLanguageCode, isDarkMode, languageCode } = useContext(AppContext);

    const toggleMode = () => {
        let mode = !isDarkMode;
        setDarkMode(mode);
    };

    const changeLanguageCode = () => {
        let code = (languageCode === languages.en.code) ? languages.vi.code : languages.en.code;
        setLanguageCode(code as LanguageCodes);
    };

    const handleNavigateHome = () => {
        navigate("/");
    };

    return (
        <div className='fixed top-0 left-0 right-0 bg-gray-50 dark:bg-gray-800 z-50'>
            <div className='flex justify-between items-center container max-w-screen-xl mx-auto p-4 sm:p-5'>
                <div className='hidden cursor-pointer sm:block' onClick={handleNavigateHome}>
                    {isDarkMode ? <DarkLogo /> : <LightLogo />}
                </div>
                <div className='block cursor-pointer sm:hidden' onClick={handleNavigateHome}>
                    {isDarkMode ? <MobileDarkLogo /> : <MobileLightLogo />}
                </div>
                <div className='flex items-center divide-x'>
                    <div className='pr-1'>
                        <button onClick={changeLanguageCode} className='dark:bg-gray-800 cursor-pointer outline-none border-none px-2 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 bg-gray-50'>
                            <span className='font-medium dark:text-white'>
                                {languageCode === languages.vi.code ? "Tiếng Việt" : "English"}
                            </span>
                        </button>
                    </div>
                    <div className='pl-1'>
                        <button onClick={toggleMode} className='dark:bg-gray-800 cursor-pointer outline-none border-none px-2 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 bg-gray-50 h-8'>
                            {!isDarkMode ? <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" fontSize="1rem" aria-hidden="true" focusable="false" height="1rem" width="1rem" xmlns="http://www.w3.org/2000/svg"><path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path></svg> :
                                <svg stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 512 512" fontSize="1rem" aria-hidden="true" focusable="false" height="1rem" width="1rem" xmlns="http://www.w3.org/2000/svg"><path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></path></svg>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;