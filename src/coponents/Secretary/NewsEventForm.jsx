import React, { useState } from "react";
import "./NewsEventForm.css"
export default function NewsEventForm({ token, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    type: "news",
    summary: "",
    content: "",
    source: "",
    publish_date: "",
    event_start: "",
    event_end: "",
    location: "",
    status: "active",
    tags: "",
    external_link: "",
    visibility: "public",
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success'|'error', text: '' }

  const jwt = token || window.localStorage.getItem("access_token") || "";

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function validate() {
    if (!form.title.trim() || !form.type.trim() || !form.content.trim()) {
      setMessage({ type: "error", text: "Title, type and content are required fields." });
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
      // Build FormData so endpoint accepts form-data or x-www-form-urlencoded from clients
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("type", form.type);
      fd.append("summary", form.summary);
      fd.append("content", form.content);
      if (form.source) fd.append("source", form.source);
      if (form.publish_date) fd.append("publish_date", form.publish_date);
      if (form.event_start) fd.append("event_start", form.event_start);
      if (form.event_end) fd.append("event_end", form.event_end);
      if (form.location) fd.append("location", form.location);
      fd.append("status", form.status);
      if (form.tags) fd.append("tags", form.tags); // server can parse CSV or JSON string
      if (form.external_link) fd.append("external_link", form.external_link);
      fd.append("visibility", form.visibility);

      const res = await fetch("/news-events", {
        method: "POST",
        headers: {
          // IMPORTANT: Do not set Content-Type when using FormData — the browser sets the boundary.
          Authorization: jwt ? `Bearer ${jwt}` : undefined,
          // Accept: 'application/json' // optional
        },
        body: fd,
      });

      const result = await res.json().catch(() => ({}));

      if (res.ok) {
        setMessage({ type: "success", text: result.msg || "Item created successfully." });
        setForm({
          title: "",
          type: "news",
          summary: "",
          content: "",
          source: "",
          publish_date: "",
          event_start: "",
          event_end: "",
          location: "",
          status: "active",
          tags: "",
          external_link: "",
          visibility: "public",
        });
        if (typeof onSuccess === "function") onSuccess(result);
      } else if (res.status === 401) {
        setMessage({ type: "error", text: "Unauthorized — please log in." });
      } else {
        setMessage({ type: "error", text: result.msg || `Error ${res.status}` });
      }
    } catch (err) {
      console.error("Create news/event error:", err);
      setMessage({ type: "error", text: "Network or server error." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="ne-form-container" onSubmit={handleSubmit} noValidate>
      <div className="ne-form-header">
        <h2 className="ne-form-title">Create News / Event</h2>
        <p className="ne-form-subtitle">Fill in the details below to create a new announcement</p>
      </div>

      {message && (
        <div
          className={`ne-form-alert ne-form-alert--${message.type === "success" ? "success" : "error"}`}
          role="status"
        >
          <span className="ne-form-alert-text">{message.text}</span>
        </div>
      )}

      <div className="ne-form-section">
        <h3 className="ne-form-section-title">Basic Information</h3>
        
        <div className="ne-form-grid">
          <div className="ne-form-field">
            <label className="ne-form-label">
              Title <span className="ne-form-required">*</span>
            </label>
            <input
              className="ne-form-input"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter a compelling headline"
              required
            />
          </div>

          <div className="ne-form-field">
            <label className="ne-form-label">
              Type <span className="ne-form-required">*</span>
            </label>
            <select 
              name="type" 
              value={form.type} 
              onChange={handleChange} 
              className="ne-form-select" 
              required
            >
              <option value="news">News</option>
              <option value="event">Event</option>
              <option value="announcement">Announcement</option>
            </select>
          </div>
        </div>

        <div className="ne-form-field">
          <label className="ne-form-label">Summary</label>
          <input
            className="ne-form-input"
            name="summary"
            value={form.summary}
            onChange={handleChange}
            placeholder="Brief summary for preview cards and listings"
          />
          <p className="ne-form-hint">Keep it concise - this will be used in previews and listings</p>
        </div>

        <div className="ne-form-field">
          <label className="ne-form-label">
            Content <span className="ne-form-required">*</span>
          </label>
          <textarea
            className="ne-form-textarea"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Write the full content here..."
            rows={6}
            required
          />
        </div>
      </div>

      <div className="ne-form-section">
        <h3 className="ne-form-section-title">Timing & Location</h3>
        
        <div className="ne-form-grid">
          <div className="ne-form-field">
            <label className="ne-form-label">Source</label>
            <input 
              className="ne-form-input" 
              name="source" 
              value={form.source} 
              onChange={handleChange} 
              placeholder="Original source if applicable"
            />
          </div>

          <div className="ne-form-field">
            <label className="ne-form-label">Publish Date</label>
            <input
              className="ne-form-input"
              type="datetime-local"
              name="publish_date"
              value={form.publish_date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="ne-form-grid">
          <div className="ne-form-field">
            <label className="ne-form-label">Event Start</label>
            <input
              className="ne-form-input"
              type="datetime-local"
              name="event_start"
              value={form.event_start}
              onChange={handleChange}
            />
          </div>

          <div className="ne-form-field">
            <label className="ne-form-label">Event End</label>
            <input
              className="ne-form-input"
              type="datetime-local"
              name="event_end"
              value={form.event_end}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="ne-form-field">
          <label className="ne-form-label">Location</label>
          <input 
            className="ne-form-input" 
            name="location" 
            value={form.location} 
            onChange={handleChange} 
            placeholder="Physical or virtual location"
          />
        </div>
      </div>

      <div className="ne-form-section">
        <h3 className="ne-form-section-title">Settings & Metadata</h3>
        
        <div className="ne-form-grid">
          <div className="ne-form-field">
            <label className="ne-form-label">Status</label>
            <select 
              name="status" 
              value={form.status} 
              onChange={handleChange} 
              className="ne-form-select"
            >
              <option value="active">Active</option>
              <option value="archived">Archived</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="ne-form-field">
            <label className="ne-form-label">Visibility</label>
            <select 
              name="visibility" 
              value={form.visibility} 
              onChange={handleChange} 
              className="ne-form-select"
            >
              <option value="public">Public</option>
              <option value="members">Members</option>
              <option value="internal">Internal</option>
            </select>
          </div>
        </div>

        <div className="ne-form-field">
          <label className="ne-form-label">Tags</label>
          <input 
            className="ne-form-input" 
            name="tags" 
            value={form.tags} 
            onChange={handleChange} 
            placeholder="technology, announcement, conference"
          />
          <p className="ne-form-hint">Separate multiple tags with commas</p>
        </div>

        <div className="ne-form-field">
          <label className="ne-form-label">External Link</label>
          <input 
            className="ne-form-input" 
            name="external_link" 
            value={form.external_link} 
            onChange={handleChange} 
            placeholder="https://example.com"
          />
        </div>
      </div>

      <div className="ne-form-actions">
        <button 
          className="ne-form-btn ne-form-btn--primary" 
          type="submit" 
          disabled={submitting}
        >
          {submitting ? (
            <>
              <span className="ne-form-btn-spinner"></span>
              Creating...
            </>
          ) : (
            "Create Item"
          )}
        </button>
        <button
          type="button"
          className="ne-form-btn ne-form-btn--secondary"
          onClick={() =>
            setForm({
              title: "",
              type: "news",
              summary: "",
              content: "",
              source: "",
              publish_date: "",
              event_start: "",
              event_end: "",
              location: "",
              status: "active",
              tags: "",
              external_link: "",
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