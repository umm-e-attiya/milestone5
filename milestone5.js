var form = document.getElementById('resumeForm');
var resumeDisplayElement = document.getElementById('resumeOutput');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPDFButton = document.getElementById('download-pdf');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var contactno = document.getElementById('contactno').value;
    var education = document.getElementById('education').value;
    var skills = document.getElementById('skills').value;
    var workexperience = document.getElementById('workexperience').value;
    // save form data to localstorage with the username as the key..
    var resumeData = { name: name, email: email, contactno: contactno, education: education, skills: skills, workexperience: workexperience };
    localStorage.setItem(username, JSON.stringify(resumeData));
    //now we generate resume dynamically
    var resumeHtml = "\n    \n    <h2>Personal Information</h2> \n    <p><strong>Name:</strong>".concat(name, "</p> \n    <p><strong>Email:</strong>").concat(email, "</p>  \n    <p><strong>Contactno:</strong>").concat(contactno, "</p>\n    <p><strong>Education:</strong>").concat(education, "</p>\n    <p><strong>Skills:</strong>").concat(skills, "</p>   \n    <p><strong>WorkExperience:</strong>").concat(workexperience, "</p> \n    \n     ");
    resumeDisplayElement.innerHTML = resumeHtml;
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    console.log('Generated Shareable URL:', shareableURL);
    // display the shareable link
    shareableLinkContainer.style.display = "block";
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
    console.log('Link element updated:', shareableLinkElement.href);
    alert('Shareable link has been generated!');
});
// handle Download PDF
downloadPDFButton.addEventListener('click', function () {
    window.print();
});
//prefill the form based on the uername url
window.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumedata = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumedata.name;
            document.getElementById('email').value = resumedata.email;
            document.getElementById('contactno').value = resumedata.contactno;
            document.getElementById('education').value = resumedata.education;
            document.getElementById('skills').value = resumedata.skills;
            document.getElementById('workexperience').value = resumedata.workexperience;
        }
    }
});
