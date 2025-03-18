import  {type PropsWithChildren} from 'react';
import { UseContext } from './BasicContext';

// type ComponentProps ={
//     name: string,
//     id: number,
//     children: React.ReactNode

//   }
type ComponentProps = PropsWithChildren<{
  name: string,
  id: number,
}> 

const Props = ({name,id, children}: ComponentProps) => {
  const myName = UseContext();
  const setName = myName.setName;


  console.log(myName.name);
  return (
    <div>
        <div>
            <h1>Name: {name} </h1>
            <h1>Id: {id} </h1>
            {children}
            <h1>Challenge: {myName.name} </h1>
        </div>
        <button onClick={(e)=>{
          e.preventDefault();
          setName('Lekan');
        }}>Change Name</button>
    </div>
  )
}

export default Props;