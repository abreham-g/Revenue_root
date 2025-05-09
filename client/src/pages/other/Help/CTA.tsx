import { Link } from 'react-router-dom'

const CTA = () => {
	return (
		<section className="py-20">
			<div className="container">
				<div className="text-center max-w-2xl mx-auto">
					<h2 className="md:text-3xl/tight text-3xl font-semibold my-4">
						Still have a question?
					</h2>
					<p className="md:text-lg text-slate-500 leading-7">
						Explore your most suitable option below
					</p>
				</div>
				<div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-16">
					<div className="border rounded p-6">
						<h3 className="text-xl">Get in touch</h3>
						<p className="text-slate-700 mt-3">
							Get in touch with our professional business development team and
							they'll answer your question shortly
						</p>
						<div className="mt-12 mb-3">
							<Link
								to="/contact-us"
								className="py-3 px-6 rounded border border-primary text-primary hover:text-white hover:bg-primary hover:shadow-lg hover:shadow-primary/50 focus:outline focus:outline-primary/50 transition-all duration-500"
							>
								Contact Us
							</Link>
						</div>
					</div>
					<div className="border rounded p-6">
						<h3 className="text-xl">Sign Up for Updates</h3>
						<p className="text-slate-700 mt-3">
							Stay informed with the latest news and updates by signing up for our newsletter.
						</p>
						<div className="mt-12 mb-3">
							<Link
								to="/sign-up"
								className="py-3 px-6 rounded border border-primary text-primary hover:text-white hover:bg-primary hover:shadow-lg hover:shadow-primary/50 focus:outline focus:outline-primary/50 transition-all duration-500"
							>
								Sign Up
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CTA
