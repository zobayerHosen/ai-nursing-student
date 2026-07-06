export default function NclexExamLayout({ children }) {
  return (
    <div className="flex flex-col xl:flex-row h-full xl:min-h-[calc(100vh-80px)] relative">
      {children}
    </div>
  );
}
