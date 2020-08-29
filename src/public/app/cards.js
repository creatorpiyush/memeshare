function loadProducts() {
  $.get("/content", (meme) => {
    for (let m of meme) {
      $("#posts-container").append(
        $(`<div class="card-image">
                <img src="${m.memeimg}">
                    <a href="${m.memeimg}" class="btn-floating halfway-fab waves-effect waves-light blue" style="font-size: 35px;" download="${m.memetitle}"> 
                    <i class="material-icons">aspect_ratio</i></a>
            </div>
            <span class="card-title" style="color: black; font-weight: 1000;">${m.memetitle}</span>
            <div id="endevery"></div>
`)
      );
    }
  });
}

// todo: like button functioning
// <button class="btn-floating halfway-fab waves-effect waves-light" id='likebtn' ondblclick="clinked()"> <i class="material-icons"
//         id="liked" style="font-size: 35px;" >favorite_border</i></button>

// function clinked() {
//   document.getElementById("liked").innerHTML = "favorite";
//   console.log("btn clinked");
// }
