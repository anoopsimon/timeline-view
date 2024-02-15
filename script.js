$(document).ready(function () {
    var startDateStr = "31/10/2023";
    var title = "Build Timeline";
    var tagline = "Our Construction Journey";
    var additional ="Henley - Valletta 48 - Novello Facade - Location Melbourne";
    var tagLineSub = "Welcome to our Build Timeline – a simple, informative journey showcasing the progress of our construction project. Explore images, dates, and milestones, providing valuable insights for fellow builders on their own construction journeys. Follow along and gain inspiration from our ongoing construction adventure";

    var timelineData = [
        {
            "date": "01/11/2023",
            "description": "Lot Cleanup",
            "tag":"#cleanup",
            "comments": "This is where the foundation was set.",
            "images": [
                "assets/lotcleanup/1.jpg",
                "assets/lotcleanup/2.jpg",

            ]
        },
        {
            "date": "05/11/2023",
            "description": "Site Started",
            "tag":"#sitestart",
            "comments": "This is frame was set.",
            "images": [
                "assets/pre-slab/1.jpg",
                "assets/pre-slab/2.jpg"
            ]
        }
        ,
        {
            "date": "16/11/2023",
            "description": "Pre-Slab Inspection",
            "tag":"#slab-inspection",
            "comments": "We've appointed an independent building inspector - NHI",
            "images": [
                "assets/pre-slab/3.png",
            ]
        },
        {
            "date": "17/11/2023",
            "description": "Slab Pour",
            "tag":"#slab",
            "comments": "We've appointed an independent building inspector - NHI",
            "images": [
                "assets/slab/1.jpg",
                "assets/slab/2.jpg",
                "assets/slab/3.jpg"
            ]
        },
        {
            "date": "02/12/2023",
            "description": "Frame Stage",
            "tag":"#frame",
            "comments": "Frame work started on 12 Dec ",
            "images": [
                "assets/frame/1.jpg",
                "assets/frame/2.jpg",
                "assets/frame/3.jpg"
            ]
        },
        {
            "date": "07/02/2024",
            "description": "Rough Ins",
            "tag":"#roughin",
            "comments": "Rough in started",
            "images": [
                "assets/rough/1.jpg",
                "assets/rough/2.jpg",
                "assets/rough/3.jpg",
                "assets/rough/4.jpg",
                "assets/rough/5.jpg",
            ]
        },
        {
            "date": "11/02/2024",
            "description": "Wrapping",
            "tag":"#wrapping",
            "comments": "Frame work started on 12 Dec ",
            "images": [
                "assets/wrapping/1.jpg",
                "assets/wrapping/2.jpg",
               
            ]
        }
    ];

    // Update the text of the h1 and h2 elements
    document.getElementById("timeline-title").textContent = title;
    document.getElementById("timeline-date").textContent = "Showing events from " + startDateStr;
    document.getElementById("timeline-additional").textContent = additional;

    document.getElementById("tagline").textContent = tagline;

    document.getElementById("tagline-sub").textContent = tagLineSub;

    function createImageGallery(event, index) {
        var galleryHtml = `<div class="gallery-container" id="gallery-${index}">`;
        event.images.forEach(function (image, imgIndex) {
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
        var previousStageDate=startDateStr;
        var previousStageTag="";
        var timelineHtml = '';
        data.forEach(function (event, index) {
            const daysSinceStart = calculateDaysSince(startDateStr, event.date);
            const daysSincePreviousStage = calculateDaysSince(previousStageDate, event.date);

            timelineHtml += `<div class="max-w-xl w-full mx-auto bg-white p-5 rounded-lg shadow-md mb-8">`;
            timelineHtml += `<div id="cleanup" style="background-color:#9cc94b; width:120px; border-radius:10px; padding:5px 10px; text-align:center;">${event.tag}</div>`;

            timelineHtml += `<div class="text-lg font-bold">${event.date} (${daysSinceStart} days since site start)</div>`;
             if(daysSinceStart != daysSincePreviousStage ){   
            timelineHtml += `<div class="text-small" style="color:green"> (${daysSincePreviousStage} days since ${previousStageTage})</div>`;
             }
            timelineHtml += `<p class="text-gray-700 my-2">${event.description}</p>`;
            timelineHtml += `<p class="text-gray-600">${event.comments}</p>`;
            timelineHtml += createImageGallery(event, index);
            timelineHtml += `</div>`;
            previousStageDate=event.date;
            previousStageTage=event.tag;
        });

        $('#events').html(timelineHtml);
    }


    $('#viewTimelineBtn').click(function () {
        $('#welcomeScreen').hide();
        $('#loader').show();

        // Fake loading delay
        setTimeout(function () {
            $('#loader').hide();
            $('#timeline').removeClass('hidden');
        }, 500); // Adjust the time as needed (3000 ms = 3 seconds)
    });

    window.changeSlide = function (move, galleryIndex) {
        var gallery = document.getElementById('gallery-' + galleryIndex);
        var slides = gallery.getElementsByClassName('gallery-slide');
        var activeSlide = gallery.querySelector('.gallery-slide.active');
        var currentIndex = Array.prototype.indexOf.call(slides, activeSlide);
        var nextIndex = (currentIndex + move + slides.length) % slides.length;

        Array.prototype.forEach.call(slides, function (slide) {
            slide.classList.remove('active');
        });

        slides[nextIndex].classList.add('active');
    };

    displayTimelineEvents(timelineData);
});
