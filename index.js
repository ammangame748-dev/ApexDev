// 1. إعدادات Firebase (استخدمت الروابط التي كانت في كودك السابق لضمان عملها)
const firebaseConfig = {
    apiKey: "AIzaSyDmVHTi4xD8ScPYqm5PQ_o4Gmti9dWiIsQ",
    authDomain: "apexdev-abdd9.firebaseapp.com",
    databaseURL: "https://apexdev-abdd9-default-rtdb.firebaseio.com",
    projectId: "apexdev-abdd9",
    storageBucket: "apexdev-abdd9.firebasestorage.app",
    messagingSenderId: "46524918249",
    appId: "1:46524918249:web:b3fd61fcddec3b41b20378"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();


// 2. دوال النافذة
window.openOrder = function () {
    const orderSection = document.getElementById('order');
    if (orderSection) {
        orderSection.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

window.closeOrder = function () {
    const orderSection = document.getElementById('order');
    if (orderSection) {
        orderSection.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}


// 3. دالة حساب السعر
function calculatePrice(service, details) {
    let price = 0;
    let desc = details.toLowerCase();

    if (service === "website") {
        if (desc.includes("متجر") || desc.length > 100) price = 30;
        else if (desc.length < 30) price = 7;
        else price = 15;
    } else if (service === "bot") {
        if (desc.includes("كامل") || desc.length > 50) price = 7;
        else price = 4;
    }
    return price;
}

window.openPortfolio = function () {
    const portfolioSection = document.getElementById('portfolioModal');
    if (portfolioSection) {
        portfolioSection.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

window.closePortfolio = function () {
    const portfolioSection = document.getElementById('portfolioModal');
    if (portfolioSection) {
        portfolioSection.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// 4. معالجة الإرسال والدفع
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const btn = document.getElementById('submitBtn');
        const name = document.getElementById('clientName').value;
        const discord = document.getElementById('discordID').value;
        const service = document.getElementById('serviceType').value;
        const details = document.getElementById('details').value;

        const finalPrice = calculatePrice(service, details);

        // رابط PayPal الصحيح
        const paypalLink = `https://paypal.me/AHM2009/${finalPrice}`;

        btn.innerText = "جاري حفظ طلبك...";
        btn.disabled = true;

        database.ref('orders').push({
            date: new Date().toLocaleString(),
            name: name,
            discordID: discord,
            service: service,
            details: details,
            price: finalPrice + "$"
        }).then(() => {

            alert(` تم استلام طلبك بنجاح!

 السعر المطلوب: ${finalPrice}$
 سيتم تحويلك لصفحة الدفع ثم للديسكورد`);

            // فتح الدفع
            window.open(paypalLink, "_blank");

            // تحويل للديسكورد مباشرة بعده
            setTimeout(() => {
                window.location.href = "https://discord.gg/yRPubu3c";
            }, 4000);

        }).catch((error) => {
            alert('حدث خطأ: ' + error.message);
            btn.innerText = "إرسال الطلب";
            btn.disabled = false;
        });
    });
}
const serviceSelect = document.getElementById('serviceType');
const priceInfo = document.getElementById('priceInfo');

// دالة لتحديث معلومات السعر
function updatePriceInfo() {
    const selected = serviceSelect.value;

    if (selected === "website") {
        priceInfo.innerHTML = `
            <strong> تسعير المواقع:</strong><br>
            • المواقع المتكاملة وعالية المواصفات: تنتهي كحد اقصى من <b>30$</b><br>
            • المواقع البسيطة أو التعريفية: تبدأ من <b>4$</b>
        `;
    } else if (selected === "bot") {
        priceInfo.innerHTML = `
            <strong> تسعير البوتات:</strong><br>
            • بوتات متكاملة (أنظمة إدارة وحماية متطورة): <b>7$</b><br>
            • بوتات الخدمة العادية أو البسيطة: <b>4$</b>
        `;
    }
}

// تشغيل الدالة عند تحميل الصفحة وعند التغيير
serviceSelect.addEventListener('change', updatePriceInfo);
updatePriceInfo();
