function ExpertForm({

name,
skill,
location,

setName,
setSkill,
setLocation,

saveExpert,
editId

}){

return(

<>

<input
placeholder="Name"
value={name}
onChange={(e)=>
setName(e.target.value)}
/>

<input
placeholder="Skill"
value={skill}
onChange={(e)=>
setSkill(e.target.value)}
/>

<input
placeholder="Location"
value={location}
onChange={(e)=>
setLocation(e.target.value)}
/>

<button onClick={saveExpert}>

{
editId
?
"Update Expert"
:
"Add Expert"
}

</button>

</>

);

}

export default ExpertForm;