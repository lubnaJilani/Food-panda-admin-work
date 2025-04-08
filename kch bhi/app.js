
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore,collection, addDoc ,getDocs, doc, deleteDoc, deleteField , updateDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
 
const firebaseConfig = {
    apiKey: "AIzaSyDvGeQlC4Mg-3I0lp-ydtu2uajr0IhrBtY",
    authDomain: "foodpanda-cdedd.firebaseapp.com",
    projectId: "foodpanda-cdedd",
    storageBucket: "foodpanda-cdedd.firebasestorage.app",
    messagingSenderId: "1002266377851",
    appId: "1:1002266377851:web:b8ea8b7454250829d92cde",
    measurementId: "G-K6JSGCG5V1"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

let getbtn = document.getElementById('btn')

if(getbtn){

    getbtn.addEventListener('click', function () {
        let email = document.getElementById('semail')
        let password = document.getElementById('spass')
        
        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user.email)
                location.href = './signin.html'
            
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    })
}


// function signin() { 
//     let email = document.getElementById('lemail')
//     let password = document.getElementById('lpass')

//     signInWithEmailAndPassword(auth, email.value, password.value)
//         .then((userCredential) => {
//             const user = userCredential.user;
//             console.log(user.email)
//             Location.href = './dasborad.html'

//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log(errorCode, errorMessage)
             
//         });
//         signin()
//     }
//     window.signin = signin



let getlbtn = document.getElementById('lbtn')

if(getlbtn){

    getlbtn.addEventListener('click',()=>{
        let email = document.getElementById('lemail')
        let password = document.getElementById('lpass')
    
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user.email)
            location.href = './dashborad.html'
        
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
})
}



   async function addproduct() {

        let pid = document.getElementById('p-id')
        let pname = document.getElementById('p-name')
        let pdes = document.getElementById('p-des')
        let pprice = document.getElementById('p-price')
        let pimg = document.getElementById('p-img')
 try {
            const docRef = await addDoc(collection(db, "products"), {
                pid: pid.value,
                pname: pname.value,
                pdes: pdes.value,
                pprice: pprice.value,
                pimg: pimg.value
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          
         window.location.reload()
            }
window.addproduct = addproduct


let getdiv = document.getElementById('div')
 async function readdata() {
    const querySnapshot = await getDocs(collection(db, "products"));
querySnapshot.forEach((doc) => {
    getdiv.innerHTML += `
    
    <div class="card container" style="width: 18rem; margin-top: 10px;">
  <img src="${doc.data().pimg}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${doc.data().pname}</h5>
    
    <p class="card-text">${doc.data().pdes}</p>
    <p class="card-text">${doc.data().pprice}</p>
    <br>
    <button class=" btn btn-success" onclick="editbtn('${doc.id  }')">Edit</button>
<button class="btn btn-danger" onclick="deldata('${doc.id  }' )">delete</button>
    
  </div>
</div>
`});
    }
readdata()
window.readdata = readdata

async function deldata(e) {
    getdiv.innerHTML = ' '   
    const cityRef = doc(db, 'products', e);

    await deleteDoc(cityRef, {
        
        pid: deleteField(),
        pname: deleteField(),
        pdes: deleteField(),
        pprice: deleteField(),
        pimg: deleteField(),
    });
    console.log('Document deleted');
    readdata()
}
window.deldata = deldata


async function editbtn(e) {
    getdiv.innerHTML = ' '

    let edititem1 = prompt('Enter updated Name')
    let edititem2 = prompt('Enter updated id')
    let edititem3 = prompt('Enter updated description')
    let edititem4 = prompt('Enter updated price')
    let edititem5 = prompt('Enter updated img url')




      
    const cityRef = doc(db, 'products', e);

    await updateDoc(cityRef, {
    
        pname: edititem1,
        pid: edititem2,
        pdes: edititem3,
        pprice: edititem4,
        pimg: edititem5,
    });
    readdata()
}
window.editbtn = editbtn