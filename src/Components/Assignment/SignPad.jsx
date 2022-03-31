import { createRef, useEffect, useState } from 'react';
import SignaturePad from 'signature_pad';

let notePad = null;

function SignPad() {
  const [signPadData, setSignPadData] = useState(null);

  useEffect(() => {
    notePad = new SignaturePad(document.querySelector('canvas'), {
      onBegin: () => {
        setSignPadData(SignPad.toDataURL());
      },
    });
  }, []);

  // 새로고침
  const handleRestSignature = () => {
    notePad.clear();
    setSignPadData();
  };
  // 저장
  const handleSaveSignature = () => {
    const data = notePad.toData();
    notePad.fromData(data, { clear: false });
  };

  return (
    <>
      <hr className="mt-10 mb-5" />
      <div className="">
        <span className="font-bold">
          <br />
          마지막으로 전자 서명을 해주세요!😊 <br />
        </span>
        <div className="Signature mt-10">
          <canvas
            width={300}
            height={300}
            style={{ border: '1px solid #cdcdcd' }}
          />
          <button className="mt-2 border" onClick={handleRestSignature}>
            다시 쓰기
          </button>
          <button className="mt-2 border" onClick={handleSaveSignature}>
            저장하기
          </button>

          <script src="https://cdn.jsdelivr.net/npm/signature_pad@4.0.0/dist/signature_pad.umd.min.js"></script>
        </div>
      </div>
    </>
  );
}
export default SignPad;
