export default function ToolButton({ icon, text }) {
    return (
      <div className="flex flex-col items-center">
        <span className="icon">{icon}</span>
        <span className="text-[#22474E]">{text}</span>
      </div>
    );
}