import { ReactNode } from 'react'

export interface MenuItemTypes {
	key: string
	label: string
	isTitle?: boolean
	icon?: ReactNode
	url?: string
	badge?: {
		variant: string
		text: string
	}
	isDivider?: boolean
	parentKey?: string
	target?: string
	children?: MenuItemTypes[]
}
const MENU_ITEMS: MenuItemTypes[] = [
	{
		key: 'home',
		label: 'Home',
		url: '/',
		isTitle: false,
	},
	{
		key: 'pricing',
		label: 'Pricing',
		url: '/pricing',
		isTitle: false,
	},
	
	{
		key: 'contact-us',
		label: 'Contact us',
		url: '/contact-us',
		isTitle: false,
	},
	{
		key: 'help',
		label: 'Help',
		url: '/help',
		isTitle: false,
	},
]

const HORIZONTAL_MENU_ITEMS: MenuItemTypes[] = [
	{
		key: 'home',
		label: 'Home',
		url: '/',
		isTitle: false,
	},
	{
		key: 'pricing',
		label: 'Pricing',
		url: '/pricing',
		isTitle: false,
	},
	
	{
		key: 'contact-us',
		label: 'Contact us',
		url: '/contact-us',
		isTitle: false,
	},
	{
		key: 'help',
		label: 'Help',
		url: '/help',
		isTitle: false,
	},
]

export { HORIZONTAL_MENU_ITEMS, MENU_ITEMS }
