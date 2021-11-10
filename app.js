let text = document.getElementById("textArea");
const uperCase = document.getElementById('upper-case');
const lowerCase = document.getElementById('lower-case');
const properCase = document.getElementById('proper-case');
const sentenceCase = document.getElementById('sentence-case');
const saveTextFile = document.getElementById('save-text-file');

uperCase.addEventListener('click', () => text.value = text.value.toUpperCase());

lowerCase.addEventListener('click', () => text.value = text.value.toLowerCase());

properCase.addEventListener('click', () => {
    let textIn = text.value.split(" ");
    for (let i = 0; i < textIn.length; i++) {
        textIn[i] = textIn[i].charAt(0).toUpperCase() +  textIn[i].substring(1)
            }
    return text.value = textIn.join(" ")
});

sentenceCase.addEventListener('click', () => {
    let textIn = text.value.toLowerCase().split("");
    for (let i = 0; i < textIn.length; i++) {
        if (i === 0) {
            textIn[i] = textIn[i].toUpperCase();    
        } else if ((textIn[i] === "." || textIn[i] === "?" || textIn[i] === "!") && i !== textIn.length-1) {
            textIn[Number(i+2)] = textIn[Number(i+2)].toUpperCase();
        } else if (textIn[i] === "\n"){
            textIn[Number(i+1)] = textIn[Number(i+1)].toUpperCase();
        } else {
            textIn[i] = textIn[i]
        }   
    }
    return text.value = textIn.join("")
});

saveTextFile.addEventListener('click', () => {
    let textFileAsBlob = new Blob([text.value], { type: 'text/plain' });
    let fileNameToSaveAs = "text.txt";
    let downloadLink = document.createElement("a");

    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
        // Chrome allows the link to be clicked without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
      } else {
        // Firefox requires the link to be added to the DOM before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
      }
    downloadLink.click();
    
});

 //remove the link from the DOM
  const destroyClickedElement = (event) => document.body.removeChild(event.target);