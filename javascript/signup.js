function showSuccess(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars
    
    document.getElementById('successBackgroud').classList.remove('successBackgroundHide');
    document.getElementById('successButton').classList.remove('successButtonHide');
    document.getElementById('successBackgroud').classList.add('successBackground');
    document.getElementById('successButton').classList.add('successButtonShow');
}
