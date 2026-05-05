const NoteTag = ({ label, color }) => {
    const getStyles = () => {
        switch (color) {
            case "blue":
                return "bg-[#D1E9FF] text-[#1B4B66]";
            case "blue-gray":
                return "bg-[#D1D5DB] text-[#1B4B66]";
            case "orange":
                return "bg-[#FFEAD5] text-[#FF8A00]";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${getStyles()}`}
        >
            {label}
        </span>
    );
};

export default NoteTag;