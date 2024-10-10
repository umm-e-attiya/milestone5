const form = document.getElementById('resumeForm') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resumeOutput') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPDFButton = document.getElementById('download-pdf') as HTMLButtonElement;

form.addEventListener('submit', (event: Event) => {
     event.preventDefault(); 

     
     
     const username =(document.getElementById('username') as HTMLInputElement).value;
     const name =(document.getElementById('name') as HTMLInputElement).value;
     const email =(document.getElementById('email') as HTMLInputElement).value;
     const contactno=(document.getElementById('contactno') as HTMLInputElement).value;
     const education =(document.getElementById('education') as HTMLInputElement).value;
     const skills =(document.getElementById('skills') as HTMLInputElement).value;
     const workexperience =(document.getElementById('workexperience') as HTMLInputElement).value;

    // save form data to localstorage with the username as the key..

    const resumeData = {name, email,contactno, education, skills, workexperience};
    localStorage.setItem(username,JSON.stringify(resumeData));


    //now we generate resume dynamically

    const resumeHtml=`
    
    <h2>Personal Information</h2> 
    <p><strong>Name:</strong>${name}</p> 
    <p><strong>Email:</strong>${email}</p>  
    <p><strong>Contactno:</strong>${contactno}</p>
    <p><strong>Education:</strong>${education}</p>
    <p><strong>Skills:</strong>${skills}</p>   
    <p><strong>WorkExperience:</strong>${workexperience}</p> 
    
     `;               


     resumeDisplayElement.innerHTML = resumeHtml;
     

     const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;
     console.log('Generated Shareable URL:', shareableURL);
     // display the shareable link
     shareableLinkContainer.style.display ="block";
     shareableLinkElement.href = shareableURL;
     shareableLinkElement.textContent = shareableURL;
     console.log('Link element updated:', shareableLinkElement.href);
alert('Shareable link has been generated!');
});

// handle Download PDF

downloadPDFButton.addEventListener('click', ()=>{
    window.print();
});

//prefill the form based on the uername url

window.addEventListener("DOMContentLoaded", () =>{
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    
    

    if(username){
        const savedResumeData = localStorage.getItem(username);
        if(savedResumeData){
        const resumedata = JSON.parse (savedResumeData);
        (document.getElementById('username')as HTMLInputElement).value = username;
        (document.getElementById('name')as HTMLInputElement).value= resumedata.name;
        (document.getElementById('email')as HTMLInputElement).value = resumedata.email;
        (document.getElementById('contactno')as HTMLInputElement).value = resumedata.contactno;
        (document.getElementById('education')as HTMLInputElement).value = resumedata.education;
        (document.getElementById('skills')as HTMLInputElement).value = resumedata.skills;
        (document.getElementById('workexperience')as HTMLInputElement).value = resumedata.workexperience;
        
        
    } 
    
}
});