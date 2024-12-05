import React from 'react';
import AccordionGroup from '../Components/AccordionGroup';
import Layout_main from '../Layout/Layout_main';

function Support() {
  return (
    <Layout_main>
      <div className="min-height-screen container mx-auto px-2 my-6">
      
        <div className="xl:pt-3 xl:pb-8 py-5 px-4">
          <AccordionGroup />
        </div>
      </div>
      
    </Layout_main>
  );
}

export default Support;