import React from 'react'



export default function StanokBlock() {
  return (
    <div style={{border:'1px solid black', width:'33%', padding:'5px', borderRadius:'10px', backgroundColor:'#F0F0F3', }}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <div>Остановки</div>
            <div><h1 style={{fontWeight:'bold'}}>BST</h1> </div>
            <div>Выработка</div>
        </div>
        <div style={{textAlign:'center', border:'1px solid black',width:'80%', margin:'0 auto'}}>
            <h2>Запись за сегодня</h2>
            <p>Выработка 10 шт</p>
            <p>Простой 2 ч</p>
        </div>
    </div>
  )
}