import { PlanItem } from './types'
import avatar1 from '@/assets/images/avatars/img-1.jpg'

interface Testimonials {
	name: string
	position: string
	description: string
	image: string
}

interface AccordionData {
	title: string
	description: string
}

const testimonials: Testimonials[] = [
	{
		name: 'Tirhak Melka',
		position: 'Amazon FBA seller',
		description:
			'I have been using Revenue Roots really intensively for a week now. Before that, I created my Amazon account and took care of everything that goes with it. Revenue Roots was a great help here too, as the courses are very well structured and provide great support. In just one week, I was able to find products that generate sales of around €2000 with an ROI of 25%. I am also in a deal group, but I have to say that Revenue roots provides me with significantly better deals.',
		image: avatar1,
	},
	{
		name: 'John Stark',
		position: 'Amazon seller',
		description:
			'I have been using it for just under 1.5 weeks and I am really impressed. If I compare the sourcing of products with before, PP eliminates a huge amount of work and time. I have already made almost 130 sales with products found through PP. Thank you very much! ',
		image: avatar1,
	},
]

const FAQContent: AccordionData[] = [
	{
		title: 'How does this platform help Amazon FBA sellers?',
		description:
			'Our system automates the product sourcing process by analyzing market trends, demand, competition, and profitability. It helps you find high-potential products quickly and efficiently.',
	},
	{
		title: 'Do I need prior experience to use this tool?',
		description:
			'No, our platform is designed for both beginners and experienced Amazon sellers. The intuitive interface and data-driven insights make product sourcing simple for everyone.',
	},
	{
		title: 'Can I integrate this with my Amazon seller account?',
		description:
			'Yes, our platform supports integration with your Amazon seller account, allowing you to track products, analyze market trends, and make informed decisions directly from the dashboard.',
	},
	{
		title: 'How accurate is the product data provided?',
		description:
			'Our system pulls data from reliable sources, including Amazon’s API, to ensure accurate and up-to-date insights on sales trends, demand, and profitability potential.',
	},
	{
		title: 'Is there a free trial available?',
		description:
			'Yes, we offer a free trial so you can explore the features and see how it helps streamline your product sourcing before committing to a subscription.',
	},
	{
		title: 'Do you provide support if I need help?',
		description:
			'Absolutely! Our support team is available via email and live chat to assist you with any questions or issues you may have.',
	},
	{
		title: 'Will I get regular updates and new features?',
		description:
			'Yes, we continuously improve our platform with new features and updates. All users receive updates automatically at no extra cost.',
	},
	{
		title: 'Can I cancel my subscription anytime?',
		description:
			'Yes, you can cancel your subscription at any time without any hidden fees or obligations.',
	},
]

const plans: PlanItem[] = [
	{
		id: 1,
		name: 'Starter',
		price: '49',
		duration: '/ month',
		features: ['30+ Advanced Features', 'AMZ Markets', 'Supplier Search', 'Multi Search', '1 Spy Search', '1 Device'],
		isRecommended: false,
	},
	{
		id: 2,
		name: 'Professional',
		price: '99',
		duration: '/ month',
		features: [
			'30+ Advanced Features',
			'AMZ Markets',
			'Supplier Search',
			'Multi Search',
			'1 Device',
			'10 Spy Searches',
			'Reverse Search',
			'Wholesale Search',
			'Blacklist',
			'Universal Marketplace Search'
		],
		isRecommended: true,
		isPopular: true,
	},
	{
		id: 3,
		name: 'Enterprise',
		price: '599',
		duration: '/ month',
		features: [
			'30+ Advanced Features',
			'AMZ Markets',
			'Supplier Search',
			'Multi Search',
			'20 Spy Searches',
			'Reverse Search',
			'Wholesale Search',
			'A2A Search',
			'Blacklist',
			'Universal Marketplace Search',
			'30 Spy Searches',
			'Price Alerts',
			'Coming Soon',
			'3 Devices',
			'VA Access'
		],
		isRecommended: false,
	},
]

export { testimonials, plans, FAQContent }
