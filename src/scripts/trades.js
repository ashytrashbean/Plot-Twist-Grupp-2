import { getBaseUrl } from "../utils/api.js";
import { getCurrentUserId } from "../utils/auth.js";

let selectedTrade = null;

export async function sendTradeRequest(plant) {
    const currentUserId = getCurrentUserId();

    if (!currentUserId) {
        alert("You have to be logged in to send a trade request.");
        return;
    }

    const url = `${getBaseUrl()}trades`;

    const requestBody = {
        plantId: plant._id,
        requesterId: currentUserId
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        const text = await response.text();
        const data = text ? JSON.parse(text) : null;

        if (!response.ok) {
            throw new Error(data?.message || "Could not send trade request");
        }

        alert("Trade request sent successfully!");
    } catch (error) {
        alert("Something went wrong while sending the trade request: " + error.message);
    }
}

async function updateTradeStatus(tradeId, newStatus) {
    const url = `${getBaseUrl()}trades/${tradeId}`;

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        });
    
        const text = await response.text();
        const data = text ? JSON.parse(text) : null;
    
        if (!response.ok) {
            throw new Error(data?.message || "Could not update trade status");
        }
    
        return data;
    } catch (error) {
        console.error("Error updating trade:", error);
        alert("Could not update trade: " + error.message);
    }
}

function openNotificationModal(trade) {
    const modal = document.querySelector("#notification-modal");
    const message = document.querySelector("#notification-message");

    if (!modal || !message) return;

    message.textContent = `${trade.requesterId.name} wants your plant ${trade.plantId.name}`;
    modal.classList.remove("hidden");
}

export async function checkForTradeRequests() {
    const currentUserId = getCurrentUserId();
    if (!currentUserId) return;

    const url = `${getBaseUrl()}trades`;

    try {
        const response = await fetch(url);
        const trades = await response.json();
        
        const incomingRequests = trades.filter(trade =>
            trade.ownerId?._id === currentUserId &&
            trade.status === "pending"
        );
    
        if (incomingRequests.length > 0) {
            selectedTrade = incomingRequests[0];
            openNotificationModal(selectedTrade);
        }
    } catch (error) {
        console.error("Error fetching trades:", error);
    }
}

export function initTradeModals() {
    const closeNotificationBtn = document.querySelector("#close-notification-modal");
    const acceptBtn = document.querySelector("#accept-btn");
    const declineBtn = document.querySelector("#decline-btn");
    const notificationModal = document.querySelector("#notification-modal");

    if (closeNotificationBtn) {
        closeNotificationBtn.onclick = () => {
            notificationModal?.classList.add("hidden");
        };
    }

    if (acceptBtn) {
        acceptBtn.onclick = async () => {
            if (!selectedTrade) return;
            
            await updateTradeStatus(selectedTrade._id, "approved");
            alert("Trade accepted!");
            notificationModal?.classList.add("hidden");
        };
    }

    if (declineBtn) {
        declineBtn.onclick = async () => {
            if (!selectedTrade) return;
            
            await updateTradeStatus(selectedTrade._id, "cancelled");
            alert("Trade cancelled!");
            notificationModal?.classList.add("hidden");
        };
    }
}