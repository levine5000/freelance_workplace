import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Remote", "Nairobi", "Mombasa"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
  },
  {
    filterType: "Salary",
    array: ["75-100k", "120-180k", "200-380k", "400-500k", "510-970k"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Filter Jobs</h2>
      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-5">
        {filterData.map((section, sectionIndex) => (
          <div key={`filter-section-${sectionIndex}`} className="space-y-2">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 text-lg">{section.filterType}</h3>
            {section.array.map((item, itemIndex) => {
              const itemId = `radio-${sectionIndex}-${itemIndex}`;
              return (
                <div
                  key={itemId}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-md transition"
                >
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId} className="text-sm text-gray-700 dark:text-gray-300">
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
