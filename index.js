// 1. الإعدادات المصلحة (ضروري جداً عشان الإرسال يشتغل)
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

// 3. دوال فتح وإغلاق النافذة (حطيتهم فوق عشان يشتغلوا فوراً)
window.openOrder = function() {
    const orderSection = document.getElementById('order');
    if (orderSection) {
        orderSection.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // يمنع السكرول والموقع مفتوح
    }
}

window.closeOrder = function() {
    const orderSection = document.getElementById('order');
    if (orderSection) {
        orderSection.style.display = 'none';
        document.body.style.overflow = 'auto'; // يرجع السكرول
    }
}

// 4. معالجة إرسال الطلب
const orderForm = document.getElementById('orderForm');
if(orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = document.getElementById('submitBtn');
        const name = document.getElementById('clientName').value;
        const discord = document.getElementById('discordID').value;
        const service = document.getElementById('serviceType').value;
        const details = document.getElementById('details').value;

        btn.innerText = "جاري إرسال طلبك الفخم...";
        btn.disabled = true;

        database.ref('orders').push({
            name: name,
            discord: discord,
            service: service,
            details: details,
            date: new Date().toLocaleString('ar-EG')
        }).then(() => {
            alert('تم بنجاح! سيتم تحويلك الآن لتكملة الطلب عبر الديسكورد.');
            window.location.href = "https://discord.gg/zAN7Vd7d";
        }).catch((error) => {
            alert('حدث خطأ: ' + error.message);
            btn.innerText = "إرسال الطلب للنظام 🚀";
            btn.disabled = false;
        });
    });
}
