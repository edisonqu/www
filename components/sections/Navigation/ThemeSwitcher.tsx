import { useLocalStorage, useMedia } from 'react-use'
import { FC, useEffect } from 'react'
import { Lightbulb, Moon } from 'components/svgs'
import clsx from 'clsx'

type StorageTheme = 'dark' | 'light' | 'system'

interface ThemeSwitcherProps {
	className?: string
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
	const osTheme = useMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light'
	const [storageTheme, setStorageTheme] = useLocalStorage<StorageTheme>('app-theme', 'system')
	const theme = storageTheme === 'system' ? osTheme : storageTheme
	const isDarkTheme = theme === 'dark'

	function updateTheme(theme: 'dark' | 'light') {
		setStorageTheme(theme === osTheme ? 'system' : theme)
	}

	useEffect(() => {
		if (isDarkTheme) {
			document.body.classList.add('dark')
		} else {
			document.body.classList.remove('dark')
		}
	}, [isDarkTheme])

	return (
		<button
			type='button'
			className={clsx(
				className,
				'lg:border-gradient group relative flex items-center justify-center gap-3 rounded-button after:rounded-[0.875rem] dark:bg-black lg:bg-[#E9E9E9]'
			)}
			onClick={() => {
				updateTheme(theme === 'dark' ? 'light' : 'dark')
			}}
		>
			{theme === 'dark' ? <Lightbulb className='lg:p-3' /> : <Moon className='lg:p-3' />}
			<span className='whitespace-nowrap lg:hidden'>Switch Theme</span>
		</button>
	)
}

export default ThemeSwitcher
