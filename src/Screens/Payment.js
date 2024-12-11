import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import Layout1 from "../Layout/Layout1";
function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const { amount, packageName } = location.state || { amount: 0, packageName: "Gói không xác định" };
    
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(expirationDate.getDate() + 30);

    const formattedToday = today.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const formattedExpirationDate = expirationDate.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const [userName, setUserName] = useState("");
    useEffect(() => {
        const auth = getAuth();
        const db = getFirestore();
        // Lắng nghe trạng thái người dùng
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Truy vấn Firestore để lấy tên người dùng từ collection 'users'
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);
                
                if (userDoc.exists()) {
                    setUserName(userDoc.data().name || "Người dùng chưa đặt tên");
                } else {
                    setUserName("Người dùng chưa đặt tên");
                }
            } else {
                setUserName("Chưa đăng nhập");
            }
        });

        return () => unsubscribe();
    }, []);

    const [isLoading, setIsLoading] = useState(false);
    const handlePayment = async () => {
        setIsLoading(true);

        try {
            // Gửi yêu cầu tạo giao dịch thanh toán đến server
            const response = await axios.post("http://localhost:5000/payment", {
                amount,
                packageName,
                uid: getAuth().currentUser.uid,
            });
            console.log(response);

            if (response.data && response.data.payUrl) {
                // Chuyển hướng người dùng đến trang thanh toán MoMo
                window.location.href = response.data.payUrl;
            } else {
                alert("Không thể lấy liên kết thanh toán.");
            }
        } catch (error) {
            console.error("Error during payment:", error);
            alert("Có lỗi xảy ra khi xử lý thanh toán.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout1>
        <div className="container bg-white text-black mx-auto p-5 pt-16">
            <button
            onClick={() => navigate(-1)} // Điều hướng quay lại trang trước
            className="text-2xl text-subMain ml-2 rounded-lg"
            >
            <IoIosArrowBack />
            </button>
            <h2 className="text-xl font-bold mb-5 text-left ml-10">ĐƠN HÀNG</h2>

            <div class="flex justify-center">
                <div className="w-full max-w-md bg-white p-6 rounded-lg border-2 border-black">
                    <h1 className="text-2xl font-bold mb-4 mt-0 text-center">Thông tin chi tiết</h1>
                    <div className="mb-4">
                        <div className="flex justify-between border-b pb-2 mb-2 gap-x-5">
                            <span className="font-medium text-nowrap">Tên người dùng</span>
                            <span>{userName}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2 mb-2 gap-x-5">
                            <span className="font-medium text-nowrap">Tên gói</span>
                            <span>{packageName}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2 mb-2 gap-x-5">
                            <span className="font-medium text-nowrap">Thời hạn gói</span>
                            <span>30 ngày - Tự động gia hạn</span>
                        </div>
                        <div className="flex justify-between border-b pb-2 mb-2 gap-x-5">
                            <span className="font-medium text-nowrap">Ngày hiệu lực</span>
                            <span>{formattedToday}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2 mb-2 gap-x-5">
                            <span className="font-medium text-nowrap">Sử dụng đến</span>
                            <span>{formattedExpirationDate}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2 mb-4 gap-x-5">
                            <span className="font-medium text-nowrap">Trị giá</span>
                            <span>{amount.toLocaleString()} VND</span>
                        </div>
                        </div>

                        <div className="flex justify-between items-center font-bold text-lg mb-4">
                        <span>Thành tiền</span>
                        <span className="text-subMain text-2xl">{amount.toLocaleString()} VND</span>
                        </div>

                        <p className="text-sm text-gray-600 mb-4 text-justify">
                        Bằng việc thanh toán, bạn xác nhận đã đọc và đồng ý với Hợp đồng và Chính sách của Melon, chấp nhận cho Melon tự động gia hạn gói dịch vụ khi hết hạn. Bạn có thể hủy gia hạn bất cứ lúc nào.
                        </p>

                        <button
                        className="w-full bg-subMain text-lg text-white font-bold py-3 rounded-lg hover:bg-[#23a30f] transition"
                        onClick={handlePayment}
                        disabled={isLoading}
                        >
                            {isLoading ? "Đang xử lý..." : "Thanh toán"}
                        </button>
                    </div>
                </div>       
            </div>

        </Layout1>
    );
}

export default Payment;
