import { useState } from 'react'
import Crypto from 'crypto-js'


const Cryp = () => {
    const [inid, setInid] = useState('')
    const [inpw, setInpw] = useState('')
    const [skey, setSkey] = useState('')

    const [encrypt, setEncrypt] = useState('') // 암호화
    const [decrypt, setDecrypt] = useState('') // 복호화
    const [sha, setSha] = useState('') // 단방향

    // 암호화
    // 암호화는 문자열만 처리할 수 있음. 객체는 암호화 할 수 없기 때문에 JSON.stringify()사용
    const encryptFn = () => {
        const data = { id: inid, pw: inpw }
        const encData = Crypto.AES.encrypt(JSON.stringify(data), skey).toString() // skey와 함께 데이터를 암호화
        setEncrypt(encData)
    }

    // 복호화
    // 복호화된 결과는 문자열 형태로 나옴. 이 문자열을 다시 객체로 돌리고 싶을 때 JSON.pars()함수 사용
    // 복호화한 데이터를 실제로 쓰기 위해서는 문자열상태보다는 객체 상태가 JS에서 다루기 더 편하기 때문
    // 복호화 한 값을 객체로 안 바꾸고 문자열로 쓰면 .id ,pw 접근이 안 됨
    const decryptFn = () => {
        try {
            const bytes = Crypto.AES.decrypt(encrypt, skey)
            const decrypted = JSON.parse(bytes.toString(Crypto.enc.Utf8)) // json을 자바스크립트의 객체형식으로 변형(JSON.stringify와 반대)
            setDecrypt(decrypted)
        } catch (error) {
            console.log('복호화 오류', error) // 에러가 났을때 콘솔에 에러출력
        } finally {
            alert('암호키 관리에 주의하세요.') // finally 무조건 뜨는 것!!
        }
    }

    // 단방향 해시값
    const sha256fn = () => {
        const data = { id: inid, pw: inpw } // 원하는 형태로 객체화
        const encData = Crypto.SHA256(JSON.stringify(data)).toString() // skey와 함께 데이터를 암호화
        setSha(encData)
    }

    // JSON.stringify({ id: inid, pw: inpw })
    // 핸들러
    const handleIdChange = e => setInid(e.target.value)
    const handlePwChange = e => setInpw(e.target.value)
    const handleKeyChange = e => setSkey(e.target.value)

    return (
        <>
            <h1>2. 암호화, 복호화, 단방향</h1>
            <div>
                ID : <input type="text" onChange={handleIdChange} value={inid} />
            </div>
            <div>
                PW : <input type="password" onChange={handlePwChange} value={inpw} />
            </div>
            <div>
                Key : <input type="password" onChange={handleKeyChange} value={skey} />
            </div>
            <button onClick={encryptFn} disabled={!(inid && inpw && skey)}>암호화 동작</button> {/* 하나라도 빠지면 비활성화되게 */}

            <hr />
            <div>암호화 전: {(inid && inpw) && JSON.stringify({ id: inid, pw: inpw })}</div><br />
            <div> {!!encrypt && `암호화 후: ${encrypt} (글자수: ${encrypt.length})`}</div> <hr />

            <div>복호화 암호키
                <input type="password" onChange={handleKeyChange} value={skey} />
            </div>
            <button onClick={decryptFn} disabled={!(inid && inpw && skey)}>복호화 동작</button>

            {/* decrypt && JSON.stringify(decrypt) 이렇게만 사용해도 되지만 앞에 !!를 붙여줌으로써 좀 더 명시적으로 true와 false라는 의도를 나타냄. */}
            <div>{!!decrypt && JSON.stringify(decrypt)}</div> {/* decrypt값이 존재할 때 나타나고 없으면 안 나타남 */}
            <div>{!!decrypt && `복호화 된 데이터: ID는 ${decrypt.id}이고, PASSWORD는 ${decrypt.pw}입니다.`}</div>
            <hr />
            <button onClick={sha256fn} disabled={!(inid && inpw && skey)}>단방향 암호화 하기</button>
            <h3>{`SHA256암호화: ${sha} (길이:${sha.length})`}</h3>
        </>
    )
}

export default Cryp