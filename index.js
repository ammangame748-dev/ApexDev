document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const order = {
        name: document.getElementById('clientName').value,
        service: document.getElementById('serviceType').value,
        details: document.getElementById('details').value,
        date: new Date().toLocaleString()
    };

    // جلب الطلبات القديمة أو إنشاء مصفوفة جديدة
    let orders = JSON.parse(localStorage.getItem('apexOrders')) || [];
    orders.push(order);

    // حفظ الطلبات
    localStorage.setItem('apexOrders', JSON.stringify(orders));

    alert('تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً.');
    this.reset();
});
