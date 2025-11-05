import React, {useState, useEffect} from 'react';
// import useSelector for select users from database 
import { useSelector , useDispatch} from 'react-redux';
import { fetchUsers } from '../../state_manage/features/users/users';
import { FaStar } from 'react-icons/fa';
// here are some dummy users 

const ManageUsers = () => {
  const dispatch = useDispatch();
  // states to manage pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10;
  // fetch users from the store
  useEffect(() => {
    dispatch(fetchUsers());
  },[])
  const users = useSelector((state) => state.users.users);
   // index of first item and index of last item and current pages
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users?.slice(indexOfFirstItem, indexOfLastItem)
  const [blocked, setBlocked]=useState(null)
  // block a user
  function handleBlock(user){
    const {name, _id}=user
      const confirm=window.confirm(`Are you want to block this user ${name} ?`)
      if(confirm){
        alert(`${name} you are blocked from this app.`)
        setBlocked(_id)
      }
  }
  return (
    <div className="shadow w-full overflow-x-auto relative">
      <div className="flex justify-center items-center mb-10">
        <h1 className="text-black text-center font-bold text-4xl mt-4">Manage Users</h1>
      </div>

      {/* a table of users list */}
      <div className="">
      <table className="min-w-full text-left mx-5 bg-neutral-500">
        <thead className=" text-white">
          <tr className="uppercase bg-black text-white tracking-wide">
            <th className="px-6 py-3 font-semibold uppercase">Name</th>
            <th className="px-6 py-3 font-semibold uppercase">Email</th>
            <th className="px-6 py-3 font-semibold uppercase">Contact</th>
            <th className="px-6 py-3 font-semibold uppercase">Address</th>

            <th className='px-6 py-3 font-semibold uppercase'>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentUsers?.map((user) => (
            <tr key={user._id} className="text-white border-b border-gray-700 hover:bg-neutral-600 transition-colors">
              <td className="px-6 py-4">{user?.name}</td>
              <td className="px-6 py-4">{user?.email}</td>
              <td className="px-6 py-4">{user?.mobile}</td>
              <td className="px-6 py-4">{user?.address}</td>
              <td className='px-6 py-4'>
                <button
                  onClick={()=>handleBlock(user)}
                  className={`bg-neutral-400 text-black px-3 py-2 rounded-lg font-semibold shadow-md hover:shadow-red-500/40 hover:scale-105 transition-all duration-300 ${blocked === user?._id ? 'bg-black text-white hover:cursor-not-allowed' : ''}`}
                >
                  {blocked === user?._id ? ' Blocked' : 'Block'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* pagination buttons */}
      <div  className='flex items-center justify-center gap-2 my-6'>
        {/* previous button */}
        <button
        disabled={currentPage===1}
        onClick={()=>setCurrentPage((prev)=>prev-1)}
        className={`px-4 py-2 bg-neutral-800 text-white rounded-lg font-semibold shadow-md hover:bg-neutral-800 hover:shadow-lg transition-all duration-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >Previous</button>
        {/* numbers between the buttons */}
        {
          Array.from({length: Math.ceil(users.length / itemsPerPage)}, (_, i)=>(
            <button
            key={i}
            onClick={()=>setCurrentPage(i+1)}
             className={`px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-neutral-600 hover:shadow-lg transition-all duration-300 ${currentPage === i+1 ? 'bg-black text-white' : 'bg-yellow-200 text-gray-800'}`}
            >{i+1}</button>
          ))

        }
        {/* next buttons */}
        <button
        disabled={currentPage===Math.ceil(users.length / itemsPerPage)}
        onClick={()=>setCurrentPage((prev)=>prev+1)}
        className={`px-4 py-2 bg-neutral-600 text-white rounded-lg font-semibold shadow-md hover:bg-neutral-800 hover:shadow-lg transition-all duration-300 ${currentPage === Math.ceil(users.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >Next</button>

      </div>

    </div>
  );
};

export default ManageUsers;
