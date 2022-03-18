var url = "";
var newvuln = document.getElementById("btn-newvuln");
var editvuln = document.getElementById("btn-editvuln");
var newproject = document.getElementById("btn-newproject");
var chatproject = document.getElementById("btn-chatproject");

window.onload = function () {

  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;

    url = url.split("/")
    url_customer = url[0] + '/' + url[1] + '/' + url[2] + '/' + url[3] + '/' + url[4]
    url_customer = url_customer.split('?')

    url_project = url[0] + '/' + url[1] + '/' + url[2] + '/' + url[3] + '/' + url[4] + '/' + url[5] + '/' + url[6]
    url_project = url_project.split('?')

    url_vulnerability = url[0] + '/' + url[1] + '/' + url[2] + '/' + url[3] + '/' + url[4] + '/' + url[5] + '/' + url[6] + '/' + url[7] + '/' + url[8]
    url_vulnerability = url_vulnerability.split('?')

    new_vulnerability = url_project[0] + "/occurrences/new?locale=en"
    edit_vulnerability = url_vulnerability[0] + "/edit?locale=en&tab=tab-vuln"
    //chat_vulnerability = url_vulnerability[0] + "/vulnerability_comments?locale=en"
    new_project = url_customer[0] + "/projects/new?analyze=false&locale=en"
    chat_project = url_project[0] + "?locale=en#tab-security-champions"

  });
}

newvuln.addEventListener("click", createVuln);
editvuln.addEventListener("click", editVuln);
//chatvuln.addEventListener("click", chatVuln);
newproject.addEventListener("click", createProject);
chatproject.addEventListener("click", chatProject);

function createVuln() {
  window.open(new_vulnerability,'_blank');
}

function editVuln() {
  window.open(edit_vulnerability,'_blank');
}

function createProject() {
  window.open(new_project,'_blank');
}

function chatProject() {
  window.open(chat_project,'_blank');
}
