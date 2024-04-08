// document.addEventListener('DOMContentLoaded', function() {
//     var uploadBtn = document.getElementById('uploadBtn');
//     var pdfFileInput = document.getElementById('pdfFileInput');
//     var pdfPreview = document.getElementById('pdfPreview');
//     var convertBtn = document.getElementById('convertBtn');
//     var conversionResults = document.getElementById('conversionResults');

//     // Trigger file input when the upload button is clicked
//     uploadBtn.addEventListener('click', function() {
//         pdfFileInput.click();
//     });

//     // Handle file input change and display the PDF preview
//     pdfFileInput.addEventListener('change', function() {
//         let file = this.files[0];
//         if (file && file.type === 'application/pdf') {
//             let pdfEmbed = pdfPreview.querySelector('.pdf-preview-embed');
//             pdfEmbed.src = URL.createObjectURL(file);
//             pdfPreview.style.display = 'block';
//             convertBtn.style.display = 'inline-block';
//         } else {
//             alert('Please select a PDF file to upload.');
//         }
//     });

//     // Handle convert button click
//     convertBtn.addEventListener('click', function() {
//         let file = pdfFileInput.files[0];

//         let formData = new FormData();
//         formData.append('pdf', file);

//         fetch('/convert-pdf', {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => response.json())
//         .then(data => {
//             conversionResults.innerHTML = `
//                 <a href="${data.csvUrl}" class="btn primary-button" download="converted.csv">Download CSV</a>
//                 <a href="${data.excelUrl}" class="btn primary-button" download="converted.xlsx">Download Excel</a>
//             `;
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     });

//     // Function to render the PDF using pdf.js
//     function renderPDF(url, container) {
//         pdfjsLib.getDocument(url).promise.then(function(pdfDoc) {
//             pdfDoc.getPage(1).then(function(page) {
//                 var viewport = page.getViewport({ scale: 1 });
//                 var canvas = document.createElement('canvas');
//                 var ctx = canvas.getContext('2d');
//                 canvas.height = viewport.height;
//                 canvas.width = viewport.width;

//                 var renderTask = page.render({ canvasContext: ctx, viewport: viewport });
//                 renderTask.promise.then(function() {
//                     container.appendChild(canvas);
//                 });
//             });
//         }).catch(function(error) {
//             console.error('Error: ', error);
//         });
//     }

//     // Optionally, call the renderPDF function if you need to render a PDF on page load
//     // renderPDF('path-to-your-pdf', pdfPreview);
// });
var uploadBtn = document.getElementById('uploadBtn');
const pdfUpload = document.getElementById('pdfUpload');
const convertBtn = document.getElementById('convertBtn');
const downloadSendSection = document.getElementById('downloadSendSection');
const filterSection = document.getElementById('filterSection');
const aiFilterInput = document.getElementById('aiFilterInput');
const filterBtn = document.getElementById('filterBtn');
const filteredResultsSection = document.getElementById('filteredResultsSection');
const csvTable = document.getElementById('csvTable');

// Trigger file input when the upload button is clicked
    uploadBtn.addEventListener('click', function() {
        pdfUpload.click();
    });

pdfUpload.addEventListener('change', function () {
    if (this.files && this.files[0]) {
        // PDF preview logic goes here (e.g., using FileReader API)
        let reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('pdfPreview').innerHTML = '<embed src="' + e.target.result + '" width="100%" height="400px" type="application/pdf" />';
        };
        reader.readAsDataURL(this.files[0]);

        // Enable the convert button
        convertBtn.disabled = false;
    }
});

convertBtn.addEventListener('click', function () {
    // Backend interaction for PDF conversion
    const file = pdfUpload.files[0];
    const formData = new FormData();
    formData.append('pdfFile', file);

    // Send the PDF file to the backend for conversion
    fetch('backend_url/convert', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                // Backend responds with CSV file
                return response.text();
            }
            throw new Error('Network response was not ok.');
        })
        .then(csvData => {
            // Convert CSV data to HTML table
            const rows = csvData.split('\n');
            let tableHTML = '<table class="table table-bordered">';
            rows.forEach(row => {
                tableHTML += '<tr>';
                row.split(',').forEach(cell => {
                    tableHTML += `<td>${cell}</td>`;
                });
                tableHTML += '</tr>';
            });
            tableHTML += '</table>';

            // Display the HTML table
            csvTable.innerHTML = tableHTML;
            csvTable.classList.remove('d-none');

            // Enable filter input and button
            aiFilterInput.disabled = false;
            filterBtn.disabled = false;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    // Show the download/send section
    downloadSendSection.classList.remove('d-none');

    // Disable the convert button after conversion
    this.disabled = true;
});

// Handle download CSV button click
document.getElementById('downloadCSVBtn').addEventListener('click', function () {
    // Backend interaction to download CSV should happen here
    // For now, we simulate the download process
    alert('Downloading CSV...');
});

filterBtn.addEventListener('click', function () {
    // Backend interaction for filter generation
    const filterValue = aiFilterInput.value;

    // Send the filter value to the backend
    fetch('backend_url/filter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filter: filterValue })
    })
        .then(response => {
            if (response.ok) {
                // Backend responds with filtered CSV file
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        })
        .then(blob => {
            // Create a temporary URL for the filtered CSV blob
            const url = window.URL.createObjectURL(blob);

            // Trigger download of the filtered CSV file
            const a = document.createElement('a');
            a.href = url;
            a.download = 'filtered_result.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

// Remember to include Bootstrap JS if you want to use any of its JS-based components