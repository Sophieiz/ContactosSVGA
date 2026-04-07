async function cargarDatosDesdeAPI() {
    try {

        const respuesta = await fetch('/api/contactos');


        const datos = await respuesta.json();


        const tabla = document.getElementById('cuerpo-tabla');


        tabla.innerHTML = '';


        if (datos.error) {
            console.error("Error desde el servidor:", datos.error);
            tabla.innerHTML = `<tr><td colspan="7" style="color: red;">Error: ${datos.error}</td></tr>`;
            return;
        }


        datos.forEach(item => {
            const fila = document.createElement('tr');



            datos.forEach(item => {
                const fila = document.createElement('tr');


                fila.innerHTML = `
        <td>${item.id_numero || 'N/A'}</td>
        <td><strong>${item.nombre_empresa || item.empresa || 'N/A'}</strong></td>
        <td>${item.nombre_contacto || item.nombre || 'N/A'}</td>
        <td>${item.fecha_inicio || item.fecha_ini || 'N/A'}</td>
        <td>${item.fecha_fin || 'N/A'}</td>
        <td>${item.telefono || 'N/A'}</td>
        <td><span class="estado-pendiente">Pendiente</span></td>
    `;

                tabla.appendChild(fila);
            });

            tabla.appendChild(fila);
        });

        console.log("¡Datos cargados exitosamente desde MySQL!");

    } catch (error) {
        console.error("Error crítico al conectar con la API:", error);
        document.getElementById('cuerpo-tabla').innerHTML =
            `< tr > <td colspan="7">No se pudo conectar con el servidor de Python.</td></tr > `;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    console.log("Página cargada, iniciando petición a FastAPI...");
    cargarDatosDesdeAPI();
});