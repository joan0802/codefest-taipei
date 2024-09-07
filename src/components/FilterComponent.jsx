// src/components/FilterComponent.js
import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa'; // Importing a filter icon from react-icons

function FilterComponent({ setFilter }) {
  const [isOpen, setIsOpen] = useState(false); // State to control visibility
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
        prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleGrade = (grade) => {
    setSelectedGrades((prev) =>
        prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
    );
  };

  const applyFilter = () => {
    setFilter({ types: selectedTypes, grades: selectedGrades });
    setIsOpen(false);
  };

  return (
      <div className="relative">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-4 left-4 z-10 bg-white shadow-md p-2 rounded-full"
        >
          <FaFilter size={24} />
        </button>

        {isOpen && (
            <div className="absolute top-14 left-4 z-10 bg-white p-4 rounded-lg shadow-md w-80">
              <h3 className="font-bold mb-2">托嬰中心類型</h3>
              <div className="filter-options flex flex-wrap gap-2">
                {["大公托", "小家園", "準公共", "私立"].map((type) => (
                    <button
                        key={type}
                        onClick={() => toggleType(type)}
                        className={`rounded-full px-4 py-1 border transition-colors duration-300 ${
                            selectedTypes.includes(type) ? 'bg-[#468D9B] text-white' : 'bg-white border-gray-300'
                        }`}
                    >
                      {type}
                    </button>
                ))}
              </div>

              <h3 className="font-bold mb-2 mt-4">評鑒等級</h3>
              <div className="filter-options flex flex-wrap gap-2">
                {["優等", "甲等", "乙等", "丙等"].map((grade) => (
                    <button
                        key={grade}
                        onClick={() => toggleGrade(grade)}
                        className={`rounded-full px-4 py-1 border transition-colors duration-300 ${
                            selectedGrades.includes(grade) ? 'bg-[#468D9B] text-white' : 'bg-white border-gray-300'
                        }`}
                    >
                      {grade}
                    </button>
                ))}
              </div>

              <button
                  onClick={applyFilter}
                  className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2"
              >
                Apply Filter
              </button>
            </div>
        )}
      </div>
  );
}

export default FilterComponent;
