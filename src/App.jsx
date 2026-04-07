import './App.css'
import { useState } from 'react'; // useState import
import React from 'react';

function App() {

  let post = '강남 우동 맛집'
  let temp_style = { color: 'blue', fontSize: '16px' };
  const [a, b] = useState('남자 코트 추천'); // state 문법 (useState 함수 import 필요)
  // 일반적으론 const로 선언
  // a: state에 보관한 자료 ('남자 코트 추천'), 어떤 자료형이든 가능
  // b: state 변경을 도와주는 함수
  // 보통 [변수이름, set변수이름] 형태로 작명
  /*
  state를 사용하는 이유:
  변수를 사용하면 변경내용이 html 자동 반영이 안됨
  state의 경우 변경사항이 생기면 html 자동으로 재렌더링됨
  */

  const [temp_cnt, set_temp_cnt] = useState(0);
  const [title, set_title] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']); // 배열 자료형을 state로 지정
  const [like, set_like] = useState([0, 0, 0]);
  const [modal, setModal] = useState(-1);
  const [input, setInput] = useState('');

  function click_like(num) {
    // state 변경 함수 사용법 (이걸 사용해야 html페이지가 재렌더링됨)
    let temp = [...like];
    temp[num]++;
    set_like(temp); // state변경 (단, 아규먼트 내용이 기존 state 내용과 같으면 수행 안함)
  }

  function show_modal(num) { // 모달 보여주는 함수
    if (modal == num) setModal(-1);
    else setModal(num);
  }

  function delete_content(num) { // 글 삭제 함수
    let temp_title = [...title];
    let temp_like = [...like];
    temp_title.splice(num, 1);
    temp_like.splice(num, 1);
    set_title(temp_title);
    set_like(temp_like);
    if (num == modal) setModal(-1);
    else if (num < modal) setModal(modal - 1);
  }

  function add_content() { // 글 추가 함수
    if (input == 0) return
    let temp_title = [...title];
    let temp_like = [...like];
    temp_title.unshift(input);
    temp_like.unshift(0);
    set_title(temp_title);
    set_like(temp_like)
    if (modal != -1) setModal(modal + 1);
  }

  /* 예시
  function temp_button() {
    let temp = [...title];
    if (temp_cnt % 2 == 0) temp[0] = '여자 코트 추천';
    else temp[0] = '남자 코트 추천';
    set_temp_cnt(temp_cnt + 1);
    set_title(temp);
  }
  */

  /* 예시
  function ganada_sort() {
    let temp = [...title];
    temp.sort();
    set_title(temp);
  }
  */

  // return 괄호 안에는 하나의 태그만 있어야함
  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: 'green', fontSize: '20px' }}>React Blog</h4>
        {/*html에 스타일 삽입시에 object 변수로 내용 삽입, 변수(js내용)를 넣어야하므로 {} 사용*/}
      </div>
      {/* 예시 <button onClick={temp_button}>버튼</button> */}
      {/* 예시 <button onClick={ganada_sort}>가나다 순 정렬</button> */}
      {/* 예시 <h4 style={temp_style}>{post}</h4>*/}
      {/* html 내용 안에 js 코드를 집어넣기 위해서 중괄호{} 사용*/}
      {/* 예시 생코딩 <div className='list'>
        <h4>{title[0]} <span onClick={() => { click_like(0) }}>❤️</span>{like[0]}</h4>
        onClick 이벤트 핸들러: 클릭 시 콜백함수 실행해줌
        <p>4월 6일 발행</p>
      </div>
      */}

      {/* <div className='list'>
        <h4>{title[2]} <span onClick={() => { click_like(2) }}>❤️</span>{like[2]}</h4>
        <p>4월 6일 발행</p>
      </div> */}
      {/* 예시 <Content title={title} like_fn={click_like} like={like} num={2} /> */}
      {/* 만든 컴포넌트(함수)를 태그 형식으로 입력 */}
      {/* <Content><Content/> 이런식으로 입력 가능*/}
      {/* 위 예시 처럼 아규먼트 전달 가능 */}

      {
        // 반복문으로 html 작성하기
        // html 작성란에 for 반복문을 사용할 수 없으므로 map함수 사용
        title.map(function (a, i) {

          return <Content title={title} like_fn={click_like} like={like[i]} num={i}
            modal={modal} show_modal={show_modal} delete_content={delete_content} key={i} />; // 컴포넌트로 만들기~

          // 반복문으로 html 생성하면 각 생성되는 html에 대해 각각 다른 key를 설정해야 함
        })
      }
      {
        // 조건부로 html 작성하기
        // html 작성란에 if 조건식을 사용할 수 없으므로 삼항연산자 사용
        modal != -1 ? <Modal title={title[modal]} /> : null
        // modal 값에 따라 Modal 컴포넌트 출력 여부 결정(true면 출력 false면 null(출력 안함))
      }

      <input type="text" placeholder='입력' onChange={(e) => { setInput(e.target.value); }} />
      {/* 스테이트 변경 함수는 비동기로 처리됨 */}
      {/* onChagne 이벤트 핸들러: 값 변환 시 콜백 함수 실행 */}
      {/* 이벤트 핸들러 이것저것 많음 */}
      <button onClick={add_content}>발행</button>
      {/* <Temp_component hello = {'Hello World!'}></Temp_component> */}
    </div>
  )
}

function Content(props) { // 컴포넌트 만들기 (대문자로 시작)
  // props 파라미터로 아규먼트 받을 수 있음
  let i = props.num
  return ( // 내용 작성
    <div className='list'>
      <h4 onClick={(e) => {
        props.show_modal(i);
      }}>
        {props.title[i]}
        <span onClick={(e) => {
          e.stopPropagation();// 버블링 방지
          props.like_fn(i)
        }}>❤️</span>
        {props.like}</h4>
      <p>4월 6일 발행</p>
      <button onClick={() => { props.delete_content(i) }}>삭제</button>
    </div>
  )
}

function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.title}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      {/* <button onClick={props.temp_fn}>글수정</button> */}
    </div>
  )
}

// 클래스로 컴포넌트 만드는 법~ 
class Temp_component extends React.Component { // React import 필요
  constructor(props) { // props 가져오는 법
    super(props); // 여기에도 써야 함
    // 클래스 컴포넌트에서 state 만드는 법~
    this.state = { // 오브젝트 형식
      name: 'kim',
      age: 20
    }
  }
  render() {
    return (
      <div>안녕 {this.state.name} 나이는 {this.state.age}
        <button onClick={()=>{
          this.setState({age:25}); // state 변경하는 법
          // 값을 아예 바꾸는 것이 아닌 해당 내용만 변경(추가) 오브젝트 연산과 비슷
        }}>버튼</button>
        {this.props.hello};
        {/* props 사용하는 법(근데 왜 뒤에 세미콜론이 나오냐?) */}
      </div>
    )
  }
}

export default App
