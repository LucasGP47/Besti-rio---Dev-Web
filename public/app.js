document.addEventListener("DOMContentLoaded", function() {       
    function fetchMonsterTypes() {
        fetch('/getMonsterTypes')
            .then(response => response.json())
            .then(data => {
                displayMonsterTypes(data);
            })
            .catch(error => console.error('Erro ao buscar os tipos de monstros:', error));
    }
    
    function displayMonsterTypes(monsterTypes) {
        const sidebar = document.querySelector('.sidebar');
        sidebar.innerHTML = ''; 
        
        for (const [typeName, monsters] of Object.entries(monsterTypes)) {
            const typeHeader = document.createElement('h3');
            typeHeader.textContent = typeName;
            sidebar.appendChild(typeHeader);
            
            const monsterList = document.createElement('ul');
            sidebar.appendChild(monsterList);

            monsters.forEach(monster => {
                const monsterItem = document.createElement('li');
                const monsterLink = document.createElement('a');
                monsterLink.href = "#";
                monsterLink.textContent = monster.name;
                monsterLink.onclick = () => showMonsterDetails(monster.id);
                monsterItem.appendChild(monsterLink);
                monsterList.appendChild(monsterItem);
            });
        }
    }

    function showMonsterDetails(monsterId) {
        console.log('Selected Monster ID:', monsterId);
    }

    fetchMonsterTypes();
});