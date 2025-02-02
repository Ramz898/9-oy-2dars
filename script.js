const userCardsContainer = document.getElementById('userCards');
const searchInput = document.getElementById('search');
const darkModeToggle = document.getElementById('darkModeToggle');

let users = [];

// Dark mode-ni saqlab qolish uchun oldingi holatini tekshirish
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}

// Fetch user data from the API
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => {
    users = data;
    displayUsers(users);
  })
  .catch(error => console.error('Error fetching data:', error));

// Search filter for users
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredUsers = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm)
    );
    displayUsers(filteredUsers);
});

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Sahifani yangilaganda dark mode holati saqlansin
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Function to display user cards
function displayUsers(users) {
    userCardsContainer.innerHTML = ''; // Clear container
    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h2>${user.name}</h2>
            <p>📧 ${user.email}</p>
            <p>📞 ${user.phone}</p>
            <p>🏠 ${user.address.city}, ${user.address.street}</p>
        `;
        userCardsContainer.appendChild(card);
    });

    // Dark mode yoqilgan bo'lsa, yangi qo'shilgan kartalarga ham stil berish
    if (document.body.classList.contains('dark-mode')) {
        document.querySelectorAll('.card').forEach(card => {
            card.style.backgroundColor = '#1e1e1e';
            card.style.color = 'white';
            card.style.border = '1px solid #333';
        });
    }
}


function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
 }