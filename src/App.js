import "./App.css";
import contactsJson from "./contacts.json";
import { useState } from "react";

function App() {
  // Here we're importing 5 initial contacts from the ContactsJson, a file that contains objects
  // Notice that from APIs we also get back JSONs as response
  const [contacts, setContacts] = useState([
    contactsJson[0],
    contactsJson[1],
    contactsJson[2],
    contactsJson[3],
    contactsJson[4],
  ]);

  // Here we have a function that generates an new array with all the contacts that weren't inserted in the function
  // Doing so is *equivalent* to deleting a contact
  const deleteContact = (contactId) => {
    const filteredContacts = contacts.filter((contact) => {
      // It's id, not _id!
      return contact.id !== contactId;
    });
    setContacts(filteredContacts);
  };

  // Here we Add a random contact
  const addRandomContact = () => {
    // We need a copy of the array to be able to change it (in react)
    const newContacts = [...contacts];

    // get a random number of the index of the Array

    const randomIndex = Math.floor(Math.random()* contactsJson.length)
    const randomContact = contactsJson[randomIndex]

    // check if newContacts has already used an randomContact
    if(!newContacts.includes(randomContact)) {
    // The push() method adds the specified elements to the end of an array and returns the new length of the array.
    newContacts.push(randomContact)

 
  
    // and we set the copy to the array (this is the only way we can change variables that have useState)
    setContacts(newContacts);
    }
   
  };

  const sortName = () => {
    const sortedName = [...contacts].sort((a,b) => 
      a.name > b.name ? 1 : -1,
    )
      setContacts(sortedName)
  }

  const sortPopularity = () => {
    const sortedPopularity = [...contacts].sort((a,b) => 
      a.popularity < b.popularity ? 1 : -1,
    )
      setContacts(sortedPopularity)
  }

  

  /*const arr = ['Arsenal', 'Manchester United', 'Chelsea', 'Liverpool',
'Leicester City', 'Manchester City', 'Everton', 'Fulham', 'Cardiff City'];
const removeRandom = (array) => {
   while(array.length){
      const random = Math.floor(Math.random() * array.length);
      const el = array.splice(random, 1)[0];
      console.log(el);
   }
};
removeRandom(arr);*/

  // Right now, this addRandomContact always returns the last one
  // If you really want a random one, check this link:
  // https://www.tutorialspoint.com/javascript-remove-random-item-from-array-and-then-remove-it-from-array-until-array-is-empty#:~:text=We%20are%20required%20to%20create,at%20that%20index%20using%20Array.

  return (
    <div className="App">
      <h2>IronContacts</h2>
      <div className="top-buttonimg">
      <div className="top-button">
        <img src="415-4156276_collection-of-free-stars-transparent-hollywood-transparent-hollywood.png" alt=""></img>
      <button onClick={() => addRandomContact()}> Add Random Contact </button>
        <img src="415-4156276_collection-of-free-stars-transparent-hollywood-transparent-hollywood.png" alt=""></img>
      <button onClick={() => sortPopularity()}> Sort by Popularity </button>
        <img src="415-4156276_collection-of-free-stars-transparent-hollywood-transparent-hollywood.png" alt=""></img>
      <button onClick={() => sortName()}> Sort by Name </button>
      </div>
      </div>
      <div className="top-info">
        <div className="div-imgtop">
      <img src="\glpg-great-lakes-psychology-group-counseling-therapy-blog-celebrities-mental-health-awareness.jpeg" alt=""></img>
      </div>
      <table>
        <thead>
          <tr className="info">
            <th><h3>Picture</h3></th>
            <th><h3>Name</h3></th>
            <th><h3>Popularity</h3></th>
            <th><h3>Won Oscar</h3></th>
            <th><h3>Won Emmy</h3></th>
            <th><h3>Actions</h3></th>
          </tr>
        </thead>

        {/*
          Found an error here, inside the table we can't have random divs,
          we must only have table things like <tbody>, <tr>
          If we want other HTML elements, they are always inside <td> or <th>
        */}
        <tbody>
          {contacts.map((contact) => {
            return (
              <tr key={contact.id}>
                {/*
                              ^ Another error, it's id, not _id (take a look at the json)
                              Usually _id is when we're in MongoDB
                          */}
                <th>
                  <img
                    src={contact.pictureUrl}
                    className="contact-picture"
                    alt=""
                  />
                </th>
                <td>{contact.name}</td>
                <td>{contact.popularity}</td>
                <td>{contact.wonOscar ? "🏆" : ""}</td>
                <td>{contact.wonEmmy ? "🏆" : ""}</td>
                <td>
                  {/*
                        // It's id, not _id! down here in deleteContact!
                   */}
                   <div className="bottom-button">
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                  </div>
                </td>

                {/*
                            Found a very important bug here:
                            Any HTML content that is inside a table must be in <td> or <th>
                            The <button> wasn't inside the <td></td> so I moved it!
                          */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
}

/*const [sortContact, setSort] = useState(0);
const [sortPopularity, setPopularity] = useState(0);
const [removeContacts, setCount] = useState(0);
<button onClick={() => sortContact()}> SortContact </button>
      <button onClick={() => sortPopularity()}> SortPopularity </button>
      <button onClick={() => removeContacts()}> Delete </button>
      */

export default App;
