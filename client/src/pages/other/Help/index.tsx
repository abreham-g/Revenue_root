import { Footer } from '@/components'

import CTA from './CTA'
import HelpLinks from './HelpLinks'
import Hero from './Hero'
import SupportCenter from './SupportCenter'

//data
import { helpLinks } from './data'

const Help = () => {
	return (
		<>
			<div>
				<Hero />
				<section className="py-20 relative">
					<div className="container">
						<div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
							<div className="lg:col-span-2 cols-span-1">
								<HelpLinks helpLinks={helpLinks} />

							</div>

							<SupportCenter />
						</div>
					</div>
					<CTA />
				</section>
				
				<Footer />
			</div>
		</>
	)
}

export default Help
