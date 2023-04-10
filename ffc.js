const profs = [
    "Lowell Abrams",
    "Elisabeth Anker",
    "Eyal Aviv",
    "Nicole Bartels",
    "Tonya Beckman",
    "Lisa Benton-Short",
    "Emily Bock",
    "Steven Brady",
    "Thea Brown",
    "Janice Butler",
    "Caitlin Chazen",
    "Theodore Christov",
    "Jamie Cohen-Cole",
    "Megan Davis",
    "David DeGrazia",
    "Hartmut Doebel",
    "Julie Donovan",
    "Stephen Dopkins",
    "Eric Dunn",
    "Wade Fletcher",
    "Andrew Gretes",
    "Thomas Guglielmo",
    "Hope Harrison",
    "Nicole Ivy",
    "Carly Jordan",
    "Cory Jorgensen",
    "Moses Kansanga",
    "David Karpf",
    "Melissa Keeley",
    "Michelle Kelso",
    "Ivy Ken",
    "Subrata Kundu",
    "Peter LaPuma",
    "John Lill",
    "Steven Livingston",
    "Aman Luthra",
    "Cole Malloy",
    "Michael Mann",
    "Gordon Mantler",
    "John Manubay",
    "Giuseppina Mattietti-Kysar",
    "Cynthia McClintock",
    "Shawn McHale",
    "Robert McRuer",
    "Ludmila Michael",
    "Barbara Miller",
    "Maria del Carmen Montoya",
    "Thiago Moreira",
    "Danika Myers",
    "Guillermo Orti",
    "Robert Orttung",
    "Laura Papish",
    "Scott Powell",
    "Pamela Presser",
    "Lucia Rafanelli",
    "Mark Ralkowski",
    "Phyllis Ryder",
    "Eric Saidel",
    "Tara Scully",
    "Katrin Schultheiss",
    "Jonathan Shea",
    "Mina Simhai",
    "Michael Svoboda",
    "Andrew Thompson",
    "Dr. Richard Tollo",
    "Joseph Trullinger",
    "William Winstead",
    "Nicola Wolfe",
    "Zachary Wolfe",
    "Erica Wortham",
    "William Youmans",
    "Tadeusz Zawidzki",
    "Angela Zimmerman",
];

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
// const observer = new MutationObserver(highlightMatchingRows);
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