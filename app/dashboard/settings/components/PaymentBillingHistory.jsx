"use client";
import { useGetPaymentHistory } from "@/hooks/subscription-plan";
import { ArrowUpDown, Download } from "lucide-react";
import { useMemo, useState } from "react";

const PaymentBillingHistory = () => {
    const { paymentHistory, isLoading } = useGetPaymentHistory();
    console.log("Payment history:-", paymentHistory);
    const [sortAsc, setSortAsc] = useState(true);
    const [selectedInvoices, setSelectedInvoices] = useState([]);

    const invoices = useMemo(() => {
        return (
            paymentHistory?.map((invoice) => ({
                id: invoice.invoice_id,
                name: invoice.package,
                date: invoice.paid_date,
                amount: `$${Number(invoice.amount).toFixed(2)}`,
                status: "Paid",
                invoiceUrl: invoice.invoice_url,
            })) || []
        );
    }, [paymentHistory]);

    const handleSelectRow = (checked, id) => {
        if (checked) {
            setSelectedInvoices((prev) => [...prev, id]);
        } else {
            setSelectedInvoices((prev) => prev.filter((item) => item !== id));
        }
    };

    const sortedInvoices = useMemo(() => {
        return [...invoices].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            return sortAsc ? dateA - dateB : dateB - dateA;
        });
    }, [invoices, sortAsc]);

    const handleSortInvoices = () => {
        setSortAsc((prev) => !prev);

        showToast(
            `Sorted invoices ${sortAsc ? "oldest first" : "newest first"}`
        );
    };

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedInvoices(sortedInvoices.map((inv) => inv.id));
        } else {
            setSelectedInvoices([]);
        }
    };


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-4">
            <div>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">Billing history</h3>
                <p className="text-slate-400 text-xs mt-1">Review previous payments, transaction receipts, and invoice status.</p>
            </div>

            <div className="lg:col-span-2">
                <div className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-125">
                            <thead>
                                <tr className="bg-slate-50/80 text-slate-700 text-xs font-bold border-b border-slate-200">
                                    <th className="py-4 px-6 w-12">
                                        <input
                                            type="checkbox"
                                            className="rounded border-slate-350 text-[#2C5F8D] focus:ring-[#2C5F8D] w-4 h-4 cursor-pointer"
                                            checked={
                                                sortedInvoices.length > 0 &&
                                                selectedInvoices.length === sortedInvoices.length
                                            }
                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                        />
                                    </th>
                                    <th className="py-4 px-4 font-bold select-none cursor-pointer" onClick={handleSortInvoices}>
                                        <span className="flex items-center gap-1 hover:text-slate-900 transition-colors">
                                            Invoice
                                            <ArrowUpDown size={13} className="text-slate-400 shrink-0" />
                                        </span>
                                    </th>
                                    <th className="py-4 px-4">Date</th>
                                    <th className="py-4 px-4">Amount</th>
                                    <th className="py-4 px-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-slate-500">
                                            Loading payment history...
                                        </td>
                                    </tr>
                                ) : sortedInvoices.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-slate-500">
                                            No payment history found.
                                        </td>
                                    </tr>
                                ) : (
                                    sortedInvoices.map((inv) => {
                                        const isSelected = selectedInvoices.includes(inv.id);

                                        return (
                                            <tr
                                                key={inv.id}
                                                className={`hover:bg-slate-50/50 transition-colors ${isSelected ? "bg-slate-50/30" : ""
                                                    }`}
                                            >
                                                <td className="py-4 px-6">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-slate-300 text-[#2C5F8D] focus:ring-[#2C5F8D] w-4 h-4 cursor-pointer"
                                                        checked={isSelected}
                                                        onChange={(e) =>
                                                            handleSelectRow(e.target.checked, inv.id)
                                                        }
                                                    />
                                                </td>

                                                <td className="py-4 px-4 font-bold">
                                                    <a
                                                        href={inv.invoiceUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[#2C5F8D] hover:underline"
                                                    >
                                                        {inv.name}
                                                    </a>
                                                </td>

                                                <td className="py-4 px-4 text-slate-500">
                                                    {new Date(inv.date).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </td>

                                                <td className="py-4 px-4 font-bold text-slate-750">
                                                    {inv.amount}
                                                </td>

                                                <td className="py-4 px-4">
                                                    <span className="inline-flex bg-emerald-50 text-emerald-600 border border-emerald-200/80 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                                                        {inv.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <a
                                                        href={inv.invoiceUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        download
                                                        className="inline-flex items-center gap-2 bg-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                                                    >
                                                        <Download size={14} />
                                                    </a>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentBillingHistory;