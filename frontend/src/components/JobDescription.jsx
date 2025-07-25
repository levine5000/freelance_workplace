import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { setSingleJob } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const jobId = useParams().id;
  const dispatch = useDispatch();

  const isInitiallyApplied =
    singleJob?.applications?.some((app) => app.applicant === user?._id) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`https://freelance-workplace.onrender.com/api/v1/application/apply/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.succes) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Application failed.");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some((app) => app.applicant === user?._id)
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (!singleJob) return <p className="text-center py-10">Loading job details...</p>;

  const {
    title,
    position,
    jobType,
    salary,
    location,
    description,
    experience,
    applications,
    createdAt,
    company,
  } = singleJob;

  const formattedDate = new Intl.DateTimeFormat('en-KE', {
    dateStyle: 'long',
  }).format(new Date(createdAt));

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">Posted by {company?.name || 'Company'}</p>
          <div className="flex flex-wrap gap-3 mt-3">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {position} Position{position > 1 ? 's' : ''}
            </Badge>
            <Badge className="text-red-700 font-bold" variant="ghost">
              {jobType}
            </Badge>
            <Badge className="text-green-700 font-bold" variant="ghost">
              Ksh {salary}
            </Badge>
          </div>
        </div>

        <Button
          onClick={!isApplied ? applyJobHandler : undefined}
          disabled={isApplied}
          className={`text-white h-12 px-6 rounded-lg transition ${
            isApplied
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#7209b7] hover:bg-[#5f32ad]'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <div className="mt-10 border-t pt-6 space-y-4 text-gray-800">
        <div>
          <strong className="block mb-1">Role:</strong>
          <p>{title}</p>
        </div>

        <div>
          <strong className="block mb-1">Location:</strong>
          <p>{location}</p>
        </div>

        <div>
          <strong className="block mb-1">Description:</strong>
          <p className="whitespace-pre-line">{description}</p>
        </div>

        <div>
          <strong className="block mb-1">Experience Required:</strong>
          <p>{experience} {experience > 1 ? 'years' : 'year'}</p>
        </div>

        <div>
          <strong className="block mb-1">Salary Range:</strong>
          <p>Ksh {salary}</p>
        </div>

        <div>
          <strong className="block mb-1">Total Applicants:</strong>
          <p>{applications?.length || 0}</p>
        </div>

        <div>
          <strong className="block mb-1">Date Posted:</strong>
          <p>{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
