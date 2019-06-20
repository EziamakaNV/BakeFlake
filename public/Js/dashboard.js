const menuBarAnimation = (menu) => {
  menu.classList.toggle('change');
  document.getElementById('myDropDown').classList.toggle('show');
};
const loader = document.querySelector('#loaderModal');
const name = document.querySelector('#client-name');
const balance = document.querySelector('#balance');

const getNameFromCookie = (cname) => {
    // Code gotten from w3schools
    // Parse the cookie to get the user name
    // https://www.w3schools.com/js/js_cookies.asp
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  };

document.addEventListener('DOMContentLoaded', async () => {
    loader.style.display = 'block';
    const userJSON = getNameFromCookie('user');
    const user = JSON.parse(userJSON);
    name.textContent = `Welcome ${user.firstName} ${user.lastName}`;
    try {
        const responseBalance = await fetch('/api/v1/balance', {
            credentials: 'include',
            method: 'GET', 
          });
        const responseBodyBalance = await responseBalance.json();
        balance.textContent = `Balance: NGN ${responseBodyBalance.data.data[0].balance / 100}`; // Convert from Kobo to Naira
        loader.style.display = 'none';
    } catch (error) {
        loader.style.display = 'none';
        balance.textContent = error;
    }
});
  