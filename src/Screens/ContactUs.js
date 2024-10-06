import React from 'react';
import { FiPhoneCall, FiMapPin, FiMail } from 'react-icons/fi';
import Head from '../Components/Head';
import Layout from '../Layout/Layout';

function ContactUs() {
  const ContactData = [
    {
      id: 1,
      title: 'Email',
      info: 'Quý khách có thể liên hệ với chúng tôi thông qua địa chỉ thư điện tử.',
      icon: FiMail,
      contact: 'info@zpunet.com',
    },
    {
      id: 2,
      title: 'Điện thoại',
      info: 'Hoặc gọi về số điện thoại. Chúng tôi luôn sẵn sàng phục vụ quý khách.',
      icon: FiPhoneCall,
      contact: '+84 365 486 141',
    },
    {
      id: 3,
      title: 'Địa chỉ',
      info: 'UIT ĐHQG HCM, Đông Hòa, Dĩ An, Bình Dương, Việt Nam,',
      icon: FiMapPin,
      contact: '',
    },
  ];
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title="CONTACT" />
        <div className="grid mg:grid-cols-2 gap-6 lg:my-20 my-10 lg:grid-cols-3 xl:gap-8">
          {ContactData.map((item) => (
            <div
              key={item.id}
              className="border border-border flex-colo p-10 bg-dry rounded-lg text-center"
            >
              <span className="flex-colo w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl">
                <item.icon />
              </span>
              <h5 className="text-xl font-semibold mb-2">{item.title}</h5>
              <p className="mb-0 text-sm text-text leading-7">
                <a href={`mailto:${item.contact}`} className="text-blue-600">
                  {item.contact}
                </a>{' '}
                {item.info}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ContactUs;
