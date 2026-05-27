import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ExpertForm from "./components/ExpertForm";
import ExpertList from "./components/ExpertList";
import AuthModal from "./components/AuthModal";

function App() {

const [experts, setExperts] = useState([]);
const [filtered, setFiltered] = useState([]);

const [name, setName] = useState("");
const [skill, setSkill] = useState("");
const [location, setLocation] = useState("");

const [search, setSearch] = useState("");

const [editId, setEditId] = useState(null);

const [showAuth, setShowAuth] = useState(false);

const [type, setType] = useState("");

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

/* FETCH EXPERTS */

const fetchExperts = async () => {

try {

const res = await axios.get(
"http://localhost:5000/experts"
);

setExperts(res.data);
setFiltered(res.data);

} catch(error){

console.log(error);

}

};

useEffect(() => {
fetchExperts();
}, []);

/* ADD OR UPDATE */

const saveExpert = async () => {

if(!name || !skill || !location){

alert("Fill all fields");
return;

}

try {

if(editId){

await axios.put(

`http://localhost:5000/experts/${editId}`,

{
name,
skill,
location
},

{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
}

);

alert("Expert Updated");

setEditId(null);

}else{

await axios.post(

"http://localhost:5000/experts",

{
name,
skill,
location
},

{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
}

);

alert("Expert Added");

}

setName("");
setSkill("");
setLocation("");

fetchExperts();

}catch(error){

alert("Login Required");

}

};

/* DELETE */

const deleteExpert = async(id)=>{

try{

await axios.delete(

`http://localhost:5000/experts/${id}`,

{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
}

);

alert("Expert Deleted");

fetchExperts();

}catch(error){

alert("Login Required");

}

};

/* EDIT */

const editExpert = (expert)=>{

setName(expert.name);
setSkill(expert.skill);
setLocation(expert.location);

setEditId(expert._id);

};

/* SEARCH */

const searchExpert = ()=>{

const result = experts.filter((e)=>

e.location
.toLowerCase()
.includes(
search.toLowerCase()
)

);

setFiltered(result);

};

/* LOGIN */

const openLogin = ()=>{

setType("Login");
setShowAuth(true);

};

/* SIGNUP */

const openSignup = ()=>{

setType("Signup");
setShowAuth(true);

};

/* CLOSE */

const close = ()=>{

setShowAuth(false);

};

/* VALIDATION */

const validate = async()=>{

const regex =
/\S+@\S+\.\S+/;

if(!regex.test(email)){
alert("Invalid Email");
return;
}

if(password.length < 6){
alert("Password minimum 6");
return;
}

try{

/* SIGNUP */

if(type==="Signup"){

await axios.post(
"http://localhost:5000/users/register",
{
email,
password
}
);

alert("Signup Success");

/* LOGIN */

}else{

const res = await axios.post(
"http://localhost:5000/users/login",
{
email,
password
}
);

localStorage.setItem(
"token",
res.data.token
);

alert("Login Success");

}

close();

}catch(error){

alert("Invalid Credentials");

}

};

return (

<>

<Navbar
openLogin={openLogin}
openSignup={openSignup}
/>

<Hero />

{/* ABOUT */}

<section
id="about"
className="section"
>

<h2>About HirePoint</h2>

<p>
HirePoint is a modern hiring platform
that helps users connect with skilled
experts nearby based on location and
professional skills.
</p>

</section>

{/* FEATURES */}

<section
id="features"
className="section"
>

<h2>Features</h2>

<div className="cards">

<div className="card">
<h3>JWT Authentication</h3>
<p>Secure Login System</p>
</div>

<div className="card">
<h3>Location Search</h3>
<p>Find nearby experts easily</p>
</div>

<div className="card">
<h3>CRUD Operations</h3>
<p>Add Edit Delete Experts</p>
</div>

<div className="card">
<h3>MongoDB Database</h3>
<p>Stores users and experts</p>
</div>

</div>

</section>

{/* SEARCH */}

<section className="section">

<h2>Search Experts</h2>

<input
placeholder="Search by Location"
value={search}
onChange={(e)=>
setSearch(e.target.value)
}
/>

<button onClick={searchExpert}>
Search
</button>

</section>

{/* ADD EXPERT */}

<section className="section">

<h2>
{
editId
?
"Update Expert"
:
"Add Expert"
}
</h2>

<ExpertForm
name={name}
skill={skill}
location={location}
setName={setName}
setSkill={setSkill}
setLocation={setLocation}
saveExpert={saveExpert}
editId={editId}
/>

</section>

{/* DISPLAY */}

<section className="section">

<h2>Available Experts</h2>

<ExpertList
filtered={filtered}
editExpert={editExpert}
deleteExpert={deleteExpert}
/>

</section>

{/* FOOTER */}

<footer id="footer">

<h2>HirePoint</h2>

<p>
Professional Expert Hiring Platform
</p>

</footer>

{/* AUTH MODAL */}

{
showAuth && (

<AuthModal
type={type}
close={close}
validate={validate}
setEmail={setEmail}
setPassword={setPassword}
/>

)
}

</>

);

}

export default App;