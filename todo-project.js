const form = document.forms['add-note'];
console.log(form)
 const btn =   document.querySelector('#btn');

 const display = document.querySelector('.display')

 const search = document.forms['search-notes'].querySelector('#search');



 


//  search notes 
search.addEventListener('keyup', () => {
  const value  = search.value.toLowerCase();

  const  lists =  display.getElementsByTagName('li');

  Array.from(lists).forEach( (list) => {
    const first = list.firstElementChild.textContent;

    if(first.toLowerCase().includes(value)) {
      list.style.display = 'block';
    } else {
       list.style.display = 'none';
    }
  })
})



// hide all notes 

const hide = document.forms['search-notes'].querySelector('#hide');

hide.addEventListener('change', (e) => {

  if(e.target.checked) {
    display.style.visibility = 'hidden'
  } else {
    display.style.visibility = 'visible'
  }
})



// counting task function 

const counting = document.querySelector('.taskcount');
let count = 0;

const displaycount = () => {

counting.innerText = count;
  
}

// congracts 






//  add note
 const addnote = (note) => {

  display.innerHTML += `
        <div class="task">
          <input type="checkbox" class="task-check">
          <span class="taskname">${note}</span>
          <button class="edit">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
           <button class = "delete">
            <i class="fa-solid fa-trash"></i>
            </button>
        </div>`

        count += 1;
        displaycount();


        // edit button
         const edit = document.querySelectorAll('.edit');

          edit.forEach(button => {
            button.onclick = () => {
              const typing = form.querySelector('#typing');
                            
              typing.value = button.previousElementSibling.innerText;
              button.parentElement.remove();  

              
              count -= 1;
              displaycount();

              

            }
          })
          // delete button
          const deletebtns = document.querySelectorAll('.delete');
         
          deletebtns.forEach( button => {

            button.onclick = () => {
              button.parentElement.remove();

              count -= 1;
              displaycount();


              const li = button.parentElement;
              console.log(li)
              deletelocal(li)
            
            }
          })

          // checkbox button 

          const  checkbox = document.querySelectorAll('.task-check'); 

          checkbox.forEach( button => {
            button.onclick = () => {

              // button.nextElementSibling.classList.toggle('complete');

              if (button.checked) {
                button.nextElementSibling.classList.add('complete');
                count -= 1;
              } else {
                count += 1;
                button.nextElementSibling.classList.remove('complete');

              }

          
              displaycount();  
            }
          })

          // congracts
         const finish = document.querySelector('.finish');

        finish.addEventListener('click', (e) => {
          e.preventDefault()
    
          const congracts = document.querySelector('.congracts');
          const loss = document.querySelector('.loss');

          console.log(count)

          if (count <= 0) {
            congracts.style.display = 'block';
            loss.style.display = 'none' ;
          } else if (count > 0) {
            loss.style.display = 'block' ;
            congracts.style.display = 'none' ;
          }

          displaycount()

        })


           
 }

//   input validation else add note
btn.addEventListener('click', (e) => {
  e.preventDefault();
  const typing = form.querySelector('#typing');

  if (typing.value == '') {
    // typing.classList.add('error');
    alert('add note masaa!')
  }
  else {
    addnote([typing.value]);
    save([typing.value]);
    typing.value = '' ;
  
    
  }


})

// keep data when loadded
document.addEventListener("DOMContentLoaded", () => {

  
  let old = [];

  if(localStorage.getItem('notes') == null) {
    old = [];
  } else {
    old = JSON.parse(localStorage.getItem('notes'))
  }

  old.forEach(addnote)
  // old.forEach(note => {

  // })

});




const save = (note) => {

  if(note.length < 0) {
    return;
  }

  let old = [];

  if(localStorage.getItem('notes') == null) {
    old = [];
  } else {
    old = JSON.parse(localStorage.getItem('notes'))
  }



  old.push(note);

  console.log(old);

  localStorage.setItem('notes', JSON.stringify(old));
}

const deletelocal = (del)  => {


  let old = [];

  if(localStorage.getItem('notes') == null) {
    old = [];
  } else {
    old = JSON.parse(localStorage.getItem('notes'))
  }

  old.map((data, index) => {
    if (data[0] == del.textContent.trim()) {
      old.splice(index, 1)

      return old;
    }
  })

  localStorage.setItem('notes', JSON.stringify(old));

  
  
}