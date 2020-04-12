import button1 from '../style/buttonRouge.module.css'
import button2 from '../style/buttonVert.module.css'
    
function Buttons(){
    return (
        <>
            <button type="button" className={button1.button}>Button 1</button>
            <button type="button" className={button2.button}>Button 2</button>
        </> 
    )
}

export default Buttons;