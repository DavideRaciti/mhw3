/* TO DO: inserite il codice JavaScript necessario a completare il MHW! */

//restarta il quiz: rimetto la classe hidden al result-block e tramite due cicli for rimuove la classe opacity e selected ai vari box
//delle risposte e svuoto la mappa delle risposte iterando con un generico indice
function restartAll(){
  const resultBlock = document.querySelector('#result-block');
  resultBlock.classList.add('hidden');

  const grid = document.querySelector('#car');
  grid.innerHTML = '';

  const spotify = document.querySelector('#spotify');
  spotify.innerHTML = '';

  for(const box of boxes){
    box.classList.remove('opacity');
    box.classList.remove('selected');
    box.querySelector('.checkbox').src = "images/unchecked.png";
    box.addEventListener('click', changeBoxToSelected);
  }
 
  for(const index in answerMap){
    delete answerMap[index];
  }
}

//calcola la personalità a seconda delle risposte date alle tre domande
function resultPersonality(){
  if(answerMap.one === answerMap.two || answerMap.one === answerMap.three)
    return answerMap.one;
  if(answerMap.two === answerMap.one || answerMap.two === answerMap.three)
    return answerMap.two;
  if(answerMap.three === answerMap.one || answerMap.three === answerMap.two)
    return answerMap.three;

  return answerMap.one; //restituisce la personalità data dalla risposta alla prima domanda qualora le personalità delle tre risposte siano tutte diverse
}

//mostra il blocco del risultato rimuovendo la classe hidden ad esso associata e aggiungendo il title e il contents 
//della personalità corrispondente calcolata dalla resultPersonality. In caso di click sul bottone chiamo la funzione che restarta il quiz
function showResult(){
  const personality = resultPersonality();

  const resultBlock = document.querySelector('#result-block');
  resultBlock.querySelector('h1').textContent = RESULTS_MAP[personality].title;
  resultBlock.querySelector('p').textContent = RESULTS_MAP[personality].contents;
  resultBlock.classList.remove('hidden');

  const resultButton = document.querySelector('#result-button');
  resultButton.addEventListener('click', restartAll);
  
}

//funzione che restituisce la grandezza della mappa delle risposte
function resultLenght(){
  let i = 0;
  for(const s in answerMap)
    i++;
  return i;
}

//funziona chiamata da takenBox che controlla tutti i div della choice-grid e compara il loro choiId con quello dell'immagine selezionata,
// se i due valori sono diversi allora saranno i box non selezionati e aggiunge loro la classe opacity, 
// rimuove la selected e rimette il checkbox unchecked
function opacity(selectedImage){
  const selectedBox = selectedImage.dataset.choiceId;

  const allBoxes = selectedImage.parentNode.querySelectorAll('div');

  for(const unselectedBox of allBoxes){
    if( unselectedBox.dataset.choiceId !== selectedBox){
      unselectedBox.classList.add('opacity');
      unselectedBox.classList.remove('selected');
      unselectedBox.querySelector('.checkbox').src = "images/unchecked.png";
    }
  }
}

//funzione chiamata al 'click' di un box, a ogni immagine selezionata rimuovo la classe opacity, 
// cambio il checkbox a checked e aggiungo la classe selected 
function changeBoxToSelected(event){
  const selectedImage = event.currentTarget;
  selectedImage.classList.remove('opacity');
  selectedImage.classList.add('selected');

  const checkImage = selectedImage.querySelector('.checkbox');
  checkImage.src = "images/checked.png";

  opacity(selectedImage);

  answerMap[selectedImage.dataset.questionId] = selectedImage.dataset.choiceId; //memorizzo la personalità corrispondente alla risposta scelta
  if(resultLenght() === 3){   //controllo se sono state effettuate tutte e tre le scelte, in caso rimuovo il listener alla funzione inziale e chiamo la funzione per mostrare il risultato
    for(const box of boxes){
      box.removeEventListener('click', changeBoxToSelected);
    }
    showResult();
  }  
}

// MAIN //

//creo la mappa delle risposte dove answerMap[one]='personalità corrispondente alla prima risposta' ovvero answerMap[questionId]=choiceId
const answerMap = {};

//seleziono i div della choice-grid e itero per ogni box aggiungendo il listener all'evento 'click' e chiamando la funzione changeBoxToSelected
const boxes = document.querySelectorAll('.choice-grid div')
for(const box of boxes){
  box.addEventListener('click', changeBoxToSelected);
}