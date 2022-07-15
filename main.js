import { initializeApp, firebaseConfig } from "./firebase/app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "./firebase/firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "./firebase/storage.js";

// Inicializando Firebase e Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, "noticias");

const storage = getStorage(app);

const metadados = {
  contentType: "image/jpeg",
};

let imageName;
let files = [];
let allImagesLinks = [];
let reader = new FileReader();

imageFileInput.addEventListener("change", (e) => {
  let img = document.createElement("img");
  img.style.width = "300px";
  img.style.height = "190px"
  img.style.objectFit = "cover"
  img.className = "img-thumbnail ";

  files = e.target.files;

  reader = new FileReader();
  reader.readAsDataURL(files[0]);

  reader.onload = function () {
    img.src = reader.result;
    imagesBox.insertAdjacentElement("beforeend", img);
  };
});

uploadButton.addEventListener("click", () => {
  imageName = imageNameInput.value;

  const storageRef = ref(storage, `news-images/${imageName}.jpg`);
  const uploadTask = uploadBytesResumable(storageRef, files[0], metadados);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const link = document.createElement("div");
        link.innerHTML = `Link imagem '${imageName}': ${downloadURL} <br /><br />`;

        allImagesLinks.push(downloadURL);
        imagesLinks.insertAdjacentElement("beforeend", link);
      });
    }
  );
});

const pushNews = (data, titulo, texto, imagemPrincipal, allImagesLinks) => {
  addDoc(colRef, {
    data: data,
    titulo: titulo,
    texto: texto,
    imagemPrincipal: imagemPrincipal,
    imagensUrls: allImagesLinks,
  }).then(() => {
    alert("Notícia criada com sucesso!");
  });
};

uploadNewsButton.addEventListener("click", () => {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const tituloValue = newsTitle.value;
  const textoValue = newsText.value;
  const imagemPrincipalValue = `https://firebasestorage.googleapis.com/v0/b/etec-laq-website.appspot.com/o/news-images%2F${cardImageLink.value}.jpg?alt=media`;

  const dataValue = new Date();
  const dataFormatValue = `${dataValue.getDate()} de ${
    months[dataValue.getMonth()]
  } de ${dataValue.getFullYear()}`;

  pushNews(
    dataFormatValue,
    tituloValue,
    textoValue,
    imagemPrincipalValue,
    allImagesLinks
  );
});
