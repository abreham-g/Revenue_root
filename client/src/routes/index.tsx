import React from 'react'
import { Route, RouteProps } from 'react-router-dom'

// components

// lazy load all the views

//auth
const RecoverPassword = React.lazy(
	() => import('../pages/auth/RecoverPassword')
)
const ConfirmMail = React.lazy(() => import('../pages/auth/ConfirmAccount'))

//Home
const Home = React.lazy(() => import('../pages/home/index'))
const Login = React.lazy(() => import('../pages/auth/Login'))
const Register = React.lazy(() => import('../pages/auth/Register'))


// contact page
const ContactPage = React.lazy(() => import('../pages/other/Contact'))

//otherPages
const PricingPage = React.lazy(() => import('../pages/other/Pricing'))
const HelpPage = React.lazy(() => import('../pages/other/Help'))
const Dashboard = React.lazy(() => import('../pages/other/Dashboard'))
const Setting = React.lazy(() => import('../pages/other/Setting'))
const AutomaticOa_table = React.lazy(() => import('../pages/Online_arbitrage/index'))
const GamesWorkshop = React.lazy(() => import('../pages/Games_workshop'))

export interface RoutesProps {
	path: RouteProps['path']
	name?: string
	element?: RouteProps['element']
	route?: any
	exact?: boolean
	icon?: string
	header?: string
	roles?: string[]
	children?: RoutesProps[]
}

// dashboards
const dashboardRoutes: RoutesProps[] = [
	{
		path: '/',
		name: 'Home',
		header: 'Navigation',
		element: <Home/>,
		route: Route,
	},
	{
		path: '/automatic_oa',
		name: 'Home',
		header: 'Navigation',
		element: <AutomaticOa_table />,
		route: Route,
	},
	{
		path: '/games-workshop',
		name: 'Home',
		header: 'Navigation',
		element: <GamesWorkshop />,
		route: Route,
	},
]


// ui
const uiRoutes: RoutesProps[] = [
	{
		path: '/contact-us',
		name: 'Contact us',
		element: <ContactPage />,
	},
]

// auth
const authRoutes: RoutesProps[] = [
	{
		path: '/login',
		name: 'Forgot Password',
		element: <Login />,
		route: Route,
	},
	{
		path: '/register',
		name: 'Forgot Password',
		element: <Register />,
		route: Route,
	},
	{
		path: '/forget-password',
		name: 'Forgot Password',
		element: <RecoverPassword />,
		route: Route,
	},
	{
		path: '/confirm-account',
		name: 'Confirm Mail',
		element: <ConfirmMail />,
		route: Route,
	},
	{
		path: '/settings',
		name: 'Setting',
		element: <Setting />,
		route: Route,
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		element: <Dashboard />,
		route: Route,
	},
]

// public routes
const otherPublicRoutes = [
	{
		path: '/pricing',
		name: 'Pricing',
		element: <PricingPage />,
		route: Route,
	},
	{
		path: '/help',
		name: 'Help',
		element: <HelpPage />,
		route: Route,
	},
]

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
	let flatRoutes: RoutesProps[] = []

	routes = routes || []
	routes.forEach((item: RoutesProps) => {
		flatRoutes.push(item)
		if (typeof item.children !== 'undefined') {
			flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)]
		}
	})
	return flatRoutes
}

// All routes
const authProtectedRoutes = [
	...otherPublicRoutes,
	...dashboardRoutes,
	...uiRoutes
]

const publicRoutes = [...authRoutes]

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes])
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes])
export {
	publicRoutes,
	authProtectedRoutes,
	authProtectedFlattenRoutes,
	publicProtectedFlattenRoutes,
}
