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

  // Какой стол какого цвета — сверь со своей схемой
  const RED_TABLES = [1, 4, 7, 8, 9];
  const BLACK_TABLES = [2, 3, 5, 6, 10, 11];

  function colorOf(n) {
    if (RED_TABLES.includes(n)) return 'red';
    if (BLACK_TABLES.includes(n)) return 'black';
    return null;
  }

  function seatsOf(box) {
    const n = parseInt(box.value, 10);
    return SEATS[n] || 0;
  }

  // ВКЛ/ВЫКЛ заливку стола на карте
  function syncTable(box) {
    const n = parseInt(box.value, 10);
    const tableGroup = document.getElementById(`table-${n}-group`);
    if (!tableGroup) return; // стола с таким id нет — просто выходим

    const color = colorOf(n);

    if (box.checked && color) {
      tableGroup.classList.add(`table--selected-${color}`);
    } else {
      tableGroup.classList.remove('table--selected-red');
      tableGroup.classList.remove('table--selected-black');
    }
  }

  function recalc() {
    let redCount = 0;
    let blackCount = 0;

    list.querySelectorAll('input[type="checkbox"]').forEach(box => {
      syncTable(box); // ← вот здесь столы начинают реагировать

      if (!box.checked) return;
      const seats = seatsOf(box);
      if (colorOf(parseInt(box.value, 10)) === 'red') {
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
    row.className = 'booking-row-item';

    row.innerHTML =
      '<span class="booking-row__info">' + count + ' шт. | ' + price + ' ₽</span>' +
      '<span class="booking-row__total">' + total + ' ₽</span>';

    rows.appendChild(row);
  }

  list.addEventListener('change', recalc);
  recalc(); // при загрузке подтянутся уже отмеченные галочки
});
