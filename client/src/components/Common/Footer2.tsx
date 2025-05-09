import { Link } from 'react-router-dom'

const Footer2 = () => {
	return (
		<section className="bg-white py-6 relative">
			<div className="container">
				<div className="flex items-center flex-wrap">
					<div className="grow">
						<div className="flex items-center gap-3">
						<div className="inline-flex items-center">
								<Link to="">
									Home <i className="fa-solid fa-minus text-sm" />
								</Link>
							</div>
							<div className="inline-flex items-center">
								<Link to="">
									About <i className="fa-solid fa-minus text-sm" />
								</Link>
							</div>
							<div className="inline-flex items-center">
								<Link to="">
									Privacy <i className="fa-solid fa-minus text-sm" />
								</Link>
							</div>
							<div className="inline-flex items-center">
								<Link to="">
									Help <i className="fa-solid fa-minus text-sm" />
								</Link>
							</div>
							<div className="inline-flex items-center">
								<Link to="">
									Contact Us 
								</Link>
							</div>
						</div>
					</div>
					<div className="shrink md:text-end mt-4 lg:mt-0">
						<p className="text-sm mb-0">
							{' '}
							{new Date().getFullYear()} © Revenue Roots. All rights reserved. Crafted
							by <Link to="/">Revenue Roots</Link>
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Footer2
