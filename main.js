// *********  DATA ********** //
const data = [
  {
    videoId: 'cNjIUSDnb9k',
    title: 'Callbacks',
    category: 'javascript',
    favorite: true,
  },
  {
    videoId: 'f02mOEt11OQ',
    title: 'Chill Beats',
    category: 'music',
    favorite: false,
  },
  {
    videoId: 'PlxWf493en4',
    title: 'How to Make a Super Simple Website',
    category: 'html',
    favorite: false,
  },
  {
    videoId: '1PnVor36_40',
    title: 'Learn CSS in 20 Minutes',
    category: 'css',
    favorite: true,
  },
  {
    videoId: '1Rs2ND1ryYc',
    title: 'Zero to Hero',
    category: 'css',
    favorite: false,
  },
  {
    videoId: 'jjydMpW47wk',
    title: 'Inspo on JS',
    category: 'javascript',
    favorite: true,
  },
];

// *********  UTILITY FUNCTIONS  ********* //
const renderToDom = (divId, textToRender) => { //This defines the function and names the parameters that need to be entered
  const selectedElement = document.querySelector(divId); // This selects the div in our HTML that we want to select/target
  selectedElement.innerHTML = textToRender; // This defines the content we want to add to the selected div
};

// *********  HTML COMPONENT FUNCTIONS  ********* //
// Add Video Button / Modal
const videoBtnModal = () => { // This defines the variable that will be the "Add Video" button
  const domString = `
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#add-video">
    Add Video
    </button>
    <!-- Modal -->
    <div class="modal fade" id="add-video" tabindex="-1" aria-labelledby="add-video" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Video</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="modal-body">
          <form>
          <div class="form-floating mb-3">
            <input class="form-control form-control-lg" type="text" placeholder="Video ID" id="videoId" aria-label="video id" required>
            <label for="videoId">YouTube Video ID</label>
          </div>
      
          <div class="form-floating mb-3">
            <input class="form-control form-control-lg" type="text" placeholder="Title" id="title" aria-label="title" required>
            <label for="title">Title</label>
          </div>
      
          <div class="form-floating mb-3">
            <select class="form-select form-control-lg" id="category" aria-label="category" required>
              <option value="">Select a category</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="javascript">JavaScript</option>
              <option value="music">Music</option>
            </select>
            <label for="category">Category</label>
          </div>
          
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" value="" id="favorite">
            <label class="form-check-label" for="favorite">
              Favorite
            </label>
          </div>
      
          <button 
            type="submit" 
            class="btn btn-success" 
          >
            Submit
          </button>
        </form>
          </div>
        </div>
      </div>
    </div>
  `; // domString is set as a constant because we will not want to change what is present in the modal that pops up when we click on the button. This domString is scoped to the function, so we use domString in other places as well. Everything should be scoped within functions
  renderToDom('#createBtnContainer', domString); // This calls our utility function, names the div we want to target and selects the variable that has the conent we want to display This is contained within our "videobtnmodal" because domString is scope locally. Function will not run if we do this because domString is not globablly defined
};

// Video component with default arg value
// = 'cNjIUSDnb9k'
const videoPlayer = (videoId = 'cNjIUSDnb9k') => { //Defines our video player function and adds it to the dom. This function does take a parameter of videoId, which is a key in our data. Setting the video ID equal to one of the video IDs will ensure that there is automatically a video in the video player when a user opens the app
  const domString = `
  <iframe src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `; // this code is copied from youtube
  renderToDom('#videoPlayer', domString); // This places the video played on the dom for us in the videoPlayer div. Again, domString is locally scoped
};

// Filter Button Row
const filterButtons = () => {
  let domString = `
  <div class="d-flex flex-wrap justify-content-between my-3">
    <button class="btn btn-secondary btn-lg buttonRow" id="music">Music</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="javascript">Javascript</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="css">CSS</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="html">HTML</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="favorite">Favorites</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="clear">Clear Filter</button>
  </div>
  `; // This adds a bunch of buttonn. This button HTML should be structured exactly how you would structure it in your HTML(make sure you add your IDs to the buttons).
  renderToDom('#filterContainer', domString); // This places the buttons in the filterContainer
};

// Cards
const cardsOnDom = (array) => { 
  let domString = ''; // we start with an empty string, but will change it so we use let instead of const. Whenever we have a loop, we will want to start with an empty domString. If we don't clear out the dom, the funciton will append to the dom
  for (const item of array) { // this will loop through each item in the array. We are creating a reusable function here. We have to create all the functions before we can call them and pass the parameters
    domString += `
    <div class="mb-3 d-flex align-items-center" style="background: white; padding: 20px; border: 1px solid black; border-radius: 10px;">
    <div class="flex-shrink-0">
      <img src="./assets/images/${item.category}.png" style="width: 120px; height: 120px; border-radius: 20px;" alt="${item.category} icon">
    </div>
    <div class="flex-grow-1 ms-3">
      <h2 style="font-size: 24px; font-weight: bold; padding: 0px; margin: 0px">${item.favorite ? '⭐' : ''} ${item.title}</h2>
      <p><b>Category:</b> ${item.category.toUpperCase()}</p>
      <button class="btn btn-dark" id="watch--${item.videoId}">Watch Video</button>
    </div>
    <div>
      <button class="btn btn-danger" id="delete--${item.videoId}">X</button>
    </div>
  </div>
    `; // This is where we reassign the domString. All the video IDs need to be unique in order to play each individual video. If the ID's are not unique, only the first video with that ID will play.
  }
  renderToDom('#cardContainer', domString); //this will add the cards to the cardContainer div
};

// *********  EVENT LISTENERS  *********  //
const eventListeners = () => {
  // Bootstrap for grabbing modal so can manually open and close
  const formModal = new bootstrap.Modal(document.querySelector('#add-video'));
  
  // FILTER BUTTON ROW
 document.querySelector('#filterContainer').addEventListener('click', (e) => { // This targets the filterContainer div and adds an event listener to it. elements have to be on the DOM before we can add event listeners to them.
    // console.log("You clicked a filter button", e.target.id); // This will console log regardless of if you're actually clicking on a filter button or not
    // filter on category (either use .filter or a loop)
    if (e.target.id === "clear") { // this targets the id of "clear"
      cardsOnDom(data); // calling the cardsondom function that we created earlier
    } else if (e.target.id === "favorite") { // this targets the id of "favorite" 
      const favs = data.filter(taco => taco.favorite === true); // .filter returns an array
      cardsOnDom(favs);
    } else if (e.target.id) { // this will target anything with an ID(the ID is not blank). This is truthy. This will target all of our other buttons because they have ID's 
      const topics = data.filter(vid => vid.category === e.target.id);
      cardsOnDom(topics);
    }
    // rerender DOM with new array (use the cardsOnDom function)
  });

  // BUTTONS ON CARDS
  document.querySelector('#cardContainer').addEventListener('click', (e) => {
    // check to make sure e.target.id is not empty
    if (e.target.id) {
      // get the video ID off the button ID
      // const videoActions = e.target.id.split("--"); //This does the same thing as the below 
      const [method, videoId] = e.target.id.split("--"); // This does the same thing as the above. This is called destructuring
      // find the index of the object in the array
      const index = data.findIndex(taco => taco.videoId === videoId)

      // only listen for events with "watch" or "delete" included in the string
      
      // if watch: grab the ID and rerender the videoPlayer with that ID as an argument
      if (e.target.id.includes('watch')) {
        console.log("Pressed Watch Button")        
        videoPlayer(videoId);
        // scroll to top of page
        document.location = '#';
      }

      // if delete: find the index of item in array and splice
      // NOTE: if 2 videos have the same videoId, this will delete the first one in the array
      if (e.target.id.includes('delete')) {
        data.splice(index, 1);
        // rerender DOM with updated data array (use the cardsOnDom function)
        cardsOnDom(data);
      }
    }
  });

  // FORM SUBMIT
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // this goes in EVERY form submit to prevent page reload
    // grab the values from the form inputs and create an object
    const newVideoObj = {
      videoId: document.querySelector("#videoId").value,
      title: document.querySelector("#title").value,
      category: document.querySelector("#category").value,
      favorite: document.querySelector("#videoId").checked,
    }
    // push that object to the data array    
    data.push(newVideoObj); 
    // rerender cards using the cardsOnDom function and pass it the updated data array
    cardsOnDom(data)
    
    // Close modal and reset form
    formModal.hide()
    form.reset(); // you can only use .reset with forms. if you have myultiple forms, you will need to add IDs to your forms
  });
};

// *********  FUNCTION TO START APPLICATION  *********  //
const startApp = () => {
  videoBtnModal();
  videoPlayer();
  filterButtons();
  cardsOnDom(data);
  eventListeners(); // always last
};

startApp();
