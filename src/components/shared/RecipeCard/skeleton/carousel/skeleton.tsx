const RecipeCardSkeleton: React.FC = () => {
    return (
 <div
    className='rounded-3xl  hover:z-50 hoverrecipe hover:shadow-md border border-gray-200 transition group bg-gray-100 min-w-72 p-4 flex flex-col group items-center gap-2 transition-colors'
  >
    <div className='relative w-full h-[120px] overflow-hidden rounded-xl bg-gray-200 animate-pulse'>
      <div
        className='absolute top-2 right-2 p-2 rounded-xl cursor-pointer backdrop-blur-sm hover:bg-white/90 transition bg-white/70'
      >
        <div className='w-[18px] h-[18px] bg-gray-300 rounded-full'></div>
      </div>
      <div
        className='absolute top-2 right-12 p-2 rounded-xl cursor-pointer backdrop-blur-sm hover:bg-white/90 transition bg-white/70'
      >
        <div className='w-[18px] h-[18px] bg-gray-300 rounded-full'></div>
      </div>
    </div>
    <div className='w-full flex flex-col gap-2 items-center'>
      <div className='flex gap-4 w-full justify-between items-center'>
        <span className='fontSyneRegular text-base w-2/3 h-6 bg-gray-200 rounded animate-pulse'></span>
        <div className='flex gap-1 items-center'>
          <div className='w-5 h-5 bg-gray-200 rounded-full animate-pulse'></div>
          <span className='font-semibold text-sm w-8 h-4 bg-gray-200 rounded animate-pulse'></span>
        </div>
      </div>
      <div className='flex gap-4 w-full justify-start items-center'>
        <div className='flex justify-start items-center gap-2'>
          <div className='relative h-6 rounded-full w-6 ctn-icon-recipe bg-gray-400/15 flex gap-1 items-center'>
            <div className='w-4 h-4 bg-gray-300 rounded-full m-auto'></div>
          </div>
          <span className='text-xs w-16 h-4 bg-gray-200 rounded animate-pulse'></span>
        </div>
        <div className='flex justify-start items-center gap-2'>
          <div className='relative h-6 rounded-full w-6 bg-gray-400/15 ctn-icon-recipe flex gap-1 items-center'>
            <div className='w-4 h-4 bg-gray-300 rounded-full m-auto'></div>
          </div>
          <span className='text-xs w-16 h-4 bg-gray-200 rounded animate-pulse'></span>
        </div>
      </div>
    </div>
  </div>
); };

export default RecipeCardSkeleton;
