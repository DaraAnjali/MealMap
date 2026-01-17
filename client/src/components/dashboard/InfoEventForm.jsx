import "./InfoEventForm.css";
import { useState } from "react";
import { api } from "../../utils/api";

export default function InfoEventForm({ open, onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    locationName: "",
    address: "",
    lat: "",
    lng: "",
    date: "",
    startTime: "",
    endTime: "",
    recurrence: "one-time",
    weeklyDay: "",
    infoDisclaimer: ""
  });

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "coordinates",
      JSON.stringify({
        type: "Point",
        coordinates: [Number(form.lng), Number(form.lat)]
      })
    );

    formData.append("title", form.title);
    formData.append("locationName", form.locationName);
    formData.append("address", form.address);
    formData.append("date", form.date);
    formData.append("startTime", form.startTime);
    formData.append("endTime", form.endTime);
    formData.append("recurrence", form.recurrence);
    formData.append("weeklyDay", form.weeklyDay);
    formData.append("infoDisclaimer", form.infoDisclaimer);

    await api.createInfoEvent(formData);
    onSuccess();
    onClose();
  };

  return (
    <div className="event-overlay">
      <div className="event-details">
        <button className="close-btn" onClick={onClose}>✖</button>

        <h2>Share Food Place Info</h2>
        <p className="info-note">
          This is optional information. You are not responsible if food is not served.
        </p>

        <form className="event-form" onSubmit={submit}>
          <input name="title" placeholder="Place Name" onChange={handleChange} required />
          <input name="locationName" placeholder="Area / City" onChange={handleChange} required />
          <input name="address" placeholder="Address" onChange={handleChange} required />

          <div className="row">
            <input name="lat" placeholder="Latitude" onChange={handleChange} required />
            <input name="lng" placeholder="Longitude" onChange={handleChange} required />
          </div>

          <input type="date" name="date" onChange={handleChange} required />

          <div className="row">
            <input type="time" name="startTime" onChange={handleChange} required />
            <input type="time" name="endTime" onChange={handleChange} required />
          </div>

          <select name="recurrence" onChange={handleChange}>
            <option value="one-time">One Time</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>

          {form.recurrence === "weekly" && (
            <select name="weeklyDay" onChange={handleChange} required>
              <option value="">Select Day</option>
              <option value="0">Sunday</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
            </select>
          )}

          <textarea
            name="infoDisclaimer"
            placeholder="Optional disclaimer (eg: timing may change)"
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn">
            Post Info
          </button>
        </form>
      </div>
    </div>
  );
}
