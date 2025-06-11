import "./Ex07.css"
const Css = () => {
    const myStyle1 = { width: "200px", height: "200px", borderRadius: "50%", backgroundColor: "Green" }
    return (
        <>
            <h1>6. 리액트에 CSS 스타일 적용하기</h1>

            <div style={myStyle1}></div>
            <div style={{ ...myStyle1, backgroundColor: "blue" }}></div>
            <div className="ex7-div"></div>
            <div className={ }></div>
        </>
    )
}

export default Css