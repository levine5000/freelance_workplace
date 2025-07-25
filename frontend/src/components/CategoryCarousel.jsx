import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'

const category = [
    "Frontend Dev",
    "Backed Dev",
    "AI Engineer",
    "Fullstack Dev",
    "Graphic Designer",
    "Data Scientist",
    "Marketing",
    "Content Writing",
    "Data Entry",
    "AI & ML",
    "Finance",
    "Virtual Assistant"
];
const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
    return (
        <div className='mt-8 px-4'>
            <h2 className="text-xl font-semibold text-center mb-4">Explore Categories</h2>
      
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>

                    {
                        category.map((cat, index) => (
                            <CarouselItem key={cat} className="md:basis-1/2 lg-basis-1/3">
                                <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }

                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel