import { Footer2, Navbar, ScrollToTop } from '@/components'
import Table from './AutomaticOa_table'

const AutomaticOa_table = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow bg-slate-100 mt-[77px] py-3 px-3 space-y-4">   
                    <Table />        
            </div>
            <Footer2 />
            <ScrollToTop />
        </div>
    )
}

export default AutomaticOa_table
