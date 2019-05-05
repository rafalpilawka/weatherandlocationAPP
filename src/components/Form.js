import React from 'react'

const Form=({clicked, value , changed, submit})=> {

    

  return ( 
      <div>

        <form action="" onSubmit={submit}>
            <div className="row s6">
            <div className="input-field col s6 offset-s3">
                    <input 
                        type="text" 
                        value={value}
                        placeholder="Type city"
                        onChange={changed}/>      
            </div>
            </div>
        </form>
        
      </div>
      
      
   
  )
}

export default Form
