const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");
const lightBox = document.querySelector(".lightbox");
const closeBtn = document.querySelector(".uil-times");
const downloadImageBtn = document.querySelector(".uil-import");

//
const apiKey = "vm60IpA2duXNYHnDScVvNhFYXe5TSXfVS4yM14bcjGx8Sl0Tm3Mn9jrF";
const perPage = 70;
let currentPage = 1;
let searchTerm = null;

const downloadImg = (imgURL) => {
    //Conversion de l'image reçue en blob, création de son lien de téléchargement et téléchargement.
    fetch(imgURL).then(res => res.blob()).then(file => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = new Date().getTime();
        a.click();
    }).catch(() =>alert("Échec du chargement des images!"));
}


const showLightbox = (name, img) => {
    lightBox.querySelector("img").src = img;
    lightBox.querySelector("span").innerText = name;
    downloadImageBtn.setAttribute("data-img", img);
    lightBox.classList.add("show");
    document.body.style.overflow = "hidden";
}

const hideLightbox = () => {
    lightBox.classList.remove("show");
    document.body.style.overflow = "auto";
}

const generateHTML = (images) => {
    //Créer un li de toutes les images récupérées et les ajouter au wrapper d'image existant.
    imagesWrapper.innerHTML += images.map(img => 
        `<li class="card" onclick="showLightbox('${img.photographer}','${img.src.large2x}')">
            <img src="${img.src.large2x}" alt="img">
                <div class="datails">
                    <div class="photographer">
                        <i class="uil uil-camera"></i>
                        <span>${img.photographer}</span>
                    </div>
                <button onclick="downloadImg('${img.src.large2x}');event.stopPropagation();">
                    <i class="uil uil-import"></i>
                </button>
            </div>
        </li>`
    ).join("");
}

const getImages = (apiURL) => {
    //Récupération d'image par appel API avec en-tête d'autorisation
    loadMoreBtn.innerText = "Loading...";
    loadMoreBtn.classList.add("disabled");
    fetch(apiURL, {
        headers: { Authorization: apiKey}
    }).then(res => res.json()).then(data => {
        generateHTML(data.photos);
        loadMoreBtn.innerText = "Load More";
        loadMoreBtn.classList.remove("disabled");
    }).catch(() => alert("Échec du chargement des images!"));
}


const loadMoreImages = () => {
    currentPage++;  //Incrémenter la page actuelle de 1
    //Si searchTerm a une valeur, appelez l'API avec le terme de recherche, sinon appelez l'API par défaut
    let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage }&per_page=${perPage }`;
    apiURL = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage }` : apiURL;
    getImages(apiURL);
}

const loadSearchImages = (e) => {
    //Si l'entrée de recherche est vide, définissez le terme de recherche sur null et revenez à partir d'ici
    if(e.target.value === "") return searchTerm = null;
    //Si la touche Entrée est enfoncée, mettez à jour la page actuelle, le terme de recherche et appelez getImages
    if(e.key === "Enter") {
        currentPage = 1;
        searchTerm = e.target.value;
        imagesWrapper.innerHTML = "";
        getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage }`);
    }
}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage }&per_page=${perPage }`);
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);
closeBtn.addEventListener("click", hideLightbox);
downloadImageBtn.addEventListener("click", (e) => downloadImg(e.target.dataset.img));



  if (!window.callbellSettings) {
    window.callbellSettings = {}
  }
  window.callbellSettings["token"] = "EyU2AnF6WfDdSPfWzizBzxt7";

  (function(){var w=window;var ic=w.callbell;if(typeof ic==="function"){ic('reattach_activator');ic('update',callbellSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Callbell=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://dash.callbell.eu/include/'+window.callbellSettings.token+'.js';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()
