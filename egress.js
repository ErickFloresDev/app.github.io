async function fetchEgres() {
    const apiUrl = "https://script.google.com/macros/s/AKfycbxMuoCFVfGD0edaoh9WepnDYkFmyx_QpXm1ExiGn4nkFObvwYZT0545SIw9BFNVXXHdVA/exec?ruta=api/v1/egress"; // Reemplaza con tu URL de API
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data); // Para depuración

        if (data.success) {
            const egress = data.data; // Accediendo al array de datos
            egressTable(egress); // Llama a la función para llenar la tabla
        } else {
            console.error('La respuesta de la API no fue exitosa');
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}


function egressTable(egress) {
    const tbody = document.getElementById('egressTableBody');
    tbody.innerHTML = ''; // Limpiar el contenido actual
    
    egress.forEach(egress => {
        const row = document.createElement('tr');
        row.classList.add('block', 'table-row');

        // Convierte egress_date a un objeto Date
        const date = new Date(egress.egress_date);

        row.innerHTML = `
            <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-900 block md:table-cell">
                <div class="flex flex-col">
                    <span class="text-gray-300">${egress.egress_source}</span>
                    <span class="text-gray-500 text-xs">${date.toLocaleDateString()} - ${egress.egress_type}</span>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300 md:table-cell">S/ ${egress.egress_amount.toFixed(2)}</td>
        `;
        
        tbody.appendChild(row);
    });
}


// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', fetchEgres);
