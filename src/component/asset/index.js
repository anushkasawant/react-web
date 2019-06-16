import React, { useState } from 'react'
import { Typography, Button } from '@material-ui/core'

function Asset() {
    const [like,setLike] = useState(0)

    const handleSubmit = () =>{
        setLike(like+1)
    }

    return (
        <>
            <Typography>Hello World</Typography>  
            <Button variant="outlined" onClick={handleSubmit}><Typography>{like}</Typography> LIke</Button>
        </>
    )
}
export default Asset 
