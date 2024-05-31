import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Dropdown from './Dropdown'

const dropdownMenu = {
    'Home': ['home-1', 'home-2'],
    'About': ['about-1', 'about-2', 'about-3'],
    'Contact': ['contact-1']
}

function App(){
    const [page, setPage] = useState('')
    const [layout, setLayout] = useState({})
    const [target, setTarget] = useState(null)

    const menus = dropdownMenu[page] // 드롭다운 메뉴 
    const sx = {backgroundColor: 'orange', color: 'red' } // 드롭다운 스타일 설정
    const itemStyle = {backgroundColor: 'black', color: '#ccc'} // 드롭다운 메뉴 호버스타일 설정
    const dropdown = useRef(null)
    
    const openDropdown = (e) => {
        e.stopPropagation()
        const {x, bottom} = e.target.getBoundingClientRect()
        setPage(e.target.innerText)
        setLayout({x, y: bottom })
        setTarget(e.target)
    }
    const closeDropdown = () => {
        setPage('')
        setLayout({})
    }
    const changePosition = () => {
        if(target){
            const {x, bottom} = target.getBoundingClientRect()
            setLayout({x, y: bottom })
        }
    }
    const setDropdown = (e) => {
        if(!dropdown.current.contains(e.target)){ // 드롭다운 바깥 영역을 클릭한 경우
            closeDropdown()
        }
    }

    useEffect(() => { // 메뉴닫기
        window.addEventListener('click', setDropdown)
        return () => window.removeEventListener('click', setDropdown)
    }, [])

    useEffect(() => { // 드롭다운 위치조정 
        window.addEventListener('resize', changePosition)
        return () => window.removeEventListener('resize', changePosition)
    }, [target])

    

    return (
        <div className='App'>
        <Dropdown ref={dropdown} page={page} menus={menus} layout={layout} closeDropdown={closeDropdown} sx={sx} itemStyle={itemStyle} duration={200}/>
         <nav>
            <ul>
                {Object.keys(dropdownMenu).map((menu, id) => <li key={id} onClick={openDropdown}>{menu}</li>)}
            </ul>
         </nav>
        </div>
    )
}
export default App