//index-equipment details hide detail and show detail

document.addEventListener('DOMContentLoaded', () => {
  filterSelection('all'); // Show all items by default
});

function filterSelection(category) {
  let boxes = document.getElementsByClassName('box');
  let detail = document.getElementById('equipmentDetail');
  let detailBoxes = detail.getElementsByClassName('box');

  // Hide all boxes initially
  for (let i = 0; i < boxes.length; i++) {
      boxes[i].style.display = 'none';
  }

  // Hide all details initially
  for (let i = 0; i < detailBoxes.length; i++) {
      detailBoxes[i].style.display = 'none';
  }

  if (category === 'all') {
      for (let i = 0; i < boxes.length; i++) {
          boxes[i].style.display = 'block';
      }
      detail.style.display = 'none'; // Hide detail for "all"
  } else {
      for (let i = 0; i < boxes.length; i++) {
          if (boxes[i].classList.contains(category)) {
              boxes[i].style.display = 'block'; // Show the boxes that match the category
          }
      }

      // Show detail for the selected category
      detail.style.display = 'block';
      for (let i = 0; i < detailBoxes.length; i++) {
          if (detailBoxes[i].classList.contains(category)) {
              detailBoxes[i].style.display = 'block';
          }
      }
  }
}

// ================================================================
// Replace with your actual data download link
const downloadLink = "https://example.com/data-file.csv"; 

document.getElementById("downloadBtn").addEventListener("click", function() {
    const a = document.createElement("a");
    a.href = downloadLink;
    a.download = "SurveyData.csv";  // Suggested filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
