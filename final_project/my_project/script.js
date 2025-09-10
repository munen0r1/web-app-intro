let currentValue = 0;
let inputValue = '';
let currentOp = ''; // '', 'plus', 'minus'

const result = document.getElementById('result');
const numberInput = document.getElementById('numberInput');
const setButton = document.getElementById('setButton');

// 入力欄の表示を更新
function updateInputDisplay() {
    // currentOpが空なら記号を表示しない
    let opStr = '';
    if (currentOp === 'plus') opStr = '＋';
    if (currentOp === 'minus') opStr = '－';
    numberInput.value = opStr + (inputValue || '');
}

// 結果表示更新
function updateResult() {
    result.textContent = `結果:${currentValue}`;
}

// テンキー入力
document.querySelectorAll('.key').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.id === 'keyClear') {
            inputValue = '';
            currentOp = ''; // デフォルトは空白
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
                // 入力が空のときは＋－も消す
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

// 決定ボタン
setButton.addEventListener('click', () => {
    const num = Number(inputValue);
    if (!isNaN(num) && num !== 0 && currentOp) {
        if (currentOp === 'plus') {
            currentValue += num;
        } else if (currentOp === 'minus') {
            currentValue -= num;
        }
        updateResult();
        inputValue = '';
        currentOp = ''; // デフォルトは空白
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