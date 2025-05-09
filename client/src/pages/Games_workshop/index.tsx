import { Footer2, Navbar, ScrollToTop } from '@/components'
import Statistic from './Statistic'

import Table from './GWS_table'


const Games_workshop = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
			<div className="flex-grow bg-slate-100 mt-[77px] py-3 px-3 space-y-4">
				<Statistic />
                <Table />
			</div>
            <Footer2 />
            <ScrollToTop />
        </div>
    )
}

export default Games_workshop
