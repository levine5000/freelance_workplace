import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import { useParams } from 'react-router-dom';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import axios from 'axios';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`https://freelance-workplace.onrender.com/api/v1/api/v1/application/${id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.error("Failed to fetch applicants:", error);
            }
        };

        fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Applicants
                        {applicants?.application?.length > 0 && (
                            <span className="ml-2 text-blue-600 text-lg font-semibold">
                                ({applicants.application.length})
                            </span>
                        )}
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        List of people who applied for this job post.
                    </p>
                </div>

                {applicants?.applications?.length > 0 ? (
                    <ApplicantsTable />
                ) : (
                    <div className="bg-white shadow rounded-md p-6 text-center text-gray-500 border border-dashed border-gray-300">
                        No applicants yet for this job.
                    </div>
                )}
            </main>
        </div>
    );
};

export default Applicants;
