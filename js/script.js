/*window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    document.body.classList.add('no-scroll');
    setTimeout(function() {
        loadingScreen.classList.add('fade-out');
        setTimeout(function() {
            loadingScreen.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }, 1500); 
    }, 1500);
});
*/

async function loadRepItems() {
    try {
        const repItemsJson = await fetch('/js/data.json');
        const repitems = await repItemsJson.json();
        const repBox = document.getElementById('rep-box');

        const sortedItems = repitems.sort((a, b) => b.id - a.id).slice(0, 4);

        sortedItems.forEach(repitem => {
            const repItem = document.createElement('div');
            repItem.classList.add('item');
            repItem.innerHTML = `
                <h4>${repitem.title}</h4>
                <p>${repitem.description}</p>
                <a href="${repitem.link}" class="btn">Acessar conteúdo</a>
            `;
            repBox.appendChild(repItem);
        });
    } catch (error) {
        console.error('Error loading repository items:', error);
    }
}

window.addEventListener('load', loadRepItems);