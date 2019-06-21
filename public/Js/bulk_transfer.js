const menuBarAnimation = (menu) => {
    menu.classList.toggle('change');
    document.getElementById('myDropDown').classList.toggle('show');
  };
  const loader = document.querySelector('#loaderModal');
  const bulkForm1 = document.querySelector('.bulk-transfer-1');
  const bulkForm2 = document.querySelector('.bulk-transfer-2');
  const message = document.querySelector('.error-message-div');


  const numberOfRecipients = async () => {
    loader.style.display = 'block';
    const numberOfRecipients = document.querySelector('#recipient_number').value;
    bulkForm1.style.display = 'none';
    bulkForm2.style.display = 'block';

    // Insert the fields to get customer details
    for (let i = 1; i <= numberOfRecipients; i++) {
      document.querySelector('#bt2').insertAdjacentHTML('afterend', `
      <div>
          <label for='recipient${i}'>Recipient</label>
          <select name='recipient${i}' id="recipient${i}" required>
              <option value=''>-- Please Select A Recipient --</option>
          </select>
          <label for='amount${i}'>Amount (Minimum Transfer - N50)</label>
          <input type='number' required name='amount${i}' id='amount${i}'>
      </div>
      `);
    }
    // Retrieve recipients
    try {
      const response = await fetch('/api/v1/transferrecipient', {
            credentials: 'include',
            method: 'GET',
            });
        const responseBody = await response.json();
        if (response.status === 200) {
          // Update the form with the recipients
          for(let i = 1; i <= numberOfRecipients; i++) {
            // Use the response to populate the form
            // Select each option element through the id and use that to update the form
            responseBody.data.data.forEach(recipient => {
              document.querySelector(`#recipient${i}`).insertAdjacentHTML('beforeend', 
                `<option value='${recipient.recipient_code}'>${recipient.name}</option>`)
            });
          }
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
  };

  const transfer = async () => {
    const transfers = [];
    const form = new FormData(document.querySelector('#form-bulk-transfer-2'));
    // Calculate the number of recipients
    let count = 0;
    // Get the number of entries in the form
    form.forEach(() => { count ++ });
    const numberOfRecipients = count / 2; // Two entries in the form per recipient
    // Populate the transfers variable
    for(let i = 1; i <= numberOfRecipients; i++) {
      const amountElement = document.querySelector(`#amount${i}`);
      const recipientElement = document.querySelector(`#recipient${i}`)
      const transfer = {
        amount: amountElement.value,
        recipient: recipientElement.options[recipientElement.selectedIndex].value,
      };
      transfers.push(transfer);
    }

    // Initiate API request
    try {
        loader.style.display = 'block';
        const response = await fetch('/api/v1/transfer/bulk', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transfers }),
            });
            const responseBody = await response.json();
            if (response.status === 200) {
                document.querySelector('#form-bulk-transfer-2').style.display = 'none';
                message.style.display = 'block';
                message.style.color = 'green';
                message.textContent = responseBody.data.message;
                loader.style.display = 'none';
            } else {
                console.log(responseBody)
                loader.style.display = 'none';
                message.style.display = 'block';
                message.textContent = responseBody.error;
            }
    } catch (error) {
        loader.style.display = 'none';
        message.style.display = 'block';
        message.textContent = error;
    }
  };