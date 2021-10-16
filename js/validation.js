/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    AKAI Frontend Task - Javascript

    W tym zadaniu postaraj się zaimplementować metody, które sprawdzą, czy dane wprowadzone
    do formularza są poprawne. Przykładowo: czy imię i nazwisko zostało wprowadzone.
    Możesz rozwinąć walidację danych tak bardzo, jak tylko zapragniesz.

    Powodzenia!
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

function validateForm(e){
    var first_name = document.getElementById('first-name');
    var last_name = document.getElementById('last-name');
    var email = document.getElementById('email');

    var sections = [];
    var section_cbs = [ 'frontend-checkbox', 'backend-checkbox', 'mobile-checkbox', 'graphics-checkbox' ];
    for(var i = 0; i < section_cbs.length; i++){
        sections.push(document.getElementById(section_cbs[i]));
    }

    var invalid = false;
    if(first_name.value.length == 0){
        fileError(first_name, 'Wypełnij pole Imię.');
        invalid = true;
    }else{
        clearError(first_name);
    }

    if(last_name.value.length == 0){
        fileError(last_name, 'Wypełnij pole Nazwisko.');
        invalid = true;
    }else{
        clearError(last_name);
    }

    if(email.value.length == 0){
        fileError(email, 'Wypełnij pole Adres e-mail.');
        invalid = true;
    }else if(!/^[^/@]+@[^/@]+\.[a-zA-Z0-9]+$/.test(email.value)){
        fileError(email, 'Błędny format adresu e-mail.');
        invalid = true;
    }else{
        clearError(email);
    }

    var is_section_selected = false;
    for(var i = 0; i < sections.length; i++){
        if(sections[i].checked) is_section_selected = true;
    }

    if(!is_section_selected){
        fileError('sections-error', 'Zaznacz przynajmniej jedną sekcję.');
        invalid = true;
    }else{
        clearError('sections-error');
    }

    if(invalid) e.preventDefault();
}

function fileError(input, error_msg){
    var error_wrapper_id;
    if(typeof input === 'string'){
        error_wrapper_id = input;
    }else{
        error_wrapper_id = input.id + '-error';
    }

    var error_wrapper = document.getElementById(error_wrapper_id);
    error_wrapper.textContent = error_msg;

    if(typeof input === 'string') return;
    input.classList.add('error');
}

function clearError(input){
    var error_wrapper_id;
    if(typeof input === 'string'){
        error_wrapper_id = input;
    }else{
        error_wrapper_id = input.id + '-error';
    }

    var error_wrapper = document.getElementById(error_wrapper_id);
    error_wrapper.textContent = '';

    if(typeof input === 'string') return;
    input.classList.remove('error');
}

function setTheme(theme){
    document.body.classList.remove('light', 'dark');
    if(theme == 'light' || theme == 'dark')
        document.body.classList.add(theme);
}

var listeners_attached = false;
function attachEventListeners(){
    if(document.readyState === 'loading') return;
    if(listeners_attached) return;

    listeners_attached = true;
    document.getElementById('enroll-form').addEventListener('submit', validateForm);

    document.getElementById('theme-auto').addEventListener('click', () => setTheme('auto'));
    document.getElementById('theme-light').addEventListener('click', () => setTheme('light'));
    document.getElementById('theme-dark').addEventListener('click', () => setTheme('dark'));
}

document.addEventListener('readystatechange', attachEventListeners);
attachEventListeners();
