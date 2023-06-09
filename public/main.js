
const update = document.querySelector('#update-button')

update.addEventListener('click', _ =>{

    fetch('/quotes',{
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vader',
            quote: 'I find your lack of faith disturbing.'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        console.log(response)
        window.location.reload(true)
      })
      
      .catch(error => console.error(error))
})

//Creating click event for delete and sending the query we would like for deletion using delete method inside our fetch
const deleteButton = document.querySelector('#delete-button')
//display for message incase no quote was found for deletion
const messageDiv = document.querySelector('#message')


deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Darth Vader'
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'No quote to delete') {
            messageDiv.textContent = 'No Darth Vader quote to delete'
        }
        else {
            window.location.reload()
        }
        
      })
      .catch(error => console.error(error))
  })