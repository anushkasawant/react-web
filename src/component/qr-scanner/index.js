import React from 'react'
import { Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles'
// import '@zxing/library'

const styles = {
    spacing:{
        display: 'flex',
      
    },
    button:{
        margin:'1.0rem'
    },
    video:{
        width:'20rem',
        height:'350px',
        border:'1px solid black'
    },
    margin:{
        margin: '1.0rem',
    }
}

function QrScanner(props) {
        const { classes } = props 
      

        const handleClick =() =>{
           let selectedDeviceId
           const codeReader = require('@zxing/library/esm5/browser/BrowserMultiFormatReader')
            const reader = new codeReader.BrowserMultiFormatReader()
            reader.listVideoInputDevices()
            .then((videoInputDevices)=>{
                const sourceSelect = document.getElementById('sourceSelect')
                selectedDeviceId = videoInputDevices[0].deviceId
                if(videoInputDevices.length >= 1){
                    videoInputDevices.forEach((element)=>{
                        const sourceOption = document.createElement('option')
                        sourceOption.text = element.label
                        sourceOption.value = element.deviceId
                        sourceSelect.appendChild(sourceOption)
                    })
                    sourceSelect.onchange = () =>{
                        selectedDeviceId = sourceSelect.value
                    }
                    const sourceSelectPanel = document.getElementById('sourceSelectPanel')
                    sourceSelectPanel.style.display = 'block'
                }
                document.getElementById('startButton').addEventListener('click',()=>{
                    reader.decodeFromInputVideoDevice(selectedDeviceId,'video')
                    .then((result)=>{
                        console.log(result)
                        document.getElementById('result').textContent = result.text
                    })
                    .catch((error)=>{
                        document.getElementById('result').textContent = error
                    })
                })
                document.getElementById('resetButton').addEventListener('click',()=>{
                    document.getElementById('result').textContent = ''
                    reader.reset()
                })
            })
            .catch((error)=>{
                console.log(error)
                document.getElementById('result').textContent = error
            })
          
        }
    return (
        <>
           <div className={classes.margin}>
           <Typography variant="h6">SCAN QR CODE</Typography>  
            <Button className={classes.button} variant="inherit" onClick={handleClick}>Load Module</Button>
            <div className={classes.display}>
                <Button variant="contained" color="primary" className={classes.button} id="startButton">Start</Button>
                <Button variant="contained" color="secondary" className={classes.button} id="resetButton">Stop</Button>
            </div>
            <div className={classes.button}>
                <video id="video" className={classes.video}></video>
            </div>
            <div id="sourceSelectPanel" style={{display:'none'}}>
                <label for="sourceSelect">Change Video Source</label>
                <select id="sourceSelect" style={{maxWidth:'400px'}}></select>
            </div>
            <label for="result">Result</label>
            <blockquote>
                <p id="result"></p>
            </blockquote>
           </div>
        </>
    )
}
export default withStyles(styles)(QrScanner)
