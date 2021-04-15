// on récupère les éléments du HTML
const initial = document.getElementById("theButton") ; 
const res = document.getElementById("result") ; 

var compteur1=0 ;
var compteur2=0 ;


// La fonction qui retourne une promesse
function faireQqc() {
    return new Promise((successCallback, failureCallback) => {      

      console.log("Dans Promise, dans l'ordre des appels ");
      // réussir une fois sur deux
      var variable = Math.random() ; 
      if (variable > .5) {
        console.log("Dans Promise Success, dans l'ordre des appels") ;
        successCallback("Réussite : " + variable);
      } else {
        console.log("Dans Promise Fail, dans l'ordre des appels") ;
        failureCallback("Échec : " + variable);
      }
       
    })
  } ; 
  
// Fonction appelée en cas de succès   
  function successCallback(resultat) {
    compteur2++ ;
    console.log("Dans success Call, mais pas dans l'ordre des appels") ; 
    console.log("L'opération a réussi avec le message : " + resultat + " ; compteur code = " + compteur1 + " ; compteur asynch = " + compteur2 );
  }

  // Fonction appelée en cas de fail   
  function failureCallback(erreur) {
    compteur2++ ;    
    console.log("Dans failure Call, mais pas dans l'ordre des appels") ; 
    console.error("L'opération a échoué avec le message : " + erreur + " ; compteur code = " + compteur1 + " ; compteur asynch = " + compteur2 ) ; 
    // on envoie un message d'erreur. Intéressant de voir qu'il est aussi asynchrone 
    // -> il s'exécutera après que tout le reste du code a été exécuté 
    throw new Error("Merdouille") ; 
  }
  
// Lancement du test au moyen du bouton  
  initial.addEventListener("click", () =>{
      console.log('Bef SendReponse') ; 
      SendResponse() ; 
      console.log('Aft SendReponse. Normalement ce serait ici The End...') ; 
  } ) ;
  
  // Lancement du test au moyen du bouton (on l'a rajouté pour voir commment se passaient les appels asynchrones )
  // et ca marche !! Les appels à successCallback et failureCallback ne sont faits qu'une fois tout le code épuisé !  
  // (voir le log "Aft SendReponse", qui arrive avant 'Dans success Call' ou 'Dans failure Call')   
  function SendResponse() {
      console.log('On fait qqchose') ;  
      const promise = faireQqc();     
      console.log('On attend le resultat') ; 
      promise.then(successCallback, failureCallback) 
      .then(()=>{
        setTimeout(() => {res.innerText = " success ! " ;} , 1000  );
        res.innerText = "Salut les copains" ; 
        
      }) 
      .catch(()=>{
        setTimeout(() => {res.innerText = "  failure ! " ;} , 1000  );
        res.innerText = "Salut les nazes" ;
      } ) ; 
      

      compteur1++ ; 
      promise.then(successCallback, failureCallback) ;
      compteur1++ ; 
      promise.then(successCallback, failureCallback) ;
      compteur1++ ; 
      promise.then(successCallback, failureCallback) ;      
      //compteur1++ ; 
      //promise.then(()=>{
       
      console.log('Et pendant ce temps on peut faire des autres trucs...') ;
    
  }


  console.log('check 1') ; 
