const modal = document.getElementById("bookingModal");
const closeBtn = document.querySelector(".close");
const cancelBtn = document.getElementById("cancelBooking");
const reserveButtons = document.querySelectorAll(".btn-reserve-card");

const serviceInput = document.getElementById("service");
const priceInput = document.getElementById("price");

// ABRIR MODAL Y LLENAR DATOS
reserveButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        modal.style.display = "block";
        serviceInput.value = btn.getAttribute("data-service");
        priceInput.value = "$" + btn.getAttribute("data-price");
    });
});

// CERRAR MODAL
closeBtn.onclick = () => modal.style.display = "none";
cancelBtn.onclick = () => modal.style.display = "none";

// CERRAR MODAL SI SE HACE CLICK FUERA
window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; }

// CANCELACIÓN 2 HORAS ANTES
document.getElementById("bookingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const serviceDateTime = new Date(`${date}T${time}`);
    const now = new Date();

    const diffHours = (serviceDateTime - now) / (1000 * 60 * 60);

    if(diffHours < 2){
        alert("No se puede cancelar o reservar con menos de 2 horas de anticipación.");
        return;
    }

    alert("Reserva confirmada para " + serviceInput.value + " el " + date + " a las " + time);
    modal.style.display = "none";
});
