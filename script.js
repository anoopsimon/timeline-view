$(document).ready(function() {
    $('#timelineBtn').click(function() {
      loadTimelineEvents();
    });
  
    function loadTimelineEvents() {
      $.ajax({
        url: 'data/timeline.json', // URL to your JSON data
        type: 'GET',
        dataType: 'json',
        success: function(data) {
          displayTimelineEvents(data);
        },
        error: function() {
          console.error('Error fetching timeline data');
        }
      });
    }
  
    function displayTimelineEvents(data) {
        let timelineHtml = '';
      
        // Check if data is an array
        if (Array.isArray(data)) {
          data.forEach(event => {
            timelineHtml += '<div class="timeline-event">';
            timelineHtml += `<div class="event-date">${event.date}</div>`;
            timelineHtml += `<div class="event-description">${event.description}</div>`;
            timelineHtml += '<div class="event-images">';
            if (event.images && Array.isArray(event.images)) {
              event.images.forEach(image => {
                timelineHtml += `<img src="${image}" alt="Event Image" class="timeline-image">`;
              });
            }
            timelineHtml += '</div></div>';
          });
        } else {
          console.error('Data is not an array', data);
        }
        
        $('#events').html(timelineHtml); // Make sure the ID matches your container for events
      }
      
  });
  