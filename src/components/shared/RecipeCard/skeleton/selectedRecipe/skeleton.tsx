   export const SelectedRecipeCardSkeleton = () => (
  <div className="bg-gray-100 p-8 border rounded-3xl overflow-hidden  border-gray-200 animate-pulse">
      <div className="flex gap-10">
        <div className="w-[30%] max-h bg-gray-300 rounded-3xl"></div>
        <div className="w-[70%] space-y-8">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-20 bg-gray-300 rounded"></div>
          <div className="flex gap-6">
            <div className="h-8 w-32 bg-gray-300 rounded"></div>
            <div className="h-8 w-32 bg-gray-300 rounded"></div>
          </div>
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="h-8 w-24 bg-gray-300 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
);