


const getFetch = async ( arg1 ) => {
  await fetch(`${arg1}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(`Your GET request for ${arg1} returned ${data}`);
        return data
      })
      .catch(err => {
        console.log(`Error with your GET fetch to ${arg1}`)
      })
  }


  const postFetch = async ( arg1, arg2 ) => {
    fetch(`${arg1}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ arg2 })
    })
        .then((res) => res.json())
        .then((data) => {
          console.log(`Your POST request for ${arg1}returned ${data}`);
          return data
        })
        .catch(err => {
          console.log(`Error with your POST fetch to ${arg1}`)
        })
    }

    const deleteFetch = async ( arg1 ) => {
      fetch(`${arg1}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
          .then((res) => res.json())
          .then((data) => {
            console.log(`Your DELETE request for ${arg1}returned ${data}`);
            return data
          })
          .catch(err => {
            console.log(`Error with your DELETE fetch to ${arg1}`)
          })
      }

      const putFetch = async ( arg1, arg2 ) => {
        fetch(`${arg1}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ arg2 })
        })
            .then((res) => res.json())
            .then((data) => {
              console.log(`Your PUT request for ${arg1}returned ${data}`);
              return data
            })
            .catch(err => {
              console.log(`Error with your PUT fetch to ${arg1}`)
            })
        }



    export {postFetch}
    export {getFetch}
    export {deleteFetch}
    export {putFetch}