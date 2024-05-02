const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");
//Start UI Object
const ui = new UI();

//Start Storage object
const storage = new Storage();

//upload all events
eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });
    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title==="" || director==="" || url===""){
        //Eror
        ui.displayMassages("Tüm alanları doldurunuz...","danger");

    }
    else{
        //new film
        const newFilm = new Film(title,director,url);

        //adding film to the UI
        ui.addFilmToUI(newFilm);
        //adding film to the Storage
        storage.addFilmToStorage(newFilm);
        ui.displayMassages("Film başarı ile eklendi...","success");
    }

    ui.clearInputs(titleElement,urlElement,directorElement);
    e.preventDefault();
}

function deleteFilm(e){
    if(e.target.id ==="delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMassages("Silme işlemi başarılı...","success");
    }
}

function clearAllFilms(){
    if(confirm("Emin misiniz?")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
        ui.displayMassages("Tüm filmler başarı ile silindi...","success")
    }
    else{
        ui.displayMassages("Işlem iptal edildi...","primary");
    }
    
}