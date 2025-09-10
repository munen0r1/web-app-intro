let currentValue = 0;
let inputValue = '';
let currentOp = ''; // '', 'plus', 'minus'

const result = document.getElementById('result');
const numberInput = document.getElementById('numberInput');
const setButton = document.getElementById('setButton');

// 3桁ごとにカンマを入れる関数
function formatNumberWithComma(numStr) {
    if (!numStr) return '';
    let n = Number(numStr.replace(/,/g, ''));
    if (isNaN(n)) return '';
    return n.toLocaleString();
}

// 入力欄の表示を更新
function updateInputDisplay() {
    let opStr = '';
    if (currentOp === 'plus') opStr = '＋';
    if (currentOp === 'minus') opStr = '－';
    numberInput.value = opStr + formatNumberWithComma(inputValue);
}

// 結果表示更新（ラベル左寄せ、数字右寄せ、グレー背景固定）
function updateResult() {
    result.innerHTML = `
        <span class="result-label">結果：</span>
        <span class="result-value">${currentValue.toLocaleString()}</span>
    `;
}

// テンキー入力
document.querySelectorAll('.key').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.id === 'keyClear') {
            inputValue = '';
            currentOp = '';
            updateInputDisplay();
        } else if (btn.id === 'keyPlus') {
            currentOp = 'plus';
            updateInputDisplay();
        } else if (btn.id === 'keyMinus') {
            currentOp = 'minus';
            updateInputDisplay();
        } else if (btn.id === 'key00') {
            if (inputValue.length > 0) {
                inputValue += '00';
                updateInputDisplay();
            }
        } else if (btn.id === 'keyDelete') {
            if (inputValue.length > 0) {
                inputValue = inputValue.slice(0, -1);
                updateInputDisplay();
            } else {
                currentOp = '';
                updateInputDisplay();
            }
        } else if (
            btn.classList.contains('key') &&
            !btn.classList.contains('op') &&
            btn.id !== 'keyClear' &&
            btn.id !== 'keyDelete'
        ) {
            inputValue += btn.textContent;
            updateInputDisplay();
        }
    });
});

// ×2ボタン
document.getElementById('doubleButton').onclick = () => {
    // op記号を除いた数値部分のみ2倍
    if (inputValue) {
        let num = Number(inputValue.replace(/,/g, ''));
        if (!isNaN(num)) {
            num *= 2;
            inputValue = String(num);
            updateInputDisplay();
        }
    }
};

// 決定ボタン
setButton.addEventListener('click', () => {
    const num = Number(inputValue.replace(/,/g, ''));
    if (!isNaN(num) && num !== 0 && currentOp) {
        if (currentOp === 'plus') {
            currentValue += num;
        } else if (currentOp === 'minus') {
            currentValue -= num;
        }
        updateResult();
        inputValue = '';
        currentOp = '';
        updateInputDisplay();
    }
});

// 直接+/-ボタン
document.getElementById('addButton').onclick = () => { currentValue += 100; updateResult(); };
document.getElementById('add300Button').onclick = () => { currentValue += 300; updateResult(); };
document.getElementById('add500Button').onclick = () => { currentValue += 500; updateResult(); };
document.getElementById('subtractButton').onclick = () => { currentValue -= 100; updateResult(); };
document.getElementById('subtract300Button').onclick = () => { currentValue -= 300; updateResult(); };
document.getElementById('subtract500Button').onclick = () => { currentValue -= 500; updateResult(); };

// リセットボタン
document.getElementById('resetResult').onclick = () => {
    currentValue = 0;
    updateResult();
};

// 初期表示
updateResult();
updateInputDisplay();