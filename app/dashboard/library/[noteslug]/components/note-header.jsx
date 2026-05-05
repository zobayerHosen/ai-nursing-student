const NoteHeader = ({ title, folder, date }) => {
    return (
        <div className="mb-6">
            <p className="text-xs text-[#667085] mb-2 font-medium">
                {folder} - Saved {date}
            </p>
            <h1 className="text-[32px] font-bold text-[#1B4B66] leading-tight">
                {title}
            </h1>
        </div>
    );
};

export default NoteHeader;