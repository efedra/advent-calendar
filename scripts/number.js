let numbers = document.querySelectorAll('.number')
let modal = document.querySelector('.modal')
let neededNumberElem = null

//Табличка
let nowDay = new Date().getDate();
nowDay = nowDay > 30 ? 30 : nowDay;
document.getElementById('nowDay').innerText = nowDay;


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
            }
        )
    }
})

modal.addEventListener('click', (e) => {
    if (!neededNumberElem.contains(e.target)) {
        modal.removeChild(neededNumberElem)
        modal.style.display = "none";
        neededNumberElem = null;
    }

        if (e.target.type === 'checkbox') {
            let id = modal.querySelector('input').id
            const checkboxes = document.querySelectorAll(`input[name=${id}]`);
            checkboxes.forEach(checkbox => {
                checkbox.checked = e.target.checked;
            });
        }
})





