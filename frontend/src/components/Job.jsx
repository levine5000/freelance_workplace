import React from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return days === 0 ? 'Today' : `${days} day${days > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="p-6 rounded-xl shadow-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {daysAgoFunction(job?.createdAt)}
        </p>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bookmark className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={job?.company?.logo}
            alt={job?.company?.name}
            className="object-cover"
          />
        </Avatar>
        <div>
          <h2 className="text-base font-semibold dark:text-white">{job?.company?.name}</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Kenya</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mb-4">
        <h3 className="text-lg font-bold dark:text-white">{job?.title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">{job?.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <Badge variant="secondary" className="text-blue-700 dark:text-blue-400 font-medium">
          {job?.position} Positions
        </Badge>
        <Badge variant="secondary" className="text-red-700 dark:text-red-400 font-medium">
          {job?.jobType}
        </Badge>
        <Badge variant="secondary" className="text-green-700 dark:text-green-400 font-medium">
          Ksh {job?.salary}
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full sm:w-auto text-white"
        >
          View Details
        </Button>
        <Button
          className="bg-[#7239b7] hover:bg-[#6128a6] text-white w-full sm:w-auto transition"
        >
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
