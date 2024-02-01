$(document).ready(function() {
    var startDateStr = "07/11/2023"; 
    var title = "Build Timeline";
    var tagline="Our Construction Journey";
    var tagLineSub="Welcome to our Build Timeline – a simple, informative journey showcasing the progress of our construction project. Explore images, dates, and milestones, providing valuable insights for fellow builders on their own construction journeys. Follow along and gain inspiration from our ongoing construction adventure";

// Update the text of the h1 and h2 elements
document.getElementById("timeline-title").textContent = title;
document.getElementById("timeline-date").textContent = "Showing events from " + startDateStr;
document.getElementById("tagline").textContent = tagline;

document.getElementById("tagline-sub").textContent = tagLineSub;

    var timelineData = [
        {
            "date": "01/01/2024",
            "description": "Slab poured",
            "comments": "This is where the foundation was set.",
            "images": ["assets/roof/roof1.jpg", "https://fastly.picsum.photos/id/418/200/300.jpg?hmac=T7cC_OCVJnIk98mcvhuKBWancCeGl2KcyuSBTCYE-QM"]
        },
        {
            "date": "18/01/2024",
            "description": "Frame stage started",
            "comments": "This is frame was set.",
            "images": ["https://placehold.co/600x400/000000/GGG", "https://fastly.picsum.photos/id/418/200/300.jpg?hmac=T7cC_OCVJnIk98mcvhuKBWancCeGl2KcyuSBTCYE-QM"]
        }
        // Add more events as needed
    ];

    function createImageGallery(event, index) {
        var galleryHtml = `<div class="gallery-container" id="gallery-${index}">`;
        event.images.forEach(function(image, imgIndex) {
            galleryHtml += `<div class="gallery-slide ${imgIndex === 0 ? 'active' : ''}" style="background-image: url('${image}');"></div>`;
        });
        galleryHtml += `
            <button class="gallery-prev" onclick="changeSlide(-1, ${index})">❮</button>
            <button class="gallery-next" onclick="changeSlide(1, ${index})">❯</button>
        </div>`;
        return galleryHtml;
    }

    function convertDateToISO(dateStr) {
        const parts = dateStr.split('/');
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      
      function calculateDaysSince(startDateStr, eventDateStr) {
        const formattedStartDateStr = convertDateToISO(startDateStr);
        const formattedEventDateStr = convertDateToISO(eventDateStr);
      
        const startDate = new Date(formattedStartDateStr);
        const eventDate = new Date(formattedEventDateStr);
        const timeDiff = eventDate - startDate;
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysDiff;
      }
      

      function displayTimelineEvents(data) {
      
        var timelineHtml = '';
        data.forEach(function(event, index) {
          const daysSinceStart = calculateDaysSince(startDateStr, event.date);
      
          timelineHtml += `<div class="max-w-xl w-full mx-auto bg-white p-5 rounded-lg shadow-md mb-8">`;
          timelineHtml += `<div class="text-lg font-bold">${event.date} (${daysSinceStart} days since site start)</div>`;
          timelineHtml += `<p class="text-gray-700 my-2">${event.description}</p>`;
          timelineHtml += `<p class="text-gray-600">${event.comments}</p>`;
          timelineHtml += createImageGallery(event, index);
          timelineHtml += `</div>`;
        });
      
        $('#events').html(timelineHtml);
      }
      

    $('#viewTimelineBtn').click(function() {
        $('#welcomeScreen').hide();
        $('#loader').show();

        // Fake loading delay
        setTimeout(function() {
            $('#loader').hide();
            $('#timeline').removeClass('hidden');
        }, 500); // Adjust the time as needed (3000 ms = 3 seconds)
    });

    window.changeSlide = function(move, galleryIndex) {
        var gallery = document.getElementById('gallery-' + galleryIndex);
        var slides = gallery.getElementsByClassName('gallery-slide');
        var activeSlide = gallery.querySelector('.gallery-slide.active');
        var currentIndex = Array.prototype.indexOf.call(slides, activeSlide);
        var nextIndex = (currentIndex + move + slides.length) % slides.length;
      
        Array.prototype.forEach.call(slides, function(slide) {
            slide.classList.remove('active');
        });
      
        slides[nextIndex].classList.add('active');
    };

    displayTimelineEvents(timelineData);
});
