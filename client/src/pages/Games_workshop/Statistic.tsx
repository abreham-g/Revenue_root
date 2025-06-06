//image
import avatar1 from '@/assets/images/avatars/img-1.jpg'
import { PopoverLayout } from '@/components'
import {
	CheckSvg,
	DeactivateSvg,
	DropdownSvg,
	MailSvg,
	PenSvg,
	RefreshSvg,
	ShareSvg,
	TeliphoneSvg,
} from '@/constants/svgIcons'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface TaskProps {
	icon: ReactNode
	count: number
}

const Dropdown = () => {
	const PopoverToggle = () => {
		return <DropdownSvg />
	}
	return (
		<PopoverLayout
			togglerClass="text-gray-800"
			placement="bottom-end"
			toggler={<PopoverToggle />}
		>
			<div
				id="dropdown-target"
				className="bg-white  shadow rounded py-2 px-1.5 min-w-[10rem]"
			>
				<Link
					className="flex items-center py-1.5 px-5 text-base text-gray-500 hover:bg-slate-100 hover:text-slate-700 rounded"
					to=""
				>
					<ShareSvg />
					<span>Share</span>
				</Link>
				<Link
					className="flex items-center py-1.5 px-5 text-base text-gray-500 hover:bg-slate-100 hover:text-slate-700 rounded"
					to=""
				>
					<RefreshSvg />
					<span>Refresh</span>
				</Link>
				<hr className="my-2" />
				<Link
					className="flex items-center py-1.5 px-5 text-base text-red-500 hover:bg-slate-100 rounded"
					to=""
				>
					<DeactivateSvg />
					<span>Deactivate</span>
				</Link>
			</div>
		</PopoverLayout>
	)
}
const ProfileWidget = () => {
	return (
		<div className="lg:col-span-5 col-span-12">
			<div className="bg-white rounded">
				<div className="p-6">
					<div className="flex">
						<div className="grow">
							<div className="flex">
								<img
									src={avatar1}
									className="img-fluid w-12 h-12 rounded me-3"
									alt="..."
								/>
								<div className="grow">
									<h4 className="tetx-lg text-gray-800 mb-1 mt-0 font-semibold">
										Mr. Tirhak Melka
									</h4>
									<p className="text-gray-400 pb-0 text-sm mb-4 font-medium">
										Amazon FBA seller
									</p>
								</div>
							</div>
						</div>
						<div className="shrink text-end">
							<Dropdown />
						</div>
					</div>
					<div className="flex gap-4 flex-wrap py-4 border-b">
						<div className="mb-2">
							<Link to="" className="flex gap-0.5 text-gray-400 text-sm">
								<MailSvg />
								Tirhak@revenueroots.com
							</Link>
						</div>
						<div className="mb-2">
							<Link to="" className="flex gap-0.5 text-gray-400 text-sm">
								<TeliphoneSvg />
								+00 123-456-789
							</Link>
						</div>
					</div>
					<div className="flex items-center gap-6 mt-4">
						<div className="md:w-1/2 w-full">
							<div className="flex justify-between mb-3">
								<h6 className="fw-medium my-0">Total products</h6>
								<p className="float-end mb-0">2863</p>
							</div>
							<div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700 ">
								<div
									className="flex flex-col justify-center overflow-hidden bg-primary"
									role="progressbar"
									style={{ width: '85%' }}
									aria-valuenow={25}
									aria-valuemin={0}
									aria-valuemax={100}
								/>
							</div>
						</div>
						<div className="md:w-1/2 w-full">
							<div className="flex justify-between mb-3">
								<h6 className="fw-medium my-0">Average ROI</h6>
								<p className="float-end mb-0">30.5%</p>
							</div>
							<div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700 ">
								<div
									className="flex flex-col justify-center overflow-hidden bg-orange-500"
									role="progressbar"
									style={{ width: '30.5%' }}
									aria-valuenow={25}
									aria-valuemin={0}
									aria-valuemax={100}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const TaskWidget = ({ count, icon }: TaskProps) => {
	return (
		<div className="bg-white">
			<div className="flex items-center p-6">
				<div>
					<div className="inline-flex items-center justify-center h-12 w-12 bg-green-500/10 rounded me-3">
						{icon}
					</div>
				</div>
				<div className="flex-grow-1">
					<h3 className="text-xl text-gray-800">{count}</h3>
					<p className="text-muted mb-0">
						{count === 2863 ? 'Products Analysed' : 'Inprogress'}
					</p>
				</div>
			</div>
		</div>
	)
}

const RevenueWidget = () => {
	return (
		<div className="lg:col-span-4 col-span-12">
			<div className="bg-white">
				<div className="p-6">
					<div className="flex justify-between">
						<div className="grow">
							<h4 className="text-base font-semibold text-gray-800">Revenue</h4>
						</div>
						<div className="shrink text-end">
							<Dropdown />
						</div>
					</div>
					<h1 className="text-3xl text-gray-800 my-2.5">$2,100.00</h1>
					<p className="text-gray-400 text-sm">Last Week</p>
					<hr className="my-3.5" />
					<div className="flex items-center">
						<div className="lg:w-1/2">
							<div className="flex items-center">
								<div className="me-4 shrink">
									<svg
										className="h-6 w-6 text-green-500"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth={2}
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
										<polyline points="17 6 23 6 23 12" />
									</svg>
								</div>
								<div className="grow">
									<h5 className="mt-0 mb-0">15%</h5>
									<p className="text-muted mb-0 fs-13">Prev Week</p>
								</div>
							</div>
						</div>
						<div className="lg:w-1/2">
							<div className="flex items-center">
								<div className="me-3 flex-shrink-0">
									<svg
										className="h-6 w-6 text-red-500"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth={2}
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
										<polyline points="17 18 23 18 23 12" />
									</svg>
								</div>
								<div className="flex-grow-1">
									<h5 className="mt-0 mb-0">10%</h5>
									<p className="text-muted mb-0 fs-13">Prev Month</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const Statistic = () => {
	return (
		<section className="relative overflow-hidden">
			<div className="container text-center">
				<div className="bg-gray-100 py-10 rounded-lg mb-6">
					<h1 className="text-4xl font-bold text-gray-800">Welcome to the Games Workshop Data Page!</h1>
					<p className="text-gray-500 mt-2">Here you can find Games workshop products from different retailers.</p>
				</div>

				{/* Grid for Centered Cards */}
				<div className="grid grid-cols-2 gap-6 mt-2 justify-center mx-auto max-w-2xl">
					<div className="w-full">
						<TaskWidget count={1271} icon={<CheckSvg />} />
					</div>
					<div className="w-full">
						<TaskWidget count={360} icon={<PenSvg />} />
					</div>
				</div>
				{/* end grid */}
			</div>
		</section>
	)
}


export default Statistic
