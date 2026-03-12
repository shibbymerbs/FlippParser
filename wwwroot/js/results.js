// Pagination settings
const pageSize = 10;
let currentPage = 1;
let filteredRows = [];
let filteredCards = [];
let isCardView = false;
let sortDirection = {};

function sortTable(n) {
    const table = document.getElementById("resultsTable");
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.rows);
    let dir = sortDirection[n] === "desc" ? "asc" : "desc";
    sortDirection[n] = dir;
    rows.sort((a, b) => {
        let x = a.cells[n].textContent.trim();
        let y = b.cells[n].textContent.trim();
        let xNum = parseFloat(x.replace(/[^0-9.\-]/g, ""));
        let yNum = parseFloat(y.replace(/[^0-9.\-]/g, ""));
        let isNumeric = !isNaN(xNum) && !isNaN(yNum);
        if (isNumeric) {
            return dir === "asc" ? xNum - yNum : yNum - xNum;
        } else {
            return dir === "asc" ? x.localeCompare(y) : y.localeCompare(x);
        }
    });
    rows.forEach(row => tbody.appendChild(row));
    updatePagination();
}

function filterTable() {
    currentPage = 1;
    updatePagination();
}

function updatePagination() {
    if (isCardView) {
        const cards = Array.from(document.getElementsByClassName("cardViewItem"));
        const input = document.getElementById("filterInput");
        const filter = input ? input.value.toLowerCase() : "";
        filteredCards = cards.filter(card => card.textContent.toLowerCase().indexOf(filter) > -1);
        cards.forEach(card => card.style.display = "none");
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        filteredCards.slice(start, end).forEach(card => card.style.display = "");
        renderPaginationControls(filteredCards.length);
    } else {
        const table = document.getElementById("resultsTable");
        const tbody = table.tBodies[0];
        const input = document.getElementById("filterInput");
        const filter = input ? input.value.toLowerCase() : "";
        const allRows = Array.from(tbody.rows);
        filteredRows = allRows.filter(row => row.textContent.toLowerCase().indexOf(filter) > -1);
        allRows.forEach(row => row.style.display = "none");
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        filteredRows.slice(start, end).forEach(row => row.style.display = "");
        renderPaginationControls(filteredRows.length);
    }
}

function renderPaginationControls(totalItems) {
    const controlsList = document.getElementsByClassName("paginationControls");
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    let html = '';
    if (totalPages > 1) {
        html += `<button class='btn btn-sm btn-secondary' onclick='gotoPage(1)' ${currentPage === 1 ? "disabled" : ""}>&laquo; First</button> `;
        html += `<button class='btn btn-sm btn-secondary' onclick='gotoPage(${currentPage - 1})' ${currentPage === 1 ? "disabled" : ""}>&lsaquo; Prev</button> `;
        html += ` Page ${currentPage} of ${totalPages} `;
        html += `<button class='btn btn-sm btn-secondary' onclick='gotoPage(${currentPage + 1})' ${currentPage === totalPages ? "disabled" : ""}>Next &rsaquo;</button> `;
        html += `<button class='btn btn-sm btn-secondary' onclick='gotoPage(${totalPages})' ${currentPage === totalPages ? "disabled" : ""}>Last &raquo;</button>`;
    }
    for (let i = 0; i < controlsList.length; i++) {
        controlsList[i].innerHTML = html;
    }
}

function gotoPage(page) {
    let totalPages = 1;
    if (isCardView) {
        totalPages = Math.ceil(filteredCards.length / pageSize) || 1;
    } else {
        totalPages = Math.ceil(filteredRows.length / pageSize) || 1;
    }
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    currentPage = page;
    updatePagination();
    // Scroll to top of table or card grid after page change
    const target = document.getElementsByTagName("nav")[0];
    if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function toggleView() {
    isCardView = !isCardView;
    localStorage.setItem('flipp_isCardView', isCardView ? '1' : '0');
    document.getElementById("tableView").style.display = isCardView ? "none" : "block";
    document.getElementById("cardView").style.display = isCardView ? "flex" : "none";
    const btn = document.getElementById("toggleViewBtn");
    btn.textContent = isCardView ? "Grid View" : "Card View";
    updatePagination();
}

window.addEventListener('DOMContentLoaded', function () {
    // Restore view mode from localStorage
    const stored = localStorage.getItem('flipp_isCardView');
    isCardView = stored === '1';
    document.getElementById("tableView").style.display = isCardView ? "none" : "block";
    document.getElementById("cardView").style.display = isCardView ? "flex" : "none";
    const btn = document.getElementById("toggleViewBtn");
    btn.textContent = isCardView ? "Grid View" : "Card View";
    updatePagination();

    // Restore dark mode preference from localStorage
    const darkModeStored = localStorage.getItem('theme');
    if (darkModeStored === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        document.getElementById('darkModeToggle').checked = true;
        document.getElementById('resultsTable').classList.add('table-dark');
    } else {
        document.getElementById('resultsTable').classList.add('table-light');
    }
});