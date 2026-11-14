function updateLowAttendance() {
    const rows = document.querySelectorAll("#attendanceList tr");
    const students = {};

    rows.forEach(row => {
        const regNo = row.cells[1].textContent.trim();
        const name = row.cells[0].textContent.trim();
        const status = row.querySelector("span").textContent.trim();

        if (!students[regNo]) {
            students[regNo] = {
                name: name,
                present: 0,
                absent: 0
            };
        }

        if (status === "Present") {
            students[regNo].present++;
        } else if (status === "Absent") {
            students[regNo].absent++;
        }
    });

    const lowAttendance = [];

    Object.values(students).forEach(student => {
        const total = student.present + student.absent;

        if (total > 0) {
            const percentage = (student.present / total) * 100;

            if (percentage < 75) {
                lowAttendance.push(
                    student.name + " (" + percentage.toFixed(1) + "%)"
                );
            }
        }
    });

    const alertBox = document.getElementById("attendanceAlert");

    if (lowAttendance.length > 0) {
        alertBox.style.display = "block";
        alertBox.textContent =
            "Low Attendance Warning: " + lowAttendance.join(", ");
    } else {
        alertBox.style.display = "none";
    }
}
function updateDashboard() {

    const rows = document.querySelectorAll("#attendanceList tr");

    let total = rows.length;
    let present = 0;
    let absent = 0;

    rows.forEach(row => {
        const status = row.querySelector("span").textContent;

        if (status === "Present") {
            present++;
        } else if (status === "Absent") {
            absent++;
        }
    });

    let marked = present + absent;

    let percentage = marked === 0 ? 0 : (present / marked) * 100;

    document.getElementById("totalStudents").textContent = total;
    document.getElementById("presentCount").textContent = present;
    document.getElementById("absentCount").textContent = absent;
    document.getElementById("attendancePercentage").textContent =
        percentage.toFixed(1) + "%";
        updateLowAttendance();
}
const form = document.getElementById("attendanceForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("studentName").value;
    const regNo = document.getElementById("regNo").value;
    const department = document.getElementById("department").value;
    const date = document.getElementById("date").value;

    const table = document.getElementById("attendanceList");
    const existingRows = document.querySelectorAll("#attendanceList tr");

for (let i = 0; i < existingRows.length; i++) {

    const existingRegNo = existingRows[i].cells[1].textContent;
    const existingDate = existingRows[i].cells[3].textContent;

    if (existingRegNo === regNo && existingDate === date) {
        alert("Attendance already added for this student on this date!");
        return;
    }
}
    const row = document.createElement("tr");

    const values = [name, regNo, department, date];

values.forEach(value => {
    const cell = document.createElement("td");
    cell.textContent = value;
    row.appendChild(cell);
});

const statusCell = document.createElement("td");

const statusText = document.createElement("span");
statusText.textContent = "Not Marked";

const presentBtn = document.createElement("button");
presentBtn.textContent = "Present";
presentBtn.onclick = function() {
    statusText.textContent = "Present";
    updateDashboard();
};

const absentBtn = document.createElement("button");
absentBtn.textContent = "Absent";
absentBtn.onclick = function() {
    statusText.textContent = "Absent";
    updateDashboard();
};

statusCell.appendChild(statusText);
statusCell.appendChild(document.createElement("br"));
statusCell.appendChild(presentBtn);
statusCell.appendChild(absentBtn);

row.appendChild(statusCell);
// Edit Button
const editBtn = document.createElement("button");
editBtn.textContent = "Edit";

editBtn.onclick = function() {

    document.getElementById("studentName").value = row.cells[0].textContent;
    document.getElementById("regNo").value = row.cells[1].textContent;
    document.getElementById("department").value = row.cells[2].textContent;
    document.getElementById("date").value = row.cells[3].textContent;

    row.remove();
    updateDashboard();

    alert("Edit the details and click Add Student!");
};

row.appendChild(editBtn);
// Delete Button
const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";

deleteBtn.onclick = function() {
    row.remove();
    updateDashboard();
};
row.appendChild(deleteBtn);
    table.appendChild(row);
updateDashboard();
    form.reset();

    alert("Student Added Successfully!");
});
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function() {

    const searchValue = searchInput.value.toLowerCase();

    const rows = document.querySelectorAll("#attendanceList tr");

    rows.forEach(row => {

        const name = row.cells[0].textContent.toLowerCase();
        const regNo = row.cells[1].textContent.toLowerCase();

        if (name.includes(searchValue) || regNo.includes(searchValue)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

});
document.getElementById("logoutBtn").onclick = function() {
    window.location.href = "login.html";
};