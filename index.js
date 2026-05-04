// إعدادات Firebase الصحيحة 100%
const firebaseConfig = {
  apiKey: "AIzaSyDmVHTi4xD8ScPYqm5PQ_o4Gmti9dWiIsQ",
  authDomain: "://firebaseapp.com",
  databaseURL: "https://firebaseio.com",
  projectId: "apexdev-abdd9",
  storageBucket: "apexdev-abdd9.firebasestorage.app",
  messagingSenderId: "46524918249",
  appId: "1:46524918249:web:b3fd61fcddec3b41b20378"
};

// تشغيل Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// معالجة الفورم
const orderForm = document.getElementById('orderForm');
if(orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = document.getElementById('submitBtn');
        const name = document.getElementById('clientName').value;
        const discord = document.getElementById('discordID').value;
        const service = document.getElementById('serviceType').value;
        const details = document.getElementById('details').value;

        // تغيير حالة الزر
        btn.innerText = "جاري إرسال طلبك الفخم...";
        btn.disabled = true;

        // إرسال البيانات
        database.ref('orders').push({
            name: name,
            discord: discord,
            service: service,
            details: details,
            date: new Date().toLocaleString('ar-EG')
        }).then(() => {
            alert('تم بنجاح! سيتم تحويلك الآن لتكملة الطلب عبر الديسكورد.');
            // رابط التحويل (غيره لرابط سيرفرك)
            window.location.href = "https://discord.gg/zAN7Vd7d";
        }).catch((error) => {
            alert('حدث خطأ غير متوقع: ' + error.message);
            btn.innerText = "إرسال الطلب للنظام 🚀";
            btn.disabled = false;
        });
    });
}
