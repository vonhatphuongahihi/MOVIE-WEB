import axios from 'axios';
import { Buffer } from 'buffer';
import cors from 'cors';
import crypto from 'crypto';
import express from 'express';
import admin from 'firebase-admin';
import { readFile } from 'fs/promises';

const serviceAccount = JSON.parse(
    await readFile(new URL('./serviceAccountKey.json', import.meta.url))
);

const app = express();
const port = 5000;

// Khởi tạo Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://melon-web-34795.firebaseio.com'
});
const db = admin.firestore();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var accessKey = 'F8BBA842ECF85';
var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';

// Tạo API thanh toán MoMo
app.post('/payment', async (req, res) => {
    //parameters
    const { amount, packageName, uid } = req.body;

    var orderInfo = 'Thanh toán gói ' + packageName;
    var partnerCode = 'MOMO';
    var redirectUrl = 'http://localhost:3000';
    var ipnUrl = 'https://c1ce-115-79-193-157.ngrok-free.app/callback';
    var requestType = "payWithMethod";
    
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = uid;
    var orderGroupId ='';
    var autoCapture =true;
    var lang = 'vi';

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------")
    console.log(rawSignature)
    //signature
    var signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
    console.log("--------------------SIGNATURE----------------")
    console.log(signature)

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode : partnerCode,
        partnerName : "Test",
        storeId : "MomoTestStore",
        requestId : requestId,
        amount : amount,
        orderId : orderId,
        orderInfo : orderInfo,
        redirectUrl : redirectUrl,
        ipnUrl : ipnUrl,
        lang : lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData : extraData,
        orderGroupId: orderGroupId,
        signature : signature
    });

    //option for axios
    const options = {
        method: "POST",
        url: "https://test-payment.momo.vn/v2/gateway/api/create",
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        },
        data: requestBody
    }

    let result;
    try {
        result = await axios(options);
        if (result.data && result.data.payUrl) {
            return res.status(200).json({ payUrl: result.data.payUrl });
        } else {
            return res.status(400).json({ error: 'Không thể tạo liên kết thanh toán.' });
        }
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: 'server error'
        })
    }
});

app.post("/callback", async(req, res) => {
    console.log("callback:: ");
    console.log(req.body);

    //update user vip status
    const { resultCode, extraData } = req.body;

    if (resultCode === 0) {
        // Thanh toán thành công
        try {
            const userId = extraData;
            const userRef = db.collection('users').doc(userId);

            // Cập nhật trường vip thành true
            await userRef.update({
                vip: true
            });

            console.log(`Cập nhật VIP thành công cho user: ${userId}`);
            return res.status(200).json({ message: "Cập nhật trạng thái VIP thành công!" });
        } catch (error) {
            console.error("Lỗi khi cập nhật VIP: ", error);
            return res.status(500).json({ message: "Cập nhật trạng thái VIP thất bại!" });
        }
    } else {
        // Giao dịch thất bại
        console.log("Giao dịch không thành công.");
        return res.status(400).json({ message: "Giao dịch không thành công." });
    }
});

app.post("/transaction-status", async(req, res) => {
    const {orderId} = req.body;

    const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

    const signature = crypto
        .createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = JSON.stringify({
        partnerCode: 'MOMO',
        requestId: orderId,
        orderId: orderId,
        signature: signature,
        lang: 'vi'
    });

    //option for axios
    const options = {
        method: "POST",
        url: "https://test-payment.momo.vn/v2/gateway/api/query",
        headers: {
            'Content-Type': 'application/json'
        },
        data: requestBody
    }

    let result = await axios(options);

    return res.status(200).json(result.data);
});

// Khởi chạy server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});