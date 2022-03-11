

const createVulnerability = () => {
  loadChromeTabInformation((urlToArray, _, baseCustomerUrl, url) => {
    const projectIdExtracted = extractId(urlToArray[6])
    let urlToOpen = ""
    if (!isNaN(projectIdExtracted)) {
      urlToOpen = `${baseCustomerUrl}/projects/${projectIdExtracted}/occurrences/new?locale=en`

    } else if (urlToArray[5].includes("vulnerabilities_dashboard")) {

      const projectId = extractProjectIdFromVulnerabilitiesDashboard(url)
      urlToOpen = `${baseCustomerUrl}/projects/${projectId}/occurrences/new?locale=en`

    }

    if (urlToOpen) {
      window.open(urlToOpen, '_blank');
    }
  })

}

const editVulnerability = () => {
  loadChromeTabInformation((urlToArray, _, baseCustomerUrl) => {
    if (urlToArray[7] === "occurrences") {
      const occurrenceId = extractId(urlToArray[8])
      if (!isNaN(occurrenceId)) {
        const urlToOpen = `${baseCustomerUrl}/projects/${urlToArray[6]}/occurrences/${occurrenceId}/edit`
        window.open(urlToOpen, '_blank');
      }
    }
  })
}

const openChatVulnerability = () => {
  loadChromeTabInformation((urlToArray, _, baseCustomerUrl) => {
    if (urlToArray[7] === "occurrences") {
      const occurrenceId = extractId(urlToArray[8])
      if (!isNaN(occurrenceId)) {
        const urlToOpen = `${baseCustomerUrl}/projects/${urlToArray[6]}/occurrences/${occurrenceId}/vulnerability_comments?locale=en`
        window.open(urlToOpen, '_blank');
      }
    }
  })
}

const createNewProject = () => {
  loadChromeTabInformation((__, _, baseCustomerUrl) => {
    const urlToOpen = `${baseCustomerUrl}/projects/new?analyze=false&locale=en`
    window.open(urlToOpen, '_blank');
  })
}

const openChatProject = () => {
  loadChromeTabInformation((urlToArray, _, baseCustomerUrl, url) => {

    const projectIdExtracted = extractId(urlToArray[6])
    let urlToOpen = ""
    if (!isNaN(projectIdExtracted)) {

      urlToOpen = `${baseCustomerUrl}/projects/${projectIdExtracted}?locale=en#tab-security-champions`

    } else if (urlToArray[5].includes("vulnerabilities_dashboard")) {

      const projectId = extractProjectIdFromVulnerabilitiesDashboard(url)
      urlToOpen = `${baseCustomerUrl}/projects/${projectId}?locale=en#tab-security-champions`
    }

    if (urlToOpen) {
      window.open(urlToOpen, '_blank');
    }

  })
}

const loadChromeTabInformation = (func) => {
  const queryOptions = { active: true, currentWindow: true };
  chrome.tabs.query(queryOptions, (tabs) => {
    const { urlToArray, domain, baseCustomerUrl, url } = extractTabInformation(tabs)
    if (domain.includes("app.conviso.com.br") || domain.includes("app.convisoappsec.com")) {
      func(urlToArray, domain, baseCustomerUrl, url)
    }
  })
}


const extractId = (string) => {
  if (string) {
    return string.split('?')[0]
  }
  return undefined
}

const extractProjectIdFromVulnerabilitiesDashboard = (url) => {
  const urlToArray = url.split("=")
  return urlToArray[2]
}

const extractTabInformation = (tabs) => {
  const [currentTab] = tabs
  const url = currentTab.url;
  const urlToArray = url.split("/")
  const domain = urlToArray[2]
  const baseCustomerUrl = `https://${domain}/scopes/${urlToArray[4]}`

  return { urlToArray, domain, baseCustomerUrl, url }
}


newVulnerabilityButton.addEventListener("click", createVulnerability);
editVulnerabilityButton.addEventListener("click", editVulnerability);
// chatVulnerabilityButton.addEventListener("click", openChatVulnerability);
newProjectButton.addEventListener("click", createNewProject);
chatProjectButton.addEventListener("click", openChatProject);