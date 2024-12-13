import React, { useContext } from 'react';
import AccordionGroup from '../Components/AccordionGroup';
import Layout1 from '../Layout/Layout1';
import LayoutGuest1 from '../Layout/LayoutGuest1';
import { UserContext } from '../Context/UserContext';

function Support() {
  const { isLoggedIn } = useContext(UserContext);

  const SupportContent = () => (
    <div className="min-height-screen container mx-auto px-2 my-6">
      <div className="xl:pt-3 xl:pb-8 py-5 px-4">
        <AccordionGroup />
      </div>
    </div>
  );

  return (
    <>
      {isLoggedIn ? (
        <Layout1>
          <SupportContent />
        </Layout1>
      ) : (
        <LayoutGuest1>
          <SupportContent />
        </LayoutGuest1>
      )}
    </>
  );
}

export default Support;
