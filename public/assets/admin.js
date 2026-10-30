// Admin helpers. No inline scripts are used anywhere, so the Content-Security-Policy can stay strict.

// Repeatable rows: "+ Add row" clones the last row with empty values and the next index.
document.addEventListener('click', e => {
  const add = e.target.closest('[data-add]');
  if (add) {
    const tbody = document.querySelector(`[data-rows="${add.dataset.add}"] tbody`);
    const last = tbody.lastElementChild;
    const row = last.cloneNode(true);
    const next = tbody.children.length;
    row.querySelectorAll('input,textarea').forEach(el => {
      el.value = '';
      el.name = el.name.replace(/\[\d+\]/, `[${next}]`);
    });
    tbody.appendChild(row);
    row.querySelector('input,textarea')?.focus();
  }
  const del = e.target.closest('[data-del]');
  if (del) {
    const tbody = del.closest('tbody');
    const row = del.closest('tr');
    if (tbody.children.length > 1) row.remove();
    else row.querySelectorAll('input,textarea').forEach(el => (el.value = ''));
  }
});

// Confirm destructive forms.
document.addEventListener('submit', e => {
  const msg = e.target.dataset.confirm;
  if (msg && !window.confirm(msg)) e.preventDefault();
});

// Status dropdowns that save on change.
document.addEventListener('change', e => {
  if (e.target.matches('[data-autosubmit]')) e.target.form.submit();
});
