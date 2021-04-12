// on récupère les éléments du HTML
const initial = document.getElementById("theButton") ; 
const res = document.getElementById("result") ; 

// La fonction qui retourne une promesse
function faireQqc() {
    return new Promise((successCallback, failureCallback) => {
      console.log("Dans Promise 0");
      // réussir une fois sur deux
      var variable = Math.random() ; 
      if (variable > .5) {
        console.log('Dans Promise Success') ;
        successCallback("Réussite : " + variable);
      } else {
        console.log('Dans Promise Fail') ;
        failureCallback("Échec : " + variable);
      }
    })
  } ; 
  
// Fonction appelée en cas de succès   
  function successCallback(resultat) {
    console.log('Dans success Call') ; 
    console.log("L'opération a réussi avec le message : " + resultat);
  }

  // Fonction appelée en cas de fail   
  function failureCallback(erreur) {
    console.log('Dans failure Call') ; 
    console.error("L'opération a échoué avec le message : " + erreur);
  }
  
// Lancement du test au moyen du bouton  
  initial.addEventListener("click", () =>{
      console.log('Bef SendReponse') ; 
      SendResponse() ; 
      console.log('Aft SendReponse') ; 
  } ) ;
  
  // Lancement du test au moyen du bouton (on l'a rajouté pour voir commment se passaient les appels asynchrones )
  // et ca marche !! Les appels à successCallback et failureCallback ne sont faits qu'une fois tout le code épuisé !  
  // (voir le log "Aft SendReponse", qui arrive avant 'Dans success Call' ou 'Dans failure Call')   
  function SendResponse() {
      console.log('On fait qqchose') ;  
      const promise = faireQqc();
      console.log('On attend le resultat') ; 
      promise.then(successCallback, failureCallback) ; 
      console.log('Et pendant ce temps on peut faire des autres trucs...') ;
    
  }


  console.log('check 1') ; 
