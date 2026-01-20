const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://mealmap-9fyr.onrender.com";

const getToken = () => localStorage.getItem("token");

const handleJSON = async (res) => {
  if (!res.ok) {
    let err;
    try {
      err = await res.json();
    } catch {
      throw new Error("Server error");
    }
    throw new Error(err.message || "Request failed");
  }
  return res.json();
};

export const api = {
  // ---------------- EVENTS ----------------
  getEvents: async () => {
    const res = await fetch(`${API_BASE_URL}/api/events`);
    return handleJSON(res);
  },

  getDonatableEvents: async () => {
    const res = await fetch(`${API_BASE_URL}/api/events/donate`);
    return handleJSON(res);
  },

  getDashboardEvents: async () => {
    const res = await fetch(`${API_BASE_URL}/api/events/dashboard`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return handleJSON(res);
  },

  createEvent: async (formData) => {
    const res = await fetch(`${API_BASE_URL}/api/events`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    });
    return handleJSON(res);
  },

  createInfoEvent: async (formData) => {
    const res = await fetch(`${API_BASE_URL}/api/events/info`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    });
    return handleJSON(res);
  },

  deleteEvent: async (id) => {
    const res = await fetch(`${API_BASE_URL}/api/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return handleJSON(res);
  },

  // ---------------- VOLUNTEER ----------------
  getMyVolunteering: async () => {
    const res = await fetch(`${API_BASE_URL}/api/volunteer/my`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return handleJSON(res);
  },

  volunteerForEvent: async (data) => {
    const res = await fetch(`${API_BASE_URL}/api/volunteer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return handleJSON(res);
  },

  cancelVolunteering: async (eventId) => {
    const res = await fetch(`${API_BASE_URL}/api/volunteer/${eventId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return handleJSON(res);
  },

  // ---------------- DONATION REQUESTS ----------------
  getDonationRequests: async () => {
    const res = await fetch(`${API_BASE_URL}/api/donation-requests`);
    return handleJSON(res);
  },

  getMyDonationRequests: async () => {
    const res = await fetch(`${API_BASE_URL}/api/donation-requests/my`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return handleJSON(res);
  },

  createDonationRequest: async (formData) => {
    const res = await fetch(`${API_BASE_URL}/api/donation-requests`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    });
    return handleJSON(res);
  },

  deleteDonationRequest: async (id) => {
    const res = await fetch(`${API_BASE_URL}/api/donation-requests/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return handleJSON(res);
  },

  // ---------------- AUTH / PASSWORD ----------------
  forgotPassword: async (email) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return handleJSON(res);
  },

  resetPassword: async (token, newPassword) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: newPassword }),
    });
    return handleJSON(res);
  },
};
