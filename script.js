/**
 * LogicDiskrit - Engine Evaluator & Tab Switcher
 */

// TAB NAVIGATION SYSTEM
function switchTab(tabName) {
  document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.add('hidden'));
  document.querySelectorAll('.tab-nav-btn').forEach(btn => btn.classList.remove('active'));

  const targetPanel = document.getElementById(`panel-${tabName}`);
  const targetBtn = document.getElementById(`nav-btn-${tabName}`);

  if (targetPanel) targetPanel.classList.remove('hidden');
  if (targetBtn) targetBtn.classList.add('active');
}

// FORMULA KEYPAD HELPERS
function insertSymbol(symbol) {
  const input = document.getElementById('formula-input');
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const text = input.value;

  input.value = text.substring(0, start) + symbol + text.substring(end);
  input.focus();
  input.selectionStart = input.selectionEnd = start + symbol.length;

  evaluateSimulatorFormula();
}

function clearFormulaInput() {
  document.getElementById('formula-input').value = '';
  evaluateSimulatorFormula();
}

function loadFormulaPreset(expr) {
  document.getElementById('formula-input').value = expr;
  evaluateSimulatorFormula();
}

// EVALUATOR ENGINE (SIMULATOR)
function evaluateSimulatorFormula() {
  const expr = document.getElementById('formula-input').value.trim();
  const tbody = document.getElementById('truth-table-body');

  if (!expr) {
    tbody.innerHTML = `<tr><td colspan="6" class="p-4 text-center text-text-muted">Masukkan ekspresi logika di atas.</td></tr>`;
    return;
  }

  // Placeholder data hasil simulasi
  tbody.innerHTML = `
    <tr class="hover:bg-surface-container/50 transition-colors">
      <td class="p-3 text-center text-text-muted">1</td>
      <td class="p-3 text-center text-binary-true font-bold">B</td>
      <td class="p-3 text-center text-binary-true font-bold">B</td>
      <td class="p-3 text-center text-binary-true font-bold">B</td>
      <td class="p-3 text-center text-binary-true font-bold">B</td>
      <td class="p-3 text-center text-binary-true font-bold bg-primary/10">B</td>
    </tr>
    <tr class="hover:bg-surface-container/50 transition-colors">
      <td class="p-3 text-center text-text-muted">2</td>
      <td class="p-3 text-center text-binary-true font-bold">B</td>
      <td class="p-3 text-center text-binary-true font-bold">B</td>
      <td class="p-3 text-center text-binary-false font-bold">S</td>
      <td class="p-3 text-center text-binary-true font-bold">B</td>
      <td class="p-3 text-center text-binary-false font-bold bg-primary/10">S</td>
    </tr>
  `;
}

// ARGUMENT BUILDER
function addPremiseInput() {
  const container = document.getElementById('premises-container');
  const count = container.querySelectorAll('.premise-row').length + 1;

  const div = document.createElement('div');
  div.className = 'premise-row flex items-center gap-2';
  div.innerHTML = `
    <span class="text-xs font-mono text-tertiary w-20 shrink-0">Premis ${count} (P${count}):</span>
    <input type="text" placeholder="Premis..." class="input-field py-2 text-sm font-mono premise-input" />
    <button onclick="removePremiseRow(this)" class="p-1 text-text-muted hover:text-binary-false transition-colors">
      <span class="material-symbols-outlined text-[18px]">delete</span>
    </button>
  `;
  container.appendChild(div);
}

function removePremiseRow(btn) {
  const rows = document.querySelectorAll('.premise-row');
  if (rows.length > 1) {
    btn.closest('.premise-row').remove();
  }
}

function verifyArgument() {
  const badge = document.getElementById('arg-status-badge');
  badge.textContent = 'VALID';
  badge.className = 'badge-success';
}

// EXPORT HELPERS
function copyTableMarkdown() {
  navigator.clipboard.writeText('| p | q | (p ∧ q) |\n|---|---|---|\n| B | B | B |');
  alert('Tabel disalin sebagai Markdown!');
}

function copyTableLatex() {
  navigator.clipboard.writeText('\\begin{truthtable}\np & q \\\\\n\\end{truthtable}');
  alert('Tabel disalin sebagai LaTeX!');
}

// INIT
document.addEventListener('DOMContentLoaded', () => {
  evaluateSimulatorFormula();
});
