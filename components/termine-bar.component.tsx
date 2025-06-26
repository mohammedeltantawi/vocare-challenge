import { ViewEnum } from '@/enums/view-type.enum';
import {  Plus, SlidersHorizontal } from 'lucide-react';

interface Props {
  view: ViewEnum,
  setView: React.Dispatch<React.SetStateAction<ViewEnum>>;
}

export default function TermineBarComponent({ view, setView }: Props) {
  const currentDate = new Date()
  return (
    <div className='w-full justify-between items-center flex flex-row p-2'>
      <div className='flex flex-row gap-5'>
        <div className="text-lg font-semibold">{currentDate.toDateString()}</div>
        <div className="flex gap-2 bg-secondary p-1 rounded">
          <button onClick={()=>setView(ViewEnum.LIST)} className={`px-3 py-1 rounded text-sm ${view === ViewEnum.LIST ? "bg-white" : "bg-transparent text-secondaryText"}`}>Liste</button>
          <button onClick={()=>setView(ViewEnum.WEEK)} className={`px-3 py-1 rounded text-sm ${view === ViewEnum.WEEK ? "bg-white" : "bg-transparent text-secondaryText"}`}>Woche</button>
          <button onClick={()=>setView(ViewEnum.MONTH)} className={`px-3 py-1 rounded text-sm ${view === ViewEnum.MONTH ? "bg-white " : "bg-transparent text-secondaryText"}`}>Monat</button>
        </div>
      </div>
      <div className='flex flex-row gap-5'>
        <div id='termine-filtern-btn' className='cursor-pointer flex flex-row gap-2 items-center justify-center border border-s border-1 border-black w-fit h-8 px-3 py-1 text-sm rounded-md'>
          <SlidersHorizontal color="black" size={12} />
          <p>Termine filtern</p>
        </div>
        <div id='termine-filtern-btn' className='cursor-pointer bg-black flex flex-row gap-2 items-center justify-center border border-s border-1 border-black w-fit h-8 px-3 py-1 text-sm rounded-md'>
          <Plus color="white" size={12} />
          <p className='text-white'>Neuer Termin</p>
        </div>
      </div>

    </div>
  )
}