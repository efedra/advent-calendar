let numbers = document.querySelectorAll('.number')
let modal = document.querySelector('.modal')
let neededNumberElem = null

//Табличка
let nowDay = new Date().getDate();
nowDay = nowDay > 30 ? 30 : nowDay;
document.getElementById('nowDay').innerText = nowDay;



function isUnique(value, array) {
    return !array.includes(value);
}
function finCookie(nameC){
    document.cookie.split('; ').forEach(el=>{
        const [name, value] = el.split('=');
        if (name === nameC) {
            opensCookie = value;
        }
    });
}

let opensCookie;
finCookie('opens')




if (opensCookie) {
    opens = JSON.parse(opensCookie);
    opens.forEach(el=>{
        document.querySelector(`.card[data-number="${el}"]`).style.display = 'block'
    })
}


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

                document.body.style.overflowY='hidden'
                //куки
                let opens = [];
                finCookie('opens')
                if (opensCookie) {
                    opens = JSON.parse(opensCookie);
                }
                if (isUnique(neededNumber, opens)) {
                    opens.push(neededNumber);
                }


// Обновляем куку с новыми значениями
                const expirationDate = new Date();
                expirationDate.setMonth(expirationDate.getMonth() + 11);
                const opensString = JSON.stringify(opens);
                document.cookie = `opens=${opensString}; expires=${expirationDate.toUTCString()}`;
            }
        )
    }
})

modal.addEventListener('click', (e) => {
    if (!neededNumberElem.contains(e.target)) {
        modal.removeChild(neededNumberElem)
        modal.style.display = "none";
        neededNumberElem = null;

        document.body.style.overflowY='auto'
    }

    if (e.target.type === 'checkbox') {
        let id = modal.querySelector('input').id
        const checkboxes = document.querySelectorAll(`input[name=${id}]`);
        checkboxes.forEach(checkbox => {
            checkbox.checked = e.target.checked;
        });
    }
})





