import { ReactNode } from 'react'
export type PlanItem = {
	id: number
	name: string
	price: string
	duration: string
	features: Array<string>
	isRecommended: boolean
	isPopular?: boolean
}
export type Benefit = {
	icon: ReactNode
	title: string
	description: string
}