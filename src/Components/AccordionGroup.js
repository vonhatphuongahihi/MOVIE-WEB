import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { accordionGroups } from '../Data/SupportData';
import '../Screens/Support.css';

function AccordionGroup() {
  // State quản lý trạng thái mở/đóng của từng accordion theo nhóm
  const [openStates, setOpenStates] = useState(
    accordionGroups.map((group) => group.accordions.map(() => false))
  )

  // Kiểm tra xem tất cả các accordion có đang mở hay không
  const areAllAccordionsOpen = openStates.flat().every((state) => state);

  // Hàm xử lý khi nhấn tiêu đề accordion trong một nhóm
  const toggleAccordion = (groupIndex, accordionIndex) => {
    const newOpenStates = openStates.map((groupStates, i) =>
      i === groupIndex
        ? groupStates.map((isOpen, j) => (j === accordionIndex ? !isOpen : isOpen))
        : groupStates
    );
    setOpenStates(newOpenStates);
  };

  // Hàm để đóng hoặc mở tất cả accordion dựa vào trạng thái hiện tại
  const toggleAllAccordions = () => {
    const newOpenState = !areAllAccordionsOpen;
    setOpenStates(accordionGroups.map((group) => group.accordions.map(() => newOpenState)));
  };

  return (
    <div className='containerSupport'>
      
      {/* Duyệt qua từng nhóm và render chúng */}
      {accordionGroups.map((group, groupIndex) => (
        <div key={group.groupId} className='groupContainer'>

          <div className='collapseAlign'>
            <h2 className='groupTitle'>{group.groupTitle}</h2>
            {/*Thêm nút Thu gọn toàn bộ vào tiêu đề đầu tiên*/}
            {groupIndex === 0 && 
              <span className='collapseButton' onClick={toggleAllAccordions}>
              {areAllAccordionsOpen ? 'Thu gọn toàn bộ' : 'Mở rộng toàn bộ'}
              </span>
            }
          </div>

          {/* Duyệt qua từng accordion trong nhóm và render chúng */}
          {group.accordions.map((accordion, accordionIndex) => (
            <div key={accordion.id} className='accordionItem'>
              <div
                className='header'
                onClick={() => toggleAccordion(groupIndex, accordionIndex)}
              >
                <button className='button'>
                  {openStates[groupIndex][accordionIndex] ? <IoIosArrowUp className='arrow'/> : <IoIosArrowDown className='arrow'/>}
                </button>
                <h3 className='title'>{accordion.title}</h3>
              </div>
              {/* Hiển thị nội dung nếu trạng thái mở của accordion hiện tại là true */}
              {openStates[groupIndex][accordionIndex] && (
                <div 
                  className='content'
                  dangerouslySetInnerHTML={{ __html: accordion.content }}/>


              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Styles cho component
// const styles = {
//   collapseAlign: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   container: {
//     width: '80%',
//     margin: '20px auto',
//   },
//   collapseButton: {
//     display: 'block',
//     width: '30%',
//     backgroundColor: 'none',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     textAlign: 'right',
//     marginRight: '20px',
//   },
//   groupContainer: {
//     margin: '20px 0',
//     border: 'none',
//     borderRadius: 'none',
//     boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//   },
//   groupTitle: {
//     padding: 'none',
//     backgroundColor: 'none',
//     margin: 0,
//     textAlign: 'left',
//     color: '#28bd11',
//     fontWeight: 'bold',
//     fontSize: '18px',
//   },
//   accordionItem: {
//     margin: '10px 0',
//     borderRadius: '5px',
//     overflow: 'hidden',
//   },
//   header: {
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     backgroundColor: 'none',
//   },
//   title: {
//     margin: '10px 0px 10px 15px',
//   },
//   button: {
//     cursor: 'pointer',
//     backgroundColor: 'none',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '14px',
//   },
//   content: {
//     padding: '15px',
//     borderTop: '1px solid #ccc',
//     backgroundColor: 'none',
//   },
//   arrow: {
//     fontSize: '25px',
//   },
// };

export default AccordionGroup;
