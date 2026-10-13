const API_URL = "http://localhost:5000/api/internships";

const internshipForm = document.getElementById("internshipForm");
const internshipList = document.getElementById("internshipList");
const searchInput = document.getElementById("searchInput");

let internships = [];

// ===============================
// LOAD INTERNSHIPS
// ===============================
async function loadInternships() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to load internships");
    }

    internships = await response.json();

    displayInternships(internships);
  } catch (error) {
    console.error(error);
    internshipList.innerHTML = `
      <p class="error">
        Unable to load internships. Make sure the backend server is running.
      </p>
    `;
  }
}

// ===============================
// DISPLAY INTERNSHIPS
// ===============================
function displayInternships(data) {
  if (data.length === 0) {
    internshipList.innerHTML = `
      <p>No internships found.</p>
    `;
    return;
  }

  internshipList.innerHTML = data
    .map((internship) => {
      return `
        <div class="internship-card">

          <h3>${internship.company}</h3>

          <p>
            <strong>Role:</strong>
            ${internship.role}
          </p>

          <p>
            <strong>Location:</strong>
            ${internship.location}
          </p>

          <p>
            <strong>Status:</strong>
            ${internship.status}
          </p>

          <p>
            <strong>Application Date:</strong>
            ${formatDate(internship.applicationDate)}
          </p>

          <div class="card-buttons">
            <button onclick="editInternship('${internship._id}')">
              Edit
            </button>

            <button onclick="deleteInternship('${internship._id}')">
              Delete
            </button>
          </div>

        </div>
      `;
    })
    .join("");
}

// ===============================
// ADD INTERNSHIP
// ===============================
if (internshipForm) {
  internshipForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const company = document.getElementById("company").value.trim();
    const role = document.getElementById("role").value.trim();
    const location = document.getElementById("location").value.trim();
    const status = document.getElementById("status").value;
    const applicationDate =
      document.getElementById("applicationDate").value;

    if (
      !company ||
      !role ||
      !location ||
      !status ||
      !applicationDate
    ) {
      alert("Please fill all fields.");
      return;
    }

    const internshipData = {
      company,
      role,
      location,
      status,
      applicationDate
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(internshipData)
      });

      if (!response.ok) {
        throw new Error("Failed to create internship");
      }

      alert("Internship added successfully!");

      internshipForm.reset();

      await loadInternships();
    } catch (error) {
      console.error(error);

      alert("Failed to add internship.");
    }
  });
}

// ===============================
// DELETE INTERNSHIP
// ===============================
async function deleteInternship(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this internship?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Failed to delete internship");
    }

    alert("Internship deleted successfully!");

    await loadInternships();
  } catch (error) {
    console.error(error);

    alert("Failed to delete internship.");
  }
}

// ===============================
// EDIT INTERNSHIP
// ===============================
async function editInternship(id) {
  const internship = internships.find(
    (item) => item._id === id
  );

  if (!internship) {
    return;
  }

  const company = prompt(
    "Enter company name:",
    internship.company
  );

  if (company === null) {
    return;
  }

  const role = prompt(
    "Enter internship role:",
    internship.role
  );

  if (role === null) {
    return;
  }

  const location = prompt(
    "Enter location:",
    internship.location
  );

  if (location === null) {
    return;
  }

  const status = prompt(
    "Enter status:",
    internship.status
  );

  if (status === null) {
    return;
  }

  const updatedData = {
    company: company.trim(),
    role: role.trim(),
    location: location.trim(),
    status: status.trim(),
    applicationDate: internship.applicationDate
  };

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(updatedData)
    });

    if (!response.ok) {
      throw new Error("Failed to update internship");
    }

    alert("Internship updated successfully!");

    await loadInternships();
  } catch (error) {
    console.error(error);

    alert("Failed to update internship.");
  }
}

// ===============================
// SEARCH INTERNSHIPS
// ===============================
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value
      .toLowerCase()
      .trim();

    const filteredInternships = internships.filter(
      (internship) =>
        internship.company
          .toLowerCase()
          .includes(searchValue) ||

        internship.role
          .toLowerCase()
          .includes(searchValue) ||

        internship.location
          .toLowerCase()
          .includes(searchValue) ||

        internship.status
          .toLowerCase()
          .includes(searchValue)
    );

    displayInternships(filteredInternships);
  });
}

// ===============================
// FORMAT DATE
// ===============================
function formatDate(date) {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleDateString("en-IN");
}

// ===============================
// LOAD DATA WHEN PAGE OPENS
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  loadInternships();
});