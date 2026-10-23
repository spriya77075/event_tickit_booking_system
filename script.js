
document.addEventListener("DOMContentLoaded", function () {
    const eventList = document.getElementById("event-list");

    events.forEach(event => {
        const card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <div class="event-info">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Price:</strong> ₹${event.price}</p>
                <button type="button">Book Tickets</button>
            </div>
        `;

        card.querySelector("button").addEventListener("click", () => {
            document.getElementById("event-select").value = event.id;
            document.getElementById("ticket-count").value = 1;
            document.getElementById("event-select")
                .dispatchEvent(new Event("change"));

            document.getElementById("booking").scrollIntoView({
                behavior: "smooth"
            });
        });

        eventList.appendChild(card);
    });

    setupBooking();
});
