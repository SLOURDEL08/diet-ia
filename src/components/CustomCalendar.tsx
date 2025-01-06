import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const CustomCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  const closeOverlay = () => {
    setSelectedDate(null);
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          className="h-8 border bg-white flex items-center justify-start px-3 cursor-pointer hover:bg-[#ff5e5b] hover:text-white rounded-lg"
          onClick={() => handleDateClick(day)}
         >
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="w-full relative mt-0 mx-auto border bg-gray-200/80 rounded-xl overflow-hidden">
      <div className="h-full space-y-4 p-6">
        <div className="flex justify-between items-center bg-white  border rounded-lg">
          <button onClick={() => navigateMonth('prev')} className="p-2  rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl fontOswald font-medium">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button onClick={() => navigateMonth('next')} className="p-2 rounded-full">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
            <div key={day} className="text-center fontSyneBold">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {renderCalendarDays()}
        </div>
      </div>
      
      {selectedDate && (
        <div className="absolute h-full w-full top-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-100   p-6 h-full w-full">
            <div className="flex justify-start gap-6 items- mb-4">
              <h3 className="text-xl  p-2 px-4 border bg-[#ff5e5b] text-white fontOswald font-bold rounded-lg">
                {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                          </h3>
                          <div className='flex gap-4'>
                               <div className='bg-white hover:bg-gray-200/80 transition-all duration-200 border flex justify-center items-center p-2 px-3 rounded-lg text-xl'>💪</div>
                                                    <div className='bg-white hover:bg-gray-200/80 transition-all duration-200 border flex justify-center items-center p-2 px-3 rounded-lg text-xl'>💪</div>
                          </div>
                         

              <button onClick={closeOverlay} className=" absolute right-6 hover:bg-[#ff5e5b] hover:border-[#ff5e5b] group p-2 bg-white rounded-lg border">
                <X className="w-6 h-6 group-hover:invert" />
              </button>
            </div>
            <p>Contenu pour la date sélectionnée...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;