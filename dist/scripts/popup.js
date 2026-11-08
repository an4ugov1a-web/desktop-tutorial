document.addEventListener('DOMContentLoaded', () => {
  // Получаем элементы для event.html
  const legendPopup = document.getElementById('legendPP');
  const legendOpenBtn = document.getElementById('open-legend-popup-btn');
  const legendCloseBtn = legendPopup?.querySelector('.pp__x-btn');


  const eventPopup = document.getElementById('eventPP');
  const eventOpenBtn = document.getElementById('open-popup-btn');
  const eventCloseBtn = eventPopup?.querySelector('.pp__x-btn');


  const openLegendPopup = () => {
    legendPopup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  const closeLegendPopup = () => {
    legendPopup.style.display = 'none';
    document.body.style.overflow = '';
  };

  const openEventPopup = () => {
    eventPopup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  const closeEventPopup = () => {
    eventPopup.style.display = 'none';
    document.body.style.overflow = '';
  };


  if (legendPopup && legendOpenBtn) {
    legendOpenBtn.addEventListener('click', openLegendPopup);

    if (legendCloseBtn) {
      legendCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLegendPopup();
      });
    }

    legendPopup.addEventListener('click', (e) => {
      if (e.target === legendPopup) {
        closeLegendPopup();
      }
    });
  }


  if (eventPopup && eventOpenBtn) {
    eventOpenBtn.addEventListener('click', openEventPopup);

    if (eventCloseBtn) {
      eventCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeEventPopup();
      });
    }

    eventPopup.addEventListener('click', (e) => {
      if (e.target === eventPopup) {
        closeEventPopup();
      }
    });
  }


  const RED_TABLES = [1, 4, 7, 8, 9];
  const colorClass = num =>
    RED_TABLES.includes(num) ? 'table--selected-red' : 'table--selected-black';


  document.querySelectorAll('.checkT__inputT').forEach(cb => {
    const label = cb.closest('label');
    const match = (label ? label.textContent : '').match(/\d+/);
    if (!match) return;
    const num = parseInt(match[0], 10);

    const group = document.getElementById('table-' + num + '-group');
    if (!group) return;

    cb.addEventListener('change', () => {
      group.classList.remove('table--selected-red', 'table--selected-black');
      if (cb.checked) group.classList.add(colorClass(num));
    });
  });


  document.querySelectorAll('.table-group').forEach(group => {
    const num = parseInt(group.id.replace('table-', '').replace('-group', ''), 10);
    if (!num) return;

    const cb = [...document.querySelectorAll('.checkT__inputT')].find(c => {
      const t = (c.closest('label')?.textContent || '').match(/\d+/);
      return t && parseInt(t[0], 10) === num;
    });
    if (!cb) return;

    group.addEventListener('click', () => {
      cb.checked = !cb.checked;
      group.classList.remove('table--selected-red', 'table--selected-black');
      if (cb.checked) group.classList.add(colorClass(num));
    });
    group.style.cursor = 'pointer';
  });
  });