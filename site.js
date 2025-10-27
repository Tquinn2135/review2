
const characterP = document.querySelector('#characterP')
const buttonsDiv = document.querySelector('#buttons')

;(async () => {
   
    const getCharacter = async id => {
        const url = `https://swapi.dev/api/people/${id}`
        const result = await fetch(url)
        const character = await result.json()
        return { id, ...character }
    }

    const createButton = async id => {
                const button = document.createElement('button')
                const character = await getCharacter(id)
                button.textContent = character.name                
                button.addEventListener('click', async () =>{
                    await renderCharacter(character)
                })
                return button
        }

    const renderCharacter = async ({ name, id }) => {
        characterP.textContent = name
        buttonsDiv.innerHTML = ''

        if(id > 1) {
            const previousButton = await createButton(id - 1)
            buttonsDiv.append(previousButton)
        } 

        const nextButton = await createButton(id + 1)
        buttonsDiv.append(nextButton)
        

    
    }    

    //show Luke Skywalker at the start
   await renderCharacter(await getCharacter(1))

})()