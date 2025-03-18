import { UseContext } from "./BasicContext";

type BasicProfileCardProps = {
    type: 'basic';
    name: string;
  };
  type AdvancedProfileCardProps = {
    type: 'advanced';
    name: string;
    email: string;
  };

  type ProfileCardProps = BasicProfileCardProps | AdvancedProfileCardProps;
  
  function Challenge(props: ProfileCardProps) {
    const { type, name } = props;
    const myName = UseContext();
  
    if (type === 'basic') {
      return (
        <article className='alert alert-success'>
          <h2>user : {name}</h2>
          <h1>Content: {myName.name}</h1>
        </article>
      );
    }
    return (
      <article className='alert alert-danger'>
        <h2>user : {name}</h2>
        <h2> email : {props.email}</h2>
      </article>
    );
  }
  export default Challenge;