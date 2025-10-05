async function fetchSaves() {
    const apiUrl = "https://script.google.com/macros/s/AKfycbxMuoCFVfGD0edaoh9WepnDYkFmyx_QpXm1ExiGn4nkFObvwYZT0545SIw9BFNVXXHdVA/exec?ruta=api/v1/save"; // Reemplaza con tu URL de API
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data); // Para depuración

        if (data.success) {
            const saves = data.data; // Accediendo al array de datos
            populateTable(saves); // Llama a la función para llenar la tabla
        } else {
            console.error('La respuesta de la API no fue exitosa');
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}


function populateTable(saves) {
    const tbody = document.getElementById('savesTableBody');
    tbody.innerHTML = ''; // Limpiar el contenido actual
    
    saves.forEach(save => {
        const row = document.createElement('tr');
        row.classList.add('block', 'table-row');

        // Convierte save_date a un objeto Date
        const date = new Date(save.save_date);

        row.innerHTML = `
            <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-900 block md:table-cell">
                <div class="flex flex-col">
                    <span>${save.save_source}</span>
                    <span class="text-gray-500 text-xs">${date.toLocaleDateString()} - ${save.save_type}</span>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 md:table-cell">$${save.save_amount}</td>
        `;
        
        tbody.appendChild(row);
    });
}


// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', fetchSaves);
