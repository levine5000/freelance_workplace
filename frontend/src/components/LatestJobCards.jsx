import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-xl transition-all duration-200 cursor-pointer group"
    >
      {/* Company Info */}
      <div className="mb-3">
        <h2 className="text-gray-800 dark:text-white font-semibold text-lg group-hover:text-blue-600 transition">
          {job?.company?.name}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Kenya</p>
      </div>

      {/* Job Title & Description */}
      <div className="mb-4">
        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2 group-hover:underline">
          {job?.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 font-medium" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 font-medium" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-medium" variant="ghost">
          Ksh {job?.salary?.toLocaleString()}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
