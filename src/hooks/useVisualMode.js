import { useState } from "react";

export default function useVisualMode(initialMode) {
    const [mode, setMode] = useState(initialMode);
    const [history, setHistory] = useState([initialMode]);

    function transition(newMode, replace = false) {
        if(replace){
            setMode(newMode);
        } else{
        setMode(newMode);
        let newHistory = [...history];
        newHistory.push(newMode);
        setHistory(newHistory);
        }
    }

    function back() {
        let newHistory = [...history];
        if(newHistory.length < 2) return
        newHistory.pop();
        setHistory(newHistory);
        setMode(newHistory[newHistory.length - 1]);
        
    }
    

    return {mode, transition, back};
}