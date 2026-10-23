
function setupBooking() {
    const eventSelect = document.getElementById("event-select");
    const ticketCount = document.getElementById("ticket-count");
    const totalPrice = document.getElementById("total-price");

    events.forEach(event => {
        const option = document.createElement("option");
        option.value = event.id;
        option.textContent =
            `${event.title} - ₹${event.price}`;
        eventSelect.appendChild(option);
    });

    function updateTotal() {
        const selectedEvent = events.find(
            event => event.id === Number(eventSelect.value)
        );

        const quantity = Number(ticketCount.value) || 0;
        const total = selectedEvent
            ? selectedEvent.price * quantity
            : 0;

        totalPrice.textContent = `Total: ₹${total}`;
    }

    eventSelect.addEventListener("change", updateTotal);
    ticketCount.addEventListener("input", updateTotal);

    document.getElementById("booking-form")
        .addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("customer-name")
                .value.trim();
            const email = document.getElementById("customer-email")
                .value.trim();
            const eventId = Number(eventSelect.value);
            const quantity = Number(ticketCount.value);
            const payment = document.getElementById("payment-method")
                .value;

            const selectedEvent = events.find(
                event => event.id === eventId
            );

            if (!name || !email || !selectedEvent || !payment ||
                !Number.isInteger(quantity) ||
                quantity < 1 || quantity > 10) {
                alert("Please enter valid booking details.");
                return;
            }

            const booking = {
                name,
                email,
                event: selectedEvent.title,
                tickets: quantity,
                payment,
                total: selectedEvent.price * quantity
            };

            saveBooking(booking);
            showBooking(booking);

            this.reset();
            ticketCount.value = 1;
            updateTotal();
        });

    updateTotal();
}

function saveBooking(booking) {
    const bookings = JSON.parse(
        localStorage.getItem("eventBookings") || "[]"
    );

    bookings.push({
        ...booking,
        bookingId: "EVT" + Date.now()
    });

    localStorage.setItem("eventBookings", JSON.stringify(bookings));
}

function showBooking(booking) {
    const result = document.getElementById("booking-result");

    result.innerHTML = `
        <div class="success">
            <h3>Booking Successful!</h3>
            <p><strong>Name:</strong> ${escapeHTML(booking.name)}</p>
            <p><strong>Event:</strong> ${escapeHTML(booking.event)}</p>
            <p><strong>Tickets:</strong> ${booking.tickets}</p>
            <p><strong>Payment:</strong> ${escapeHTML(booking.payment)}</p>
            <p><strong>Total:</strong> ₹${booking.total}</p>
            <p>Demo booking saved in this browser.</p>
        </div>
    `;
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}
