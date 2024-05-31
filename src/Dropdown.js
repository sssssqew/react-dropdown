import React, { useState, useEffect, forwardRef } from 'react'
import './Dropdown.css'

const Dropdown = forwardRef(({ page, menus, layout, closeDropdown, sx, itemStyle, duration }, ref) => {
    const [fade, setFade] = useState("") // 액티브 클래스 
    const [id, setId] = useState(null) // 현재 호버된 메뉴
    const [pos, setPos] = useState({x: 0, y: 0}) // 드롭다운 위치
    const [items, setItems] = useState(null) // 메뉴목록

    const handleClick = () =>{
        closeDropdown()
        setId(null)
    }
    
    useEffect(() => {
        let timer = null
        if(page){
            timer = setTimeout(() => {
                setFade('active')
                setPos({...layout}) // 드롭다운이 사라진후 위치변경
                setItems(menus) // 드롭다운이 사라진후 메뉴변경
            }, duration) // 클린업과 동시에 실행되지 않도록 시간차를 둠
        }
        
        return () => {
            clearTimeout(timer)
            setFade("")
        }
    }, [page])

    return (
        <div ref={ref} className={`dropdown-container ${fade}`} style={{...sx, left: `${pos.x}px`, top: `${pos.y}px`}}>
            <ul>
                {Array.isArray(items) && items.length > 0 && items.map((menu, idx) => 
                (<li key={idx} style={id == idx ? itemStyle: {}} id={idx} onClick={handleClick} onMouseEnter={(e) => setId(e.target.id)} onMouseLeave={() => setId(null)}>{menu}</li>))}
            </ul>
        </div>
    )
})
export default Dropdown