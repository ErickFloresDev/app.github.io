async function fetchIngres() {
    const apiUrl = "https://script.google.com/macros/s/AKfycbxMuoCFVfGD0edaoh9WepnDYkFmyx_QpXm1ExiGn4nkFObvwYZT0545SIw9BFNVXXHdVA/exec?ruta=api/v1/ingress"; // Reemplaza con tu URL de API
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data); // Para depuración

        if (data.success) {
            const ingress = data.data; // Accediendo al array de datos
            ingressTable(ingress); // Llama a la función para llenar la tabla
        } else {
            console.error('La respuesta de la API no fue exitosa');
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}


function ingressTable(ingress) {
    const tbody = document.getElementById('ingressTableBody');
    tbody.innerHTML = ''; // Limpiar el contenido actual
    
    ingress.forEach(ingress => {
        const row = document.createElement('tr');
        row.classList.add('block', 'table-row');

        // Convierte ingress_date a un objeto Date
        const date = new Date(ingress.ingress_date);

        row.innerHTML = `
            <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-900 block md:table-cell">
                <div class="flex flex-col">
                    <span>${ingress.ingress_source}</span>
                    <span class="text-gray-500 text-xs">${date.toLocaleDateString()} - ${ingress.ingress_type}</span>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 md:table-cell">$${ingress.ingress_amount}</td>
        `;
        
        tbody.appendChild(row);
    });
}


// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', fetchIngres);
