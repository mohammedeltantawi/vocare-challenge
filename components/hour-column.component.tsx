export default function HourColumn() {
  const startHour = 6;
  const endHour = 22; // 10 PM

  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => i + startHour);

  return (
    <div className="border-r text-xs font-medium h-[1000px] relative">
      {hours.map((hour) => (
        <div
          key={hour}
          className="h-[100px] flex items-center justify-end pr-2 border-b text-secondaryText"
        >
          {hour}:00
        </div>
      ))}
    </div>
  );
}
