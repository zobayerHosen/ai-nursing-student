import { comparisonTableData } from "@/data"

const ComparisonTableData = () => {
    return (
        <>
            <p className="text-center py-2 text-xs text-[#374151] font-semibold">Angina vs. MI — Key Distinctions</p>

            <div className="overflow-hidden rounded-[7px] border border-[#D7DDE5]">
                <table className="w-full border-collapse text-left text-[11px]">
                    <thead className="bg-[#2C5F8D] text-white">
                        <tr>
                            <th className="px-2 py-[7px] text-[9px] font-bold uppercase tracking-[0.08em]">
                                Feature
                            </th>

                            <th className="px-2 py-[7px] text-[9px] font-bold uppercase tracking-[0.08em]">
                                Angina
                            </th>

                            <th className="px-2 py-[7px] text-[9px] font-bold uppercase tracking-[0.08em]">
                                MI
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {comparisonTableData.map((item, index) => (
                            <tr key={index} className="border-t border-[#D7DDE5]">
                                <td className="bg-[#F7FAFC] px-2 py-[7px] font-semibold text-[#1a2332]">
                                    {item.feature}
                                </td>

                                <td className="px-2 py-[7px] text-[#4a5568]">
                                    {item.angina}
                                </td>

                                <td
                                    className={`px-2 py-[7px] ${item.mi.includes("Elevated")
                                        ? "font-semibold text-[#374151]"
                                        : "text-[#4a5568]"
                                        }`}
                                >
                                    {item.mi}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
export default ComparisonTableData;