import React from 'react';


const Notification = ({ type, title, message, image }) => {
    return (
        <div className='flex flex-row justify-center gap-7 items-center mb-6 '>
            <div className={`w-1/3 rounded-full `}>
              <img src={image} alt="image" className="w-full h-full object-cover" />
            
            </div>

            <div className="w-2/3 ml-1">
            <h4 className='font-bold mb-1'>{title}</h4>
            <p className='text-gray-400 text-wrap'>{message}</p>
            
            </div>
        </div>
    );
};

export default Notification;
