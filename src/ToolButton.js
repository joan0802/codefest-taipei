export default function ToolButton({ icon, text, onClick }) {
    return (
      <div className="flex flex-col items-center">
        <img className="w-[1.5rem] h-[1.5rem]" src={ icon }>
        </img>
        <span className="mt-1 text-[#22474E]">{text}</span>
      </div>
    );
}