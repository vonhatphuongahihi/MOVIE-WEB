import React from "react";
import { FaFacebook, FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineCopy } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { QRCodeCanvas } from "qrcode.react";

const SharePopup = ({ show, onClose, videoTitle, videoImage, shareLink }) => {
  if (!show) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link đã được sao chép vào clipboard!");
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
    window.open(facebookUrl, "_blank");
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareLink
    )}&text=${encodeURIComponent(videoTitle)}`;
    window.open(twitterUrl, "_blank");
  };

  const shareOnTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
      shareLink
    )}&text=${encodeURIComponent(videoTitle)}`;
    window.open(telegramUrl, "_blank");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1000",
      }}
    >
      <div
        style={{
          backgroundColor: "#292929",
          borderRadius: "10px",
          width: "600px",
          padding: "20px",
          color: "white",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontSize: "24px",
          }}
        >
          <IoCloseOutline/>
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          <div style={{ textAlign: "center", cursor: "pointer" }} onClick={shareOnFacebook}>
            <FaFacebook size={40} style={{ color: "#1877F2" }} />
            <p className="mt-1" style={{fontSize: '14px'}}>Facebook</p>
            </div>
          <div style={{ textAlign: "center", cursor: "pointer" }} onClick={shareOnTwitter}>
            <FaXTwitter  size={40} style={{ color: "#FFFFFF" }} />
            <p>Twitter</p>
          </div>
          <div style={{ textAlign: "center", cursor: "pointer" }} onClick={shareOnTelegram}>
            <FaTelegramPlane size={40} style={{ color: "#0088CC" }} />
            <p>Telegram</p>
          </div>
          <div style={{ textAlign: "center", cursor: "pointer" }} onClick={handleCopyLink}>
            <AiOutlineCopy size={40} style={{ color: "#ffffff" }} />
            <p>Copy Link</p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "60px",
          }}
        >
          <img
            src={videoImage}
            alt={videoTitle}
            style={{
              width: "160px",
              height: "120px",
              borderRadius: "5px",
              marginRight: "15px",
            }}
          />
          <QRCodeCanvas value={shareLink} size={120} />
        </div>
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Quét mã để mở trên điện thoại
        </p>
      </div>
    </div>
  );
};

export default SharePopup;