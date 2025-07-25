import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus(); // Autofocus input on page load
    }, []);

    const searchJobHandler = () => {
        if (!query.trim()) return;
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
    return (
        <section className="text-center py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="flex flex-col gap-6 max-w-4xl mx-auto px-4">
                <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium w-fit">
                    Get 10x More Remote Job Interviews.
                </span>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                    Find Work. <br />
                    Hire Talent. <span className="text-[#6A38C2]">Succeed Together.</span>
                </h1>

                <p className="text-lg text-gray-600">
                    Join Kenya's fastest-growing freelance marketplace. Whether you're a skilled professional or a business looking to get things done—you’re in the right place.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-[80%] md:w-[60%] mx-auto">
                    <div className="flex flex-1 items-center w-full border border-gray-200 shadow-sm rounded-full px-4">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Find Your Dream Job"
                            aria-label="Job search input"
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full py-2 px-2 outline-none bg-transparent"
                        />
                        <Button
                            onClick={searchJobHandler}
                            className="rounded-full bg-black text-white hover:bg-neutral-800"
                        >
                            <Search className="w-4 h-4 mr-2" />
                            Search
                        </Button>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-4">
                    <Button onClick={() => navigate('/login')} className="bg-[#6A38C2] text-white hover:bg-purple-800">
                        Join as Freelancer
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/login')}>
                        Post a Job
                    </Button>
                </div>

                <div className="text-sm text-gray-500 mt-6">
                    ✅ Trusted by 10,000+ freelancers & businesses across Kenya
                </div>
            </div>
        </section>
    );
};

export default HeroSection;