// 1. إعدادات Firebase 
const firebaseConfig = {
    apiKey: "AIzaSyDmVHTi4xD8ScPYqm5PQ_o4Gmti9dWiIsQ",
    authDomain: "apexdev-abdd9.firebaseapp.com",
    databaseURL: "https://apexdev-abdd9-default-rtdb.firebaseio.com",
    projectId: "apexdev-abdd9",
    storageBucket: "apexdev-abdd9.firebasestorage.app",
    messagingSenderId: "46524918249",
    appId: "1:46524918249:web:b3fd61fcddec3b41b20378"
};

// التأكد من تهيئة التطبيق مرة واحدة فقط
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// 2. التحكم في النوافذ (Modals)
function toggleModal(id, show) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = show ? 'flex' : 'none';
        document.body.style.overflow = show ? 'hidden' : 'auto';
    }
}

window.openOrder = () => toggleModal('order', true);
window.closeOrder = () => toggleModal('order', false);
window.openPortfolio = () => toggleModal('portfolioModal', true);
window.closePortfolio = () => toggleModal('portfolioModal', false);

// 3. دالة حساب السعر الذكية
function calculatePrice(service, details) {
    let price = 0;
    let desc = details.toLowerCase();

    if (service === "website") {
        if (desc.includes("متجر") || desc.length > 100) price = 30;
        else if (desc.length < 30) price = 7;
        else price = 15;
    } else {
        if (desc.includes("كامل") || desc.length > 50) price = 7;
        else price = 4;
    }
    return price;
}

// 4. معالجة الإرسال
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const btn = document.getElementById('submitBtn');
        const data = {
            name: document.getElementById('clientName').value,
            discord: document.getElementById('discordID').value,
            service: document.getElementById('serviceType').value,
            details: document.getElementById('details').value
        };

        const finalPrice = calculatePrice(data.service, data.details);
        const paypalLink = `https://paypal.me/AHM2009/${finalPrice}`;

        btn.innerText = "جاري الحفظ...";
        btn.disabled = true;

        database.ref('orders').push({
            date: new Date().toLocaleString('ar-EG'),
            ...data,
            price: finalPrice + "$"
        }).then(() => {
            alert(`تم استلام طلبك!\nالسعر: ${finalPrice}$\nسيتم توجيهك الآن.`);
            
            // فتح صفحة الدفع
            window.open(paypalLink, "_blank");

            // تحويل للديسكورد بعد 3 ثواني
            setTimeout(() => {
                window.location.href = "https://discord.gg/yRPubu3c";
            }, 3000);
        }).catch((err) => {
            alert('خطأ في الإرسال: ' + err.message);
            btn.disabled = false;
            btn.innerText = "إرسال الطلب";
        });
    });
}

// 5. تحديث معلومات السعر تلقائياً
const serviceSelect = document.getElementById('serviceType');
const priceInfo = document.getElementById('priceInfo');

if (serviceSelect && priceInfo) {
    const updateInfo = () => {
        const isWeb = serviceSelect.value === "website";
        priceInfo.innerHTML = isWeb ? 
            `<strong>تسعير المواقع:</strong><br>• متكاملة: حتى <b>30$</b><br>• بسيطة: تبدأ من <b>4$</b>` :
            `<strong>تسعير البوتات:</strong><br>• متطورة: <b>7$</b><br>• بسيطة: <b>4$</b>`;
    };
    serviceSelect.onchange = updateInfo;
    updateInfo();
}
