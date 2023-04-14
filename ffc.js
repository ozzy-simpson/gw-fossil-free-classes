const profs = [];

fetch(
    "https://raw.githubusercontent.com/ozzy-simpson/gw-fossil-free-classes/master/profs.json"
)
    .then((response) => response.json())
    .then((data) => {
        profs.push(...data.profs);
    });

function addIconToMatchingInstructors() {
    if (!document.querySelector("#searchResultsTable table")) {
        return; // Table not found
    }

    observer.disconnect(); // Stop observing to prevent infinite loop

    const tableRows = document.querySelectorAll(
        "#searchResultsTable table tbody tr"
    );
    tableRows.forEach((row) => {
        const instructorColumn = row.querySelector(
            'td[data-content="Instructor"]'
        );
        if (!instructorColumn) {
            return; // Instructor column not found
        }
        const instructorNames = instructorColumn.querySelectorAll("a")
        instructorNames.forEach((name) => {
            const instructorName = name.innerText;
            if (profs.includes(instructorName)) {
                // Add icon if it doesn't already exist
                if (!name.querySelector('.fff-icon')) {
                    const icon = document.createElement("span");
                    icon.classList.add("fff-icon");

                    name.appendChild(icon);
                }
            }
            else {
                // Remove icon if it exists
                const icon = name.querySelector('.fff-icon');
                if (icon) {
                    icon.remove();
                }
            }
        });
    });

    observer.observe(document.body, { subtree: true, childList: true });
}


const observer = new MutationObserver(addIconToMatchingInstructors);
observer.observe(document.body, { subtree: true, childList: true });

const style = document.createElement("style");
style.textContent = `
    .fff-icon {
        position: relative;
        display: inline-block;
        width: 16px;
        height: 16px;
        margin: 0 3px;
        top: 4px;
        background-image: url('` + chrome.runtime.getURL('fff-icon.png') + `');
        background-size: contain;
        background-repeat: no-repeat;
    }
`;
document.head.appendChild(style);