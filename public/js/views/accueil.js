import Config from "../module.js"

function Accueil(doc, options){

    // LOAD CSS 
        let cssNormalService = document.getElementById('cssNormalService')
        cssNormalService.href = '/css/module/style.css';
        let cssResponsiveService = document.getElementById('cssResponsiveService')
        cssResponsiveService.href = '/css/module/responsive.css';
    // LOAD CSS 

    let ContainerPrincipaleContent = document.getElementById("ShellBody");
    ContainerPrincipaleContent.innerHTML = ""

    let cadreService = document.createElement('div')
    cadreService.classList.add('cadre__service')
        {
            // let logoServiceHTML = document.createElement('img')
            // logoServiceHTML.classList.add('cadre__service_logo')
            // logoServiceHTML.src = options.logo
            // cadreService.append(logoServiceHTML)
            // let titleHTML = document.createElement('h2')
            // titleHTML.innerText = options.app
            // cadreService.append(titleHTML)
            let descriptionHTML = document.createElement('small')
            descriptionHTML.innerText = Config.description
            cadreService.append(descriptionHTML)
            
        }
    ContainerPrincipaleContent.append(cadreService)

    let containerHTML = document.createElement('div')
    containerHTML.classList.add('container__application-monip')

        let ShellUALoadingUnHTML = document.createElement("div")
        ShellUALoadingUnHTML.classList.add("ShellMNP__loading")
        // ShellAuthLoadingUnHTML.style.display = "none"

            let ShellUALoadingTitleUnHTML = document.createElement("div")
            ShellUALoadingTitleUnHTML.classList.add("ShellMNP__loading-title")
            ShellUALoadingTitleUnHTML.innerText = "Chargement de votre adresse ip..."
            ShellUALoadingUnHTML.append(ShellUALoadingTitleUnHTML)

            let ShellUALoadingLoaderUnHTML = document.createElement("div")
            ShellUALoadingLoaderUnHTML.classList.add("ShellMNP__loading-loader")
            ShellUALoadingUnHTML.append(ShellUALoadingLoaderUnHTML)

        containerHTML.append(ShellUALoadingUnHTML)

        checkIP()
        .then(result => {
    
            // console.log(result)
            let uuid = localStorage.getItem("_cc_uuid")

            ShellUALoadingUnHTML.remove()

            gtag('event', 'service_monip', {
                'uuid': uuid
            })

            let ShellUACadreHTML = document.createElement("div")
            ShellUACadreHTML.classList.add("ShellMNP__cadre-monip")
            ShellUACadreHTML.innerText = result 
            containerHTML.append(ShellUACadreHTML)
    
        })
        .catch(err => {
            alert(err)
        })

    ContainerPrincipaleContent.append(containerHTML)

    async function checkIP(){

        let tkn = localStorage.getItem("access_token")
        let bearer = 'Bearer ' + tkn;

        const response = await fetch('/api/monip/ip', {
            method: "POST",
            headers: {
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const ip = await response.json();
        return ip;

    }

}

export default Accueil;