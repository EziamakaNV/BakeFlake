const menuBarAnimation = (menu) => {
    menu.classList.toggle('change');
    document.getElementById('myDropDown').classList.toggle('show');
  };
const loader = document.querySelector('#loaderModal');
const message = document.querySelector('.error-message-div');
const recipientElement = document.querySelector('#recipient');

document.addEventListener('DOMContentLoaded', async () => {
    loader.style.display = 'block';
    try {
        // Retrieve recipients
        const response = await fetch('/api/v1/transferrecipient', {
            credentials: 'include',
            method: 'GET',
            });
        const responseBody = await response.json();
        if (response.status === 200) {
            responseBody.data.data.forEach(recipient => {
                recipientElement.insertAdjacentHTML('beforeend', 
                `<option value='${recipient.recipient_code}'>${recipient.name}</option>`)
            });
            loader.style.display = 'none';
        } else {
            loader.style.display = 'none';
            message.style.display = 'block';
            message.textContent = error;
        }
    } catch (error) {
        loader.style.display = 'none';
        message.style.display = 'block';
        message.textContent = error;
    }
});

const transferFunds = async () => {
    message.style.display = 'none';
    loader.style.display = 'block';
    const recipientElement = document.querySelector('#recipient');
    const recipient = recipientElement.options[recipientElement.selectedIndex].value;
    const amount = document.querySelector('#amount').value;
    const reason = document.querySelector('#reason').value || 'No reason provided';
    try {
        const response = await fetch('/api/v1/transfer', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipient, amount, reason }),
            });
        const responseBody = await response.json();
        if (response.status === 200) {
            document.querySelector('.form-structure').style.display = 'none';
            loader.style.display = 'none';
            message.style.display = 'block';
            message.style.color = 'green';
            message.textContent = `Transfer ${responseBody.data.data.status}!`;
        } else {
            loader.style.display = 'none';
            message.style.display = 'block';
            message.textContent = responseBody.data.message;
        }
    } catch (error) {
        loader.style.display = 'none';
        message.style.display = 'block';
        message.textContent = error;
    }
};