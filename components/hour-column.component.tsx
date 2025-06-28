export default function HourColumn() {
  const hours = Array.from({ length: 24 }, (_, i) => 0 + i); // 6:00 to 22:00
  return (
    <div className="relative text-right text-xs pr-1 h-[1020px]">
      {hours.map((h, i) => (
        <div
          key={h}
          className="absolute right-1 text-gray-400"
          style={{ top: `${i * 120}px` }}
        >
          {h}:00 Uhr
        </div>
      ))}
    </div>
  );
}
