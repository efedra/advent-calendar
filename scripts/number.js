let numbers = document.querySelectorAll('.number')
let modal = document.querySelector('.modal')
let neededNumberElem = null

//Табличка
let nowDay = new Date().getDate();
nowDay = nowDay > 30 ? 30 : nowDay;
document.getElementById('nowDay').innerText = nowDay;


function readCookie(nameC) {
    let opensCookie;
    document.cookie.split('; ').forEach(el => {
        const [name, value] = el.split('=');
        if (name === nameC) {
            opensCookie = value;
        }
    });
    if (opensCookie) {
        return JSON.parse(opensCookie);
    } else {
        return [];
    }

}

function writeCooke(name, neededNumber, arr) {
    if (isUnique(neededNumber, arr)) {
        arr.push(neededNumber);
    }

    const expirationDate = new Date();
    if (expirationDate.getMonth() === 11) {
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    }
    expirationDate.setMonth(10);
    expirationDate.setDate(30);
    const opensString = JSON.stringify(arr);
    document.cookie = `${name}=${opensString}; expires=${expirationDate.toUTCString()}`;
}

function deleteCookie(name, elem) {
    let cookies = readCookie(name)

    // Находим индекс элемента в массиве
    const index = cookies.indexOf(elem);

    // Если элемент найден, удаляем его из массива
    if (index !== -1) {
        cookies.splice(index, 1);
    }

    // Обновляем куку с новыми значениями
    const expirationDate = new Date();
    if (expirationDate.getMonth() === 11) {
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    }
    expirationDate.setMonth(10);
    expirationDate.setDate(30);
    const cookiesString = JSON.stringify(cookies);
    document.cookie = `${name}=${cookiesString}; expires=${expirationDate.toUTCString()}`;
}

function isUnique(value, array) {
    return !array.includes(value);
}


let done = readCookie('done');
done.forEach(el => {
    document.getElementById(el).checked = true;
})

let opens = readCookie('opens');


opens.forEach(el => {
    document.querySelector(`.card[data-number="${el}"]`).style.display = 'block'
})


numbers.forEach(el => {
    if (el.getAttribute('data-number') <= nowDay) {
        el.addEventListener('click', () => {
                let neededNumber = el.getAttribute('data-number')
                document.querySelector(`.card[data-number="${neededNumber}"]`).style.display = 'block'
                neededNumberElem = document.querySelector(`.card[data-number="${neededNumber}"]`).cloneNode(true)
                modal.style.display = "flex";
                modal.appendChild(neededNumberElem);
                neededNumberElem.classList.add('card-modal')
                neededNumberElem.querySelector('.card__snow').classList.add('card__snow_modal')
                document.body.style.overflowY = 'hidden'
                //куки
                let opens = readCookie('opens');
                writeCooke('opens', neededNumber, opens)
            }
        )
    }
})

modal.addEventListener('click', (e) => {
    if (!neededNumberElem.contains(e.target)) {
        modal.removeChild(neededNumberElem)
        modal.style.display = "none";
        neededNumberElem = null;
        document.body.style.overflowY = 'auto'
    }
})


document.addEventListener('click', (e) => {
    if (e.target.type === 'checkbox') {

        let id = e.target.closest('.checkbox__card').querySelector('input').id
        const checkboxes = document.querySelectorAll(`input[name=${id}]`);

        checkboxes.forEach(checkbox => {
            checkbox.checked = e.target.checked;
            if (checkbox.checked) {
                writeCooke('done', id, done)
            } else {
                deleteCookie('done', id)
            }
        });
    }
})



