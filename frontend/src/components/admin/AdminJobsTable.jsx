import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table';
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from '../ui/popover';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAllAdminJobs } from '@/redux/jobSlice'; // adjust import path
import { toast } from 'sonner';
import { deleteJobById } from '../api/job';

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    const handleDelete = async (jobId) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;

        try {
            await deleteJobById(jobId);
            toast.success("Job deleted successfully");
            setFilterJobs(prev => prev.filter(job => job._id !== jobId));
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Failed to delete job");
        }
    };


    const highlightText = (text, search) => {
        if (!search) return text;
        const parts = text.split(new RegExp(`(${search})`, 'gi'));
        return parts.map((part, i) =>
            part.toLowerCase() === search.toLowerCase()
                ? <mark key={i} className="bg-yellow-200">{part}</mark>
                : part
        );
    };

    useEffect(() => {
        const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) =>
            searchJobByText
                ? job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
                : true
        );
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="rounded-md shadow-sm bg-white p-4 overflow-x-auto">
            <Table>
                <TableCaption className="text-gray-600">A list of your posted jobs</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <tr
                                key={job._id}
                                className="hover:bg-gray-50 transition duration-200"
                            >
                                <TableCell className="py-2">{highlightText(job?.company?.name, searchJobByText)}</TableCell>
                                <TableCell>{highlightText(job?.title, searchJobByText)}</TableCell>
                                <TableCell>{job?.createdAt ? job.createdAt.split("T")[0] : '—'}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className="p-2 rounded hover:bg-gray-100">
                                            <MoreHorizontal className="text-gray-600" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40 bg-white shadow-md rounded-md p-2">
                                            <div
                                                onClick={() => navigate(`/admin/companies/${job._id}`)}
                                                className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition"
                                            >
                                                <Edit2 className="w-4 text-blue-500" />
                                                <span className="text-sm">Edit Job</span>
                                            </div>
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition"
                                            >
                                                <Eye className="w-4 text-green-500" />
                                                <span className="text-sm">View Applicants</span>
                                            </div>
                                            <div
                                                onClick={() => handleDelete(job._id)}
                                                className='flex items-center gap-2 py-1 px-2 rounded-md hover:bg-red-100 cursor-pointer transition text-red-600'
                                            >
                                                <Trash2 className='w-4' />
                                                <span>Delete</span>
                                            </div>

                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
