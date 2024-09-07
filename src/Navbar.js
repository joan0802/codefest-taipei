import ToolButton from "./ToolButton";

export default function Navbar() {
    return (
        <div className="bg-[#DBF1F5] text-white py-4 flex justify-around">
            <ToolButton icon="🏠" text="托嬰地圖" />
            <ToolButton icon="📝" text="育嬰問答" />
            <ToolButton icon="📅" text="設定" />
        </div>
    );
}
