
export default function Input({type, name}) {
  return (
    <>            
      <div> 
        <p>{type}</p>
        <input type="text" name={name}/>
      </div>
      {type==='RG:' ? <h2>Endereço</h2> : <></>}
    </>
  )
};