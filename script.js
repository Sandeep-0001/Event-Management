const eventForm = document.getElementById('eventForm');
const eventNameInput = document.getElementById('eventName');
const eventDateInput = document.getElementById('eventDate');
const eventTimeInput = document.getElementById('eventTime');
const eventLocationInput = document.getElementById('eventLocation');
const eventsList = document.getElementById('events');

const STORAGE_KEY = 'eventManager.events.v1';

let events = [];

init();

function init() {
  events = loadEvents();
  renderEvents();
  eventForm.addEventListener('submit', createEvent);
}

function loadEvents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveEvents() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

function renderEvents() {
  eventsList.innerHTML = '';

  for (const event of events) {
    const eventItem = document.createElement('li');

    const title = document.createElement('strong');
    title.textContent = event.name;
    eventItem.appendChild(title);
    eventItem.appendChild(document.createElement('br'));

    eventItem.appendChild(document.createTextNode(`Date: ${event.date}`));
    eventItem.appendChild(document.createElement('br'));

    eventItem.appendChild(document.createTextNode(`Time: ${event.time}`));
    eventItem.appendChild(document.createElement('br'));

    eventItem.appendChild(document.createTextNode(`Location: ${event.location}`));

    eventsList.appendChild(eventItem);
  }
}

function createEvent(e) {
  e.preventDefault();
  const eventName = eventNameInput.value.trim();
  const eventDate = eventDateInput.value;
  const eventTime = eventTimeInput.value;
  const eventLocation = eventLocationInput.value.trim();

  if (eventName && eventDate && eventTime && eventLocation) {
    const id = (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    events.push({
      id,
      name: eventName,
      date: eventDate,
      time: eventTime,
      location: eventLocation,
    });

    saveEvents();
    renderEvents();
    eventForm.reset();
  }
}
