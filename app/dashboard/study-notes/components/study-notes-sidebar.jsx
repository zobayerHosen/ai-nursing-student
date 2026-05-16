import { Plus, Search } from 'lucide-react';
import React from 'react';

const StudyNoteSidebar = () => {
    return (
        <>
            <aside className="w-82.5 border-r border-black/10 bg-white min-h-screen overflow-hidden sticky top-0 left-0">
                {/* header content */}
                <div className="border-b border-black/10 py-4 ">
                    <div className="px-4 w-full flex flex-col items-start gap-4">
                        <h4 className="text-[#424242] font-semibold text-lg">Study Notes</h4>
                        {/* search study notes */}
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D6D6D] w-5.5 h-5.5" />
                            <input
                                type="text"
                                placeholder="Search Notes"
                                className="w-full pl-11 pr-4 py-2.5 border border-[#DFE1E7] rounded-lg text-sm outline-0"
                            />
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};
export default StudyNoteSidebar;