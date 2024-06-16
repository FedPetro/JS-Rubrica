// creare le variabili per bottoni e div padre con i vari querySelector
// creare una funzione (metodo dell'oggetto) che mi permetta di creare un nuovo div per ogni contatto, in questo caso 4
// all'elemento creato, dai il nome del contatto corrispondente sostituendo nome e numero del file HTML
// al click sul pulsante 'mostra contatti', mostra i contatti creati tramite la funzione qui sopra invocandola nell'evento del click sul pulsante.
// svuota il div in maniera che crea gli elementi solo una volta con un click e non tutte le volte che clicco sdoppiandoli
// 

//querySelector();
//createElement('');
//appendChild();
//innerHTML = '';




//creazione variabili che serviranno per tutto il progetto
let divWrapper = document.querySelector('#divWrapper'); //catturo div dove appenderò le cards
let addContactBtn = document.querySelector('#addContact'); //catturo pulsante aggiungi contatto
let showContactBtn = document.querySelector('#showContact'); //catturo pulsante mostra contatto
let inputName = document.querySelector('#inputName'); //catturo input dove inserisco il nome
let inputNumber = document.querySelector('#inputNumber'); //catturo input dove inserisco il numero

let rubrica = {
    contacts : [
        // {name: 'Federico', number: '123456'  },
        // {name: 'Francesco', number: '246810' },
        // {name: 'Nicola', number: '3691215' },
        // {name: 'Marco', number: '48121620' },     
    ],

    createCards : function(){ //creazione card per ciascun contatto
        divWrapper.innerHTML = ''; //prima di creare le cards, svuota il div dove saranno appese. Così facendo non si creeranno le stesse cards ogni volta che clicco su mostra contatti
        this.contacts.forEach((contact) => { //accedi a ogni contatto dell'array contacts
            let divCard = document.createElement('div'); //crea un div per ogni contact
            divCard.classList.add('d-flex', 'w-100', 'bg-primary', 'mt-3', 'justify-content-around', 'rounded', 'text-white', 'card-margin'); //aggiungi classi bootstrap
            divCard.innerHTML = `
            <p class="name" id="">${contact.name}</p>
            <p class="number" id="">${contact.number}</p>
            <i class="bi bi-trash-fill icon" "id="${contact.name}"></i>` //do un id con valore che è uguale al contatto corrispondente (esempio Marco, 3325782943 id="Marco")
            divWrapper.appendChild(divCard); //appendilo al div creato a inizio funzione
        })
        let iconsDelete = document.querySelectorAll('.bi-trash-fill'); //catturo qui dentro le icone per cancellare perchè esistono solo dopo la creazione del divCard
        iconsDelete.forEach((icon) =>{ //cicla ogni icona
            let nameId = icon.id; //salvo gli id dentro una variabiel
            icon.addEventListener('click', () =>{ //aggiungi l'evento al click sulla singola icona
                this.removeContact(nameId); // solo in console cancellerà il contatto dall'array
                this.createCards(); //lancia il metodo di creazione delle carte ma aggiorandolo se cancello un contatto
            })

        })
    },

    addContact : function(newName, newNumber){ //funzione creazione contatto. I parametri verranno presi dagli input
        this.contacts.push({name: newName, number: newNumber}) //pusherò all'interno dell'array i nuovi contatti che gli passerò io creando però un nuovo oggetto con 2 attributi: name e number 
        this.createCards(); //quindi mostra le card aggiornate rilanciando il metodo createCards
    },

    removeContact : function(removedName){ //funzione per cancellare il contatto
        let names = this.contacts.map((contact) => contact.name); //crea un array contenente solo i nomi degli oggetti di rubrica
        let index = names.indexOf(removedName); //prendi l'indice del contatto che voglio cancellare
        this.contacts.splice(index, 1); //rimuovi l'elemento con quell'indice corrispondente al nome (vedi metodo splice)
    }
}

let confirm = false; //variabile che funge da interruttore per mostrare e nascondere i contatti sul pulsante Mostra Contatti

//evento che mostra card quando clicco su Mostra Contatti. Usa il metodo dell'oggetto rubrica
showContactBtn.addEventListener('click', () => {
    if (confirm == false){ //se non vedo le cards non le vedo... 
        rubrica.createCards();  //...mostrale.            Metodo di rubrica quindi uso la dot syntax per richiamarlo
        confirm = true; // Poi cambia il valore dell'interruttore e..
        // showContactBtn.innerHTML = 'Nascondi contatti'; // ...cambia il text del pulsante in Nascondi contatti
        showContactBtn.innerHTML = `Nascondi contatti <i class="bi bi-card-list ms-2"></i>`; // ...cambia il text del pulsante in Nascondi contatti aggiungendo anche l'icona
    } else{ //se invece le vedo...
        divWrapper.innerHTML = ''; //...svuota il div nascondendole...
        confirm = false; // ...e cambia di nuovo il valore dell'interrutore nascondendole... 
        showContactBtn.innerHTML = `Mostra contatti <i class="bi bi-card-list ms-2"></i>`; //...cambia il text del pulsante in Nascondi contatti aggiungendo anche l'icona
    }
});

addContactBtn.addEventListener('click', () => { //quando clicko sul pulsante lancia il metodo e crea il contatto
    if (inputName.value != '' && inputNumber.value != '') { //esegui un controllo dove solo se ci sarà qualcosa dentro agli input allora esegui tutte le istruzioni altrimenti... riga 78   
        let name= inputName.value; //prendo la variabile inputName, l'assegno ad una nuova variabile con un nome più parlante (serve solo per chiarezza)
        let number= inputNumber.value; //prendo la variabile inputName, l'assegno ad una nuova variabile con un nome più parlante (serve solo per chiarezza)
        rubrica.addContact(name, number); //i parametri reali saranno quindi i valori delle variabili qui sopra
        inputName.value = ''; //svuota l'input altrimenti rimarrà il nome dentro e cliccando su add contact lo aggiungerà di nuovo
        inputNumber.value = ''; //svuota l'input altrimenti rimarrà il numero dentro e cliccando su add contact lo aggiungerà di nuovo
        if(confirm == false){
            confirm = true; //gli cambio subito il valore per non bloccarlo come nell evento di showContactBtn
            showContactBtn.innerHTML = `Nascondi contatti <i class="bi bi-card-list ms-2"></i>`; //Cambia il contenuto del pulsante così da mostrare Nascondi alla vista della lista
        }
    }else{
        alert('Inserisci un Nome e un Numero')
    }
})
