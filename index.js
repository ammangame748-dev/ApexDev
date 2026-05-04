const firebaseConfig = {
    apiKey: "AIzaSyDmVHTi4xD8ScPYqm5PQ_o4Gmti9dWiIsQ",
    authDomain: "apexdev-abdd9.firebaseapp.com",
    databaseURL: "https://apexdev-abdd9-default-rtdb.firebaseio.com",
    projectId: "apexdev-abdd9",
    storageBucket: "apexdev-abdd9.firebasestorage.app",
    messagingSenderId: "46524918249",
    appId: "1:46524918249:web:b3fd61fcddec3b41b20378"
};


firebase.initializeApp(firebaseConfig);
const database = firebase.database();

if (document.getElementById('orderForm')) {
    document.getElementById('orderForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        btn.innerText = "جاري الإرسال...";
        btn.disabled = true;

        const name = document.getElementById('clientName').value;
        const service = document.getElementById('serviceType').value;
        const details = document.getElementById('details').value;
        database.ref('orders').push({
            name: name, service: service, details: details, date: new Date().toLocaleString()
        }).then(() => {
            // التنبيه الجديد مع الرابط
            alert('تم إرسال طلبك! انتظر المسؤول.\n\nتواصل هنا لتكملة طلبك: https://discord.com/channels/@me/1484020007817056348');

            // تحويل المستخدم تلقائياً لرابط الديسكورد (اختياري)
            window.location.href = "https://discord.com/channels/@me/1465745388920246345";

            document.getElementById('orderForm').reset();
            btn.innerText = "إرسال الطلب للنظام";
            btn.disabled = false;
        });

    });
}
