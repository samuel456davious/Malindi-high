// 🔧 PATCHED VERSION

import React, { useState, useEffect, useCallback, useContext } from "react";
import { ThemeContext } from "../../Authentication/ThemeContext";
import API from "../../Authentication/api";
import "./NewsEventForm.css";

export default function NewsEventForm({ token, onSuccess }) {
  const { isDark } = useContext(ThemeContext);

  const [form, setForm] = useState({
    title: "",
    type: "news",
    summary: "",
    content: "",
    date: "",
    event_start: "",
    location: "",
    visibility: "public",
  });

  const [newsList, setNewsList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);

  const jwt =
    token || window.localStorage.getItem("access_token") || "";

  // ⬇️ FETCH NEWS & EVENTS
  const fetchNewsAndEvents = useCallback(async () => {
    try {
      setLoading(true);
      setMessage(null);

      const [newsRes, eventsRes] = await Promise.all([
        fetch(
          `https://malindihigh.pythonanywhere.com/get_news?limit=${limit}`
        ),
        fetch(
          `https://malindihigh.pythonanywhere.com/get_events?limit=${limit}`
        ),
      ]);

      if (!newsRes.ok || !eventsRes.ok) {
        throw new Error("Failed to fetch news/events");
      }

      const [newsData, eventsData] = await Promise.all([
        newsRes.json(),
        eventsRes.json(),
      ]);

      const formattedNews = newsData.map((n) => ({
        id: n.id,
        title: n.title,
        date: n.date,
        type: "News",
      }));

      const formattedEvents = eventsData.map((e) => ({
        id: e.id,
        title: e.name,
        date: e.date,
        type: "Event",
      }));

      const merged = [...formattedNews, ...formattedEvents].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setNewsList(merged);
    } catch (err) {
      console.error("Error loading news/events:", err);
      setMessage({
        type: "error",
        text: "Failed to load news and events.",
      });
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchNewsAndEvents();
  }, [fetchNewsAndEvents]);

  // ⬇️ INPUT HANDLER
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // ⬇️ VALIDATION
  function validate() {
    if (!form.title.trim() || !form.summary.trim() || !form.content.trim()) {
      setMessage({
        type: "error",
        text: "Title, Summary and Content are required.",
      });
      return false;
    }

    if (form.type === "news" && !form.date) {
      setMessage({
        type: "error",
        text: "Please select a publication date.",
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

    return true;
  }

  // ⬇️ SUBMIT HANDLER
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
              date: form.event_start.split("T")[0],
              location: form.location,
              description: form.content,
              visibility: form.visibility,
            }
          : {
              title: form.title,
              summary: form.summary,
              content: form.content,
              date: form.date,
              visibility: form.visibility,
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

      fetchNewsAndEvents();

      if (typeof onSuccess === "function") onSuccess(res.data);
    } catch (err) {
      console.error("Create error:", err.response?.data || err.message);
      const errMsg =
        err.response?.data?.error ||
        err.response?.data?.msg ||
        "Server error.";
      setMessage({ type: "error", text: errMsg });
    } finally {
      setSubmitting(false);
    }
  }

  // ⬇️ **PATCHED DELETE FUNCTION**
  const handleDeleteNews = async (idToDelete, type) => {
    if (!idToDelete) {
      setMessage({ type: "error", text: "No ID provided." });
      return;
    }

    setMessage({
      type: "error",
      text: `Deleting item with ID: ${idToDelete}`,
    });

    try {
      const endpoint = type === "News" ? "/news" : "/event";

      await API.delete(`${endpoint}/${idToDelete}`, {
        headers: {
          Authorization: jwt ? `Bearer ${jwt}` : undefined,
        },
      });

      // ⬇️ FILTER OUT CORRECTLY USING TYPE + ID
      setNewsList((prev) =>
        prev.filter(
          (item) =>
            !(item.id === idToDelete && item.type === type)
        )
      );

      setMessage({ type: "success", text: "Item deleted successfully." });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete item." });
    }
  };

  // LOAD MORE
  const handleLoadMore = () => {
    setLimit((prev) => prev + 10);
  };

  return (
    <div
      className={`news-event-manager ${
        isDark ? "news-event-manager--dark" : "news-event-manager--light"
      }`}
    >
      {/* ----------------- FORM SECTION ----------------- */}
      <div className="news-event-manager__form-section">
        <form className="news-event-form" onSubmit={handleSubmit} noValidate>
          <div className="news-event-form__header">
            <h2 className="news-event-form__title">
              {form.type === "news" ? "Create News Article" : "Create Event"}
            </h2>
            <p className="news-event-form__subtitle">
              Fill in the details below to create a new{" "}
              {form.type === "news" ? "news article" : "event"} for your organization.
            </p>
          </div>

          {message && (
            <div
              className={`news-event-form__alert news-event-form__alert--${message.type}`}
            >
              <span className="news-event-form__alert-icon">
                {message.type === "success" ? "✓" : "!"}
              </span>
              {message.text}
            </div>
          )}

          <div className="news-event-form__grid">
            {/* Type Selector */}
            <div className="news-event-form__group">
              <label className="news-event-form__label">Content Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="news-event-form__select"
              >
                <option value="news">News Article</option>
                <option value="event">Event</option>
              </select>
            </div>

            {/* Visibility Selector */}
            <div className="news-event-form__group">
              <label className="news-event-form__label">
                Visibility <span className="news-event-form__required">*</span>
              </label>
              <select
                name="visibility"
                value={form.visibility}
                onChange={handleChange}
                className="news-event-form__select"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {/* Shared Fields */}
            <div className="news-event-form__group">
              <label className="news-event-form__label">
                Title <span className="news-event-form__required">*</span>
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="news-event-form__input"
                placeholder="Enter a compelling title"
                required
              />
            </div>

            <div className="news-event-form__group">
              <label className="news-event-form__label">
                Summary <span className="news-event-form__required">*</span>
              </label>
              <input
                name="summary"
                value={form.summary}
                onChange={handleChange}
                className="news-event-form__input"
                placeholder="Brief overview or teaser"
                required
              />
            </div>

            <div className="news-event-form__group news-event-form__group--full">
              <label className="news-event-form__label">
                Content <span className="news-event-form__required">*</span>
              </label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                className="news-event-form__textarea"
                rows={6}
                placeholder="Write detailed content here..."
                required
              />
            </div>

            {/* Conditional Fields */}
            {form.type === "news" && (
              <div className="news-event-form__group">
                <label className="news-event-form__label">
                  Publication Date <span className="news-event-form__required">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="news-event-form__input"
                  required
                />
              </div>
            )}

            {form.type === "event" && (
              <>
                <div className="news-event-form__group">
                  <label className="news-event-form__label">
                    Event Start <span className="news-event-form__required">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="event_start"
                    value={form.event_start}
                    onChange={handleChange}
                    className="news-event-form__input"
                    required
                  />
                </div>

                <div className="news-event-form__group">
                  <label className="news-event-form__label">
                    Location <span className="news-event-form__required">*</span>
                  </label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="news-event-form__input"
                    placeholder="Venue or online location"
                    required
                  />
                </div>
              </>
            )}
          </div>

          <div className="news-event-form__actions">
            <button
              className="news-event-form__btn news-event-form__btn--primary"
              type="submit"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="news-event-form__btn-spinner"></span>
                  Creating...
                </>
              ) : (
                `Create ${form.type === "news" ? "News" : "Event"}`
              )}
            </button>
            <button
              type="button"
              className="news-event-form__btn news-event-form__btn--secondary"
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
      </div>


      {/* ----------------- LIST SECTION ----------------- */}
      <div className="news-event-manager__list-section">
        <div className="news-event-list">
          <div className="news-event-list__header">
            <h2 className="news-event-list__title">
              Latest News & Events
            </h2>
            <button
              className="news-event-list__refresh-btn"
              onClick={fetchNewsAndEvents}
              disabled={loading}
            >
              🔄 Refresh
            </button>
          </div>

          <div className="news-event-list__content">
            {loading ? (
              <div className="news-event-list__loading">
                <div className="news-event-list__loading-spinner"></div>
                Loading...
              </div>
            ) : newsList.length === 0 ? (
              <div className="news-event-list__empty">No announcements.</div>
            ) : (
              <div className="news-event-list__items">
                {newsList.map((item) => (
                  <div
                    key={`${item.type}-${item.id}`} // ⭐ PATCHED UNIQUE KEY
                    className="news-event-list__item"
                  >
                    <div className="news-event-list__item-icon">
                      {item.type === "News" ? "📰" : "🎉"}
                    </div>
                    <div className="news-event-list__item-content">
                      <h3>{item.title}</h3>
                      <p>
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                      <span>{item.type}</span>
                    </div>

                    <button
                      className="news-event-list__delete-btn"
                      onClick={() =>
                        handleDeleteNews(item.id, item.type)
                      }
                    >
                      🗑️ Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {!loading && newsList.length >= limit && (
            <button
              className="news-event-list__load-more"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
