import{initializeApp,firebaseConfig,getFirestore,collection,addDoc,getStorage,ref,uploadBytesResumable,getDownloadURL}from"./firebase/index.js";const app=initializeApp(firebaseConfig),db=getFirestore(app),colRef=collection(db,"noticias"),storage=getStorage(app),metadados={contentType:"image/jpeg"};let imageName,files=[],allImagesLinks=[];const reader=new FileReader,imageCardSchema=e=>`\n  <div class="card mb-3 mb-lg-0" style="width: 18rem;">\n    <img src="${e}" class="card-img-top" style="height: 10rem; object-fit: cover;" alt="">\n    <div class="card-body">\n      <h5 class="card-title">Nome: Insira o nome...</h5>\n    </div>\n    <div class="card-body">\n      <a href="#" class="card-link" target="">Link: Envie a imagem...</a>\n    </div>\n  </div>\n`;imageFileInput.addEventListener("change",e=>{files=e.target.files,reader.readAsDataURL(files[0]),reader.onload=(()=>{imagesBox.insertAdjacentHTML("beforeend",imageCardSchema(reader.result))})}),imageSubmitForm.addEventListener("submit",e=>{if(e.preventDefault(),!1!==imageFileInput.validity.valid&&""!==imageNameInput.value){imageName=imageNameInput.value;const e=ref(storage,`news-images/${imageName}.jpg`),a=uploadBytesResumable(e,files[0],metadados);a.on("state_changed",()=>{},e=>{console.log(e)},()=>{getDownloadURL(a.snapshot.ref).then(e=>{imagesBox.lastElementChild.children[0].alt=imageName,imagesBox.lastElementChild.children[1].firstElementChild.innerText=`Nome: ${imageName}`,imagesBox.lastElementChild.children[2].firstElementChild.href=e,imagesBox.lastElementChild.children[2].firstElementChild.target="_blank",imagesBox.lastElementChild.children[2].firstElementChild.innerText="Link da Imagem",allImagesLinks.push(e)})})}}),newsSubmitForm.addEventListener("submit",e=>{if(e.preventDefault(),""!==newsTitle.value&&""!==cardImageLink.value&&""!==newsText.value){const e=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],a=`https://firebasestorage.googleapis.com/v0/b/etec-laq-website.appspot.com/o/news-images%2F${cardImageLink.value}.jpg?alt=media`,i=new Date,t=`${i.getDate()} de ${e[i.getMonth()]} de ${i.getFullYear()}`;addDoc(colRef,{data:t,titulo:newsTitle.value,texto:newsText.value,imagemPrincipal:a,imagensUrls:allImagesLinks}).then(()=>{alert("Notícia criada com sucesso!")})}});