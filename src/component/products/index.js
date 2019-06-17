import React, { useState } from 'react'
import { Typography, Button } from '@material-ui/core'

function Products() {
    const [like,setLike] = useState(0)

    const handleSubmit = () =>{
        setLike(like+1)
    }

    return (
        <>
            <Typography>Hello </Typography>  
            <Button variant="contained" onClick={handleSubmit}><Typography>{like}</Typography> LIke</Button>
        </>
    )
}
export default Products 
