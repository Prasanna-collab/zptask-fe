import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [details, setDetails] = useState({
    name: "",
    description: "",
    dob: "",
  });

  const handleInput = (user) => {
    setDetails((value) => {
      return ({ ...value, ...user });
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get("http://localhost:5000/user")  
    if (response){
      setDetails(response.data);
    }
  console.log(details)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/user", {
      name: details.name,
      dob: details.dob,
      description: details.description
    });
  };

  return (
    <div className="mother">
      <div className="child">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type='text'
              placeholder="Your name"
              value={details.name}
              onChange={(e) => handleInput({ name: e.target.value })}
            />
          </div>
          <div>
            <input
              type="date"
              placeholder="Your DOB"
              value={details.dob}
              onChange={(e) => handleInput({ dob: e.target.value })}
            />
          </div>
          <div>
            <textarea
              rows={5}
              cols={10}
              placeholder="What's up in your mind"
              value={details.description}
              onChange={(e) => handleInput({ description: e.target.value })}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    
      
         
<table class="table table-striped table-light">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">DOB</th>
      <th scope="col">Age</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
  {details.length &&
            details.map((e) => {
              return (
                <tr key={e._id}>
                  <td>{e.name}</td>
                  <td>{e.dob}</td>
                  <td>{e.age}</td>
                  <td>{e.description}</td>
                </tr>
              );
            })}
  </tbody>
</table>
         
        
      </div>
  
  );
}

export default App;
