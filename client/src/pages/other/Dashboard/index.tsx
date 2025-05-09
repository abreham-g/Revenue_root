import { Footer2, Navbar, ScrollToTop } from '@/components'
import Statistic from './Statistic'
import OverviewTable from '../../Online_arbitrage/Overview'
import GwOverviewTable from '../../Games_workshop/Overview'

const Dashboard = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow bg-slate-100 mt-[77px] py-3 px-3">
                <Statistic />
                <OverviewTable />
                <GwOverviewTable />

            </div>
            <Footer2 />
            <ScrollToTop />
        </div>
    )
}

export default Dashboard
