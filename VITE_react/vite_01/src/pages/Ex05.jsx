import { useState } from "react"

const list = ['HTML', 'CSS', 'JAVASCRIPT', 'JAVA', 'PYTHON', 'Oracle', 'MySQL', 'Nodejs']

const Radio = () => {
    const [rad, setRad] = useState('테스트 중')
    const handleRad = e => {
        const { value, checked } = e.target
        setRad(() => {
            return { [value]: checked }
        })
    }
    return (
        <>
            <h1>5. 라디오버튼과 확인</h1>
            <h2>{JSON.stringify(rad)}</h2>
            {list.map((v, i) => {
                return (
                    <div key={i}>
                        <input type="radio" name="one" value={v} onChange={handleRad} />{v}
                    </div>
                )
            })}
        </>
    )
}
export default Radio