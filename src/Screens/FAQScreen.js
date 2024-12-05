import React, { useState } from 'react';
import Layout_main from '../Layout/Layout_main';

const faqData = [
  {
    question: "Làm thế nào để đăng ký tài khoản?",
    answer: "Để đăng ký tài khoản, bạn chỉ cần nhấn vào nút 'Đăng Ký' ở góc phải màn hình, sau đó điền thông tin cá nhân của bạn và hoàn tất quá trình đăng ký. Sau khi đăng ký, bạn có thể đăng nhập để truy cập vào các bộ phim và các dịch vụ khác."
  },
  {
    question: "Làm thế nào để đăng nhập vào tài khoản của tôi?",
    answer: "Bạn chỉ cần nhấn vào nút 'Đăng Nhập' và nhập email cùng mật khẩu mà bạn đã sử dụng khi đăng ký tài khoản. Nếu bạn quên mật khẩu, hãy nhấn vào 'Quên mật khẩu' để khôi phục tài khoản của mình."
  },
  {
    question: "Trang web có tính phí không?",
    answer: "Một số bộ phim và dịch vụ trên trang web có thể yêu cầu bạn đăng ký gói thuê bao. Tuy nhiên, chúng tôi cũng cung cấp các bộ phim miễn phí để bạn có thể thưởng thức."
  },
  {
    question: "Làm sao để chọn bộ phim mình muốn xem?",
    answer: "Bạn có thể tìm kiếm bộ phim theo tên, thể loại, hoặc năm phát hành thông qua ô tìm kiếm ở trên cùng trang web. Ngoài ra, chúng tôi cũng có các danh sách phim đề xuất dựa trên sở thích của bạn."
  },
  {
    question: "Tại sao tôi không thể phát video?",
    answer: "Nếu bạn gặp sự cố khi phát video, hãy kiểm tra kết nối internet của bạn và đảm bảo rằng trình duyệt của bạn đang sử dụng phiên bản mới nhất. Bạn cũng có thể thử làm mới trang hoặc thử phát lại video."
  },
  {
    question: "Tôi có thể xem phim ở đâu?",
    answer: "Bạn có thể xem phim ngay trên trình duyệt web của mình, trên các thiết bị di động hoặc TV thông qua ứng dụng của chúng tôi nếu có."
  },
  {
    question: "Trang web có hỗ trợ phụ đề không?",
    answer: "Có, chúng tôi hỗ trợ phụ đề cho nhiều bộ phim, bạn có thể bật hoặc tắt phụ đề trong khi xem video. Phụ đề sẽ được hiển thị nếu có sẵn."
  },
  {
    question: "Tôi có thể tải phim về để xem offline không?",
    answer: "Hiện tại, chúng tôi không hỗ trợ tính năng tải phim về để xem offline. Tuy nhiên, bạn có thể xem trực tuyến mọi lúc mọi nơi nếu có kết nối internet."
  },
  {
    question: "Làm thế nào để hủy gói đăng ký của tôi?",
    answer: "Để hủy gói đăng ký, bạn có thể vào phần 'Cài Đặt Tài Khoản' và chọn 'Hủy Đăng Ký'. Sau khi hủy, bạn sẽ không bị tính phí cho các chu kỳ tiếp theo."
  },
  {
    question: "Tôi có thể liên hệ với bộ phận hỗ trợ khách hàng như thế nào?",
    answer: "Nếu bạn gặp bất kỳ vấn đề nào, hãy liên hệ với chúng tôi qua email tại melon_movie@gmail.com hoặc sử dụng tính năng chat trực tiếp trên trang web của chúng tôi."
  }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer py-4 px-6 bg-main flex justify-between items-center"
      >
        <span className="font-medium">{question}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-black-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
      {isOpen && (
      <div className="px-6 pb-4 text-gray-400" style={{ fontSize: '14px' }}>
        {answer}
      </div>
    )}
      </div>
  );
};

const FAQScreen = () => {
  const [newQuestion, setNewQuestion] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // You can add logic here to handle form submission, like sending data to your backend.
    setFormSubmitted(true);
    setNewQuestion('');
    setNewEmail('');
  };

  return (
    <Layout_main>
    <div className="min-h-screen bg-main">
        
      <div className="flex justify-center p-6">
        {/* Cột FAQ */}
        <div className="w-full md:w-3/4 bg-main p-6 rounded-lg shadow-md mr-4">
        <h3 style={{ fontWeight: 500, fontSize: '20px' }} className="text-2xl text-[20px] mb-4 text-subMain text-center">
        CÂU HỎI THƯỜNG GẶP
      </h3>
                {faqData.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* Cột Gửi Câu Hỏi Mới */}
        <div className="w-full md:w-1/2 bg-main p-6 rounded-lg shadow-md">
        <div className="mb-6 text-center">
            <img 
              src="https://www.presteamshop.com/blog/wp-content/uploads/2020/07/que-son-las-faqs-o-preguntas-frecuentes.jpg" 
              alt="FAQ Illustration"
              className="max-w-full rounded-lg shadow-md"
            />
          </div>
          <h2 className="text-xl font-semibold text-subMain mb-4 text-center">Gửi Câu Hỏi Thắc Mắc</h2>
          {formSubmitted && (
            <div className="mb-4 text-green-600">Cảm ơn bạn! Câu hỏi của bạn đã được gửi.</div>
          )}
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white font-semibold">Email của bạn</label>
              <input
                type="email"
                id="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md text-main"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="question" className="block text-white font-semibold">Câu hỏi của bạn</label>
              <textarea
                id="question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md text-main"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-subMain text-white rounded-md"
            >
              Gửi Câu Hỏi
            </button>
          </form>
          
        </div>
      </div>
    </div>
    </Layout_main>
  );
  
};

export default FAQScreen;
