// 1. إعدادات Firebase (تأكد من صحة الروابط في حسابك)
const firebaseConfig = {
    apiKey: "AIzaSyDmVHTi4xD8ScPYqm5PQ_o4Gmti9dWiIsQ",
    authDomain: "apexdev-abdd9.firebaseapp.com",
    databaseURL: "https://apexdev-abdd9-default-rtdb.firebaseio.com",
    projectId: "apexdev-abdd9",
    storageBucket: "apexdev-abdd9.firebasestorage.app",
    messagingSenderId: "46524918249",
    appId: "1:46524918249:web:b3fd61fcddec3b41b20378"
};

// 2. تشغيل Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// 3. دوال فتح وإغلاق النافذة
window.openOrder = function() {
    const orderSection = document.getElementById('order');
    if (orderSection) {
        orderSection.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

window.closeOrder = function() {
    const orderSection = document.getElementById('order');
    if (orderSection) {
        orderSection.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// 4. دالة حساب السعر تلقائياً
function calculatePrice(service, details) {
    let price = 0;
    let desc = details.toLowerCase();

    if (service === "website") {
        // للمواقع: من 7$ إلى 30$
        if (desc.includes("متجر") || desc.includes("كبير") || desc.length > 100) {
            price = 30;
        } else if (desc.length < 30) {
            price = 7;
        } else {
            price = 15; // سعر متوسط
        }
    } else if (service === "bot") {
        // للبوتات: من 4$ إلى 7$
        if (desc.includes("كامل") || desc.includes("متكامل") || desc.length > 50) {
            price = 7;
        } else {
            price = 4;
        }
    }
    return price + "$";
}

// 5. معالجة إرسال الطلب
const orderForm = document.getElementById('orderForm');
if(orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = document.getElementById('submitBtn');
        const name = document.getElementById('clientName').value;
        const discord = document.getElementById('discordID').value;
        const service = document.getElementById('serviceType').value;
        const details = document.getElementById('details').value;

        // حساب السعر قبل الإرسال
        const finalPrice = calculatePrice(service, details);

        btn.innerText = "جاري إرسال طلبك الفخم...";
        btn.disabled = true;

        // إرسال البيانات إلى Firebase
        database.ref('orders').push({
            date: new Date().toLocaleString(),
            name: name,
            discordID: discord,
            service: service,
            details: details,
            estimatedPrice: finalPrice // السعر الذي تم احتسابه
        }).then(() => {
            alert('تم بنجاح! السعر التقديري لطلبك هو: ' + finalPrice + '\nسيتم تحويلك للديسكورد الآن.');
            window.location.href = "https://discord.gg/zAN7Vd7d";
        }).catch((error) => {
            alert('حدث خطأ أثناء الإرسال: ' + error.message);
            btn.innerText = "إرسال الطلب للنظام";
            btn.disabled = false;
        });
    });
}
