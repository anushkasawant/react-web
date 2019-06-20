import React,{ useEffect } from 'react'
import { Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles'

const styles = {
    spacing: {
        display: 'flex',

    },
    button: {
        margin: '1.0rem'
    },
    video: {
        width: '20rem',
        height: '350px',
        border: '1px solid black'
    },
    margin: {
        margin: '1.0rem',
    }
}

function QrScanner(props) {
    const { classes } = props

    useEffect(()=>{
        let selectedDeviceId
        const codeReader = require('@zxing/library/esm5/browser/BrowserMultiFormatReader')
        const reader = new codeReader.BrowserMultiFormatReader()
         reader.listVideoInputDevices()
         .then((videoInputDevices)=>{
                const sourceSelect = document.getElementById('sourceSelect')
                 if(videoInputDevices){
                     selectedDeviceId = videoInputDevices[0].deviceId
                 }
                 if(videoInputDevices.length >=1){
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
                //  reader.decodeFromInputVideoDevice(selectedDeviceId,'video')
                //  .then((result)=>{
                //      document.getElementById('result').textContent = result
                //  })
                //  .catch(error=>{
                //      document.getElementById('result').textContent = error
                //      console.log(error)
                //  })
               
         })
         .catch((error)=>{
              document.getElementById('result').textContent = error
              console.log(error)
         })
    },[])

    const handleGenerateQrcode = () =>{
        const svgDataUrl = require('svg-to-dataurl')
        const code = require('@zxing/library/esm5/browser/BrowserQRCodeSvgWriter')
        const codeWriter =new code.BrowserQRCodeSvgWriter()
        
        const input = 'https://orgz.app'
        let svg = codeWriter.writeToDom('#qr',input,300,300)
        const svgElement = codeWriter.write(input,300,300)
        const data  = svgDataUrl(svgElement)
         fetch(data)
         .then(result=>result.blob())
         .then(blob=>{
             console.log(blob)
         })
        }
    return (
        <>
            <div className={classes.margin}>
                <Typography variant="h6">SCAN QR CODE</Typography>
                {/* <Button className={classes.button} variant="inherit" onClick={handleClick}>Load Module</Button> */}
                <div className={classes.display}>
                    {/* <Button variant="contained" color="primary" className={classes.button} id="startButton">Start</Button> */}
                    <Button variant="contained" color="secondary" className={classes.button} onClick={handleGenerateQrcode}>Generate Qr code</Button>
                </div>
                <div className={classes.button}>
                    <video id="video" className={classes.video}></video>
                </div>
                <div id="sourceSelectPanel" style={{ display: 'none' }}>
                    <label for="sourceSelect">Change Video Source</label>
                    <select id="sourceSelect" style={{ maxWidth: '400px' }}></select>
                </div>
                <label for="result">Result</label>
                <blockquote>
                    <p id="result"></p>
                </blockquote>
                <p id="qr"></p>
            </div>
        </>
    )
}
export default withStyles(styles)(QrScanner)
