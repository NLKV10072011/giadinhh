// Khởi tạo AOS (Animate On Scroll)
AOS.init({
    duration: 1000, // Thời gian hoạt ảnh
    easing: 'ease-in-out', // Loại chuyển động
    once: true, // Chỉ chạy một lần khi người dùng cuộn đến phần tử
});

// Hiệu ứng cuộn GSAP (GreenSock)
gsap.from("header", { opacity: 0, y: -50, duration: 1 });
gsap.from(".gallery-item", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1
});


// Mở popup khi nhấp vào ảnh
function openPopup(imageElement) {
    var overlay = document.getElementById("popup-overlay");
    var popupImage = document.getElementById("popup-image");
    
    popupImage.src = imageElement.src; // Đặt nguồn ảnh trong popup giống như ảnh nhỏ
    overlay.style.display = "flex"; // Hiển thị overlay
}

// Đóng popup khi nhấp vào nút đóng
function closePopup() {
    var overlay = document.getElementById("popup-overlay");
    overlay.style.display = "none"; // Ẩn overlay
}
