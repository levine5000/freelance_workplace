import React, { useContext, useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, User } from 'lucide-react'
import { Badge } from "@/components/ui/badge";
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAllAppliedJobs from '@/hooks/useGetAppliedJobs'

///const skills = ["Html", "CSS", "JavaScript", "ReactJs"]
const isResume = true;

const Profile = () => {
  useGetAllAppliedJobs();
  const [open, setOpen] = useState(false);
  const {user} = useSelector(store=>store.auth)
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className="h-24 w-24">
              <AvatarImage src="data:image/jpeg;base64,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" alt="profile" />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() =>setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
        </div>
        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className='space-x-2 my-5'>
          <h1>Skills</h1>
          <div className='flex items-center gap-1'>
            {
              user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge className="bg-black text-white" key={index}>{item}</Badge>) : <span>NA</span>
            }
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label className="text-md font-bold">Resume</Label>
            {
              isResume ? <a target='blank' rel="noopener noreferrer" href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
            }
        </div>
      </div>
       <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
            <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
            <AppliedJobTable/>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile
