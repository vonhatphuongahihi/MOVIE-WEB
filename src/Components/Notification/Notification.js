import React from 'react';


const Notification = ({ type, title, message, image }) => {
    return (
        <div className='flex flex-row justify-center gap-3 items-center bg-notif rounded-lg py-3 px-5 mb-5 text-left'>
            <div className={`w-1/3 rounded-full `}>
              <img src={image} alt="image" className="w-full h-full object-cover rounded-lg" />
            
            </div>

            <div className="w-2/3 ml-1">
            <h4 className='font-bold mb-1'>{title}</h4>
            <p className='text-gray-200 font-thin text-wrap text-sm'>{message}</p>
            
            </div>
        </div>
    );
};

export default Notification;
