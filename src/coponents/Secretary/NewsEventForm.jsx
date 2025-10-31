import React, { useState } from "react";
import "./NewsEventForm.css";
import API from "../Authentication/api";

export default function NewsEventForm({ token, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    type: "news",
    summary: "",
    content: "",
    date: "",
    event_start: "",
    location: "",
    visibility: "public", // ✅ added
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const jwt = token || window.localStorage.getItem("access_token") || "";

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.title.trim() || !form.summary.trim() || !form.content.trim()) {
      setMessage({
        type: "error",
        text: "Title, Summary, and Content are required fields.",
      });
      return false;
    }

    if (form.type === "news" && !form.date) {
      setMessage({
        type: "error",
        text: "Please select a date for the news item.",
      });
      return false;
    }

    if (form.type === "event" && (!form.location || !form.event_start)) {
      setMessage({
        type: "error",
        text: "Event start and location are required.",
      });
      return false;
    }

    if (!["public", "private", "draft"].includes(form.visibility.toLowerCase())) {
      setMessage({
        type: "error",
        text: "Visibility must be one of: public, private, or draft.",
      });
      return false;
    }

    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    if (!validate()) return;
    setSubmitting(true);

    try {
      const endpoint = form.type === "event" ? "/event" : "/news";

      const payload =
        form.type === "event"
          ? {
              name: form.title,
              summary: form.summary,
              date: form.event_start?.split("T")[0],
              location: form.location,
              description: form.content,
              visibility: form.visibility, // ✅ added
            }
          : {
              title: form.title,
              summary: form.summary,
              content: form.content,
              date: form.date,
              visibility: form.visibility, // ✅ added
            };

      const res = await API.post(endpoint, payload, {
        headers: {
          Authorization: jwt ? `Bearer ${jwt}` : undefined,
          "Content-Type": "application/json",
        },
      });

      setMessage({
        type: "success",
        text: res.data.message || "Created successfully.",
      });

      setForm({
        title: "",
        type: "news",
        summary: "",
        content: "",
        date: "",
        event_start: "",
        location: "",
        visibility: "public",
      });

      if (typeof onSuccess === "function") onSuccess(res.data);
    } catch (err) {
      console.error("Create error:", err.response?.data || err.message);
      const errMsg =
        err.response?.data?.error ||
        err.response?.data?.msg ||
        "Network or server error.";
      setMessage({ type: "error", text: errMsg });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="nexus-form-container" onSubmit={handleSubmit} noValidate>
      <div className="nexus-form-header">
        <h2 className="nexus-form-title">
          {form.type === "news" ? "Create News Article" : "Create Event"}
        </h2>
        <p className="nexus-form-subtitle">
          Fill in the details below to create a new{" "}
          {form.type === "news" ? "news article" : "event"} for your organization.
        </p>
      </div>

      {message && (
        <div
          className={`nexus-form-alert nexus-alert--${
            message.type === "success" ? "success" : "error"
          }`}
        >
          <span className="nexus-alert-icon">
            {message.type === "success" ? "✓" : "!"}
          </span>
          {message.text}
        </div>
      )}

      <div className="nexus-form-grid">
        {/* Type Selector */}
        <div className="nexus-form-group">
          <label className="nexus-form-label">Content Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="nexus-form-select"
          >
            <option value="news">News Article</option>
            <option value="event">Event</option>
          </select>
        </div>

        {/* ✅ Visibility Selector */}
        <div className="nexus-form-group">
          <label className="nexus-form-label">
            Visibility <span className="nexus-required">*</span>
          </label>
          <select
            name="visibility"
            value={form.visibility}
            onChange={handleChange}
            className="nexus-form-select"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Shared Fields */}
        <div className="nexus-form-group">
          <label className="nexus-form-label">
            Title <span className="nexus-required">*</span>
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="nexus-form-input"
            placeholder="Enter a compelling title"
            required
          />
        </div>

        <div className="nexus-form-group">
          <label className="nexus-form-label">
            Summary <span className="nexus-required">*</span>
          </label>
          <input
            name="summary"
            value={form.summary}
            onChange={handleChange}
            className="nexus-form-input"
            placeholder="Brief overview or teaser"
          />
        </div>

        <div className="nexus-form-group nexus-form-group--full">
          <label className="nexus-form-label">
            Content <span className="nexus-required">*</span>
          </label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className="nexus-form-textarea"
            rows={6}
            placeholder="Write detailed content here..."
          />
        </div>

        {/* Conditional Fields */}
        {form.type === "news" && (
          <div className="nexus-form-group">
            <label className="nexus-form-label">
              Publication Date <span className="nexus-required">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="nexus-form-input"
              required
            />
          </div>
        )}

        {form.type === "event" && (
          <>
            <div className="nexus-form-group">
              <label className="nexus-form-label">
                Event Start <span className="nexus-required">*</span>
              </label>
              <input
                type="datetime-local"
                name="event_start"
                value={form.event_start}
                onChange={handleChange}
                className="nexus-form-input"
                required
              />
            </div>

            <div className="nexus-form-group">
              <label className="nexus-form-label">
                Location <span className="nexus-required">*</span>
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="nexus-form-input"
                placeholder="Venue or online location"
                required
              />
            </div>
          </>
        )}
      </div>

      <div className="nexus-form-actions">
        <button
          className="nexus-btn nexus-btn--primary"
          type="submit"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <span className="nexus-btn-spinner"></span>
              Creating...
            </>
          ) : (
            `Create ${form.type === "news" ? "News" : "Event"}`
          )}
        </button>
        <button
          type="button"
          className="nexus-btn nexus-btn--secondary"
          onClick={() =>
            setForm({
              title: "",
              type: "news",
              summary: "",
              content: "",
              date: "",
              event_start: "",
              location: "",
              visibility: "public",
            })
          }
        >
          Clear Form
        </button>
      </div>
    </form>
  );
}
