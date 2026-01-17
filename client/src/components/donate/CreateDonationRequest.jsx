import { useState } from "react";
import { api } from "../../utils/api";
import "./CreateDonationRequest.css";

export default function CreateDonationRequest() {
  const [form, setForm] = useState({
    name: "",
    purpose: "",
    contact: "",
    targetAmount: ""
  });
  const [qr, setQr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append("qrCode", qr);

    await api.createDonationRequest(fd);
    alert("Donation request created");
    window.location.reload();
  };

  return (
    <div className="create-request-wrapper">
      <h3>Post a Donation Request</h3>

      <form className="create-request-form" onSubmit={submit}>
        <input
          placeholder="Name / Organization"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Purpose"
          required
          onChange={(e) => setForm({ ...form, purpose: e.target.value })}
        />

        <input
          placeholder="Contact Details"
          required
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
        />

        <input
          type="number"
          placeholder="Target Amount (₹)"
          required
          onChange={(e) => setForm({ ...form, targetAmount: e.target.value })}
        />

        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) => setQr(e.target.files[0])}
        />

        <button type="submit">Create Request</button>
      </form>
    </div>
  );
}
