import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    
    const dots = []
    switch(props.value) {
        case 1:
            dots.push(<div className="die-dot center middle" />)
            break;
        case 2:
            dots.push(<div className="die-dot top left" />)
            dots.push(<div className="die-dot bottom right" />)
            break;
        case 3:
            dots.push(<div className="die-dot top left" />)
            dots.push(<div className="die-dot center middle" />)
            dots.push(<div className="die-dot bottom right" />)
            break;
        case 4:
            dots.push(<div className="die-dot top left" />)
            dots.push(<div className="die-dot top right" />)
            dots.push(<div className="die-dot bottom left" />)
            dots.push(<div className="die-dot bottom right" />)
            break;
        case 5:
            dots.push(<div className="die-dot top left" />)
            dots.push(<div className="die-dot top right" />)
            dots.push(<div className="die-dot bottom left" />)
            dots.push(<div className="die-dot bottom right" />)
            dots.push(<div className="die-dot center middle" />)
            break;
        case 6:
            dots.push(<div className="die-dot top left" />)
            dots.push(<div className="die-dot top right" />)
            dots.push(<div className="die-dot middle left" />)
            dots.push(<div className="die-dot middle right" />)
            dots.push(<div className="die-dot bottom left" />)
            dots.push(<div className="die-dot bottom right" />)
            break;
    }
    
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            {dots}
        </div>
    )
}