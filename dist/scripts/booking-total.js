document.addEventListener('DOMContentLoaded', () => {
  const list = document.querySelector('.booking-list');
  const rows = document.getElementById('total-rows');
  const sumEl = document.getElementById('total-sum');
  if (!list || !rows || !sumEl) return;

  const RED_PRICE = 1400;
  const BLACK_PRICE = 1250;


  const SEATS = {
    1: 5, 2: 7, 3: 7, 4: 5, 5: 7,
    6: 7, 7: 4, 8: 3, 9: 3, 10: 4, 11: 7,
  };

  function seatsOf(box) {
   
    const n = parseInt(box.value, 10);
    return SEATS[n] || 0;
  }

  function recalc() {
    let redCount = 0;
    let blackCount = 0;

    list.querySelectorAll('input[type="checkbox"]').forEach(box => {
      if (!box.checked) return;
      const seats = seatsOf(box);
      if (box.closest('label').classList.contains('checkT--table-1')) {
        redCount += seats;
      } else {
        blackCount += seats;
      }
    });

    const redTotal = redCount * RED_PRICE;
    const blackTotal = blackCount * BLACK_PRICE;

    rows.innerHTML = '';
    if (redCount) addRow(redCount, RED_PRICE, redTotal);
    if (blackCount) addRow(blackCount, BLACK_PRICE, blackTotal);

    sumEl.textContent = `${redTotal + blackTotal} ₽`;
  }

  function addRow(count, price, total) {
    const row = document.createElement('div');
    row.className = 'booking-total__row';
    row.innerHTML = `<span>${count}шт | ${price}р</span><span>${total}р</span>`;
    rows.appendChild(row);
  }

  list.addEventListener('change', recalc);
  recalc();
});
