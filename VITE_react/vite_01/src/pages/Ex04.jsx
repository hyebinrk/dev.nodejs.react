import { useState } from "react"

const Sel = () => {
    const [sel, setSel] = useState("")
    const selector = e => setSel(e.target.value)
    const city = ["서울", "부산", "대구", "광주", "인천", "대전", "울산", "세종", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"]
    const cNum = ["02", "051", "053", "062", "032", "042", "052", "044", "031", "033", "043", "041", "063", "061", "054", "055", "064"]

    return (
        <>
            <h1>2. 셀렉터와 연동</h1>
            <h2><div>{sel}</div></h2>
            <select onChange={selector} value={sel}>
                {
                    city.map((v, i) => {
                        return <option value={cNum[i]} key={i}>{v}</option>
                    })
                }
            </select>
        </>
    )
}
export default Sel