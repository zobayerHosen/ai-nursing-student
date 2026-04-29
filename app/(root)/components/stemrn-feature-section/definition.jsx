import { anginaTypes } from "@/data";

const Definition = () => {
    return (
        <div className="rounded-[9px] border border-[#FFF1F4] bg-linear-to-br from-[#FFF8FA] to-white p-[14px]">
            <div className="mb-[3px] font-mono text-[9px] font-semibold uppercase tracking-widest text-[#FE5E7E]">
                Clinical Term
            </div>

            <h4 className="mb-1 text-[14.5px] font-bold text-[#2C5F8D]">
                Angina Pectoris
            </h4>

            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-[#FE5E7E]">
                Chest Pain from Temporary Myocardial Ischemia
            </p>

            <div className="space-y-[10px] text-[12px] leading-[1.65] text-[#4a5568]">
                <p>
                    <strong className="text-[#1a2332]">
                        Angina Pectoris
                    </strong>{" "}
                    is chest pain or discomfort caused by temporary{" "}
                    <strong className="text-[#1a2332]">
                        myocardial ischemia
                    </strong>{" "}
                    — meaning the heart muscle is not getting enough oxygen
                    for its current workload.
                </p>

                <p>
                    Unlike{" "}
                    <strong className="text-[#1a2332]">
                        myocardial infarction (MI)
                    </strong>
                    , angina causes{" "}
                    <strong className="text-[#1a2332]">
                        no permanent muscle damage
                    </strong>
                    . Troponin levels usually remain normal.
                </p>

                <p>
                    Pain is commonly described as{" "}
                    <strong className="text-[#1a2332]">
                        pressure, squeezing, tightness, or heaviness
                    </strong>
                    , usually felt in the substernal chest area and sometimes
                    radiating to the left arm, shoulder, neck, or jaw.
                </p>

                <div className="rounded-[7px] border border-[#FFE4EA] bg-white/80 p-3">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#FE5E7E]">
                        Three Main Types
                    </p>

                    <ul className="space-y-2 text-[12px] leading-[1.55]">
                        {anginaTypes.map((type, index) => (
                            <li key={index}>
                                <strong className="text-[#1a2332]">
                                    {type.title}:
                                </strong>{" "}
                                {type.description}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default Definition;