let students = [];

document.getElementById('regForm').onsubmit = function(event) {
    event.preventDefault();
   
    const name = document.getElementById('name').value.trim();
    const country = document.getElementById('country').value.trim().toLowerCase();
    const ubit = document.getElementById('ubit').value.trim();

    const phone = document.getElementById('phone').value.trim();
    if (!name || !country || !ubit || !phone) {
        alert("Please fill all fields");
        return;
}
students.push({name, country, ubit, phone});


    

    document.getElementById('regForm').reset();
    alert("Registered! Now search to see your listing.");
};

document.getElementById('searchBtn').onclick = function(event) {
    event.preventDefault();
    const q = document.getElementById('searchCountry').value.trim().toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    const found = students.filter(s => s.country === q);
    if (found.length === 0) {
        resultsDiv.innerHTML = "<p>No students found from that country.</p>";
    } else {
        found.forEach(s => {
            const div = document.createElement('div');
            div.className = 'student';

            div.innerHTML = `<b>${s.name}</b><br>Email: ${s.ubit}<br>Phone: ${s.phone}`;

            
            resultsDiv.appendChild(div);
        });
    }
};



