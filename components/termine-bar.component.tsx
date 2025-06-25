import { createClient } from '@/lib/supabase/server';

export default async function TermineBarComponent() {
  
  return (
    <div className='w-full'>
        <div className='flex flex ro'>

        </div>

        <div id='termine-filtern-btn' className='flex flex-row gap-2 items-center justify-center border border-s border-1 border-black w-fit h-5'>
            <p>icon</p>
            <p>Termine filtern</p>
        </div>

    </div>
  )
}