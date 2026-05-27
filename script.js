const DICT_URL = "https://raw.githubusercontent.com/shahind/Persian-Words-Database/master/distinct_words.txt";
const COMMON_DICT_URL = "https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2016/fa/fa_50k.txt";

let persianDictionary = new Set();
let wordFrequency = new Map();
let currentValidWords = [];

const statusEl = document.getElementById('status');
const inputEl = document.getElementById('letterInput');
const btnEl = document.getElementById('findBtn');
const resultsEl = document.getElementById('resultsList');
const filterContainer = document.getElementById('filterContainer');

function normalizePersian(text) {
    return text.replace(/ك/g, 'ک').replace(/ي/g, 'ی');
}

async function loadDictionaries() {
    try {
        const [dictRes, freqRes] = await Promise.all([
            fetch(DICT_URL),
            fetch(COMMON_DICT_URL)
        ]);

        if (!dictRes.ok || !freqRes.ok) throw new Error("Network response error");

        const dictText = await dictRes.text();
        const freqText = await freqRes.text();
        
        const dictWords = dictText.split('\n');
        for (let word of dictWords) {
            let trimmed = word.trim();
            if (trimmed) {
                persianDictionary.add(normalizePersian(trimmed));
            }
        }

        const freqLines = freqText.split('\n');
        for (let line of freqLines) {
            let parts = line.trim().split(' ');
            if (parts.length >= 2) {
                let word = normalizePersian(parts[0]);
                let freq = parseInt(parts[1], 10);
                wordFrequency.set(word, freq);
            }
        }
        
        statusEl.textContent = `دیتابیس آماده است`;
        statusEl.style.color = "#20c997";
        inputEl.disabled = false;
        btnEl.disabled = false;
    } catch (error) {
        statusEl.textContent = "خطا در دانلود دیتابیس. لطفا اینترنت خود را بررسی کنید.";
        statusEl.style.color = "#fa5252";
    }
}

function getPermutations(letters) {
    let results = new Set();
    
    function permute(current, remaining) {
        if (current.length >= 3) {
            results.add(current);
        }
        if (remaining.length === 0) return;
        
        for (let i = 0; i < remaining.length; i++) {
            let nextRemaining = remaining.slice();
            nextRemaining.splice(i, 1);
            permute(current + remaining[i], nextRemaining);
        }
    }
    
    permute("", letters);
    return results;
}

function renderWords(words) {
    resultsEl.innerHTML = "";
    words.forEach(word => {
        let li = document.createElement('li');
        
        let wordSpan = document.createElement('span');
        wordSpan.textContent = word;
        li.appendChild(wordSpan);

        if (wordFrequency.has(word)) {
            let checkSpan = document.createElement('span');
            checkSpan.textContent = "✔️";
            checkSpan.className = "check-icon";
            li.appendChild(checkSpan);
        }
        
        resultsEl.appendChild(li);
    });
}

function createFilters(words) {
    filterContainer.innerHTML = "";
    
    if (words.length === 0) return;

    const lengths = [...new Set(words.map(w => w.length))].sort((a, b) => a - b);
    
    const allBtn = document.createElement('button');
    allBtn.textContent = "همه";
    allBtn.className = "filter-btn active";
    allBtn.onclick = () => applyFilter(0, allBtn);
    filterContainer.appendChild(allBtn);

    lengths.forEach(len => {
        const btn = document.createElement('button');
        btn.textContent = `${len} حرفی`;
        btn.className = "filter-btn";
        btn.onclick = () => applyFilter(len, btn);
        filterContainer.appendChild(btn);
    });
}

function applyFilter(length, activeButton) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');

    if (length === 0) {
        renderWords(currentValidWords);
    } else {
        const filtered = currentValidWords.filter(w => w.length === length);
        renderWords(filtered);
    }
}

btnEl.addEventListener('click', () => {
    resultsEl.innerHTML = "";
    filterContainer.innerHTML = "";
    currentValidWords = [];
    
    const rawInput = inputEl.value;
    const letters = rawInput.trim().split(/\s+/).map(normalizePersian);
    
    if (letters.length < 3 || letters[0] === "") {
        statusEl.textContent = "لطفا حداقل ۳ حرف وارد کنید.";
        statusEl.style.color = "#fa5252";
        return;
    }

    statusEl.textContent = "در حال جستجو...";
    statusEl.style.color = "#228be6";

    setTimeout(() => {
        const possibleWords = getPermutations(letters);

        for (let word of possibleWords) {
            if (persianDictionary.has(word)) {
                currentValidWords.push(word);
            }
        }

        currentValidWords.sort((a, b) => {
            if (a.length !== b.length) {
                return a.length - b.length;
            }
            
            let freqA = wordFrequency.get(a) || 0;
            let freqB = wordFrequency.get(b) || 0;
            
            if (freqA !== freqB) {
                return freqB - freqA;
            }
            
            return a.localeCompare(b, 'fa');
        });

        if (currentValidWords.length === 0) {
            statusEl.textContent = "کلمه معناداری یافت نشد.";
            statusEl.style.color = "#fa5252";
        } else {
            statusEl.textContent = `${currentValidWords.length} کلمه یافت شد.`;
            statusEl.style.color = "#20c997";
            
            createFilters(currentValidWords);
            renderWords(currentValidWords);
        }
    }, 50);
});

window.onload = loadDictionaries;