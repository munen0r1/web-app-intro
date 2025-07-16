let currentValue = 0;
let inputValue = '';
let mode = 'plus'; // 'plus' or 'minus'

const result = document.getElementById('result');
const numberInput = document.getElementById('numberInput');
const setButton = document.getElementById('setButton');
const modePlus = document.getElementById('modePlus');
const modeMinus = document.getElementById('modeMinus');

// 結果表示更新
function updateResult() {
    result.textContent = `結果:${currentValue}`;
}

// モード切替
modePlus.addEventListener('click', () => {
    mode = 'plus';
    modePlus.classList.add('active');
    modeMinus.classList.remove('active');
});
modeMinus.addEventListener('click', () => {
    mode = 'minus';
    modeMinus.classList.add('active');
    modePlus.classList.remove('active');
});

// テンキー入力
document.querySelectorAll('.key').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.id === 'keyClear') {
            inputValue = '';
        } else {
            inputValue += btn.textContent;
        }
        numberInput.value = inputValue;
    });
});

// 決定ボタン
setButton.addEventListener('click', () => {
    const num = Number(numberInput.value);
    if (!isNaN(num) && num !== 0) {
        if (mode === 'plus') {
            currentValue += num;
        } else {
            currentValue -= num;
        }
        updateResult();
        inputValue = '';
        numberInput.value = '';
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