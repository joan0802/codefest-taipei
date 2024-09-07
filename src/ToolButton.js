export default function ToolButton({ icon, text, active }) {
    return (
        <div
            className={`flex flex-col items-center py-2 w-full ${
                active ? 'bg-[#B4E2EA]' : 'bg-transparent'
            }`}
            style={{
                transition: 'background-color 0.3s ease-in-out', // 平滑背景色過渡
            }}
        >
            <img className="w-[1.5rem] h-[1.5rem]" src={icon} alt={text} />
            <span className="mt-1 text-[#22474E]">{text}</span>
        </div>
    );
}
