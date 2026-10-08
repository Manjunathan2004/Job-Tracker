import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useNavigate,
} from "react-router-dom";

import "./App.css";

/* =========================
   ROOM DATA
========================= */

const rooms = [
  {
    id: 1,
    name: "Innovation Room",
    building: "Block A",
    floor: "1st Floor",
    capacity: 8,
    facilities: ["WiFi", "Projector", "AC"],
    available: true,
  },
  {
    id: 2,
    name: "Knowledge Hub",
    building: "Block B",
    floor: "2nd Floor",
    capacity: 12,
    facilities: ["WiFi", "Smart TV", "AC"],
    available: true,
  },
  {
    id: 3,
    name: "Project Room",
    building: "Block C",
    floor: "1st Floor",
    capacity: 6,
    facilities: ["WiFi", "Whiteboard"],
    available: false,
  },
  {
    id: 4,
    name: "Discussion Room",
    building: "Block A",
    floor: "2nd Floor",
    capacity: 10,
    facilities: ["WiFi", "Projector", "Whiteboard"],
    available: true,
  },
  {
    id: 5,
    name: "Research Room",
    building: "Block D",
    floor: "3rd Floor",
    capacity: 15,
    facilities: ["WiFi", "AC", "Projector"],
    available: true,
  },
  {
    id: 6,
    name: "Study Lounge",
    building: "Block E",
    floor: "1st Floor",
    capacity: 20,
    facilities: ["WiFi", "AC", "Charging"],
    available: true,
  },
];

/* =========================
   NAVBAR
========================= */

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">

        <Link to="/" className="logo">
          <div className="logo-icon">📚</div>

          <div>
            <h2>CampusSpace</h2>
            <span>Study Room Booking</span>
          </div>
        </Link>

        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/rooms"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Rooms
          </NavLink>

          <NavLink
            to="/book-room"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Book Room
          </NavLink>

          <NavLink
            to="/my-bookings"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            My Bookings
          </NavLink>
        </div>

      </div>
    </nav>
  );
}

/* =========================
   FOOTER
========================= */

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div>
          <h2>📚 CampusSpace</h2>
          <p>
            A simple and smart study room booking system
            for college students.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <p>Home</p>
          <p>Study Rooms</p>
          <p>Book Room</p>
          <p>My Bookings</p>
        </div>

        <div>
          <h3>Contact</h3>
          <p>📧 campus@college.edu</p>
          <p>📞 +91 98765 43210</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 CampusSpace. All Rights Reserved.
      </div>

    </footer>
  );
}

/* =========================
   HOME PAGE
========================= */

function Home() {
  return (
    <div>

      <section className="hero">

        <div className="hero-container">

          <div className="hero-content">

            <span className="hero-badge">
              🎓 Smart Campus Solution
            </span>

            <h1>
              Find the perfect
              <span> study room</span>
            </h1>

            <p>
              Book comfortable and convenient study spaces
              for group discussions, project work and focused
              learning.
            </p>

            <div className="hero-buttons">

              <Link to="/rooms" className="btn-primary">
                Explore Rooms →
              </Link>

              <Link to="/book-room" className="btn-outline">
                Book a Room
              </Link>

            </div>

          </div>

          <div className="hero-card">

            <div className="hero-building">
              🏫
            </div>

            <h2>Your Campus. Your Space.</h2>

            <p>
              Easy room discovery and booking for students.
            </p>

            <div className="hero-stats">

              <div>
                <strong>6+</strong>
                <span>Rooms</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>Access</span>
              </div>

              <div>
                <strong>Easy</strong>
                <span>Booking</span>
              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="features-section">

        <div className="section-title">
          <span>WHY CAMPUSSPACE?</span>

          <h2>
            Everything you need to study better
          </h2>

          <p>
            Simple tools to find, book and manage your
            campus study rooms.
          </p>
        </div>

        <div className="features-grid">

          <div className="feature-card">
            <div className="feature-icon blue">
              🔎
            </div>

            <h3>Find Rooms</h3>

            <p>
              Quickly search and find a suitable study room
              based on your requirements.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon green">
              📅
            </div>

            <h3>Easy Booking</h3>

            <p>
              Submit your booking request with just a few
              simple details.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon purple">
              📋
            </div>

            <h3>Track Bookings</h3>

            <p>
              View all your submitted reservations in one
              convenient place.
            </p>
          </div>

        </div>

      </section>

      <section className="cta-section">

        <h2>Ready to find your study space?</h2>

        <p>
          Explore available rooms and start your booking.
        </p>

        <Link to="/rooms" className="btn-primary">
          View Available Rooms
        </Link>

      </section>

    </div>
  );
}

/* =========================
   ROOM CARD
========================= */

function RoomCard({ room }) {
  return (
    <div className="room-card">

      <div className="room-header">

        <div>
          <span>{room.building}</span>

          <h2>{room.name}</h2>
        </div>

        <div className="room-icon">
          📚
        </div>

      </div>

      <div className="room-body">

        <p>📍 {room.floor}</p>

        <p>👥 Capacity: {room.capacity} students</p>

        <div className="facility-list">

          {room.facilities.map((facility) => (
            <span key={facility}>
              {facility}
            </span>
          ))}

        </div>

        <div className="room-footer">

          <span
            className={
              room.available
                ? "status available"
                : "status occupied"
            }
          >
            ● {room.available ? "Available" : "Occupied"}
          </span>

          {room.available && (
            <Link
              to="/book-room"
              className="small-button"
            >
              Book Now
            </Link>
          )}

        </div>

      </div>

    </div>
  );
}

/* =========================
   ROOMS PAGE
========================= */

function Rooms() {

  const [search, setSearch] = useState("");
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    setRoomList(rooms);
  }, []);

  const filteredRooms = roomList.filter((room) =>
    room.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    room.building
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page-container">

      <div className="page-heading">

        <span>STUDY SPACES</span>

        <h1>Find a Study Room</h1>

        <p>
          Browse available rooms and choose the perfect
          space for your study session.
        </p>

      </div>

      <div className="search-box">

        <span>🔍</span>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by room name or building..."
        />

      </div>

      <div className="result-count">
        {filteredRooms.length} rooms found
      </div>

      {filteredRooms.length > 0 ? (

        <div className="rooms-grid">

          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
            />
          ))}

        </div>

      ) : (

        <div className="empty-state">
          <div>🔍</div>

          <h2>No rooms found</h2>

          <p>
            Try another room name or building.
          </p>
        </div>

      )}

    </div>
  );
}

/* =========================
   BOOK ROOM PAGE
========================= */

function BookRoom() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    room: "",
    date: "",
    time: "",
    students: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setMessage("");
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const oldBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const newBookings = [
      ...oldBookings,
      {
        ...formData,
        bookingId: Date.now(),
      },
    ];

    localStorage.setItem(
      "bookings",
      JSON.stringify(newBookings)
    );

    setMessage(
      "Booking submitted successfully! 🎉"
    );

    setFormData({
      name: "",
      room: "",
      date: "",
      time: "",
      students: "",
    });

  };

  return (
    <div className="page-container">

      <div className="page-heading center">

        <span>RESERVE YOUR SPACE</span>

        <h1>Book a Study Room</h1>

        <p>
          Fill in the details below to submit your
          booking request.
        </p>

      </div>

      <div className="booking-wrapper">

        <form
          className="booking-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label>Student Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />

          </div>

          <div className="form-group">

            <label>Select Room</label>

            <select
              name="room"
              value={formData.room}
              onChange={handleChange}
              required
            >

              <option value="">
                Select a study room
              </option>

              {rooms
                .filter((room) => room.available)
                .map((room) => (
                  <option
                    key={room.id}
                    value={room.name}
                  >
                    {room.name} - {room.building}
                  </option>
                ))}

            </select>

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>Booking Date</label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-group">

              <label>Booking Time</label>

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <div className="form-group">

            <label>Number of Students</label>

            <input
              type="number"
              name="students"
              value={formData.students}
              onChange={handleChange}
              placeholder="Enter number of students"
              min="1"
              required
            />

          </div>

          <button
            type="submit"
            className="submit-button"
          >
            Confirm Booking →
          </button>

          {message && (
            <div className="success-message">
              {message}

              <button
                type="button"
                onClick={() => navigate("/my-bookings")}
              >
                View My Bookings
              </button>
            </div>
          )}

        </form>

      </div>

    </div>
  );
}

/* =========================
   BOOKING CARD
========================= */

function BookingCard({ booking }) {

  return (
    <div className="booking-card">

      <div className="booking-card-top">

        <div>
          <h2>{booking.room}</h2>

          <p>
            Study Room Reservation
          </p>
        </div>

        <span>
          Confirmed
        </span>

      </div>

      <div className="booking-details">

        <p>
          👤 <strong>Student:</strong>{" "}
          {booking.name}
        </p>

        <p>
          📅 <strong>Date:</strong>{" "}
          {booking.date}
        </p>

        <p>
          🕐 <strong>Time:</strong>{" "}
          {booking.time}
        </p>

        <p>
          👥 <strong>Students:</strong>{" "}
          {booking.students}
        </p>

      </div>

    </div>
  );
}

/* =========================
   MY BOOKINGS PAGE
========================= */

function MyBookings() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    const savedBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    setBookings(savedBookings);

  }, []);

  return (
    <div className="page-container">

      <div className="page-heading">

        <span>RESERVATIONS</span>

        <h1>My Bookings</h1>

        <p>
          View your submitted study room reservations.
        </p>

      </div>

      {bookings.length === 0 ? (

        <div className="empty-state">

          <div>📅</div>

          <h2>No bookings yet</h2>

          <p>
            You haven't booked a study room yet.
          </p>

          <Link
            to="/rooms"
            className="small-button"
          >
            Explore Rooms
          </Link>

        </div>

      ) : (

        <div className="bookings-grid">

          {bookings.map((booking) => (
            <BookingCard
              key={booking.bookingId}
              booking={booking}
            />
          ))}

        </div>

      )}

    </div>
  );
}

/* =========================
   APP
========================= */

function App() {

  return (
    <BrowserRouter>

      <div className="app">

        <Navbar />

        <main>
          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/rooms"
              element={<Rooms />}
            />

            <Route
              path="/book-room"
              element={<BookRoom />}
            />

            <Route
              path="/my-bookings"
              element={<MyBookings />}
            />

          </Routes>
        </main>

        <Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;