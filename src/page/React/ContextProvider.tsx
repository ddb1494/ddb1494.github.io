import { createContext, memo, useContext, useState } from 'react';
const MyContext = createContext<any>({});


// gsap
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
gsap.registerPlugin(TextPlugin);

// log
const isDev = true;

function useHook<T>(k: string, v?: T) {
  // if(isDev) console.log('%c useHook', 'color: red');
  const [value, setValue] = useState(v);
  return {
    get [k]() { return value; },
    set [k](v: T) { setValue(v); },
    [`get${k.slice(0, 1).toUpperCase()}${k.slice(1)}`]() { return value; },
    [`set${k.slice(0, 1).toUpperCase()}${k.slice(1)}`](v: T) { return setValue(v); },
  };
}

function useHooks(state: any) {
  const rs: any[] = [];
  for (const k in state) {
    const v = state[k];
    type T = typeof v;
    const [value, setValue] = useState<T>(v);
    const gk = `get${k.slice(0, 1).toUpperCase()}${k.slice(1)}`;
    const sk = `set${k.slice(0, 1).toUpperCase()}${k.slice(1)}`;
    Object.defineProperties(rs, {
      [k]: {
        get: () => value,
        set: setValue,
        enumerable: true,
      },
      [gk]: {
        value: () => value,
      },
      [sk]: {
        value: setValue,
      },
    });
  }
  return rs;
}

function useHooks2(state: any, computed?: any) {
  const rs: any[] = [];
  for (const k in state) {
    const v = state[k];
    type T = typeof v;
    const [value, setValue] = useState<T>(v);
    const gk = `get${k.slice(0, 1).toUpperCase()}${k.slice(1)}`;
    const sk = `set${k.slice(0, 1).toUpperCase()}${k.slice(1)}`;
    Object.defineProperties(rs, {
      [k]: {
        get: () => value,
        set: setValue,
        enumerable: true,
      },
      [gk]: {
        value: () => value,
      },
      [sk]: {
        value: setValue,
      },
    });
  }
  return rs;
}


const V = memo(function View() {
  const state = useContext(MyContext);
  if (isDev) console.log('%c View', 'color: #00f');
  return <div>
    <button onClick={() => {
      state.name = Math.random().toString(16).slice(1);
    }}>name: {state.name}</button>
    <button onClick={() => state.setAge((v: number) => {
      return v + 1;
    })}>age: {state.getAge()}</button>
  </div>;
});

const C = memo(function Controler() {
  const state = useContext(MyContext);
  if (isDev) console.log('%c Controler', 'color: #00f');
  return <div>
    <button onClick={() => {
      console.log('click');
      gsap.to(state.name, {
        duration: 2,
        text: {

          value: Math.random().toString(36).slice(2)
        },
      });
    }}>set</button>
    <button onClick={() => console.log(state.name)}>get</button>
  </div>;
});

const P = memo(function GrandParent() {
  if (isDev) console.log('%c GrandParent', 'color: #00f');
  return <Pc />;
});

const Pc = memo(function Parent() {
  if (isDev) console.log('%c Parent', 'color: #00f');
  return <Pcc />;
});

const Pcc = memo(function Child() {
  if (isDev) console.log('%c Child', 'color: #00f');
  return <Pccc />;
});

const Pccc = memo(function GrandChild() {
  if (isDev) console.log('%c GrandChild', 'color: #00f');
  return <Pcccc />;
});

const Pcccc = memo(function Message() {
  const state = useContext(MyContext);
  if (isDev) console.log('%c Message', 'color: #00f');
  return <div>Received: {state.name}</div>;
});


/* 
뭔가 새로운 걸 배운다는 건 쉽게 받아들이기 힘든 일이다.
꼭 기존 기술을 전부 버리고 새로운 것이 탄생하는 것은 아니다.
새로운 것은 기존 기술의 부족한 점을 보완하기 위해 탄생했기에 사용하지 않더라도 알아볼 필요는 있다.
 */

function Page() {
  if (isDev) console.log('%c - Page - ', 'color: #00f');
  // context 값을 초기화하기. props를 아래로 내리기.
  return (
    <MyContext.Provider value={useHooks({
      name: 'ddb',
      age: 40,
    })}>
      <P />
      <C />
      <V />
    </MyContext.Provider>
  );
}

export default Page;