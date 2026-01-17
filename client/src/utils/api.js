const API_BASE_URL = "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

export const api = {
  // ---------------- EVENTS ----------------

  getEvents: async () => {
    const res = await fetch(`${API_BASE_URL}/events`);
    return res.json();
  },

  // ✅ Event creation with JWT + FormData
  createEvent: async (formData) => {
    const res = await fetch(`${API_BASE_URL}/events`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      body: formData
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Event creation failed");
    }

    return res.json();
  },

  // ✅ DELETE EVENT (ADDED ONLY)
  deleteEvent: async (id) => {
    const res = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Delete failed");
    }

    return res.json();
  },

  getDonatableEvents: async () => {
    const res = await fetch(`${API_BASE_URL}/events/donate`);
    return res.json();
  },

  // ✅ DASHBOARD EVENTS
  getDashboardEvents: async () => {
    const res = await fetch(`${API_BASE_URL}/events/dashboard`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return res.json();
  },

  // ---------------- VOLUNTEER ----------------

  getMyVolunteering: async () => {
    const res = await fetch(`${API_BASE_URL}/volunteer/my`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return res.json();
  },

  volunteerForEvent: async (data) => {
    const res = await fetch(`${API_BASE_URL}/volunteer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    });

    return res.json();
  },

  cancelVolunteering: async (eventId) => {
    const res = await fetch(`${API_BASE_URL}/volunteer/${eventId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    return res.json();
  },

  // ---------------- DONATION REQUESTS (NGO / TEMPLE) ----------------

  getDonationRequests: async () => {
    const res = await fetch(`${API_BASE_URL}/donation-requests`);
    return res.json();
  },

  createDonationRequest: async (formData) => {
    const res = await fetch(`${API_BASE_URL}/donation-requests`, {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Donation request failed");
    }

    return res.json();
  },

  // ✅ CREATE INFO EVENT (ADDED)
  createInfoEvent: async (formData) => {
    const res = await fetch(`${API_BASE_URL}/events/info`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: formData
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Info event creation failed");
    }

    return res.json();
  }
};
