import { createContext, useEffect, useState } from 'react';
import { languages } from './config';
import useLocalStorage from './hooks/useLocalStorage';
import PublicRoutes from './routes/PublicRoutes';
import "./scss/index.scss";

export type LanguageCodes = "en" | "vi";

interface IAppContext {
	isDarkMode: boolean;
	setDarkMode: (value: boolean) => void;
	languageCode: LanguageCodes;
	setLanguageCode: (value: LanguageCodes) => void;
};

export const AppContext = createContext<IAppContext>({
	isDarkMode: false,
	setDarkMode: () => {},
	languageCode: "en",
	setLanguageCode: () => {},
});

function App() {

	const [darkMode, setDarkMode] = useLocalStorage("isDarkMode", false);
	const [languageCode, setLanguageCode] = useLocalStorage("languageCode", languages.en.code);
	
	const [setting, setSetting] = useState({
		isDarkMode: darkMode,
		languageCode: languageCode as LanguageCodes
	});

	useEffect(() => {
		if(darkMode){
			document.documentElement.classList.add('dark')
		}else{
			document.documentElement.classList.remove('dark')
		}
	},[darkMode])

	const handleDarkMode = (value: boolean) => {
		setSetting({
			...setting,
			isDarkMode: value
		});
		setDarkMode(value);
	};

	const handleLanguageCode  = (code: LanguageCodes) => {
		setSetting({
			...setting,
			languageCode: code
		});
		setLanguageCode(code);
	}

	return (
		<div className="app">
			<AppContext.Provider value={{
				...setting,
				setLanguageCode: handleLanguageCode, 
				setDarkMode: handleDarkMode
			}}>
				<PublicRoutes />
			</AppContext.Provider>
		</div>
	);
}

export default App;
