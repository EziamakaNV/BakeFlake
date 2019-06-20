const menuBarAnimation = (menu) => {
    menu.classList.toggle('change');
    document.getElementById('myDropDown').classList.toggle('show');
  };
const loader = document.querySelector('#loaderModal');
const message = document.querySelector('.error-message-div');
const validateForm = document.querySelector('#validateForm');

const validateRecipient = async () => {
    const bank = document.querySelector('#validate_bank_code');
    const account_number = document.querySelector('#validate_account_number').value;
    const bank_code = bank.value;
    const bank_name = bank.options[bank.selectedIndex].textContent;
    loader.style.display = 'block';
    try {
    // First off validate the account
    const response = await fetch(`/api/v1/validate_account?account_number=${account_number}&bank_code=${bank_code}`, {
        credentials: 'include',
        method: 'GET',
        });
        const responseBody = await response.json();
        if (response.status === 200) {
            message.style.display = 'none';
            // Display the name for confirmation
            validateForm.style.display = 'none';
            document.querySelector('#post-ad-container').insertAdjacentHTML('beforeend', `
            <form class='form-structure' onsubmit="event.preventDefault()" id="createForm">
                <h2 class='form-headers'>CREATE RECIEVER</h2>
                <div>
                    <label for='name'>Name</label>
                    <select name='name' id='name' required>
                        <option value='${responseBody.data.data.account_name}'>${responseBody.data.data.account_name}</option>
                    </select>
                </div>
                <div>
                    <label for='account_number'>Account Number</label>
                    <select name='account_number' id='account_number' required>
                        <option value='${account_number}'>${account_number}</option>
                    </select>
                </div>
                <div>
                    <label for='bank'>Bank</label>
                    <select name='bank' id='bank' required>
                        <option value='${bank_code}'>${bank_name}</option>
                    </select>
                </div>
                <div>
                    <label for='description'>Description</label>
                    <textarea name="description" id="description" maxlength="50"></textarea>
                </div>
                <button class='button' onclick="createRecipient()">CREATE</button>
            </form>
            `);
            loader.style.display = 'none';

        } else {
            loader.style.display = 'none';
            message.style.display = 'block';
            message.textContent = responseBody.error;
        }
    } catch (error) {
        loader.style.display = 'none';
        message.style.display = 'block';
        message.textContent = error;
    }
    
}

const createRecipient = async () => {
    const nameElement = document.querySelector('#name');
    const accountNumberElement = document.querySelector('#account_number');
    const bankElement = document.querySelector('#bank');
    const description = document.querySelector('#description').value;
    const name = nameElement.options[nameElement.selectedIndex].value;
    const account_number = accountNumberElement.options[accountNumberElement.selectedIndex].value;
    const bank_code = bankElement.options[bankElement.selectedIndex].value;
    const body = {
        name,
        account_number,
        bank_code,
        description: description || 'No description supplied',
    };
    try {
        loader.style.display = 'block';
        const response = await fetch('/api/v1/transferrecipient', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            });
            const responseBody = await response.json();
            if (response.status === 201) {
                document.querySelector('#createForm').style.display = 'none';
                message.style.display = 'block';
                message.style.color = 'green';
                message.textContent = 'Recipient Created!';
                loader.style.display = 'none';
            } else {
                console.log(responseBody)
                loader.style.display = 'none';
                message.style.display = 'block';
                message.textContent = responseBody.message || responseBody.error;
            }
    } catch (error) {
        loader.style.display = 'none';
        message.style.display = 'block';
        message.textContent = error;
    }
};